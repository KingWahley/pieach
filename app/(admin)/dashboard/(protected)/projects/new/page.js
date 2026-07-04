'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectForm from '@/components/projects/form/ProjectForm';
import { useStore } from '@/hooks/useStore';
import { projectsStore } from '@/lib/store';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';
import UnsavedChangesModal from '@/components/modals/UnsavedChangesModal';
import SuccessModal from '@/components/modals/SuccessModal';

export default function NewProjectPage() {
  const router = useRouter();
  const { createItem } = useStore(projectsStore);
  const { registerForm, clearForm, isDirty, onSaveAsDraft } = useUnsavedChanges();
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Ref to the form's "save as draft" trigger so the sidebar modal can invoke it
  const saveDraftRef = useRef(null);

  useEffect(() => {
    // Mark form as dirty immediately (page is open = unsaved work exists)
    registerForm(true, () => {
      if (saveDraftRef.current) saveDraftRef.current();
    });
    router.prefetch('/dashboard/projects');
    return () => clearForm();
  }, [registerForm, clearForm, router]);

  const handleSubmit = async (projectData, actionType) => {
    const newProject = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      ...projectData,
      status: actionType === 'draft' ? 'Draft' : (projectData.status === 'Draft' || !projectData.status ? 'Ongoing' : projectData.status),
      galleryCount: projectData.galleryFiles.newImages.length
    };
    
    await createItem(newProject);
    clearForm();
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedConfirm(true);
    } else {
      clearForm();
      router.push('/dashboard/projects');
    }
  };

  return (
    <DashboardLayout title="Add New Project" subtitle="Manage portfolio projects, categories, descriptions, and galleries">
      <div className="page-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div className="page-title-wrap">
          <h1 style={{ fontSize: '22px', color: 'var(--burgundy)', marginBottom: '4px', fontFamily: 'Verdana, sans-serif' }}>Add New Project</h1>
          <p style={{ fontSize: '11px', color: 'var(--ink-light)' }}>Create a new project entry for your architectural portfolio.</p>
        </div>
        <button 
          onClick={handleCancel}
          className="secondary-btn" 
          style={{ background: 'var(--white)', color: 'var(--burgundy)', border: '1px solid var(--stone-dark)', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'Verdana, sans-serif', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>

      <ProjectForm onSubmit={handleSubmit} onSuccess={() => setShowSuccess(true)} saveDraftRef={saveDraftRef} />

      <UnsavedChangesModal
        isOpen={showUnsavedConfirm}
        onStay={() => setShowUnsavedConfirm(false)}
        onDiscard={() => {
          clearForm();
          router.push('/dashboard/projects');
        }}
        onSaveAsDraft={onSaveAsDraft ? () => {
          if (onSaveAsDraft.fn) onSaveAsDraft.fn();
          clearForm();
          router.push('/dashboard/projects');
        } : null}
      />

      <SuccessModal
        isOpen={showSuccess}
        message="Your project has been successfully uploaded and published."
        uploadAnotherText="Upload Another Project"
        viewListText="View Project List"
        onUploadAnother={() => window.location.reload()}
        onViewList={() => router.push('/dashboard/projects')}
      />
    </DashboardLayout>
  );
}
