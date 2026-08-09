import { Star, Quote, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { safeGetApprovedReviewsByService } from "@/lib/db-safe";

const colors = ["bg-emerald-500", "bg-teal-600", "bg-cyan-600", "bg-green-600", "bg-emerald-700", "bg-teal-700"];
const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/**
 * Server component: displays approved customer reviews for a specific service.
 * Shows a summary header with average rating + review cards.
 * Only renders if there are approved reviews for this service.
 */
export async function ServiceReviews({ serviceName }: { serviceName: string }) {
  const reviews = await safeGetApprovedReviewsByService(serviceName, 6);

  if (reviews.length === 0) return null;

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <Badge variant="secondary" className="mb-3 gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Verified Customer Reviews</Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What {serviceName.toLowerCase()} customers say</h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-lg font-bold">{avgRating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">· {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      {r.area && <p className="truncate text-xs text-muted-foreground">{r.area}</p>}
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
          <div className="mt-8 text-center">
            <Link href="/testimonials" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Read all reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
