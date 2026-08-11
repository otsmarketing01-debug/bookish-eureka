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
import { localBusinessSchema, howToSchema, faqSchema, breadcrumbSchema, aggregateReviewSchema, schemaGraph } from "@/lib/seo";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { HomepageReviews } from "@/components/site/homepage-reviews";
import { HomepageSearch } from "@/components/site/homepage-search";
import { safeGetApprovedReviews } from "@/lib/db-safe";
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

export default async function HomePage() {
  // Fetch approved customer reviews to embed in the LocalBusiness schema
  // (enables rich star-rating + review snippets in Google search results)
  const customerReviews = await safeGetApprovedReviews(10);
  const reviewsForSchema = customerReviews.map((r) => ({
    name: r.name,
    rating: r.rating,
    title: r.title,
    body: r.body,
    service: r.service,
    createdAt: r.createdAt,
  }));

  return (
    <>
      {/* Unified @graph schema: DryCleaningOrLaundry + Service + OfferCatalog + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph(homeFaqs)) }}
      />
      {/* Additional schemas: HowTo + Breadcrumb + Aggregate reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: siteConfig.url }])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateReviewSchema(reviewsForSchema)) }}
      />

      {/* ===== HERO — Giant Statement, centered-low over full-bleed drapery ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/metallic/hero.webp"
            alt="Floor-to-ceiling emerald and ivory linen curtains in a luxury Johannesburg penthouse, warm light raking across the fabric weave"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-metallic-emerald-deep via-metallic-emerald-deep/40 to-metallic-emerald-deep/10" />
        </div>
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-end px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="mb-5 block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-metallic-bronze-top">
              JHB Curtain Cleaning — On-Site Fabric Care
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight text-metallic-ivory text-balance sm:text-5xl lg:text-6xl">
              Curtain care, elevated to an art.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 h-px w-24 bg-metallic-bronze-top/60" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-metallic-ivory/85">
              No removal. No shrinkage. Free assessment. Johannesburg&apos;s specialist on-site dry-cleaning for curtains, blinds &amp; fine fabrics.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-metallic-bronze-top text-base text-metallic-emerald-deep hover:bg-metallic-bronze-bottom sm:px-8">
                <Link href="/contact">
                  Book a Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-metallic-ivory/40 bg-transparent text-base text-metallic-ivory hover:bg-metallic-ivory/10 hover:text-metallic-ivory sm:px-8">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-metallic-ivory/70">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-metallic-bronze-top text-metallic-bronze-top" />
                  ))}
                </div>
                <span className="font-medium text-metallic-ivory">{siteConfig.rating.value}</span>
                <span>({siteConfig.rating.count.toLocaleString()}+ reviews)</span>
              </div>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-metallic-bronze-top" /> No-shrinkage guarantee</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-metallic-bronze-top" /> Same-day service</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== TRUST BAR — seals over metallic wide strip ===== */}
      <section className="relative overflow-hidden border-y border-metallic-bronze-top/30">
        <div className="absolute inset-0">
          <Image src="/metallic/trust-bar.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-metallic-emerald-deep/60" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { stat: 5000, suffix: "+", label: "Curtains cleaned" },
            { stat: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
            { stat: 100, suffix: "%", label: "No-shrinkage guarantee" },
            { stat: 0, suffix: "", label: "Same-day service", textValue: "Same day" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-lg border border-metallic-bronze-top/20 bg-metallic-emerald-deep/40 px-4 py-6 text-center backdrop-blur-sm">
                <p className="font-display text-2xl font-bold text-metallic-bronze-top sm:text-3xl">
                  {s.textValue ?? <AnimatedCounter value={s.stat} suffix={s.suffix} decimals={s.decimals ?? 0} />}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-metallic-ivory/70 sm:text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== SERVICES — editorial split, asymmetric ===== */}
      <section id="services" className="scroll-mt-20 bg-metallic-ivory dark:bg-metallic-emerald-deep py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Our Services</span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory sm:text-4xl">
                  Six specialist disciplines
                </h2>
                <p className="mt-4 text-muted-foreground">
                  From delicate sheers to heavy hotel drapes, we clean it all — on-site, without removal.
                </p>
                <Button asChild variant="outline" className="mt-6 border-metallic-bronze-top/50 text-metallic-bronze-bottom dark:text-metallic-bronze-top hover:bg-metallic-bronze-top hover:text-white">
                  <Link href="/services">View full portfolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {services.map((service, i) => (
                <Reveal key={service.slug} delay={(i % 2) * 0.08}>
                  <Card className={`group h-full overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-lg ${i % 2 === 0 ? "border-metallic-bronze-top/20 bg-white dark:bg-card" : "border-transparent bg-metallic-emerald-deep text-metallic-ivory"}`}>
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={`/services/${service.slug}.jpg`}
                        alt={`${service.name} — professional on-site cleaning in Johannesburg`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className={`absolute inset-0 ${i % 2 === 0 ? "bg-gradient-to-t from-white via-white/20 to-transparent" : "bg-gradient-to-t from-metallic-emerald-deep via-metallic-emerald-deep/20 to-transparent"}`} />
                      <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-metallic-bronze-top/90 text-metallic-emerald-deep shadow-sm">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>
                      <Badge variant="outline" className={`absolute right-3 top-3 font-mono text-xs font-semibold backdrop-blur-sm ${i % 2 === 0 ? "border-metallic-bronze-top/40 bg-white/90 dark:bg-card text-metallic-bronze-bottom dark:text-metallic-bronze-top" : "border-metallic-bronze-top/40 bg-metallic-emerald-deep/80 text-metallic-bronze-top"}`}>from {service.priceFrom}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className={`text-lg ${i % 2 === 0 ? "text-metallic-emerald-deep dark:text-metallic-ivory" : "text-metallic-ivory"}`}>{service.name}</CardTitle>
                      <CardDescription className={i % 2 === 0 ? undefined : "text-metallic-ivory/60"}>{service.short}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {service.features.slice(0, 3).map((f) => (
                          <li key={f} className={`flex items-start gap-2 text-sm ${i % 2 === 0 ? "text-muted-foreground" : "text-metallic-ivory/70"}`}>
                            <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${i % 2 === 0 ? "text-metallic-bronze-bottom dark:text-metallic-bronze-top" : "text-metallic-bronze-top"}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="ghost" size="sm" className={`mt-4 -ml-2 ${i % 2 === 0 ? "text-metallic-bronze-bottom dark:text-metallic-bronze-top hover:bg-metallic-bronze-top/10" : "text-metallic-bronze-top hover:bg-metallic-bronze-top/10"}`}>
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
        </div>
      </section>

      {/* ===== PROCESS — Swiss-grid band over metallic emerald ===== */}
      <section id="process" className="relative scroll-mt-20 overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0">
          <Image src="/metallic/process.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-metallic-emerald-deep/85" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-top">How It Works</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-ivory sm:text-4xl">
                Four simple steps to perfectly clean curtains
              </h2>
              <p className="mt-4 text-metallic-ivory/70">
                No taking curtains down. No waiting days. Just clean, fresh drapes — fast.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div className="h-full border-t-2 border-metallic-bronze-top/40 pt-6">
                  <div className="font-display text-4xl font-bold text-metallic-bronze-top">{step.step.toString().padStart(2, "0")}</div>
                  <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-metallic-bronze-top/15 text-metallic-bronze-top">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-semibold text-metallic-ivory">{step.name}</h3>
                  <p className="mt-1.5 text-sm text-metallic-ivory/60">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COVERAGE — image-as-canvas, bottom-left over skyline ===== */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0">
          <Image src="/metallic/coverage.webp" alt="Johannesburg skyline at dusk treated in deep emerald and charcoal with a champagne-gold ring" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-metallic-emerald-deep/90 via-metallic-emerald-deep/40 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <Reveal>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-top">Areas We Cover</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-ivory sm:text-4xl">
                Where we work.
              </h2>
              <p className="mt-4 text-metallic-ivory/80">
                Sandton · Rosebank · Fourways · Roodepoort · Edenvale · Pretoria · Midrand — and every Johannesburg suburb.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-full border border-metallic-bronze-top/40 bg-metallic-emerald-deep/50 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-metallic-ivory backdrop-blur-sm transition-colors hover:bg-metallic-bronze-top hover:text-metallic-emerald-deep">
                    {a.region}
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Button asChild size="lg" className="mt-8 h-12 bg-metallic-bronze-top text-base text-metallic-emerald-deep hover:bg-metallic-bronze-bottom">
                <Link href="/areas">See all service areas <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS — right caption + quote wall ===== */}
      <section className="bg-metallic-ivory dark:bg-metallic-emerald-deep py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {testimonials.slice(0, 4).map((t, i) => (
                <Reveal key={i} delay={(i % 2) * 0.08}>
                  <Card className="h-full border-metallic-bronze-top/20 bg-white dark:bg-card">
                    <CardContent className="pt-6">
                      <Quote className="h-7 w-7 text-metallic-bronze-top/40" />
                      <p className="mt-3 text-sm leading-relaxed text-metallic-slate dark:text-metallic-ivory/85">{t.text}</p>
                      <div className="mt-4 flex">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-metallic-bronze-top text-metallic-bronze-top" />
                        ))}
                      </div>
                      <div className="mt-3 border-t border-metallic-bronze-top/15 pt-3">
                        <p className="text-sm font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">{t.name}</p>
                        <p className="font-mono text-xs uppercase tracking-wider text-metallic-bronze-bottom dark:text-metallic-bronze-top">{t.area}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Testimonials</span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory sm:text-4xl">
                  Trusted in Johannesburg&apos;s finest homes &amp; venues
                </h2>
                <p className="mt-4 text-muted-foreground">
                  From family homes to five-star hotels — 5,000+ Johannesburg customers trust our care.
                </p>
                <Button asChild variant="outline" className="mt-6 border-metallic-bronze-top/50 text-metallic-bronze-bottom dark:text-metallic-bronze-top hover:bg-metallic-bronze-top hover:text-white">
                  <Link href="/testimonials">Read more reviews <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== RECENT VERIFIED REVIEWS ===== */}
      <HomepageReviews />

      {/* ===== FAQ ===== */}
      <section id="faq" className="scroll-mt-20 bg-metallic-ivory dark:bg-metallic-emerald-deep py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">FAQ</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Can&apos;t find your answer? <Link href="/contact" className="text-metallic-bronze-bottom dark:text-metallic-bronze-top underline">Get in touch</Link>.
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

      {/* ===== CTA — mini minimalist close over metallic ===== */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0">
          <Image src="/metallic/cta.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-metallic-emerald-deep/85" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-metallic-bronze-top">Your curtains deserve the spa treatment</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic-ivory sm:text-4xl lg:text-5xl">
              Ready for spotless, fresh curtains?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-metallic-ivory/80">
              Book a free on-site assessment today. No obligation, no hidden fees — just clean curtains, fast.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-metallic-bronze-top text-base text-metallic-emerald-deep hover:bg-metallic-bronze-bottom sm:px-8">
                <Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-metallic-ivory/40 bg-transparent text-base text-metallic-ivory hover:bg-metallic-ivory/10 hover:text-metallic-ivory">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-metallic-ivory/70">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-metallic-bronze-top" /> Mon–Fri 07:00–18:00</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-metallic-bronze-top" /> Serving all of Johannesburg</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
