import type { NextConfig } from "next";

const isStaging = !!process.env.SPACE_Z_DEPLOYMENT || process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Core Web Vitals: image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
  },
  // Core Web Vitals: compress responses
  compress: true,
  // Core Web Vitals: powered-by header removal (minor)
  poweredByHeader: false,
  // Prevent staging/preview deployments from being indexed by search engines.
  async headers() {
    const headers: { source: string; headers: { key: string; value: string }[] }[] = [];

    // Staging noindex
    if (isStaging) {
      headers.push({
        source: "/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      });
    }

    // Core Web Vitals: cache static assets aggressively
    headers.push({
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    });

    // Core Web Vitals: cache images
    headers.push({
      source: "/_next/image(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400, s-maxage=31536000" },
      ],
    });

    // Core Web Vitals: cache public assets
    headers.push({
      source: "/(.*).(jpg|jpeg|png|webp|avif|svg|ico|woff|woff2)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    });

    return headers;
  },
};

export default nextConfig;
