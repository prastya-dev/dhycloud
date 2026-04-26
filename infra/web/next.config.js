import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   turbopack: {
    root: __dirname, // arahkan ke direktori ini
  },
  /* config options here */
   images: {
    domains: ['images.unsplash.com' , ''],
  },
};
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline.html'   // tampil saat offline
  }
})


export default withPWA(nextConfig);
