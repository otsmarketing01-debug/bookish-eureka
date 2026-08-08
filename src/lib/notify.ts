import { db } from "@/lib/db";

// Centralised admin notification creator.
// In production this would also dispatch an email via SMTP/SendGrid;
// here we persist to DB for the in-app bell + are architected to add email later.
export async function notify(opts: {
  type: "lead" | "chat" | "newsletter" | "system";
  title: string;
  message: string;
  link?: string;
}) {
  try {
    await db.adminNotification.create({
      data: {
        type: opts.type,
        title: opts.title,
        message: opts.message,
        link: opts.link ?? null,
      },
    });
    // TODO (production): dispatch real email to siteConfig.email here.
    // e.g. await sendEmail({ to: siteConfig.email, subject: opts.title, body: opts.message })
  } catch (e) {
    // Notifications are best-effort — never fail the parent request
    console.error("[notify] failed:", e);
  }
}
