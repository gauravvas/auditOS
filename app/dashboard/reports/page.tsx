'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { auditReports, sodViolations, itgcControls, riskProcesses } from '@/lib/mockData';
import { FileText, Download, Eye, BarChart3, Plus } from 'lucide-react';

export default function ReportsPage() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const generateReportMarkdown = () => {
    const highRiskViolations = sodViolations.filter((v) => v.riskLevel === 'High').length;
    const mediumRiskViolations = sodViolations.filter((v) => v.riskLevel === 'Medium').length;
    const compliantControls = itgcControls.filter((c) => c.status === 'Compliant').length;
    const criticalProcesses = riskProcesses.filter((p) => p.riskScore >= 80).length;

    return `# AuditOS Compliance Report
## Q1 2026 - Executive Summary

**Report Date:** ${new Date().toLocaleDateString()}
**Reporting Period:** Q1 2026
**Organization:** Enterprise

---

## Executive Summary

This comprehensive audit report presents findings across three critical audit domains: Segregation of Duties (SOD), IT General Controls (ITGC), and Risk Assessment.

### Key Metrics
- **Overall Compliance Score:** 68%
- **SOD Violations:** ${sodViolations.length} total (${highRiskViolations} high-risk, ${mediumRiskViolations} medium-risk)
- **Financial Exposure:** $18.8M
- **ITGC Controls Tested:** ${itgcControls.length}
- **Control Compliance Rate:** ${Math.round((compliantControls / itgcControls.length) * 100)}%
- **Critical Business Processes:** ${criticalProcesses}

---

## SOD (Segregation of Duties) Findings

### Summary
We identified ${sodViolations.length} segregation of duties violations across the organization. These violations represent critical control deficiencies that could enable unauthorized transactions and financial misstatement.

### High-Risk Violations
- **Treasury Management:** $3.2M exposure - User can both initiate and approve wire transfers
- **Accounts Payable:** $2.5M exposure - User can create and approve purchase orders
- **System Administration:** $1.8M exposure - Full system and database access without segregation

### Medium-Risk Violations
- **Inventory Management:** ${sodViolations.filter((v) => v.riskLevel === 'Medium').length} violations with combined exposure of $3.8M
- **Revenue Processing:** Multiple segregation gaps in billing and approval workflows

### Remediation Priorities
1. Implement automated SOD conflict detection in ERP system
2. Establish role-based access control (RBAC) framework
3. Implement segregation enforcement at database/application level
4. Establish quarterly SOD certification and attestation process
5. Deploy continuous monitoring of user access and transaction combinations

---

## ITGC (IT General Controls) Assessment

### Control Categories Tested
- **Change Management:** 12 controls tested, ${itgcControls.filter((c) => c.category === 'Change Management' && c.status === 'Compliant').length} compliant
- **Access Management:** 16 controls tested, ${itgcControls.filter((c) => c.category === 'Access Management' && c.status === 'Compliant').length} compliant
- **Operations:** 8 controls tested, ${itgcControls.filter((c) => c.category === 'Operations' && c.status === 'Compliant').length} compliant
- **Disaster Recovery:** 4 controls tested, ${itgcControls.filter((c) => c.category === 'Disaster Recovery' && c.status === 'Compliant').length} compliant

### Critical Gaps
1. **Backup Restoration Testing** - Not performed in Q1; schedule quarterly testing
2. **Business Continuity Plan** - Outdated version; requires annual update
3. **Emergency Change Procedures** - Missing documentation; establish formal procedures
4. **Privileged Access Management** - Testing in progress; implement PAM solution
5. **Log Review Procedures** - Incomplete; implement automated monitoring

### Recommendations
- Establish automated patch management
- Implement privileged access management (PAM) solution
- Enhance logging and monitoring capabilities
- Complete all deferred testing by Q2
- Conduct annual IT disaster recovery drill

---

## Risk Scoring Analysis

### Critical Processes (Risk Score 80+)
${riskProcesses
  .filter((p) => p.riskScore >= 80)
  .map((p) => `- **${p.processName}:** Score ${p.riskScore} (Business Value: ${p.businessValue}, Control Gaps: ${p.controlGaps})`)
  .join('\n')}

### Process Risk Distribution
- **Critical (80+):** ${criticalProcesses} processes
- **High (60-79):** ${riskProcesses.filter((p) => p.riskScore >= 60 && p.riskScore < 80).length} processes
- **Medium (<60):** ${riskProcesses.filter((p) => p.riskScore < 60).length} processes

---

## Compliance Assessment

### Overall Compliance Status
- **SOD Compliance:** 62%
- **ITGC Compliance:** 84%
- **Risk Management:** 71%
- **Composite Score:** 68%

### Compliance Trend
The organization shows mixed improvement trends. While ITGC controls are generally well-designed (84% compliant), significant gaps exist in operational segregation of duties. Risk management practices are adequate but require enhancement in critical processes.

---

## Observations and Recommendations

### Immediate Actions (0-30 days)
1. Remediate 15 high-risk SOD violations in Finance and IT
2. Establish weekly monitoring dashboard for SOD violations
3. Schedule quarterly DR testing
4. Implement automated control monitoring

### Short-term Actions (30-90 days)
1. Deploy SOD conflict detection automation
2. Enhance role-based access control
3. Complete outstanding ITGC testing
4. Implement continuous audit monitoring

### Long-term Strategy (90+ days)
1. Establish integrated governance, risk, and compliance (GRC) platform
2. Implement predictive risk analytics
3. Enhance continuous auditing capabilities
4. Develop advanced segregation of duties controls

---

## Conclusion

The organization demonstrates a reasonable control environment with most ITGC controls operating effectively. However, significant segregation of duties deficiencies exist that require immediate remediation. With focused effort on the identified remediation priorities, the organization can substantially improve its control environment and compliance posture.

**Report Generated:** ${new Date().toLocaleString()}
**Next Review Date:** ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}

---

*This report is based on audit procedures performed and observations made during the audit period. It is intended for internal use only.*`;
  };

  const downloadReport = () => {
    const markdown = generateReportMarkdown();
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(markdown)}`);
    element.setAttribute('download', `AuditOS_Compliance_Report_${new Date().toISOString().split('T')[0]}.md`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Audit Reports</h1>
          <p className="text-slate-400">Generate and manage audit compliance reports</p>
        </div>
        <Button variant="primary" size="md" onClick={downloadReport}>
          <Plus size={18} />
          Generate New Report
        </Button>
      </div>

      {/* Generate report info */}
      <Card className="bg-blue-600/10 border-blue-600/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <BarChart3 className="text-blue-400 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">One-Click Report Generation</h3>
              <p className="text-sm text-slate-300">
                Click "Generate New Report" to create a comprehensive audit report based on current violations, control
                status, and risk assessments. Reports are automatically formatted and ready for distribution.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent reports */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Recent Reports</h2>

        <div className="grid grid-cols-1 gap-4">
          {auditReports.map((report) => (
            <Card key={report.id} className="hover:border-blue-600/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <FileText className="text-blue-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <CardTitle className="text-lg">{report.reportName}</CardTitle>
                      <p className="text-sm text-slate-400 mt-1">Period: {report.period}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400 mb-2">{new Date(report.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${
                          report.complianceScore >= 80
                            ? 'bg-green-900/20 text-green-400'
                            : report.complianceScore >= 60
                              ? 'bg-amber-900/20 text-amber-400'
                              : 'bg-red-900/20 text-red-400'
                        }`}
                      >
                        {report.complianceScore}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Total Violations</p>
                    <p className="text-2xl font-bold text-white">{report.totalViolations}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">High Risk</p>
                    <p className="text-2xl font-bold text-red-400">{report.highRiskCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Medium Risk</p>
                    <p className="text-2xl font-bold text-amber-400">{report.mediumRiskCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Recommendations</p>
                    <p className="text-2xl font-bold text-blue-400">{report.recommendations.length}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-300 mb-2">Key Recommendations:</p>
                  <ul className="space-y-1">
                    {report.recommendations.slice(0, 3).map((rec, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Eye size={16} />
                    View
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Download size={16} />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
