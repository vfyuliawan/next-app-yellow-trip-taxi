import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable React Strict Mode
  eslint: {
    // Disables eslint during build time
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
