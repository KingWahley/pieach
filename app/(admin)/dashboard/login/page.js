// app/(admin)/dashboard/login/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Clear cookie and session on load to ensure clean state
    document.cookie = 'pieach_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax';
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
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
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        // Set the session cookie
        const maxAge = data.session.expires_in || 3600;
        document.cookie = `pieach_session=${data.session.access_token}; path=/; max-age=${maxAge}; Secure; SameSite=Lax`;
        
        router.push('/dashboard');
        router.refresh();
      } else {
        setErrorMsg('Authentication failed.');
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred.');
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
