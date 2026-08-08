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
