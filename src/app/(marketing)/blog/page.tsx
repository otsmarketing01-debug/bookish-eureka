import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, ArrowRight, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { BlogSearch } from "@/components/site/blog-search";
import { safeGetPublishedPosts, safeGetCategories } from "@/lib/db-safe"
import { safeGetCategories } from "@/lib/db-safe";;
import { siteConfig } from "@/lib/config";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Curtain Cleaning Blog — Tips, Guides & Pricing | JHB Curtain Cleaning",
  description:
    "Expert guides on curtain cleaning costs, on-site methods, allergen removal, and maintenance frequency for Johannesburg homes and businesses.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([safeGetPublishedPosts(), safeGetCategories()]);
  const [featured, ...rest] = posts;

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 gap-1.5">
              <Newspaper className="h-3.5 w-3.5" /> The JHB Blog
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Curtain cleaning tips, guides & pricing
            </h1>
            <p className="mt-4 text-muted-foreground">
              Practical advice from Johannesburg's on-site curtain cleaning specialists.
            </p>
          </div>
        </Reveal>

        {/* Categories + Search */}
        {categories.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <BlogSearch />
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((c) => (
                  <Badge key={c.name} variant="outline" className="px-3 py-1">
                    {c.name} <span className="ml-1 text-muted-foreground">({c.count})</span>
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Featured post */}
        {featured && (
          <Reveal delay={0.15}>
            <Link href={`/blog/${featured.slug}`} className="group mt-12 block">
              <Card className="overflow-hidden transition-all hover:shadow-lg md:grid md:grid-cols-2">
                <div className="relative flex min-h-[220px] items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
                  {featured.coverImage ? (
                    <Image
                      src={featured.coverImage}
                      alt={`${featured.title} — article cover`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <span className="text-5xl font-bold text-primary/30">"{featured.title.charAt(0)}"</span>
                  )}
                </div>
                <div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Featured</Badge>
                      <Badge variant="outline">{featured.category}</Badge>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight group-hover:text-primary">
                      {featured.title}
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{featured.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(featured.publishedAt)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readingTime} min read</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Reveal>
        )}

        {/* Rest of posts */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/10 to-transparent">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={`${post.title} — article cover`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary/25">{post.title.charAt(0)}</span>
                    )}
                  </div>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">{post.category}</Badge>
                    <h3 className="mt-2 font-semibold leading-snug group-hover:text-primary">{post.title}</h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime} min</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight">Need your curtains cleaned?</h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Get a free, no-obligation on-site assessment from Johannesburg's trusted curtain cleaning specialists.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
