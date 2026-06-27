'use client';

import React from 'react';

export default function TeamBioField({ formData, handleChange, errors }) {
  return (
    <div className="form-group">
      <label style={{ display: 'flex', justifyContent: 'space-between' }}>
        Bio {errors?.bio && <span style={{ color: 'var(--red)', textTransform: 'none' }}>Required</span>}
      </label>
      <textarea 
        name="bio"
        placeholder="Write a short professional bio for this team member."
        value={formData.bio || ''}
        onChange={handleChange}
        style={errors?.bio ? { borderColor: 'var(--red)' } : {}}
      />
    </div>
  );
}
