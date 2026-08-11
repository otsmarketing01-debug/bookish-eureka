import { siteConfig, sectors } from "@/lib/config";

export const dynamic = "force-static";

// Sub-sitemap: sector pages
export const revalidate = 3600;
export async function GET() {
  const now = new Date().toISOString();
  const urls = sectors
    .map(
      (s) => `  <url>
    <loc>${siteConfig.url}/sectors/${s.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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
