'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import StatusPill from '@/components/shared/StatusPill';
import SearchToolbar from '@/components/shared/SearchToolbar';
import EmptyState from '@/components/shared/EmptyState';
import GridToggle from '@/components/shared/GridToggle';
import { useStore } from '@/hooks/useStore';
import { projectsStore, projectCategoriesStore, mediaStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import Link from 'next/link';
import { useViewMode } from '@/hooks/useViewMode';
import Pagination from '@/components/shared/Pagination';
import ProjectPreview from '@/components/projects/ProjectPreview';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import Toast from '@/components/shared/Toast';

export default function ProjectsPage() {
  const { data, deleteItem } = useStore(projectsStore);
  const { data: projectCategories } = useStore(projectCategoriesStore);
  const { data: mediaData } = useStore(mediaStore);
  const { filteredAndSortedData, searchQuery, setSearchQuery, filters, updateFilter } = useFilterSort(data, { category: 'all' }, { key: 'date', order: 'desc' });
  
  const [view, setView] = useViewMode();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteMediaChecked, setDeleteMediaChecked] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const pageSize = 7;

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
    title: '',
    isBulk: false
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [searchQuery, filters]);

  const toggleSelect = (id, e) => {
    if (e) e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map(p => p.id));
    }
  };

  const handlePreview = (project) => {
    setSelectedProject({
      ...project,
      galleryFiles: {
        existingImages: project.gallery || [],
        newImages: []
      }
    });
    setIsPreviewOpen(true);
  };

  const handleDeleteClick = (id, title) => {
    setConfirmModal({
      isOpen: true,
      id,
      title,
      isBulk: false
    });
    setDeleteMediaChecked(false);
  };

  const handleBulkDeleteClick = () => {
    setConfirmModal({
      isOpen: true,
      id: null,
      title: `${selectedIds.length} projects`,
      isBulk: true
    });
    setDeleteMediaChecked(false);
  };

  const handleConfirmDelete = () => {
    if (deleteMediaChecked) {
      const projectsToDelete = confirmModal.isBulk 
        ? data.filter(p => selectedIds.includes(p.id))
        : data.filter(p => p.id === confirmModal.id);
        
      const urlsToDelete = new Set();
      projectsToDelete.forEach(project => {
        if (project.image) urlsToDelete.add(project.image);
        if (project.gallery && Array.isArray(project.gallery)) {
          project.gallery.forEach(img => {
            const url = typeof img === 'string' ? img : (img.url || img.previewUrl);
            if (url) urlsToDelete.add(url);
          });
        }
      });

      const mediaToDelete = mediaData.filter(media => urlsToDelete.has(media.url));
      mediaToDelete.forEach(media => {
        mediaStore.deleteItem(media.id);
      });
    }

    if (confirmModal.isBulk) {
      selectedIds.forEach(id => deleteItem(id));
      setSelectedIds([]);
      setToast({ message: `${selectedIds.length} project(s) deleted successfully.`, type: 'success' });
    } else {
      deleteItem(confirmModal.id);
      setToast({ message: `"${confirmModal.title}" deleted successfully.`, type: 'success' });
    }
    setConfirmModal({ isOpen: false, id: null, title: '', isBulk: false });
  };

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
    ...projectCategories.map(c => ({ value: c.name, label: c.name }))
  ];

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedIds([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DashboardLayout title="Projects" subtitle="Manage portfolio projects, categories, and media galleries">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Project List</h1>
          <p>Add, edit, view, delete, and publish architectural portfolio projects.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/dashboard/projects/new" style={{ textDecoration: 'none' }}>
            <button className="primary-btn">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              Add Project
            </button>
          </Link>
        </div>
      </div>

      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search projects by title, location, or status"
        filterOptions={[{ value: 'all', label: 'All Statuses' }, { value: 'Completed', label: 'Completed' }, { value: 'Ongoing', label: 'Ongoing' }, { value: 'On Hold', label: 'On Hold' }]}
        currentFilter={filters.status || 'all'}
        onFilterChange={(v) => updateFilter('status', v)}
      >
        {selectedIds.length > 0 && (
          <button 
            onClick={handleBulkDeleteClick}
            className="secondary-btn"
            style={{ color: 'var(--red)', borderColor: 'var(--red)', background: 'transparent', padding: '10px 14px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', height: '38px' }}
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
        <select className="filter-select" value={filters.category || 'all'} onChange={(e) => updateFilter('category', e.target.value)}>
          {filterOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <GridToggle view={view} onViewChange={setView} />
      </SearchToolbar>

      {filteredAndSortedData.length === 0 ? (
        <div style={{ padding: '30px', background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px' }}>
          <EmptyState title="No projects found" message="Try a different search query or add a new project." />
        </div>
      ) : view === 'list' ? (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header" style={{ padding: '14px 18px', borderBottom: '1px solid var(--stone)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--cream)' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>List View</span>
            <Link href="/dashboard/project-categories" style={{ fontSize: '10px', color: 'var(--gold-dark)', textDecoration: 'underline' }}>Manage categories →</Link>
          </div>
          <div style={{ background: 'var(--white)', overflow: 'hidden' }}>
            <table className="project-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '40px', padding: '13px 16px', borderBottom: '1px solid var(--stone-dark)' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Project Title</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Location</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Description</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Gallery</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((project) => (
                  <tr key={project.id} style={{ borderBottom: '1px solid var(--stone)' }} className="table-row-hover">
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }} onClick={(e) => toggleSelect(project.id, e)}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(project.id)}
                        readOnly
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--stone-dark)' }}>
                          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold', color: 'var(--ink)', fontSize: '12px' }}>{project.title}</div>
                          <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '3px', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle', fontSize: '12px', color: 'var(--ink-mid)' }}>
                      <div style={{ maxWidth: '120px' }}>
                        {project.location ? project.location.split(', ').map((part, i) => <div key={i}>{part}{i < project.location.split(', ').length -1 ? ',' : ''}</div>) : '-'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <span className={`status-pill ${project.status === 'Completed' ? 's-approved' : project.status === 'Ongoing' ? 's-pending' : 's-opened'}`}>
                        {project.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle', fontSize: '12px', color: 'var(--ink-mid)' }}>
                      <div style={{ 
                        maxWidth: '250px', 
                        display: '-webkit-box', 
                        WebkitLineClamp: '1', 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden' 
                      }}>
                        {project.description ? project.description.replace(/(<([^>]+)>)/gi, '') : ''}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div className="gallery-count" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                        {project.galleryCount || 0} Photos
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div className="action-group" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <a 
                          href={`/projects/${project.slug}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="action-btn" 
                          title="View Website Page" 
                          style={{ border: '1px solid var(--stone-dark)', background: 'var(--white)', color: 'var(--ink-mid)', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}
                        >
                          👁
                        </a>
                        <Link href={`/dashboard/projects/${project.id}/edit`} style={{ textDecoration: 'none' }}>
                          <button className="action-btn" title="Edit" style={{ border: '1px solid var(--stone-dark)', background: 'var(--white)', color: 'var(--ink-mid)', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✎</button>
                        </Link>
                        <button className="action-btn delete" title="Delete" onClick={() => handleDeleteClick(project.id, project.title)} style={{ border: '1px solid var(--stone-dark)', background: 'var(--white)', color: 'var(--ink-mid)', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>×</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredAndSortedData.length}
            pageSize={pageSize}
          />
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            {paginatedData.map((project) => (
              <div key={project.id} style={{ border: '1px solid var(--stone-dark)', borderRadius: '8px', background: 'var(--white)', overflow: 'hidden', position: 'relative' }}>
                {/* Selection Checkbox Overlay */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    left: '12px', 
                    zIndex: 10,
                    cursor: 'pointer'
                  }}
                  onClick={(e) => toggleSelect(project.id, e)}
                >
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '4px', 
                    border: '2px solid var(--stone-dark)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: selectedIds.includes(project.id) ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
                    borderColor: selectedIds.includes(project.id) ? 'var(--gold)' : 'var(--stone-dark)',
                    transition: 'all 0.2s'
                  }}>
                    {selectedIds.includes(project.id) && <span style={{ color: 'var(--burgundy)', fontWeight: 'bold', fontSize: '11px' }}>✓</span>}
                  </div>
                </div>

                <div style={{ 
                  height: '160px', 
                  backgroundImage: `url(${project.image})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  padding: '12px' 
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6) 100%)' }}></div>
                  <div style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.92)', color: 'var(--burgundy)', fontSize: '10px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '13px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '5px' }}>{project.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginBottom: '10px', display: 'flex', gap: '8px' }}>
                    <StatusPill status={project.status} /> <span>{project.date}</span>
                  </div>
                  <div style={{ 
                    fontSize: '10px', 
                    color: 'var(--ink-mid)', 
                    lineHeight: '1.45', 
                    display: '-webkit-box', 
                    WebkitLineClamp: '1', 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}>
                    {project.description ? project.description.replace(/(<([^>]+)>)/gi, '') : ''}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 13px', borderTop: '1px solid var(--stone)', background: 'var(--cream)' }}>
                   <div className="gallery-count" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                     <Icons.media style={{ width: '12px', height: '12px' }} /> {project.galleryCount || 0} images
                   </div>
                   <div style={{ display: 'flex', gap: '8px' }}>
                      <a 
                        href={`/projects/${project.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="secondary-btn" 
                        style={{ padding: '6px 10px', fontSize: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        View Live
                      </a>
                      <Link href={`/dashboard/projects/${project.id}/edit`} style={{ textDecoration: 'none' }}>
                        <button className="secondary-btn" style={{ padding: '6px 10px', fontSize: '10px' }}>Edit Project</button>
                      </Link>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredAndSortedData.length}
            pageSize={pageSize}
          />
        </>
      )}

      <ProjectPreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        project={selectedProject} 
      />

      <ConfirmationModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title={confirmModal.isBulk ? "Delete Multiple Projects" : "Delete Project"}
        message={confirmModal.isBulk 
          ? `Are you sure you want to permanently delete ${selectedIds.length} selected projects? This action cannot be undone.`
          : `Are you sure you want to delete "${confirmModal.title}"? This action cannot be undone.`
        }
        confirmText={confirmModal.isBulk ? `Delete ${selectedIds.length} Projects` : "Delete Project"}
        type="danger"
        showCheckbox={true}
        checkboxLabel="Delete associated media files from Media Gallery"
        checkboxChecked={deleteMediaChecked}
        onCheckboxChange={setDeleteMediaChecked}
      />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
    </DashboardLayout>
  );
}
