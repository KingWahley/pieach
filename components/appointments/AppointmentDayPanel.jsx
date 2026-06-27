import React from 'react';
import AppointmentCard from './AppointmentCard';
import { format } from 'date-fns';

export default function AppointmentDayPanel({ 
  selectedDate, 
  appointments, 
  onViewAppointment,
  onStatusChange 
}) {
  const formattedDate = format(selectedDate, 'd MMMM yyyy');
  const count = appointments.length;

  return (
    <div className="flex flex-col bg-white rounded-xl border-[1.5px] border-[var(--stone)] overflow-hidden shadow-sm">
      {/* Header Section */}
      <div className="px-6 py-5 border-b-[1.5px] border-[var(--stone)] flex justify-between items-center bg-[var(--cream-light)]">
        <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--ink-mid)] uppercase">SELECTED DAY SCHEDULE</h3>
        <button className="text-[10px] font-bold text-[var(--gold-dark)] hover:underline uppercase tracking-wider flex items-center gap-1">
          View all <span className="text-xs">→</span>
        </button>
      </div>

      <div className="p-6 space-y-5 bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-[var(--burgundy)] leading-tight">{formattedDate}</h2>
          <div className="text-[12px] text-[var(--ink-light)] font-medium mt-1">
            {count} {count === 1 ? 'appointment' : 'appointments'} scheduled
          </div>
        </div>

        {count === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
            <div className="w-16 h-16 rounded-full bg-[var(--stone-light)] flex items-center justify-center mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <div className="text-sm font-bold text-[var(--ink-mid)] uppercase tracking-widest">No Appointments</div>
            <div className="text-xs mt-2">No schedule for this day.</div>
          </div>
        ) : (
          appointments.map(appt => (
            <AppointmentCard 
              key={appt.id}
              appointment={appt}
              onView={onViewAppointment}
              onApprove={(id) => onStatusChange(id, 'Approved')}
              onReject={(id) => onStatusChange(id, 'Rejected')}
            />
          ))
        )}

        <div className="mt-8 p-4 bg-[#F9F3E5] border border-[#E8DFCA] rounded-md shadow-sm">
          <p className="text-[12px] text-[#420C0C] leading-relaxed">
            Click any appointment on the calendar to view full details before approving or rejecting.
          </p>
        </div>
      </div>
    </div>
  );
}

