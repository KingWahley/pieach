// lib/store/createSettingsStore.js
import { supabase } from '@/lib/supabase/client';

export function createSettingsStore(initialData, storeName) {
  let store = { ...initialData };
  const listeners = new Set();

  const api = {
    rehydrate: () => {
      if (typeof window !== 'undefined') {
        supabase
          .from('calendar_settings')
          .select('settings')
          .eq('id', 'default')
          .maybeSingle()
          .then(({ data, error }) => {
            if (!error && data && data.settings) {
              store = { ...store, ...data.settings };
              api.notify();
            } else if (error) {
              console.error('Error loading calendar settings from Supabase:', error.message, error.details, error.hint);
            }
          });
      }
    },
    getData: () => store,
    updateSettings: (updates) => {
      store = { ...store, ...updates };
      api.notify();
      
      // Async write to Supabase
      supabase
        .from('calendar_settings')
        .upsert([{ id: 'default', settings: store }])
        .then(({ error }) => {
          if (error) {
            console.error('Error saving settings to Supabase:', error);
          }
        });
    },
    saveSettings: () => {
      // Async write to Supabase
      supabase
        .from('calendar_settings')
        .upsert([{ id: 'default', settings: store }])
        .then(({ error }) => {
          if (error) {
            console.error('Error saving settings to Supabase:', error);
          }
        });
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    notify: () => {
      const currentData = { ...store };
      listeners.forEach(listener => listener(currentData));
    }
  };

  return api;
}
