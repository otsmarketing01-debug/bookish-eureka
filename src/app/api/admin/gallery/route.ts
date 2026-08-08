import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError, ValidationError } from "@/lib/errors";

const createSchema = z.object({
  title: z.string().min(3, "Title is too short").max(120),
  location: z.string().min(2).max(80),
  service: z.string().min(2).max(80),
  description: z.string().min(10, "Description is too short").max(600),
  beforeImage: z.string().min(1, "Before image is required"),
  afterImage: z.string().min(1, "After image is required"),
  published: z.boolean().optional(),
});

// Admin: list all showcases (incl. unpublished)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const items = await db.galleryShowcase.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ items });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

// Admin: create a new showcase
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const body = await req.json().catch(() => null);
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const d = parsed.data;
    const item = await db.galleryShowcase.create({
      data: {
        title: d.title,
        location: d.location,
        service: d.service,
        description: d.description,
        beforeImage: d.beforeImage,
        afterImage: d.afterImage,
        published: d.published ?? true,
      },
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
