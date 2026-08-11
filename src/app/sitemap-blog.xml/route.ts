import { siteConfig } from "@/lib/config";
import { safeGetPublishedPosts } from "@/lib/db-safe";


// Sub-sitemap: blog posts
export const revalidate = 3600;
export async function GET() {
  const posts = await safeGetPublishedPosts();
  const urls = posts
    .map((p) => {
      const lastmod = (p.updatedAt ?? p.publishedAt ?? new Date()).toISOString();
      return `  <url>
    <loc>${siteConfig.url}/blog/${p.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
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
