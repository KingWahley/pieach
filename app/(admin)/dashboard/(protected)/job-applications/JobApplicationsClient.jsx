'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import StatusPill from '@/components/shared/StatusPill';
import EmptyState from '@/components/shared/EmptyState';
import { useStore } from '@/hooks/useStore';
import { jobApplicationsStore, vacanciesStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/shared/Pagination';

export default function JobApplicationsClient() {
  const { data: applications, updateItem, deleteItem } = useStore(jobApplicationsStore);
  const { data: vacancies } = useStore(vacanciesStore);
  const searchParams = useSearchParams();
  const vacancyIdParam = searchParams.get('vacancy');
  
  const [reviewApp, setReviewApp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const { filteredAndSortedData, searchQuery, setSearchQuery, filters, updateFilter } = useFilterSort(
    applications, 
    { status: 'all', jobId: vacancyIdParam || 'all' }, 
    { key: 'date', order: 'desc' }
  );

  useEffect(() => {
    if (vacancyIdParam) {
      updateFilter('jobId', vacancyIdParam);
    }
  }, [vacancyIdParam]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleReview = (app) => {
    if (reviewApp?.id === app.id) {
      setReviewApp(null);
    } else {
      setReviewApp(app);
    }
  };

  const stats = [
    { label: 'TOTAL APPLICATIONS', value: applications.length, color: 'var(--burgundy)' },
    { label: 'NEW', value: applications.filter(a => a.status === 'new').length, color: 'var(--gold-dark)' },
    { label: 'SHORTLISTED', value: applications.filter(a => a.status === 'shortlisted').length, color: 'var(--blue)' },
    { label: 'REVIEWED', value: applications.filter(a => ['reviewed', 'interview'].includes(a.status)).length, color: 'var(--green)' },
    { label: 'REJECTED', value: applications.filter(a => a.status === 'rejected').length, color: 'var(--red)' },
  ];

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DashboardLayout 
      title="Job Applications" 
      subtitle="Review, shortlist, approve, reject, and manage submitted job applications"
    >
      <div className="page-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div className="page-title-wrap">
          <h1 style={{ fontSize: '28px', color: 'var(--burgundy)', marginBottom: '6px', fontWeight: 'bold', fontFamily: 'Verdana, sans-serif' }}>Job Applications</h1>
          <p style={{ fontSize: '13px', color: 'var(--ink-light)' }}>Review submitted applications, CVs, and candidate status across all active vacancies.</p>
        </div>
        <button className="primary-btn" style={{ background: '#32171B', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}>Export Applications</button>
      </div>

      <div className="kpi-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '18px', marginBottom: '30px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="kpi-card" style={{ background: 'white', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '18px', textAlign: 'left', transition: 'transform 0.2s ease', cursor: 'default' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--burgundy)', marginBottom: '6px', lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', fontWeight: 'bold', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="toolbar" style={{ background: 'white', padding: '18px', borderRadius: '8px', border: '1px solid var(--stone-dark)', display: 'flex', gap: '15px', marginBottom: '28px', alignItems: 'center' }}>
        <div className="search-box" style={{ flex: 1 }}>
          <Icons.search className="w-4 h-4 text-[var(--ink-light)]" />
          <input 
            type="text" 
            placeholder="Search by applicant name, email, role, or status" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div style={{ position: 'relative', minWidth: '200px' }}>
          <select 
            className="filter-select" 
            value={filters.jobId} 
            onChange={(e) => updateFilter('jobId', e.target.value)}
            style={{ width: '100%', padding: '12px 35px 12px 15px', border: '1px solid var(--stone-dark)', borderRadius: '6px', appearance: 'none', fontSize: '13px', background: 'var(--cream)' }}
          >
            <option value="all">All Vacancies</option>
            {vacancies.map(v => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
          <Icons.chevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '10px', color: 'var(--gold-dark)', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'relative', minWidth: '180px' }}>
          <select 
            className="filter-select" 
            value={filters.status} 
            onChange={(e) => updateFilter('status', e.target.value)}
            style={{ width: '100%', padding: '12px 35px 12px 15px', border: '1px solid var(--stone-dark)', borderRadius: '6px', appearance: 'none', fontSize: '13px', background: 'var(--cream)' }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
          </select>
          <Icons.chevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '10px', color: 'var(--gold-dark)', pointerEvents: 'none' }} />
        </div>
      </div>

      <div 
        className="list-container"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: reviewApp ? 'minmax(0, 1fr) 400px' : '1fr', 
          gap: '20px',
          alignItems: 'start',
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ background: 'white', border: '1px solid var(--stone-dark)', borderRadius: '8px', overflow: 'hidden' }}>
            <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--stone)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--cream)' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.08em', color: 'var(--ink)' }}>APPLICATION LIST</span>
              <button style={{ background: 'none', border: 'none', color: 'var(--gold-dark)', fontSize: '11px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>Bulk actions ›</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="project-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--stone-dark)' }}>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>APPLICANT</th>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>APPLIED ROLE</th>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>DOCUMENTS</th>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>STATUS</th>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>DATE</th>
                    <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', background: 'var(--cream)', letterSpacing: '0.05em' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((app) => (
                      <tr 
                        key={app.id}
                        onClick={() => handleReview(app)}
                        style={{ borderBottom: '1px solid var(--stone)', cursor: 'pointer', background: reviewApp?.id === app.id ? '#FCFAF6' : 'transparent', transition: 'background 0.2s' }}
                      >
                        <td style={{ padding: '18px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--burgundy)', color: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold', flexShrink: 0 }}>
                              {getInitials(app.applicantName || app.name)}
                            </div>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--burgundy)' }}>{app.applicantName || app.name}</div>
                              <div style={{ fontSize: '11px', color: 'var(--ink-light)', marginTop: '2px' }}>{app.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          <span style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--blue-light)', color: 'var(--blue)', borderRadius: '15px', fontSize: '11px', fontWeight: 'bold' }}>
                            {app.roleApplied || app.role}
                          </span>
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {/* CV Badge */}
                            <div className="doc-badge-container" onClick={(e) => e.stopPropagation()}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: 'var(--gold-light)', border: '1px solid var(--gold)', borderRadius: '5px' }}>
                                <Icons.document style={{ width: '12px', height: '12px', color: 'var(--gold-dark)' }} />
                                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--gold-dark)', textTransform: 'uppercase' }}>CV</span>
                              </div>
                              <div className="doc-actions">
                                <button className="action-mini-btn" title="View CV" onClick={(e) => { e.stopPropagation(); window.open(app.cvUrl || '#', '_blank'); }}>
                                  <Icons.eye style={{ width: '12px', height: '12px' }} />
                                </button>
                                <a 
                                  href={app.cvUrl || '#'} 
                                  download 
                                  className="action-mini-btn" 
                                  title="Download CV"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Icons.download style={{ width: '12px', height: '12px' }} />
                                </a>
                              </div>
                            </div>

                            {/* CL Badge */}
                            <div className="doc-badge-container" onClick={(e) => e.stopPropagation()}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: 'var(--gold-light)', border: '1px solid var(--gold)', borderRadius: '5px' }}>
                                <Icons.messages style={{ width: '12px', height: '12px', color: 'var(--gold-dark)' }} />
                                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--gold-dark)', textTransform: 'uppercase' }}>CL</span>
                              </div>
                              <div className="doc-actions">
                                <button className="action-mini-btn" title="View Cover Letter" onClick={(e) => { e.stopPropagation(); window.open(app.clUrl || '#', '_blank'); }}>
                                  <Icons.eye style={{ width: '12px', height: '12px' }} />
                                </button>
                                <a 
                                  href={app.clUrl || '#'} 
                                  download 
                                  className="action-mini-btn" 
                                  title="Download Cover Letter"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Icons.download style={{ width: '12px', height: '12px' }} />
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          <StatusPill status={app.status} />
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          <div style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{formatDate(app.date || app.dateApplied)}</div>
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="icon-btn-bordered" title="View Application" onClick={(e) => { e.stopPropagation(); handleReview(app); }}>
                              <Icons.eye style={{ width: '16px', height: '16px' }} />
                            </button>
                            <button className="icon-btn-bordered" style={{ color: 'var(--green)' }} onClick={(e) => { e.stopPropagation(); updateItem(app.id, { status: 'shortlisted' }); }}>
                              <Icons.check style={{ width: '16px', height: '16px' }} />
                            </button>
                            <button className="icon-btn-bordered" style={{ color: 'var(--red)' }} onClick={(e) => { e.stopPropagation(); updateItem(app.id, { status: 'rejected' }); }}>
                              <Icons.close style={{ width: '16px', height: '16px' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <EmptyState title="No applications found matching your criteria" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredAndSortedData.length}
            pageSize={pageSize}
          />
        </div>

        {/* Side Review Panel */}
        {reviewApp && (
          <div className="card" style={{ background: 'white', border: '1px solid var(--stone-dark)', borderTop: '4px solid var(--gold)', borderRadius: '8px', overflow: 'hidden', position: 'sticky', top: '80px' }}>
            <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--stone)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--cream)' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.08em', color: 'var(--burgundy)' }}>APPLICATION REVIEW</span>
              <button 
                onClick={() => setReviewApp(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink-mid)', padding: '4px' }}
              >
                <Icons.close style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '56px', height: '56px', background: 'var(--burgundy)', color: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                  {getInitials(reviewApp.applicantName || reviewApp.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', color: 'var(--burgundy)', marginBottom: '4px', fontWeight: 'bold' }}>{reviewApp.applicantName || reviewApp.name}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{reviewApp.roleApplied || reviewApp.role}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Email Address</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', wordBreak: 'break-all', fontWeight: 'bold' }}>{reviewApp.email}</div>
                </div>
                <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 'bold' }}>{reviewApp.phone}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Experience</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 'bold' }}>{reviewApp.experience || 'Not specified'}</div>
                </div>
                <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Portfolio</div>
                  {reviewApp.portfolioUrl ? (
                    <a href={reviewApp.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 'bold', textDecoration: 'underline' }}>View Portfolio</a>
                  ) : (
                    <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 'bold' }}>No link provided</div>
                  )}
                </div>
              </div>

              <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--white)', padding: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '12px' }}>CV / Resume Document</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--cream)', borderRadius: '6px', border: '1px solid var(--stone)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icons.document style={{ width: '20px', height: '20px', color: 'var(--burgundy)' }} />
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--ink)' }}>{reviewApp.cvFileName || 'CV_Attached.pdf'}</span>
                  </div>
                  <button className="icon-btn-bordered">
                    <Icons.download style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>

              <div style={{ borderLeft: '4px solid var(--gold)', background: '#FCFAF6', padding: '18px', borderRadius: '4px', marginBottom: '28px' }}>
                <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '10px' }}>Cover Letter Statement</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-mid)', lineHeight: '1.7' }}>
                  {reviewApp.coverLetter || "No cover letter provided with this application."}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="secondary-btn" 
                  style={{ flex: 1, color: 'var(--red)', borderColor: 'var(--red)', padding: '14px', borderRadius: '6px' }}
                  onClick={() => { updateItem(reviewApp.id, { status: 'rejected' }); setReviewApp(null); }}
                >
                  Reject
                </button>
                <button 
                  className="primary-btn" 
                  style={{ flex: 2, padding: '14px', borderRadius: '6px' }}
                  onClick={() => { updateItem(reviewApp.id, { status: 'shortlisted' }); setReviewApp(null); }}
                >
                  Shortlist for Interview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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
        .doc-badge-container {
          position: relative;
        }
        .doc-actions {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          margin-bottom: 8px;
          background: white;
          border: 1px solid var(--stone-dark);
          border-radius: 6px;
          padding: 4px;
          display: flex;
          opacity: 0;
          visibility: hidden;
          gap: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          z-index: 10;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .doc-actions::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 12px;
          background: transparent;
        }
        .doc-actions::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: white transparent transparent transparent;
        }
        .doc-badge-container:hover .doc-actions {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        .action-mini-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid var(--stone);
          border-radius: 4px;
          cursor: pointer;
          color: var(--ink-mid);
          transition: all 0.2s;
        }
        .action-mini-btn:hover {
          background: var(--cream);
          color: var(--burgundy);
          border-color: var(--gold);
        }
      `}</style>
    </DashboardLayout>
  );
}
