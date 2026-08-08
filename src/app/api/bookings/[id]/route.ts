import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { toErrorResponse, AuthenticationError, AuthorizationError, ValidationError, NotFoundError } from "@/lib/errors";
import { emailReviewRequest } from "@/lib/email";

const statusSchema = z.enum(["pending", "confirmed", "completed", "cancelled"]);

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthenticationError();
  if (session.user.role !== "admin") throw new AuthorizationError();
}

// Admin: update booking status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json().catch(() => null);
    const parsed = statusSchema.safeParse(body?.status);
    if (!parsed.success) throw new ValidationError("Invalid status");

    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Booking not found");

    const updated = await db.booking.update({
      where: { id },
      data: { status: parsed.data },
    });

    // When a booking is marked completed, send review requests
    if (parsed.data === "completed" && existing.status !== "completed") {
      const { createReviewToken } = await import("@/lib/review-token");
      const { sendWhatsAppReviewRequest } = await import("@/lib/whatsapp");
      const token = createReviewToken(existing.id);
      const reviewUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://jhbcurtaincleaning.co.za"}/review?t=${token}`;

      // Email review request
      await emailReviewRequest(
        { name: existing.name, email: existing.email, service: existing.service },
        existing.id
      );

      // WhatsApp review request (auto-dispatch if API configured, else generates link)
      const waResult = await sendWhatsAppReviewRequest({
        customerName: existing.name,
        customerPhone: existing.phone,
        serviceName: existing.service,
        reviewUrl,
      });

      // Notify admin of the result
      const { notify } = await import("@/lib/notify");
      await notify({
        type: "system",
        title: `Review request sent to ${existing.name}`,
        message: waResult.sent
          ? `WhatsApp review request auto-sent to ${existing.name} (${existing.phone}).`
          : `WhatsApp review link for ${existing.name} (${existing.phone}): ${waResult.link}`,
        link: "/admin/bookings",
      });
    }

    return NextResponse.json({ booking: updated });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
