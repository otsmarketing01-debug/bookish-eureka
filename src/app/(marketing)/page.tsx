import Link from "next/link";
import { Star, Phone, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Clock, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/site/icon";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { services, areas, sectors, processSteps, testimonials, siteConfig } from "@/lib/config";
import { localBusinessSchema, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { HomepageReviews } from "@/components/site/homepage-reviews";
import Image from "next/image";

const homeFaqs = [
  { q: "Will my curtains shrink?", a: "No. Our dry-cleaning process uses zero water, which means zero shrinkage risk — even on cotton, linen, and lined drapes." },
  { q: "Do I need to take my curtains down?", a: "No. We clean your curtains exactly where they hang, so there's no removal, transport, or rehanging hassle." },
  { q: "How long does on-site cleaning take?", a: "A typical lounge takes 60–90 minutes and bedrooms 30–45 minutes each. Rooms are usable the same day." },
  { q: "Which areas do you cover?", a: "All Johannesburg suburbs including Sandton, Randburg, Fourways, Roodepoort, Edenvale, Alberton, Rosebank, plus Pretoria and Midrand." },
  { q: "Do you offer a guarantee?", a: "Yes — we offer a no-shrinkage guarantee and a satisfaction guarantee. If you're not happy, we'll put it right." },
  { q: "Can you clean delicate fabrics like silk and velvet?", a: "Absolutely. Our technicians are trained on fabric-specific methods for voiles, sheers, silk blends, velvet, and lined drapes." },
  { q: "Do you service commercial clients?", a: "Yes — hotels, offices, healthcare, education, and theatres. We offer after-hours service to avoid disruption." },
  { q: "How do I get a quote?", a: "Call us or fill in the contact form for a free, no-obligation on-site assessment with a fixed all-inclusive quote." },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: siteConfig.url }])) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-curtains.jpg"
            alt="Freshly cleaned sheer curtains in a bright Johannesburg living room"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <Badge variant="secondary" className="mb-4 gap-1.5 rounded-full border-success/30 bg-success/10 px-3 py-1 text-success">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  No removal · No shrinkage · Free assessment
                </Badge>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Professional <span className="text-primary">Curtain Cleaning</span> Johannesburg
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                  On-site dry cleaning that leaves your curtains spotless — exactly where they hang. No removal, no shrinkage, no disruption to your home or business.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 text-base">
                    <Link href="/contact">
                      Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 text-base">
                    <a href={`tel:${siteConfig.phone}`}>
                      <Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-medium text-foreground">{siteConfig.rating.value}</span>
                    <span>({siteConfig.rating.count.toLocaleString()}+ reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    15+ years experience
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Same-day service
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Hero card / quick quote */}
            <Reveal delay={0.2}>
              <Card className="border-primary/20 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Get your free quote</CardTitle>
                  <CardDescription>
                    Tell us what needs cleaning. We'll respond within 1 business hour.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm compact />
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { stat: 5000, suffix: "+", label: "Curtains cleaned" },
            { stat: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
            { stat: 100, suffix: "%", label: "No-shrinkage guarantee" },
            { stat: 0, suffix: "", label: "Same-day service", textValue: "Same day" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary sm:text-3xl">
                  {s.textValue ?? <AnimatedCounter value={s.stat} suffix={s.suffix} decimals={s.decimals ?? 0} />}
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">Our Services</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Complete fabric care for homes & businesses
              </h2>
              <p className="mt-4 text-muted-foreground">
                From delicate sheers to heavy hotel drapes, we clean it all — on-site, without removal.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-40 overflow-hidden bg-muted">
                    <Image
                      src={`/services/${service.slug}.jpg`}
                      alt={`${service.name} — professional on-site cleaning in Johannesburg`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 text-primary shadow-sm backdrop-blur-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>
                    <Badge variant="outline" className="absolute right-3 top-3 bg-background/90 font-semibold text-primary backdrop-blur-sm">from {service.priceFrom}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.short}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {service.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="ghost" size="sm" className="mt-4 -ml-2 text-primary hover:bg-primary/5">
                      <Link href={`/services/${service.slug}`}>
                        Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-20 bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">How It Works</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Four simple steps to perfectly clean curtains
              </h2>
              <p className="mt-4 text-muted-foreground">
                No taking curtains down. No waiting days. Just clean, fresh drapes — fast.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div className="relative h-full rounded-xl border border-border bg-card p-6">
                  <div className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{step.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                On-site dry cleaning vs traditional cleaning
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-left font-semibold text-primary">On-site (Us)</th>
                    <th className="p-4 text-left font-semibold text-muted-foreground">Traditional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Curtain removal needed", "No — cleaned in place", "Yes — take down & rehang"],
                    ["Shrinkage risk", "Zero (no water)", "Low to high"],
                    ["Drying time", "Same-day usable", "12–24 hours"],
                    ["Disruption", "Minimal", "Days of hassle"],
                    ["Transport damage", "None", "Possible"],
                    ["Price transparency", "Fixed all-inclusive", "Often hidden extras"],
                  ].map((row, i) => (
                    <tr key={i} className="bg-card">
                      <td className="p-4 font-medium">{row[0]}</td>
                      <td className="p-4">
                        <span className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="h-4 w-4 shrink-0" /> {row[1]}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">Who We Serve</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted across every sector
              </h2>
              <p className="mt-4 text-muted-foreground">
                From family homes to five-star hotels — we tailor our service to your needs.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, i) => (
              <Reveal key={sector.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/sectors/${sector.slug}`}
                  className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon name={sector.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary">{sector.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{sector.value}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section id="areas" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">Areas We Cover</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Curtain cleaning near you in Johannesburg
              </h2>
              <p className="mt-4 text-muted-foreground">
                We understand the unique cleaning challenges of each region — from Highveld dust to leafy-suburb pollen.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => (
              <Reveal key={area.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="group block h-full rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-semibold">{area.region}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold group-hover:text-primary">
                    Curtain Cleaning {area.suburb}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{area.painPoint}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Loved by 5,000+ Johannesburg customers
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={(i % 4) * 0.08}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <Quote className="h-7 w-7 text-primary/30" />
                    <p className="mt-3 text-sm leading-relaxed">{t.text}</p>
                    <div className="mt-4 flex">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="mt-3 border-t border-border pt-3">
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.area}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT VERIFIED REVIEWS */}
      <HomepageReviews />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">FAQ</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Can't find your answer? <Link href="/contact" className="text-primary underline">Get in touch</Link>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <FaqAccordion items={homeFaqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready for spotless, fresh curtains?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Book a free on-site assessment today. No obligation, no hidden fees — just clean curtains, fast.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="h-12 text-base">
                <Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Mon–Fri 07:00–18:00</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Serving all of Johannesburg</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
