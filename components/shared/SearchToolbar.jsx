import React from 'react';
import { Icons } from './Icons';

export default function SearchToolbar({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "Search...",
  filterOptions = [],
  currentFilter = 'all',
  onFilterChange,
  children
}) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <Icons.search style={{ width: '16px', height: '16px' }} />
        <input 
          type="text" 
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </div>
      
      {filterOptions.length > 0 && (
        <select 
          className="filter-select"
          value={currentFilter}
          onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
      
      {children}
    </div>
  );
}
