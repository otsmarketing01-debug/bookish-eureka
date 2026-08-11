import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/site/icon";
import { Reveal } from "@/components/site/reveal";
import { sectors, siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Commercial Curtain Cleaning Sectors",
  description:
    "Specialist on-site curtain cleaning for hotels, corporate offices, healthcare, education, theatres and residential properties across Johannesburg. SANS-certified, after-hours service.",
  alternates: { canonical: "/sectors" },
  openGraph: {
    title: "Commercial Curtain Cleaning Sectors | JHB Curtain Cleaning",
    description: "On-site curtain cleaning tailored to every sector: hotels, corporate, healthcare, education, theatres and homes.",
  },
};

export default function SectorsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Sectors", url: `${siteConfig.url}/sectors` },
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
            <span className="text-metallic-ivory">Sectors</span>
          </nav>
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-metallic-bronze-top/40 bg-metallic-emerald-deep/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-metallic-bronze-top">Who We Serve</span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-ivory text-balance sm:text-4xl lg:text-5xl">
              Curtain cleaning for every sector
            </h1>
            <p className="mt-4 text-lg text-metallic-ivory/80">
              From five-star hotels to family homes, we tailor our on-site curtain care to your environment — with minimal disruption and full compliance.
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild size="lg" className="h-12 bg-metallic-bronze-top text-base text-metallic-emerald-deep hover:bg-metallic-bronze-bottom">
                <Link href="/book">Book a Free Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors grid */}
      <section className="bg-metallic-ivory py-14 dark:bg-metallic-emerald-deep sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, i) => (
              <Reveal key={sector.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/sectors/${sector.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-metallic-bronze-top/20 bg-white p-6 transition-all hover:border-metallic-bronze-top/50 hover:shadow-lg dark:bg-card"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-metallic-bronze-top/15 text-metallic-bronze-bottom group-hover:bg-metallic-bronze-top group-hover:text-metallic-emerald-deep dark:text-metallic-bronze-top">
                    <Icon name={sector.icon} className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold text-metallic-emerald-deep group-hover:text-metallic-bronze-bottom dark:text-metallic-ivory">
                    {sector.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-metallic-slate dark:text-metallic-ivory/85">{sector.value}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-metallic-bronze-bottom group-hover:text-metallic-bronze-top dark:text-metallic-bronze-top">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
            <h2 className="font-display text-2xl font-bold tracking-tight text-metallic-ivory sm:text-3xl">Need a commercial quote?</h2>
            <p className="mx-auto mt-3 max-w-xl text-metallic-ivory/80">
              Hotels, offices and venues get volume pricing and after-hours service. Request a tailored commercial assessment.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-metallic-bronze-top text-metallic-emerald-deep hover:bg-metallic-bronze-bottom">
                <Link href="/book">Request Commercial Quote</Link>
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
