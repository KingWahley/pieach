'use client';

import React, { useEffect } from 'react';
import { UnsavedChangesProvider } from '@/lib/unsavedChangesContext';
import { supabase } from '@/lib/supabase/client';

function syncAuthCookie(accessToken) {
  if (typeof window === 'undefined' || !accessToken) return;
  const isStayLoggedIn = document.cookie.includes('pieach_stay_logged_in=true');
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  const maxAgeFlag = isStayLoggedIn ? `; max-age=${30 * 24 * 60 * 60}` : '';
  document.cookie = `pieach_session=${accessToken}; path=/${maxAgeFlag}${secureFlag}; SameSite=Lax`;
}

function clearAuthCookies() {
  if (typeof window === 'undefined') return;
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `pieach_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC${secureFlag}; SameSite=Lax`;
  document.cookie = `pieach_stay_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC${secureFlag}; SameSite=Lax`;
}

export default function ProtectedLayout({ children }) {
  useEffect(() => {
    let isMounted = true;

    // 1. Ensure current Supabase session token is synced to the pieach_session cookie
    // (especially when returning to an inactive tab where the 1-hour JWT was refreshed)
    const refreshAndSyncSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (error || !session?.access_token) {
          clearAuthCookies();
          sessionStorage.removeItem('pieach_active_session');
          window.location.replace('/dashboard/login?expired=1');
          return;
        }

        // If token is expiring within 2 minutes or already expired, force a refresh
        const expiresAtMs = (session.expires_at || 0) * 1000;
        if (expiresAtMs && expiresAtMs - Date.now() < 2 * 60 * 1000) {
          const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError || !refreshed?.session?.access_token) {
            clearAuthCookies();
            sessionStorage.removeItem('pieach_active_session');
            window.location.replace('/dashboard/login?expired=1');
            return;
          }
          syncAuthCookie(refreshed.session.access_token);
        } else {
          syncAuthCookie(session.access_token);
        }
      } catch (err) {
        console.error('Session sync error:', err);
      }
    };

    refreshAndSyncSession();

    // 2. Listen for Supabase auth state changes (e.g. automatic token refresh or sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if ((event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') && session?.access_token) {
        syncAuthCookie(session.access_token);
      } else if (event === 'SIGNED_OUT') {
        clearAuthCookies();
        sessionStorage.removeItem('pieach_active_session');
        if (!window.location.pathname.startsWith('/dashboard/login')) {
          window.location.replace('/dashboard/login');
        }
      }
    });

    // 3. Re-check and sync token whenever the user returns to the tab after inactivity
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        refreshAndSyncSession();
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, []);

  return (
    <UnsavedChangesProvider>
      {children}
    </UnsavedChangesProvider>
  );
}
