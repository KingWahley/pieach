'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import VacancyForm from '@/components/forms/VacancyForm';
import { useStore } from '@/hooks/useStore';
import { vacanciesStore } from '@/lib/store';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';
import UnsavedChangesModal from '@/components/modals/UnsavedChangesModal';
import SuccessModal from '@/components/modals/SuccessModal';

export default function NewVacancyPage() {
  const router = useRouter();
  const { createItem } = useStore(vacanciesStore);
  const { registerForm, clearForm, isDirty, onSaveAsDraft } = useUnsavedChanges();
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const saveDraftRef = useRef(null);

  useEffect(() => {
    registerForm(true, () => {
      if (saveDraftRef.current) saveDraftRef.current();
    });
    router.prefetch('/dashboard/vacancies');
    return () => clearForm();
  }, [registerForm, clearForm, router]);

  const handleSave = (finalData) => {
    createItem(finalData);
    clearForm();
    setShowSuccess(true);
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedConfirm(true);
    } else {
      clearForm();
      router.push('/dashboard/vacancies');
    }
  };

  return (
    <DashboardLayout title="Vacancies" subtitle="Create, edit, publish, and manage job vacancies">
      <VacancyForm 
        isNew={true}
        onSave={handleSave}
        onCancel={handleCancel}
        saveDraftRef={saveDraftRef}
      />

      <UnsavedChangesModal
        isOpen={showUnsavedConfirm}
        onStay={() => setShowUnsavedConfirm(false)}
        onDiscard={() => {
          clearForm();
          router.push('/dashboard/vacancies');
        }}
        onSaveAsDraft={onSaveAsDraft ? () => {
          if (onSaveAsDraft.fn) onSaveAsDraft.fn();
          clearForm();
          router.push('/dashboard/vacancies');
        } : null}
      />

      <SuccessModal
        isOpen={showSuccess}
        message="Your vacancy listing has been successfully uploaded and published."
        uploadAnotherText="Create Another Vacancy"
        viewListText="View Vacancy List"
        onUploadAnother={() => window.location.reload()}
        onViewList={() => router.push('/dashboard/vacancies')}
      />
    </DashboardLayout>
  );
}
