'use client';

import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const getStyles = () => {
    switch (type) {
      case 'danger':
      case 'error':
        return {
          bg: 'bg-red-950/90 border-red-500/40 text-red-200',
          iconColor: 'text-red-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          )
        };
      case 'info':
        return {
          bg: 'bg-neutral-800/90 border-neutral-700 text-neutral-200',
          iconColor: 'text-neutral-400',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.086.67l-.171.086a1.5 1.5 0 00-.73 1.306v.75m.75 2.25h.008v.008H13.5V16.5zm-2.25-12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
          )
        };
      default: // success
        return {
          bg: 'bg-neutral-900/95 border-[#c5a880]/40 text-neutral-200',
          iconColor: 'text-[#c5a880]',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )
        };
    }
  };

  const { bg, iconColor, icon } = getStyles();

  return (
    <div className="fixed bottom-6 right-6 z-[999999] animate-slide-in">
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div className={`flex items-center gap-3 px-5 py-4 border rounded-sm shadow-xl backdrop-blur-sm min-w-[280px] max-w-sm ${bg}`}>
        <div className={iconColor}>{icon}</div>
        <div className="flex-1 font-sans text-xs font-medium tracking-wide uppercase">{message}</div>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white transition-colors duration-200 p-0.5 ml-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
