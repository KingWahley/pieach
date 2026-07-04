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

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all routes under /dashboard except the login page
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login')) {
    const sessionCookie = request.cookies.get('pieach_session');

    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL('/dashboard/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // 1. Fast Local JWT Validation (Expiry Check)
    const payload = decodeJwt(sessionCookie.value);
    if (!payload || !payload.exp || payload.exp * 1000 < Date.now()) {
      const response = NextResponse.redirect(new URL('/dashboard/login', request.url));
      response.cookies.delete('pieach_session');
      return response;
    }

    // 2. Performance Optimization: Skip external network auth checks for prefetch requests.
    // Prefetches are triggered by link hovering and don't need cryptographic network verification.
    const isPrefetch = 
      request.headers.get('x-middleware-prefetch') === '1' ||
      request.headers.get('purpose') === 'prefetch';

    if (isPrefetch) {
      return NextResponse.next();
    }

    // 3. Full Cryptographic Verification for actual page loads / navigations
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.next(); // Skip if env vars aren't loaded yet
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data: { user }, error } = await supabase.auth.getUser(sessionCookie.value);

      if (error || !user) {
        const response = NextResponse.redirect(new URL('/dashboard/login', request.url));
        response.cookies.delete('pieach_session');
        return response;
      }
    } catch (e) {
      const response = NextResponse.redirect(new URL('/dashboard/login', request.url));
      response.cookies.delete('pieach_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
