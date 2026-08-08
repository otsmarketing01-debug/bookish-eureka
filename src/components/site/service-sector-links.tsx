import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/site/icon";
import { services, sectors } from "@/lib/config";

/**
 * Cross-linking: shows related services on sector pages.
 * Helps users discover the full service range relevant to their sector.
 */
export function ServiceSectorLinks({
  excludeServiceSlug,
}: {
  excludeServiceSlug?: string;
}) {
  const items = services.filter((s) => s.slug !== excludeServiceSlug).slice(0, 6);
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold">Services we offer</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Explore our full range of on-site cleaning services.
        </p>
        <div className="mt-4 space-y-2">
          {items.map((s) => (
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
      </CardContent>
    </Card>
  );
}

/**
 * Cross-linking: shows related sectors on service pages.
 * Helps users find sector-specific information relevant to their service.
 */
export function SectorServiceLinks({
  excludeSectorSlug,
}: {
  excludeSectorSlug?: string;
}) {
  const items = sectors.filter((s) => s.slug !== excludeSectorSlug);
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold">Who we serve</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Specialist solutions for every sector across Johannesburg.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/sectors/${s.slug}`}
              className="group flex items-center gap-2 rounded-lg border border-border p-2.5 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              <span className="truncate text-sm font-medium group-hover:text-primary">{s.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
