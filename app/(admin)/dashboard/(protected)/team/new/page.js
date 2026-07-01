'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TeamMemberForm from '@/components/team/form/TeamMemberForm';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const { registerForm, clearForm } = useUnsavedChanges();

  useEffect(() => {
    registerForm(true, null);
    return () => clearForm();
  }, [registerForm, clearForm]);

  const handleCancel = () => {
    clearForm();
    router.push('/dashboard/team');
  };

  return (
    <DashboardLayout title="Add Team Member" subtitle="Create a new entry for team member">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Add Team Member</h1>
          <p>Create a new entry for add team member.</p>
        </div>
        <button className="secondary-btn" onClick={handleCancel}>Cancel</button>
      </div>

      <TeamMemberForm mode="create" />
    </DashboardLayout>
  );
}
