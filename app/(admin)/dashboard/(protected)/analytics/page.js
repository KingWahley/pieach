'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" subtitle="View site performance and visitor statistics">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Analytics Overview</h1>
          <p>Key metrics and performance indicators for your website.</p>
        </div>
      </div>
      
      <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '18px', color: 'var(--ink)' }}>Coming Soon</h2>
        <p style={{ color: 'var(--ink-mid)' }}>The analytics dashboard is currently under development.</p>
      </div>
    </DashboardLayout>
  );
}
