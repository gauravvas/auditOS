export interface AIResponse {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
}

export function generateAIResponse(query: string): AIResponse {
  const lowerQuery = query.toLowerCase();
  const timestamp = new Date().toISOString();

  // SOD-related queries
  if (lowerQuery.includes('sod') || lowerQuery.includes('segregation')) {
    return {
      message: `Based on the current audit data, we've identified 25 active SOD violations across your organization. 11 of these are classified as High Risk with total financial exposure of $18.8M. The most critical violations are in Treasury Management ($3.2M exposure) and AP Processing ($2.5M exposure). I recommend implementing automated SOD conflict detection in your ERP and establishing quarterly certification procedures.`,
      type: 'warning',
      timestamp,
    };
  }

  // ITGC-related queries
  if (lowerQuery.includes('itgc') || lowerQuery.includes('control') || lowerQuery.includes('testing')) {
    return {
      message: `Your ITGC control landscape shows 36 out of 40 controls (90%) are either Compliant or In Progress. Key gaps include: Backup Restoration Testing (not performed in Q1), Business Continuity Plan (outdated), and Emergency Change Procedures (not documented). I recommend prioritizing these three areas in your next testing cycle. Overall control environment is strong with good change management practices.`,
      type: 'info',
      timestamp,
    };
  }

  // Risk-related queries
  if (lowerQuery.includes('risk') || lowerQuery.includes('exposure') || lowerQuery.includes('score')) {
    return {
      message: `Our risk analysis identifies 15 critical business processes. Data Security has the highest risk score (85) with 4 control gaps, followed by Order-to-Cash (82) and Treasury Management (79). Total identified control gaps across all processes: 24. The top 3 processes account for 78% of total business value ($2.1B+). I recommend implementing compensating controls for the Data Security and Treasury processes immediately.`,
      type: 'warning',
      timestamp,
    };
  }

  // Report-related queries
  if (lowerQuery.includes('report') || lowerQuery.includes('generate')) {
    return {
      message: `I can generate an audit report based on the current audit findings. The most recent Q1 2026 SOD Audit Report shows a compliance score of 62%, with 25 violations identified. Would you like me to create a detailed report covering SOD violations, ITGC control testing results, risk assessments, and remediation recommendations? The report can be customized by business process, department, or risk level.`,
      type: 'info',
      timestamp,
    };
  }

  // Integration-related queries
  if (lowerQuery.includes('integration') || lowerQuery.includes('sync') || lowerQuery.includes('econnect')) {
    return {
      message: `Your current integration status shows 4 systems Connected (NetSuite, SAP, Workday, ServiceNow), 1 system in Error state (Salesforce with 12 errors), and 1 system Disconnected (Oracle). Total records processed today: 309,580. I recommend resolving the Salesforce integration issues immediately - the errors suggest authentication problems. Oracle integration should be reconnected to ensure complete data coverage.`,
      type: 'warning',
      timestamp,
    };
  }

  // Compliance-related queries
  if (lowerQuery.includes('compliance') || lowerQuery.includes('compliant')) {
    return {
      message: `Current compliance metrics show an overall compliance score of 68% across all audit areas. SOD compliance is at 62%, ITGC controls at 84%, and Risk Management at 71%. The primary compliance gaps are in SOD controls (11 High-Risk violations) and ITGC operational procedures (4 non-compliant controls). To improve compliance score to 80%+, focus on: (1) Automated SOD monitoring, (2) Completing DR testing, (3) Implementing compensating controls.`,
      type: 'info',
      timestamp,
    };
  }

  // High-risk queries
  if (lowerQuery.includes('high risk') || lowerQuery.includes('critical')) {
    return {
      message: `We've identified 15 High-Risk violations requiring immediate attention. The top 3 critical items are: (1) Treasury Officer/Cash Manager segregation - $3.2M exposure, (2) Financial Analyst/AP Processor segregation - $2.5M exposure, (3) System Admin/Database Admin segregation - $1.8M exposure. These accounts have excessive privilege combinations that could lead to unauthorized financial transactions. I recommend immediate access revocation and implementation of approval workflows.`,
      type: 'error',
      timestamp,
    };
  }

  // Department-specific queries
  if (lowerQuery.includes('finance') || lowerQuery.includes('accounting')) {
    return {
      message: `Finance department analysis reveals 14 SOD violations concentrated in Treasury (3), Accounts Payable (2), and General Ledger functions (3). Combined financial exposure: $7.2M. The department's ITGC control compliance is 85% - strong in backup and recovery procedures. Key recommendations: (1) Implement tiered approval workflows for treasury transactions, (2) Strengthen vendor master controls, (3) Add reconciliation verification procedures.`,
      type: 'info',
      timestamp,
    };
  }

  // Default response
  return {
    message: `I'm AuditOS's AI analysis engine. I can help you understand your: (1) SOD violations and segregation conflicts, (2) ITGC control testing status, (3) Risk scores and financial exposure, (4) Compliance status and recommendations, (5) Integration health and data quality. Ask me about any specific audit area, a business process, department, or risk level, and I'll provide detailed analysis and remediation guidance.`,
    type: 'info',
    timestamp,
  };
}
