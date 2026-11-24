import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Demo photos come from Unsplash. When you switch to your own photos in
    // /public, they work without any change here.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
