import Link from "next/link";
import type { Metadata } from "next";
import { Star, Quote, ArrowRight, MapPin, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { testimonials, siteConfig, areas } from "@/lib/config";
import { breadcrumbSchema, aggregateReviewSchema } from "@/lib/seo";
import { getApprovedReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | JHB Curtain Cleaning Johannesburg",
  description:
    "Read verified reviews from 5,000+ satisfied Johannesburg curtain cleaning customers across Sandton, Randburg, Roodepoort, Fourways and more. Rated 4.9 stars.",
  alternates: { canonical: "/testimonials" },
};

const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const colors = ["bg-emerald-500", "bg-teal-600", "bg-cyan-600", "bg-green-600", "bg-emerald-700", "bg-teal-700"];

export default async function TestimonialsPage() {
  const customerReviews = await getApprovedReviews(12);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Testimonials", url: `${siteConfig.url}/testimonials` },
            ])
          ),
        }}
      />
      {/* Aggregate rating + review schema for rich search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            aggregateReviewSchema(customerReviews.map((r) => ({
              name: r.name,
              rating: r.rating,
              title: r.title,
              body: r.body,
              service: r.service,
              createdAt: r.createdAt,
            })))
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-radial-emerald">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 gap-1.5"><Award className="h-3.5 w-3.5" /> Customer Reviews</Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                Loved by 5,000+ Johannesburg customers
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Real reviews from real homes and businesses across Gauteng. Here's what our customers say about their on-site curtain cleaning experience.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-lg font-bold">{siteConfig.rating.value}</span>
                <span className="text-sm text-muted-foreground">/ 5 · {siteConfig.rating.count.toLocaleString()}+ reviews</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <Card className="break-inside-avoid transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Quote className="h-8 w-8 text-primary/30" />
                      <div className="flex">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/90">{t.text}</p>
                    <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${colors[i % colors.length]} text-sm font-bold text-white`}>
                        {initials(t.name)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {t.area}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Verified customer reviews from DB */}
      {customerReviews.length > 0 && (
        <section className="bg-muted/30 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Badge variant="secondary" className="mb-3 gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Verified Customer Reviews</Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Recent reviews from real bookings</h2>
                <p className="mt-2 text-sm text-muted-foreground">Submitted by customers after their completed cleaning. Verified against booking records.</p>
              </div>
            </Reveal>
            <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
              {customerReviews.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 0.08}>
                  <Card className="break-inside-avoid transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <Quote className="h-8 w-8 text-primary/30" />
                        <div className="flex">
                          {Array.from({ length: r.rating }).map((_, j) => (
                            <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-semibold">{r.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{r.body}</p>
                      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${colors[i % colors.length]} text-sm font-bold text-white`}>
                          {initials(r.name)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{r.name}</p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            {r.area ? <><MapPin className="h-3 w-3" /> {r.area} ·</> : null}
                            <span className="truncate">{r.service}</span>
                          </p>
                        </div>
                        <Badge variant="outline" className="shrink-0 gap-1 border-success/30 bg-success/10 text-success">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Coverage */}
      <section className="bg-muted/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Trusted across Johannesburg</h2>
              <p className="mt-2 text-sm text-muted-foreground">We proudly serve all these areas and more.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {areas.map((a) => (
                <Button key={a.slug} asChild variant="outline" size="sm">
                  <Link href={`/areas/${a.slug}`}>{a.suburb}</Link>
                </Button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Join 5,000+ satisfied customers</h2>
            <p className="mt-3 text-muted-foreground">Experience the on-site, no-shrinkage difference for yourself.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/book">Book a Free Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/review">Leave a review ⭐</Link></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
