/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pieach.com',
      },
    ],
  },
};

export default nextConfig;
