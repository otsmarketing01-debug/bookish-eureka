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

    const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ posts });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
