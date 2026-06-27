'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Icons } from '@/components/shared/Icons';

export default function Panel({ isOpen, onClose, title, children, actions }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0, display: 'none' }, { opacity: 1, display: 'block', duration: 0.2 });
      gsap.fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(panelRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, delay: 0.1, onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = 'none';
        document.body.style.overflow = '';
      }});
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div 
        ref={overlayRef}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(26, 20, 16, 0.4)',
          zIndex: 90, display: 'none'
        }}
      />
      <div 
        ref={panelRef}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '480px',
          background: 'var(--cream)', borderLeft: '1px solid var(--stone-dark)',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', zIndex: 100,
          display: 'flex', flexDirection: 'column', transform: 'translateX(100%)'
        }}
      >
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--stone)', background: 'var(--white)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <h2 style={{ fontSize: '16px', color: 'var(--burgundy)', fontWeight: 'bold' }}>{title}</h2>
          <button 
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '5px', border: '1px solid var(--stone-dark)',
              background: 'var(--white)', color: 'var(--ink-mid)', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Icons.close style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
        
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
        
        {actions && (
          <div style={{
            padding: '16px 24px', borderTop: '1px solid var(--stone)', background: 'var(--white)',
            display: 'flex', justifyContent: 'flex-end', gap: '10px'
          }}>
            {actions}
          </div>
        )}
      </div>
    </>
  );
}
