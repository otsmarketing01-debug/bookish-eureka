import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Star, Send } from "lucide-react";
import { siteConfig, services, areas } from "@/lib/config";
import { NewsletterSignup } from "@/components/site/newsletter-signup";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={600}
                height={327}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-medium">{siteConfig.rating.value}</span>
              <span className="text-sm text-muted-foreground">({siteConfig.rating.count.toLocaleString()}+ reviews)</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</Link></li>
              <li><Link href="/testimonials" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Testimonials</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Admin</Link></li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="text-sm font-semibold">Areas</h3>
            <ul className="mt-4 space-y-2.5">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {a.region}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">Get in touch</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {siteConfig.address.street}<br />
                  {siteConfig.address.locality}, {siteConfig.address.postalCode}
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {siteConfig.hours[0].days}: {siteConfig.hours[0].time}<br />
                  {siteConfig.hours[1].days}: {siteConfig.hours[1].time}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter band */}
        <div className="mt-10 grid gap-6 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2 sm:items-center sm:p-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Send className="h-4 w-4" />
              </span>
              <h3 className="font-semibold">Cleaning tips & special offers</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Join 2,000+ Johannesburg homeowners getting monthly curtain care advice and exclusive offers. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterSignup variant="footer" />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <Link href="/gallery" className="hover:text-foreground">Gallery</Link>
            <Link href="/book" className="hover:text-foreground">Book</Link>
            <Link href="/faq" className="hover:text-foreground">FAQ</Link>
            <Link href="/about" className="hover:text-foreground">About</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
            <Link href="/terms-of-service" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <Link href="/login" className="hover:text-foreground">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
