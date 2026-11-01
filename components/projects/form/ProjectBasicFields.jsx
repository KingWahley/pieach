import React from 'react';
import { projectStatuses, projectCategories, normalizeProjectCategories } from '@/data/projectOptions';
import RichTextEditor from './RichTextEditor';

export default function ProjectBasicFields({ formData, handleChange, errors, categories = [] }) {
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
      <div className="form-field full" style={errors.category ? { border: '1px solid var(--red)', padding: '12px', borderRadius: '6px', background: 'rgba(220,38,38,0.03)' } : {}}>
        <label>Project Categories {errors.category && <span style={{ color: 'var(--red)', textTransform: 'none', marginLeft: '4px' }}>*Required</span>}</label>
        <div className="category-tags-list">
          {(() => {
            const list = (categories.length > 0 
              ? categories.map(cat => cat.name) 
              : projectCategories.map(cat => cat.label)
            ).map(name => (name || '').trim()).filter(Boolean);
            
            const normalizedCategoryStr = normalizeProjectCategories(formData.category);
            const selectedCats = normalizedCategoryStr
              ? normalizedCategoryStr.split(',').map(c => c.trim()).filter(Boolean) 
              : [];
 
            return list.map(catName => {
              const catLower = catName.toLowerCase();
              const isSelected = selectedCats.some(c => {
                const selLower = c.toLowerCase().trim();
                return selLower === catLower ||
                       catLower.includes(selLower) ||
                       selLower.includes(catLower) ||
                       (catLower.includes('residential') && selLower.includes('residential')) ||
                       (catLower.includes('commercial') && selLower.includes('commercial')) ||
                       (catLower.includes('master') && selLower.includes('master'));
              });

              return (
                <button
                  key={catName}
                  type="button"
                  className={`category-tag-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    let newSelected;
                    if (isSelected) {
                      newSelected = selectedCats.filter(c => {
                        const selLower = c.toLowerCase().trim();
                        const matches = selLower === catLower ||
                                        catLower.includes(selLower) ||
                                        selLower.includes(catLower) ||
                                        (catLower.includes('residential') && selLower.includes('residential')) ||
                                        (catLower.includes('commercial') && selLower.includes('commercial')) ||
                                        (catLower.includes('master') && selLower.includes('master'));
                        return !matches;
                      });
                    } else {
                      newSelected = [...selectedCats, catName];
                    }
                    handleChange({
                      target: {
                        name: 'category',
                        value: normalizeProjectCategories(newSelected.join(', '))
                      }
                    });
                  }}
                >
                  {catName}
                </button>
              );
            });
          })()}
        </div>
        <input type="hidden" name="category" value={formData.category} />
      </div>

      <div className="form-field">
        <label htmlFor="siteArea">Site Area (Optional)</label>
        <input 
          id="siteArea" 
          name="siteArea" 
          placeholder="e.g. 1,200 sqm" 
          value={formData.siteArea || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-field">
        <label htmlFor="builtArea">Built Area (Optional)</label>
        <input 
          id="builtArea" 
          name="builtArea" 
          placeholder="e.g. 850 sqm" 
          value={formData.builtArea || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-field">
        <label htmlFor="leadArchitect">Lead Architect (Optional)</label>
        <input 
          id="leadArchitect" 
          name="leadArchitect" 
          placeholder="e.g. Arch. Segun Adetokunbo" 
          value={formData.leadArchitect || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-field">
        <label htmlFor="services">Services (Optional)</label>
        <input 
          id="services" 
          name="services" 
          placeholder="e.g. Architecture, Interior Design" 
          value={formData.services || ''} 
          onChange={handleChange} 
        />
      </div>

      <div className="form-field full">
        <label>Description {errors.description && <span style={{ color: 'var(--red)', textTransform: 'none', marginLeft: '4px' }}>*Required</span>}</label>
        <RichTextEditor
          value={formData.description}
          onChange={(html) => handleChange({ target: { name: 'description', value: html } })}
          placeholder="Write the main project description — use the toolbar for bold, bullet points, headings and more."
          hasError={!!errors.description}
        />
      </div>
    </>
  );
}
