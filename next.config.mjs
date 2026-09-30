const dev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  allowedDevOrigins: ['*'],
  async rewrites() {
    if (dev) {
      return [
        { source: '/api', destination: 'http://127.0.0.1:8000/api/' },
        { source: '/api/:path*', destination: 'http://127.0.0.1:8000/api/:path*' },
      ];
    }
    return [];
  },
};

export default nextConfig;
