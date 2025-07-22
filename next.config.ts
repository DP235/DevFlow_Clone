import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://www.w3schools.com/**')],
  },
  allowedDevOrigins: ['192.168.1.214'],
};

export default nextConfig;
