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

export default nextConfig;
