'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TeamMemberForm from '@/components/team/form/TeamMemberForm';

export default function NewTeamMemberPage() {
  const router = useRouter();

  return (
    <DashboardLayout title="Add Team Member" subtitle="Create a new entry for team member">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Add Team Member</h1>
          <p>Create a new entry for add team member.</p>
        </div>
        <button className="secondary-btn" onClick={() => router.push('/dashboard/team')}>Cancel</button>
      </div>

      <TeamMemberForm mode="create" />
    </DashboardLayout>
  );
}
