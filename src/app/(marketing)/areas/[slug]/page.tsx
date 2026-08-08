import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, ArrowRight, ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/site/icon";
import { Reveal } from "@/components/site/reveal";
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
  return {
    title: `Curtain Cleaning ${area.suburb} | ${area.region} | JHB Curtain Cleaning`,
    description: `Professional on-site curtain cleaning in ${area.suburb}, ${area.region}. ${area.painPoint} No removal, no shrinkage. Free assessment.`,
    alternates: { canonical: `/areas/${area.slug}` },
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
      <section className="relative overflow-hidden bg-radial-emerald">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#areas" className="hover:text-foreground">Areas</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{area.region}</span>
          </nav>
          <Badge variant="secondary" className="mt-6 gap-1.5"><MapPin className="h-3.5 w-3.5" /> {area.region}</Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Curtain Cleaning {area.suburb}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{area.painPoint}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><a href={`tel:${siteConfig.phone}`}><Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}</a></Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Why {area.suburb} customers choose us</h2>
                <p className="mt-3 text-muted-foreground">
                  We know {area.region}. The local dust, pollen, and environmental factors mean curtains here need specialist care. Our on-site dry extraction removes the grime without the shrinkage risk of wet cleaning.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "On-site cleaning — no removal, no transport",
                    "Zero shrinkage — safe for all fabrics",
                    "Fast turnaround — same-day usable",
                    "Local {suburb} technicians who know the area".replace("{suburb}", area.suburb),
                    "Free, no-obligation assessment",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold">Services in {area.suburb}</h3>
                  <div className="mt-4 space-y-3">
                    {services.slice(0, 4).map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-all hover:border-primary/40">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon name={s.icon} className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm font-medium group-hover:text-primary">{s.name}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold tracking-tight">Other areas we serve</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {areas.filter((a) => a.slug !== slug).map((a) => (
              <Button key={a.slug} asChild variant="outline" size="sm">
                <Link href={`/areas/${a.slug}`}>{a.region}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
