'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectForm from '@/components/projects/form/ProjectForm';
import { useStore } from '@/hooks/useStore';
import { projectsStore } from '@/lib/store';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, getItemById, updateItem } = useStore(projectsStore);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { registerForm, clearForm } = useUnsavedChanges();
  const saveDraftRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      setHasLoaded(true);
    } else {
      const timer = setTimeout(() => setHasLoaded(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const project = useMemo(() => getItemById(id), [id, data, getItemById]);

  // Register as dirty once the project has loaded
  useEffect(() => {
    if (!hasLoaded || !project) return;
    registerForm(true, () => {
      if (saveDraftRef.current) saveDraftRef.current();
    });
    return () => clearForm();
  }, [hasLoaded, project, registerForm, clearForm]);

  const handleSubmit = async (projectData, actionType) => {
    const updatedProject = {
      ...projectData,
      status: actionType === 'draft' ? 'Draft' : projectData.status,
      // Calculate total gallery count from existing + new images minus removed
      galleryCount: (projectData.galleryFiles.existingImages.length || 0) + 
                    (projectData.galleryFiles.newImages.length || 0) - 
                    (projectData.galleryFiles.removedImageIds?.length || 0)
    };
    
    updateItem(id, updatedProject);
    clearForm();
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/dashboard/projects');
  };

  if (!hasLoaded) {
    return (
      <DashboardLayout title="Edit Project" subtitle="Manage portfolio projects, categories, descriptions, and galleries">
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-mid)' }}>Loading project data...</div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout title="Edit Project" subtitle="Manage portfolio projects, categories, descriptions, and galleries">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--burgundy)', marginBottom: '10px' }}>Project Not Found</h2>
          <p style={{ color: 'var(--ink-mid)', marginBottom: '20px' }}>The project you are trying to edit could not be found or has been deleted.</p>
          <Link href="/dashboard/projects" style={{ textDecoration: 'none' }}>
            <button className="primary-btn">Return to Projects</button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Project" subtitle="Manage portfolio projects, categories, descriptions, and galleries">
      <div className="page-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div className="page-title-wrap">
          <h1 style={{ fontSize: '22px', color: 'var(--burgundy)', marginBottom: '4px', fontFamily: 'Verdana, sans-serif' }}>Edit Project</h1>
          <p style={{ fontSize: '11px', color: 'var(--ink-light)' }}>Update details, media, and settings for this architectural project.</p>
        </div>
        <Link href="/dashboard/projects" style={{ textDecoration: 'none' }}>
          <button className="secondary-btn" style={{ background: 'var(--white)', color: 'var(--burgundy)', border: '1px solid var(--stone-dark)', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'Verdana, sans-serif', cursor: 'pointer' }}>
            Cancel
          </button>
        </Link>
      </div>

      <ProjectForm mode="edit" initialData={project} onSubmit={handleSubmit} saveDraftRef={saveDraftRef} />
    </DashboardLayout>
  );
}
