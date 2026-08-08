import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy — POPIA Compliant | JHB Curtain Cleaning",
  description:
    "Privacy policy for JHB Curtain Cleaning. How we collect, use, and protect your personal information in accordance with South Africa's Protection of Personal Information Act (POPIA).",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Privacy Policy", url: `${siteConfig.url}/privacy-policy` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-radial-emerald">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> POPIA Compliant</Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
              <p className="mt-3 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Card>
              <CardContent className="space-y-8 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8 sm:text-base">
                <div>
                  <h2 className="text-xl font-bold text-foreground">1. Who We Are</h2>
                  <p className="mt-3">
                    {siteConfig.name} ("we", "us", "our") is a curtain and soft-furnishing cleaning business based at {siteConfig.address.street}, {siteConfig.address.locality}, {siteConfig.address.postalCode}, South Africa. We can be contacted at {siteConfig.phoneDisplay} or {siteConfig.email}.
                  </p>
                  <p className="mt-2">
                    We are the "Responsible Party" for the purposes of the Protection of Personal Information Act, 2013 (POPIA).
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
                  <p className="mt-3">We collect the following personal information when you interact with our website and services:</p>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li><strong className="text-foreground">Contact details:</strong> Name, email address, phone number, and physical address (for service delivery).</li>
                    <li><strong className="text-foreground">Booking details:</strong> Preferred dates, service type, property details, and any notes you provide.</li>
                    <li><strong className="text-foreground">Payment information:</strong> We do not store full card numbers. Payment is processed via secure third-party gateways (PayFast/Ozow).</li>
                    <li><strong className="text-foreground">Communication records:</strong> Records of emails, WhatsApp messages, and live chat conversations for service quality.</li>
                    <li><strong className="text-foreground">Technical data:</strong> IP address, browser type, and pages visited (via cookies — see our cookie consent banner).</li>
                    <li><strong className="text-foreground">Review submissions:</strong> Name, area, rating, and review text when you leave a review.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
                  <p className="mt-3">We process your personal information for the following legitimate purposes:</p>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li>To provide and deliver our cleaning services, including scheduling, assessments, and on-site cleaning.</li>
                    <li>To communicate with you about your booking, quote, or service.</li>
                    <li>To process payments and issue invoices.</li>
                    <li>To send service confirmations, reminders, and follow-up communications (including review requests).</li>
                    <li>To improve our website, services, and customer experience.</li>
                    <li>To comply with legal obligations and protect against fraud.</li>
                    <li>To send marketing communications (newsletter, special offers) — only if you have explicitly opted in. You can unsubscribe at any time.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">4. Legal Basis for Processing</h2>
                  <p className="mt-3">
                    We process your personal information on the following lawful bases under POPIA:
                  </p>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li><strong className="text-foreground">Consent:</strong> When you submit a form, book a service, or subscribe to our newsletter.</li>
                    <li><strong className="text-foreground">Contract:</strong> When processing bookings and delivering services you've requested.</li>
                    <li><strong className="text-foreground">Legal obligation:</strong> When retaining records for tax, accounting, or regulatory compliance.</li>
                    <li><strong className="text-foreground">Legitimate interest:</strong> For service improvement, quality assurance, and security.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">5. Information Sharing</h2>
                  <p className="mt-3">
                    We do <strong className="text-foreground">not sell, rent, or trade</strong> your personal information to third parties. We only share information with:
                  </p>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li>Service providers (e.g., payment gateways, email platforms) under contract and bound by confidentiality.</li>
                    <li>Field technicians who need your address and contact details to deliver the service.</li>
                    <li>Legal authorities if required by law or to protect our rights.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">6. Data Retention</h2>
                  <p className="mt-3">
                    We retain personal information only for as long as necessary:
                  </p>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li><strong className="text-foreground">Booking & service records:</strong> 5 years (for warranty/guarantee and tax compliance).</li>
                    <li><strong className="text-foreground">Marketing data:</strong> Until you unsubscribe or request deletion.</li>
                    <li><strong className="text-foreground">Website analytics:</strong> 26 months (standard cookie expiry).</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">7. Your Rights Under POPIA</h2>
                  <p className="mt-3">You have the right to:</p>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li>Access the personal information we hold about you.</li>
                    <li>Request correction of inaccurate information.</li>
                    <li>Request deletion of your personal information (subject to legal retention requirements).</li>
                    <li>Object to processing for direct marketing.</li>
                    <li>Withdraw consent at any time (for consent-based processing).</li>
                    <li>Lodge a complaint with the Information Regulator (www.informationregulator.org.za).</li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, contact us at {siteConfig.email}.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">8. Cookies</h2>
                  <p className="mt-3">
                    Our website uses cookies for essential functionality (session management) and, with your consent, for analytics. You can manage your cookie preferences via our cookie consent banner. See our cookie policy for details.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">9. Security</h2>
                  <p className="mt-3">
                    We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or damage. This includes encrypted password storage, secure session management, and access controls.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">10. Children's Privacy</h2>
                  <p className="mt-3">
                    Our services are intended for adults. We do not knowingly collect personal information from children under 18. If you believe a child has provided us with personal information, please contact us.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">11. Changes to This Policy</h2>
                  <p className="mt-3">
                    We may update this privacy policy from time to time. The most current version will always be available on this page with the updated date shown above. Material changes will be communicated via email if you have an active booking.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">12. Contact Our Information Officer</h2>
                  <p className="mt-3">
                    For any privacy-related queries or to exercise your POPIA rights, contact our Information Officer:
                  </p>
                  <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
                    <p><strong className="text-foreground">{siteConfig.name}</strong></p>
                    <p>Information Officer</p>
                    <p className="mt-1">{siteConfig.email}</p>
                    <p>{siteConfig.phoneDisplay}</p>
                    <p className="mt-1">{siteConfig.address.street}, {siteConfig.address.locality}, {siteConfig.address.postalCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
