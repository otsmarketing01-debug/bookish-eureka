import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { areas } from "@/lib/config";

/**
 * Cross-linking widget: shows area chips linking to area pages.
 * Used on service and sector pages to strengthen internal link architecture
 * and help users find their location-specific page.
 */
export function ServiceAreaLinks({ heading = "Available in your area" }: { heading?: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">{heading}</h3>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          We provide this service across all Johannesburg suburbs and beyond.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/areas/${a.slug}`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              {a.suburb}
              <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
