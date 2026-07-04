// components/modals/SuccessModal.jsx
'use client';

import React, { useState } from 'react';

export default function SuccessModal({
  isOpen,
  message = 'Your item has been successfully uploaded and published.',
  onUploadAnother,
  onViewList,
  uploadAnotherText = 'Upload Another Item',
  viewListText = 'View Item List',
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (!isOpen) return null;

  const handleViewList = () => {
    setIsRedirecting(true);
    onViewList();
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .animate-spin { animation: spin 1s linear infinite; }

        .succ-svg { width:56px; height:56px; stroke-width:3.5; stroke-linecap:round; stroke-linejoin:round; fill:none; stroke:#D5A73F; }
        .succ-circle { stroke-dasharray:166; stroke-dashoffset:166; animation:succCircle 0.5s cubic-bezier(0.65,0,0.45,1) forwards; }
        .succ-check  { stroke-dasharray:48;  stroke-dashoffset:48;  animation:succCheck  0.35s ease-out 0.45s forwards; }
        
        @keyframes succCircle { to { stroke-dashoffset:0; } }
        @keyframes succCheck   { to { stroke-dashoffset:0; } }
      `}</style>

      <div className="bg-neutral-900 border border-brand-gold/30 p-8 sm:p-10 max-w-lg w-full rounded-sm shadow-2xl animate-zoom-in text-center">
        {/* Animated Checkmark Circle */}
        <div className="mx-auto mb-6 flex justify-center items-center">
          <svg className="succ-svg" viewBox="0 0 52 52">
            <circle className="succ-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="succ-check" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h3 className="font-serif text-xl text-brand-gold mb-3 uppercase tracking-wider">
          Upload Complete
        </h3>

        <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-sm mx-auto font-sans">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* View Item List */}
          <button
            type="button"
            disabled={isRedirecting}
            onClick={handleViewList}
            className="px-6 py-3 border border-white/10 hover:border-white/20 text-white text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
          >
            {isRedirecting && (
              <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {isRedirecting ? 'REDIRECTING...' : viewListText}
          </button>

          {/* Upload Another */}
          <button
            type="button"
            disabled={isRedirecting}
            onClick={onUploadAnother}
            className="px-8 py-3 border border-brand-gold bg-brand-gold hover:bg-brand-gold-hover text-brand-navy text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadAnotherText}
          </button>
        </div>
      </div>
    </div>
  );
}
