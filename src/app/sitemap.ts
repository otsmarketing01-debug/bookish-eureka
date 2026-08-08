import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

// Sitemap index — references sub-sitemaps for scalability.
// Each sub-sitemap covers a content type so Google can crawl efficiently
// and we can monitor indexation per section.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const subs = [
    { url: "/sitemap-pages.xml", lastModified: now, priority: 1.0 },
    { url: "/sitemap-services.xml", lastModified: now, priority: 0.9 },
    { url: "/sitemap-blog.xml", lastModified: now, priority: 0.8 },
    { url: "/sitemap-areas.xml", lastModified: now, priority: 0.7 },
    { url: "/sitemap-sectors.xml", lastModified: now, priority: 0.7 },
  ];
  return subs.map((s) => ({
    url: `${siteConfig.url}${s.url}`,
    lastModified: s.lastModified,
    priority: s.priority,
  }));
}
