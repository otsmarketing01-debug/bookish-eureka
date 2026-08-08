import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError } from "@/lib/errors";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const [emails, stats] = await Promise.all([
      db.emailLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      {
        total: await db.emailLog.count(),
        sent: await db.emailLog.count({ where: { status: "sent" } }),
        logged: await db.emailLog.count({ where: { status: "logged" } }),
        failed: await db.emailLog.count({ where: { status: "failed" } }),
      },
    ]);
    return NextResponse.json({ emails, stats });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
