// components/modals/ConfirmationModal.jsx
'use client';

import React from 'react';

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Are you sure?', 
  message = 'This action cannot be undone. Please confirm to proceed.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info', // 'danger', 'warning', 'info'
  isLoading = false
}) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger': 
        return (
          <svg className="modal-svg-icon danger-svg" viewBox="0 0 52 52">
            <circle className="modal-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="modal-line" fill="none" d="M16 16l20 20" />
            <path className="modal-line" fill="none" d="M36 16l-20 20" />
          </svg>
        );
      case 'warning': 
        return (
          <svg className="modal-svg-icon warning-svg" viewBox="0 0 52 52">
            <circle className="modal-circle" cx="26" cy="26" r="25" fill="none" />
            <line className="modal-line warning-line1" x1="26" y1="15" x2="26" y2="30" fill="none" />
            <circle className="warning-dot" cx="26" cy="37" r="2.5" />
          </svg>
        );
      default: 
        return (
          <svg className="modal-svg-icon info-svg" viewBox="0 0 52 52">
            <circle className="modal-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="modal-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        );
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger': return 'bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white';
      case 'warning': return 'bg-amber-500 hover:bg-amber-600 border-amber-500 hover:border-amber-600 text-white';
      default: return 'bg-brand-gold hover:bg-brand-gold-hover text-brand-navy border-brand-gold';
    }
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      {/* Styles for custom CSS animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoomIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ease-out forwards;
        }

        .modal-svg-icon {
          width: 56px;
          height: 56px;
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }
        .info-svg { stroke: #D5A73F; }
        .danger-svg { stroke: #DC2626; }
        .warning-svg { stroke: #F59E0B; }
        .modal-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: strokeCircle 0.5s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .modal-check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: strokeCheck 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
        }
        .modal-line {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: strokeCheck 0.25s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
        }
        .warning-line1 {
          stroke-dasharray: 18;
          stroke-dashoffset: 18;
          animation: strokeCheck 0.25s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
        }
        .warning-dot {
          fill: #F59E0B;
          opacity: 0;
          animation: fadeInDot 0.2s ease-out 0.65s forwards;
        }
        @keyframes strokeCircle { to { stroke-dashoffset: 0; } }
        @keyframes strokeCheck { to { stroke-dashoffset: 0; } }
        @keyframes fadeInDot { to { opacity: 1; } }
      `}</style>

      <div className="bg-neutral-900 border border-brand-gold/30 p-8 sm:p-10 max-w-lg w-full rounded-sm shadow-2xl animate-zoom-in text-center">
        <div className="mx-auto mb-6 flex justify-center items-center">
          {getIcon()}
        </div>
        
        <h3 className="font-serif text-xl text-brand-gold mb-3 uppercase tracking-wider">
          {title}
        </h3>
        
        <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-sm mx-auto font-sans">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3 border border-white/10 hover:border-white/20 text-white text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm disabled:opacity-50 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-8 py-3 border text-[10px] font-sans font-bold uppercase tracking-widest transition duration-200 rounded-sm disabled:opacity-50 cursor-pointer ${getConfirmButtonClass()}`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
