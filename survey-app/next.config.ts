import type { NextConfig } from 'next'

// next-pwa uses webpack, so we need to configure it carefully
// In development, we skip PWA to avoid webpack/turbopack conflicts
const isDev = process.env.NODE_ENV === 'development'

let nextConfig: NextConfig = {
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
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
}

// Only apply PWA in production builds
if (!isDev) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const withPWA = require('next-pwa')({
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: false,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxEntries: 4,
              maxAgeSeconds: 365 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cloudinary-images',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /^\/api\/rekanan/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-rekanan',
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 5 * 60,
            },
          },
        },
        {
          urlPattern: /^\/api\/sku/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-sku',
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 5 * 60,
            },
          },
        },
      ],
    })
    nextConfig = withPWA(nextConfig)
  } catch {
    // PWA setup failed, continue without it
    console.warn('next-pwa setup failed, continuing without PWA')
  }
}

export default nextConfig
