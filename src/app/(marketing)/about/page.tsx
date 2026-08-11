import Link from "next/link";
import type { Metadata } from "next";
import { Award, Users, ShieldCheck, Clock, MapPin, Phone, Mail, CheckCircle2, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us — 15+ Years in Johannesburg",
  description:
    "Trusted on-site curtain cleaning in Johannesburg since 2010. 5,000+ clients, certified technicians, and a no-shrinkage guarantee. Book a free assessment.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About JHB Curtain Cleaning | 15+ Years in Johannesburg",
    description: "Johannesburg's trusted on-site curtain cleaning specialists. 5,000+ clients, certified, insured.",
  },
};

const stats = [
  { value: "15+", label: "Years of experience" },
  { value: "5,000+", label: "Curtains cleaned" },
  { value: "4.9★", label: "Average rating" },
  { value: "Zero", label: "Shrinkage incidents" },
];

const values = [
  { icon: ShieldCheck, title: "No-shrinkage guarantee", desc: "Our waterless solvent process means zero risk of fabric shrinkage — guaranteed. If your curtains shrink, we replace them." },
  { icon: Award, title: "Certified & insured", desc: "All technicians are certified in fabric-specific cleaning methods and fully insured for your peace of mind." },
  { icon: Heart, title: "Honest pricing", desc: "Fixed, all-inclusive quotes with no hidden extras. The price we quote is the price you pay." },
  { icon: Clock, title: "Same-day service", desc: "On-site cleaning means your curtains are clean, dry, and usable before we leave your property." },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "About", url: `${siteConfig.url}/about` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-metallic-emerald-deep">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-bronze-top/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-metallic-bronze-top/40 bg-metallic-emerald-deep/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-metallic-bronze-top"><Sparkles className="h-3.5 w-3.5" /> About Us</span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-metallic-ivory text-balance sm:text-4xl lg:text-5xl">
                Johannesburg's on-site curtain cleaning specialists
              </h1>
              <p className="mt-4 text-lg text-metallic-ivory/80">
                For over 15 years, we've been cleaning curtains exactly where they hang — no removal, no shrinkage, no disruption. Here's our story.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-metallic-bronze-top/30 bg-metallic-emerald-deep/90">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-metallic-bronze-top sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-metallic-ivory/60 sm:text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="bg-metallic-ivory dark:bg-metallic-emerald-deep py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Our Story</span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory sm:text-3xl">Our story</h2>
            <div className="prose prose-sm mt-6 max-w-none text-muted-foreground leading-relaxed sm:prose-base">
              <p>
                JHB Curtain Cleaning was founded in 2010 with a simple mission: to provide Johannesburg homeowners and businesses with a curtain cleaning service that doesn't require taking curtains down, doesn't risk shrinkage, and doesn't disrupt daily life.
              </p>
              <p className="mt-4">
                What started as a one-man operation based in Florida, Roodepoort, has grown into a team of certified technicians serving all of Greater Johannesburg — from Sandton to Pretoria, Fourways to Alberton. Along the way, we've cleaned over 5,000 curtains without a single shrinkage incident.
              </p>
              <p className="mt-4">
                Our proprietary mobile solvent dry-cleaning process was developed specifically for the Highveld's unique environmental challenges. Johannesburg's dry, dusty winters and high pollen counts mean curtains here face greater soil loads than in coastal cities. Our waterless extraction removes embedded dust, allergens, and odours without the risks of traditional wet cleaning.
              </p>
              <p className="mt-4">
                Today, we're proud to serve residential homes, luxury estates, hotels, corporate offices, healthcare facilities, schools, and theatres across Gauteng — all with the same commitment to honest pricing, on-time service, and our no-shrinkage guarantee.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-metallic-cream dark:bg-metallic-emerald-deep/90 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Our Values</span>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory sm:text-3xl">What we stand for</h2>
              <p className="mt-3 text-muted-foreground">The principles that guide every job we do.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 0.08}>
                <Card className="h-full border border-metallic-bronze-top/20 bg-white dark:bg-card">
                  <CardContent className="p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-metallic-bronze-top/15 text-metallic-bronze-bottom dark:text-metallic-bronze-top">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">{v.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 bg-metallic-ivory dark:bg-metallic-emerald-deep" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Card className="border border-metallic-bronze-top/30 bg-white dark:bg-card shadow-xl">
              <CardContent className="grid gap-6 p-8 sm:grid-cols-2">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-metallic-bronze-bottom dark:text-metallic-bronze-top">Contact</span>
                  <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-metallic-emerald-deep dark:text-metallic-ivory">Get in touch</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Based in Florida, Roodepoort — serving all of Greater Johannesburg.
                  </p>
                  <div className="mt-4 space-y-3">
                    <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2.5 text-sm hover:text-metallic-bronze-bottom">
                      <Phone className="h-4 w-4 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /> {siteConfig.phoneDisplay}
                    </a>
                    <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 text-sm hover:text-metallic-bronze-bottom">
                      <Mail className="h-4 w-4 text-metallic-bronze-bottom dark:text-metallic-bronze-top" /> {siteConfig.email}
                    </a>
                    <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-metallic-bronze-bottom dark:text-metallic-bronze-top" />
                      <span>{siteConfig.address.street}<br />{siteConfig.address.locality}, {siteConfig.address.postalCode}<br />{siteConfig.address.region}, South Africa</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-metallic-emerald-deep dark:text-metallic-ivory">Operating hours</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {siteConfig.hours.map((h) => (
                      <li key={h.days} className="flex justify-between">
                        <span>{h.days}</span>
                        <span className="font-medium text-metallic-emerald-deep dark:text-metallic-ivory">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-5 w-full bg-metallic-bronze-top text-metallic-emerald-deep hover:bg-metallic-bronze-bottom">
                    <Link href="/book">Book a Free Assessment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
