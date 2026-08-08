import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError } from "@/lib/errors";

// Admin: list notifications (unread first, then by date)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const [notifications, unreadCount] = await Promise.all([
      db.adminNotification.findMany({
        orderBy: [{ read: "asc" }, { createdAt: "desc" }],
        take: 30,
      }),
      db.adminNotification.count({ where: { read: false } }),
    ]);

    return NextResponse.json({ notifications, unreadCount });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
