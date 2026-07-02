'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import VacancyForm from '@/components/forms/VacancyForm';
import { useStore } from '@/hooks/useStore';
import { vacanciesStore } from '@/lib/store';
import { useUnsavedChanges } from '@/lib/unsavedChangesContext';

export default function NewVacancyPage() {
  const router = useRouter();
  const { createItem } = useStore(vacanciesStore);
  const { registerForm, clearForm } = useUnsavedChanges();
  const saveDraftRef = useRef(null);

  useEffect(() => {
    registerForm(true, () => {
      if (saveDraftRef.current) saveDraftRef.current();
    });
    return () => clearForm();
  }, [registerForm, clearForm]);

  const handleSave = (finalData) => {
    createItem(finalData);
    clearForm();
    router.push('/dashboard/vacancies');
  };

  const handleCancel = () => {
    clearForm();
    router.push('/dashboard/vacancies');
  };

  return (
    <DashboardLayout title="Vacancies" subtitle="Create, edit, publish, and manage job vacancies">
      <VacancyForm 
        isNew={true}
        onSave={handleSave}
        onCancel={handleCancel}
        saveDraftRef={saveDraftRef}
      />
    </DashboardLayout>
  );
}
