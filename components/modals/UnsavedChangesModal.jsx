// components/modals/UnsavedChangesModal.jsx
'use client';

import React from 'react';

export default function UnsavedChangesModal({
  isOpen,
  onSaveAsDraft,   // null if save-as-draft is not supported by this page
  onDiscard,
  onStay,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        .uc-svg { width:56px; height:56px; stroke-width:3.5; stroke-linecap:round; stroke-linejoin:round; fill:none; stroke:#F59E0B; }
        .uc-circle { stroke-dasharray:166; stroke-dashoffset:166; animation:ucCircle 0.5s cubic-bezier(0.65,0,0.45,1) forwards; }
        .uc-line1  { stroke-dasharray:18;  stroke-dashoffset:18;  animation:ucLine  0.25s cubic-bezier(0.65,0,0.45,1) 0.4s forwards; }
        .uc-dot    { fill:#F59E0B; opacity:0; animation:ucDot 0.2s ease-out 0.65s forwards; }
        @keyframes ucCircle { to { stroke-dashoffset:0; } }
        @keyframes ucLine   { to { stroke-dashoffset:0; } }
        @keyframes ucDot    { to { opacity:1; } }
      `}</style>

      <div className="bg-neutral-900 border border-brand-gold/30 p-8 sm:p-10 max-w-lg w-full rounded-sm shadow-2xl animate-zoom-in text-center">
        {/* Warning icon */}
        <div className="mx-auto mb-6 flex justify-center items-center">
          <svg className="uc-svg" viewBox="0 0 52 52">
            <circle className="uc-circle" cx="26" cy="26" r="25" fill="none" />
            <line  className="uc-line1"  x1="26" y1="15" x2="26" y2="30" fill="none" />
            <circle className="uc-dot"   cx="26" cy="37" r="2.5" />
          </svg>
        </div>

        <h3 className="font-serif text-xl text-brand-gold mb-3 uppercase tracking-wider">
          Unsaved Changes
        </h3>

        <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-sm mx-auto font-sans">
          You have unsaved changes on this page. What would you like to do before leaving?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Stay */}
          <button
            type="button"
            onClick={onStay}
            className="px-6 py-3 border border-white/10 hover:border-white/20 text-white text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm cursor-pointer"
          >
            Stay &amp; Keep Editing
          </button>

          {/* Discard */}
          <button
            type="button"
            onClick={onDiscard}
            className="px-6 py-3 border border-red-600/60 hover:border-red-600 text-red-400 hover:text-red-300 text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm cursor-pointer"
          >
            Discard &amp; Leave
          </button>

          {/* Save as Draft — only shown when the form supports it */}
          {onSaveAsDraft && (
            <button
              type="button"
              onClick={onSaveAsDraft}
              className="px-8 py-3 border border-brand-gold bg-brand-gold hover:bg-brand-gold-hover text-brand-navy text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm cursor-pointer"
            >
              Save as Draft
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
