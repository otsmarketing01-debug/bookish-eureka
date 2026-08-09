import { db } from "@/lib/db";

/**
 * Safe database access wrappers.
 * On serverless platforms (Vercel) where SQLite may not persist,
 * these functions gracefully return empty data instead of crashing.
 */

export async function safeGetApprovedReviews(limit = 12) {
  try {
    return await db.review.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function safeGetApprovedReviewsByService(serviceName: string, limit = 10) {
  try {
    return await db.review.findMany({
      where: { status: "approved", service: serviceName },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function safeGetPublishedPosts() {
  try {
    return await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function safeGetPublishedGallery() {
  try {
    return await db.galleryShowcase.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function safeGetPostBySlug(slug: string) {
  try {
    const post = await db.blogPost.findUnique({ where: { slug } });
    if (!post || !post.published) return null;
    return post;
  } catch {
    return null;
  }
}

export async function safeGetRelatedPosts(slug: string, category: string, limit = 3) {
  try {
    return await db.blogPost.findMany({
      where: { published: true, slug: { not: slug }, category },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function safeGetCategories() {
  try {
    const posts = await db.blogPost.findMany({ where: { published: true } });
    const map = new Map<string, number>();
    for (const p of posts) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return Array.from(map.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}

export async function safeGetPostsByServiceMatch(
  serviceName: string,
  serviceFeatures: string[],
  limit = 3
) {
  try {
    const posts = await safeGetPublishedPosts();
    const serviceWords = serviceName.toLowerCase().split(/[\s&]+/).filter((w) => w.length > 3);
    const scored = posts.map((p: any) => {
      const postText = `${p.title} ${p.excerpt} ${p.tags} ${p.category}`.toLowerCase();
      let score = 0;
      for (const w of serviceWords) if (postText.includes(w)) score += 3;
      for (const f of serviceFeatures) {
        const fWords = f.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
        for (const w of fWords) if (postText.includes(w)) score += 1;
      }
      return { post: p, score };
    });
    return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.post);
  } catch {
    return [];
  }
}
