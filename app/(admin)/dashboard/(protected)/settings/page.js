'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTheme } from '@/hooks/useTheme';

export default function SettingsPage() {
  const { theme, changeTheme } = useTheme();

  return (
    <DashboardLayout title="System Settings" subtitle="Configure CMS preferences and global settings">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>System Settings</h1>
          <p>Global preferences, integrations, and security settings.</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        {/* Appearance Section */}
        <div className="bg-[var(--white)] border border-[var(--stone-dark)] rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[var(--stone-dark)] bg-[var(--cream-light)]">
            <h3 className="text-sm font-bold text-[var(--burgundy)]">Appearance</h3>
            <p className="text-[11px] text-[var(--ink-mid)]">Choose how Pieach CMS looks on your device.</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Architectural Theme (Default) */}
              <button 
                onClick={() => changeTheme('architectural')}
                className={`flex flex-col text-left rounded-xl border-2 transition-all overflow-hidden ${
                  theme === 'architectural' ? 'border-[var(--gold)] ring-2 ring-[var(--gold-light)]' : 'border-[var(--stone-dark)] hover:border-[var(--ink-light)]'
                }`}
              >
                <div className="h-24 bg-[#FAF7F2] p-4 flex gap-2">
                  <div className="w-8 h-full bg-[#1C1A18] rounded"></div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-[#D5A73F] rounded w-1/2"></div>
                    <div className="h-2 bg-[#32171B] rounded w-3/4"></div>
                  </div>
                </div>
                <div className="p-4 bg-[var(--white)]">
                  <span className="block text-xs font-bold text-[var(--ink)]">Architectural Studio</span>
                  <span className="block text-[10px] text-[var(--ink-mid)] mt-1">Burgundy & Gold (Default)</span>
                </div>
              </button>

              {/* Classic Light Theme */}
              <button 
                onClick={() => changeTheme('light')}
                className={`flex flex-col text-left rounded-xl border-2 transition-all overflow-hidden ${
                  theme === 'light' ? 'border-[var(--gold)] ring-2 ring-[var(--gold-light)]' : 'border-[var(--stone-dark)] hover:border-[var(--ink-light)]'
                }`}
              >
                <div className="h-24 bg-[#FDFDFD] p-4 flex gap-2">
                  <div className="w-8 h-full bg-[#FFFFFF] border border-[#EAEAEA] rounded"></div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-[#A67C52] rounded w-1/2"></div>
                    <div className="h-2 bg-[#1A1A1A] rounded w-3/4"></div>
                  </div>
                </div>
                <div className="p-4 bg-[var(--white)]">
                  <span className="block text-xs font-bold text-[var(--ink)]">Classic Light</span>
                  <span className="block text-[10px] text-[var(--ink-mid)] mt-1">High contrast day mode</span>
                </div>
              </button>

              {/* Modern Dark Theme */}
              <button 
                onClick={() => changeTheme('dark')}
                className={`flex flex-col text-left rounded-xl border-2 transition-all overflow-hidden ${
                  theme === 'dark' ? 'border-[var(--gold)] ring-2 ring-[var(--gold-light)]' : 'border-[var(--stone-dark)] hover:border-[var(--ink-light)]'
                }`}
              >
                <div className="h-24 bg-[#111827] p-4 flex gap-2">
                  <div className="w-8 h-full bg-[#0F172A] rounded"></div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-[#F59E0B] rounded w-1/2"></div>
                    <div className="h-2 bg-[#F9FAFB] rounded w-3/4"></div>
                  </div>
                </div>
                <div className="p-4 bg-[var(--white)]">
                  <span className="block text-xs font-bold text-[var(--ink)]">Modern Dark</span>
                  <span className="block text-[10px] text-[var(--ink-mid)] mt-1">Deep blue night mode</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--white)] border border-[var(--stone-dark)] rounded-xl p-6 text-center">
          <p className="text-[11px] text-[var(--ink-mid)]">More system settings (Security, Users, Email) will be available in future updates.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
