'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import { SODViolation } from '@/lib/mockData';
import { Filter, TrendingUp } from 'lucide-react';

interface SODViolationsTableProps {
  violations: SODViolation[];
}

export const SODViolationsTable: React.FC<SODViolationsTableProps> = ({ violations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('All');

  const filteredViolations = violations.filter((v) => {
    const matchesSearch =
      v.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.role1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.role2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'All' || v.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-400';
      case 'Medium':
        return 'text-amber-400';
      case 'Low':
        return 'text-green-400';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'danger';
      case 'Remediated':
        return 'success';
      case 'Accepted':
        return 'info';
      default:
        return 'default';
    }
  };

  const highRiskCount = violations.filter((v) => v.riskLevel === 'High').length;
  const totalExposure = violations.reduce((sum, v) => sum + v.financialExposure, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>SOD Violations</CardTitle>
          <div className="text-sm text-slate-400">
            {filteredViolations.length} of {violations.length} violations
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="text-xs font-semibold text-slate-400 mb-1">High Risk</div>
            <div className="text-2xl font-bold text-red-400">{highRiskCount}</div>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="text-xs font-semibold text-slate-400 mb-1">Total Violations</div>
            <div className="text-2xl font-bold text-blue-400">{violations.length}</div>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="text-xs font-semibold text-slate-400 mb-1">Financial Exposure</div>
            <div className="text-2xl font-bold text-amber-400">${(totalExposure / 1000000).toFixed(1)}M</div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <Input
            type="text"
            placeholder="Search by user, role, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search Violations"
          />
          <div className="flex gap-2 items-center">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option>All Risk Levels</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>User</TableHeader>
              <TableHeader>Role Conflict</TableHeader>
              <TableHeader>Department</TableHeader>
              <TableHeader>Risk Level</TableHeader>
              <TableHeader className="text-right">Financial Exposure</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredViolations.map((violation) => (
              <TableRow key={violation.id}>
                <TableCell className="font-medium text-white">{violation.userName}</TableCell>
                <TableCell className="text-xs">
                  <div className="flex flex-col gap-1">
                    <span>{violation.role1}</span>
                    <span className="text-slate-500">+</span>
                    <span>{violation.role2}</span>
                  </div>
                </TableCell>
                <TableCell>{violation.department}</TableCell>
                <TableCell>
                  <Badge variant={getRiskBadgeVariant(violation.riskLevel)}>
                    {violation.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  <span className="text-amber-400">${(violation.financialExposure / 1000000).toFixed(1)}M</span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(violation.status)}>
                    {violation.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredViolations.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            No violations found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
