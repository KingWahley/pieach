import { STATUS_COLORS, APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';

export default function AppointmentStatusBadge({ status, style }) {
  const colorData = STATUS_COLORS[status] || STATUS_COLORS[APPOINTMENT_STATUSES.PENDING];
  
  return (
    <span 
      className="inline-flex items-center justify-center px-3 py-1 rounded-md text-[10px] font-bold tracking-widest"
      style={{
        backgroundColor: colorData.bg,
        color: colorData.text,
        border: `1px solid ${colorData.dot}22`,
        ...style
      }}
    >
      {status?.toUpperCase()}
    </span>
  );
}

