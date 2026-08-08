import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError, ValidationError, NotFoundError } from "@/lib/errors";

const schema = z.object({
  status: z.enum(["new", "contacted", "won", "lost"]),
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
    const parsed = schema.safeParse(body);
    if (!parsed.success) throw new ValidationError("Invalid status");

    const existing = await db.contactSubmission.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Lead not found");

    const updated = await db.contactSubmission.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ submission: updated });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
