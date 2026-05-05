const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: { document: '/offline.html' },
  runtimeCaching: [
    {
      urlPattern: /\/api\/.*/i,
      handler: 'NetworkOnly',
    },
    {
      urlPattern: /\/(login|register|install)/,
      handler: 'NetworkOnly',
    },
    {
      urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|ico|woff2)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages',
        networkTimeoutSeconds: 10,
        expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone', // ✅ tambah ini
}

module.exports = withPWA(nextConfig)