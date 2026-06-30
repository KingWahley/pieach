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

// ─────────────────────────────────────────────────────────────────────────────
// Step icons (SVG, no emoji)
// ─────────────────────────────────────────────────────────────────────────────
const StepIcons = {
  validate: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
    </svg>
  ),
  photo: (
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

// ─────────────────────────────────────────────────────────────────────────────
// Steps — create vs edit get slightly different labels
// ─────────────────────────────────────────────────────────────────────────────
const getSteps = (mode) => [
  { id: 'validate', label: 'Validating profile data',           durationMs: 550 },
  { id: 'photo',    label: 'Processing photo assets',           durationMs: 750 },
  { id: 'saving',   label: mode === 'create' ? 'Creating profile record' : 'Updating profile record', durationMs: 850 },
  { id: 'live',     label: 'Publishing to live site',           durationMs: 650 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Animated overlay component
// ─────────────────────────────────────────────────────────────────────────────
function TeamPublishingOverlay({ memberName, mode, onDone }) {
  const STEPS = getSteps(mode);
  const [currentStep, setCurrentStep] = useState(0);
  const [doneSteps,   setDoneSteps]   = useState([]);
  const [success,     setSuccess]     = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let idx = 0;
    const tick = () => {
      if (idx >= STEPS.length) {
        setSuccess(true);
        timerRef.current = setTimeout(onDone, 2200);
        return;
      }
      setCurrentStep(idx);
      timerRef.current = setTimeout(() => {
        setDoneSteps(prev => [...prev, idx]);
        idx++;
        tick();
      }, STEPS[idx].durationMs);
    };
    tick();
    return () => clearTimeout(timerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isCreate = mode === 'create';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(12, 5, 7, 0.94)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <style>{`
        @keyframes tmFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes tmSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tmSpin    { to{transform:rotate(360deg)} }
        @keyframes tmPop     { 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes tmCheckDraw { from{stroke-dashoffset:48} to{stroke-dashoffset:0} }
        .tm-overlay { animation: tmFadeIn 0.3s ease }
        .tm-card    { animation: tmSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) }
        .tm-pop     { animation: tmPop 0.5s cubic-bezier(0.22,1,0.36,1) }
      `}</style>

      <div className="tm-card" style={{
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
            <div className="tm-pop" style={{ marginBottom:14 }}>
              <svg width="64" height="64" viewBox="0 0 52 52" style={{ display:'block', margin:'0 auto' }}>
                <circle cx="26" cy="26" r="25" fill="none" stroke="#D5A73F" strokeWidth="2.5"
                  style={{ strokeDasharray:166, strokeDashoffset:0 }}/>
                <path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" stroke="#D5A73F" strokeWidth="3.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ strokeDasharray:48, strokeDashoffset:0, animation:'tmCheckDraw 0.45s ease 0.1s both' }}/>
              </svg>
            </div>
          ) : (
            <div style={{ marginBottom:14 }}>
              <div style={{
                width:52, height:52,
                border:'3px solid rgba(213,167,63,0.18)',
                borderTop:'3px solid #D5A73F',
                borderRadius:'50%',
                animation:'tmSpin 0.85s linear infinite',
                margin:'0 auto',
              }}/>
            </div>
          )}

          <div style={{
            fontSize:10, fontWeight:900, letterSpacing:'0.2em',
            textTransform:'uppercase', color:'#D5A73F', marginBottom:8,
          }}>
            {success
              ? (isCreate ? 'Profile Published' : 'Profile Updated')
              : (isCreate ? 'Publishing Profile' : 'Updating Profile')
            }
          </div>
          <div style={{ fontSize:17, fontWeight:700, color:'#f5e6c8', lineHeight:1.3 }}>
            {memberName || 'Team Member'}
          </div>
          {success && (
            <div style={{ fontSize:11, color:'rgba(245,230,200,0.5)', marginTop:7, letterSpacing:'0.04em' }}>
              Redirecting to team list…
            </div>
          )}
        </div>

        {/* Step list */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {STEPS.map((step, i) => {
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
  
  const [errors,               setErrors]               = useState({});
  const [validationBanner,     setValidationBanner]     = useState('');
  const [isSaving,             setIsSaving]             = useState(false);
  const [showOverlay,          setShowOverlay]          = useState(false);
  const [isPreviewOpen,        setIsPreviewOpen]        = useState(false);
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);
  const pendingDraftRef = useRef(false);
  const formCardRef    = useRef(null);

  // If the user publishes from the preview tab, redirect this edit tab away
  // to prevent a second accidental submit.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'pieach-team-published') {
        localStorage.removeItem('pieach-team-published');
        router.push('/dashboard/team');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [router]);

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
    if (errors[name])       setErrors(prev => ({ ...prev, [name]: null }));
    if (validationBanner)   setValidationBanner('');
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

  // Returns true if valid; otherwise marks fields + shows banner + scrolls
  const validate = () => {
    const newErrors = {};
    const missing   = [];

    if (!formData.name?.trim()) { newErrors.name = 'Required'; missing.push('Full Name'); }
    if (!formData.role?.trim()) { newErrors.role = 'Required'; missing.push('Designation'); }

    const bioText = Array.isArray(formData.bio)
      ? formData.bio.join('\n')
      : (formData.bio || '');
    if (!bioText.trim()) { newErrors.bio = 'Required'; missing.push('Bio'); }

    setErrors(newErrors);

    if (missing.length) {
      setValidationBanner(
        `Please fill in the required field${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}.`
      );
      // Scroll the form card into view so the banner is visible
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return false;
    }

    setValidationBanner('');
    return true;
  };

  // Called when overlay finishes — do actual save then redirect
  const commitSave = async () => {
    const isDraft = pendingDraftRef.current;

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
    } else {
      updateItem(formData.id, finalData);
    }

    router.push('/dashboard/team');
  };

  // Entry point for both Save Draft and Publish — validates first
  const handleAction = (isDraft = false) => {
    if (!validate()) {
      gsap.fromTo(drawerRef.current,
        { x: -5 },
        { x: 5, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => gsap.set(drawerRef.current, { x: 0 }) }
      );
      return;
    }
    if (!isDraft) {
      // Show confirmation modal before overlay
      setIsPublishConfirmOpen(true);
      return;
    }
    // Draft — go straight to overlay
    pendingDraftRef.current = true;
    setIsSaving(true);
    setShowOverlay(true);
  };

  // Called by the confirmation modal's confirm button
  const handleConfirmedPublish = () => {
    pendingDraftRef.current = false;
    setIsPublishConfirmOpen(false);
    setIsSaving(true);
    setShowOverlay(true);
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
    <>
      {/* Animated overlay */}
      {showOverlay && (
        <TeamPublishingOverlay
          memberName={formData.name}
          mode={mode}
          onDone={commitSave}
        />
      )}

      <div className="form-card" ref={(el) => { drawerRef.current = el; formCardRef.current = el; }} style={{ opacity: 0, visibility: 'hidden' }}>
        <div className="card-header">
          <span className="card-title">{mode === 'create' ? 'Add New Team Member' : 'Edit Team Member'}</span>
        </div>

        {/* Validation error banner */}
        {validationBanner && (
          <div style={{
            margin: '12px 16px 0',
            padding: '10px 14px',
            background: 'rgba(220,38,38,0.07)',
            border: '1px solid rgba(220,38,38,0.3)',
            borderRadius: 6,
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 18c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 600, lineHeight: 1.45 }}>
              {validationBanner}
            </span>
          </div>
        )}

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
          onSaveDraft={() => handleAction(true)} 
          onSavePublish={() => handleAction(false)} 
          onPreview={handlePreview}
          isSaving={isSaving}
        />

        <ConfirmationModal 
          isOpen={isPublishConfirmOpen}
          onClose={() => setIsPublishConfirmOpen(false)}
          onConfirm={handleConfirmedPublish}
          title="Ready to Publish?"
          message={`You are about to ${mode === 'create' ? 'publish this new profile' : 'save changes'} to the live website. Please ensure all details and photos are correct.`}
          confirmText={mode === 'create' ? 'Publish Now' : 'Save & Publish'}
          cancelText="Review Again"
          type="info"
          isLoading={isSaving}
        />
      </div>
    </>
  );
}
