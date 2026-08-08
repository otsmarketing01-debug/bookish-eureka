import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError, NotFoundError } from "@/lib/errors";

// Admin claims a chat room
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const { id } = await params;
    const room = await db.chatRoom.findUnique({ where: { id } });
    if (!room) throw new NotFoundError("Room not found");

    const updated = await db.chatRoom.update({
      where: { id },
      data: { status: "active", assignedTo: session.user.id },
    });
    return NextResponse.json({ room: updated });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

// Admin closes a chat room
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const { id } = await params;
    const updated = await db.chatRoom.update({
      where: { id },
      data: { status: "closed" },
    });
    return NextResponse.json({ room: updated });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
