import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { enforceRateLimit, clientKey } from "@/lib/rate-limit";
import { toErrorResponse, ValidationError } from "@/lib/errors";
import { notify } from "@/lib/notify";
import { emailContactConfirmation, emailAdminNotification } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email").max(150),
  phone: z.string().max(30).optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  area: z.string().max(80).optional().or(z.literal("")),
  message: z.string().min(10, "Please tell us a bit more (min 10 characters)").max(2000),
});

export async function POST(req: Request) {
  try {
    // Rate limit: 5 submissions per hour per IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    enforceRateLimit(clientKey(ip, "contact"), { limit: 5, windowMs: 60 * 60 * 1000 });

    const body = await req.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid input");
    }

    const data = parsed.data;
    const submission = await db.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service || null,
        area: data.area || null,
        message: data.message,
      },
    });

    // Notify admin of new lead
    await notify({
      type: "lead",
      title: `New lead from ${data.name}`,
      message: `${data.name} (${data.email}) requested a quote${data.service ? ` for ${data.service}` : ""}${data.area ? ` in ${data.area}` : ""}.`,
      link: "/admin/leads",
    });
    // Send emails (customer confirmation + admin notification) — best-effort, never blocks
    await Promise.all([
      emailContactConfirmation({ name: data.name, email: data.email }),
      emailAdminNotification(
        `New lead from ${data.name}`,
        `${data.name} (${data.email}) requested a quote${data.service ? ` for ${data.service}` : ""}${data.area ? ` in ${data.area}` : ""}.<br><br>Message: "${data.message}"`
      ),
    ]);

    return NextResponse.json(
      { success: true, id: submission.id, message: "Thank you! We'll be in touch within 1 business hour." },
      { status: 201 }
    );
  } catch (err) {
    const e = toErrorResponse(err);
    return NextResponse.json(e, { status: e.statusCode });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "contact" });
}
