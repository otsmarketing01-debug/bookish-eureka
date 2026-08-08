import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError } from "@/lib/errors";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const submissions = await db.contactSubmission.findMany({
      where: status && status !== "all" ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ submissions });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
