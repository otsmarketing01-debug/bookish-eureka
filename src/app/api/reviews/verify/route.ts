import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyReviewToken } from "@/lib/review-token";
import { toErrorResponse, ValidationError } from "@/lib/errors";

// Public: verify a review token and return booking info for pre-filling the form.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("t");
    if (!token) {
      throw new ValidationError("No review token provided");
    }

    const bookingId = verifyReviewToken(token);
    if (!bookingId) {
      return NextResponse.json({ valid: false, reason: "INVALID_TOKEN" });
    }

    const booking = await db.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return NextResponse.json({ valid: false, reason: "BOOKING_NOT_FOUND" });
    }
    if (booking.status !== "completed") {
      return NextResponse.json({ valid: false, reason: "BOOKING_NOT_COMPLETED", status: booking.status });
    }

    // Check for existing review
    const existing = await db.review.findFirst({ where: { bookingId } });
    if (existing) {
      return NextResponse.json({ valid: false, reason: "ALREADY_REVIEWED" });
    }

    return NextResponse.json({
      valid: true,
      booking: {
        service: booking.service,
        name: booking.name,
        area: booking.area,
      },
    });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
