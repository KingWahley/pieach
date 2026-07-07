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
