'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Lock,
  AlertTriangle,
  Smartphone,
  MessageSquare,
  Github,
  Linkedin,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Shield size={24} />,
      title: 'SOD Violation Detection',
      description: 'Real-time segregation of duties conflict detection with AI-powered risk assessment',
    },
    {
      icon: <Zap size={24} />,
      title: 'ITGC Control Testing',
      description: 'Comprehensive IT General Controls testing across change management and access controls',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Risk Scoring Engine',
      description: 'Advanced risk scoring matrix with business process analysis and financial exposure tracking',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Automated Reporting',
      description: 'Generate audit reports in minutes with customizable compliance frameworks',
    },
    {
      icon: <Lock size={24} />,
      title: 'Enterprise Integrations',
      description: 'Connect with NetSuite, SAP, Oracle, Workday, and 100+ enterprise systems',
    },
    {
      icon: <Users size={24} />,
      title: 'AI Chat Assistant',
      description: 'Natural language audit analysis powered by Claude AI',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '2,999',
      description: 'Perfect for small organizations',
      features: [
        'Up to 500 users',
        'SOD violation detection',
        'Basic ITGC controls',
        'Email support',
        'Monthly reports',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '9,999',
      description: 'For growing enterprises',
      features: [
        'Up to 5,000 users',
        'Advanced SOD analytics',
        'Full ITGC framework',
        'AI chat assistant',
        'Real-time monitoring',
        'Priority support',
        'Weekly reports',
        'Custom integrations',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited users',
        'White-label solution',
        'Custom workflows',
        'Dedicated support',
        'SLA guarantee',
        'API access',
        'Advanced security',
        'On-premise option',
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <AlertTriangle size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">AuditOS</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition">
                Features
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition">
                Pricing
              </a>
              <Link href="/dashboard">
                <Button variant="primary" size="md">
                  Launch Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-slate-900/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-block">
              <div className="px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/30">
                <p className="text-blue-400 text-sm font-semibold">AI-Powered Audit Intelligence</p>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
              Automate Your{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SOD & ITGC
              </span>{' '}
              Audits
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Detect segregation of duties violations, test IT general controls, and assess risk exposure with
              intelligent automation. Enterprise-grade compliance in minutes, not months.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Try Live Demo <ArrowRight size={20} />
                </Button>
              </Link>
              <button className="px-6 py-3 rounded-lg border border-slate-600 text-white hover:bg-slate-800 transition">
                Schedule Demo
              </button>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-8 max-w-xl mx-auto text-sm">
              <div>
                <div className="text-2xl font-bold text-blue-400">25</div>
                <p className="text-slate-400">SOD Violations Found</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">84%</div>
                <p className="text-slate-400">ITGC Compliance</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">18.8M</div>
                <p className="text-slate-400">Risk Exposure</p>
              </div>
            </div>
          </div>

          {/* Demo card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="h-96 bg-slate-900 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
              <div className="text-center">
                <Smartphone size={48} className="text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500 text-sm">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-32 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Comprehensive Audit Suite</h2>
            <p className="text-xl text-slate-400">Everything you need for enterprise audit and compliance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="group hover:border-blue-600/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-400">Choose the plan that fits your organization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? 'md:scale-105 border-blue-600/50 bg-blue-600/5'
                    : 'hover:border-slate-600'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm font-bold">MOST POPULAR</div>
                )}
                <CardContent className="pt-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <div className="text-4xl font-bold text-white">
                      ${plan.price}
                      {plan.price !== 'Custom' && <span className="text-lg text-slate-400">/month</span>}
                    </div>
                  </div>

                  <Button
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full mb-8"
                  >
                    Get Started
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-blue-600/20 to-slate-900/50 border-y border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Ready to Transform Your Audits?</h2>
          <p className="text-xl text-slate-300">
            Join industry leaders using AuditOS to automate compliance and reduce audit cycle times by 70%
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button variant="primary" size="lg">
                Start Free Trial <ArrowRight size={20} />
              </Button>
            </Link>
            <button className="px-8 py-4 rounded-lg border border-slate-600 text-white hover:bg-slate-800 transition font-medium">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Social</h4>
              <ul className="space-y-2 text-slate-400 text-sm flex gap-4">
                <a href="#" className="hover:text-white transition">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="hover:text-white transition">
                  <Github size={20} />
                </a>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex items-center justify-between text-sm text-slate-400">
            <p>&copy; 2026 AuditOS. All rights reserved.</p>
            <p>Enterprise-grade SOD & ITGC audit platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
