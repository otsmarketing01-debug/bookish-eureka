import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError, ValidationError } from "@/lib/errors";

const createSchema = z.object({
  title: z.string().min(3, "Title is too short").max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  excerpt: z.string().min(10, "Excerpt is too short").max(400),
  content: z.string().min(20, "Content is too short"),
  coverImage: z.string().url().optional().or(z.literal("")),
  category: z.string().min(1).max(60),
  tags: z.string().max(200).optional().or(z.literal("")),
  author: z.string().min(1).max(80).optional(),
  readingTime: z.number().int().min(1).max(60).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

// Admin: list all posts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ posts });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

// Admin: create a new post
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const body = await req.json().catch(() => null);
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const d = parsed.data;
    const existing = await db.blogPost.findUnique({ where: { slug: d.slug } });
    if (existing) throw new ValidationError("A post with this slug already exists", "SLUG_TAKEN");

    const post = await db.blogPost.create({
      data: {
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt,
        content: d.content,
        coverImage: d.coverImage || null,
        category: d.category,
        tags: d.tags || "",
        author: d.author || "JHB Curtain Cleaning",
        readingTime: d.readingTime ?? Math.max(1, Math.ceil(d.content.split(/\s+/).length / 200)),
        published: d.published ?? false,
        featured: d.featured ?? false,
        authorId: session.user.id,
      },
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
