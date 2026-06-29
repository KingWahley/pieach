import { useState, useMemo } from 'react';
import { useStore } from '@/hooks/useStore';
import { appointmentsStore } from '@/lib/store';
import { filterAppointments, calculateKPIs, convertToCalendarEvents } from '@/utils/appointmentHelpers';
import { sendApprovalEmail } from '@/utils/emailHelpers';

export function useAppointments() {
  const { data: appointments, updateItem, deleteItem } = useStore(appointmentsStore);
  
  const [filterConfig, setFilterConfig] = useState({
    status: 'All',
    search: ''
  });
  
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const filteredAppointments = useMemo(() => {
    return filterAppointments(appointments, filterConfig);
  }, [appointments, filterConfig]);

  const calendarEvents = useMemo(() => {
    return convertToCalendarEvents(filteredAppointments);
  }, [filteredAppointments]);

  const kpis = useMemo(() => {
    return calculateKPIs(appointments);
  }, [appointments]);

  const selectedAppointment = useMemo(() => {
    return appointments.find(a => a.id === selectedAppointmentId) || null;
  }, [appointments, selectedAppointmentId]);

  const handleStatusChange = (id, newStatus, extraData = {}) => {
    const updatePayload = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      ...extraData
    };

    if (newStatus === 'Approved') {
      updatePayload.approvedBy = 'Admin User'; // Mock user
      updatePayload.approvedAt = new Date().toISOString();
    } else if (newStatus === 'Rejected') {
      updatePayload.rejectedBy = 'Admin User';
    }

    const appt = appointments.find(a => a.id === id);
    updateItem(id, updatePayload);

    if (newStatus === 'Approved' && appt) {
      sendApprovalEmail({ ...appt, ...updatePayload });
    }
  };

  const deleteAppointment = (id) => {
    deleteItem(id);
    if (selectedAppointmentId === id) {
      setSelectedAppointmentId(null);
    }
  };

  return {
    appointments,
    filteredAppointments,
    calendarEvents,
    kpis,
    filterConfig,
    setFilterConfig,
    viewMode,
    setViewMode,
    selectedAppointment,
    selectedAppointmentId,
    setSelectedAppointmentId,
    handleStatusChange,
    deleteAppointment,
  };
}
