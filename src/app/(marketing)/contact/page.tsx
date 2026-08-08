import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ContactForm } from "@/components/site/contact-form";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us — Free Curtain Cleaning Quote | JHB Curtain Cleaning",
  description:
    "Get a free, no-obligation curtain cleaning quote in Johannesburg. Call +27 75 011 9200 or fill in our form — we respond within 1 business hour.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get your free curtain cleaning quote
          </h1>
          <p className="mt-4 text-muted-foreground">
            Fill in the form below or reach us directly. We respond within 1 business hour, Mon–Sat.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Request a free assessment</CardTitle>
                <CardDescription>
                  Tell us what needs cleaning and where you are. We'll be in touch fast.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact details */}
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardContent className="space-y-5 p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Call us</p>
                    <a href={`tel:${siteConfig.phone}`} className="text-sm text-primary hover:underline">
                      {siteConfig.phoneDisplay}
                    </a>
                    <p className="text-xs text-muted-foreground">Fastest response</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Email us</p>
                    <a href={`mailto:${siteConfig.email}`} className="break-all text-sm text-primary hover:underline">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Visit us</p>
                    <p className="text-sm text-muted-foreground">
                      {siteConfig.address.street}<br />
                      {siteConfig.address.locality}, {siteConfig.address.postalCode}<br />
                      {siteConfig.address.region}, South Africa
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Operating hours</p>
                    <ul className="space-y-0.5 text-sm text-muted-foreground">
                      {siteConfig.hours.map((h) => (
                        <li key={h.days}><span className="font-medium text-foreground">{h.days}:</span> {h.time}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-center gap-3 p-5">
                <MessageCircle className="h-8 w-8 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Prefer to chat?</p>
                  <p className="text-xs text-muted-foreground">Use the live chat button in the bottom corner to message us instantly.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
