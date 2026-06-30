'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useStore } from '@/hooks/useStore';
import { appointmentsStore } from '@/lib/store';
import { APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';
import AppointmentStatusBadge from '@/components/appointments/AppointmentStatusBadge';
import AppointmentReviewPanel from '@/components/appointments/AppointmentReviewPanel';
import { Icons } from '@/components/shared/Icons';
import { format, isToday, isSameWeek } from 'date-fns';
import Pagination from '@/components/shared/Pagination';
import { sendApprovalEmail } from '@/utils/emailHelpers';

export default function AppointmentApprovalsPage() {
  const { data: appointments, updateItem } = useStore(appointmentsStore);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Derived Statistics
  const stats = useMemo(() => {
    const pending = appointments.filter(a => a.status === APPOINTMENT_STATUSES.PENDING).length;
    const approvedToday = appointments.filter(a =>
      a.status === APPOINTMENT_STATUSES.APPROVED && a.updatedAt && isToday(new Date(a.updatedAt))
    ).length;
    const rejectedThisWeek = appointments.filter(a =>
      a.status === APPOINTMENT_STATUSES.REJECTED && a.updatedAt && isSameWeek(new Date(a.updatedAt), new Date())
    ).length;
    return { pending, approvedToday, rejectedThisWeek };
  }, [appointments]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appt => {
      const matchesSearch =
        appt.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.notes?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' ? true : appt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / pageSize);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedAppt = appointments.find(a => a.id === selectedId) || null;

  const handleStatusUpdate = (id, newStatus, extras = {}) => {
    const appt = appointments.find(a => a.id === id);
    const updatePayload = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      ...extras
    };
    updateItem(id, updatePayload);
    if (newStatus === 'Approved' && appt) {
      sendApprovalEmail({ ...appt, ...updatePayload });
    }
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <DashboardLayout title="Approval Requests" subtitle="Review pending appointment requests before they are confirmed">
      {/* Page header */}
      <div className="page-head">
        <div className="page-title-wrap">
          <h1 className="text-2xl font-bold text-[var(--burgundy)]">Approval Requests</h1>
          <p className="text-[11px] text-[var(--ink-light)]">
            Review pending appointment bookings and approve or reject them before they are confirmed.
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/dashboard/appointments/calendar'}
          className="primary-btn px-4 py-2 bg-[var(--burgundy)] text-white rounded-md font-bold text-sm"
        >
          View Calendar
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-[var(--stone-dark)] border-t-[3px] border-t-[var(--gold)] rounded-md p-4 shadow-sm">
          <div className="text-2xl font-bold text-[var(--burgundy)] leading-none">{stats.pending}</div>
          <div className="text-[10px] text-[var(--ink-light)] mt-1 uppercase tracking-wider font-bold">Pending Requests</div>
        </div>
        <div className="bg-white border border-[var(--stone-dark)] border-t-[3px] border-t-[var(--gold)] rounded-md p-4 shadow-sm">
          <div className="text-2xl font-bold text-[var(--burgundy)] leading-none">{stats.approvedToday}</div>
          <div className="text-[10px] text-[var(--ink-light)] mt-1 uppercase tracking-wider font-bold">Approved Today</div>
        </div>
        <div className="bg-white border border-[var(--stone-dark)] border-t-[3px] border-t-[var(--gold)] rounded-md p-4 shadow-sm">
          <div className="text-2xl font-bold text-[var(--burgundy)] leading-none">{stats.rejectedThisWeek}</div>
          <div className="text-[10px] text-[var(--ink-light)] mt-1 uppercase tracking-wider font-bold">Rejected This Week</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[var(--stone-dark)] rounded-lg p-3.5 mb-4 flex flex-wrap items-center gap-3">
        <div className="flex-1 max-w-[340px] flex items-center gap-2 border border-[var(--stone-dark)] rounded-md bg-white px-3 py-2">
          <Icons.search className="w-4 h-4 text-[var(--ink-light)]" />
          <input
            placeholder="Search by client name, email, or message"
            className="border-none outline-none flex-1 text-sm bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="border border-[var(--stone-dark)] rounded-md bg-[var(--cream)] px-3 py-2 text-xs font-medium text-[var(--ink-mid)]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Pending">Pending only</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="All">All requests</option>
        </select>
      </div>

      {/* Full-width table */}
      <div className="bg-white border border-[var(--stone-dark)] rounded-md shadow-sm overflow-hidden">
        <div className="px-4 py-3.5 border-b border-[var(--stone)] flex justify-between items-center bg-[var(--cream)]">
          <span className="text-[11px] font-bold text-[var(--burgundy)] uppercase tracking-wider">
            Pending Appointment Requests
          </span>
          <button className="text-[10px] text-[var(--gold-dark)] font-bold underline">Export requests →</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--cream-light)]">
                <th className="text-left p-4 text-[10px] uppercase tracking-widest text-[var(--burgundy)] border-b border-[var(--stone-dark)] font-bold">Client</th>
                <th className="text-left p-4 text-[10px] uppercase tracking-widest text-[var(--burgundy)] border-b border-[var(--stone-dark)] font-bold">Date &amp; Time</th>
                <th className="text-left p-4 text-[10px] uppercase tracking-widest text-[var(--burgundy)] border-b border-[var(--stone-dark)] font-bold">Request Message</th>
                <th className="text-left p-4 text-[10px] uppercase tracking-widest text-[var(--burgundy)] border-b border-[var(--stone-dark)] font-bold">Status</th>
                <th className="text-left p-4 text-[10px] uppercase tracking-widest text-[var(--burgundy)] border-b border-[var(--stone-dark)] font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAppointments.length > 0 ? (
                paginatedAppointments.map(appt => (
                  <tr
                    key={appt.id}
                    className={`hover:bg-[#FCFAF6] cursor-pointer border-b border-[var(--stone)] transition-colors ${selectedId === appt.id ? 'bg-[#FCFAF6]' : ''}`}
                    onClick={() => setSelectedId(appt.id)}
                  >
                    <td className="p-4">
                      <div className="text-[12px] font-bold text-[var(--ink)]">{appt.clientName}</div>
                      <div className="text-[10px] text-[var(--ink-light)] mt-1">
                        {appt.email}<br />{appt.phone}
                      </div>
                    </td>
                    <td className="p-4 text-[12px] text-[var(--ink-mid)] font-medium">
                      {format(new Date(appt.preferredDate), 'MMM d, yyyy')}<br />
                      <span className="text-[var(--gold-dark)]">{appt.preferredTime}</span>
                    </td>
                    <td className="p-4">
                      <div className="text-[11px] text-[var(--ink-mid)] leading-relaxed max-w-[340px] line-clamp-2">
                        {appt.message || appt.notes || 'No message provided.'}
                      </div>
                    </td>
                    <td className="p-4">
                      <AppointmentStatusBadge status={appt.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedId(appt.id)}
                          className={`w-7 h-7 flex items-center justify-center rounded border transition-all ${
                            selectedId === appt.id
                              ? 'bg-[var(--gold)] text-white border-[var(--gold)]'
                              : 'border-[var(--stone-dark)] text-[var(--ink-mid)] hover:bg-[var(--gold-light)] hover:text-[var(--burgundy)]'
                          }`}
                        >
                          <Icons.eye className="w-3.5 h-3.5" />
                        </button>
                        {appt.status === APPOINTMENT_STATUSES.PENDING && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(appt.id, APPOINTMENT_STATUSES.APPROVED)}
                              className="w-7 h-7 flex items-center justify-center rounded border border-[var(--stone-dark)] text-[var(--ink-mid)] hover:bg-[var(--green-light)] hover:text-[var(--green)] hover:border-[var(--green)] transition-all"
                            >
                              <Icons.check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appt.id, APPOINTMENT_STATUSES.REJECTED)}
                              className="w-7 h-7 flex items-center justify-center rounded border border-[var(--stone-dark)] text-[var(--ink-mid)] hover:bg-[var(--red-light)] hover:text-[var(--red)] hover:border-[var(--red)] transition-all"
                            >
                              <Icons.close className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-[var(--ink-light)] italic text-sm">
                    No requests found matching your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length > 0 && (
          <div className="px-4 py-3 border-t border-[var(--stone-dark)] bg-[var(--cream-light)]">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredAppointments.length}
              pageSize={pageSize}
            />
          </div>
        )}
      </div>

      {/* Animated slide-over review panel (fixed overlay) */}
      <AppointmentReviewPanel
        appointment={selectedAppt}
        onClose={() => setSelectedId(null)}
        onStatusChange={handleStatusUpdate}
      />
    </DashboardLayout>
  );
}
