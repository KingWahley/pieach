'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TeamMemberForm from '@/components/team/form/TeamMemberForm';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';
import UnsavedChangesModal from '@/components/modals/UnsavedChangesModal';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const { registerForm, clearForm, isDirty, onSaveAsDraft } = useUnsavedChanges();
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false);

  useEffect(() => {
    registerForm(true, null);
    router.prefetch('/dashboard/team');
    return () => clearForm();
  }, [registerForm, clearForm, router]);

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedConfirm(true);
    } else {
      clearForm();
      router.push('/dashboard/team');
    }
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

      <UnsavedChangesModal
        isOpen={showUnsavedConfirm}
        onStay={() => setShowUnsavedConfirm(false)}
        onDiscard={() => {
          clearForm();
          router.push('/dashboard/team');
        }}
        onSaveAsDraft={onSaveAsDraft ? () => {
          if (onSaveAsDraft.fn) onSaveAsDraft.fn();
          clearForm();
          router.push('/dashboard/team');
        } : null}
      />
    </DashboardLayout>
  );
}
