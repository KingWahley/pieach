'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const UnsavedChangesContext = createContext(null);

export function UnsavedChangesProvider({ children }) {
  const [isDirty, setIsDirty] = useState(false);
  const [onSaveAsDraft, setOnSaveAsDraft] = useState(null); // () => void | null

  // Called by form pages to register their dirty state and draft-save callback
  const registerForm = useCallback((dirty, saveAsDraftFn) => {
    setIsDirty(dirty);
    setOnSaveAsDraft(dirty && saveAsDraftFn ? () => saveAsDraftFn : null);
  }, []);

  // Called when navigating away (by sidebar / cancel buttons)
  const clearForm = useCallback(() => {
    setIsDirty(false);
    setOnSaveAsDraft(null);
  }, []);

  return (
    <UnsavedChangesContext.Provider value={{ isDirty, onSaveAsDraft, registerForm, clearForm }}>
      {children}
    </UnsavedChangesContext.Provider>
  );
}

export function useUnsavedChanges() {
  const ctx = useContext(UnsavedChangesContext);
  if (!ctx) throw new Error('useUnsavedChanges must be used inside UnsavedChangesProvider');
  return ctx;
}
