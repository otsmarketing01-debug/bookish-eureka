import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, ArrowRight, Phone, ShieldCheck, BadgeDollarSign, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { pricingTiers, pricingFaqs, siteConfig } from "@/lib/config";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Curtain Cleaning Pricing & Costs Johannesburg 2026 | Transparent Quotes",
  description:
    "Transparent curtain cleaning pricing in Johannesburg. See per-curtain, per-blind, and specialist service prices. No hidden fees, free on-site assessment. From R450.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Curtain Cleaning Pricing Johannesburg | JHB Curtain Cleaning", description: "Transparent, all-inclusive pricing from R450. Free on-site assessment, no hidden fees." },
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(pricingFaqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Pricing", url: `${siteConfig.url}/pricing` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-radial-emerald">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 gap-1.5"><BadgeDollarSign className="h-3.5 w-3.5" /> Transparent Pricing</Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                Curtain cleaning pricing in Johannesburg
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                No vague "starting from" figures that balloon on invoice day. Here are the real per-item prices we quote — all-inclusive, no hidden extras.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg"><Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline"><a href={`tel:${siteConfig.phone}`}><Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}</a></Button>
              </div>
            </div>
          </Reveal>

          {/* Trust strip */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "No-shrinkage guarantee", sub: "Or we replace" },
                { icon: Clock, label: "Same-day service", sub: "Rooms usable same day" },
                { icon: FileText, label: "All-inclusive quotes", sub: "No hidden extras" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={(i % 2) * 0.08}>
                <Card className={`relative h-full ${tier.popular ? "border-primary shadow-lg ring-1 ring-primary/20" : ""}`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground shadow-sm">
                      Most comprehensive
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-xl font-bold tracking-tight">{tier.name}</h2>
                      <span className="text-sm font-semibold text-primary">{tier.priceFrom}<span className="text-xs font-normal text-muted-foreground"> / starting</span></span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="divide-y divide-border">
                      {tier.items.map((item) => (
                        <li key={item.label} className="flex items-center justify-between gap-3 py-2.5">
                          <span className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <span>
                              {item.label}
                              {item.note && <span className="ml-1.5 text-xs text-muted-foreground">({item.note})</span>}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-semibold tabular-nums">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant={tier.popular ? "default" : "outline"} className="mt-5 w-full">
                      <Link href="/contact">Get a quote for {tier.name.split(" ")[0].toLowerCase()} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Note */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
              Prices are indicative ranges based on typical Johannesburg jobs. Your exact quote is confirmed after a free on-site assessment considers fabric type, size, soiling level, and location.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What affects price */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">What affects your quote</Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Five factors that influence price</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { n: "1", t: "Fabric type", d: "Delicate silks & velvets take longer than synthetics." },
              { n: "2", t: "Size & volume", d: "Floor-to-ceiling drapes cost more than standard length." },
              { n: "3", t: "Soiling level", d: "Heavy dust, stains, or pet odours need pre-treatment." },
              { n: "4", t: "Lining", d: "Blackout & thermal linings add cleaning time." },
              { n: "5", t: "Location", d: "Standard call-out zone covers all of metro JHB." },
            ].map((f, i) => (
              <Reveal key={f.n} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-border bg-card p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{f.n}</span>
                  <h3 className="mt-3 font-semibold">{f.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">Pricing FAQ</Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Your pricing questions, answered</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8"><FaqAccordion items={pricingFaqs} /></div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-14 text-primary-foreground sm:py-16">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready for an exact, all-inclusive quote?</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Book a free on-site assessment. We'll measure, inspect, and give you a fixed price — no obligation.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary"><Link href="/contact">Get my free quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><a href={`tel:${siteConfig.phone}`}><Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}</a></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
