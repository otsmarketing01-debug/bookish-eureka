import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

// Sub-sitemap: static pages
export async function GET() {
  const now = new Date().toISOString();
  const pages = [
    { url: "", priority: "1.0", changefreq: "weekly" },
    { url: "/pricing", priority: "0.9", changefreq: "monthly" },
    { url: "/book", priority: "0.9", changefreq: "monthly" },
    { url: "/faq", priority: "0.8", changefreq: "monthly" },
    { url: "/testimonials", priority: "0.8", changefreq: "monthly" },
    { url: "/review", priority: "0.7", changefreq: "monthly" },
    { url: "/gallery", priority: "0.8", changefreq: "monthly" },
    { url: "/blog", priority: "0.8", changefreq: "weekly" },
    { url: "/contact", priority: "0.9", changefreq: "monthly" },
  ];
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${siteConfig.url}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
