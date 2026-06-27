import React from 'react';
import { projectStatuses, projectCategories, countryOptions } from '@/data/projectOptions';

export default function ProjectBasicFields({ formData, handleChange, errors }) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="title">Project Title {errors.title && <span style={{ color: 'var(--red)', textTransform: 'none', marginLeft: '4px' }}>*Required</span>}</label>
        <input 
          id="title"
          name="title"
          placeholder="Enter project title" 
          value={formData.title} 
          onChange={handleChange}
          style={errors.title ? { borderColor: 'var(--red)' } : {}}
          />
      </div>
      <div className="form-field full">
        <label htmlFor="subtitle">Subtitle</label>
        <input 
          id="subtitle"
          name="subtitle"
          placeholder="Enter a brief subtitle or tagline" 
          value={formData.subtitle} 
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="status">Project Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          {projectStatuses.map(status => (
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="city">City</label>
        <input id="city" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label htmlFor="state">State</label>
        <input id="state" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label htmlFor="country">Country</label>
        <input id="country" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label htmlFor="category">Project Category {errors.category && <span style={{ color: 'var(--red)', textTransform: 'none', marginLeft: '4px' }}>*Required</span>}</label>
        <select 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
          style={errors.category ? { borderColor: 'var(--red)' } : {}}
        >
          <option value="" disabled>Select a category</option>
          {projectCategories.map(cat => (
            <option key={cat.value} value={cat.label}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div className="form-field full">
        <label htmlFor="description">Description {errors.description && <span style={{ color: 'var(--red)', textTransform: 'none', marginLeft: '4px' }}>*Required</span>}</label>
        <textarea 
          id="description"
          name="description"
          placeholder="Write the main project description"
          value={formData.description}
          onChange={handleChange}
          style={errors.description ? { borderColor: 'var(--red)' } : {}}
        />
      </div>
    </>
  );
}
