'use client';

import React from 'react';

export default function BookingRulesCard({ settings, onUpdate }) {
  const maxBookings = settings.durationPerSlot > 0 
    ? Math.floor(settings.maxDurationPerReservation / settings.durationPerSlot) 
    : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: parseInt(value) || 0 });
  };

  return (
    <>
      <div className="form-field">
        <label className="field-label">Duration per Slot (minutes) <span className="required">*</span></label>
        <input 
          type="number"
          name="durationPerSlot"
          placeholder="e.g. 60" 
          className="field-input"
          value={settings.durationPerSlot} 
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label className="field-label">Maximum Duration per Reservation (minutes)</label>
        <input 
          type="number"
          name="maxDurationPerReservation"
          placeholder="e.g. 120" 
          className="field-input"
          value={settings.maxDurationPerReservation} 
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label className="field-label">Max Bookings per Slot</label>
        <input className="field-input" value={maxBookings} readOnly style={{ background: 'var(--stone)' }} />
        <div className="form-helper">Auto-calculated: Max reservation duration / Slot duration.</div>
      </div>
    </>
  );
}
