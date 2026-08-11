import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { areas, siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Curtain Cleaning Areas Johannesburg",
  description:
    "On-site curtain cleaning across all Johannesburg areas: Sandton, Fourways, Roodepoort, Edenvale, Rosebank, Pretoria and Midrand. Free assessment, no shrinkage.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: "Curtain Cleaning Areas Johannesburg | JHB Curtain Cleaning",
    description: "Professional on-site curtain cleaning serving every Johannesburg region, from Sandton to Pretoria. Free assessment.",
  },
};

export default function AreasIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Areas", url: `${siteConfig.url}/areas` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-metallic-emerald-deep">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-metallic-ivory/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-metallic-bronze-top">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-metallic-ivory">Areas</span>
          </nav>
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-metallic-bronze-top/40 bg-metallic-emerald-deep/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-metallic-bronze-top"><MapPin className="h-3.5 w-3.5" /> Areas We Cover</span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-ivory text-balance sm:text-4xl lg:text-5xl">
              Curtain cleaning across all of Johannesburg
            </h1>
            <p className="mt-4 text-lg text-metallic-ivory/80">
              We understand the unique cleaning challenges of each region — from Highveld dust to leafy-suburb pollen. On-site service, no removal, no shrinkage.
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild size="lg" className="h-12 bg-metallic-bronze-top text-base text-metallic-emerald-deep hover:bg-metallic-bronze-bottom">
                <Link href="/book">Book a Free Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Areas grid */}
      <section className="bg-metallic-ivory py-14 dark:bg-metallic-emerald-deep sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => (
              <Reveal key={area.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="group block h-full rounded-xl border border-metallic-bronze-top/20 bg-white p-6 transition-all hover:border-metallic-bronze-top/50 hover:shadow-lg dark:bg-card"
                >
                  <div className="flex items-center gap-2 text-metallic-bronze-bottom dark:text-metallic-bronze-top">
                    <MapPin className="h-4 w-4" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest">{area.region}</span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold text-metallic-emerald-deep group-hover:text-metallic-bronze-bottom dark:text-metallic-ivory">
                    Curtain Cleaning {area.suburb}
                  </h2>
                  <p className="mt-2 text-sm text-metallic-slate dark:text-metallic-ivory/85">{area.painPoint}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-metallic-bronze-bottom group-hover:text-metallic-bronze-top dark:text-metallic-bronze-top">
                    View area <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-metallic-emerald-deep py-14 sm:py-16">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-metallic-ivory sm:text-3xl">In another suburb?</h2>
            <p className="mx-auto mt-3 max-w-xl text-metallic-ivory/80">
              We serve the whole of Greater Johannesburg and Gauteng. Call us — chances are we already cover your area.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-metallic-bronze-top text-metallic-emerald-deep hover:bg-metallic-bronze-bottom">
                <Link href="/book">Book a Free Assessment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-metallic-ivory/40 bg-transparent text-metallic-ivory hover:bg-metallic-ivory/10">
                <a href={`tel:${siteConfig.phone}`}>Call {siteConfig.phoneDisplay}</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
