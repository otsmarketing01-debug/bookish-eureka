import type { NextConfig } from "next";

const isStaging = !!process.env.SPACE_Z_DEPLOYMENT || process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Prevent staging/preview deployments from being indexed by search engines.
  // The production domain (jhbcurtaincleaning.co.za) should be the only
  // indexed version. This addresses the audit's canonical-mismatch concern.
  async headers() {
    if (isStaging) {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Robots-Tag", value: "noindex, nofollow" },
          ],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
