'use client';

import React from 'react';
import { SODViolationsTable } from '@/components/SODViolationsTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { sodViolations } from '@/lib/mockData';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Download, Plus } from 'lucide-react';

export default function SODPage() {
  const highRiskTotal = sodViolations
    .filter((v) => v.riskLevel === 'High')
    .reduce((sum, v) => sum + v.financialExposure, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">SOD Monitor</h1>
          <p className="text-slate-400">Segregation of duties violation detection and tracking</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-400 mb-2">High Risk Exposure</div>
            <div className="text-3xl font-bold text-red-400">${(highRiskTotal / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-slate-500 mt-2">
              {sodViolations.filter((v) => v.riskLevel === 'High').length} violations
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-400 mb-2">Total Exposure</div>
            <div className="text-3xl font-bold text-amber-400">
              ${(sodViolations.reduce((sum, v) => sum + v.financialExposure, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Across {sodViolations.length} violations
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-400 mb-2">Active Cases</div>
            <div className="text-3xl font-bold text-blue-400">
              {sodViolations.filter((v) => v.status === 'Active').length}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              {sodViolations.filter((v) => v.status === 'Remediated').length} remediated
            </div>
          </CardContent>
        </Card>
      </div>

      <SODViolationsTable violations={sodViolations} />
    </div>
  );
}
