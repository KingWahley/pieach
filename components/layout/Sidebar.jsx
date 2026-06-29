'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAV, CAREERS_NAV, SYSTEM_NAV } from '@/constants/navigation';
import { Icons } from '@/components/shared/Icons';
import Lenis from 'lenis';

import { useStore } from '@/hooks/useStore';
import { 
  projectsStore, 
  messagesStore, 
  jobApplicationsStore, 
  vacanciesStore, 
  appointmentsStore 
} from '@/lib/store';

export default function Sidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState({});
  const sidebarRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebar-collapsed');
      if (stored === 'true') {
        setIsCollapsed(true);
        document.body.classList.add('sidebar-collapsed');
      }
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebar-collapsed', String(next));
        if (next) {
          document.body.classList.add('sidebar-collapsed');
        } else {
          document.body.classList.remove('sidebar-collapsed');
        }
      }
      return next;
    });
  };

  useEffect(() => {
    if (!sidebarRef.current) return;

    const lenis = new Lenis({
      wrapper: sidebarRef.current,
      content: sidebarRef.current.querySelector('.sidebar-inner'),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { data: projects } = useStore(projectsStore);
  const { data: messages } = useStore(messagesStore);
  const { data: applications } = useStore(jobApplicationsStore);
  const { data: vacancies } = useStore(vacanciesStore);
  const { data: appointments } = useStore(appointmentsStore);

  const getDynamicBadge = (label, originalBadge) => {
    switch (label) {
      case 'Projects': return projects.length;
      case 'Messages': {
        const unread = messages.filter(m => m.status === 'unread').length;
        return unread > 0 ? unread : null;
      }
      case 'Job Applications': {
        const newApps = applications.filter(a => a.status === 'new').length;
        return newApps > 0 ? newApps : null;
      }
      case 'Vacancies': {
        const published = vacancies.filter(v => v.status === 'published').length;
        return published > 0 ? published : null;
      }
      case 'Appointments': {
        const pending = appointments.filter(a => a.status === 'Pending').length;
        return pending > 0 ? pending : null;
      }
      default: return originalBadge;
    }
  };

  const toggleGroup = (label, currentEffectiveState) => {
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !currentEffectiveState,
    }));
  };

  const renderNavGroup = (items, sectionLabel) => {
    return (
      <div className="sidebar-section">
        {sectionLabel && !isCollapsed && <div className="sidebar-label">{sectionLabel}</div>}
        {items.map((item) => {
          const Icon = Icons[item.icon];
          const isActive = pathname === item.href;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isSubmenuActive = hasSubmenu && item.submenu.some(sub => pathname === sub.href);
          const effectiveOpen = openGroups[item.label] ?? isSubmenuActive;

          if (hasSubmenu) {
            return (
              <div key={item.label} className={`nav-group ${effectiveOpen && !isCollapsed ? 'open' : ''}`}>
                <button
                  type="button"
                  className={`nav-item nav-parent ${isSubmenuActive ? 'active' : ''}`}
                  onClick={() => !isCollapsed && toggleGroup(item.label, effectiveOpen)}
                  aria-expanded={effectiveOpen && !isCollapsed}
                  title={isCollapsed ? item.label : undefined}
                >
                  {Icon && <Icon className="nav-icon" />}
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                  {getDynamicBadge(item.label, item.badge) && !isCollapsed && <span className="nav-badge">{getDynamicBadge(item.label, item.badge)}</span>}
                  {!isCollapsed && <span className="nav-chevron">⌄</span>}
                </button>
                {effectiveOpen && !isCollapsed && (
                  <div className="submenu" style={{ display: 'flex' }}>
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={`submenu-item ${pathname === sub.href ? 'active-sub' : ''}`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link 
              key={item.label} 
              href={item.href || '#'} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {Icon && <Icon className="nav-icon" />}
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
              {getDynamicBadge(item.label, item.badge) && !isCollapsed && <span className="nav-badge">{getDynamicBadge(item.label, item.badge)}</span>}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} data-lenis-prevent ref={sidebarRef}>
      <div className="sidebar-inner">
        <div className="sidebar-logo">
          <Link href="/dashboard" className="flex items-center gap-3" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <div className="logo-mark" style={{ background: 'transparent' }}>
              <img 
                src="/images/mainlogo2.png" 
                alt="Pieach Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} 
              />
            </div>
            {!isCollapsed && (
              <div>
                <div className="logo-name">Pieach</div>
                <div className="logo-sub">Admin CMS</div>
              </div>
            )}
          </Link>
          <button
            type="button"
            onClick={toggleCollapse}
            className="sidebar-toggle-btn"
            title={isCollapsed ? "Expand Sidebar" : "Minimize Sidebar"}
          >
            {isCollapsed ? <Icons.chevronRight className="w-4 h-4" /> : <Icons.chevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {renderNavGroup(MAIN_NAV, 'Main')}
        {renderNavGroup(CAREERS_NAV, 'Careers')}
        {renderNavGroup(SYSTEM_NAV, 'System')}

        <div className="sidebar-spacer"></div>

        <div className="sidebar-footer">
          <div className="avatar-circle">AD</div>
          {!isCollapsed && (
            <div>
              <div className="avatar-name">Admin</div>
              <div className="avatar-role">Super Admin</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
