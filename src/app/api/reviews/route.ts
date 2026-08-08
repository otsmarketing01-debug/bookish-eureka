import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { enforceRateLimit, clientKey } from "@/lib/rate-limit";
import { toErrorResponse, ValidationError, AuthenticationError, AuthorizationError } from "@/lib/errors";
import { notify } from "@/lib/notify";
import { verifyReviewToken } from "@/lib/review-token";

const schema = z.object({
  token: z.string().optional(),
  bookingId: z.string().optional(),
  name: z.string().min(2, "Please enter your name").max(80),
  area: z.string().max(80).optional().or(z.literal("")),
  service: z.string().min(2, "Please select a service").max(80),
  rating: z.number().int().min(1, "Please select a rating").max(5),
  title: z.string().min(3, "Please add a short title").max(120),
  body: z.string().min(10, "Please write a few words about your experience").max(1000),
});

// Public: submit a review
export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    enforceRateLimit(clientKey(ip, "review"), { limit: 3, windowMs: 60 * 60 * 1000 });

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const d = parsed.data;

    // If a token is provided, validate it against a completed booking.
    // This links the review to a real job and pre-fills the service.
    let verifiedBookingId: string | null = null;
    let verifiedService: string | undefined;
    let verifiedName: string | undefined;
    let verifiedArea: string | undefined;

    if (d.token) {
      const bookingId = verifyReviewToken(d.token);
      if (!bookingId) {
        throw new ValidationError("Invalid or expired review link. Please request a new one.", "INVALID_TOKEN");
      }
      const booking = await db.booking.findUnique({ where: { id: bookingId } });
      if (!booking) {
        throw new ValidationError("Booking not found for this review link.", "BOOKING_NOT_FOUND");
      }
      if (booking.status !== "completed") {
        throw new ValidationError("This booking hasn't been marked as completed yet.", "BOOKING_NOT_COMPLETED");
      }
      // Check no existing review for this booking (one review per booking)
      const existing = await db.review.findFirst({ where: { bookingId } });
      if (existing) {
        throw new ValidationError("A review has already been submitted for this booking.", "ALREADY_REVIEWED");
      }
      verifiedBookingId = bookingId;
      verifiedService = booking.service;
      verifiedName = booking.name;
      verifiedArea = booking.area ?? undefined;
    }

    const review = await db.review.create({
      data: {
        bookingId: verifiedBookingId ?? (d.bookingId || null),
        name: d.name,
        area: d.area || null,
        service: d.service,
        rating: d.rating,
        title: d.title,
        body: d.body,
        status: "pending",
      },
    });

    await notify({
      type: "system",
      title: `New review from ${d.name}`,
      message: `${d.name} rated ${d.service} ${d.rating}/5 — "${d.title}". Pending approval.`,
      link: "/admin/reviews",
    });

    return NextResponse.json(
      { success: true, id: review.id, message: "Thank you! Your review is submitted and will appear once approved." },
      { status: 201 }
    );
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

// GET: admin sees all reviews (with optional status filter); public sees only approved
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "admin";

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 200);
    const service = searchParams.get("service");
    const status = searchParams.get("status");

    const reviews = await db.review.findMany({
      where: {
        ...(isAdmin ? (status && status !== "all" ? { status } : {}) : { status: "approved" }),
        ...(service ? { service } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return NextResponse.json({ reviews });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
