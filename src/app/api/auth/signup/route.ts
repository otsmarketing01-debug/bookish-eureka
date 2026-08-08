import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { enforceRateLimit, clientKey } from "@/lib/rate-limit";
import { toErrorResponse, ValidationError } from "@/lib/errors";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Please enter a valid email").max(150),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    enforceRateLimit(clientKey(ip, "signup"), { limit: 5, windowMs: 60 * 60 * 1000 });

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const { name, email, password } = parsed.data;
    const lower = email.toLowerCase();
    const existing = await db.user.findUnique({ where: { email: lower } });
    if (existing) {
      throw new ValidationError("An account with this email already exists", "EMAIL_TAKEN");
    }

    const user = await db.user.create({
      data: { name, email: lower, password: hashPassword(password), role: "user" },
    });

    return NextResponse.json(
      { success: true, id: user.id, email: user.email },
      { status: 201 }
    );
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}
