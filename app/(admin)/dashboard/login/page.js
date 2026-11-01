// app/(admin)/dashboard/login/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

function setAuthCookie(name, value, maxAgeSeconds) {
  const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  const maxAgeFlag = typeof maxAgeSeconds === 'number' ? `; max-age=${maxAgeSeconds}` : '';
  document.cookie = `${name}=${value}; path=/${maxAgeFlag}${secureFlag}; SameSite=Lax`;
}

function clearAuthCookies() {
  const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `pieach_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC${secureFlag}; SameSite=Lax`;
  document.cookie = `pieach_stay_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC${secureFlag}; SameSite=Lax`;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const params = new URLSearchParams(window.location.search);
      const isExpiredRedirect = params.get('expired') === '1';

      // If middleware just rejected our cookie and redirected here, do NOT redirect back into a loop
      if (isExpiredRedirect) {
        clearAuthCookies();
        sessionStorage.removeItem('pieach_active_session');
        await supabase.auth.signOut();
        window.history.replaceState({}, '', '/dashboard/login');
        return;
      }

      const isStayLoggedInCookie = document.cookie.includes('pieach_stay_logged_in=true');
      const isActiveSession = sessionStorage.getItem('pieach_active_session') === 'true';

      if (isStayLoggedInCookie || isActiveSession) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          // Verify with Supabase user endpoint so we never loop with middleware
          const { data: { user }, error } = await supabase.auth.getUser(session.access_token);
          if (!error && user) {
            if (isStayLoggedInCookie) {
              const maxAge = 30 * 24 * 60 * 60; // 30 days
              setAuthCookie('pieach_session', session.access_token, maxAge);
            } else {
              setAuthCookie('pieach_session', session.access_token);
            }
            router.replace('/dashboard');
            return;
          }
        }
      }

      // Clean state if we shouldn't be logged in
      clearAuthCookies();
      sessionStorage.removeItem('pieach_active_session');
      await supabase.auth.signOut();
    };
    
    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setErrorMsg('Database configuration is missing. Please ensure your environment variables are configured.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === 'Failed to fetch' || error.message?.includes('fetch')) {
          setErrorMsg('Unable to connect to the authentication server. Please check your internet connection or verify that the database service is running.');
        } else {
          setErrorMsg(error.message);
        }
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        sessionStorage.setItem('pieach_active_session', 'true');
        
        if (stayLoggedIn) {
          const maxAge = 30 * 24 * 60 * 60; // 30 days
          setAuthCookie('pieach_session', data.session.access_token, maxAge);
          setAuthCookie('pieach_stay_logged_in', 'true', maxAge);
        } else {
          setAuthCookie('pieach_session', data.session.access_token);
          const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
          document.cookie = `pieach_stay_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC${secureFlag}; SameSite=Lax`;
        }
        
        router.replace('/dashboard');
      } else {
        setErrorMsg('Authentication failed.');
        setIsLoading(false);
      }
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message?.includes('fetch')) {
        setErrorMsg('Unable to connect to the authentication server. Please check your internet connection or verify that the database service is running.');
      } else {
        setErrorMsg(err.message || 'An unexpected error occurred.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0F14] px-4 py-12 sm:px-6 lg:px-8"
         style={{
           backgroundImage: 'radial-gradient(circle at center, rgba(197, 168, 128, 0.08) 0%, transparent 70%)'
         }}>
      <div className="w-full max-w-md space-y-8 bg-neutral-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-sm shadow-2xl">
        <div className="text-center">
          <img
            src="/images/mainlogo1.png"
            alt="Pieach Logo"
            className="mx-auto h-16 w-auto object-contain mb-4"
          />
          <h2 className="font-serif text-2xl font-normal text-white uppercase tracking-wider">
            ADMIN PORTAL
          </h2>
          <p className="mt-2 text-xs font-sans text-neutral-400 uppercase tracking-widest">
            Sign in to manage CMS database
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="rounded-sm bg-red-950/40 border border-red-500/20 p-4 text-xs text-red-400 font-sans">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2">
                EMAIL ADDRESS
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-none bg-neutral-950/80 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-brand-gold transition duration-200"
                placeholder="admin@pieach.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2">
                PASSWORD
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-none bg-neutral-950/80 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-brand-gold transition duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="stay-logged-in"
                name="stay-logged-in"
                type="checkbox"
                checked={stayLoggedIn}
                onChange={(e) => setStayLoggedIn(e.target.checked)}
                className="h-4 w-4 rounded-sm border border-white/10 bg-neutral-950/80 text-brand-gold focus:ring-brand-gold focus:ring-offset-neutral-900 cursor-pointer"
              />
              <label htmlFor="stay-logged-in" className="ml-2 block text-[10px] font-bold text-brand-gold uppercase tracking-wider cursor-pointer">
                Stay logged in on this device
              </label>
            </div>
            {stayLoggedIn && (
              <div className="rounded-sm bg-amber-950/30 border border-amber-500/20 p-3 text-[11px] leading-relaxed text-amber-200/90 font-sans">
                <span className="font-semibold text-brand-gold">WARNING:</span> Please ensure this is a trusted device before choosing to maintain your login session.
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center border border-brand-gold/40 bg-brand-gold text-brand-navy px-4 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-navy hover:border-white transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'AUTHENTICATING...' : 'SIGN IN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
