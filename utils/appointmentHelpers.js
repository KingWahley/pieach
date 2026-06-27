import { format, parseISO, isToday, isThisWeek, isThisMonth, isFuture } from 'date-fns';
import { APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';

export const formatAppointmentDate = (dateString) => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch (e) {
    return dateString;
  }
};

export const filterAppointments = (appointments, filterConfig) => {
  const { status, search } = filterConfig;
  
  return appointments.filter(apt => {
    // Status filter
    if (status !== 'All' && apt.status !== status) return false;
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      const matchClient = apt.clientName?.toLowerCase().includes(searchLower);
      const matchEmail = apt.email?.toLowerCase().includes(searchLower);
      const matchService = apt.service?.toLowerCase().includes(searchLower);
      if (!matchClient && !matchEmail && !matchService) return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by preferred date (closest first)
    const dateA = new Date(a.preferredDate);
    const dateB = new Date(b.preferredDate);
    return dateA - dateB;
  });
};

export const calculateKPIs = (appointments) => {
  return {
    pending: appointments.filter(a => a.status === APPOINTMENT_STATUSES.PENDING).length,
    approvedToday: appointments.filter(a => {
      try {
        return a.status === APPOINTMENT_STATUSES.APPROVED && isToday(parseISO(a.preferredDate));
      } catch (e) { return false; }
    }).length,
    upcomingThisWeek: appointments.filter(a => {
      try {
        return [APPOINTMENT_STATUSES.APPROVED, APPOINTMENT_STATUSES.RESCHEDULED].includes(a.status) 
          && isThisWeek(parseISO(a.preferredDate)) 
          && isFuture(parseISO(a.preferredDate));
      } catch (e) { return false; }
    }).length,
    rejectedThisMonth: appointments.filter(a => {
      try {
        return a.status === APPOINTMENT_STATUSES.REJECTED && isThisMonth(parseISO(a.updatedAt));
      } catch(e) { return false; }
    }).length,
    totalBookings: appointments.length
  };
};

export const convertToCalendarEvents = (appointments) => {
  return appointments.map(apt => {
    let startDate = new Date();
    let endDate = new Date();
    
    try {
      const [timeStr, ampm] = apt.preferredTime.split(' ');
      const [hoursStr, minutesStr] = timeStr.split(':');
      let hour24 = parseInt(hoursStr, 10);
      if (ampm === 'PM' && hour24 < 12) hour24 += 12;
      if (ampm === 'AM' && hour24 === 12) hour24 = 0;
      
      startDate = parseISO(apt.preferredDate);
      startDate.setHours(hour24, parseInt(minutesStr, 10), 0, 0);
      
      endDate = new Date(startDate.getTime());
      endDate.setHours(startDate.getHours() + 1); // Default 1 hour duration
    } catch (e) {
      console.warn('Error parsing date/time for appointment', apt);
    }

    return {
      id: apt.id,
      title: `${apt.clientName} - ${apt.service}`,
      start: startDate,
      end: endDate,
      resource: apt
    };
  });
};
