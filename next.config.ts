import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost:4000'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    unoptimized: true,
  },
};

export default nextConfig;
