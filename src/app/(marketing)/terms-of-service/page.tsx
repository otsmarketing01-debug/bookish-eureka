import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service — JHB Curtain Cleaning",
  description:
    "Terms of service for JHB Curtain Cleaning. Booking terms, cancellation policy, guarantee conditions, payment terms, and service agreement for on-site curtain cleaning in Johannesburg.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Terms of Service", url: `${siteConfig.url}/terms-of-service` },
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
              <Badge variant="secondary" className="mb-4 gap-1.5"><FileText className="h-3.5 w-3.5" /> Legal</Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
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
                  <h2 className="text-xl font-bold text-foreground">1. Service Agreement</h2>
                  <p className="mt-3">
                    These terms govern the provision of on-site curtain, blind, upholstery, mattress, and rug cleaning services by {siteConfig.name} ("we", "us", "our") to you ("the customer"). By booking a service, you agree to these terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">2. Bookings & Assessments</h2>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li>All on-site assessments are <strong className="text-foreground">free and without obligation</strong>. You are not required to proceed with cleaning after an assessment.</li>
                    <li>Bookings can be made online, by phone, or via WhatsApp. A booking is confirmed once our team has contacted you to verify the date and time slot.</li>
                    <li>We operate Monday to Friday 07:00–18:00 and Saturday 08:00–14:00. We are closed on Sundays and public holidays.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">3. Pricing & Payment</h2>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li>All quotes are <strong className="text-foreground">fixed and all-inclusive</strong> — no hidden extras. The price quoted after your free assessment is the price you pay.</li>
                    <li>Our minimum call-out charge is R450, which is applied as credit toward your cleaning total if you proceed.</li>
                    <li>Residential clients pay on completion via EFT, card, or cash.</li>
                    <li>Commercial clients may apply for 30-day payment terms on a contract basis.</li>
                    <li>Prices are valid for 30 days from the date of quotation.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">4. Cancellation Policy</h2>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li>Cancellations made <strong className="text-foreground">24 hours or more</strong> before the scheduled appointment: no charge.</li>
                    <li>Cancellations made <strong className="text-foreground">less than 24 hours</strong> before: a R250 call-out fee may apply.</li>
                    <li>If we need to reschedule due to weather, equipment failure, or staff illness, we will contact you at the earliest opportunity and offer alternative dates at no penalty.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">5. No-Shrinkage Guarantee</h2>
                  <p className="mt-3">
                    We guarantee that our waterless solvent dry-cleaning process will not cause shrinkage to your curtains. In the unlikely event that shrinkage occurs as a direct result of our cleaning process, we will replace the affected curtains at our expense, up to the value of the cleaning service provided.
                  </p>
                  <p className="mt-2">
                    This guarantee does not cover: pre-existing fabric damage, shrinkage caused by prior wet cleaning, sun-rotted or degraded fabrics, or fabrics cleaned against manufacturer care labels.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">6. Satisfaction Guarantee</h2>
                  <p className="mt-3">
                    If you are not satisfied with the cleaning result, contact us within 48 hours of the service. We will return to re-clean the affected areas at no additional charge. If the issue cannot be resolved, we will refund the cost of the affected cleaning.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">7. Access & Preparation</h2>
                  <ul className="mt-3 space-y-2 list-disc pl-6">
                    <li>The customer must provide safe, clear access to all curtains/blinds to be cleaned, including moving furniture where necessary.</li>
                    <li>We require access to a power point and, for some services, a water source.</li>
                    <li>Valuable or fragile items near curtains should be removed or protected before our arrival. We are not liable for damage to items left in the work area.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">8. Liability</h2>
                  <p className="mt-3">
                    We carry comprehensive public liability insurance. Our liability for any damage caused during the cleaning process is limited to the value of the cleaning service provided, unless the damage resulted from gross negligence. We are not liable for damage to fabrics that are sun-degraded, previously damaged, or cleaned against manufacturer instructions.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">9. Privacy</h2>
                  <p className="mt-3">
                    We process personal information in accordance with the Protection of Personal Information Act (POPIA). See our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a> for details.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">10. Changes to Terms</h2>
                  <p className="mt-3">
                    We may update these terms from time to time. The most current version will always be available on this page with the updated date shown above.
                  </p>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm">
                    Questions about these terms? Contact us at{" "}
                    <a href={`mailto:${siteConfig.email}`} className="text-primary underline">{siteConfig.email}</a>{" "}
                    or{" "}
                    <a href={`tel:${siteConfig.phone}`} className="text-primary underline">{siteConfig.phoneDisplay}</a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
