import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pino', 'pino-pretty'],
  images: {
    remotePatterns: [new URL('https://www.w3schools.com/**')],
  },
  allowedDevOrigins: ['192.168.1.214'],
};

export default nextConfig;
