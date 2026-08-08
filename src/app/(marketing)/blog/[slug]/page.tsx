import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays, Clock, ArrowLeft, ArrowRight, ChevronRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Markdown } from "@/components/site/markdown";
import { ReadingProgress } from "@/components/site/reading-progress";
import { BlogRelatedServices } from "@/components/site/blog-related-services";
import { getPostBySlug, getRelatedPosts, getPublishedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { formatDate } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  const ogImage = post.coverImage ?? `/blog/og/${slug}-og.jpg`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author],
      images: [{ url: ogImage, width: 1344, height: 768, alt: `${post.title} — article cover` }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, post.category, 3);

  return (
    <article className="py-10 sm:py-14">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Blog", url: `${siteConfig.url}/blog` },
              { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
            ])
          ),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate text-foreground">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mt-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-balance">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 border-y border-border py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {post.author.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-muted-foreground">Certified cleaning specialist</p>
            </div>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative mt-6 aspect-[16/7] overflow-hidden rounded-xl border border-border">
            <Image
              src={post.coverImage}
              alt={`${post.title} — article cover image`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="mt-8">
          <Markdown content={post.content} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {post.tags.map((t) => (
              <Badge key={t} variant="outline" className="font-normal">{t}</Badge>
            ))}
          </div>
        )}

        {/* CTA */}
        <Card className="mt-10 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Ready for spotless curtains?</h3>
              <p className="text-sm text-muted-foreground">
                Book a free on-site assessment from Johannesburg's on-site specialists.
              </p>
            </div>
            <Button asChild className="shrink-0">
              <Link href="/book">Book a Free Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="mt-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> All articles</Link>
          </Button>
        </div>

        {/* Related services + articles */}
        <section className="mt-14 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="mb-4 text-xl font-bold tracking-tight">Related services</h2>
            <BlogRelatedServices category={post.category} tags={post.tags} />
          </div>
          {related.length > 0 && (
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-xl font-bold tracking-tight">Related articles</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                    <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
                      <CardContent className="p-5">
                        <Badge variant="outline" className="text-xs">{r.category}</Badge>
                        <h3 className="mt-2 font-medium leading-snug group-hover:text-primary">{r.title}</h3>
                        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{r.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
