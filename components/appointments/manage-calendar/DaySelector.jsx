'use client';

import React from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DaySelector({ selectedDays = [], onUpdate }) {
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      onUpdate(selectedDays.filter(d => d !== day));
    } else {
      onUpdate([...selectedDays, day]);
    }
  };

  const selectAll = () => onUpdate([...DAYS]);
  const clearAll = () => onUpdate([]);

  return (
    <div className="day-buttons">
      {DAYS.map(day => (
        <button 
          key={day}
          type="button"
          className={`day-btn ${selectedDays.includes(day) ? 'active' : ''}`}
          onClick={() => toggleDay(day)}
        >
          {day}
        </button>
      ))}
      <button 
        type="button"
        className={`day-btn ${selectedDays.length === 7 ? 'active' : ''}`}
        onClick={selectAll}
      >
        Everyday
      </button>
      <button 
        type="button"
        className="day-btn" 
        style={{ marginLeft: 'auto', border: 'none', background: 'transparent', color: 'var(--gold-dark)', textDecoration: 'underline', minWidth: 'auto' }}
        onClick={clearAll}
      >
        Clear All
      </button>
    </div>
  );
}
