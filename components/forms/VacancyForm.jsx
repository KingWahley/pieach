'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/shared/Icons';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

export default function VacancyForm({ initialData, onSave, onCancel, isNew = false }) {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    department: initialData?.department || 'Architecture',
    location: initialData?.location || '',
    type: initialData?.type || 'Full-time',
    status: initialData?.status === 'published' ? 'Open' : initialData?.status === 'draft' ? 'Draft' : initialData?.status || 'Open',
    deadline: initialData?.deadline || '',
    description: initialData?.description || '',
    skills: initialData?.skills || [
      { title: '', description: '' }
    ]
  });

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { title: '', description: '' }]
    });
  };

  const handleRemoveSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSave = (publish = false) => {
    if (publish) {
      setIsPublishing(true);
      setIsPublishModalOpen(true);
    } else {
      executeSave(false);
    }
  };

  const confirmPublish = () => {
    executeSave(true);
    setIsPublishModalOpen(false);
  };

  const executeSave = (publish) => {
    const finalData = {
      ...formData,
      status: publish ? 'published' : 'draft',
      datePosted: new Date().toISOString().split('T')[0]
    };
    onSave(finalData, publish);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 11px',
    border: '1px solid var(--stone-dark)',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'var(--ink)',
    outline: 'none',
    background: 'var(--cream)',
    fontFamily: 'Verdana, Geneva, sans-serif'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'var(--burgundy)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '6px',
    fontFamily: 'Verdana, Geneva, sans-serif'
  };

  return (
    <div style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
      {/* Form Container */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--stone)', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            {isNew ? 'ADD NEW VACANCY FORM' : 'EDIT VACANCY FORM'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', padding: '16px' }}>
          {/* Job Title */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>JOB TITLE</label>
            <input 
              type="text" 
              placeholder="e.g. Senior Architect"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              style={inputStyle}
            />
          </div>

          {/* Row: Employment Type & Status */}
          <div>
            <label style={labelStyle}>EMPLOYMENT TYPE</label>
            <select 
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\' fill=\'none\'%3E%3Cpath d=\'M1 1L5 5L9 1\' stroke=\'%2332171B\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>STATUS</label>
            <select 
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\' fill=\'none\'%3E%3Cpath d=\'M1 1L5 5L9 1\' stroke=\'%2332171B\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
            >
              <option value="Open">Open</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Row: Location & Deadline */}
          <div>
            <label style={labelStyle}>LOCATION</label>
            <input 
              type="text" 
              placeholder="e.g. Lagos, Nigeria"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>APPLICATION DEADLINE</label>
            <input 
              type="date" 
              value={formData.deadline}
              onChange={e => setFormData({...formData, deadline: e.target.value})}
              style={{ ...inputStyle, appearance: 'none' }}
            />
          </div>

          {/* Job Description */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>JOB DESCRIPTION</label>
            <textarea 
              placeholder="Describe the role, responsibilities, and expectations."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              style={{ ...inputStyle, minHeight: '86px', resize: 'vertical' }}
            />
          </div>

          {/* Skills Section */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>SKILLS</label>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {formData.skills.map((skill, index) => (
                <div key={index} style={{ border: '1px dashed var(--stone-dark)', background: '#FCFAF6', borderRadius: '6px', padding: '12px', display: 'grid', gridTemplateColumns: '240px 1fr auto', gap: '10px', alignItems: 'start' }}>
                  <input 
                    type="text" 
                    placeholder="Skill Title"
                    value={skill.title}
                    onChange={e => handleSkillChange(index, 'title', e.target.value)}
                    style={{ ...inputStyle, background: 'var(--cream)' }}
                  />
                  <textarea 
                    placeholder="Skill Description"
                    value={skill.description}
                    onChange={e => handleSkillChange(index, 'description', e.target.value)}
                    style={{ ...inputStyle, minHeight: '84px', resize: 'vertical', background: 'var(--cream)' }}
                  />
                  <button 
                    onClick={() => handleRemoveSkill(index)}
                    style={{ 
                      padding: '10px 14px', border: '1px solid var(--stone-dark)', borderRadius: '6px', 
                      background: 'var(--white)', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
                      color: 'var(--burgundy)', fontFamily: 'Verdana, sans-serif'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                <button 
                  type="button"
                  onClick={handleAddSkill}
                  style={{ 
                    background: 'var(--gold-light)', color: 'var(--burgundy)', border: '1px solid var(--gold)',
                    padding: '9px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold',
                    fontFamily: 'Verdana, sans-serif', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '7px'
                  }}
                >
                  <Icons.plus style={{ width: '13px', height: '13px' }} />
                  Add Skill
                </button>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '5px', lineHeight: '1.45' }}>Each skill should include a title and a short description.</div>
          </div>
        </div>

        {/* Form Actions */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--stone)', background: 'var(--cream)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {onCancel && (
            <button 
              type="button"
              onClick={onCancel}
              style={{ 
                padding: '10px 14px', border: '1px solid var(--stone-dark)', borderRadius: '6px', 
                background: 'transparent', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
                color: 'var(--ink-mid)', fontFamily: 'Verdana, sans-serif'
              }}
            >
              Cancel
            </button>
          )}
          <button 
            onClick={() => handleSave(false)}
            style={{ 
              padding: '10px 14px', border: '1px solid var(--stone-dark)', borderRadius: '6px', 
              background: 'var(--white)', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
              color: 'var(--burgundy)', fontFamily: 'Verdana, sans-serif'
            }}
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSave(true)}
            style={{ 
              background: 'var(--burgundy)', color: 'var(--white)', border: '1px solid var(--burgundy)',
              padding: '11px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold',
              fontFamily: 'Verdana, sans-serif', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px'
            }}
          >
            Save and Publish
          </button>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={confirmPublish}
        title="Confirm Publication"
        message="You are about to publish this vacancy listing. It will be immediately visible on the career section of the live website. Do you want to proceed?"
        confirmText="Confirm & Publish"
        type="warning"
      />
    </div>
  );
}
