import { formatAppointmentDate } from '@/utils/appointmentHelpers';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import { Icons } from '@/components/shared/Icons';

export default function AppointmentTable({ 
  appointments, 
  onSelectAppointment, 
  selectedAppointmentId,
  onStatusChange,
  onToggleView,
  onDeleteAppointment,
  selectedIds = [],
  onSelectAll,
  onToggleSelect
}) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border-[1.5px] border-[var(--stone)] text-center h-64">
        <div className="w-12 h-12 rounded-full bg-[var(--stone)] flex items-center justify-center mb-4 text-[var(--ink-light)]">
          <Icons.appointments className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-[var(--burgundy)] mb-1">No Appointments Found</h3>
        <p className="text-xs text-[var(--ink-light)] max-w-xs mx-auto">
          There are no appointments matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-[1.5px] border-[var(--stone)] shadow-sm overflow-hidden">
      {/* Table Header Section */}
      <div className="px-6 py-4 border-b-[1.5px] border-[var(--stone)] flex justify-between items-center bg-white">
        <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--ink-mid)]">APPOINTMENT LIST</h3>
        <button 
          onClick={() => window.location.href = '/dashboard/appointments/calendar'}
          className="text-[10px] font-bold text-[var(--gold-dark)] hover:underline uppercase tracking-wider flex items-center gap-1"
        >
          Calendar view <span className="text-xs">→</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--cream-light)] text-[var(--ink-mid)] text-[10px] uppercase tracking-wider font-bold">
              <th className="px-6 py-4 border-b border-[var(--stone)] w-10 text-center">
                <input 
                  type="checkbox" 
                  checked={appointments.length > 0 && selectedIds.length === appointments.length}
                  onChange={onSelectAll}
                  className="rounded border-[var(--stone-dark)] text-[var(--gold)] focus:ring-[var(--gold)] cursor-pointer"
                />
              </th>
              <th className="px-6 py-4 border-b border-[var(--stone)]">Name</th>
              <th className="px-6 py-4 border-b border-[var(--stone)]">Date</th>
              <th className="px-6 py-4 border-b border-[var(--stone)]">Time</th>
              <th className="px-6 py-4 border-b border-[var(--stone)]">Status</th>
              <th className="px-6 py-4 border-b border-[var(--stone)] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--stone)]">
            {appointments.map((apt) => {
              const isSelected = apt.id === selectedAppointmentId;
              const isChecked = selectedIds.includes(apt.id);
              
              return (
                <tr 
                  key={apt.id}
                  className={`group transition-colors hover:bg-[var(--stone-light)] ${isSelected || isChecked ? 'bg-[var(--cream-light)]' : 'bg-white'}`}
                >
                  <td className="px-6 py-5 align-middle text-center">
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => onToggleSelect && onToggleSelect(apt.id)}
                      className="rounded border-[var(--stone-dark)] text-[var(--gold)] focus:ring-[var(--gold)] cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="font-bold text-[var(--burgundy)] text-sm">{apt.clientName}</div>
                    <div className="text-[10px] text-[var(--ink-light)] mt-1 flex items-center gap-1.5 font-semibold">
                      <span>{apt.service}</span>
                      <span className="text-[var(--stone-dark)]">•</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-extrabold ${
                        (apt.message || apt.notes || '').toLowerCase().includes('physical') 
                          ? 'bg-[var(--gold-light)] text-[var(--gold-dark)] border border-[var(--gold)]/20' 
                          : 'bg-[var(--blue-light)] text-[var(--blue)] border border-[var(--blue)]/20'
                      }`}>
                        {(apt.message || apt.notes || '').toLowerCase().includes('physical') ? 'Physical' : 'Remote'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top whitespace-nowrap">
                    <div className="text-xs font-bold text-[var(--ink-mid)]">{formatAppointmentDate(apt.preferredDate)}</div>
                  </td>
                  <td className="px-6 py-5 align-top whitespace-nowrap">
                    <div className="text-xs font-bold text-[var(--ink-mid)]">{apt.preferredTime}</div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <AppointmentStatusBadge status={apt.status} />
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onSelectAppointment(apt.id); }}
                        className="p-1.5 rounded border border-[var(--stone)] bg-white text-[var(--ink-light)] hover:text-[var(--gold-dark)] hover:border-[var(--gold-dark)] transition-all shadow-sm"
                        title="View Details"
                      >
                        <Icons.eye className="w-3.5 h-3.5" />
                      </button>
                      
                      {(apt.status === 'Pending' || apt.status === 'Rejected') && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onStatusChange(apt.id, 'Approved'); }}
                          className="p-1.5 rounded border border-[var(--stone)] bg-white text-[var(--green)] hover:bg-[var(--green-light)] transition-all shadow-sm"
                          title="Approve"
                        >
                          <Icons.check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      
                      {(apt.status === 'Pending' || apt.status === 'Approved') && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onStatusChange(apt.id, 'Rejected'); }}
                          className="p-1.5 rounded border border-[var(--stone)] bg-white text-[var(--red)] hover:bg-[var(--red-light)] transition-all shadow-sm"
                          title="Reject"
                        >
                          <Icons.close className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {onDeleteAppointment && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDeleteAppointment(apt.id); }}
                          className="p-1.5 rounded border border-[var(--stone)] bg-white text-[var(--red)] hover:bg-[var(--red-light)] hover:border-[var(--red)] transition-all shadow-sm"
                          title="Delete Appointment"
                        >
                          <Icons.trash className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
