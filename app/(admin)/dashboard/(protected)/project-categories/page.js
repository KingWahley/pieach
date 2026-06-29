'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import { useStore } from '@/hooks/useStore';
import { projectCategoriesStore, projectsStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import SearchToolbar from '@/components/shared/SearchToolbar';
import Pagination from '@/components/shared/Pagination';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

export default function ProjectCategoriesPage() {
  const { data, createItem, updateItem, deleteItem } = useStore(projectCategoriesStore);
  const { data: projects } = useStore(projectsStore);
  const { filteredAndSortedData, searchQuery, setSearchQuery } = useFilterSort(data);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', status: 'Active' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const pageSize = 7;

  // Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedIds([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [searchQuery]);

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
      setSelectedIds(paginatedData.map(c => c.id));
    }
  };

  const toggleForm = () => {
    if (isFormOpen) {
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: '', slug: '', description: '', status: 'Active' });
    } else {
      setIsFormOpen(true);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      status: cat.status || 'Active'
    });
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (editingId) {
      updateItem(editingId, formData);
    } else {
      createItem(formData);
    }
    toggleForm();
  };

  const getProjectCount = (catName) => {
    return projects.filter(p => p.category?.toLowerCase() === catName?.toLowerCase()).length;
  };

  return (
    <DashboardLayout title="Project Categories" subtitle="Create and manage reusable project categories for portfolio entries">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Project Categories</h1>
          <p>Add, edit, and manage categories that can be selected when creating or editing projects.</p>
        </div>
        <button className="primary-btn" onClick={toggleForm}>
          {isFormOpen ? <Icons.close style={{ width: '14px', height: '14px', marginRight: '8px' }} /> : <Icons.plus style={{ width: '14px', height: '14px', marginRight: '8px' }} />}
          {isFormOpen ? 'Close Form' : 'Add Category'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div className="kpi-card">
          <div className="kpi-value">{data.length}</div>
          <div className="kpi-label">Total Categories</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">{projects.length}</div>
          <div className="kpi-label">Linked Projects</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">
            {data.length > 0 ? (data.reduce((a, b) => getProjectCount(a.name) > getProjectCount(b.name) ? a : b).name) : '-'}
          </div>
          <div className="kpi-label">Most Used</div>
        </div>
      </div>

      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search categories by name or description"
      >
        {selectedIds.length > 0 && (
          <button 
            onClick={() => {
              setIsBulkDelete(true);
              setIsDeleteModalOpen(true);
            }}
            className="secondary-btn"
            style={{ color: 'var(--red)', borderColor: 'var(--red)', background: 'transparent', padding: '10px 14px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', height: '38px' }}
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </SearchToolbar>

      <div style={{ display: 'grid', gridTemplateColumns: isFormOpen ? '360px 1fr' : '1fr', gap: '18px', alignItems: 'start', transition: 'grid-template-columns 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' }}>
        {/* Form Card */}
        {isFormOpen && (
          <div className="card">
            <div className="card-header">
              <span className="card-title">{editingId ? 'Edit Category' : 'Add Category'}</span>
            </div>
            <div className="form-body">
              <div className="form-group">
                <label>Category Name</label>
                <input 
                  placeholder="e.g. Residential" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input 
                  placeholder="e.g. residential" 
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Briefly describe where this category should be used."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-actions">
                <button className="secondary-btn" onClick={toggleForm}>Cancel</button>
                <button className="primary-btn" onClick={handleSubmit}>{editingId ? 'Update Category' : 'Save Category'}</button>
              </div>
            </div>
          </div>
        )}

        {/* Table Card */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Category List</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="project-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th>Category</th>
                  <th>Slug</th>
                  <th>Projects</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((cat) => (
                  <tr key={cat.id}>
                    <td onClick={(e) => toggleSelect(cat.id, e)}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(cat.id)}
                        readOnly
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <div className="project-title">{cat.name}</div>
                      <div className="project-desc" style={{ maxWidth: '300px' }}>{cat.description}</div>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{cat.slug}</td>
                    <td>
                      <span className="gallery-count" style={{ background: 'var(--gold-light)', color: 'var(--burgundy)' }}>
                        {getProjectCount(cat.name)} Projects
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${cat.status === 'Active' ? 's-approved' : 's-rejected'}`}>{cat.status}</span>
                    </td>
                    <td>
                      <div className="action-group">
                        <button className="action-btn" title="Edit" onClick={() => handleEdit(cat)}>
                          <Icons.pencil style={{ width: '14px', height: '14px' }} />
                        </button>
                        <button 
                          className="action-btn delete" 
                          title="Delete" 
                          onClick={() => {
                            setCatToDelete(cat);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Icons.close style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAndSortedData.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--ink-light)' }}>No categories found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredAndSortedData.length}
              pageSize={pageSize}
            />
          </div>
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setIsBulkDelete(false);
          setCatToDelete(null);
        }}
        onConfirm={() => {
          if (isBulkDelete) {
            selectedIds.forEach(id => deleteItem(id));
            setSelectedIds([]);
            setIsBulkDelete(false);
          } else if (catToDelete) {
            deleteItem(catToDelete.id);
            setCatToDelete(null);
          }
          setIsDeleteModalOpen(false);
        }}
        title={isBulkDelete ? "Delete Multiple Categories" : "Delete Category"}
        message={isBulkDelete 
          ? `Are you sure you want to permanently delete the ${selectedIds.length} selected categories? This will affect projects associated with these categories.`
          : `Are you sure you want to delete the category "${catToDelete?.name}"? This will affect projects associated with this category.`
        }
        confirmText={isBulkDelete ? `Delete ${selectedIds.length} Categories` : "Delete Category"}
        type="danger"
      />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
    </DashboardLayout>
  );
}
