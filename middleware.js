// middleware.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Helper to decode JWT payload locally in Next.js Edge runtime without external dependencies
function decodeJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function clearAuthCookiesAndRedirect(request) {
  const loginUrl = new URL('/dashboard/login', request.url);
  loginUrl.searchParams.set('expired', '1');
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete('pieach_session');
  response.cookies.delete('pieach_stay_logged_in');
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all routes under /dashboard except the login page
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login')) {
    // 1. Never redirect or mutate cookies on background prefetch requests.
    // Redirecting a prefetch poisons the Next.js client-side Router Cache with a cached
    // redirect to /dashboard/login and wipes cookies in the background.
    const isPrefetch =
      request.headers.get('x-middleware-prefetch') === '1' ||
      request.headers.get('next-router-prefetch') === '1' ||
      request.headers.get('purpose') === 'prefetch' ||
      request.headers.get('sec-purpose') === 'prefetch';

    if (isPrefetch) {
      const res = NextResponse.next();
      res.headers.set('Cache-Control', 'no-store');
      res.headers.set('x-middleware-cache', 'no-cache');
      return res;
    }

    const sessionCookie = request.cookies.get('pieach_session');

    if (!sessionCookie || !sessionCookie.value) {
      return clearAuthCookiesAndRedirect(request);
    }

    // Guard against corrupted or bloated token strings in cookie
    const token = sessionCookie.value.trim();
    if (token.length > 4096 || token.includes(' ')) {
      return clearAuthCookiesAndRedirect(request);
    }

    // 2. Fast Local JWT Validation (Expiry Check)
    const payload = decodeJwt(token);
    if (!payload || !payload.exp || payload.exp * 1000 < Date.now()) {
      return clearAuthCookiesAndRedirect(request);
    }

    // 3. Full Cryptographic Verification for actual page loads / navigations
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.next(); // Skip if env vars aren't loaded yet
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      });
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return clearAuthCookiesAndRedirect(request);
      }
    } catch (e) {
      return clearAuthCookiesAndRedirect(request);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
