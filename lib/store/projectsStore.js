import { projectsData } from '@/data/mockData';

let projectsStore = [...projectsData];
const listeners = new Set();

export const projectsStoreApi = {
  getProjects: () => projectsStore,
  
  getProjectById: (id) => projectsStore.find(p => p.id === id) || null,
  
  createProject: (project) => {
    // Generate a simple ID
    const id = `p${Date.now()}`;
    const newProject = { 
      ...project, 
      id, 
      date: new Date().toISOString().split('T')[0] 
    };
    projectsStore = [newProject, ...projectsStore];
    projectsStoreApi.notify();
    return newProject;
  },
  
  updateProject: (id, updates) => {
    projectsStore = projectsStore.map(p => p.id === id ? { ...p, ...updates } : p);
    projectsStoreApi.notify();
  },
  
  deleteProject: (id) => {
    projectsStore = projectsStore.filter(p => p.id !== id);
    projectsStoreApi.notify();
  },
  
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  
  notify: () => {
    const currentData = [...projectsStore];
    listeners.forEach(listener => listener(currentData));
  }
};
