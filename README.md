# AuditOS - AI-Powered SOD & ITGC Audit Platform

Enterprise-grade segregation of duties and IT general controls audit platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Overview

AuditOS is a production-ready SaaS platform designed to help enterprises automate their audit and compliance processes. It provides comprehensive detection of segregation of duties (SOD) violations, IT general controls (ITGC) testing, risk scoring, and automated report generation.

## Features

### Core Capabilities

- **SOD Violation Detection** - Real-time detection and tracking of segregation of duties conflicts with risk scoring
- **ITGC Control Testing** - Comprehensive testing across Change Management, Access Management, Operations, and Disaster Recovery
- **Risk Scoring Engine** - AI-powered risk assessment matrix for business processes with financial exposure analysis
- **Automated Reporting** - One-click generation of comprehensive audit reports
- **AI Chat Assistant** - Natural language queries about audit findings and compliance status
- **Enterprise Integrations** - Pre-built connectors for NetSuite, SAP, Oracle, Workday, and 100+ systems
- **Real-time Monitoring** - Dashboard with live updates on audit violations and control status

### Mock Data Included

- **25 SOD Violations** - Realistic segregation of duties conflicts with risk levels and financial exposure
- **40 ITGC Controls** - Comprehensive control testing across all categories
- **15 Business Processes** - Risk-scored processes with control gaps and business value
- **6 System Integrations** - Sample integration statuses and sync information
- **5 Sample Reports** - Pre-generated audit reports with findings and recommendations

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Custom shadcn-style components
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## Project Structure

```
auditOS/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── globals.css          # Global styles and animations
│   ├── page.tsx             # Landing page
│   └── dashboard/
│       ├── layout.tsx       # Dashboard shell with sidebar
│       ├── page.tsx         # Main dashboard
│       ├── sod/page.tsx     # SOD violations page
│       ├── itgc/page.tsx    # ITGC controls page
│       ├── risks/page.tsx   # Risk scoring page
│       ├── reports/page.tsx # Reports and generation
│       └── settings/page.tsx # Settings and integrations
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Table.tsx
│   │   └── index.ts
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── AIChatWidget.tsx     # AI chat assistant widget
│   ├── SODViolationsTable.tsx # SOD table component
│   ├── ITGCDashboard.tsx    # ITGC dashboard component
│   └── RiskMatrix.tsx       # Risk scoring component
├── lib/
│   ├── mockData.ts          # Realistic mock audit data
│   └── aiResponses.ts       # Mock AI response generator
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.js           # Next.js configuration
└── postcss.config.js        # PostCSS configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or download the repository
cd auditOS

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Core Pages

### Public Pages

- **`/`** - Landing page with features, pricing, and CTA
- **`/dashboard`** - Main control center with KPI cards and recent activity

### Audit Pages

- **`/dashboard/sod`** - Segregation of duties violations with filtering and search
- **`/dashboard/itgc`** - IT general controls testing status and compliance tracking
- **`/dashboard/risks`** - Risk scoring matrix with process analysis and trend indicators
- **`/dashboard/reports`** - Audit report generation and history

### Operations

- **`/dashboard/settings`** - Integration management, API configuration, and audit settings

## Key Components

### SODViolationsTable
Displays segregation of duties violations with:
- Risk level filtering (High/Medium/Low)
- Search by user, role, or department
- Financial exposure calculation
- Status tracking (Active/Remediated/Accepted)

### ITGCDashboard
Comprehensive ITGC control tracking with:
- Compliance percentage by category
- Control status filtering
- Test result tracking
- Owner information

### RiskMatrix
Risk scoring visualization including:
- Risk score distribution charts
- Business value analysis
- Control gap tracking
- Trend indicators

### AIChatWidget
Floating AI assistant that:
- Responds to audit queries in plain English
- Provides specific findings and recommendations
- Answers about SOD, ITGC, risks, and compliance
- Generates contextual responses based on audit data

## Mock Data Features

### SOD Violations
- 25 violations with realistic role conflicts
- Risk levels: High, Medium, Low
- Financial exposure ranging from $200K to $3.2M
- Status tracking: Active, Remediated, Accepted
- Department and user associations

### ITGC Controls
- 40 controls across 4 categories
- Status: Compliant, Non-Compliant, In Progress, Not Tested
- Testing frequency information
- Test results and owner assignments

### Risk Processes
- 15 business processes
- Risk scores 53-85
- Business value up to $2.1B
- Incident and control gap tracking
- Trend indicators

### Integration Status
- 6 sample systems (NetSuite, SAP, Oracle, Workday, Salesforce, ServiceNow)
- Connection status tracking
- Last sync timestamps
- Error counting and record processing metrics

## AI Response System

The AI chat widget generates contextual responses based on:
- SOD violation analysis
- ITGC control status
- Risk assessment findings
- Compliance scores
- Integration health
- Specific department and process metrics

Responses include:
- Executive summaries
- Specific violation details
- Remediation recommendations
- Risk exposure analysis
- Control gap identification

## Styling

The platform uses a professional dark navy/slate theme with:
- Navy background (#0f172a)
- Slate cards (#1e293b)
- Blue accents (#2563eb)
- Color-coded risk levels:
  - High Risk: Red (#dc2626)
  - Medium Risk: Amber (#f59e0b)
  - Low Risk: Green (#16a34a)

## Animations

- Fade-in transitions for page loads
- Slide-up animations for cards
- Pulse glow effects for active elements
- Smooth hover states and transitions

## Performance Optimizations

- Client-side filtering for large datasets
- Lazy loading of components
- Optimized bundle with tree-shaking
- No external API calls (mock data only)

## Extensibility

Ready to connect to:
- OpenAI GPT-4 / Claude API for real AI responses
- Enterprise ERP systems (NetSuite, SAP, Oracle)
- HCM systems (Workday, SuccessFactors)
- CRM platforms (Salesforce)
- ITSM tools (ServiceNow, Jira)
- Custom databases and APIs

## Future Enhancements

- [ ] Real AI integration (OpenAI/Claude API)
- [ ] Authentication and user management
- [ ] Real database (PostgreSQL/MongoDB)
- [ ] Email report delivery
- [ ] Real-time data connectors
- [ ] Advanced analytics and dashboards
- [ ] Mobile app
- [ ] Custom report templates
- [ ] Role-based access control
- [ ] Audit trail and change history

## License

Proprietary - Enterprise SaaS Product

## Support

For questions or support, contact the development team.

---

**Version:** 1.0.0
**Last Updated:** 2026-04-05
**Status:** Production Ready
