import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { BeforeAfterSlider } from "@/components/site/before-after-slider";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";
import { safeGetPublishedGallery } from "@/lib/db-safe";

export const metadata: Metadata = {
  title: "Before & After Gallery — Curtain Cleaning Results | JHB Curtain Cleaning",
  description:
    "See real before and after results from our Johannesburg curtain, upholstery, and rug cleaning. Drag the slider to reveal the transformation. No removal, no shrinkage.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Before & After Gallery | JHB Curtain Cleaning",
    description: "Drag the slider to see real curtain, upholstery, and rug cleaning transformations.",
  },
};

type Showcase = {
  id: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  title: string;
  location: string;
  service: string;
  description: string;
};

const staticShowcases: Showcase[] = [
  {
    id: "curtains-1",
    beforeSrc: "/gallery/curtains-1-before.jpg",
    afterSrc: "/gallery/curtains-1-after.jpg",
    beforeAlt: "Dusty, yellowed living room curtains before professional cleaning in a Johannesburg home",
    afterAlt: "The same living room curtains after on-site dry cleaning — bright, fresh, and dust-free",
    title: "Heavy lined living room drapes",
    location: "Sandton, JHB North",
    service: "Curtain & Blind Cleaning",
    description: "These floor-to-ceiling lined drapes hadn't been cleaned in 3 years. Our on-site dry extraction removed years of Highveld dust and restored the fabric's original vibrancy — without taking them down.",
  },
  {
    id: "upholstery-2",
    beforeSrc: "/gallery/upholstery-2-before.jpg",
    afterSrc: "/gallery/upholstery-2-after.jpg",
    beforeAlt: "Dull, stained sofa upholstery before deep extraction cleaning",
    afterAlt: "The same sofa after professional upholstery cleaning — colour restored and fresh",
    title: "Family lounge suite",
    location: "Roodepoort, JHB West",
    service: "Upholstery Cleaning",
    description: "A well-loved family sofa with ground-in dirt and pet hair. Our deep-extraction method lifted embedded grime and restored the fabric colour — dry and usable the same day.",
  },
  {
    id: "rug-3",
    beforeSrc: "/gallery/rug-3-before.jpg",
    afterSrc: "/gallery/rug-3-after.jpg",
    beforeAlt: "Faded, dirty Persian rug before specialist cleaning",
    afterAlt: "The same Persian rug after specialist cleaning — colours vibrant and refreshed",
    title: "Hand-woven Persian rug",
    location: "Rosebank, JHB Central",
    service: "Rug Care",
    description: "A treasured Persian rug with muted, dusty colours. Our fibre-specific, colour-safe hand-cleaning preserved the natural dyes and brought the intricate pattern back to life.",
  },
];

export default async function GalleryPage() {
  // Load DB-managed showcases; fall back to static defaults if none exist
  const dbItems = await safeGetPublishedGallery();
  const showcases = dbItems.length > 0
    ? dbItems.map((i) => ({
        id: i.id,
        beforeSrc: i.beforeImage,
        afterSrc: i.afterImage,
        beforeAlt: `${i.title} — before professional cleaning in ${i.location}`,
        afterAlt: `${i.title} — after professional cleaning in ${i.location}`,
        title: i.title,
        location: i.location,
        service: i.service,
        description: i.description,
      }))
    : staticShowcases;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Gallery", url: `${siteConfig.url}/gallery` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-metallic-emerald-deep">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-metallic-bronze-top/40 bg-metallic-emerald-deep/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-metallic-bronze-top"><Camera className="h-3.5 w-3.5" /> Before & After Gallery</span>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance text-metallic-ivory">
                Real results, real transformations
              </h1>
              <p className="mt-4 text-lg text-metallic-ivory/80">
                Drag the slider on each image to reveal the difference our on-site cleaning makes. No filters, no edits — just clean, fresh fabric.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-metallic-bronze-top text-metallic-emerald-deep hover:bg-metallic-bronze-bottom"><Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="border-metallic-ivory/40 bg-transparent text-metallic-ivory hover:bg-metallic-ivory/10"><Link href="/pricing">See pricing</Link></Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Showcase items */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {showcases.map((item, i) => (
              <Reveal key={item.id} delay={0.05}>
                <div className="grid gap-6 lg:grid-cols-5 lg:items-center">
                  <div className="lg:col-span-3">
                    <BeforeAfterSlider
                      beforeSrc={item.beforeSrc}
                      afterSrc={item.afterSrc}
                      beforeAlt={item.beforeAlt}
                      afterAlt={item.afterAlt}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <Badge variant="outline" className="mb-2 border-metallic-bronze-top/30 text-metallic-bronze-bottom">{item.service}</Badge>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep">{item.title}</h2>
                    <p className="mt-1 text-sm font-medium text-metallic-bronze-bottom">{item.location}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <p className="mt-4 text-xs text-muted-foreground">← Drag the handle on the image to compare →</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-metallic-cream py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
              {[
                { stat: "5,000+", label: "Curtains cleaned" },
                { stat: "4.9★", label: "Average rating" },
                { stat: "Zero", label: "Shrinkage incidents" },
                { stat: "Same day", label: "On-site service" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-metallic-emerald-deep sm:text-3xl">{s.stat}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-metallic-emerald-deep py-14 text-metallic-ivory sm:py-16">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl flex items-center justify-center gap-2 text-metallic-ivory">
              <Sparkles className="h-6 w-6" /> Ready for your transformation?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-metallic-ivory/80">
              Book a free on-site assessment and see the difference for yourself. No obligation, no hidden fees.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="bg-metallic-bronze-top text-metallic-emerald-deep hover:bg-metallic-bronze-bottom"><Link href="/contact">Get my free quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
