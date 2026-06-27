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
    handleStatusChange
  } = useAppointments();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / pageSize);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterConfig]);

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

        <div className="relative">
          {viewMode === 'list' ? (
            <>
              <AppointmentTable 
                appointments={paginatedAppointments} 
                onSelectAppointment={setSelectedAppointmentId}
                selectedAppointmentId={selectedAppointmentId}
                onStatusChange={handleStatusChange}
                onToggleView={setViewMode}
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
        />
      </div>
    </DashboardLayout>
  );
}
