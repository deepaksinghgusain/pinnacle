import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.everlumesolutions.com",
      },
      {
        protocol: "https",
        hostname: "everlumesolutions.com",
      },
    ],
  },
};

export default nextConfig;
