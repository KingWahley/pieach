import React from 'react';
import { Icons } from '@/components/shared/Icons';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import { STATUS_COLORS, APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';

export default function AppointmentCard({ appointment, onView, onApprove, onReject }) {
  const isPending = appointment.status === APPOINTMENT_STATUSES.PENDING;
  const statusColor = STATUS_COLORS[appointment.status] || STATUS_COLORS[APPOINTMENT_STATUSES.PENDING];

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
        <p className="text-[12px] text-[var(--ink-light)] leading-relaxed">
          {appointment.notes || 'No notes provided for this consultation request.'}
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

