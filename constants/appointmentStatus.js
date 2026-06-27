export const APPOINTMENT_STATUSES = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  RESCHEDULED: 'Rescheduled',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

export const STATUS_COLORS = {
  [APPOINTMENT_STATUSES.PENDING]: { bg: 'var(--gold-light)', text: 'var(--gold-dark)', dot: 'var(--gold)' },
  [APPOINTMENT_STATUSES.APPROVED]: { bg: 'var(--green-light)', text: 'var(--green)', dot: 'var(--green)' },
  [APPOINTMENT_STATUSES.REJECTED]: { bg: 'var(--red-light)', text: 'var(--red)', dot: 'var(--red)' },
  [APPOINTMENT_STATUSES.RESCHEDULED]: { bg: 'var(--blue-light)', text: 'var(--blue)', dot: 'var(--blue)' },
  [APPOINTMENT_STATUSES.COMPLETED]: { bg: 'var(--stone)', text: 'var(--ink-mid)', dot: 'var(--ink-light)' },
  [APPOINTMENT_STATUSES.CANCELLED]: { bg: '#FFF0F0', text: '#D32F2F', dot: '#D32F2F' }
};

export const APPOINTMENT_SERVICES = [
  'Initial Consultation',
  'Site Assessment',
  'Design Review',
  'Contract Signing',
  'Project Handover'
];
