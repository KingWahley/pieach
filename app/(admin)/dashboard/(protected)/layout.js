'use client';

import React from 'react';
import { UnsavedChangesProvider } from '@/lib/unsavedChangesContext';

export default function ProtectedLayout({ children }) {
  return (
    <UnsavedChangesProvider>
      {children}
    </UnsavedChangesProvider>
  );
}
