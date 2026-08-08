import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { enforceRateLimit, clientKey } from "@/lib/rate-limit";
import { toErrorResponse, ValidationError, AuthenticationError, AuthorizationError } from "@/lib/errors";
import { notify } from "@/lib/notify";

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email").max(150),
  phone: z.string().min(5, "Please enter a valid phone number").max(30),
  service: z.string().min(2, "Please select a service").max(80),
  area: z.string().max(80).optional().or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  preferredDate: z.string().min(8, "Please pick a preferred date"),
  preferredSlot: z.enum(["morning", "afternoon", "anytime"]),
  message: z.string().max(1000).optional().or(z.literal("")),
});

// Admin: list bookings (optionally filter by status)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new AuthenticationError();
    if (session.user.role !== "admin") throw new AuthorizationError();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const bookings = await db.booking.findMany({
      where: status && status !== "all" ? { status } : undefined,
      orderBy: [{ preferredDate: "asc" }, { createdAt: "desc" }],
      take: 200,
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    enforceRateLimit(clientKey(ip, "booking"), { limit: 5, windowMs: 60 * 60 * 1000 });

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const d = parsed.data;
    // Prevent past dates
    const date = new Date(d.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      throw new ValidationError("Please choose today or a future date");
    }
    // Prevent Sundays (closed) — day 0
    if (date.getDay() === 0) {
      throw new ValidationError("We're closed on Sundays — please pick another day");
    }

    const booking = await db.booking.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone,
        service: d.service,
        area: d.area || null,
        address: d.address || null,
        preferredDate: d.preferredDate,
        preferredSlot: d.preferredSlot,
        message: d.message || null,
        status: "pending",
      },
    });

    await notify({
      type: "lead",
      title: `New booking from ${d.name}`,
      message: `${d.name} booked ${d.service} for ${d.preferredDate} (${d.preferredSlot}). Phone: ${d.phone}.`,
      link: "/admin/bookings",
    });

    return NextResponse.json(
      { success: true, id: booking.id, message: "Booking received! We'll confirm by phone within 1 business hour." },
      { status: 201 }
    );
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
