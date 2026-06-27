'use client';

import React from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectForm from '@/components/projects/form/ProjectForm';
import { useStore } from '@/hooks/useStore';
import { projectsStore } from '@/lib/store';

export default function NewProjectPage() {
  const { createItem } = useStore(projectsStore);

  const handleSubmit = async (projectData, actionType) => {
    const newProject = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      ...projectData,
      status: actionType === 'draft' ? 'Draft' : projectData.status,
      galleryCount: projectData.galleryFiles.newImages.length
    };
    
    createItem(newProject);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <DashboardLayout title="Add New Project" subtitle="Manage portfolio projects, categories, descriptions, and galleries">
      <div className="page-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div className="page-title-wrap">
          <h1 style={{ fontSize: '22px', color: 'var(--burgundy)', marginBottom: '4px', fontFamily: 'Verdana, sans-serif' }}>Add New Project</h1>
          <p style={{ fontSize: '11px', color: 'var(--ink-light)' }}>Create a new project entry for your architectural portfolio.</p>
        </div>
        <Link href="/dashboard/projects" style={{ textDecoration: 'none' }}>
          <button className="secondary-btn" style={{ background: 'var(--white)', color: 'var(--burgundy)', border: '1px solid var(--stone-dark)', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'Verdana, sans-serif', cursor: 'pointer' }}>
            Cancel
          </button>
        </Link>
      </div>

      <ProjectForm onSubmit={handleSubmit} />
    </DashboardLayout>
  );
}
