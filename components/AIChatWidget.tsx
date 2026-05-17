'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { generateAIResponse } from '@/lib/aiResponses';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'info' | 'warning' | 'error' | 'success';
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am AuditOS AI Assistant. I can help you analyze SOD violations, ITGC controls, risk scores, and audit data. What would you like to know?',
      sender: 'ai',
      timestamp: new Date().toISOString(),
      type: 'info',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = generateAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'ai',
        timestamp: response.timestamp,
        type: response.type,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center z-40 hover:scale-110"
        aria-label="Open AI Chat"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  const getMessageBgColor = (type?: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-900 border-l-4 border-amber-500';
      case 'error':
        return 'bg-red-900 border-l-4 border-red-500';
      case 'success':
        return 'bg-green-900 border-l-4 border-green-500';
      default:
        return 'bg-slate-700';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-slate-800 rounded-lg shadow-2xl border border-slate-700 flex flex-col z-50">
      <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900 rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} className="text-blue-400" />
          <h3 className="font-bold text-white">AuditOS AI Assistant</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : `text-slate-100 rounded-bl-none ${getMessageBgColor(message.type)}`
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-slate-100 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-4 border-t border-slate-700 bg-slate-900 rounded-b-lg">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about SOD, ITGC, risks..."
            className="flex-1 !mb-0 bg-slate-700 border-slate-600"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            variant="primary"
            size="md"
            disabled={isLoading || !input.trim()}
            className="!px-3"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
