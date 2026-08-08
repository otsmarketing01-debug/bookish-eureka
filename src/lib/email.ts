import { db } from "@/lib/db";
import { siteConfig } from "@/lib/config";

// Email dispatch abstraction.
// - Always persists to EmailLog (visible in admin Email Log view).
// - If SMTP env vars are set (SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM),
//   also sends via Nodemailer. Otherwise logs as "logged" (would-be-sent).
// - Never throws — email failures must not break the parent request.

type EmailParams = {
  to: string;
  subject: string;
  body: string; // plain text or HTML
  type: "admin_notification" | "booking_confirmation" | "contact_confirmation" | "review_request";
  html?: boolean;
};

function wrapHtml(body: string) {
  return `<!DOCTYPE html><html><body style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1c2622; background: #fbfdfc;">
    <div style="border-bottom: 2px solid #047857; padding-bottom: 12px; margin-bottom: 20px;">
      <h1 style="color: #047857; font-size: 20px; margin: 0;">${siteConfig.name}</h1>
      <p style="color: #52635d; font-size: 13px; margin: 4px 0 0;">${siteConfig.tagline}</p>
    </div>
    <div style="font-size: 15px; line-height: 1.6;">${body}</div>
    <hr style="border: none; border-top: 1px solid #dde4e0; margin: 28px 0 16px;">
    <p style="color: #52635d; font-size: 12px; line-height: 1.5;">
      ${siteConfig.name}<br>
      ${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.postalCode}<br>
      ${siteConfig.phoneDisplay} · ${siteConfig.email}
    </p>
  </body></html>`;
}

export async function sendEmail(params: EmailParams): Promise<void> {
  const { to, subject, body, type, html = true } = params;
  const htmlBody = html ? wrapHtml(body) : body;

  try {
    // Check if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      // Real SMTP dispatch via Nodemailer (dynamically imported so the
      // dependency is only required when actually sending).
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT || "587", 10),
          secure: process.env.SMTP_SECURE === "true",
          auth: { user: smtpUser, pass: smtpPass },
        });
        await transporter.sendMail({
          from: process.env.SMTP_FROM || siteConfig.email,
          to,
          subject: `[${siteConfig.shortName}] ${subject}`,
          html: htmlBody,
        });
        await db.emailLog.create({
          data: { to, subject, body: htmlBody, type, status: "sent" },
        });
        console.log(`[email] sent to ${to}: ${subject}`);
        return;
      } catch (smtpErr: any) {
        await db.emailLog.create({
          data: { to, subject, body: htmlBody, type, status: "failed", error: smtpErr?.message ?? "SMTP error" },
        });
        console.error(`[email] SMTP failed for ${to}:`, smtpErr?.message);
        return;
      }
    }

    // No SMTP configured — log as "logged" (would-be-sent).
    // The admin Email Log view shows these so operators can see what WOULD
    // have been sent and manually follow up if needed.
    await db.emailLog.create({
      data: { to, subject, body: htmlBody, type, status: "logged" },
    });
    console.log(`[email] logged (no SMTP) to ${to}: ${subject}`);
  } catch (err) {
    // Even logging failed — never break the parent request
    console.error("[email] logging failed:", err);
  }
}

// Convenience helpers for common email types

export async function emailAdminNotification(subject: string, message: string) {
  await sendEmail({
    to: siteConfig.email,
    subject,
    body: `<p>${message}</p><p style="margin-top:16px"><a href="${siteConfig.url}/admin" style="color:#047857;">Open admin dashboard →</a></p>`,
    type: "admin_notification",
  });
}

export async function emailBookingConfirmation(booking: {
  name: string; email: string; service: string; preferredDate: string; preferredSlot: string; phone: string;
}) {
  const date = new Date(booking.preferredDate).toLocaleDateString("en-ZA", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const slotLabel = { morning: "Morning (07:00–12:00)", afternoon: "Afternoon (12:00–18:00)", anytime: "Flexible time" }[booking.preferredSlot] ?? booking.preferredSlot;
  await sendEmail({
    to: booking.email,
    subject: "Your booking request is received",
    body: `
      <p>Hi ${booking.name.split(" ")[0]},</p>
      <p>Thanks for booking with ${siteConfig.name}! We've received your request:</p>
      <table style="width:100%; border-collapse:collapse; margin:16px 0;">
        <tr><td style="padding:8px 12px; border:1px solid #dde4e0; font-weight:600;">Service</td><td style="padding:8px 12px; border:1px solid #dde4e0;">${booking.service}</td></tr>
        <tr><td style="padding:8px 12px; border:1px solid #dde4e0; font-weight:600;">Preferred date</td><td style="padding:8px 12px; border:1px solid #dde4e0;">${date}</td></tr>
        <tr><td style="padding:8px 12px; border:1px solid #dde4e0; font-weight:600;">Preferred time</td><td style="padding:8px 12px; border:1px solid #dde4e0;">${slotLabel}</td></tr>
      </table>
      <p>One of our team will call you on <strong>${booking.phone}</strong> within 1 business hour to confirm your slot.</p>
      <p>If you need to reach us sooner, call ${siteConfig.phoneDisplay}.</p>
      <p>Best regards,<br>The ${siteConfig.name} team</p>
    `,
    type: "booking_confirmation",
  });
}

export async function emailContactConfirmation(contact: {
  name: string; email: string;
}) {
  await sendEmail({
    to: contact.email,
    subject: "We've received your enquiry",
    body: `
      <p>Hi ${contact.name.split(" ")[0]},</p>
      <p>Thanks for reaching out to ${siteConfig.name}. We've received your enquiry and will respond within 1 business hour.</p>
      <p>If your request is urgent, call us on <strong>${siteConfig.phoneDisplay}</strong>.</p>
      <p>Best regards,<br>The ${siteConfig.name} team</p>
    `,
    type: "contact_confirmation",
  });
}

export async function emailReviewRequest(booking: {
  name: string; email: string; service: string;
}, reviewToken: string) {
  const reviewUrl = `${siteConfig.url}/review?t=${reviewToken}`;
  await sendEmail({
    to: booking.email,
    subject: "How did we do? Share your review",
    body: `
      <p>Hi ${booking.name.split(" ")[0]},</p>
      <p>We hope you're delighted with your ${booking.service.toLowerCase()} from ${siteConfig.name}!</p>
      <p>We'd love to hear your feedback — it takes 30 seconds and helps other Johannesburg homeowners choose us:</p>
      <p style="margin:20px 0;"><a href="${reviewUrl}" style="display:inline-block; background:#047857; color:#f0fdf4; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600;">Leave a review →</a></p>
      <p>Or copy this link: ${reviewUrl}</p>
      <p>Thank you for trusting us with your curtains.<br>The ${siteConfig.name} team</p>
    `,
    type: "review_request",
  });
}
