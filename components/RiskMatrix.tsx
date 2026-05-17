'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { RiskProcess } from '@/lib/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RiskMatrixProps {
  processes: RiskProcess[];
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ processes }) => {
  const [sortBy, setSortBy] = useState<'riskScore' | 'businessValue'>('riskScore');

  const sortedProcesses = [...processes].sort((a, b) => {
    if (sortBy === 'riskScore') {
      return b.riskScore - a.riskScore;
    }
    const aValue = parseInt(a.businessValue.replace(/[^\d]/g, ''));
    const bValue = parseInt(b.businessValue.replace(/[^\d]/g, ''));
    return bValue - aValue;
  });

  const getRiskColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-red-900/20', border: 'border-red-700', text: 'text-red-400' };
    if (score >= 60) return { bg: 'bg-amber-900/20', border: 'border-amber-700', text: 'text-amber-400' };
    return { bg: 'bg-green-900/20', border: 'border-green-700', text: 'text-green-400' };
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'Critical';
    if (score >= 60) return 'High';
    return 'Medium';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-red-400" />;
      case 'down':
        return <TrendingDown size={16} className="text-green-400" />;
      case 'stable':
        return <div className="w-1 h-1 rounded-full bg-slate-400"></div>;
    }
  };

  const totalRiskScore = Math.round(processes.reduce((sum, p) => sum + p.riskScore, 0) / processes.length);
  const totalBusinessValue = processes.reduce((sum, p) => {
    const value = parseInt(p.businessValue.replace(/[^\d]/g, ''));
    return sum + value;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-xs font-semibold text-slate-400 mb-1">Average Risk Score</div>
            <div className="text-3xl font-bold text-amber-400">{totalRiskScore}</div>
            <div className="text-xs text-slate-500 mt-2">across 15 processes</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-xs font-semibold text-slate-400 mb-1">Total Business Value</div>
            <div className="text-3xl font-bold text-blue-400">${(totalBusinessValue / 1000).toFixed(1)}B</div>
            <div className="text-xs text-slate-500 mt-2">at risk</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-xs font-semibold text-slate-400 mb-1">Critical Processes</div>
            <div className="text-3xl font-bold text-red-400">{processes.filter((p) => p.riskScore >= 80).length}</div>
            <div className="text-xs text-slate-500 mt-2">requiring immediate attention</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Risk Scoring Matrix</CardTitle>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'riskScore' | 'businessValue')}
              className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="riskScore">Sort by Risk Score</option>
              <option value="businessValue">Sort by Business Value</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Process Name</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader className="text-center">Risk Score</TableHeader>
                <TableHeader>Risk Level</TableHeader>
                <TableHeader>Business Value</TableHeader>
                <TableHeader className="text-center">Incidents</TableHeader>
                <TableHeader className="text-center">Control Gaps</TableHeader>
                <TableHeader className="text-center">Trend</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProcesses.map((process) => {
                const colors = getRiskColor(process.riskScore);
                return (
                  <TableRow key={process.id}>
                    <TableCell className="font-medium text-white">{process.processName}</TableCell>
                    <TableCell className="text-sm text-slate-400">{process.department}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colors.bg} border ${colors.border}`}>
                        <span className={`text-sm font-bold ${colors.text}`}>{process.riskScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={process.riskScore >= 80 ? 'danger' : process.riskScore >= 60 ? 'warning' : 'success'}>
                        {getRiskLevel(process.riskScore)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-amber-400">{process.businessValue}</TableCell>
                    <TableCell className="text-center">
                      <span className={process.incidents > 0 ? 'text-red-400 font-semibold' : 'text-green-400'}>
                        {process.incidents}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={process.controlGaps > 0 ? 'text-amber-400 font-semibold' : 'text-green-400'}>
                        {process.controlGaps}
                      </span>
                    </TableCell>
                    <TableCell className="text-center flex items-center justify-center">
                      {getTrendIcon(process.trend)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Critical (80+)</span>
                  <span className="text-sm font-semibold text-red-400">
                    {processes.filter((p) => p.riskScore >= 80).length}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded">
                  <div
                    className="h-full bg-red-600 rounded"
                    style={{ width: `${(processes.filter((p) => p.riskScore >= 80).length / processes.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">High (60-79)</span>
                  <span className="text-sm font-semibold text-amber-400">
                    {processes.filter((p) => p.riskScore >= 60 && p.riskScore < 80).length}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded">
                  <div
                    className="h-full bg-amber-600 rounded"
                    style={{
                      width: `${(processes.filter((p) => p.riskScore >= 60 && p.riskScore < 80).length / processes.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Medium (&lt;60)</span>
                  <span className="text-sm font-semibold text-green-400">
                    {processes.filter((p) => p.riskScore < 60).length}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded">
                  <div
                    className="h-full bg-green-600 rounded"
                    style={{
                      width: `${(processes.filter((p) => p.riskScore < 60).length / processes.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Control Gaps by Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {processes.sort((a, b) => b.controlGaps - a.controlGaps).slice(0, 8).map((process) => (
                <div key={process.id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex-1 truncate">{process.processName}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-700 rounded">
                      <div
                        className="h-full bg-amber-600 rounded"
                        style={{ width: `${(process.controlGaps / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-amber-400 w-6">{process.controlGaps}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
