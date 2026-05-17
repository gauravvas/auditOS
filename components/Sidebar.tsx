'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  TrendingUp,
  FileText,
  Settings,
  Menu,
  X,
  ChevronDown,
  Zap,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Main',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard size={20} />,
      },
    ],
  },
  {
    title: 'Audit',
    items: [
      {
        label: 'SOD Monitor',
        href: '/dashboard/sod',
        icon: <Shield size={20} />,
        badge: 25,
      },
      {
        label: 'ITGC Controls',
        href: '/dashboard/itgc',
        icon: <Zap size={20} />,
        badge: 4,
      },
      {
        label: 'Risk Scoring',
        href: '/dashboard/risks',
        icon: <TrendingUp size={20} />,
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        label: 'Reports',
        href: '/dashboard/reports',
        icon: <FileText size={20} />,
        badge: 5,
      },
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: <Settings size={20} />,
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg border border-slate-700 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-700 transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="px-6 py-6 border-b border-slate-700">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">AuditOS</h1>
                <p className="text-xs text-slate-400">SOD & ITGC Platform</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-6">
            {navSections.map((section) => (
              <div key={section.title}>
                <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="px-4 py-6 border-t border-slate-700">
            <Link
              href="/"
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-blue-600/10 border border-blue-600/30 text-blue-400 hover:bg-blue-600/20 transition-all duration-200"
            >
              <span className="text-sm font-medium">Back to Home</span>
              <ChevronDown size={16} className="rotate-90" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
