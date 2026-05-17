'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { integrationStatuses } from '@/lib/mockData';
import { Settings, Link as LinkIcon, AlertCircle, CheckCircle2, RefreshCw, Power } from 'lucide-react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [email, setEmail] = useState('admin@enterprise.com');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return { bg: 'bg-green-900/20', border: 'border-green-700', text: 'text-green-400', icon: <CheckCircle2 size={16} /> };
      case 'Error':
        return { bg: 'bg-red-900/20', border: 'border-red-700', text: 'text-red-400', icon: <AlertCircle size={16} /> };
      default:
        return { bg: 'bg-amber-900/20', border: 'border-amber-700', text: 'text-amber-400', icon: <AlertCircle size={16} /> };
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure integrations and preferences</p>
      </div>

      {/* Account settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={24} />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Organization</label>
            <input
              type="text"
              value="Enterprise Corp"
              disabled
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 opacity-60 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">API Key</label>
            <div className="flex gap-2">
              <input
                type={apiKey ? 'password' : 'text'}
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Button variant="secondary" size="md">
                Copy
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Used for API authentication and integrations</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary">Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Integration Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Integrations</h2>
        <p className="text-slate-400">Connect with your enterprise systems for automated data collection</p>

        <div className="grid grid-cols-1 gap-4">
          {integrationStatuses.map((integration) => {
            const statusInfo = getStatusColor(integration.status);
            return (
              <Card key={integration.id} className={`${statusInfo.bg} border ${statusInfo.border}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <LinkIcon size={24} className="text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{integration.name}</h3>
                        <p className="text-sm text-slate-400 mt-1">{integration.system}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant={integration.status === 'Connected' ? 'success' : integration.status === 'Error' ? 'danger' : 'warning'}>
                            {integration.status}
                          </Badge>
                          {integration.status === 'Connected' && (
                            <span className="text-xs text-slate-400">
                              Last sync: {new Date(integration.lastSync).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {integration.status === 'Connected' && (
                        <div className="space-y-2 text-sm">
                          <div className="text-slate-400">
                            <span className="text-white font-semibold">{integration.recordsProcessed.toLocaleString()}</span> records
                          </div>
                          {integration.errorCount > 0 && (
                            <div className="text-red-400">
                              <span className="font-semibold">{integration.errorCount}</span> errors
                            </div>
                          )}
                        </div>
                      )}
                      {integration.status === 'Error' && (
                        <div className="space-y-2">
                          <div className="text-sm text-red-400 font-semibold">{integration.errorCount} errors</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    {integration.status === 'Connected' ? (
                      <>
                        <Button variant="secondary" size="sm" className="flex-1">
                          <RefreshCw size={16} />
                          Sync Now
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          <Power size={16} />
                          Disconnect
                        </Button>
                      </>
                    ) : integration.status === 'Disconnected' ? (
                      <Button variant="primary" size="sm" className="w-full">
                        <LinkIcon size={16} />
                        Connect
                      </Button>
                    ) : (
                      <>
                        <Button variant="primary" size="sm" className="flex-1">
                          Retry
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          View Logs
                        </Button>
                      </>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Audit settings */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">SOD Testing Frequency</label>
            <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option>Weekly</option>
              <option selected>Daily</option>
              <option>Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Risk Score Threshold Alert</label>
            <input
              type="number"
              value="75"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-slate-500 mt-2">Alert when risk score exceeds this value</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Report Generation</label>
            <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option>Manual Only</option>
              <option selected>Weekly Automatic</option>
              <option>Monthly Automatic</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <label className="text-sm text-slate-300">Enable AI Assistant for audit analysis</label>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary">Save Settings</Button>
        </CardFooter>
      </Card>

      {/* Security settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Two-Factor Authentication</h4>
              <p className="text-xs text-slate-400 mt-1">Add an extra layer of security to your account</p>
            </div>
            <Button variant="secondary" size="sm">
              Enable
            </Button>
          </div>

          <div className="border-t border-slate-700 pt-6 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Session Timeout</h4>
              <p className="text-xs text-slate-400 mt-1">Automatically log out after inactivity</p>
            </div>
            <select className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm">
              <option>15 minutes</option>
              <option selected>30 minutes</option>
              <option>1 hour</option>
              <option>Never</option>
            </select>
          </div>

          <div className="border-t border-slate-700 pt-6 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Activity Logs</h4>
              <p className="text-xs text-slate-400 mt-1">View all login and activity history</p>
            </div>
            <Button variant="secondary" size="sm">
              View Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
