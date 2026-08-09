import Link from "next/link";
import { CalendarDays, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { safeGetPostsByServiceMatch } from "@/lib/db-safe";
import { formatDate } from "@/lib/format";

/**
 * Server component: shows blog posts relevant to the given service.
 * Matches posts by scoring title/excerpt/tags against the service name + features.
 */
export async function ServiceBlogPosts({
  serviceName,
  serviceFeatures,
}: {
  serviceName: string;
  serviceFeatures: string[];
}) {
  const posts = await safeGetPostsByServiceMatch(serviceName, serviceFeatures, 3);

  if (posts.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Related articles</h3>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Helpful reading about {serviceName.toLowerCase()}:
        </p>
        <div className="mt-4 space-y-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block rounded-lg border border-border p-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{p.category}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {p.readingTime} min
                </span>
              </div>
              <h4 className="mt-1.5 text-sm font-medium leading-snug group-hover:text-primary">{p.title}</h4>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Browse all articles <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
