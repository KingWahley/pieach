'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BookingRulesCard from '@/components/appointments/manage-calendar/BookingRulesCard';
import DaySelector from '@/components/appointments/manage-calendar/DaySelector';
import TimeConfigurationPanel from '@/components/appointments/manage-calendar/TimeConfigurationPanel';
import AvailabilityPreview from '@/components/appointments/manage-calendar/AvailabilityPreview';
import { useStore } from '@/hooks/useStore';
import { calendarSettingsStore } from '@/lib/store';

export default function ManageCalendarPage() {
  const { data: settings, updateSettings, saveSettings } = useStore(calendarSettingsStore);

  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [newBlockedReason, setNewBlockedReason] = useState('');

  const handleSave = () => {
    saveSettings();
    alert('Calendar settings saved successfully!');
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;
    const currentBlocked = settings.blockedDates || [];
    if (currentBlocked.some(item => (typeof item === 'string' ? item : item.date) === newBlockedDate)) {
      alert('This date is already blocked.');
      return;
    }
    const updated = [...currentBlocked, { date: newBlockedDate, reason: newBlockedReason }];
    updateSettings({ blockedDates: updated });
    setNewBlockedDate('');
    setNewBlockedReason('');
  };

  const handleRemoveBlockedDate = (dateStr) => {
    const currentBlocked = settings.blockedDates || [];
    const updated = currentBlocked.filter(item => (typeof item === 'string' ? item : item.date) !== dateStr);
    updateSettings({ blockedDates: updated });
  };

  return (
    <DashboardLayout 
      title="Manage Calendar" 
      subtitle="Configure availability, working hours, and block out dates"
    >
      <div className="manage-calendar-wrap">
        {/* TOP SECTION: GLOBAL RULES */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">General Booking Rules</h3>
          </div>
          <div className="settings-grid">
            <BookingRulesCard settings={settings} onUpdate={updateSettings} />
          </div>
        </div>

        {/* MIDDLE SECTION: WORKING DAYS & HOURS */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weekly Working Hours</h3>
          </div>
          
          <div className="day-choice-card">
            <label className="field-label">Which days of the week do you work? <span className="required">*</span></label>
            <DaySelector 
              selectedDays={settings.availableDays || []} 
              onUpdate={(days) => updateSettings({ availableDays: days })} 
            />
          </div>

          <TimeConfigurationPanel settings={settings} onUpdate={updateSettings} />
        </div>

        {/* BLOCKED DATES SECTION */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Block Out Specific Dates</h3>
          </div>
          <div style={{ padding: '20px' }}>
            <p style={{ fontSize: '12px', color: 'var(--ink-light)', marginBottom: '16px' }}>
              Add specific dates (such as holidays or vacation days) when you will be completely unavailable for appointments.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="field-label" style={{ marginBottom: 0 }}>Select Date</label>
                <input 
                  type="date" 
                  value={newBlockedDate} 
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid var(--stone-dark)', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: '200px' }}>
                <label className="field-label" style={{ marginBottom: 0 }}>Reason / Label (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Christmas Day, National Holiday" 
                  value={newBlockedReason} 
                  onChange={(e) => setNewBlockedReason(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid var(--stone-dark)', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>
              <button 
                type="button" 
                className="primary-btn" 
                onClick={handleAddBlockedDate}
                style={{ height: '37px', padding: '0 16px', background: 'var(--burgundy)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Block Date
              </button>
            </div>

            {/* Blocked Dates List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(!settings.blockedDates || settings.blockedDates.length === 0) ? (
                <div style={{ padding: '16px', border: '1px dashed var(--stone-dark)', borderRadius: '6px', textAlign: 'center', color: 'var(--ink-light)', fontSize: '12px' }}>
                  No dates are currently blocked out.
                </div>
              ) : (
                settings.blockedDates.map((item, idx) => {
                  const itemObj = typeof item === 'string' ? { date: item, reason: '' } : item;
                  return (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', border: '1px solid var(--stone)', borderRadius: '6px', background: 'var(--cream-light)' }}>
                      <div>
                        <span style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--ink)' }}>
                          {new Date(itemObj.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        {itemObj.reason && (
                          <span style={{ fontSize: '12px', color: 'var(--ink-light)', marginLeft: '12px' }}>
                            ({itemObj.reason})
                          </span>
                        )}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveBlockedDate(itemObj.date)}
                        style={{ border: 'none', background: 'none', color: 'var(--red)', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
                        title="Unblock Date"
                      >
                        ×
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: PREVIEW */}
        <div className="card availability-preview-card">
          <div className="card-header">
            <h3 className="card-title">Availability Preview</h3>
            <div className="card-head-actions">
              <button className="secondary-btn" onClick={() => window.print()}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{marginRight: '6px'}}>
                  <path d="M4 6V3h8v3M4 11H3a1 1 0 01-1-1V7a1 1 0 011-1h10a1 1 0 011 1v3a1 1 0 01-1 1h-1M12 11v2H4v-2m8-3v5H4V8h8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Export Schedule
              </button>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            <AvailabilityPreview settings={settings} />
          </div>
        </div>

        {/* FORM ACTIONS */}
        <div className="form-actions">
          <button className="secondary-btn" onClick={() => window.location.reload()}>Discard Changes</button>
          <button className="primary-btn" onClick={handleSave}>Save Calendar Settings</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
