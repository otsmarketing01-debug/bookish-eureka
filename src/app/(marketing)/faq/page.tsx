import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, HelpCircle, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { FaqChatbot } from "@/components/site/faq-chatbot";
import { services, siteConfig, pricingFaqs } from "@/lib/config";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Curtain Cleaning FAQ — All Your Questions Answered | JHB Curtain Cleaning",
  description:
    "Complete FAQ for curtain cleaning in Johannesburg. Will curtains shrink? How much does it cost? How often to clean? Get instant answers or ask our AI assistant.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Curtain Cleaning FAQ | JHB Curtain Cleaning",
    description: "All your curtain cleaning questions answered. Plus an AI assistant for instant help.",
  },
};

// General FAQs (not tied to a specific service)
const generalFaqs = [
  { q: "Will my curtains shrink?", a: "No. Our dry-cleaning process uses zero water, which means zero shrinkage risk — even on cotton, linen, and lined drapes." },
  { q: "Do I need to take my curtains down?", a: "No. We clean your curtains exactly where they hang, so there's no removal, transport, or rehanging hassle." },
  { q: "How long does on-site cleaning take?", a: "A typical lounge takes 60–90 minutes and bedrooms 30–45 minutes each. Rooms are usable the same day." },
  { q: "Which areas do you cover?", a: "All Johannesburg suburbs including Sandton, Randburg, Fourways, Roodepoort, Edenvale, Alberton, Rosebank, plus Pretoria and Midrand." },
  { q: "Do you offer a guarantee?", a: "Yes — we offer a no-shrinkage guarantee and a satisfaction guarantee. If you're not happy, we'll put it right." },
  { q: "Can you clean delicate fabrics like silk and velvet?", a: "Absolutely. Our technicians are trained on fabric-specific methods for voiles, sheers, silk blends, velvet, and lined drapes." },
  { q: "Do you service commercial clients?", a: "Yes — hotels, offices, healthcare, education, and theatres. We offer after-hours service to avoid disruption." },
  { q: "How do I get a quote?", a: "Call us, use our contact form, or book a free on-site assessment online. We'll give you a fixed, all-inclusive quote." },
  { q: "Is the on-site assessment really free?", a: "Yes, completely free with no obligation. You only pay if you decide to proceed with the cleaning." },
  { q: "Are your technicians certified and insured?", a: "Yes. All our technicians are certified, trained on fabric-specific methods, and fully insured for your peace of mind." },
];

export default function FaqPage() {
  // Merge all service-specific FAQs
  const serviceFaqs = services.flatMap((s) => s.faqs.map((f) => ({ ...f, service: s.name })));
  const allFaqs = [...generalFaqs, ...serviceFaqs, ...pricingFaqs];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "FAQ", url: `${siteConfig.url}/faq` },
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
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-metallic-bronze-top/40 bg-metallic-emerald-deep/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-metallic-bronze-top"><HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions</span>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance text-metallic-ivory">
                All your curtain cleaning questions, answered
              </h1>
              <p className="mt-4 text-lg text-metallic-ivory/80">
                Browse the most common questions below — or ask our AI assistant for an instant, specific answer.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI Chatbot */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <FaqChatbot />
          </Reveal>
        </div>
      </section>

      {/* General FAQs */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">General questions</h2>
            <p className="mt-2 text-sm text-muted-foreground">The basics everyone asks about on-site curtain cleaning.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6"><FaqAccordion items={generalFaqs} /></div>
          </Reveal>
        </div>
      </section>

      {/* Service-specific FAQs */}
      <section className="bg-metallic-cream dark:bg-metallic-emerald-deep py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">Service-specific questions</h2>
            <p className="mt-2 text-sm text-muted-foreground">Detailed answers for each of our specialist services.</p>
          </Reveal>
          <div className="mt-6 space-y-8">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.05}>
                <div>
                  <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">
                    {service.name}
                    <Link href={`/services/${service.slug}`} className="text-sm font-normal text-metallic-emerald-deep dark:text-metallic-ivory hover:underline">
                      learn more <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  </h3>
                  <div className="mt-3"><FaqAccordion items={service.faqs} /></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">Pricing questions</h2>
            <p className="mt-2 text-sm text-muted-foreground">About quotes, payment, and what affects the price.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6"><FaqAccordion items={pricingFaqs} /></div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-metallic-emerald-deep py-14 text-metallic-ivory sm:py-16">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-metallic-ivory">Still have questions?</h2>
            <p className="mx-auto mt-3 max-w-xl text-metallic-ivory/80">
              Our team is one call away — or chat with us live, or book a free on-site assessment.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="bg-metallic-bronze-top text-metallic-emerald-deep hover:bg-metallic-bronze-bottom"><Link href="/book">Book a free assessment <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-metallic-ivory/40 bg-transparent text-metallic-ivory hover:bg-metallic-ivory/10">
                <a href={`tel:${siteConfig.phone}`}><Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}</a>
              </Button>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-metallic-ivory/70">
              <MessageCircle className="h-4 w-4" /> Or use the live chat in the bottom corner
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
