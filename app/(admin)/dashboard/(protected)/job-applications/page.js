import React, { Suspense } from 'react';
import JobApplicationsClient from './JobApplicationsClient';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function JobApplicationsPage() {
  return (
    <Suspense 
      fallback={
        <DashboardLayout title="Job Applications" subtitle="Loading applications...">
          <div style={{ padding: '80px', textAlign: 'center' }}>
            <div style={{ 
              display: 'inline-block', 
              width: '40px', 
              height: '40px', 
              border: '3px solid var(--stone)', 
              borderTopColor: 'var(--gold)', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              marginBottom: '20px'
            }}></div>
            <p style={{ color: 'var(--ink-light)', fontSize: '14px', fontWeight: 'medium' }}>
              Synchronizing application records...
            </p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </DashboardLayout>
      }
    >
      <JobApplicationsClient />
    </Suspense>
  );
}
