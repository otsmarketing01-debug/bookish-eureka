import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2, ArrowRight, ChevronRight, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icon } from "@/components/site/icon";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { ServiceAreaLinks } from "@/components/site/service-area-links";
import { SectorServiceLinks } from "@/components/site/service-sector-links";
import { ServiceBlogPosts } from "@/components/site/service-blog-posts";
import { ServiceReviews } from "@/components/site/service-reviews";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { services, getService, siteConfig } from "@/lib/config";
import { serviceWithReviewsSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { safeGetApprovedReviewsByService } from "@/lib/db-safe";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  const ogImage = `/services/${service.slug}.jpg`;
  return {
    title: `${service.name} Johannesburg | On-Site | No Removal | JHB Curtain Cleaning`,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} Johannesburg | JHB Curtain Cleaning`,
      description: service.description,
      images: [{ url: ogImage, width: 1344, height: 768, alt: `${service.name} — professional on-site cleaning in Johannesburg` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} Johannesburg`,
      description: service.description,
      images: [ogImage],
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const offers = service.features.slice(0, 3).map((f) => ({ name: f, price: service.priceFrom }));

  // Fetch service-specific approved reviews for the schema + display
  const serviceReviews = await safeGetApprovedReviewsByService(service.name, 10);
  const reviewsForSchema = serviceReviews.map((r) => ({
    name: r.name,
    rating: r.rating,
    title: r.title,
    body: r.body,
    service: r.service,
    createdAt: r.createdAt,
  }));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceWithReviewsSchema({ name: service.name, description: service.description, priceFrom: service.priceFrom, offers }, reviewsForSchema)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Services", url: `${siteConfig.url}/#services` },
              { name: service.name, url: `${siteConfig.url}/services/${service.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-metallic-emerald-deep">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-metallic-ivory/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-metallic-bronze-top">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#services" className="hover:text-metallic-bronze-top">Services</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-metallic-ivory">{service.name}</span>
          </nav>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-metallic-bronze-top text-metallic-emerald-deep shadow-sm">
                  <Icon name={service.icon} className="h-7 w-7" />
                </span>
                <Badge variant="outline" className="border-metallic-bronze-top/50 bg-metallic-emerald-deep/60 px-3 py-1 text-sm font-mono font-semibold text-metallic-bronze-top">from {service.priceFrom}</Badge>
              </div>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-metallic-ivory sm:text-4xl lg:text-5xl">{service.name} Johannesburg</h1>
              <p className="mt-4 text-lg text-metallic-ivory/80">{service.description}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 bg-metallic-bronze-top text-base text-metallic-emerald-deep hover:bg-metallic-bronze-bottom"><Link href="#quote">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <WhatsAppCTA
                  message={`Hi, I'm interested in ${service.name} (${service.priceFrom}). Can you give me a quote?`}
                  variant="outline"
                  size="lg"
                />
              </div>
            </div>
            {/* Service cover image */}
            <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-metallic-bronze-top/30 shadow-2xl lg:w-80">
              <Image
                src={`/services/${service.slug}.jpg`}
                alt={`${service.name} — professional on-site cleaning in Johannesburg`}
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
      {service.answerBlock && (
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="rounded-xl border border-metallic-bronze-top/30 bg-metallic-cream dark:bg-metallic-emerald-deep/90 p-6">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">
                  <CheckCircle2 className="h-5 w-5 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /> Quick Answer
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.answerBlock}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="bg-metallic-ivory dark:bg-metallic-emerald-deep py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">What's Included</span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">What's included</h2>
                <p className="mt-2 text-muted-foreground">Every {service.name.toLowerCase()} job includes:</p>
              </Reveal>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.features.map((f, i) => (
                  <Reveal key={f} delay={(i % 2) * 0.05}>
                    <div className="flex items-start gap-2.5 rounded-lg border border-metallic-bronze-top/20 bg-white dark:bg-card p-4 transition-all hover:border-metallic-bronze-top/50">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-metallic-bronze-bottom dark:text-metallic-bronze-top" />
                      <span className="text-sm font-medium text-metallic-slate dark:text-metallic-ivory/85">{f}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <Reveal delay={0.1}>
                <Card className="sticky top-24 border-metallic-bronze-top/30 bg-metallic-emerald-deep text-metallic-ivory">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display"><ShieldCheck className="h-5 w-5 text-metallic-bronze-top" /> Our guarantee</CardTitle>
                    <CardDescription className="text-metallic-ivory/60">Peace of mind on every job.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2 text-metallic-ivory/85"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-metallic-bronze-top" /> No-shrinkage guarantee</div>
                    <div className="flex items-start gap-2 text-metallic-ivory/85"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-metallic-bronze-top" /> Fixed all-inclusive pricing</div>
                    <div className="flex items-start gap-2 text-metallic-ivory/85"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-metallic-bronze-top" /> Certified, insured technicians</div>
                    <div className="flex items-start gap-2 text-metallic-ivory/85"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-metallic-bronze-top" /> Satisfaction guaranteed</div>
                    <Button asChild className="mt-3 w-full bg-metallic-bronze-top text-metallic-emerald-deep hover:bg-metallic-bronze-bottom"><Link href="#quote">Get a Free Quote</Link></Button>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors we serve + related articles */}
      <section className="bg-muted/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <SectorServiceLinks />
            </Reveal>
            <Reveal delay={0.1}>
              <ServiceBlogPosts serviceName={service.name} serviceFeatures={service.features} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="bg-metallic-ivory dark:bg-metallic-emerald-deep py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <span className="block text-center font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">FAQ</span>
              <h2 className="mt-3 text-center font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory sm:text-3xl">{service.name} — your questions answered</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8"><FaqAccordion items={service.faqs} /></div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Service-specific verified reviews */}
      <ServiceReviews serviceName={service.name} />

      {/* Quote */}
      <section id="quote" className="relative scroll-mt-20 overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 bg-metallic-cream dark:bg-metallic-emerald-deep/90" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Free Assessment</span>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory sm:text-3xl">Get your free {service.name.toLowerCase()} quote</h2>
              <p className="mt-3 text-muted-foreground">Fill in the form and we'll respond within 1 business hour.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-8 border-metallic-bronze-top/30 shadow-xl">
              <CardContent className="p-6">
                <ContactForm compact />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="border-t border-metallic-bronze-top/20 bg-metallic-emerald-deep py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-xl font-bold tracking-tight text-metallic-ivory">Explore our other services</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {services.filter((s) => s.slug !== slug).slice(0, 4).map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-lg border border-metallic-bronze-top/20 bg-metallic-emerald-deep/60 p-4 transition-all hover:border-metallic-bronze-top/50 hover:bg-metallic-emerald-deep">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-metallic-bronze-top/15 text-metallic-bronze-top group-hover:bg-metallic-bronze-top group-hover:text-metallic-emerald-deep">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-metallic-ivory group-hover:text-metallic-bronze-top">{s.name}</p>
                      <p className="text-xs text-metallic-ivory/50">from {s.priceFrom}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-metallic-bronze-top transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <ServiceAreaLinks />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
