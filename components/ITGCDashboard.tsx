'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { ITGCControl } from '@/lib/mockData';
import { Filter } from 'lucide-react';

interface ITGCDashboardProps {
  controls: ITGCControl[];
}

export const ITGCDashboard: React.FC<ITGCDashboardProps> = ({ controls }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredControls = controls.filter((c) => {
    const categoryMatch = filterCategory === 'All' || c.category === filterCategory;
    const statusMatch = filterStatus === 'All' || c.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const categories = ['All', 'Change Management', 'Access Management', 'Operations', 'Disaster Recovery'];
  const statuses = ['All', 'Compliant', 'Non-Compliant', 'In Progress', 'Not Tested'];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Compliant':
        return 'success';
      case 'Non-Compliant':
        return 'danger';
      case 'In Progress':
        return 'warning';
      case 'Not Tested':
        return 'info';
      default:
        return 'default';
    }
  };

  const stats = {
    compliant: controls.filter((c) => c.status === 'Compliant').length,
    nonCompliant: controls.filter((c) => c.status === 'Non-Compliant').length,
    inProgress: controls.filter((c) => c.status === 'In Progress').length,
    notTested: controls.filter((c) => c.status === 'Not Tested').length,
  };

  const compliancePercentage = Math.round((stats.compliant / controls.length) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-green-900/20 border-green-700">
          <CardContent className="pt-6">
            <div className="text-sm font-semibold text-green-400 mb-1">Compliant</div>
            <div className="text-2xl font-bold text-green-300">{stats.compliant}</div>
            <div className="text-xs text-slate-400 mt-1">{Math.round((stats.compliant / controls.length) * 100)}%</div>
          </CardContent>
        </Card>

        <Card className="bg-red-900/20 border-red-700">
          <CardContent className="pt-6">
            <div className="text-sm font-semibold text-red-400 mb-1">Non-Compliant</div>
            <div className="text-2xl font-bold text-red-300">{stats.nonCompliant}</div>
            <div className="text-xs text-slate-400 mt-1">{Math.round((stats.nonCompliant / controls.length) * 100)}%</div>
          </CardContent>
        </Card>

        <Card className="bg-amber-900/20 border-amber-700">
          <CardContent className="pt-6">
            <div className="text-sm font-semibold text-amber-400 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-amber-300">{stats.inProgress}</div>
            <div className="text-xs text-slate-400 mt-1">{Math.round((stats.inProgress / controls.length) * 100)}%</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/20 border-blue-700">
          <CardContent className="pt-6">
            <div className="text-sm font-semibold text-blue-400 mb-1">Overall Compliance</div>
            <div className="text-2xl font-bold text-blue-300">{compliancePercentage}%</div>
            <div className="text-xs text-slate-400 mt-1">{controls.length} total controls</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ITGC Control Testing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Control Name</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Frequency</TableHeader>
                <TableHeader>Last Tested</TableHeader>
                <TableHeader>Owner</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredControls.map((control) => (
                <TableRow key={control.id}>
                  <TableCell className="font-medium text-white">{control.controlName}</TableCell>
                  <TableCell className="text-sm">
                    <Badge variant="info">{control.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(control.status)}>
                      {control.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{control.frequency}</TableCell>
                  <TableCell className="text-sm text-slate-400">
                    {new Date(control.lastTested).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm">{control.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredControls.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No controls match your filter criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
