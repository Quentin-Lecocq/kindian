import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/export',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['covers.openlibrary.org'],
  },
};

export default nextConfig;
