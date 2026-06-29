'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useStore } from '@/hooks/useStore';
import { appointmentsStore } from '@/lib/store';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import AppointmentDayPanel from '@/components/appointments/AppointmentDayPanel';
import AppointmentReviewPanel from '@/components/appointments/AppointmentReviewPanel';
import { format, isSameDay } from 'date-fns';
import { sendApprovalEmail } from '@/utils/emailHelpers';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

export default function CalendarPage() {
  const { data: appointments, updateItem, deleteItem } = useStore(appointmentsStore);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, targetId: null, clientName: "" });

  // Timezone-agnostic local date parser
  const parseLocalDate = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);
  };

  // Find unique, sorted booked appointment dates
  const bookedDatesSorted = useMemo(() => {
    const dates = appointments
      .map(appt => parseLocalDate(appt.preferredDate))
      .filter(Boolean);
    const validDates = dates.filter(d => !isNaN(d.getTime()));
    const uniqueTimeStrings = Array.from(new Set(validDates.map(d => d.getTime())));
    return uniqueTimeStrings.map(t => new Date(t)).sort((a, b) => a - b);
  }, [appointments]);

  const goToPrevAppointment = () => {
    const current = new Date(selectedDate);
    current.setHours(0,0,0,0);
    const prevDate = bookedDatesSorted
      .slice()
      .reverse()
      .find(d => d < current);
      
    if (prevDate) {
      setSelectedDate(prevDate);
      setCalendarDate(prevDate);
    } else {
      alert('No previous booked appointments found.');
    }
  };

  const goToNextAppointment = () => {
    const current = new Date(selectedDate);
    current.setHours(0,0,0,0);
    const nextDate = bookedDatesSorted.find(d => d > current);
      
    if (nextDate) {
      setSelectedDate(nextDate);
      setCalendarDate(nextDate);
    } else {
      alert('No next booked appointments found.');
    }
  };

  // Transform appointments for the calendar component
  const events = useMemo(() => {
    return appointments.map(appt => {
      const date = new Date(appt.preferredDate);
      // Construct start/end time for calendar display
      const [hours, minutesPart] = appt.preferredTime.split(':');
      const [minutes, ampm] = minutesPart.split(' ');
      let h = parseInt(hours);
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      
      const start = new Date(date);
      start.setHours(h, parseInt(minutes));
      
      const end = new Date(start);
      end.setHours(start.getHours() + 1);

      return {
        id: appt.id,
        title: appt.clientName,
        start,
        end,
        resource: { status: appt.status }
      };
    });
  }, [appointments]);

  // Filter appointments for the selected day panel
  const dayAppointments = useMemo(() => {
    return appointments.filter(appt => isSameDay(new Date(appt.preferredDate), selectedDate));
  }, [appointments, selectedDate]);

  const handleNavigate = (newDate) => {
    setCalendarDate(newDate);
  };

  const handleViewChange = (newView) => {
    setCalendarView(newView);
  };

  const handleSelectSlot = (date) => {
    setSelectedDate(date);
    setCalendarDate(date); // Keep calendar in sync when selecting a day
  };

  const handleStatusChange = (id, newStatus, additionalData = {}) => {
    const appt = appointments.find(a => a.id === id);
    const updatePayload = { 
      status: newStatus,
      updatedAt: new Date().toISOString(),
      ...additionalData
    };
    updateItem(id, updatePayload);
    
    if (newStatus === 'Approved' && appt) {
      sendApprovalEmail({ ...appt, ...updatePayload });
    }
    
    // If the currently reviewed appointment was updated, close the review panel
    if (selectedAppt && selectedAppt.id === id) {
      setSelectedAppt(null);
    }
  };

  const handleDeleteAppointmentClick = (id) => {
    const appt = appointments.find(a => a.id === id);
    setConfirmModal({
      isOpen: true,
      targetId: id,
      clientName: appt ? appt.clientName : 'this appointment'
    });
  };

  const handleConfirmDelete = () => {
    if (confirmModal.targetId) {
      deleteItem(confirmModal.targetId);
      if (selectedAppt && selectedAppt.id === confirmModal.targetId) {
        setSelectedAppt(null);
      }
    }
    setConfirmModal({ isOpen: false, targetId: null, clientName: "" });
  };

  return (
    <DashboardLayout title="Calendar View" subtitle="Review appointments by date, status, and schedule availability">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-white rounded-t border border-[rgba(0,0,0,0.05)] border-b-0 p-4 flex justify-between items-center">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <h2 className="text-[11px] uppercase tracking-widest font-bold text-[var(--ink-light)]">Calendar View</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--stone)', paddingLeft: '14px' }}>
                <button 
                  onClick={goToPrevAppointment}
                  className="secondary-btn"
                  style={{ padding: '4px 8px', fontSize: '10px', height: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
                  title="Jump to Previous Booked Appointment Date"
                >
                  &larr; Prev Booked
                </button>
                <button 
                  onClick={goToNextAppointment}
                  className="secondary-btn"
                  style={{ padding: '4px 8px', fontSize: '10px', height: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
                  title="Jump to Next Booked Appointment Date"
                >
                  Next Booked &rarr;
                </button>
              </div>
            </div>
            <div 
              className="text-[11px] text-[var(--gold)] font-bold cursor-pointer hover:underline"
              onClick={() => window.location.href = '/dashboard/appointments'}
            >
              List view &rarr;
            </div>
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.05)]">
            <AppointmentCalendar 
              events={events}
              onSelectAppointment={(id) => setSelectedAppt(appointments.find(a => a.id === id))}
              onSelectDay={handleSelectSlot}
              selectedDate={selectedDate}
              date={calendarDate}
              onNavigate={handleNavigate}
              view={calendarView}
              onView={handleViewChange}
              selectedAppointmentId={selectedAppt?.id}
            />
          </div>
        </div>

        {/* Side Panel: Selected Day Schedule */}
        <div className="w-full lg:w-[400px]">
          <AppointmentDayPanel 
            selectedDate={selectedDate}
            appointments={dayAppointments}
            onViewAppointment={setSelectedAppt}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      {/* Detail Review Panel (Drawer) */}
      <AppointmentReviewPanel 
        appointment={selectedAppt}
        onClose={() => setSelectedAppt(null)}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteAppointmentClick}
      />

      <ConfirmationModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Delete Appointment"
        message={`Are you sure you want to delete the appointment request for "${confirmModal.clientName}"? This action cannot be undone.`}
        confirmText="Delete Appointment"
        type="danger"
      />
    </DashboardLayout>
  );
}
