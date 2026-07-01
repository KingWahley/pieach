'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAppointments } from '@/hooks/useAppointments';
import AppointmentFilters from '@/components/appointments/AppointmentFilters';
import AppointmentTable from '@/components/appointments/AppointmentTable';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import AppointmentReviewPanel from '@/components/appointments/AppointmentReviewPanel';
import { Icons } from '@/components/shared/Icons';
import Pagination from '@/components/shared/Pagination';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import Toast from '@/components/shared/Toast';

export default function AppointmentsListPage() {
  const {
    filteredAppointments,
    calendarEvents,
    filterConfig,
    setFilterConfig,
    viewMode,
    setViewMode,
    selectedAppointment,
    selectedAppointmentId,
    setSelectedAppointmentId,
    handleStatusChange,
    deleteAppointment
  } = useAppointments();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    isBulk: false,
    targetId: null,
    clientName: ''
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / pageSize);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page & selections when filters change
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [filterConfig]);

  // Bulk selection handlers
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedAppointments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedAppointments.map(a => a.id));
    }
  };

  // Status updates
  const handleBulkStatusChange = (newStatus) => {
    selectedIds.forEach(id => {
      handleStatusChange(id, newStatus);
    });
    setSelectedIds([]);
  };

  // Deletions
  const handleDeleteClick = (id) => {
    const appt = filteredAppointments.find(a => a.id === id);
    setConfirmModal({
      isOpen: true,
      isBulk: false,
      targetId: id,
      clientName: appt ? appt.clientName : 'this appointment'
    });
  };

  const handleBulkDeleteClick = () => {
    setConfirmModal({
      isOpen: true,
      isBulk: true,
      targetId: null,
      clientName: ''
    });
  };

  const handleConfirmDelete = () => {
    if (confirmModal.isBulk) {
      const count = selectedIds.length;
      selectedIds.forEach(id => deleteAppointment(id));
      setSelectedIds([]);
      setToast({ message: `${count} appointment(s) deleted.`, type: 'success' });
    } else if (confirmModal.targetId) {
      deleteAppointment(confirmModal.targetId);
      if (selectedIds.includes(confirmModal.targetId)) {
        setSelectedIds(prev => prev.filter(id => id !== confirmModal.targetId));
      }
      setToast({ message: `Appointment for "${confirmModal.clientName}" deleted.`, type: 'success' });
    }
    setConfirmModal({ isOpen: false, isBulk: false, targetId: null, clientName: '' });
  };

  return (
    <DashboardLayout 
      title="Appointments" 
      subtitle="View, manage, and approve or reject appointment bookings"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="page-head mb-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="page-title-wrap">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--burgundy)] mb-3">Appointments</h1>
            <p className="text-sm text-[var(--ink-light)] font-medium">
              Manage appointment bookings, approvals, and scheduling.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="/dashboard/appointments/manage" className="secondary-btn" style={{ textDecoration: 'none' }}>
              <Icons.calendar style={{ width: '16px', height: '16px' }} />
              Manage Schedule
            </a>
          </div>
        </div>

        <AppointmentFilters 
          filterConfig={filterConfig}
          setFilterConfig={setFilterConfig}
        />

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-[var(--cream-light)] p-4 rounded-lg border border-[var(--gold)] mb-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="text-xs text-[var(--ink-mid)] font-bold">
              {selectedIds.length} appointments selected
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleBulkStatusChange('Approved')}
                className="secondary-btn"
                style={{ borderColor: 'var(--green)', color: 'var(--green)', padding: '6px 12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Icons.check style={{ width: '14px', height: '14px' }} />
                Approve Selected
              </button>
              <button 
                onClick={() => handleBulkStatusChange('Rejected')}
                className="secondary-btn"
                style={{ borderColor: 'var(--red)', color: 'var(--red)', padding: '6px 12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Icons.close style={{ width: '14px', height: '14px' }} />
                Reject Selected
              </button>
              <button 
                onClick={handleBulkDeleteClick}
                className="primary-btn bg-[var(--red)] border-[var(--red)] text-white"
                style={{ padding: '6px 12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Icons.trash style={{ width: '14px', height: '14px' }} />
                Delete Selected
              </button>
            </div>
          </div>
        )}

        <div className="relative">
          {viewMode === 'list' ? (
            <>
              <AppointmentTable 
                appointments={paginatedAppointments} 
                onSelectAppointment={setSelectedAppointmentId}
                selectedAppointmentId={selectedAppointmentId}
                onStatusChange={handleStatusChange}
                onToggleView={setViewMode}
                onDeleteAppointment={handleDeleteClick}
                selectedIds={selectedIds}
                onSelectAll={handleSelectAll}
                onToggleSelect={handleToggleSelect}
              />
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredAppointments.length}
                pageSize={pageSize}
              />
            </>
          ) : (
            <AppointmentCalendar 
              events={calendarEvents} 
              onSelectAppointment={setSelectedAppointmentId}
              selectedAppointmentId={selectedAppointmentId}
            />
          )}
        </div>

        <AppointmentReviewPanel 
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointmentId(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteClick}
        />

        <ConfirmationModal 
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          onConfirm={handleConfirmDelete}
          title={confirmModal.isBulk ? "Delete Multiple Appointments" : "Delete Appointment"}
          message={confirmModal.isBulk 
            ? `Are you sure you want to permanently delete the ${selectedIds.length} selected appointments? This action cannot be undone.`
            : `Are you sure you want to delete the appointment request for "${confirmModal.clientName}"? This action cannot be undone.`
          }
          confirmText={confirmModal.isBulk ? `Delete ${selectedIds.length} Appointments` : "Delete Appointment"}
          type="danger"
        />
      </div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
    </DashboardLayout>
  );
}
