import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Phone, Clock, ShieldCheck, CalendarCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { BookingForm } from "@/components/site/booking-form";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book On-Site Curtain Cleaning | Free Assessment | JHB Curtain Cleaning",
  description:
    "Book your free on-site curtain cleaning assessment in Johannesburg. Pick a date and time that suits you. No payment now — we confirm by phone within 1 business hour.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book On-Site Curtain Cleaning | JHB Curtain Cleaning",
    description: "Pick a date and time. Free assessment, no obligation. We confirm by phone within 1 business hour.",
  },
};

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Book", url: `${siteConfig.url}/book` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-metallic-emerald-deep">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-metallic-bronze-top/40 bg-metallic-emerald-deep/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-metallic-bronze-top"><CalendarCheck className="h-3.5 w-3.5" /> Book Online</span>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance text-metallic-ivory">
                Book your free on-site assessment
              </h1>
              <p className="mt-4 text-lg text-metallic-ivory/80">
                Pick a date and time that works for you. A certified technician visits your home or business, inspects your curtains, and gives you a fixed, all-inclusive quote — no obligation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <BookingForm />
            </div>
            <div className="space-y-4 lg:col-span-2">
              <Reveal>
                <Card className="border border-metallic-bronze-top/20 bg-white dark:bg-card">
                  <CardContent className="space-y-4 p-6">
                    <h3 className="font-display font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">What happens next?</h3>
                    <ol className="space-y-4">
                      {[
                        { n: 1, t: "You submit the form", d: "Pick a date, time slot, and tell us what needs cleaning." },
                        { n: 2, t: "We call to confirm", d: "Within 1 business hour, we phone to confirm your slot and answer questions." },
                        { n: 3, t: "Free on-site assessment", d: "A technician inspects your curtains and gives a fixed, all-inclusive quote." },
                        { n: 4, t: "Cleaning on the spot", d: "Approve the quote and we clean right there — no removal, same-day usable." },
                      ].map((step) => (
                        <li key={step.n} className="flex gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-metallic-bronze-top text-sm font-bold text-metallic-emerald-deep">{step.n}</span>
                          <div>
                            <p className="text-sm font-medium">{step.t}</p>
                            <p className="text-sm text-muted-foreground">{step.d}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={0.1}>
                <Card className="border border-metallic-bronze-top/20 bg-metallic-cream dark:bg-metallic-emerald-deep">
                  <CardContent className="space-y-3 p-6">
                    <h3 className="font-display flex items-center gap-2 font-semibold text-metallic-emerald-deep dark:text-metallic-ivory"><ShieldCheck className="h-5 w-5 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /> Our guarantees</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /> No-shrinkage guarantee</li>
                      <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /> Same-day usable rooms</li>
                      <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /> All Johannesburg suburbs</li>
                    </ul>
                    <div className="border-t border-border pt-3">
                      <p className="text-sm text-muted-foreground">Prefer to talk?</p>
                      <div className="mt-2 flex flex-col gap-2">
                        <Button asChild variant="outline" size="sm">
                          <a href={`tel:${siteConfig.phone}`}><Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}</a>
                        </Button>
                        <WhatsAppCTA
                          message="Hi, I'd like to book a free curtain cleaning assessment."
                          variant="outline"
                          size="sm"
                          label="WhatsApp Us"
                        />
                      </div>
                    </div>
                    {/* Trust badges */}
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
                      <Badge variant="outline" className="gap-1 border-metallic-bronze-top/40 bg-metallic-bronze-top/10 text-metallic-bronze-bottom dark:text-metallic-bronze-top"><ShieldCheck className="h-3 w-3" /> 100% No-Shrinkage</Badge>
                      <Badge variant="outline" className="gap-1 border-metallic-bronze-top/40 bg-metallic-bronze-top/10 text-metallic-bronze-bottom dark:text-metallic-bronze-top"><Clock className="h-3 w-3" /> 15+ Years</Badge>
                      <Badge variant="outline" className="gap-1 border-metallic-bronze-top/40 bg-metallic-bronze-top/10 text-metallic-bronze-bottom dark:text-metallic-bronze-top"><ShieldCheck className="h-3 w-3" /> Hardware Checks Included</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={0.2}>
                <Card className="border border-metallic-bronze-top/20 bg-white dark:bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">Operating hours</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {siteConfig.hours.map((h) => (
                        <li key={h.days} className="flex justify-between">
                          <span>{h.days}</span>
                          <span className="font-medium text-foreground">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-metallic-cream dark:bg-metallic-emerald-deep py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl text-metallic-emerald-deep dark:text-metallic-ivory">Not sure what you need?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Browse our services or check pricing first.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline"><Link href="/#services">View services</Link></Button>
              <Button asChild variant="outline"><Link href="/pricing">See pricing <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
