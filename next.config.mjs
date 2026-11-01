import http from 'http';

// Increase maxHeaderSize on active HTTP server handles to prevent HTTP 431 on localhost
if (typeof process !== 'undefined' && typeof process._getActiveHandles === 'function') {
  for (const handle of process._getActiveHandles()) {
    if (handle instanceof http.Server) {
      handle.maxHeaderSize = 524288; // 512 KB
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pieach.com',
      },
      {
        protocol: 'https',
        hostname: 'lyexdygijcjuteawdvfa.supabase.co',
      },
    ],
  },
};

export default nextConfig;
