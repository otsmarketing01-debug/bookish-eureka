import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError } from "@/lib/errors";

// Admin: mark all as read (or a specific one via ?id=)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      await db.adminNotification.updateMany({
        where: { id },
        data: { read: true },
      });
    } else {
      await db.adminNotification.updateMany({
        where: { read: false },
        data: { read: true },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
