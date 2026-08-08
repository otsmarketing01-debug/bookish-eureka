import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { toErrorResponse, ValidationError, NotFoundError } from "@/lib/errors";

const saveSchema = z.object({
  roomId: z.string().min(1),
  sender: z.enum(["visitor", "admin", "system"]),
  content: z.string().min(1).max(4000),
});

// GET message history for a room
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    if (!roomId) throw new ValidationError("roomId is required");

    const room = await db.chatRoom.findUnique({ where: { id: roomId } });
    if (!room) throw new NotFoundError("Room not found");

    const messages = await db.chatMessage.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ messages, room });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

// POST persist a message (called by the chat mini-service)
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = saveSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid");

    const { roomId, sender, content } = parsed.data;
    const room = await db.chatRoom.findUnique({ where: { id: roomId } });
    if (!room) throw new NotFoundError("Room not found");

    const message = await db.chatMessage.create({
      data: { roomId, sender, content },
    });
    await db.chatRoom.update({
      where: { id: roomId },
      data: { updatedAt: new Date() },
    });
    return NextResponse.json({ ok: true, message }, { status: 201 });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

// PUT create-or-find a room for a visitor
const roomSchema = z.object({
  visitorId: z.string().min(1),
  visitorName: z.string().min(1).max(80),
  visitorEmail: z.string().email().optional().or(z.literal("")),
  subject: z.string().max(120).optional().or(z.literal("")),
});

export async function PUT(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = roomSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid");

    const { visitorId, visitorName, visitorEmail, subject } = parsed.data;
    const existing = await db.chatRoom.findUnique({ where: { visitorId } });
    if (existing) {
      return NextResponse.json({ room: existing });
    }
    const room = await db.chatRoom.create({
      data: {
        visitorId,
        visitorName,
        visitorEmail: visitorEmail || null,
        subject: subject || null,
        status: "waiting",
      },
    });
    return NextResponse.json({ room }, { status: 201 });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
