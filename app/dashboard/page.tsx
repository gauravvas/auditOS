'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { sodViolations, itgcControls, riskProcesses, integrationStatuses } from '@/lib/mockData';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Shield,
  Activity,
  Users,
} from 'lucide-react';

export default function Dashboard() {
  const highRiskViolations = sodViolations.filter((v) => v.riskLevel === 'High');
  const nonCompliantControls = itgcControls.filter((c) => c.status === 'Non-Compliant');
  const averageRiskScore = Math.round(riskProcesses.reduce((sum, p) => sum + p.riskScore, 0) / riskProcesses.length);
  const connectedSystems = integrationStatuses.filter((s) => s.status === 'Connected').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Audit Control Center</h1>
        <p className="text-slate-400">Welcome back! Here's your audit summary for 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="group hover:border-red-600/50 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">SOD Violations</p>
                <p className="text-3xl font-bold text-red-400">{sodViolations.length}</p>
                <p className="text-xs text-slate-500 mt-2">{highRiskViolations.length} high-risk</p>
              </div>
              <AlertTriangle className="text-red-400 group-hover:scale-110 transition-transform" size={28} />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:border-amber-600/50 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Control Gaps</p>
                <p className="text-3xl font-bold text-amber-400">{nonCompliantControls.length}</p>
                <p className="text-xs text-slate-500 mt-2">non-compliant controls</p>
              </div>
              <Zap className="text-amber-400 group-hover:scale-110 transition-transform" size={28} />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:border-blue-600/50 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Avg Risk Score</p>
                <p className="text-3xl font-bold text-blue-400">{averageRiskScore}</p>
                <p className="text-xs text-slate-500 mt-2">across processes</p>
              </div>
              <TrendingUp className="text-blue-400 group-hover:scale-110 transition-transform" size={28} />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:border-green-600/50 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Integrations</p>
                <p className="text-3xl font-bold text-green-400">{connectedSystems}/{integrationStatuses.length}</p>
                <p className="text-xs text-slate-500 mt-2">systems connected</p>
              </div>
              <Activity className="text-green-400 group-hover:scale-110 transition-transform" size={28} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical violations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Critical Violations</CardTitle>
                <Badge variant="danger">{highRiskViolations.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {highRiskViolations.slice(0, 5).map((violation) => (
                  <div key={violation.id} className="flex items-start gap-4 p-3 bg-slate-900/50 rounded-lg border border-red-900/20 hover:border-red-900/50 transition-colors">
                    <AlertTriangle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm">
                        {violation.role1} + {violation.role2}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">{violation.userName} • {violation.department}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{violation.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-amber-400 font-mono">${(violation.financialExposure / 1000000).toFixed(1)}M</div>
                      <Badge variant="danger" className="mt-1">
                        {violation.riskLevel}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="primary" className="w-full justify-start">
              <BarChart3 size={18} />
              Generate Report
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Shield size={18} />
              Run SOD Test
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Zap size={18} />
              Test Controls
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Users size={18} />
              Sync Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Control status and integration health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control testing summary */}
        <Card>
          <CardHeader>
            <CardTitle>ITGC Control Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Compliant</span>
                  <span className="text-sm font-semibold text-green-400">
                    {itgcControls.filter((c) => c.status === 'Compliant').length}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded">
                  <div
                    className="h-full bg-green-600 rounded"
                    style={{ width: `${(itgcControls.filter((c) => c.status === 'Compliant').length / itgcControls.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">In Progress</span>
                  <span className="text-sm font-semibold text-amber-400">
                    {itgcControls.filter((c) => c.status === 'In Progress').length}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded">
                  <div
                    className="h-full bg-amber-600 rounded"
                    style={{ width: `${(itgcControls.filter((c) => c.status === 'In Progress').length / itgcControls.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Non-Compliant</span>
                  <span className="text-sm font-semibold text-red-400">
                    {itgcControls.filter((c) => c.status === 'Non-Compliant').length}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded">
                  <div
                    className="h-full bg-red-600 rounded"
                    style={{ width: `${(itgcControls.filter((c) => c.status === 'Non-Compliant').length / itgcControls.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration health */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {integrationStatuses.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{integration.name}</h4>
                    <p className="text-xs text-slate-500">{integration.system}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        integration.status === 'Connected'
                          ? 'success'
                          : integration.status === 'Error'
                            ? 'danger'
                            : 'warning'
                      }
                    >
                      {integration.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Audit Activity</CardTitle>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-4 pb-3 border-b border-slate-700">
              <Clock size={16} className="text-blue-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">Q1 2026 SOD Audit Report generated</h4>
                <p className="text-xs text-slate-400 mt-1">25 violations identified, 62% compliance score</p>
              </div>
              <span className="text-xs text-slate-500">2 hours ago</span>
            </div>

            <div className="flex items-start gap-4 pb-3 border-b border-slate-700">
              <CheckCircle2 size={16} className="text-green-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">ITGC Control Testing completed</h4>
                <p className="text-xs text-slate-400 mt-1">40 controls tested, 90% compliance rate</p>
              </div>
              <span className="text-xs text-slate-500">1 day ago</span>
            </div>

            <div className="flex items-start gap-4">
              <AlertTriangle size={16} className="text-amber-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">New SOD violations detected</h4>
                <p className="text-xs text-slate-400 mt-1">3 new high-risk violations in Finance dept</p>
              </div>
              <span className="text-xs text-slate-500">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
