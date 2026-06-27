'use client';

import React, { useState } from 'react';

export default function TimeSlotList({ slots, onAdd, onRemove }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAdd = () => {
    if (startTime && endTime) {
      if (startTime >= endTime) {
        alert('End time must be after start time.');
        return;
      }
      onAdd({ start: startTime, end: endTime });
      setStartTime('');
      setEndTime('');
    }
  };

  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <div className="time-row">
        <input 
          type="time" 
          className="field-input"
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
        />
        <div className="time-separator">to</div>
        <input 
          type="time" 
          className="field-input"
          value={endTime} 
          onChange={(e) => setEndTime(e.target.value)} 
        />
        <button 
          className="primary-btn" 
          type="button" 
          onClick={handleAdd}
          disabled={!startTime || !endTime}
          style={{ padding: '8px 12px' }}
        >
          Add
        </button>
      </div>
      
      <div className="slot-list">
        {slots.map((slot) => (
          <div key={slot.id} className="slot-chip">
            <span>{formatTime(slot.start)} to {formatTime(slot.end)}</span>
            <button className="remove-slot" onClick={() => onRemove(slot.id)}>×</button>
          </div>
        ))}
        {slots.length === 0 && (
          <div className="empty-note" style={{ background: 'var(--cream)', borderStyle: 'dashed' }}>
            No time slots added for this configuration.
          </div>
        )}
      </div>
    </div>
  );
}
