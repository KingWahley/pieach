// components/projects/form/ProjectForm.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/hooks/useStore';
import { projectCategoriesStore } from '@/lib/store';
import ProjectBasicFields from './ProjectBasicFields';
import AdditionalDescriptionFields from './AdditionalDescriptionFields';
import GalleryUpload from './GalleryUpload';
import ProjectFormActions from './ProjectFormActions';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import '@/app/(admin)/dashboard/(protected)/projects/new/project-form.css';

// ─────────────────────────────────────────────────────────────────────────────
// SVG step icons (no emoji)
// ─────────────────────────────────────────────────────────────────────────────
const StepIcons = {
  validate: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  assets: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  saving: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  live: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

const PUBLISH_STEPS = [
  { id: 'validate', label: 'Validating project data',   durationMs: 650 },
  { id: 'assets',   label: 'Processing gallery assets', durationMs: 950 },
  { id: 'saving',   label: 'Saving to database',        durationMs: 850 },
  { id: 'live',     label: 'Publishing to live site',   durationMs: 700 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Publishing overlay
// ─────────────────────────────────────────────────────────────────────────────
function PublishingOverlay({ projectTitle, onDone }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [doneSteps,   setDoneSteps]   = useState([]);
  const [success,     setSuccess]     = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let idx = 0;
    const tick = () => {
      if (idx >= PUBLISH_STEPS.length) {
        setSuccess(true);
        timerRef.current = setTimeout(onDone, 2000);
        return;
      }
      setCurrentStep(idx);
      timerRef.current = setTimeout(() => {
        setDoneSteps(prev => [...prev, idx]);
        idx++;
        tick();
      }, PUBLISH_STEPS[idx].durationMs);
    };
    tick();
    return () => clearTimeout(timerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(12, 5, 7, 0.94)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <style>{`
        @keyframes pgFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes pgSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pgSpin    { to{transform:rotate(360deg)} }
        @keyframes pgPop     { 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes pgBarFill { from{width:0} to{width:100%} }
        @keyframes pgCheckDraw { from{stroke-dashoffset:30} to{stroke-dashoffset:0} }
        .pg-overlay { animation: pgFadeIn 0.3s ease }
        .pg-card    { animation: pgSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) }
        .pg-pop     { animation: pgPop 0.5s cubic-bezier(0.22,1,0.36,1) }
      `}</style>

      <div className="pg-card" style={{
        background: 'linear-gradient(160deg,#1c0a0d 0%,#261014 100%)',
        border: '1px solid rgba(213,167,63,0.22)',
        borderRadius: 14,
        padding: '48px 56px',
        width: 460,
        maxWidth: '92vw',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(213,167,63,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient top-right glow */}
        <div style={{
          position:'absolute', top:-80, right:-80,
          width:240, height:240,
          background:'radial-gradient(circle,rgba(213,167,63,0.12) 0%,transparent 70%)',
          pointerEvents:'none',
        }}/>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:40 }}>
          {success ? (
            <div className="pg-pop" style={{ marginBottom:14 }}>
              {/* Animated checkmark circle */}
              <svg width="64" height="64" viewBox="0 0 52 52" style={{ display:'block', margin:'0 auto' }}>
                <circle cx="26" cy="26" r="25" fill="none" stroke="#D5A73F" strokeWidth="2.5"
                  style={{ strokeDasharray:166, strokeDashoffset:0 }}/>
                <path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" stroke="#D5A73F" strokeWidth="3.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ strokeDasharray:48, strokeDashoffset:0, animation:'pgCheckDraw 0.45s ease 0.1s both' }}/>
              </svg>
            </div>
          ) : (
            <div style={{ marginBottom:14 }}>
              <div style={{
                width:52, height:52,
                border:'3px solid rgba(213,167,63,0.18)',
                borderTop:'3px solid #D5A73F',
                borderRadius:'50%',
                animation:'pgSpin 0.85s linear infinite',
                margin:'0 auto',
              }}/>
            </div>
          )}

          <div style={{
            fontSize:10, fontWeight:900, letterSpacing:'0.2em',
            textTransform:'uppercase', color:'#D5A73F', marginBottom:8,
          }}>
            {success ? 'Published Successfully' : 'Publishing Project'}
          </div>
          <div style={{ fontSize:17, fontWeight:700, color:'#f5e6c8', lineHeight:1.3 }}>
            {projectTitle || 'Your Project'}
          </div>
          {success && (
            <div style={{ fontSize:11, color:'rgba(245,230,200,0.5)', marginTop:7, letterSpacing:'0.04em' }}>
              Redirecting to projects list…
            </div>
          )}
        </div>

        {/* Step list */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {PUBLISH_STEPS.map((step, i) => {
            const isDone    = doneSteps.includes(i);
            const isActive  = !isDone && currentStep === i && !success;
            const isPending = !isDone && !isActive;
            const col = isDone || success ? '#D5A73F' : isActive ? '#f5e6c8' : 'rgba(245,230,200,0.3)';

            return (
              <div key={step.id} style={{ display:'flex', alignItems:'center', gap:14, opacity: isPending && !success ? 0.3 : 1, transition:'opacity 0.4s' }}>

                {/* Icon circle */}
                <div style={{
                  width:38, height:38, borderRadius:'50%', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: isDone || success ? 'rgba(213,167,63,0.15)' : isActive ? 'rgba(213,167,63,0.07)' : 'rgba(255,255,255,0.03)',
                  border:`1.5px solid ${isDone || success ? '#D5A73F' : isActive ? 'rgba(213,167,63,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  color: isDone || success ? '#D5A73F' : isActive ? 'rgba(245,230,200,0.8)' : 'rgba(245,230,200,0.25)',
                  transition:'all 0.35s',
                }}>
                  {isDone || success
                    ? <div style={{ color:'#D5A73F' }}>{StepIcons.check}</div>
                    : StepIcons[step.id]
                  }
                </div>

                {/* Label + progress bar */}
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:col, marginBottom:6, transition:'color 0.35s' }}>
                    {step.label}
                  </div>
                  <div style={{ height:2, background:'rgba(255,255,255,0.05)', borderRadius:1, overflow:'hidden' }}>
                    <div style={{
                      height:'100%', background:'#D5A73F', borderRadius:1,
                      width: isDone || success ? '100%' : isActive ? '65%' : '0%',
                      transition: isActive ? `width ${step.durationMs * 0.88}ms ease` : 'width 0.35s ease',
                    }}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main form
// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectForm({ mode = 'create', initialData = null, onSubmit, saveDraftRef }) {
  const router = useRouter();
  const { data: categories } = useStore(projectCategoriesStore);

  // Split stored location string into city / state / country
  let initialCity    = initialData?.city    || '';
  let initialState   = initialData?.state   || '';
  let initialCountry = initialData?.country || '';
  if (initialData?.location && !initialCity && !initialState && !initialCountry) {
    const parts = initialData.location.split(',').map(s => s.trim());
    if (parts.length === 3)      { initialCity = parts[0]; initialState = parts[1]; initialCountry = parts[2]; }
    else if (parts.length === 2) { initialCity = parts[0]; initialCountry = parts[1]; }
    else if (parts.length === 1) { initialCity = parts[0]; }
  }

  const [formData, setFormData] = useState({
    title:         initialData?.title         || '',
    status:        initialData?.status        || 'Ongoing',
    city:          initialCity,
    state:         initialState,
    country:       initialCountry,
    category:      initialData?.category      || '',
    subtitle:      initialData?.subtitle      || '',
    description:   initialData?.description   || '',
    siteArea:      initialData?.specs?.siteArea      || '',
    builtArea:     initialData?.specs?.builtArea     || '',
    leadArchitect: initialData?.specs?.leadArchitect || '',
    services:      initialData?.specs?.services      || '',
  });

  const [coverImage,  setCoverImage]  = useState(initialData?.image || '');
  const [galleryFiles, setGalleryFiles] = useState({
    existingImages:  initialData?.gallery || [],
    newImages:       [],
    removedImageIds: [],
  });
  const [additionalFields, setAdditionalFields] = useState(
    initialData?.additionalFields || [
      { id: 'desc-1', title: 'Design Approach', body: 'Describe the architectural thinking, materials, and planning considerations.' },
      { id: 'desc-2', title: 'Key Features',    body: 'Add custom project highlights such as floor planning, lighting, landscape, or finishes.' },
    ]
  );

  const [errors,               setErrors]               = useState({});
  const [validationBanner,     setValidationBanner]     = useState('');   // inline error banner text
  const [isSaving,             setIsSaving]             = useState(false);
  const [isPublishing,         setIsPublishing]         = useState(false);
  const [showPublishOverlay,   setShowPublishOverlay]   = useState(false);
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);
  const [isNoImageConfirmOpen, setIsNoImageConfirmOpen] = useState(false);
  const [pendingAction,        setPendingAction]        = useState(null);  // 'draft' | 'publish'
  const [successMessage,       setSuccessMessage]       = useState('');

  // If the user publishes from the preview tab, redirect this edit tab away
  // to prevent a second accidental submit.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'pieach-project-published') {
        localStorage.removeItem('pieach-project-published');
        router.push('/dashboard/projects');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (validationBanner) setValidationBanner('');
  };

  // Returns true if valid, false + sets errors + sets banner if not
  const validate = () => {
    const newErrors = {};
    const missing = [];
    if (!formData.title.trim())       { newErrors.title       = 'Required'; missing.push('Project Title'); }
    if (!formData.category)           { newErrors.category    = 'Required'; missing.push('Project Category'); }
    if (!formData.description.trim()) { newErrors.description = 'Required'; missing.push('Description'); }

    setErrors(newErrors);
    if (missing.length) {
      setValidationBanner(`Please fill in the required field${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}.`);
      // Scroll to top of form so the user sees the banner
      document.querySelector('.form-drawer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return false;
    }
    setValidationBanner('');
    return true;
  };

  // Check if the project has any images at all
  const hasImages = () => {
    const visibleExisting = (galleryFiles.existingImages || []).filter(
      img => !(galleryFiles.removedImageIds || []).includes(img.id || img.url || img)
    );
    return visibleExisting.length > 0 || (galleryFiles.newImages || []).length > 0 || !!coverImage;
  };

  // Called when user clicks "Save Draft" or "Publish Now" in the confirm modal
  const executeAction = async (actionType) => {
    if (actionType === 'draft') {
      setIsSaving(true);
    } else {
      setIsPublishing(true);
      setIsPublishConfirmOpen(false);
      setShowPublishOverlay(true);
    }

    try {
      if (onSubmit) {
        await onSubmit({
          ...formData,
          image: coverImage,
          additionalFields,
          galleryFiles,
        }, actionType);
      } else {
        await new Promise(resolve => setTimeout(resolve, 3000)); // dev simulation
      }

      if (actionType !== 'publish') {
        setSuccessMessage('Project saved as draft. Redirecting…');
        setIsSaving(false);
        setTimeout(() => router.push('/dashboard/projects'), 1500);
      }
      // For publish: overlay handles the redirect via onDone
    } catch (err) {
      console.error(err);
      setIsSaving(false);
      setIsPublishing(false);
      setShowPublishOverlay(false);
    }
  };

  // Entry point for both buttons — validates first, then checks images
  const handleAction = (actionType) => {
    if (!validate()) return;

    if (!hasImages()) {
      // Ask the user whether to continue without images
      setPendingAction(actionType);
      setIsNoImageConfirmOpen(true);
      return;
    }

    if (actionType === 'publish') {
      setIsPublishConfirmOpen(true);
    } else {
      executeAction('draft');
    }
  };

  // Expose draft-save trigger to parent (for the unsaved-changes guard)
  useEffect(() => {
    if (saveDraftRef) {
      saveDraftRef.current = () => handleAction('draft');
    }
    return () => {
      if (saveDraftRef) saveDraftRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveDraftRef]);

  const handleOverlayDone = () => router.push('/dashboard/projects');

  const handlePreview = () => {
    const visibleExisting = (galleryFiles.existingImages || []).filter(
      img => !(galleryFiles.removedImageIds || []).includes(img.id || img.url || img)
    );
    const galleryUrls = [
      ...visibleExisting.map(img => typeof img === 'string' ? img : (img.url || img.previewUrl || '')),
      ...(galleryFiles.newImages      || []).map(img => typeof img === 'string' ? img : (img.url || img.previewUrl || img.preview || '')),
    ].filter(Boolean);

    const previewProjectData = {
      ...formData,
      image: coverImage || galleryUrls[0] || '',
      location: `${formData.city}${formData.state ? `, ${formData.state}` : ''}${formData.country ? `, ${formData.country}` : ''}`,
      additionalFields,
      gallery: galleryUrls,
      id:   initialData?.id   || `temp-${Date.now()}`,
      slug: initialData?.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      specs: {
        projectType:   formData.category,
        status:        formData.status,
        siteArea:      formData.siteArea      || '',
        builtArea:     formData.builtArea     || '',
        leadArchitect: formData.leadArchitect || '',
        services:      formData.services      || '',
      },
    };
    localStorage.setItem('pieach-project-preview', JSON.stringify(previewProjectData));
    window.open('/projects/preview', '_blank');
  };

  return (
    <>
      {showPublishOverlay && (
        <PublishingOverlay projectTitle={formData.title} onDone={handleOverlayDone} />
      )}

      <div className="form-drawer">
        {/* Header */}
        <div className="card-header" style={{ padding:'14px 18px', borderBottom:'1px solid var(--stone)', display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--cream)' }}>
          <span className="card-title" style={{ fontSize:'11px', fontWeight:'bold', color:'var(--burgundy)', textTransform:'uppercase', letterSpacing:'0.07em' }}>
            {mode === 'create' ? 'Add New Project' : 'Edit Project'}
          </span>
          {successMessage && (
            <span style={{ fontSize:'11px', fontWeight:'bold', color:'var(--green)', background:'var(--green-light)', padding:'4px 10px', borderRadius:'4px' }}>
              {successMessage}
            </span>
          )}
        </div>

        {/* Validation error banner */}
        {validationBanner && (
          <div style={{
            margin:'12px 16px 0',
            padding:'10px 14px',
            background:'rgba(220,38,38,0.07)',
            border:'1px solid rgba(220,38,38,0.3)',
            borderRadius:6,
            display:'flex', alignItems:'flex-start', gap:10,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
              <path d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 18c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <span style={{ fontSize:'12px', color:'#DC2626', fontWeight:600, lineHeight:1.45 }}>
              {validationBanner}
            </span>
          </div>
        )}

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
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            errors={errors}
          />
        </div>

        <ProjectFormActions
          isSaving={isSaving}
          isPublishing={isPublishing}
          handleSaveDraft={() => handleAction('draft')}
          handlePublish={() => handleAction('publish')}
          handlePreview={handlePreview}
        />

        {/* Publish confirmation */}
        <ConfirmationModal
          isOpen={isPublishConfirmOpen}
          onClose={() => setIsPublishConfirmOpen(false)}
          onConfirm={() => executeAction('publish')}
          title="Publish Project?"
          message={`You are about to publish "${formData.title || 'this project'}" to the live portfolio. It will be immediately visible to visitors on the website. Proceed?`}
          confirmText={mode === 'create' ? 'Publish Now' : 'Save & Publish'}
          cancelText="Review Again"
          type="info"
          isLoading={isPublishing}
        />

        {/* No-image confirmation */}
        <ConfirmationModal
          isOpen={isNoImageConfirmOpen}
          onClose={() => { setIsNoImageConfirmOpen(false); setPendingAction(null); }}
          onConfirm={() => {
            setIsNoImageConfirmOpen(false);
            if (pendingAction === 'publish') {
              setIsPublishConfirmOpen(true);
            } else {
              executeAction('draft');
            }
          }}
          title="No Images Added"
          message="This project has no gallery images or cover photo. Projects without images may appear incomplete on the live site. Are you sure you want to continue without adding any images?"
          confirmText="Continue Without Images"
          cancelText="Go Back & Add Images"
          type="warning"
        />
      </div>
    </>
  );
}
