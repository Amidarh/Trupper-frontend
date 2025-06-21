import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `$var: red;`,
  },
  experimental: {
    nodeMiddleware: true,
  },
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/**'), new URL('https://images.unsplash.com/**')],
    dangerouslyAllowSVG: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
