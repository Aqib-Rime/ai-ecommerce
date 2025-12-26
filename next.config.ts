import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  cacheComponents: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    inlineCss: true,
  },
  /* config options here */
};

export default nextConfig;
