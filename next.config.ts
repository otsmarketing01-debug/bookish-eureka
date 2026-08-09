import type { NextConfig } from "next";

// Only apply noindex to the sandbox staging environment (space-z.ai),
// NEVER to production deployments on Vercel.
const isSandboxStaging = !!process.env.SPACE_Z_DEPLOYMENT && !process.env.VERCEL;

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    const headers: { source: string; headers: { key: string; value: string }[] }[] = [];

    // Only noindex the sandbox staging environment — NEVER production
    if (isSandboxStaging) {
      headers.push({
        source: "/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      });
    }

    // Cache static assets aggressively
    headers.push({
      source: "/_next/static/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    });

    // Cache optimized images
    headers.push({
      source: "/_next/image(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=31536000" }],
    });

    // Cache public assets
    headers.push({
      source: "/(.*).(jpg|jpeg|png|webp|avif|svg|ico|woff|woff2)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    });

    return headers;
  },
};

export default nextConfig;
