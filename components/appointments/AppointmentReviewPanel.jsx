'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { formatAppointmentDate } from '@/utils/appointmentHelpers';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import { APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';

export default function AppointmentReviewPanel({ 
  appointment, 
  onClose, 
  onStatusChange 
}) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  useEffect(() => {
    if (appointment) {
      setInternalNotes(appointment.internalNotes || '');
      setShowRejectInput(false);
      setRejectReason('');

      // Animate in
      gsap.fromTo(overlayRef.current, 
        { autoAlpha: 0 }, 
        { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(panelRef.current, 
        { x: '100%' }, 
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
      
      // Keyboard dismissal
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') handleClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [appointment]);

  const handleClose = () => {
    if (!appointment) return;
    gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(panelRef.current, { 
      x: '100%', 
      duration: 0.3, 
      ease: 'power3.in',
      onComplete: onClose
    });
  };

  const handleApprove = () => {
    onStatusChange(appointment.id, APPOINTMENT_STATUSES.APPROVED, { internalNotes });
  };

  const handleReject = () => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    onStatusChange(appointment.id, APPOINTMENT_STATUSES.REJECTED, { 
      internalNotes, 
      rejectionReason: rejectReason 
    });
    setShowRejectInput(false);
  };

  const handleReschedule = () => {
    onStatusChange(appointment.id, APPOINTMENT_STATUSES.RESCHEDULED, { internalNotes });
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ visibility: 'hidden' }} ref={overlayRef}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
      />
      
      {/* Panel */}
      <div 
        ref={panelRef}
        className="relative w-full max-w-md bg-[var(--cream)] h-full shadow-2xl flex flex-col border-l border-[var(--gold)] cursor-default"
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgba(0,0,0,0.05)] bg-white flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-[var(--burgundy)] mb-1">{appointment.clientName}</h2>
            <div className="text-[12px] text-[var(--ink-light)] font-bold">{appointment.email}</div>
            <div className="text-[11px] text-[var(--ink-light)]">{appointment.phone}</div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[var(--stone)] flex items-center justify-center text-[var(--ink-light)] hover:bg-[var(--gold-light)] hover:text-[var(--burgundy)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex justify-between items-center bg-white p-4 rounded border border-[rgba(0,0,0,0.05)] shadow-sm">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--ink-light)] font-bold mb-1">Current Status</div>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-[var(--ink-light)] font-bold mb-1">Source</div>
              <div className="text-xs font-bold capitalize">{appointment.source || 'Website'}</div>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-[11px] uppercase tracking-wider text-[var(--ink-light)] font-bold mb-3 border-b border-[rgba(0,0,0,0.05)] pb-1">Request Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[10px] text-[var(--ink-light)] mb-1">Service</div>
                  <div className="font-bold">{appointment.service}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--ink-light)] mb-1">Assigned Staff</div>
                  <div className="font-bold">{appointment.assignedStaff}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--ink-light)] mb-1">Preferred Date</div>
                  <div className="font-bold">{formatAppointmentDate(appointment.preferredDate)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--ink-light)] mb-1">Preferred Time</div>
                  <div className="font-bold">{appointment.preferredTime}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] text-[var(--ink-light)] mb-1">Client Notes</div>
                  <div className="bg-white p-3 rounded border border-[rgba(0,0,0,0.05)] text-xs italic">
                    "{appointment.notes || 'No notes provided.'}"
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[11px] uppercase tracking-wider text-[var(--ink-light)] font-bold mb-3 border-b border-[rgba(0,0,0,0.05)] pb-1">Internal Workflow</h3>
              
              <div className="mb-4">
                <label className="text-[10px] text-[var(--ink-light)] mb-1 block">Internal Admin Notes</label>
                <textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  className="w-full bg-white border border-[var(--stone-dark)] rounded p-2 text-xs h-20 focus:outline-none focus:border-[var(--gold)]"
                  placeholder="Add notes for the team..."
                />
              </div>

              {/* Timeline */}
              <div className="relative pl-4 border-l-2 border-[var(--stone-dark)] space-y-4 my-6">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--stone-dark)] border-2 border-[var(--cream)]" />
                  <div className="text-[10px] text-[var(--ink-light)]">{formatAppointmentDate(appointment.createdAt)}</div>
                  <div className="text-xs font-bold">Request Submitted</div>
                </div>
                {appointment.approvedBy && (
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--green)] border-2 border-[var(--cream)]" />
                    <div className="text-[10px] text-[var(--ink-light)]">{formatAppointmentDate(appointment.approvedAt)}</div>
                    <div className="text-xs font-bold">Approved by {appointment.approvedBy}</div>
                  </div>
                )}
                {appointment.rejectedBy && (
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--red)] border-2 border-[var(--cream)]" />
                    <div className="text-[10px] text-[var(--ink-light)]">Updated</div>
                    <div className="text-xs font-bold">Rejected by {appointment.rejectedBy}</div>
                    {appointment.rejectionReason && (
                      <div className="text-xs text-[var(--ink-light)] mt-1">"{appointment.rejectionReason}"</div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {showRejectInput && (
              <div className="bg-[var(--red-light)] p-3 rounded border border-[rgba(139,37,37,0.2)] mb-4">
                <label className="text-[10px] font-bold text-[var(--red)] block mb-1">Reason for Rejection</label>
                <input 
                  type="text" 
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Scheduling conflict, spam"
                  className="w-full px-2 py-1.5 text-xs rounded border border-[var(--red)]/30 focus:outline-none focus:bg-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[rgba(0,0,0,0.05)] bg-white flex flex-col gap-2">
          <div className="flex gap-2">
            {appointment.status !== APPOINTMENT_STATUSES.APPROVED && (
              <button 
                onClick={handleApprove}
                className="flex-1 bg-[var(--green)] text-white py-2.5 rounded text-xs font-bold hover:bg-[var(--green)]/90 transition-colors"
              >
                Approve Request
              </button>
            )}
            {appointment.status !== APPOINTMENT_STATUSES.REJECTED && (
              <button 
                onClick={handleReject}
                className={`flex-1 ${showRejectInput ? 'bg-[var(--red)] text-white' : 'bg-white text-[var(--red)] border border-[var(--red)]'} py-2.5 rounded text-xs font-bold hover:bg-[var(--red-light)] transition-colors`}
              >
                {showRejectInput ? 'Confirm Reject' : 'Reject'}
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleReschedule}
              className="flex-1 bg-white text-[var(--blue)] border border-[var(--blue)] py-2 rounded text-xs font-bold hover:bg-[var(--blue-light)] transition-colors"
            >
              Reschedule
            </button>
            {appointment.status !== APPOINTMENT_STATUSES.COMPLETED && (
              <button 
                onClick={() => onStatusChange(appointment.id, APPOINTMENT_STATUSES.COMPLETED, { internalNotes })}
                className="flex-1 bg-[var(--stone)] text-[var(--ink-mid)] py-2 rounded text-xs font-bold hover:bg-[var(--stone-dark)] transition-colors"
              >
                Mark Completed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
