import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/site/icon";
import { Reveal } from "@/components/site/reveal";
import { ServiceAreaLinks } from "@/components/site/service-area-links";
import { ServiceSectorLinks } from "@/components/site/service-sector-links";
import { sectors, getSector, siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return { title: "Sector not found" };
  const ogImage = `/sectors/${sector.slug}.jpg`;
  return {
    title: `${sector.name} Curtain Cleaning Johannesburg`,
    description: `${sector.value} Specialist on-site curtain cleaning for ${sector.name.toLowerCase()} in Johannesburg.`,
    alternates: { canonical: `/sectors/${sector.slug}` },
    openGraph: {
      title: `${sector.name} Curtain Cleaning Johannesburg | JHB Curtain Cleaning`,
      description: sector.value,
      images: [{ url: ogImage, width: 1344, height: 768, alt: `${sector.name} curtain cleaning in Johannesburg` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sector.name} Curtain Cleaning Johannesburg`,
      images: [ogImage],
    },
  };
}

export default async function SectorPage({ params }: Params) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Sectors", url: `${siteConfig.url}/#sectors` },
              { name: sector.name, url: `${siteConfig.url}/sectors/${sector.slug}` },
            ])
          ),
        }}
      />
      <section className="relative overflow-hidden bg-metallic-emerald-deep">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-metallic-ivory/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-metallic-ivory">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#sectors" className="hover:text-metallic-ivory">Sectors</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-metallic-ivory">{sector.name}</span>
          </nav>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-metallic-bronze-top text-metallic-emerald-deep shadow-sm">
                  <Icon name={sector.icon} className="h-8 w-8" />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-top">Sector</span>
              </div>
              <h1 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-metallic-ivory">
                {sector.name} Curtain Cleaning Johannesburg
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-metallic-ivory/80">{sector.value}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-metallic-bronze-top text-metallic-emerald-deep hover:bg-metallic-bronze-bottom"><Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="border-metallic-ivory/40 bg-transparent text-metallic-ivory hover:bg-metallic-ivory/10"><a href={`tel:${siteConfig.phone}`}><Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}</a></Button>
              </div>
            </div>
            {/* Sector cover image */}
            <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-metallic-ivory/20 shadow-lg lg:w-80">
              <Image
                src={`/sectors/${sector.slug}.jpg`}
                alt={`${sector.name} curtain cleaning in Johannesburg`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">Tailored for {sector.name.toLowerCase()}</h2>
                <p className="mt-3 text-muted-foreground">
                  {sector.name} environments have specific cleaning requirements. We adapt our process, scheduling, and compliance to fit — whether that means after-hours service, fire-safety certification, or hygiene-critical sanitisation.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Flexible scheduling — including after-hours",
                    "Compliant with health & safety standards",
                    "Minimal disruption to your operations",
                    "Volume discounts for multi-site clients",
                    "Detailed job reports on request",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-metallic-bronze-bottom dark:text-metallic-bronze-top" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="border border-metallic-bronze-top/20 bg-metallic-cream dark:bg-metallic-emerald-deep">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">Request a commercial quote</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tell us about your premises and we'll prepare a tailored proposal.
                  </p>
                  <div className="mt-4 space-y-3">
                    <Button asChild className="w-full"><Link href="/contact">Contact us</Link></Button>
                    <Button asChild variant="outline" className="w-full"><a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a></Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-metallic-cream dark:bg-metallic-emerald-deep py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="font-display mb-4 text-lg font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">Other sectors we serve</h2>
              <div className="flex flex-wrap gap-2">
                {sectors.filter((s) => s.slug !== slug).map((s) => (
                  <Button key={s.slug} asChild variant="outline" size="sm">
                    <Link href={`/sectors/${s.slug}`}>{s.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <ServiceSectorLinks />
            </div>
            <div className="lg:col-span-1">
              <ServiceAreaLinks heading="Serving all Johannesburg areas" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
