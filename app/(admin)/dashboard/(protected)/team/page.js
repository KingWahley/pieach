'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import StatusPill from '@/components/shared/StatusPill';
import SearchToolbar from '@/components/shared/SearchToolbar';
import EmptyState from '@/components/shared/EmptyState';
import GridToggle from '@/components/shared/GridToggle';
import { useStore } from '@/hooks/useStore';
import { teamStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import { useViewMode } from '@/hooks/useViewMode';
import Pagination from '@/components/shared/Pagination';
import TeamMemberPreview from '@/components/team/TeamMemberPreview';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

export default function TeamPage() {
  const router = useRouter();
  const { data, updateItem, deleteItem } = useStore(teamStore);
  
  const { 
    filteredAndSortedData, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    updateFilter 
  } = useFilterSort(
    data, 
    { role: 'all', status: 'all' }, 
    { key: 'displayOrder', order: 'asc' }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  
  const [selectedMember, setSelectedMember] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Reorder State
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [reorderList, setReorderList] = useState([]);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  
  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
    name: ''
  });

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.3';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const listCopy = [...reorderList];
    const draggedItem = listCopy[draggedIndex];
    listCopy.splice(draggedIndex, 1);
    listCopy.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setReorderList(listCopy);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
  };

  const openReorderModal = () => {
    const sorted = [...data].sort((a, b) => {
      const numA = Number(a.displayOrder || 0);
      const numB = Number(b.displayOrder || 0);
      return numA - numB;
    });
    setReorderList(sorted);
    setIsReorderOpen(true);
  };

  const handleSaveOrder = async () => {
    setIsSavingOrder(true);
    try {
      for (let i = 0; i < reorderList.length; i++) {
        const item = reorderList[i];
        const newOrder = String(i + 1);
        if (item.displayOrder !== newOrder) {
          await updateItem(item.id, { ...item, displayOrder: newOrder });
        }
      }
      setIsReorderOpen(false);
    } catch (error) {
      console.error('Error saving team order:', error);
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handlePreview = (member) => {
    setSelectedMember(member);
    setIsPreviewOpen(true);
  };

  const handleDeleteClick = (id, name) => {
    setConfirmModal({
      isOpen: true,
      id,
      name
    });
  };

  const handleConfirmDelete = () => {
    deleteItem(confirmModal.id);
    setConfirmModal({ isOpen: false, id: null, name: '' });
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);
  
  const [view, setView] = useViewMode();

  const stats = [
    { 
      label: 'Total team members', 
      value: data.length, 
      subtext: 'Profiles currently available in the CMS' 
    },
    { 
      label: 'Search results', 
      value: filteredAndSortedData.length, 
      subtext: filteredAndSortedData.length === data.length ? 'All members visible' : 'Filtered members visible' 
    },
    { 
      label: 'Last update', 
      value: 'Apr 29, 2026', 
      subtext: 'Most recently edited profile' 
    },
  ];

  const designations = ['all', ...new Set(data.map(m => m.role))];

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DashboardLayout 
      title="Our Team" 
      subtitle="Manage team profiles, designations, qualifications, photos, and bios"
    >
      {/* Page Header */}
      <div className="page-head" style={{ marginBottom: '28px', borderBottom: 'none' }}>
        <div className="page-title-wrap">
          <h1 className="text-3xl font-bold text-[var(--burgundy)] mb-1">Team List</h1>
          <p className="text-[13px] text-[var(--ink-light)]">Add, edit, view, and delete team member profiles displayed on the Pieach website.</p>
        </div>
        <button 
          className="primary-btn" 
          onClick={() => router.push('/dashboard/team/new')}
          style={{ background: 'var(--burgundy)', color: 'var(--white)', padding: '10px 22px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s' }}
        >
          <Icons.plus style={{ width: '16px', height: '16px', strokeWidth: '3' }} />
          Add Team Member
        </button>
      </div>

      {/* KPI Stats Row - Updated to 3 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ 
            background: 'var(--white)', 
            border: '1px solid var(--stone-dark)', 
            borderTop: '3px solid var(--gold)', 
            borderRadius: '6px', 
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--ink-light)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--gold-dark)', marginTop: '8px', fontWeight: '500' }}>{stat.subtext}</div>
          </div>
        ))}
      </div>


      {/* Toolbar - Added background and stroke */}
      <div style={{ 
        background: 'var(--white)', 
        border: '1.5px solid var(--stone)', 
        borderRadius: '8px', 
        padding: '16px', 
        marginBottom: '32px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: '1', minWidth: '300px' }}>
            <Icons.search className="w-4 h-4 text-[var(--ink-light)]" />
            <input 
              type="text" 
              placeholder="Search team by name, designation, or qualifications"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <select 
              value={filters.role}
              onChange={(e) => updateFilter('role', e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--stone)', background: 'var(--white)', fontSize: '13px', color: 'var(--ink)', cursor: 'pointer', outline: 'none', minWidth: '150px' }}
            >
              <option value="all">All Designations</option>
              {designations.filter(d => d !== 'all').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select 
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--stone)', background: 'var(--white)', fontSize: '13px', color: 'var(--ink)', cursor: 'pointer', outline: 'none', minWidth: '130px' }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div style={{ marginLeft: 'auto', borderLeft: '1px solid var(--stone)', paddingLeft: '12px' }}>
            <GridToggle view={view} onViewChange={setView} />
          </div>
        </div>
      </div>

      {/* Section Label */}
      <div style={{ 
        marginBottom: '0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 20px',
        border: '1.5px solid var(--stone)',
        borderBottom: 'none',
        borderRadius: '8px 8px 0 0',
        background: 'var(--cream-light)'
      }}>
        <h2 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--ink-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Team List View</h2>
        <button 
          onClick={openReorderModal}
          style={{ 
            background: 'none',
            border: 'none',
            fontSize: '11px', 
            color: 'var(--gold-dark)', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Reorder team display →
        </button>
      </div>

      {/* Main Content Area */}
      {filteredAndSortedData.length === 0 ? (
        <div style={{ padding: '80px 20px', background: 'var(--white)', border: '1.5px solid var(--stone)', borderRadius: '0 0 8px 8px', textAlign: 'center' }}>
          <EmptyState title="No team members found" message="Try a different search query or add a new team member." />
        </div>
      ) : view === 'list' ? (
        <div style={{ background: 'var(--white)', border: '1.5px solid var(--stone)', borderRadius: '0 0 8px 8px', overflow: 'hidden', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--stone)' }}>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '10px', fontWeight: '800', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Team Member</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '10px', fontWeight: '800', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Designation</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '10px', fontWeight: '800', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Qualifications</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '10px', fontWeight: '800', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bio Preview</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '10px', fontWeight: '800', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: '10px', fontWeight: '800', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((member) => (
                <tr key={member.id} className="team-row" style={{ borderBottom: '1px solid var(--stone)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--burgundy)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>
                        {member.image ? (
                          <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--ink)', fontSize: '13.5px' }}>
                          {member.title} {member.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--ink-light)', marginTop: '1px' }}>{member.title || 'Arch.'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '12.5px', color: 'var(--ink-mid)', fontWeight: '500' }}>{member.role}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'var(--cream)', color: 'var(--burgundy)', fontSize: '10px', fontWeight: '800', border: '1px solid var(--stone)' }}>
                      {Array.isArray(member.qualifications) 
                        ? member.qualifications.map(q => typeof q === 'object' && q ? (q.title || '') : String(q)).filter(q => q && q.trim()).join(', ') 
                        : (member.qualifications || 'B.Arch')}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '12.5px', color: 'var(--ink-mid)', maxWidth: '300px', lineHeight: '1.45' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                      {member.bio}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <StatusPill status={member.status} />
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button 
                        className="action-btn" 
                        title="View"
                        onClick={() => window.open(`/team/${member.slug || ''}`, '_blank')}
                      >
                        <Icons.eye style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button className="action-btn" onClick={() => router.push(`/dashboard/team/${member.id}/edit`)} title="Edit"><Icons.pencil style={{ width: '14px', height: '14px' }} /></button>
                      <button className="action-btn" onClick={() => handleDeleteClick(member.id, member.name)} title="Delete"><Icons.close style={{ width: '14px', height: '14px' }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
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
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {paginatedData.map((member) => (
              <div key={member.id} className="team-card-p" style={{ background: 'var(--white)', border: '1.5px solid var(--stone)', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => handlePreview(member)}>
                <div style={{ height: '100px', background: 'var(--burgundy)', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: '-28px', left: '16px', width: '70px', height: '70px', borderRadius: '50%', background: 'var(--gold)', border: '3px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', color: 'var(--burgundy)', overflow: 'hidden' }}>
                    {member.image ? (
                      <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    )}
                  </div>
                </div>
                <div style={{ padding: '38px 16px 16px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ink)', marginBottom: '2px' }}>{member.title} {member.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{member.role}</div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-light)', lineHeight: '1.5', margin: '0 0 16px', minHeight: '54px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {member.bio}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--stone)' }}>
                    <StatusPill status={member.status} />
                    <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--burgundy)', background: 'var(--cream)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--stone)' }}>
                      {Array.isArray(member.qualifications)
                        ? (member.qualifications.map(q => typeof q === 'object' && q ? (q.title || '') : String(q)).filter(q => q && q.trim())[0] || 'B.Arch')
                        : (member.qualifications?.split(',')[0] || 'B.Arch')}
                    </span>
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

      <TeamMemberPreview 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        member={selectedMember}
      />

      <ConfirmationModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Delete Team Member"
        message={`Are you sure you want to delete ${confirmModal.name}? This profile will be permanently removed from the CMS.`}
        confirmText="Delete Profile"
        type="danger"
      />

      {isReorderOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(9, 13, 18, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{
            background: 'var(--cream)',
            border: '1px solid var(--stone)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '540px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--stone)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Reorder Team Members
              </h2>
              <button 
                onClick={() => setIsReorderOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-light)', padding: 0 }}
              >
                <Icons.close style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              <p style={{ margin: '0 0 16px', fontSize: '12.5px', color: 'var(--ink-mid)', lineHeight: '1.5' }}>
                Drag and drop team members to reorder their display order on the live website. Click &quot;Save Order&quot; to publish the changes.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {reorderList.map((member, idx) => (
                  <div 
                    key={member.id}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnter={(e) => handleDragEnter(e, idx)}
                    onDragEnd={handleDragEnd}
                    style={{
                      background: 'var(--white)',
                      border: '1.5px solid var(--stone)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.25s ease',
                      cursor: 'grab'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Drag Grip Handle */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: 'var(--ink-light)', paddingRight: '4px' }}>
                        <div style={{ width: '12px', height: '2px', background: 'currentColor' }} />
                        <div style={{ width: '12px', height: '2px', background: 'currentColor' }} />
                        <div style={{ width: '12px', height: '2px', background: 'currentColor' }} />
                      </div>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'var(--burgundy)',
                        color: 'var(--white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '800'
                      }}>
                        {idx + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--ink)' }}>
                          {member.title} {member.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--gold-dark)', fontWeight: '700' }}>
                          {member.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--stone)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: 'var(--cream-light)' }}>
              <button 
                className="secondary-btn" 
                onClick={() => setIsReorderOpen(false)}
                disabled={isSavingOrder}
              >
                Cancel
              </button>
              <button 
                className="primary-btn" 
                onClick={handleSaveOrder}
                disabled={isSavingOrder}
              >
                {isSavingOrder ? 'Saving...' : 'Save Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .team-row:hover {
          background-color: var(--cream-light) !important;
        }
        .action-btn {
          padding: 7px;
          border-radius: 4px;
          border: 1px solid var(--stone);
          background: var(--white);
          color: var(--ink-mid);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .action-btn:hover {
          border-color: var(--gold-dark);
          background: var(--cream-light);
          color: var(--burgundy);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .team-card-p:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          border-color: var(--gold-dark) !important;
        }
      `}</style>
    </DashboardLayout>
  );
}

