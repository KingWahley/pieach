// components/projects/form/ProjectForm.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/hooks/useStore';
import { projectCategoriesStore } from '@/lib/store';
import ProjectBasicFields from './ProjectBasicFields';
import AdditionalDescriptionFields from './AdditionalDescriptionFields';
import GalleryUpload from './GalleryUpload';
import ProjectFormActions from './ProjectFormActions';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import '@/app/(admin)/dashboard/(protected)/projects/new/project-form.css';

export default function ProjectForm({ mode = 'create', initialData = null, onSubmit }) {
  const router = useRouter();
  const { data: categories } = useStore(projectCategoriesStore);
  
  // Helper to split location (e.g. "Abeokuta, Ogun State, Nigeria") into city, state, country
  let initialCity = initialData?.city || '';
  let initialState = initialData?.state || '';
  let initialCountry = initialData?.country || '';

  if (initialData?.location && !initialCity && !initialState && !initialCountry) {
    const parts = initialData.location.split(',').map(s => s.trim());
    if (parts.length === 3) {
      initialCity = parts[0];
      initialState = parts[1];
      initialCountry = parts[2];
    } else if (parts.length === 2) {
      initialCity = parts[0];
      initialCountry = parts[1];
    } else if (parts.length === 1) {
      initialCity = parts[0];
    }
  }

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    status: initialData?.status || 'Ongoing',
    city: initialCity,
    state: initialState,
    country: initialCountry,
    category: initialData?.category || '',
    subtitle: initialData?.subtitle || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    siteArea: initialData?.specs?.siteArea || '',
    builtArea: initialData?.specs?.builtArea || '',
    leadArchitect: initialData?.specs?.leadArchitect || '',
    services: initialData?.specs?.services || ''
  });

  const [additionalFields, setAdditionalFields] = useState(
    initialData?.additionalFields || [
      { id: 'desc-1', title: 'Design Approach', body: 'Describe the architectural thinking, materials, and planning considerations.' },
      { id: 'desc-2', title: 'Key Features', body: 'Add custom project highlights such as floor planning, lighting, landscape, or finishes.' }
    ]
  );

  const [galleryFiles, setGalleryFiles] = useState({
    existingImages: initialData?.gallery || [],
    newImages: [],
    removedImageIds: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAction = async (actionType) => {
    if (!validate()) {
      return;
    }

    if (actionType === 'draft') {
      setIsSaving(true);
    } else {
      setIsPublishing(true);
      setIsPublishConfirmOpen(false);
    }

    try {
      if (onSubmit) {
        await onSubmit({
          ...formData,
          additionalFields,
          galleryFiles
        }, actionType);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setSuccessMessage(`Project successfully ${mode === 'create' ? 'created' : 'updated'}! Redirecting...`);
      
      setTimeout(() => {
        router.push('/dashboard/projects');
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
      setIsPublishing(false);
    }
  };

  const handlePreview = () => {
    const galleryUrls = [
      ...(galleryFiles.existingImages || []).map(img => typeof img === 'string' ? img : (img.url || img.previewUrl || '')),
      ...(galleryFiles.newImages || []).map(img => typeof img === 'string' ? img : (img.url || img.previewUrl || img.preview || ''))
    ].filter(Boolean);

    const previewProjectData = {
      ...formData,
      location: `${formData.city}${formData.state ? `, ${formData.state}` : ''}${formData.country ? `, ${formData.country}` : ''}`,
      additionalFields,
      gallery: galleryUrls,
      id: initialData?.id || `temp-${Date.now()}`,
      slug: initialData?.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      specs: {
        projectType: formData.category,
        status: formData.status,
        siteArea: formData.siteArea || '',
        builtArea: formData.builtArea || '',
        leadArchitect: formData.leadArchitect || '',
        services: formData.services || ''
      }
    };

    localStorage.setItem('pieach-project-preview', JSON.stringify(previewProjectData));
    window.open('/projects/preview', '_blank');
  };

  return (
    <div className="form-drawer">
      <div className="card-header" style={{ padding: '14px 18px', borderBottom: '1px solid var(--stone)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--cream)' }}>
        <span className="card-title" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {mode === 'create' ? 'Add New Project Form' : 'Edit Project Form'}
        </span>
        {successMessage && (
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--green)', background: 'var(--green-light)', padding: '4px 10px', borderRadius: '4px' }}>
            {successMessage}
          </span>
        )}
      </div>
      
      <div className="form-grid">
        <ProjectBasicFields 
          formData={formData} 
          handleChange={handleChange} 
          errors={errors} 
          categories={categories}
        />
        
        <AdditionalDescriptionFields 
          additionalFields={additionalFields} 
          setAdditionalFields={setAdditionalFields} 
        />
        
        <GalleryUpload 
          galleryFiles={galleryFiles} 
          setGalleryFiles={setGalleryFiles} 
          errors={errors} 
        />
      </div>
      
      <ProjectFormActions 
        isSaving={isSaving} 
        isPublishing={isPublishing} 
        handleSaveDraft={() => handleAction('draft')} 
        handlePublish={() => setIsPublishConfirmOpen(true)} 
        handlePreview={handlePreview}
      />

      <ConfirmationModal 
        isOpen={isPublishConfirmOpen}
        onClose={() => setIsPublishConfirmOpen(false)}
        onConfirm={() => handleAction('publish')}
        title="Publish Project?"
        message={`Are you sure you want to ${mode === 'create' ? 'publish this new project' : 'save changes'} to the live portfolio? This will update the project details on the website immediately.`}
        confirmText={mode === 'create' ? 'Publish Now' : 'Save & Publish'}
        type="info"
        isLoading={isPublishing}
      />
    </div>
  );
}
