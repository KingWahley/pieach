// lib/supabase/server.js
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing');
  }

  // Next.js Server Components / Actions / Route Handlers Client
  // Note: For simple setups, we can use the default client. 
  // If cookies/session management is required, we can parse next/headers cookies.
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createAdminClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase Service Role Key or URL is missing');
  }

  // Bypass RLS for admin/backend scripts and operations
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
