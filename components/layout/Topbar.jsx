'use client';

import React from 'react';
import { Icons } from '@/components/shared/Icons';

export default function Topbar({ title = 'Dashboard', subtitle = "Welcome back — here's what needs your attention" }) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="topbar">
      {title && <span className="topbar-title">{title}</span>}
      {title && subtitle && <div className="topbar-sep"></div>}
      {!title && subtitle && <span className="text-[#9A8C82] text-[10px] mr-2 opacity-50">|</span>}
      <span className="topbar-sub">{subtitle}</span>
      
      <div className="topbar-right">
        <span className="topbar-date">{currentDate}</span>
        <button className="icon-btn">
          <Icons.notification />
          <div className="notif-dot"></div>
        </button>
      </div>
    </div>
  );
}
