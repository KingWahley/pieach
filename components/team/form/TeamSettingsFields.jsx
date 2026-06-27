'use client';

import React from 'react';

export default function TeamSettingsFields({ formData, handleChange }) {
  return (
    <>
      <div className="form-group">
        <label>Status</label>
        <select 
          name="status"
          value={formData.status || 'active'}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="archived">Inactive</option>
        </select>
      </div>
      <div className="form-group">
        <label>Display Order</label>
        <input 
          name="displayOrder"
          type="number"
          placeholder="e.g. 1" 
          value={formData.displayOrder || ''}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
