import type { MetadataRoute } from "next";
import { siteConfig, services, areas, sectors } from "@/lib/config";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const now = new Date();

  const staticRoutes = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/book", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/testimonials", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/review", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  const serviceRoutes = services.map((s) => ({
    url: `/services/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));
  const areaRoutes = areas.map((a) => ({
    url: `/areas/${a.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));
  const sectorRoutes = sectors.map((s) => ({
    url: `/sectors/${s.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));
  const postRoutes = posts.map((p) => ({
    url: `/blog/${p.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    lastModified: p.updatedAt,
  }));

  const all = [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...sectorRoutes, ...postRoutes];

  return all.map((r) => ({
    url: `${siteConfig.url}${r.url}`,
    lastModified: r.lastModified ?? now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
