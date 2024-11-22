import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Example: Avoid including 'fs' in the client bundle
      };
    }
    return config;
  },
  reactStrictMode: false,
  // Other configurations here
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',

};

export default nextConfig;
