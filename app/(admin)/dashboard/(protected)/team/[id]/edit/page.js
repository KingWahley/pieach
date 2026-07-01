'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TeamMemberForm from '@/components/team/form/TeamMemberForm';
import { useStore } from '@/hooks/useStore';
import { teamStore } from '@/lib/store';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';

export default function EditTeamMemberPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data } = useStore(teamStore);
  const { registerForm, clearForm } = useUnsavedChanges();
  
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      const found = data.find(m => m.id === id);
      if (found) {
        setMember(found);
      }
      setLoading(false);
    }
  }, [id, data]);

  // Register dirty once member is resolved
  useEffect(() => {
    if (!member) return;
    registerForm(true, null);
    return () => clearForm();
  }, [member, registerForm, clearForm]);

  const handleCancel = () => {
    clearForm();
    router.push('/dashboard/team');
  };

  if (loading) {
    return (
      <DashboardLayout title="Edit Team Member" subtitle="Loading team member data...">
        <div className="page-head">
          <div className="page-title-wrap">
            <h1>Edit Team Member</h1>
            <p>Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!member) {
    return (
      <DashboardLayout title="Team Member Not Found" subtitle="The requested team member does not exist">
        <div className="page-head">
          <div className="page-title-wrap">
            <h1>Not Found</h1>
            <p>This team member could not be found.</p>
          </div>
          <button className="secondary-btn" onClick={() => router.push('/dashboard/team')}>Back to Team</button>
        </div>
        <div style={{ padding: '30px', background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-mid)' }}>The team member you are trying to edit does not exist.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Team Member" subtitle="Manage team profiles, designations, qualifications, photos, and bios">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Edit Team Member</h1>
          <p>Update the entry for the team member.</p>
        </div>
        <button className="secondary-btn" onClick={handleCancel}>Cancel</button>
      </div>

      <TeamMemberForm mode="edit" initialData={member} />
    </DashboardLayout>
  );
}
