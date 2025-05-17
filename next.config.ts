import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `$var: red;`,
  },
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
