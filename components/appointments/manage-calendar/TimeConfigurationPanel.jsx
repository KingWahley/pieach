'use client';

import React from 'react';
import DayAccordion from './DayAccordion';
import TimeSlotList from './TimeSlotList';

const DAYS_FULL = [
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' },
  { short: 'Sun', full: 'Sunday' }
];

export default function TimeConfigurationPanel({ settings, onUpdate }) {
  const { timeOption, availableDays = [], daySlots = {}, sameTimeSlots = [] } = settings || {};

  const handleOptionChange = (e) => {
    onUpdate({ timeOption: e.target.value });
  };

  const addSlot = (day, slot) => {
    if (day === 'all') {
      onUpdate({ sameTimeSlots: [...sameTimeSlots, { ...slot, id: Date.now().toString() }] });
    } else {
      onUpdate({
        daySlots: {
          ...daySlots,
          [day]: [...(daySlots[day] || []), { ...slot, id: Date.now().toString() }]
        }
      });
    }
  };

  const removeSlot = (day, slotId) => {
    if (day === 'all') {
      onUpdate({ sameTimeSlots: sameTimeSlots.filter(s => s.id !== slotId) });
    } else {
      onUpdate({
        daySlots: {
          ...daySlots,
          [day]: (daySlots[day] || []).filter(s => s.id !== slotId)
        }
      });
    }
  };

  return (
    <div className="time-config-grid">
      <div className="time-option-panel">
        <div className="form-field">
          <label className="field-label">Time Configuration Method</label>
          <select className="field-input" value={timeOption} onChange={handleOptionChange}>
            <option value="same">Same time everyday</option>
            <option value="different">Different time for each day</option>
          </select>
        </div>
        <div className="empty-note">
          Select “Same time everyday” if all selected days share identical hours. Select “Different time for each day” for unique schedules per day.
        </div>
      </div>

      <div className="time-slot-panel">
        {timeOption === 'same' ? (
          <>
            <div style={{ marginBottom: '12px', fontWeight: 'bold', fontSize: '12px', color: 'var(--burgundy)' }}>Configure Shared Time Slots</div>
            <TimeSlotList 
              slots={sameTimeSlots} 
              onAdd={(slot) => addSlot('all', slot)} 
              onRemove={(id) => removeSlot('all', id)}
            />
          </>
        ) : (
          <>
            <div style={{ marginBottom: '12px', fontWeight: 'bold', fontSize: '12px', color: 'var(--burgundy)' }}>Configure Individual Day Schedules</div>
            <div className="day-accordion">
              {DAYS_FULL.map(day => (
                <DayAccordion 
                  key={day.short}
                  day={day}
                  isSelected={availableDays.includes(day.short)}
                  slots={daySlots[day.short] || []}
                  onAdd={(slot) => addSlot(day.short, slot)}
                  onRemove={(id) => removeSlot(day.short, id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
