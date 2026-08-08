import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError, ValidationError, NotFoundError } from "@/lib/errors";

const patchSchema = z.object({
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

const putSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  excerpt: z.string().min(10).max(400),
  content: z.string().min(20),
  coverImage: z.string().url().optional().or(z.literal("")),
  category: z.string().min(1).max(60),
  tags: z.string().max(200).optional().or(z.literal("")),
  author: z.string().min(1).max(80).optional(),
  readingTime: z.number().int().min(1).max(60).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthenticationError();
  if (session.user.role !== "admin") throw new AuthorizationError();
  return session;
}

// Admin: get a single post (for editing)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundError("Post not found");
    return NextResponse.json({ post });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

// Admin: toggle published/featured (quick action)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json().catch(() => null);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError("Invalid update");

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Post not found");

    const updated = await db.blogPost.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ post: updated });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

// Admin: full update (edit content)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json().catch(() => null);
    const parsed = putSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid input");

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Post not found");

    // Check slug uniqueness if changed
    if (parsed.data.slug !== existing.slug) {
      const clash = await db.blogPost.findUnique({ where: { slug: parsed.data.slug } });
      if (clash) throw new ValidationError("A post with this slug already exists", "SLUG_TAKEN");
    }

    const d = parsed.data;
    const updated = await db.blogPost.update({
      where: { id },
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
        published: d.published ?? existing.published,
        featured: d.featured ?? existing.featured,
      },
    });
    return NextResponse.json({ post: updated });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Post not found");

    await db.blogPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
