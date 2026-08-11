import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, ArrowRight, ChevronRight, Phone, CheckCircle2, Cloud, Wind, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/site/icon";
import { Reveal } from "@/components/site/reveal";
import { ServiceAreaLinks } from "@/components/site/service-area-links";
import { areas, getArea, services, siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return { title: "Area not found" };
  const ogImage = `/areas/${area.slug}.jpg`;
  return {
    title: `${area.h1} | On-Site | No Shrinkage | JHB Curtain Cleaning`,
    description: area.intro.slice(0, 155),
    alternates: { canonical: `/areas/${area.slug}` },
    keywords: area.suburbs?.flatMap((s) => s.keywords) ?? [],
    openGraph: {
      title: `${area.h1} | JHB Curtain Cleaning`,
      description: area.intro.slice(0, 155),
      images: [{ url: ogImage, width: 1344, height: 768, alt: `Curtain cleaning in ${area.suburb}, ${area.region}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: area.h1,
      images: [ogImage],
    },
  };
}

export default async function AreaPage({ params }: Params) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Areas", url: `${siteConfig.url}/#areas` },
              { name: area.region, url: `${siteConfig.url}/areas/${area.slug}` },
            ])
          ),
        }}
      />
      <section className="relative overflow-hidden bg-metallic-emerald-deep">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-metallic-ivory/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-metallic-bronze-top">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#areas" className="hover:text-metallic-bronze-top">Areas</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-metallic-ivory">{area.region}</span>
          </nav>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-metallic-bronze-top/40 bg-metallic-emerald-deep/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-metallic-bronze-top"><MapPin className="h-3.5 w-3.5" /> {area.region}</span>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-ivory text-balance sm:text-4xl lg:text-5xl">
                {area.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-metallic-ivory/80">{area.intro}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 bg-metallic-bronze-top text-base text-metallic-emerald-deep hover:bg-metallic-bronze-bottom"><Link href="/book">Book a Free Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-metallic-ivory/40 bg-transparent text-metallic-ivory hover:bg-metallic-ivory/10 hover:text-metallic-ivory">
                  <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'd like a curtain cleaning quote in ${area.suburb}.`)}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
            {/* Area cover image */}
            <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-metallic-bronze-top/30 shadow-2xl lg:w-80">
              <Image
                src={`/areas/${area.slug}.jpg`}
                alt={`Curtain cleaning in ${area.suburb}, ${area.region}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* AEO Answer Block */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-xl border border-metallic-bronze-top/30 bg-metallic-cream dark:bg-metallic-emerald-deep/90 p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">
                <CheckCircle2 className="h-5 w-5 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /> Quick Answer
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.answerBlock}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Environmental factors */}
      <section className="bg-metallic-ivory dark:bg-metallic-emerald-deep py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Why {area.region}</span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">Why {area.region} curtains need specialist care</h2>
                <p className="mt-3 text-muted-foreground">
                  The Highveld plateau creates unique environmental challenges for soft furnishings. {area.suburb} and surrounding suburbs face specific soil loads that generic cleaners miss. Our mobile solvent dry-cleaning was built for these conditions.
                </p>
                <ul className="mt-5 space-y-3">
                  {area.environmentalFactors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-metallic-bronze-bottom dark:text-metallic-bronze-top" />
                      <span className="text-sm text-metallic-slate dark:text-metallic-ivory/85">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border border-metallic-bronze-top/20 bg-white dark:bg-card"><CardContent className="p-5 text-center"><Wind className="mx-auto h-8 w-8 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /><p className="mt-2 text-sm font-medium text-metallic-emerald-deep dark:text-metallic-ivory">Highveld Dust</p><p className="text-xs text-muted-foreground">Silica & pollen</p></CardContent></Card>
                <Card className="border border-metallic-bronze-top/20 bg-white dark:bg-card"><CardContent className="p-5 text-center"><Sun className="mx-auto h-8 w-8 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /><p className="mt-2 text-sm font-medium text-metallic-emerald-deep dark:text-metallic-ivory">UV Exposure</p><p className="text-xs text-muted-foreground">Fabric fading</p></CardContent></Card>
                <Card className="border border-metallic-bronze-top/20 bg-white dark:bg-card"><CardContent className="p-5 text-center"><Cloud className="mx-auto h-8 w-8 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /><p className="mt-2 text-sm font-medium text-metallic-emerald-deep dark:text-metallic-ivory">Dry Winters</p><p className="text-xs text-muted-foreground">Concentrated grime</p></CardContent></Card>
                <Card className="border border-metallic-bronze-top/20 bg-metallic-emerald-deep"><CardContent className="p-5 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-metallic-bronze-top" /><p className="mt-2 text-sm font-medium text-metallic-ivory">Zero Shrinkage</p><p className="text-xs text-metallic-ivory/60">Waterless process</p></CardContent></Card>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Suburb silos */}
      {area.suburbs && area.suburbs.length > 0 && (
        <section className="bg-metallic-cream dark:bg-metallic-emerald-deep/90 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Suburbs</span>
              <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">Suburbs we serve in {area.region}</h2>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {area.suburbs.map((sub, i) => (
                <Reveal key={sub.slug} delay={(i % 3) * 0.06}>
                  <Card className="h-full border border-metallic-bronze-top/20 bg-white dark:bg-card">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-metallic-bronze-bottom dark:text-metallic-bronze-top" />
                        <h3 className="font-display font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">{sub.name}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{sub.focus}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services in this area */}
      <section className="bg-metallic-ivory dark:bg-metallic-emerald-deep py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Services</span>
            <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">Services available in {area.suburb}</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-lg border border-metallic-bronze-top/20 bg-white dark:bg-card p-4 transition-all hover:border-metallic-bronze-top/50 hover:shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-metallic-bronze-top/15 text-metallic-bronze-bottom dark:text-metallic-bronze-top group-hover:bg-metallic-bronze-top group-hover:text-metallic-emerald-deep">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-metallic-slate dark:text-metallic-ivory/85 group-hover:text-metallic-emerald-deep">{s.name}</p>
                  <p className="text-xs text-muted-foreground">from {s.priceFrom}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-metallic-bronze-top transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other areas */}
      <section className="border-t border-metallic-bronze-top/20 bg-metallic-emerald-deep py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-lg font-bold tracking-tight text-metallic-ivory">Other areas we serve</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {areas.filter((a) => a.slug !== slug).map((a) => (
              <Button key={a.slug} asChild variant="outline" size="sm" className="border-metallic-bronze-top/40 text-metallic-bronze-top hover:bg-metallic-bronze-top hover:text-metallic-emerald-deep">
                <Link href={`/areas/${a.slug}`}>{a.region}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
