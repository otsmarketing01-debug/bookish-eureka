import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/site/icon";
import { services, type ServiceItem } from "@/lib/config";

/**
 * Matches a blog post's category + tags to relevant services.
 * Returns up to `limit` best-matching services.
 */
function matchServices(category: string, tags: string[], limit = 3): ServiceItem[] {
  const haystack = `${category} ${tags.join(" ")}`.toLowerCase();
  const scored = services.map((s) => {
    let score = 0;
    // Match service name keywords
    const nameWords = s.name.toLowerCase().split(/[\s&]+/).filter((w) => w.length > 3);
    for (const w of nameWords) {
      if (haystack.includes(w)) score += 3;
    }
    // Match service slug parts
    for (const part of s.slug.split("-")) {
      if (part.length > 3 && haystack.includes(part)) score += 2;
    }
    // Match service features (keywords like "mattress", "rug", "fire", "velvet")
    for (const f of s.features) {
      const fWords = f.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
      for (const w of fWords) {
        if (haystack.includes(w)) score += 1;
      }
    }
    return { service: s, score };
  });

  const matched = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.service);

  // Fallback: if no matches, return the first 3 services
  return matched.length > 0 ? matched : services.slice(0, limit);
}

export function BlogRelatedServices({
  category,
  tags = [],
}: {
  category: string;
  tags?: string[];
}) {
  const matched = matchServices(category, tags);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Related services</h3>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Based on this article, you might be interested in:
        </p>
        <div className="mt-4 space-y-2">
          {matched.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-border p-2.5 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium group-hover:text-primary">{s.name}</p>
                <p className="text-xs text-muted-foreground">from {s.priceFrom}</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        <div className="mt-4 border-t border-border pt-3">
          <Badge variant="outline" className="text-xs">Matched by topic relevance</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
