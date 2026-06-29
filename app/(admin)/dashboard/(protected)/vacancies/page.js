'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import { useStore } from '@/hooks/useStore';
import { vacanciesStore, jobApplicationsStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import StatusPill from '@/components/shared/StatusPill';
import VacancyForm from '@/components/forms/VacancyForm';
import Link from 'next/link';

import { useViewMode } from '@/hooks/useViewMode';
import GridToggle from '@/components/shared/GridToggle';
import Pagination from '@/components/shared/Pagination';

import ConfirmationModal from '@/components/modals/ConfirmationModal';

export default function VacanciesPage() {
  const { data: vacancies, createItem, updateItem, deleteItem } = useStore(vacanciesStore);
  const { data: applications } = useStore(jobApplicationsStore);
  const [view, setView] = useViewMode();
  const { filteredAndSortedData, searchQuery, setSearchQuery, filters, updateFilter } = useFilterSort(vacancies, { status: 'all' }, { key: 'datePosted', order: 'desc' });
  
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reviewVacancy, setReviewVacancy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleEdit = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsEditing(true);
    setReviewVacancy(null);
  };

  const handleCloseForm = () => {
    setSelectedVacancy(null);
    setIsEditing(false);
  };

  const handleSave = (finalData) => {
    if (selectedVacancy.id === 'new') {
      createItem(finalData);
    } else {
      updateItem(selectedVacancy.id, finalData);
    }
    handleCloseForm();
  };

  const handleReview = (vacancy) => {
    if (reviewVacancy?.id === vacancy.id) {
      setReviewVacancy(null);
    } else {
      setReviewVacancy(vacancy);
    }
  };

  const handleDeleteClick = (vacancy) => {
    setVacancyToDelete(vacancy);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (vacancyToDelete) {
      deleteItem(vacancyToDelete.id);
      if (reviewVacancy?.id === vacancyToDelete.id) {
        setReviewVacancy(null);
      }
      setIsDeleteModalOpen(false);
      setVacancyToDelete(null);
    }
  };

  // Stats calculation
  const activeCount = vacancies.filter(v => ['published', 'Open', 'open'].includes(v.status?.toLowerCase())).length;
  const draftCount = vacancies.filter(v => ['draft', 'Draft'].includes(v.status)).length;
  const closedCount = vacancies.filter(v => ['closed', 'Closed'].includes(v.status)).length;

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isEditing) {
    const isNew = selectedVacancy.id === 'new';
    return (
      <DashboardLayout title={isNew ? 'Add New Vacancy' : 'Edit Vacancy'} subtitle="Edit, publish, and manage job vacancies">
        <VacancyForm 
          initialData={isNew ? null : selectedVacancy}
          isNew={isNew}
          onSave={handleSave}
          onCancel={handleCloseForm}
        />
      </DashboardLayout>
    );
  }

  // Get applications for the reviewed vacancy
  const vacancyApps = reviewVacancy 
    ? applications.filter(app => app.vacancyId === reviewVacancy.id || app.jobId === reviewVacancy.id)
    : [];

  return (
    <DashboardLayout title="Vacancies" subtitle="Edit, publish, and manage job vacancies">
      <>
      {/* Page Header */}
      <div className="page-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div className="page-title-wrap">
          <h1 style={{ fontSize: '28px', color: 'var(--burgundy)', marginBottom: '6px', fontWeight: 'bold', fontFamily: 'Verdana, sans-serif' }}>Vacancy List</h1>
          <p style={{ fontSize: '13px', color: 'var(--ink-light)' }}>Create, manage, and monitor career opportunities on the Pieach website.</p>
        </div>
        <button 
          onClick={() => handleEdit({ id: 'new' })}
          className="primary-btn"
          style={{ background: '#32171B', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Icons.plus style={{ width: '14px', height: '14px' }} /> Post New Vacancy
        </button>
      </div>

      {/* Stats Row */}
      <div className="kpi-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '30px' }}>
        {[
          { label: 'ACTIVE VACANCIES', value: activeCount },
          { label: 'TOTAL APPLICATIONS', value: applications.length },
          { label: 'DRAFT ROLES', value: draftCount },
          { label: 'CLOSED LISTINGS', value: closedCount }
        ].map((stat, i) => (
          <div key={i} className="kpi-card" style={{ background: 'white', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '18px', textAlign: 'left', transition: 'transform 0.2s ease', cursor: 'default' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--burgundy)', marginBottom: '6px', lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', fontWeight: 'bold', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar" style={{ background: 'white', padding: '18px', borderRadius: '8px', border: '1px solid var(--stone-dark)', display: 'flex', gap: '15px', marginBottom: '28px', alignItems: 'center' }}>
        <div className="search-box" style={{ flex: 1 }}>
          <Icons.search className="w-4 h-4 text-[var(--ink-light)]" />
          <input 
            placeholder="Search vacancies by job title, department, or location" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div style={{ position: 'relative', minWidth: '180px' }}>
          <select 
            className="filter-select" 
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            style={{ width: '100%', padding: '12px 35px 12px 15px', border: '1px solid var(--stone-dark)', borderRadius: '6px', appearance: 'none', fontSize: '13px', background: 'var(--cream)' }}
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
          <Icons.chevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '10px', color: 'var(--gold-dark)', pointerEvents: 'none' }} />
        </div>
        <GridToggle view={view} onViewChange={setView} />
      </div>

      {/* Grid View */}
      {view === 'grid' && !reviewVacancy && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {paginatedData.map((vacancy) => {
              const count = applications.filter(app => app.vacancyId === vacancy.id || app.jobId === vacancy.id).length;
              return (
                <div key={vacancy.id} className="card" style={{ background: 'white', border: '1px solid var(--stone-dark)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '24px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <StatusPill status={vacancy.status} />
                      <span style={{ fontSize: '11px', color: 'var(--ink-light)' }}>{vacancy.datePosted || vacancy.date}</span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--burgundy)', marginBottom: '8px' }}>{vacancy.title}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 'bold', marginBottom: '16px' }}>{vacancy.type} • {vacancy.location}</div>
                    <p style={{ fontSize: '13px', color: 'var(--ink-mid)', lineHeight: '1.6', marginBottom: '20px' }}>{vacancy.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <div style={{ padding: '4px 8px', background: 'var(--blue-light)', color: 'var(--blue)', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{count} Applicants</div>
                       <div style={{ padding: '4px 8px', background: 'var(--cream)', color: 'var(--ink-mid)', borderRadius: '4px', fontSize: '11px' }}>{vacancy.department}</div>
                    </div>
                  </div>
                  <div style={{ padding: '16px 24px', borderTop: '1px solid var(--stone)', background: 'var(--cream)', display: 'flex', justifyContent: 'space-between' }}>
                    <button className="text-btn" style={{ color: 'var(--burgundy)', fontSize: '12px', fontWeight: 'bold' }} onClick={() => handleReview(vacancy)}>View Details</button>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Icons.pencil style={{ width: '16px', height: '16px', cursor: 'pointer', color: 'var(--ink-mid)' }} onClick={() => handleEdit(vacancy)} />
                      <Icons.close style={{ width: '16px', height: '16px', cursor: 'pointer', color: 'var(--red)' }} onClick={() => handleDeleteClick(vacancy)} />
                    </div>
                  </div>
                </div>
              );
            })}
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

      {/* List Container with Review Panel */}
      {(view === 'list' || reviewVacancy) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div 
            className="list-container"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: reviewVacancy ? 'minmax(0, 1fr) 400px' : '1fr', 
              gap: '20px',
              alignItems: 'start',
              transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
            }}
          >
            <div className="card" style={{ background: 'white', border: '1px solid var(--stone-dark)', borderRadius: '8px', overflow: 'hidden' }}>
              <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--stone)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--cream)' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.08em', color: 'var(--ink)' }}>VACANCY LIST</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="project-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--stone-dark)' }}>
                      <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>JOB TITLE</th>
                      <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>EMPLOYMENT TYPE</th>
                      <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>APPLICATIONS</th>
                      <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>STATUS</th>
                      <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>POSTED DATE</th>
                      <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((vacancy) => {
                      const count = applications.filter(app => app.vacancyId === vacancy.id || app.jobId === vacancy.id).length;
                      return (
                        <tr 
                          key={vacancy.id} 
                          onClick={() => handleReview(vacancy)}
                          style={{ borderBottom: '1px solid var(--stone)', cursor: 'pointer', background: reviewVacancy?.id === vacancy.id ? '#FCFAF6' : 'transparent', transition: 'background 0.2s' }}
                        >
                          <td style={{ padding: '18px 20px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--burgundy)' }}>{vacancy.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--ink-light)', marginTop: '2px', maxWidth: '400px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {vacancy.description}
                            </div>
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <span style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{vacancy.type}</span>
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', padding: '6px 12px', borderRadius: '15px', fontWeight: 'bold' }}>
                              {count} Apps
                            </span>
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <StatusPill status={vacancy.status} />
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{vacancy.datePosted || vacancy.date}</div>
                          </td>
                          <td style={{ padding: '18px 20px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="icon-btn-bordered" title="View Details" onClick={(e) => { e.stopPropagation(); handleReview(vacancy); }}>
                                <Icons.eye style={{ width: '16px', height: '16px' }} />
                              </button>
                              <button className="icon-btn-bordered" title="Edit Vacancy" onClick={(e) => { e.stopPropagation(); handleEdit(vacancy); }}>
                                <Icons.pencil style={{ width: '16px', height: '16px' }} />
                              </button>
                              <button className="icon-btn-bordered" style={{ color: 'var(--red)' }} title="Delete" onClick={(e) => { e.stopPropagation(); handleDeleteClick(vacancy); }}>
                                <Icons.close style={{ width: '16px', height: '16px' }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Review Panel */}
            {reviewVacancy && (
              <div className="card" style={{ background: 'white', border: '1px solid var(--stone-dark)', borderTop: '4px solid var(--gold)', borderRadius: '8px', overflow: 'hidden', position: 'sticky', top: '80px' }}>
                <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--stone)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--cream)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.08em', color: 'var(--burgundy)' }}>VACANCY PREVIEW</span>
                  <button 
                    onClick={() => setReviewVacancy(null)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink-mid)', padding: '4px' }}
                  >
                    <Icons.close style={{ width: '18px', height: '18px' }} />
                  </button>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ textAlign: 'center', border: '1px solid var(--stone-dark)', background: 'var(--cream)', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
                    <div style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--burgundy)', marginBottom: '8px' }}>{reviewVacancy.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{reviewVacancy.type} • {reviewVacancy.location}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                      <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Current Status</div>
                      <StatusPill status={reviewVacancy.status} />
                    </div>
                    <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                      <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Deadline</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 'bold' }}>{reviewVacancy.deadline || 'No deadline set'}</div>
                    </div>
                  </div>

                  <div style={{ borderLeft: '4px solid var(--gold)', background: '#FCFAF6', padding: '18px', borderRadius: '4px', marginBottom: '24px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '10px' }}>JOB SUMMARY</div>
                    <div style={{ fontSize: '13px', color: 'var(--ink-mid)', lineHeight: '1.7', marginBottom: reviewVacancy.skills?.length > 0 ? '16px' : '0' }}>{reviewVacancy.description}</div>
                    
                    {reviewVacancy.skills?.length > 0 && (
                      <>
                        <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '8px' }}>Key Skills</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {reviewVacancy.skills.map((skill, idx) => (
                            <div key={idx} style={{ padding: '6px 10px', background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '4px', fontSize: '11px', color: 'var(--burgundy)' }}>
                              <span style={{ fontWeight: 'bold' }}>{skill.title}:</span> {skill.description}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '8px', background: 'var(--white)', padding: '20px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '16px' }}>
                      Recent Applications
                    </div>
                    {vacancyApps.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {vacancyApps.slice(0, 3).map((app, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--cream)', borderRadius: '6px', border: '1px solid var(--stone)' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--burgundy)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>
                              {app.name ? app.name.split(' ').map(n => n[0]).join('') : (app.applicantName ? app.applicantName.split(' ').map(n => n[0]).join('') : '??')}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.name || app.applicantName}</div>
                              <div style={{ fontSize: '10px', color: 'var(--ink-light)' }}>{app.dateApplied || app.date}</div>
                            </div>
                            <StatusPill status={app.status} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: '11px', color: 'var(--ink-light)', textAlign: 'center', padding: '18px', background: 'var(--cream)', borderRadius: '6px', border: '1px solid var(--stone)' }}>No applications received yet.</div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button className="secondary-btn" style={{ flex: 1, padding: '14px', borderRadius: '6px' }} onClick={() => handleEdit(reviewVacancy)}>Edit Role</button>
                    <button 
                      className="primary-btn" 
                      style={{ flex: 1.5, padding: '14px', borderRadius: '6px' }} 
                      onClick={() => setIsPublishModalOpen(true)}
                    >
                      Publish Listing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredAndSortedData.length}
            pageSize={pageSize}
          />
        </div>
      )}

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Vacancy"
        message={`Are you sure you want to delete the vacancy "${vacancyToDelete?.title}"? This action is permanent and will remove all associated application links.`}
        confirmText="Delete Vacancy"
        type="danger"
      />

      <ConfirmationModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={() => {
          updateItem(reviewVacancy.id, { ...reviewVacancy, status: 'published' });
          setIsPublishModalOpen(false);
        }}
        title="Publish Vacancy"
        message={`Are you sure you want to publish the vacancy "${reviewVacancy?.title}"? This will make the listing visible on the public careers page.`}
        confirmText="Publish Now"
        type="primary"
      />

      <style jsx>{`
        .icon-btn-bordered {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid var(--stone-dark);
          border-radius: 6px;
          cursor: pointer;
          color: var(--ink-mid);
          transition: all 0.2s;
        }
        .icon-btn-bordered:hover {
          background: var(--cream);
          border-color: var(--gold);
          color: var(--burgundy);
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </>
    </DashboardLayout>
  );
}
