'use client';
import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import { useStore } from '@/hooks/useStore';
import { messagesStore } from '@/lib/store';
import Pagination from '@/components/shared/Pagination';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import Panel from '@/components/panels/Panel';

export default function MessagesPage() {
  const { data, updateItem, deleteItem } = useStore(messagesStore);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Viewing State
  const [viewingMsg, setViewingMsg] = useState(null);

  // Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [msgToDelete, setMsgToDelete] = useState(null);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortOrder]);

  // Stats calculation
  const totalEntries = data.length;
  const unreadCount = data.filter(m => m.status === 'unread').length;
  const readCount = data.filter(m => m.status === 'read').length;

  // Filter and Sort
  const filteredData = useMemo(() => {
    return data.filter(m => {
      const matchesSearch = 
        m.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.body.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All Statuses' || m.status === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortOrder === 'Newest First') return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });
  }, [data, searchQuery, statusFilter, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedIds([]); // Clear selection when changing page
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map(m => m.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkStatus = (status) => {
    selectedIds.forEach(id => {
      const item = data.find(m => m.id === id);
      if (item) updateItem(id, { ...item, status });
    });
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setIsBulkDelete(true);
    setIsDeleteModalOpen(true);
  };

  const handleView = (msg) => {
    setViewingMsg(msg);
    if (msg.status === 'unread') {
      updateItem(msg.id, { ...msg, status: 'read' });
    }
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      selectedIds.forEach(id => deleteItem(id));
      setSelectedIds([]);
    } else if (msgToDelete) {
      deleteItem(msgToDelete.id);
      setMsgToDelete(null);
    }
    setIsDeleteModalOpen(false);
    setIsBulkDelete(false);
  };

  const [copyFeedback, setCopyFeedback] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyEmail = (email, id = null) => {
    navigator.clipboard.writeText(email);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <DashboardLayout 
      title="Messages" 
      subtitle="View, manage, reply to, and export messages submitted through the website contact form"
    >
      <div className="messages-page">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#32171B] mb-1">Contact Form Entries</h1>
            <p className="text-[11px] text-[#9A8C82]">View, manage, reply to, and export messages submitted through the website contact form.</p>
          </div>
          <button className="bg-[#32171B] text-white px-5 py-2.5 rounded-md text-xs font-bold hover:bg-[#4a2228] transition-colors">
            Export Entries
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>{totalEntries}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Entries</div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>{unreadCount}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Unread</div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>{readCount}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Read</div>
          </div>
        </div>


        {/* Messages Container */}
        <div className="bg-[#FAF7F2] border border-[#DDD5C8] rounded-lg overflow-hidden">
          {/* Section Toolbar */}
          <div className="px-6 py-4 border-b border-[#DDD5C8] flex justify-between items-center bg-white">
            <span className="text-[11px] font-bold text-[#32171B] tracking-widest uppercase">Messages</span>
            <div className="flex gap-3">
              <button 
                onClick={() => handleBulkStatus('read')}
                disabled={selectedIds.length === 0}
                className="bg-white border border-[#DDD5C8] px-4 py-2 rounded-md text-[11px] font-bold text-[#32171B] hover:bg-[#FAF7F2] disabled:opacity-50 transition-colors"
              >
                Mark Read
              </button>
              <button 
                onClick={() => handleBulkStatus('unread')}
                disabled={selectedIds.length === 0}
                className="bg-white border border-[#DDD5C8] px-4 py-2 rounded-md text-[11px] font-bold text-[#32171B] hover:bg-[#FAF7F2] disabled:opacity-50 transition-colors"
              >
                Mark Unread
              </button>
              <button 
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
                className="bg-[#8B2525] text-white px-4 py-2 rounded-md text-[11px] font-bold hover:bg-[#a52a2a] disabled:opacity-50 transition-colors"
              >
                Bulk Delete
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="p-4 flex gap-3 bg-white border-b border-[#DDD5C8]">
            <div className="search-box" style={{ flex: '1', maxWidth: '100%' }}>
              <Icons.search className="w-4 h-4 text-[#9A8C82]" />
              <input 
                type="text" 
                placeholder="Search by first name, last name, email, phone, or message..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#5C4E45] font-medium outline-none"
            >
              <option>All Statuses</option>
              <option>Unread</option>
              <option>Read</option>
            </select>
            <select 
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#5C4E45] font-medium outline-none"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-[#FAF7F2]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#DDD5C8]">
                  <th className="p-4 text-left w-12">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-[#DDD5C8]"
                    />
                  </th>
                  <th className="p-4 text-left text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Name</th>
                  <th className="p-4 text-left text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-left text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Message</th>
                  <th className="p-4 text-center text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Status</th>
                  <th className="p-4 text-center text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-[#9A8C82] text-xs">
                      No messages found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((msg) => (
                    <tr key={msg.id} className="border-b border-[#F0EBE3] bg-white last:border-0">
                      <td className="p-4 align-top">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(msg.id)}
                          onChange={() => toggleSelect(msg.id)}
                          className="w-4 h-4 rounded border-[#DDD5C8]"
                        />
                      </td>
                      <td className="p-4 align-top">
                        <div className="font-bold text-[#1A1410] text-sm mb-0.5">{msg.firstName} {msg.lastName}</div>
                        <div className="text-[10px] text-[#9A8C82]">First Name: <span className="text-[#5C4E45]">{msg.firstName}</span></div>
                        <div className="text-[10px] text-[#9A8C82]">Last Name: <span className="text-[#5C4E45]">{msg.lastName}</span></div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="text-[#5C4E45] text-xs mb-1">{msg.email}</div>
                        <div className="text-[#5C4E45] text-xs">{msg.phone}</div>
                        <div className="text-[10px] text-[#9A8C82] mt-1">ID: <span className="text-[#5C4E45] font-mono">{msg.id}</span></div>
                      </td>
                      <td className="p-4 align-top max-w-xs">
                        <p className="text-[#5C4E45] text-xs leading-relaxed line-clamp-3">
                          {msg.body}
                        </p>
                      </td>
                      <td className="p-4 align-top text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          msg.status === 'unread' 
                            ? 'bg-[#F5E9C8] text-[#A87E28]' 
                            : 'bg-[#E8F5EE] text-[#2D6A4F]'
                        }`}>
                          {msg.status}
                        </span>
                      </td>
                      <td className="p-4 align-top">
                        <div className="flex justify-center gap-1.5">
                          <button 
                            onClick={() => handleView(msg)}
                            className="p-1.5 border border-[#DDD5C8] rounded text-[#5C4E45] hover:bg-[#FAF7F2] transition-colors"
                          >
                            <Icons.eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleCopyEmail(msg.email, msg.id)}
                            title="Copy Email"
                            className="p-1.5 border border-[#DDD5C8] rounded text-[#5C4E45] hover:bg-[#FAF7F2] transition-colors relative"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Icons.check className="w-3.5 h-3.5 text-green-600 animate-[scaleIn_0.2s_ease-out]" />
                                <span style={{
                                  position: 'absolute',
                                  bottom: '125%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  backgroundColor: 'var(--ink)',
                                  color: 'white',
                                  fontSize: '9px',
                                  padding: '3px 6px',
                                  borderRadius: '3px',
                                  whiteSpace: 'nowrap',
                                  pointerEvents: 'none',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  zIndex: 10,
                                  animation: 'fadeIn 0.2s ease-out'
                                }}>
                                  Copied!
                                </span>
                              </>
                            ) : (
                              <Icons.copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button 
                            onClick={() => updateItem(msg.id, { ...msg, status: msg.status === 'unread' ? 'read' : 'unread' })}
                            title={msg.status === 'unread' ? "Mark as Read" : "Mark as Unread"}
                            className="p-1.5 border border-[#DDD5C8] rounded text-[#5C4E45] hover:bg-[#FAF7F2] transition-colors"
                          >
                            {msg.status === 'unread' ? (
                              <Icons.check className="w-3.5 h-3.5" />
                            ) : (
                              <Icons.mail className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button 
                            onClick={() => {
                              setMsgToDelete(msg);
                              setIsBulkDelete(false);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 border border-[#DDD5C8] rounded text-[#5C4E45] hover:bg-[#FAF7F2] transition-colors"
                          >
                            <Icons.close className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredData.length}
            pageSize={pageSize}
          />
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={isBulkDelete ? "Bulk Delete Messages" : "Delete Message"}
        message={isBulkDelete 
          ? `Are you sure you want to delete ${selectedIds.length} selected messages? This action cannot be undone.`
          : `Are you sure you want to delete the message from ${msgToDelete?.firstName} ${msgToDelete?.lastName}? This action cannot be undone.`
        }
        confirmText={isBulkDelete ? "Delete All Selected" : "Delete Message"}
        type="danger"
      />

      <Panel 
        isOpen={!!viewingMsg} 
        onClose={() => setViewingMsg(null)}
        title="Message Details"
        actions={
          <>
            <button className="secondary-btn" onClick={() => setViewingMsg(null)}>Close</button>
            <button 
              className="primary-btn flex items-center gap-2" 
              onClick={() => handleCopyEmail(viewingMsg?.email)}
            >
              {copyFeedback ? (
                <>
                  <Icons.check className="w-4 h-4" />
                  Email Copied!
                </>
              ) : (
                <>
                  <Icons.copy className="w-4 h-4" />
                  Copy Email Address
                </>
              )}
            </button>
          </>
        }
      >
        {viewingMsg && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-[var(--stone)]">
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%', background: 'var(--burgundy)',
                color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', fontWeight: 'bold'
              }}>
                {viewingMsg.firstName[0]}{viewingMsg.lastName[0]}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', color: 'var(--burgundy)', fontWeight: 'bold' }}>
                  {viewingMsg.firstName} {viewingMsg.lastName}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--ink-light)' }}>
                  Submitted on {new Date(viewingMsg.date).toLocaleDateString('en-US', { 
                    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white border border-[var(--stone-dark)] rounded-md">
                <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '4px' }}>Email Address</div>
                <div style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 'medium' }}>{viewingMsg.email}</div>
              </div>
              <div className="p-3 bg-white border border-[var(--stone-dark)] rounded-md">
                <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '4px' }}>Phone Number</div>
                <div style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 'medium' }}>{viewingMsg.phone}</div>
              </div>
            </div>

            <div className="p-4 bg-[var(--white)] border-l-4 border-[var(--gold)] rounded-r-md">
              <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '12px' }}>Message Body</div>
              <div style={{ fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {viewingMsg.body}
              </div>
            </div>

            <div className="p-4 bg-[var(--stone-light)] rounded-md border border-[var(--stone-dark)]">
              <div style={{ fontSize: '10px', color: 'var(--ink-light)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '8px' }}>Metadata</div>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#9A8C82]">Entry ID:</span>
                  <span className="font-mono text-[#5C4E45]">{viewingMsg.id}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#9A8C82]">Status:</span>
                  <span className={`font-bold uppercase tracking-wider ${
                    viewingMsg.status === 'unread' ? 'text-[#A87E28]' : 'text-[#2D6A4F]'
                  }`}>
                    {viewingMsg.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Panel>

      <style jsx>{`
        .messages-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235C4E45'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }
        @keyframes scaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 4px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
