import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL + "/api/auth/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
