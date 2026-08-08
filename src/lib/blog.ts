import { db } from "@/lib/db";

export type BlogPostListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  author: string;
  readingTime: number;
  publishedAt: Date;
  featured: boolean;
};

export type BlogPostFull = BlogPostListItem & {
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

function toListItem(p: any): BlogPostListItem {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    category: p.category,
    tags: p.tags ? p.tags.split(",").filter(Boolean) : [],
    author: p.author,
    readingTime: p.readingTime,
    publishedAt: p.publishedAt,
    featured: p.featured,
  };
}

export async function getPublishedPosts(): Promise<BlogPostListItem[]> {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
  return posts.map(toListItem);
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPostListItem[]> {
  const posts = await db.blogPost.findMany({
    where: { published: true, featured: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  if (posts.length === 0) {
    // fallback to latest
    return getPublishedPosts().then((p) => p.slice(0, limit));
  }
  return posts.map(toListItem);
}

export async function getPostBySlug(slug: string): Promise<BlogPostFull | null> {
  const p = await db.blogPost.findUnique({ where: { slug } });
  if (!p || !p.published) return null;
  return {
    ...toListItem(p),
    content: p.content,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

export async function getRelatedPosts(slug: string, category: string, limit = 3): Promise<BlogPostListItem[]> {
  const posts = await db.blogPost.findMany({
    where: { published: true, slug: { not: slug }, category },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  return posts.map(toListItem);
}

export async function getCategories(): Promise<{ name: string; count: number }[]> {
  const posts = await db.blogPost.findMany({ where: { published: true } });
  const map = new Map<string, number>();
  for (const p of posts) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Find blog posts relevant to a given service by scoring post title/excerpt/tags
 * against the service name and its features. Returns up to `limit` best matches.
 */
export async function getPostsByServiceMatch(
  serviceName: string,
  serviceFeatures: string[],
  limit = 3
): Promise<BlogPostListItem[]> {
  const posts = await getPublishedPosts();
  const haystack = `${serviceName} ${serviceFeatures.join(" ")}`.toLowerCase();
  const serviceWords = serviceName.toLowerCase().split(/[\s&]+/).filter((w) => w.length > 3);

  const scored = posts.map((p) => {
    const postText = `${p.title} ${p.excerpt} ${p.tags.join(" ")} ${p.category}`.toLowerCase();
    let score = 0;
    // Match service name keywords
    for (const w of serviceWords) {
      if (postText.includes(w)) score += 3;
    }
    // Match feature keywords
    for (const f of serviceFeatures) {
      const fWords = f.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
      for (const w of fWords) {
        if (postText.includes(w)) score += 1;
      }
    }
    // Match service words against post tags specifically
    for (const tag of p.tags) {
      for (const w of serviceWords) {
        if (tag.toLowerCase().includes(w)) score += 2;
      }
    }
    return { post: p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

/** Search published blog posts by query string (title, excerpt, content, tags). */
export async function searchPosts(query: string, limit = 20): Promise<BlogPostListItem[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const posts = await getPublishedPosts();
  const terms = q.split(/\s+/).filter((t) => t.length > 1);

  const scored = posts.map((p) => {
    const haystack = `${p.title} ${p.excerpt} ${p.tags.join(" ")} ${p.category}`.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (p.title.toLowerCase().includes(term)) score += 5;
      if (p.excerpt.toLowerCase().includes(term)) score += 3;
      if (p.tags.some((t) => t.toLowerCase().includes(term))) score += 3;
      if (p.category.toLowerCase().includes(term)) score += 2;
      if (haystack.includes(term)) score += 1;
    }
    return { post: p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}
