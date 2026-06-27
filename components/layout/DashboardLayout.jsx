'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children, title, subtitle }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar title={title} subtitle={subtitle} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}
