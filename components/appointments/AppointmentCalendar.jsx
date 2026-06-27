'use client';

import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { STATUS_COLORS, APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AppointmentCalendar({ 
  events, 
  onSelectAppointment, 
  onSelectDay,
  selectedDate,
  selectedAppointmentId,
  date,
  onNavigate,
  view,
  onView
}) {
  const eventStyleGetter = (event) => {
    const status = event.resource.status || APPOINTMENT_STATUSES.PENDING;
    const isSelected = event.id === selectedAppointmentId;
    const colorData = STATUS_COLORS[status] || STATUS_COLORS[APPOINTMENT_STATUSES.PENDING];

    return {
      style: {
        backgroundColor: colorData.bg,
        color: colorData.text,
        border: `1px solid ${colorData.dot}`,
        borderLeft: `3px solid ${colorData.dot}`,
        borderRadius: '3px',
        fontSize: '10px',
        fontWeight: 'bold',
        padding: '2px 6px',
        display: 'block',
        opacity: 1,
        marginBottom: '2px',
        boxShadow: isSelected ? `0 0 0 2px var(--white), 0 0 0 4px ${colorData.dot}` : 'none'
      }
    };
  };

  const dayPropGetter = (date) => {
    const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    if (isSelected) {
      return {
        className: 'rbc-selected-day',
        style: {
          border: '2px solid var(--burgundy)',
          zIndex: 10
        }
      };
    }
    return {};
  };

  return (
    <div className="bg-white rounded border border-[rgba(0,0,0,0.05)] shadow-sm p-2 h-[700px] appointment-calendar">
      <style dangerouslySetInnerHTML={{__html: `
        .appointment-calendar .rbc-calendar { font-family: 'Inter', sans-serif; }
        .appointment-calendar .rbc-header { 
          padding: 15px 0; 
          font-size: 10px; 
          font-weight: 800; 
          color: var(--ink-light); 
          text-transform: uppercase; 
          letter-spacing: 0.1em;
          border-bottom: 1px solid rgba(0,0,0,0.05); 
        }
        .appointment-calendar .rbc-month-view { border: none; }
        .appointment-calendar .rbc-month-row { border: 1px solid rgba(0,0,0,0.05); border-top: none; }
        .appointment-calendar .rbc-day-bg { border-left: 1px solid rgba(0,0,0,0.05); }
        .appointment-calendar .rbc-day-bg:first-child { border-left: none; }
        .appointment-calendar .rbc-date-cell { 
          padding: 8px; 
          font-size: 13px; 
          font-weight: 800; 
          color: var(--ink-mid);
          text-align: left;
        }
        .appointment-calendar .rbc-off-range-bg { background-color: transparent; opacity: 0.3; }
        .appointment-calendar .rbc-today { background-color: rgba(213,167,63,0.05); }
        .appointment-calendar .rbc-event { background: none; border: none; padding: 0 4px; }
        .appointment-calendar .rbc-show-more { 
          font-size: 10px; 
          font-weight: bold; 
          color: var(--gold); 
          background: transparent;
        }
        .appointment-calendar .rbc-toolbar { margin-bottom: 20px; }
        .appointment-calendar .rbc-toolbar button { 
          color: var(--ink-mid); 
          border: 1px solid var(--stone-dark); 
          font-size: 11px; 
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 4px;
        }
        .appointment-calendar .rbc-toolbar button:active, 
        .appointment-calendar .rbc-toolbar button.rbc-active { 
          background-color: var(--burgundy); 
          color: white; 
          box-shadow: none; 
        }
        .appointment-calendar .rbc-selected-day {
          background-color: rgba(66, 12, 12, 0.02) !important;
        }
      `}} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={onView}
        date={date}
        onNavigate={onNavigate}
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.AGENDA]}
        onSelectEvent={(event) => onSelectAppointment(event.id)}
        onSelectSlot={(slotInfo) => onSelectDay && onSelectDay(slotInfo.start)}
        selectable
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        components={{
          event: ({ event }) => (
            <div className="flex items-center gap-1">
              <span className="opacity-60">{format(event.start, 'H:mm')}</span>
              <span className="truncate">{event.title}</span>
            </div>
          )
        }}
      />
    </div>
  );
}
