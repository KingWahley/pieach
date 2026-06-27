'use client';

import React from 'react';

const DAYS_FULL = [
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' },
  { short: 'Sun', full: 'Sunday' }
];

export default function AvailabilityPreview({ settings }) {
  const { durationPerSlot, maxDurationPerReservation, availableDays = [], timeOption, daySlots = {}, sameTimeSlots = [] } = settings || {};

  const maxBookings = durationPerSlot > 0 
    ? Math.floor(maxDurationPerReservation / durationPerSlot) 
    : 0;

  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const getSlotsForDay = (dayShort) => {
    if (!availableDays.includes(dayShort)) return 'Unavailable';
    
    const slots = timeOption === 'same' ? sameTimeSlots : (daySlots[dayShort] || []);
    if (slots.length === 0) return 'Not configured';
    
    return slots.map(s => `${formatTime(s.start)} to ${formatTime(s.end)}`).join(', ');
  };

  const getStatusForDay = (dayShort) => {
    if (!availableDays.includes(dayShort)) return <span className="status-pill s-opened">Closed</span>;
    
    const slots = timeOption === 'same' ? sameTimeSlots : (daySlots[dayShort] || []);
    if (slots.length === 0) return <span className="status-pill s-pending">Pending Setup</span>;
    
    return <span className="status-pill s-approved">Open</span>;
  };

  return (
    <table className="preview-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Available Slots</th>
          <th>Slot Duration</th>
          <th>Max Bookings per Slot</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {DAYS_FULL.map(day => (
          <tr key={day.short}>
            <td>{day.full}</td>
            <td>{getSlotsForDay(day.short)}</td>
            <td>{availableDays.includes(day.short) ? `${durationPerSlot} minutes` : 'Not applicable'}</td>
            <td>{availableDays.includes(day.short) ? `${maxBookings} bookings` : '0 bookings'}</td>
            <td>{getStatusForDay(day.short)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
