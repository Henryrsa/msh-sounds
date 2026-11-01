import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is served by xneelo's Apache hosting (no Node.js),
  // so every page is prerendered to plain HTML in /out at build time.
  output: "export",
  images: {
    // Image optimization needs a server; the gallery is already resized to
    // 1200px so serving originals is fine.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
