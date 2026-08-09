import Link from "next/link";
import { Star, Quote, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { safeGetApprovedReviews } from "@/lib/db-safe";

const colors = ["bg-emerald-500", "bg-teal-600", "bg-cyan-600", "bg-green-600", "bg-emerald-700", "bg-teal-700"];
const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export async function HomepageReviews() {
  const reviews = await safeGetApprovedReviews(3);

  // If no approved DB reviews yet, render nothing — the static testimonials section below handles it
  if (reviews.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Verified Reviews</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What our recent customers say
            </h2>
            <p className="mt-4 text-muted-foreground">
              Real reviews from real bookings — submitted by customers after their completed cleaning.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.08}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <Quote className="h-7 w-7 text-primary/30" />
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{r.title}</p>
                  <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-foreground/90">{r.body}</p>
                  <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full ${colors[i % colors.length]} text-xs font-bold text-white`}>
                      {initials(r.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{r.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{r.service}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0 gap-1 border-success/30 bg-success/10 text-success">
                      <ShieldCheck className="h-3 w-3" />
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/testimonials">
                Read all reviews <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
