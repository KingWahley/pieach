'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useStore } from '@/hooks/useStore';
import { teamStore } from '@/lib/store';
import TeamBasicFields from './TeamBasicFields';
import TeamPhotoUpload from './TeamPhotoUpload';
import TeamBioField from './TeamBioField';
import TeamSettingsFields from './TeamSettingsFields';
import TeamFormActions from './TeamFormActions';
import TeamMemberPreview from '../TeamMemberPreview';
import { Icons } from '@/components/shared/Icons';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

export default function TeamMemberForm({ mode = 'create', initialData = null }) {
  const router = useRouter();
  const { createItem, updateItem } = useStore(teamStore);
  
  const drawerRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    role: '',
    qualifications: [''],
    image: '',
    bio: '',
    status: 'active',
    displayOrder: '',
    ...initialData,
    bio: initialData?.bio 
      ? (Array.isArray(initialData.bio) ? initialData.bio.join('\n\n') : String(initialData.bio)) 
      : '',
    qualifications: initialData?.qualifications 
      ? (Array.isArray(initialData.qualifications) 
          ? initialData.qualifications.map(q => typeof q === 'object' && q ? (q.title || '') : String(q)) 
          : String(initialData.qualifications).split(',').map(q => q.trim())) 
      : ['']
  });
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ 
        ...prev, 
        ...initialData,
        bio: initialData.bio 
          ? (Array.isArray(initialData.bio) ? initialData.bio.join('\n\n') : String(initialData.bio)) 
          : '',
        qualifications: initialData.qualifications 
          ? (Array.isArray(initialData.qualifications) 
              ? initialData.qualifications.map(q => typeof q === 'object' && q ? (q.title || '') : String(q)) 
              : String(initialData.qualifications).split(',').map(q => q.trim())) 
          : ['']
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (drawerRef.current) {
      gsap.fromTo(drawerRef.current, 
         { y: 20, autoAlpha: 0 }, 
         { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleQualChange = (index, value) => {
    const newQuals = [...formData.qualifications];
    newQuals[index] = value;
    setFormData(prev => ({ ...prev, qualifications: newQuals }));
  };

  const addQualification = () => {
    setFormData(prev => ({ ...prev, qualifications: [...prev.qualifications, ''] }));
  };

  const removeQualification = (index) => {
    setFormData(prev => ({ 
      ...prev, 
      qualifications: prev.qualifications.filter((_, i) => i !== index) 
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = true;
    if (!formData.role?.trim()) newErrors.role = true;
    
    const bioText = Array.isArray(formData.bio) 
      ? formData.bio.join('\n') 
      : (formData.bio || '');
    if (!bioText.trim()) newErrors.bio = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (isDraft = false) => {
    if (!validate()) {
      // Shake animation on error
      gsap.fromTo(drawerRef.current,
        { x: -5 },
        { x: 5, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => gsap.set(drawerRef.current, {x: 0}) }
      );
      return;
    }

    setIsSaving(true);
    setIsPublishConfirmOpen(false);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const finalData = {
      ...formData,
      status: isDraft ? 'archived' : formData.status,
      qualifications: Array.isArray(formData.qualifications)
        ? formData.qualifications
            .filter(q => typeof q === 'string' && q.trim())
            .map(q => ({ title: q.trim().toUpperCase(), detail: '' }))
        : []
    };

    if (mode === 'create') {
      createItem({ ...finalData, id: `t${Date.now()}` });
      setSuccessMsg('Team member created successfully!');
    } else {
      updateItem(formData.id, finalData);
      setSuccessMsg('Team member updated successfully!');
    }

    setIsSaving(false);

    // Redirect after success
    setTimeout(() => {
      router.push('/dashboard/team');
    }, 1000);
  };

  const handlePreview = () => {
    const previewTeamData = {
      ...formData,
      bio: typeof formData.bio === 'string'
        ? formData.bio.split(/\r?\n/).map(p => p.trim()).filter(Boolean)
        : (Array.isArray(formData.bio) ? formData.bio : []),
      qualifications: Array.isArray(formData.qualifications)
        ? formData.qualifications
            .filter(q => typeof q === 'string' && q.trim())
            .map(q => ({ title: q.trim().toUpperCase(), detail: '' }))
        : []
    };

    localStorage.setItem('pieach-team-preview', JSON.stringify(previewTeamData));
    window.open('/team/preview', '_blank');
  };

  return (
    <div className="form-card" ref={drawerRef} style={{ opacity: 0, visibility: 'hidden' }}>
      <div className="card-header">
        <span className="card-title">{mode === 'create' ? 'Add New Team Member' : 'Edit Team Member'}</span>
        {successMsg && (
          <span style={{ fontSize: '10px', color: 'var(--green)', fontWeight: 'bold', marginLeft: '12px' }}>{successMsg}</span>
        )}
      </div>
      <div className="form-body">
        <TeamBasicFields 
          formData={formData} 
          handleChange={handleChange} 
          handleQualChange={handleQualChange}
          addQualification={addQualification}
          removeQualification={removeQualification}
          handleImageChange={handleImageChange}
          errors={errors} 
        />
        <TeamBioField formData={formData} handleChange={handleChange} errors={errors} />
        <TeamSettingsFields formData={formData} handleChange={handleChange} />
      </div>
      <TeamFormActions 
        onSaveDraft={() => handleSave(true)} 
        onSavePublish={() => setIsPublishConfirmOpen(true)} 
        onPreview={handlePreview}
        isSaving={isSaving}
      />

      <ConfirmationModal 
        isOpen={isPublishConfirmOpen}
        onClose={() => setIsPublishConfirmOpen(false)}
        onConfirm={() => handleSave(false)}
        title="Ready to Publish?"
        message={`You are about to ${mode === 'create' ? 'publish this new profile' : 'save changes'} to the live website. Please ensure all details and photos are correct.`}
        confirmText={mode === 'create' ? 'Publish Now' : 'Save & Publish'}
        type="info"
        isLoading={isSaving}
      />
    </div>
  );
}
