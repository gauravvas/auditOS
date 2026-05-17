'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AIChatWidget } from '@/components/AIChatWidget';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-900">
      <Sidebar />
      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      <AIChatWidget />
    </div>
  );
}
