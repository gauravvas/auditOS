'use client';

import React from 'react';
import { ITGCDashboard } from '@/components/ITGCDashboard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { itgcControls } from '@/lib/mockData';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Download, Plus } from 'lucide-react';

export default function ITGCPage() {
  const compliantCount = itgcControls.filter((c) => c.status === 'Compliant').length;
  const nonCompliantCount = itgcControls.filter((c) => c.status === 'Non-Compliant').length;
  const inProgressCount = itgcControls.filter((c) => c.status === 'In Progress').length;

  const complianceScore = Math.round((compliantCount / itgcControls.length) * 100);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ITGC Controls</h1>
          <p className="text-slate-400">IT General Controls testing and compliance monitoring</p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-400 mb-2">Compliance Score</div>
            <div className="text-3xl font-bold text-green-400">{complianceScore}%</div>
            <div className="text-xs text-slate-500 mt-2">{compliantCount} compliant controls</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-400 mb-2">Non-Compliant</div>
            <div className="text-3xl font-bold text-red-400">{nonCompliantCount}</div>
            <div className="text-xs text-slate-500 mt-2">Require remediation</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-400 mb-2">In Progress</div>
            <div className="text-3xl font-bold text-amber-400">{inProgressCount}</div>
            <div className="text-xs text-slate-500 mt-2">Currently testing</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-400 mb-2">Total Controls</div>
            <div className="text-3xl font-bold text-blue-400">{itgcControls.length}</div>
            <div className="text-xs text-slate-500 mt-2">Across 4 categories</div>
          </CardContent>
        </Card>
      </div>

      <ITGCDashboard controls={itgcControls} />
    </div>
  );
}
