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
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import Toast from '@/components/shared/Toast';

export default function JobApplicationsClient() {
  const { data: applications, updateItem, deleteItem } = useStore(jobApplicationsStore);
  const { data: vacancies } = useStore(vacanciesStore);
  const searchParams = useSearchParams();
  const vacancyIdParam = searchParams.get('vacancy');
  
  const [reviewApp, setReviewApp] = useState(null);
  const activeApp = reviewApp ? applications.find(a => a.id === reviewApp.id) : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const pageSize = 7;

  const { filteredAndSortedData, searchQuery, setSearchQuery, filters, updateFilter } = useFilterSort(
    applications, 
    { status: 'all', vacancyId: vacancyIdParam || 'all' }, 
    { key: 'date', order: 'desc' }
  );

  useEffect(() => {
    if (vacancyIdParam) {
      updateFilter('vacancyId', vacancyIdParam);
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
      const currentStatus = String(app.status || '').toLowerCase();
      if (currentStatus === 'new' || currentStatus === 'applied') {
        updateItem(app.id, { status: 'reviewed' });
      }
    }
  };

  const handleExportExcel = () => {
    const headers = ['Applicant Name', 'Email Address', 'Role Applied', 'Status', 'Date Applied'];
    const rows = filteredAndSortedData.map(app => [
      app.applicantName || app.name || '',
      app.email || '',
      app.roleApplied || app.role || '',
      app.status || '',
      app.date || app.dateApplied || ''
    ]);

    const escapeCsv = (val) => {
      const text = String(val);
      if (text.includes(',') || text.includes('"') || text.includes('\n')) {
        return `"${text.replace(/"/g, '""')}"`;
      }
      return text;
    };

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(escapeCsv).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job_applications_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleExportPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked. Please allow pop-ups to export as PDF.');
      return;
    }

    const logoUrl = window.location.origin + '/images/mainlogo2.png';

    const rowsHtml = filteredAndSortedData.map((app, index) => `
      <tr style="border-bottom: 1px solid #EAE6DF;">
        <td style="padding: 12px 8px; font-size: 11px;">${index + 1}</td>
        <td style="padding: 12px 8px; font-weight: bold; font-size: 11px; color: #32171B;">${app.applicantName || app.name || ''}</td>
        <td style="padding: 12px 8px; font-size: 11px;">${app.email || ''}</td>
        <td style="padding: 12px 8px; font-size: 11px; font-weight: 500;">${app.roleApplied || app.role || ''}</td>
        <td style="padding: 12px 8px; font-size: 11px; text-transform: uppercase; font-weight: bold; color: ${
          app.status === 'shortlisted' ? '#1E3A8A' : app.status === 'rejected' ? '#991B1B' : '#B45309'
        };">${app.status || 'new'}</td>
        <td style="padding: 12px 8px; font-size: 11px;">${app.date || app.dateApplied || ''}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Job Applications Report - ${new Date().toLocaleDateString()}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #1A1A1A;
              margin: 40px;
              padding: 0;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #32171B;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header-content {
              display: flex;
              align-items: center;
              gap: 15px;
            }
            .logo-img {
              height: 48px;
              width: auto;
            }
            .title {
              font-size: 24px;
              font-weight: 700;
              color: #32171B;
              letter-spacing: -0.02em;
            }
            .meta {
              font-size: 12px;
              color: #666;
              text-align: right;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            th {
              background-color: #F7F5F0;
              color: #32171B;
              font-weight: 700;
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              text-align: left;
              padding: 12px 8px;
              border-bottom: 2px solid #EAE6DF;
            }
            tr:nth-child(even) {
              background-color: #FAFAFA;
            }
            @media print {
              body { margin: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="header-content">
              <img src="${logoUrl}" alt="Pieach Logo" class="logo-img" onerror="this.style.display='none';" />
              <div>
                <div class="title">Pieach Architecture</div>
                <div style="font-size: 14px; color: #C0B4A5; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px;">Job Applications Report</div>
              </div>
            </div>
            <div class="meta">
              <div>Date Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div>Total Records: ${filteredAndSortedData.length}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 5%">#</th>
                <th style="width: 25%">Applicant Name</th>
                <th style="width: 25%">Email Address</th>
                <th style="width: 25%">Role Applied</th>
                <th style="width: 10%">Status</th>
                <th style="width: 10%">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const stats = [
    { label: 'TOTAL APPLICATIONS', value: applications.length, color: 'var(--burgundy)' },
    { label: 'NEW', value: applications.filter(a => ['new', 'applied'].includes(String(a.status || '').toLowerCase())).length, color: 'var(--gold-dark)' },
    { label: 'SHORTLISTED', value: applications.filter(a => String(a.status || '').toLowerCase() === 'shortlisted').length, color: 'var(--blue)' },
    { label: 'REVIEWED', value: applications.filter(a => !['new', 'applied'].includes(String(a.status || '').toLowerCase())).length, color: 'var(--green)' },
    { label: 'REJECTED', value: applications.filter(a => String(a.status || '').toLowerCase() === 'rejected').length, color: 'var(--red)' },
  ];

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleViewFile = async (url) => {
    if (!url || !url.startsWith('http')) return;
    
    // Extract bucket and path from the Supabase storage URL
    // Format: .../storage/v1/object/public/BUCKET_NAME/PATH
    const match = url.match(/\/storage\/v1\/object\/public\/([^\/]+)\/(.+)$/);
    if (match) {
      const bucket = match[1];
      const path = match[2];
      
      try {
        const res = await fetch(`/api/signed-url?bucket=${bucket}&path=${encodeURIComponent(path)}`);
        if (res.ok) {
          const data = await res.json();
          window.open(data.url, '_blank');
          return;
        }
      } catch (e) {
        console.error('Failed to get signed URL:', e);
      }
    }
    window.open(url, '_blank');
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
        <button 
          className="primary-btn" 
          style={{ background: '#32171B', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}
          onClick={() => setShowExportModal(true)}
        >
          Export Applications
        </button>
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
            value={filters.vacancyId} 
            onChange={(e) => updateFilter('vacancyId', e.target.value)}
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
            <option value="applied">Applied</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
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
                        style={{ 
                          borderBottom: '1px solid var(--stone)', 
                          cursor: 'pointer', 
                          background: reviewApp?.id === app.id 
                            ? '#FCFAF6' 
                            : !['new', 'applied'].includes(String(app.status || '').toLowerCase())
                              ? '#F2FAF4' 
                              : 'transparent', 
                          transition: 'background 0.2s' 
                        }}
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
                                <button 
                                  className="action-mini-btn" 
                                  title="View CV" 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    const currentStatus = String(app.status || '').toLowerCase();
                                    if (currentStatus === 'new' || currentStatus === 'applied') {
                                      updateItem(app.id, { status: 'reviewed' });
                                    }
                                    if (app.cvUrl && (app.cvUrl.startsWith('http') || app.cvUrl.startsWith('/'))) {
                                      handleViewFile(app.cvUrl);
                                    } else {
                                      window.open('#', '_blank'); 
                                    }
                                  }}
                                >
                                  <Icons.eye style={{ width: '12px', height: '12px' }} />
                                </button>
                                <button 
                                  className="action-mini-btn" 
                                  title="Download CV"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentStatus = String(app.status || '').toLowerCase();
                                    if (currentStatus === 'new' || currentStatus === 'applied') {
                                      updateItem(app.id, { status: 'reviewed' });
                                    }
                                    if (app.cvUrl && (app.cvUrl.startsWith('http') || app.cvUrl.startsWith('/'))) {
                                      handleViewFile(app.cvUrl);
                                    }
                                  }}
                                >
                                  <Icons.download style={{ width: '12px', height: '12px' }} />
                                </button>
                              </div>
                            </div>

                            {/* CL Badge */}
                            <div className="doc-badge-container" onClick={(e) => e.stopPropagation()}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: 'var(--gold-light)', border: '1px solid var(--gold)', borderRadius: '5px' }}>
                                <Icons.messages style={{ width: '12px', height: '12px', color: 'var(--gold-dark)' }} />
                                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--gold-dark)', textTransform: 'uppercase' }}>CL</span>
                              </div>
                              <div className="doc-actions">
                                <button 
                                  className="action-mini-btn" 
                                  title="View Cover Letter" 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    const currentStatus = String(app.status || '').toLowerCase();
                                    if (currentStatus === 'new' || currentStatus === 'applied') {
                                      updateItem(app.id, { status: 'reviewed' });
                                    }
                                    if (app.clUrl) {
                                      if (app.clUrl.startsWith('http') || app.clUrl.startsWith('/')) {
                                        handleViewFile(app.clUrl);
                                      } else {
                                        const blob = new Blob([app.coverLetter || app.clUrl], { type: 'text/plain;charset=utf-8' });
                                        const url = URL.createObjectURL(blob);
                                        window.open(url, '_blank');
                                      }
                                    }
                                  }}
                                >
                                  <Icons.eye style={{ width: '12px', height: '12px' }} />
                                </button>
                                <button 
                                  className="action-mini-btn" 
                                  title="Download Cover Letter"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentStatus = String(app.status || '').toLowerCase();
                                    if (currentStatus === 'new' || currentStatus === 'applied') {
                                      updateItem(app.id, { status: 'reviewed' });
                                    }
                                    if (app.clUrl) {
                                      if (app.clUrl.startsWith('http') || app.clUrl.startsWith('/')) {
                                        handleViewFile(app.clUrl);
                                      } else {
                                        const blob = new Blob([app.coverLetter || app.clUrl], { type: 'text/plain;charset=utf-8' });
                                        const url = URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.download = `${app.applicantName || 'applicant'}_cover_letter.txt`;
                                        link.click();
                                      }
                                    }
                                  }}
                                >
                                  <Icons.download style={{ width: '12px', height: '12px' }} />
                                </button>
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
                            <button className="icon-btn-bordered" style={{ color: 'var(--red)' }} onClick={(e) => { e.stopPropagation(); updateItem(app.id, { status: 'rejected' }); }} title="Reject Application">
                              <Icons.close style={{ width: '16px', height: '16px' }} />
                            </button>
                            <button 
                              className="icon-btn-bordered" 
                              style={{ color: 'var(--red)' }} 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setAppToDelete(app);
                                setIsDeleteModalOpen(true);
                              }}
                              title="Delete Application"
                            >
                              <Icons.trash style={{ width: '16px', height: '16px' }} />
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
        {activeApp && (
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
                  {getInitials(activeApp.applicantName || activeApp.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', color: 'var(--burgundy)', marginBottom: '4px', fontWeight: 'bold' }}>{activeApp.applicantName || activeApp.name}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{activeApp.roleApplied || activeApp.role}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Email Address</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', wordBreak: 'break-all', fontWeight: 'bold' }}>{activeApp.email}</div>
                </div>
                <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 'bold' }}>{activeApp.phone}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Experience</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 'bold' }}>{activeApp.experience || 'Not specified'}</div>
                </div>
                <div style={{ border: '1px solid var(--stone-dark)', borderRadius: '6px', background: 'var(--cream)', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Portfolio</div>
                  {activeApp.portfolioUrl ? (
                    <a href={activeApp.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 'bold', textDecoration: 'underline' }}>View Portfolio</a>
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
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--ink)' }}>{activeApp.cvFileName || 'CV_Attached.pdf'}</span>
                  </div>
                  <button className="icon-btn-bordered" onClick={() => handleViewFile(activeApp.cvUrl)} title="Download CV">
                    <Icons.download style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>

              <div style={{ borderLeft: '4px solid var(--gold)', background: '#FCFAF6', padding: '18px', borderRadius: '4px', marginBottom: '28px' }}>
                <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '10px' }}>Cover Letter Statement</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-mid)', lineHeight: '1.7' }}>
                  {activeApp.coverLetter && (activeApp.coverLetter.startsWith('http') || activeApp.coverLetter.startsWith('/')) ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--cream)', borderRadius: '6px', border: '1px solid var(--stone)', marginTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icons.messages style={{ width: '20px', height: '20px', color: 'var(--burgundy)' }} />
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--ink)' }}>Cover_Letter_Attached</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          className="icon-btn-bordered" 
                          onClick={() => handleViewFile(activeApp.coverLetter)}
                          title="View Cover Letter"
                        >
                          <Icons.eye style={{ width: '16px', height: '16px' }} />
                        </button>
                        <button 
                          className="icon-btn-bordered" 
                          onClick={() => handleViewFile(activeApp.coverLetter)}
                          title="Download Cover Letter"
                        >
                          <Icons.download style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    activeApp.coverLetter || "No cover letter provided with this application."
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="secondary-btn" 
                  style={{ flex: 1, color: 'var(--red)', borderColor: 'var(--red)', padding: '14px', borderRadius: '6px' }}
                  onClick={() => { updateItem(activeApp.id, { status: 'rejected' }); setReviewApp(null); }}
                >
                  Reject
                </button>
                <button 
                  className="primary-btn" 
                  style={{ flex: 2, padding: '14px', borderRadius: '6px' }}
                  onClick={() => { updateItem(activeApp.id, { status: 'shortlisted' }); setReviewApp(null); }}
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
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAppToDelete(null);
        }}
        onConfirm={() => {
          if (appToDelete) {
            const name = appToDelete.applicantName || appToDelete.name || 'Applicant';
            deleteItem(appToDelete.id);
            setToast({ message: `Application from "${name}" deleted.`, type: 'success' });
          }
          setIsDeleteModalOpen(false);
          setAppToDelete(null);
        }}
        title="Delete Application"
        message={`Are you sure you want to delete ${appToDelete?.applicantName || appToDelete?.name || 'this'}'s application? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />

      {showExportModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderTop: '4px solid var(--gold)', borderRadius: '8px', padding: '28px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--burgundy)', marginBottom: '8px' }}>Export Job Applications</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-light)', marginBottom: '24px' }}>Select your preferred format to export the filtered list of job applications.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <button 
                className="secondary-btn" 
                style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px', padding: '14px', borderRadius: '6px' }}
                onClick={() => { handleExportExcel(); setShowExportModal(false); }}
              >
                <Icons.document style={{ width: '18px', height: '18px' }} />
                Export as Excel (.csv)
              </button>
              <button 
                className="secondary-btn" 
                style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px', padding: '14px', borderRadius: '6px' }}
                onClick={() => { handleExportPdf(); setShowExportModal(false); }}
              >
                <Icons.download style={{ width: '18px', height: '18px' }} />
                Export as PDF Table (.pdf)
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="secondary-btn" 
                style={{ border: 'none', background: 'transparent', padding: '8px 16px', color: 'var(--ink-mid)' }}
                onClick={() => setShowExportModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
