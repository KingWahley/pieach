'use client';

import TeamPhotoUpload from './TeamPhotoUpload';

export default function TeamBasicFields({ 
  formData, 
  handleChange, 
  handleQualChange, 
  addQualification, 
  removeQualification, 
  handleImageChange,
  errors 
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '30px', alignItems: 'start' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <div className="form-group">
          <label>Title</label>
          <select 
            name="title" 
            value={formData.title || ''} 
            onChange={handleChange}
          >
            <option value="">Select Title</option>
            <option value="Arch.">Arch.</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
          </select>
        </div>
        <div className="form-group">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            Full Name {errors?.name && <span style={{ color: 'var(--red)', textTransform: 'none' }}>Required</span>}
          </label>
          <input 
            name="name" 
            placeholder="Enter full name" 
            value={formData.name || ''} 
            onChange={handleChange}
            style={errors?.name ? { borderColor: 'var(--red)' } : {}}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            Designation {errors?.role && <span style={{ color: 'var(--red)', textTransform: 'none' }}>Required</span>}
          </label>
          <input 
            name="role" 
            placeholder="e.g. Senior Architect" 
            value={formData.role || ''} 
            onChange={handleChange}
            style={errors?.role ? { borderColor: 'var(--red)' } : {}}
          />
        </div>

        <div className="form-group">
          <label style={{ marginBottom: '12px', display: 'block' }}>Qualifications & Certifications</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {formData.qualifications.map((qual, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--cream-light)', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--stone)' }}>
                <input 
                  value={qual}
                  onChange={(e) => handleQualChange(index, e.target.value)}
                  placeholder="e.g. M.Arch"
                  style={{ 
                    border: 'none', 
                    background: 'transparent', 
                    padding: '0', 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: 'var(--burgundy)',
                    width: '80px',
                    outline: 'none'
                  }}
                />
                {formData.qualifications.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => removeQualification(index)}
                    style={{ 
                      border: 'none', 
                      background: 'transparent', 
                      color: 'var(--ink-light)', 
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px'
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button"
              onClick={addQualification}
              style={{ 
                border: '1px dashed var(--gold-dark)', 
                background: 'var(--white)', 
                color: 'var(--gold-dark)', 
                padding: '6px 12px', 
                borderRadius: '6px', 
                fontSize: '11px', 
                fontWeight: '800', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              + ADD NEW
            </button>
          </div>
          <div className="form-helper" style={{ marginTop: '8px' }}>Add multiple professional certifications or academic degrees.</div>
        </div>
      </div>

      <div className="photo-column">
        <TeamPhotoUpload image={formData.image} onChange={handleImageChange} />
      </div>
    </div>
  );
}
