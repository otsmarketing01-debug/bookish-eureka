import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { ReviewForm } from "@/components/site/review-form";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

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
  // Token `t` would map to a booking in a full implementation; for now we
  // pass through the service if provided.
  const initialService = params.service;

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
            <ReviewForm initialService={initialService} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
