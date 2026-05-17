import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AuditOS - AI-Powered SOD & ITGC Audit Platform',
  description: 'Enterprise-grade segregation of duties and IT general controls audit platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/lucide@latest"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
