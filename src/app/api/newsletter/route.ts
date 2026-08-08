import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { enforceRateLimit, clientKey } from "@/lib/rate-limit";
import { toErrorResponse, ValidationError } from "@/lib/errors";

const schema = z.object({
  email: z.string().email("Please enter a valid email").max(150),
  name: z.string().max(80).optional().or(z.literal("")),
  source: z.enum(["footer", "popup", "blog"]).optional(),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    enforceRateLimit(clientKey(ip, "newsletter"), { limit: 5, windowMs: 60 * 60 * 1000 });

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid email");
    }

    const { email, name, source } = parsed.data;
    const lower = email.toLowerCase();

    // Upsert — if exists and inactive, reactivate
    const existing = await db.newsletterSubscriber.findUnique({ where: { email: lower } });
    if (existing) {
      if (!existing.active) {
        await db.newsletterSubscriber.update({
          where: { id: existing.id },
          data: { active: true, name: name || existing.name, source: source ?? existing.source },
        });
      }
      return NextResponse.json({
        success: true,
        message: "You're subscribed! Watch your inbox for cleaning tips and offers.",
      });
    }

    await db.newsletterSubscriber.create({
      data: { email: lower, name: name || null, source: source ?? "footer" },
    });

    return NextResponse.json(
      {
        success: true,
        message: "You're subscribed! Watch your inbox for cleaning tips and offers.",
      },
      { status: 201 }
    );
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
