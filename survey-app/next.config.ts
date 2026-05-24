import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => [
    {
      source: '/api/auth/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: process.env['NEXT_PUBLIC_APP_URL'] || 'https://flowee.id',
        },
        { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization',
        },
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
}

export default nextConfig
