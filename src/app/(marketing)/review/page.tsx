import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { ReviewForm } from "@/components/site/review-form";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";
import { verifyReviewToken } from "@/lib/review-token";
import { db } from "@/lib/db";
import { ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Leave a Review | JHB Curtain Cleaning Johannesburg",
  description:
    "Share your experience with JHB Curtain Cleaning. Your review helps other Johannesburg homeowners choose a trusted curtain cleaning service.",
  alternates: { canonical: "/review" },
  openGraph: {
    title: "Leave a Review | JHB Curtain Cleaning",
    description: "Share your curtain cleaning experience. Reviews help other Johannesburg homeowners.",
  },
};

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string; service?: string }>;
}) {
  const params = await searchParams;
  const token = params.t;
  const initialService = params.service;

  // Validate token server-side
  let verifiedBooking: { service: string; name: string; area?: string | null } | null = null;
  let tokenStatus: "valid" | "invalid" | "not_completed" | "already_reviewed" | null = null;

  if (token) {
    const bookingId = verifyReviewToken(token);
    if (bookingId) {
      const booking = await db.booking.findUnique({ where: { id: bookingId } });
      if (booking && booking.status === "completed") {
        const existing = await db.review.findFirst({ where: { bookingId } });
        if (existing) {
          tokenStatus = "already_reviewed";
        } else {
          verifiedBooking = { service: booking.service, name: booking.name, area: booking.area };
          tokenStatus = "valid";
        }
      } else if (booking) {
        tokenStatus = "not_completed";
      } else {
        tokenStatus = "invalid";
      }
    } else {
      tokenStatus = "invalid";
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Review", url: `${siteConfig.url}/review` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-radial-emerald">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 gap-1.5">⭐ Leave a Review</Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                How did we do?
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                We'd love to hear about your experience. Your honest review helps other Johannesburg homeowners trust us with their curtains.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            {tokenStatus === "invalid" && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <p className="font-semibold text-destructive">Invalid review link</p>
                  <p className="mt-0.5 text-muted-foreground">This review link is invalid or has expired. If you believe this is an error, please contact us and we'll send a new one.</p>
                </div>
              </div>
            )}
            {tokenStatus === "not_completed" && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                <div>
                  <p className="font-semibold text-warning">Booking not yet completed</p>
                  <p className="mt-0.5 text-muted-foreground">You'll be able to leave a review once your cleaning has been completed. We'll email you a review link then.</p>
                </div>
              </div>
            )}
            {tokenStatus === "already_reviewed" && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-info/30 bg-info/10 p-4 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-info" />
                <div>
                  <p className="font-semibold text-info">Review already submitted</p>
                  <p className="mt-0.5 text-muted-foreground">Thank you! A review has already been submitted for this booking. You can still submit a general review below if you'd like.</p>
                </div>
              </div>
            )}
            {tokenStatus === "valid" && (
              <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-success/30 bg-success/10 p-4 text-sm">
                <ShieldCheck className="h-5 w-5 shrink-0 text-success" />
                <p className="font-medium text-success">Verified booking — your review is linked to your completed service.</p>
              </div>
            )}
            <ReviewForm initialService={initialService} token={token} verifiedBooking={verifiedBooking} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
