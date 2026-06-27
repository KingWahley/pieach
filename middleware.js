// middleware.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all routes under /dashboard except the login page
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login')) {
    const sessionCookie = request.cookies.get('pieach_session');

    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL('/dashboard/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

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
