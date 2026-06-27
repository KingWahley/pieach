'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BookingRulesCard from '@/components/appointments/manage-calendar/BookingRulesCard';
import DaySelector from '@/components/appointments/manage-calendar/DaySelector';
import TimeConfigurationPanel from '@/components/appointments/manage-calendar/TimeConfigurationPanel';
import AvailabilityPreview from '@/components/appointments/manage-calendar/AvailabilityPreview';
import { useStore } from '@/hooks/useStore';
import { calendarSettingsStore } from '@/lib/store';

export default function ManageCalendarPage() {
  const { data: settings, updateSettings, saveSettings } = useStore(calendarSettingsStore);

  const handleSave = () => {
    saveSettings();
    alert('Calendar settings saved successfully!');
  };

  return (
    <DashboardLayout 
      title="Manage Calendar" 
      subtitle="Configure availability, working hours, and block out dates"
    >
      <div className="manage-calendar-wrap">
        {/* TOP SECTION: GLOBAL RULES */}
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">General Booking Rules</h3>
          </div>
          <div className="settings-grid">
            <BookingRulesCard settings={settings} onUpdate={updateSettings} />
          </div>
        </div>

        {/* MIDDLE SECTION: WORKING DAYS & HOURS */}
        <div className="card">
          <div className="card-head">
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

        {/* BOTTOM SECTION: PREVIEW */}
        <div className="card">
          <div className="card-head">
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
