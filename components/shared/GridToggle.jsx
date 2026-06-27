import React from 'react';
import { Icons } from './Icons';

export default function GridToggle({ view, onViewChange }) {
  return (
    <div className="view-toggle">
      <button 
        className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
        onClick={() => onViewChange && onViewChange('grid')}
        aria-label="Grid View"
      >
        <Icons.grid style={{ width: '18px', height: '18px' }} />
      </button>
      <button 
        className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
        onClick={() => onViewChange && onViewChange('list')}
        aria-label="List View"
      >
        <Icons.list style={{ width: '18px', height: '18px' }} />
      </button>
    </div>
  );
}
