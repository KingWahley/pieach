'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import VacancyForm from '@/components/forms/VacancyForm';
import { useStore } from '@/hooks/useStore';
import { vacanciesStore } from '@/lib/store';

export default function NewVacancyPage() {
  const router = useRouter();
  const { createItem } = useStore(vacanciesStore);

  const handleSave = (finalData) => {
    createItem(finalData);
    router.push('/dashboard/vacancies');
  };

  const handleCancel = () => {
    router.push('/dashboard/vacancies');
  };

  return (
    <DashboardLayout title="Vacancies" subtitle="Create, edit, publish, and manage job vacancies">
      <VacancyForm 
        isNew={true}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </DashboardLayout>
  );
}
