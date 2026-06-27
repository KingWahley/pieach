'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';

import { useStore } from '@/hooks/useStore';
import { 
  projectsStore, 
  messagesStore, 
  jobApplicationsStore, 
  vacanciesStore, 
  appointmentsStore 
} from '@/lib/store';

export default function DashboardPage() {
  const { data: projects } = useStore(projectsStore);
  const { data: messages } = useStore(messagesStore);
  const { data: applications } = useStore(jobApplicationsStore);
  const { data: vacancies } = useStore(vacanciesStore);
  const { data: appointments } = useStore(appointmentsStore);

  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // Default to May 2026

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Monday=0
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const formatDateString = (year, month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';
  };

  const getStatusClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'new': 
      case 'unread': return 's-new';
      case 'opened':
      case 'read': return 's-opened';
      case 'shortlisted': return 's-shortlisted';
      case 'interview': return 's-pending';
      case 'rejected': return 's-rejected';
      case 'pending': return 's-pending';
      case 'approved': 
      case 'confirmed': return 's-approved';
      default: return '';
    }
  };

  // KPIs
  const ongoingProjects = projects.filter(p => p.status === 'Ongoing').length;
  const onHoldProjects = projects.filter(p => p.status === 'On Hold').length;
  const activeVacancies = vacancies.filter(v => v.status === 'published').length;
  const unreadMessages = messages.filter(m => m.status === 'unread').length;
  const readMessages = messages.filter(m => m.status === 'read').length;
  const shortlistedApps = applications.filter(a => a.status === 'shortlisted').length;
  const newApps = applications.filter(a => a.status === 'new').length;
  const draftVacancies = vacancies.filter(v => v.status === 'draft').length;
  const pendingAppointments = appointments.filter(a => a.status === 'Pending').length;

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back — here's what needs your attention">
      {/* KPI ROW */}
      <div className="kpi-row">
        <Link href="/dashboard/projects" className="kpi-card" style={{ textDecoration: 'none', minHeight: '100px' }}>
          <div className="kpi-value">{projects.length}</div>
          <div className="kpi-label">Projects</div>
          <div className="kpi-sub">{ongoingProjects} ongoing · {onHoldProjects} on hold</div>
        </Link>
        <Link href="/dashboard/vacancies" className="kpi-card" style={{ textDecoration: 'none', minHeight: '100px' }}>
          <div className="kpi-value">{activeVacancies}</div>
          <div className="kpi-label">Active Vacancies</div>
          <div className="kpi-sub">{activeVacancies} published · {draftVacancies} drafts</div>
        </Link>
        <Link href="/dashboard/messages" className="kpi-card" style={{ textDecoration: 'none', minHeight: '100px' }}>
          <div className="kpi-value">{messages.length}</div>
          <div className="kpi-label">Messages</div>
          <div className="kpi-sub">{unreadMessages} unread · {readMessages} read</div>
        </Link>
        <Link href="/dashboard/job-applications" className="kpi-card" style={{ textDecoration: 'none', minHeight: '100px' }}>
          <div className="kpi-value">{applications.length}</div>
          <div className="kpi-label">Job Applications</div>
          <div className="kpi-sub">{shortlistedApps} shortlisted · {newApps} new</div>
        </Link>
        <Link href="/dashboard/appointments" className="kpi-card" style={{ textDecoration: 'none', minHeight: '100px' }}>
          <div className="kpi-value">{appointments.length}</div>
          <div className="kpi-label">Appointments</div>
          <div className="kpi-sub">{pendingAppointments} pending approval</div>
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="main-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Quick Actions</span>
          </div>
          <div className="qa-grid">
            <Link href="/dashboard/projects/new" className="qa-btn" style={{ textDecoration: 'none' }}>
              <div className="qa-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="#D5A73F" strokeWidth="1.4" />
                  <path d="M5 8h6M8 5v6" stroke="#D5A73F" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="qa-label">New Project</div>
                <div className="qa-sub">Add to portfolio</div>
              </div>
            </Link>
            <Link href="/dashboard/vacancies/new" className="qa-btn" style={{ textDecoration: 'none' }}>
              <div className="qa-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="#D5A73F" strokeWidth="1.4" />
                  <path d="M8 8v2M7 9h2" stroke="#D5A73F" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="qa-label">New Vacancy</div>
                <div className="qa-sub">Post a job opening</div>
              </div>
            </Link>
            <Link href="/dashboard/blog/new" className="qa-btn" style={{ textDecoration: 'none' }}>
              <div className="qa-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10v12l-5-3-5 3V2z" stroke="#D5A73F" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="qa-label">New Blog Post</div>
                <div className="qa-sub">Write &amp; publish</div>
              </div>
            </Link>
            <Link href="/dashboard/team/new" className="qa-btn" style={{ textDecoration: 'none' }}>
              <div className="qa-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="6" cy="5" r="2.5" stroke="#D5A73F" strokeWidth="1.4" />
                  <path d="M1 13c0-2.761 2.239-4 5-4" stroke="#D5A73F" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M11 9v4M9 11h4" stroke="#D5A73F" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="qa-label">New Team Member</div>
                <div className="qa-sub">Add to the team</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Messages</span>
            <Link href="/dashboard/messages" className="card-action">View all →</Link>
          </div>
          <div>
            {messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className={`msg-item ${msg.status === 'unread' ? 'unread' : 'read'}`}>
                <div className="msg-avatar">{getInitials(`${msg.firstName} ${msg.lastName}`)}</div>
                <div className="msg-info">
                  <div className="msg-sender">{msg.firstName} {msg.lastName}</div>
                  <div className="msg-title">{msg.subject}</div>
                </div>
                <div>
                  <div className="msg-date">{formatDisplayDate(msg.date)}</div>
                  <div style={{ textAlign: 'right', marginTop: '4px' }}>
                    <span className={`status-pill ${getStatusClass(msg.status)}`}>{msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}</span>
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-light)' }}>
                No recent messages
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="bottom-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Appointments Calendar</span>
            <Link href="/dashboard/appointments/calendar" className="card-action">Full calendar →</Link>
          </div>
          <div className="calendar-wrap">
            <div className="cal-header">
              <span className="cal-month">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              <div className="cal-nav">
                <button className="cal-nav-btn" onClick={prevMonth}>&#8249;</button>
                <button className="cal-nav-btn" onClick={nextMonth}>&#8250;</button>
              </div>
            </div>
            <div className="cal-grid">
              <div className="cal-day-label">Mo</div>
              <div className="cal-day-label">Tu</div>
              <div className="cal-day-label">We</div>
              <div className="cal-day-label">Th</div>
              <div className="cal-day-label">Fr</div>
              <div className="cal-day-label">Sa</div>
              <div className="cal-day-label">Su</div>
              
              {/* Empty days before 1st */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="cal-day empty"></div>
              ))}
              
              {/* Actual days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDateString(currentDate.getFullYear(), currentDate.getMonth(), day);
                const hasAppt = appointments.some(a => (a.preferredDate || a.date) === dateStr);
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                
                return (
                  <div 
                    key={`day-${day}`} 
                    className={`cal-day ${hasAppt ? 'has-appt' : ''} ${isToday ? 'today' : ''}`}
                    title={hasAppt ? 'Has appointments' : ''}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            
            <div className="appt-list">
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Upcoming
              </div>
              
              {appointments.slice(0, 2).map((appt) => {
                const apptDate = new Date(appt.preferredDate || appt.date || new Date());
                const day = apptDate.getDate();
                const monthName = monthNames[apptDate.getMonth()];
                const month = monthName ? monthName.substring(0, 3).toUpperCase() : '';
                
                return (
                  <div key={appt.id} className="appt-item">
                    <div className="appt-time-badge">{day} {month}<br />{appt.preferredTime || appt.time}</div>
                    <div className="appt-info">
                      <div className="appt-name">{appt.clientName || appt.client || appt.title || 'Unknown'}</div>
                      <div className="appt-type">{appt.service || appt.type || 'Appointment'}</div>
                    </div>
                    <span className={`status-pill ${getStatusClass(appt.status)}`}>{appt.status}</span>
                  </div>
                );
              })}
              
              {appointments.length === 0 && (
                <div style={{ padding: '10px 0', color: 'var(--ink-light)' }}>
                  No upcoming appointments
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Job Applications</span>
            <Link href="/dashboard/job-applications" className="card-action">View all {applications.length} →</Link>
          </div>
          <div>
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="app-item">
                <div className="app-avatar">{getInitials(app.applicantName)}</div>
                <div className="app-info">
                  <div className="app-name">{app.applicantName}</div>
                  <div className="app-role">{app.roleApplied}</div>
                </div>
                <div className="app-meta">
                  <div className="app-date">{formatDisplayDate(app.date)}</div>
                  <span className={`status-pill ${getStatusClass(app.status)}`} style={{ display: 'inline-block', marginTop: '3px' }}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
                {app.cvFileName && <span className="cv-tag">CV</span>}
              </div>
            ))}
            
            {applications.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-light)' }}>
                No recent applications
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
