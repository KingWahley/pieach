import React from 'react';
import { Icons } from './Icons';

export default function EmptyState({ 
  title = 'No results found', 
  message = 'Try adjusting your filters or search query.',
  icon
}) {
  return (
    <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', background: 'var(--white)', border: '1px dashed var(--stone-dark)', borderRadius: '6px', margin: '20px 0' }}>
      {icon || (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--stone-dark)', margin: '0 auto 16px auto', display: 'block' }}>
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      <h3 style={{ fontSize: '16px', color: 'var(--burgundy)', margin: '0 0 8px 0' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: 'var(--ink-light)', margin: 0 }}>{message}</p>
    </div>
  );
}
