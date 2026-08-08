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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

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
