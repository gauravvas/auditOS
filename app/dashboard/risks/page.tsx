'use client';

import React from 'react';
import { RiskMatrix } from '@/components/RiskMatrix';
import { riskProcesses } from '@/lib/mockData';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Download } from 'lucide-react';

export default function RisksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Risk Scoring Engine</h1>
          <p className="text-slate-400">AI-powered risk assessment across business processes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="md">
            <RefreshCw size={18} />
            Refresh
          </Button>
          <Button variant="primary" size="md">
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>

      <RiskMatrix processes={riskProcesses} />
    </div>
  );
}
