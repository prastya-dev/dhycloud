const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline.html'
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   eslint: {
    ignoreDuringBuilds: true, // ← tambahkan ini
  },
}

module.exports = withPWA(nextConfig)