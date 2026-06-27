'use client';

import React, { useState } from 'react';
import TimeSlotList from './TimeSlotList';

export default function DayAccordion({ day, isSelected, slots, onAdd, onRemove }) {
  const [isOpen, setIsOpen] = useState(day.short === 'Mon'); // Open Monday by default as in reference

  return (
    <div className={`day-accordion-item ${isOpen ? 'open' : ''}`}>
      <div 
        className={`day-accordion-head ${!isOpen ? 'light' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{day.full}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>⌄</span>
      </div>
      <div className="day-accordion-body">
        {isSelected ? (
          <TimeSlotList 
            slots={slots} 
            onAdd={onAdd} 
            onRemove={onRemove} 
          />
        ) : (
          <div className="blocked-note">{day.full} is currently not selected as an available booking day.</div>
        )}
      </div>
    </div>
  );
}
