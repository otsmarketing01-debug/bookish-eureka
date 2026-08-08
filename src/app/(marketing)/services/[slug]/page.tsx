import Link from "next/link";
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
import { services, getService, siteConfig } from "@/lib/config";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.name} Johannesburg | On-Site | No Removal | JHB Curtain Cleaning`,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const offers = service.features.slice(0, 3).map((f) => ({ name: f, price: service.priceFrom }));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service.name, service.description, service.priceFrom, offers)) }} />
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
      <section className="relative overflow-hidden bg-radial-emerald">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#services" className="hover:text-foreground">Services</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{service.name}</span>
          </nav>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                  <Icon name={service.icon} className="h-7 w-7" />
                </span>
                <Badge variant="outline" className="px-3 py-1 text-sm font-semibold text-primary">from {service.priceFrom}</Badge>
              </div>
              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{service.name} Johannesburg</h1>
              <p className="mt-4 text-lg text-muted-foreground">{service.description}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><Link href="#quote">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline"><a href={`tel:${siteConfig.phone}`}><Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}</a></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight">What's included</h2>
                <p className="mt-2 text-muted-foreground">Every {service.name.toLowerCase()} job includes:</p>
              </Reveal>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.features.map((f, i) => (
                  <Reveal key={f} delay={(i % 2) * 0.05}>
                    <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <Reveal delay={0.1}>
                <Card className="sticky top-24 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Our guarantee</CardTitle>
                    <CardDescription>Peace of mind on every job.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> No-shrinkage guarantee</div>
                    <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> Fixed all-inclusive pricing</div>
                    <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> Certified, insured technicians</div>
                    <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> Satisfaction guaranteed</div>
                    <Button asChild className="mt-3 w-full"><Link href="#quote">Get a Free Quote</Link></Button>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="bg-muted/30 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">{service.name} — your questions answered</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8"><FaqAccordion items={service.faqs} /></div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Quote */}
      <section id="quote" className="scroll-mt-20 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get your free {service.name.toLowerCase()} quote</h2>
              <p className="mt-3 text-muted-foreground">Fill in the form and we'll respond within 1 business hour.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-8">
              <CardContent className="p-6">
                <ContactForm compact />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="border-t border-border bg-muted/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight">Explore our other services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter((s) => s.slug !== slug).slice(0, 3).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-medium group-hover:text-primary">{s.name}</p>
                  <p className="text-xs text-muted-foreground">from {s.priceFrom}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
