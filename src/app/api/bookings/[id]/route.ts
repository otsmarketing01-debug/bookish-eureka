import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError, ValidationError, NotFoundError } from "@/lib/errors";

const statusSchema = z.enum(["pending", "confirmed", "completed", "cancelled"]);

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthenticationError();
  if (session.user.role !== "admin") throw new AuthorizationError();
}

// Admin: update booking status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json().catch(() => null);
    const parsed = statusSchema.safeParse(body?.status);
    if (!parsed.success) throw new ValidationError("Invalid status");

    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Booking not found");

    const updated = await db.booking.update({
      where: { id },
      data: { status: parsed.data },
    });
    return NextResponse.json({ booking: updated });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
