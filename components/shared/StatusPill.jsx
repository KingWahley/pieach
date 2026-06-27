import React from 'react';

const statusConfig = {
  // Vacancy Statuses
  published: { className: 's-approved', label: 'OPEN' },
  open: { className: 's-approved', label: 'OPEN' },
  draft: { className: 's-pending', label: 'DRAFT' },
  closed: { className: 's-opened', label: 'CLOSED' },
  archived: { className: 's-opened', label: 'ARCHIVED' },
  
  // Job Application Statuses
  new: { className: 's-new', label: 'NEW' },
  shortlisted: { className: 's-shortlisted', label: 'SHORTLISTED' },
  rejected: { className: 's-rejected', label: 'REJECTED' },
  interview: { className: 's-pending', label: 'INTERVIEW' },
  reviewed: { className: 's-pending', label: 'REVIEWED' },
  
  // Generic / Messages / Appointments
  active: { className: 's-approved', label: 'ACTIVE' },
  read: { className: 's-opened', label: 'READ' },
  unread: { className: 's-new', label: 'UNREAD' },
  replied: { className: 's-approved', label: 'REPLIED' },
  scheduled: { className: 's-pending', label: 'SCHEDULED' },
};

export default function StatusPill({ status }) {
  const config = statusConfig[status?.toLowerCase()] || { className: 's-opened', label: status };
  return (
    <span className={`status-pill ${config.className}`}>
      {config.label}
    </span>
  );
}
