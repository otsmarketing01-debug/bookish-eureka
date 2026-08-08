import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError, NotFoundError } from "@/lib/errors";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthenticationError();
  if (session.user.role !== "admin") throw new AuthorizationError();
}

// Toggle published
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const existing = await db.galleryShowcase.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Showcase not found");

    const updated = await db.galleryShowcase.update({
      where: { id },
      data: {
        published: typeof body.published === "boolean" ? body.published : existing.published,
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : existing.sortOrder,
      },
    });
    return NextResponse.json({ item: updated });
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
    const existing = await db.galleryShowcase.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Showcase not found");
    await db.galleryShowcase.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
