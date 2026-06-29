import React from 'react';
import { Icons } from '@/components/shared/Icons';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import { STATUS_COLORS, APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';

const parseMessage = (msg) => {
  if (!msg) return { format: '', context: '', location: '', description: 'No details provided.' };
  
  const formatMatch = msg.match(/Format:\s*([^\.]+)/i);
  const contextMatch = msg.match(/Context:\s*([^\.]+)/i);
  const locationMatch = msg.match(/Location:\s*([^\.]+)/i);
  const descMatch = msg.match(/Description:\s*(.*)/i);

  return {
    format: formatMatch ? formatMatch[1].trim() : '',
    context: contextMatch ? contextMatch[1].trim() : '',
    location: locationMatch ? locationMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : msg
  };
};

export default function AppointmentCard({ appointment, onView, onApprove, onReject }) {
  const isPending = appointment.status === APPOINTMENT_STATUSES.PENDING;
  const statusColor = STATUS_COLORS[appointment.status] || STATUS_COLORS[APPOINTMENT_STATUSES.PENDING];
  const parsed = parseMessage(appointment.message);

  return (
    <div 
      className="bg-white p-5 rounded-lg border border-[rgba(0,0,0,0.05)] shadow-sm hover:shadow-md transition-all relative"
      style={{ borderLeft: `4px solid ${statusColor.dot}` }}
    >
      <div className="mb-4">
        <div className="text-[12px] font-bold text-[var(--gold-dark)] mb-1">
          {appointment.preferredTime}
        </div>
        <div className="text-base font-extrabold text-[var(--burgundy)] mb-1">
          {appointment.clientName}
        </div>
        <div className="text-[10px] text-[var(--ink-light)] font-semibold mb-1 flex items-center gap-1.5">
          <span>{appointment.service}</span>
          <span className="text-[var(--stone-dark)]">•</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-extrabold ${
            (appointment.message || appointment.notes || '').toLowerCase().includes('physical') 
              ? 'bg-[var(--gold-light)] text-[var(--gold-dark)] border border-[var(--gold)]/20' 
              : 'bg-[var(--blue-light)] text-[var(--blue)] border border-[var(--blue)]/20'
          }`}>
            {(appointment.message || appointment.notes || '').toLowerCase().includes('physical') ? 'Physical' : 'Remote'}
          </span>
        </div>
        <p className="text-[12px] text-[var(--ink-light)] leading-relaxed italic line-clamp-2">
          "{parsed.description}"
        </p>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <AppointmentStatusBadge status={appointment.status} />
        
        <div className="flex gap-2">
          <button 
            onClick={() => onView(appointment)}
            className="p-2 rounded-md border border-[var(--stone-dark)] text-[var(--ink-light)] hover:bg-[var(--stone-light)] transition-colors bg-white shadow-sm"
            title="View Details"
          >
            <Icons.eye className="w-4 h-4" />
          </button>
          
          {isPending && (
            <>
              <button 
                onClick={() => onApprove(appointment.id)}
                className="p-2 rounded-md border border-[var(--stone-dark)] text-[var(--ink-mid)] hover:bg-[var(--green-light)] transition-colors bg-white shadow-sm"
                title="Approve"
              >
                <Icons.check className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onReject(appointment.id)}
                className="p-2 rounded-md border border-[var(--stone-dark)] text-[var(--ink-mid)] hover:bg-[var(--red-light)] transition-colors bg-white shadow-sm"
                title="Reject"
              >
                <Icons.close className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
