// lib/store/createStore.js
import { supabase } from '@/lib/supabase/client';

const TABLE_NAMES = {
  projects: 'projects',
  project_categories: 'project_categories',
  team: 'team',
  job_applications: 'job_applications',
  messages: 'messages',
  vacancies: 'vacancies',
  blog: 'blog_posts',
  blog_categories: 'blog_categories',
  media: 'media',
  appointments: 'appointments',
};

const MAPPINGS = {
  blog: {
    readTime: 'read_time',
  },
  vacancies: {
    datePosted: 'date_posted',
  },
  job_applications: {
    vacancyId: 'vacancy_id',
    cvFileName: 'cv_file_name',
    cvFileUrl: 'cv_file_url',
    coverLetter: 'cover_letter',
  },
  messages: {
    firstName: 'first_name',
    lastName: 'last_name',
  },
  appointments: {
    clientName: 'client_name',
    clientEmail: 'client_email',
    clientPhone: 'client_phone',
    preferredDate: 'preferred_date',
    preferredTime: 'preferred_time',
    approvedBy: 'approved_by',
    rejectedBy: 'rejected_by',
  },
  projects: {
    galleryCount: 'gallery_count',
    orderIndex: 'order_index',
    additionalFields: 'additional_fields',
  }
};

function mapJsToDb(item, storeName) {
  if (storeName === 'projects') {
    const dbItem = {
      id: String(item.id),
      title: item.title,
      slug: item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '',
      category: item.category,
      groups: item.groups || [item.category?.toLowerCase()].filter(Boolean),
      image: item.image || (item.gallery && item.gallery[0]) || '/assets/projects/default.png',
      description: item.description,
      status: item.status || 'Draft',
    };

    // Handle year
    if (item.year) {
      dbItem.year = String(item.year);
    } else if (item.date) {
      dbItem.year = String(item.date).substring(0, 4);
    } else {
      dbItem.year = String(new Date().getFullYear());
    }

    // Handle location
    if (item.city || item.state || item.country) {
      dbItem.location = [item.city, item.state, item.country].filter(Boolean).join(', ');
    } else {
      dbItem.location = item.location || '';
    }

    // Handle specs JSONB
    const existingSpecs = item.specs || {};
    dbItem.specs = {
      projectType: item.subtitle || existingSpecs.projectType || item.category || '',
      siteArea: existingSpecs.siteArea || 'N/A',
      builtArea: existingSpecs.builtArea || 'N/A',
      status: item.status || existingSpecs.status || 'Ongoing',
      leadArchitect: existingSpecs.leadArchitect || 'Admin Team',
      services: existingSpecs.services || item.category || '',
      additionalFields: item.additionalFields || existingSpecs.additionalFields || []
    };

    // Handle gallery
    if (item.galleryFiles) {
      const existing = item.galleryFiles.existingImages || [];
      const newImgs = item.galleryFiles.newImages || [];
      const removed = item.galleryFiles.removedImageIds || [];
      dbItem.gallery = existing.filter(img => !removed.includes(img)).concat(newImgs);
    } else {
      dbItem.gallery = item.gallery || [];
    }

    return dbItem;
  }

  const mapping = MAPPINGS[storeName];
  if (!mapping) return item;
  
  const mapped = { ...item };
  for (const [jsKey, dbKey] of Object.entries(mapping)) {
    if (jsKey in mapped) {
      mapped[dbKey] = mapped[jsKey];
      delete mapped[jsKey];
    }
  }
  return mapped;
}

function mapDbToJs(item, storeName) {
  if (storeName === 'projects') {
    const specs = item.specs || {};
    return {
      ...item,
      subtitle: specs.projectType || '',
      additionalFields: specs.additionalFields || [],
      galleryCount: item.gallery ? item.gallery.length : 0
    };
  }

  const mapping = MAPPINGS[storeName];
  if (!mapping) return item;
  
  const mapped = { ...item };
  for (const [jsKey, dbKey] of Object.entries(mapping)) {
    if (dbKey in mapped) {
      mapped[jsKey] = mapped[dbKey];
      delete mapped[dbKey];
    }
  }
  return mapped;
}

export function createStore(initialData, idPrefix = 'id', storeName) {
  let store = [...initialData];
  const listeners = new Set();
  const tableName = TABLE_NAMES[storeName] || storeName;

  const api = {
    rehydrate: () => {
      if (typeof window !== 'undefined') {
        supabase
          .from(tableName)
          .select('*')
          .then(({ data, error }) => {
            if (!error && data) {
              // Map DB rows to JS format
              let items = data.map(item => mapDbToJs(item, storeName));
              
              // Sort by date or id if applicable
              items.sort((a, b) => {
                const dateA = a.date || a.datePosted || '';
                const dateB = b.date || b.datePosted || '';
                if (dateA && dateB) {
                  return new Date(dateB) - new Date(dateA);
                }
                return b.id.localeCompare(a.id);
              });

              store = items;
              api.notify();
            } else if (error) {
              console.error(`Error loading store ${storeName} from Supabase:`, error.message, error.details, error.hint);
            }
          });
      }
    },
    getData: () => store,
    getItemById: (id) => store.find(item => item.id === id) || null,
    createItem: (item) => {
      const id = `${idPrefix}${Date.now()}`;
      const newItem = { 
        ...item, 
        id, 
        date: item.date || item.datePosted || new Date().toISOString().split('T')[0] 
      };
      if (item.datePosted && !newItem.datePosted) {
        newItem.datePosted = item.datePosted;
      }

      // Optimistic update
      store = [newItem, ...store];
      api.notify();

      // Async write to Supabase
      const dbItem = mapJsToDb(newItem, storeName);
      supabase
        .from(tableName)
        .insert([dbItem])
        .then(({ error }) => {
          if (error) {
            console.error(`Error saving new item to table ${tableName}:`, error);
          }
        });

      return newItem;
    },
    updateItem: (id, updates) => {
      // Optimistic update
      store = store.map(item => item.id === id ? { ...item, ...updates } : item);
      api.notify();

      // Async write to Supabase
      const dbUpdates = mapJsToDb(updates, storeName);
      supabase
        .from(tableName)
        .update(dbUpdates)
        .eq('id', id)
        .then(({ error }) => {
          if (error) {
            console.error(`Error updating item ${id} in table ${tableName}:`, error);
          }
        });
    },
    deleteItem: (id) => {
      // Optimistic update
      store = store.filter(item => item.id !== id);
      api.notify();

      // Async write to Supabase
      supabase
        .from(tableName)
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) {
            console.error(`Error deleting item ${id} from table ${tableName}:`, error);
          }
        });
    },
    save: () => {
      // No-op, handled per action now
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    notify: () => {
      const currentData = [...store];
      listeners.forEach(listener => listener(currentData));
    }
  };

  return api;
}
