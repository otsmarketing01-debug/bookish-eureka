"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, Loader2, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type PostData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  author: string;
  readingTime: number;
  published: boolean;
  featured: boolean;
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 200);
}

export function BlogEditor({ initial }: { initial: PostData }) {
  const router = useRouter();
  const [data, setData] = useState<PostData>(initial);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!initial.slug);

  const isEdit = !!initial.id;

  const update = (k: keyof PostData, v: any) => setData((p) => ({ ...p, [k]: v }));

  const onTitleChange = (v: string) => {
    update("title", v);
    if (autoSlug) update("slug", slugify(v));
  };

  const onSave = async (publish = false) => {
    if (!data.title.trim() || !data.slug.trim() || !data.content.trim()) {
      toast.error("Title, slug, and content are required");
      return;
    }
    setSaving(true);
    const payload = {
      ...data,
      readingTime: data.readingTime > 0 ? data.readingTime : undefined,
      published: publish ? true : data.published,
    };
    try {
      const url = isEdit ? `/api/blog/${initial.id}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Save failed");
        return;
      }
      toast.success(isEdit ? "Post updated" : "Post created");
      router.push("/admin/blog");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const wordCount = data.content.trim().split(/\s+/).filter(Boolean).length;
  const estReading = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button asChild variant="ghost" size="icon" className="shrink-0">
              <Link href="/admin/blog"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-tight truncate">{isEdit ? "Edit post" : "New post"}</h1>
              <p className="text-xs text-muted-foreground">{wordCount} words · ~{estReading} min read</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={() => onSave(false)} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save draft
            </Button>
            <Button size="sm" onClick={() => onSave(true)} disabled={saving}>
              <Eye className="mr-2 h-4 w-4" /> Save & Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Main fields */}
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" value={data.title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Curtain Cleaning Costs in Johannesburg: A 2026 Guide" className="text-base" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug">URL slug *</Label>
                  <button
                    type="button"
                    onClick={() => setAutoSlug((v) => !v)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {autoSlug ? "Auto from title ✓" : "Auto from title"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/blog/</span>
                  <Input id="slug" value={data.slug} onChange={(e) => { update("slug", slugify(e.target.value)); setAutoSlug(false); }} placeholder="curtain-cleaning-costs-johannesburg" className="flex-1 font-mono text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea id="excerpt" rows={2} value={data.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="A short summary shown on the blog index and in search results…" />
                <p className="text-xs text-muted-foreground">{data.excerpt.length}/400 characters</p>
              </div>
            </CardContent>
          </Card>

          {/* Content editor */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base"><FileText className="h-4 w-4" /> Content (Markdown)</CardTitle>
                <Badge variant="outline" className="gap-1"><Sparkles className="h-3 w-3" /> Supports GFM tables</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                id="content"
                rows={18}
                value={data.content}
                onChange={(e) => update("content", e.target.value)}
                placeholder={"Write your post in Markdown.\n\n## Subheading\n\nParagraph text...\n\n- Bullet point\n- Another point\n\n| Col A | Col B |\n|---|---|\n| R450 | Voile |"}
                className="resize-y font-mono text-sm leading-relaxed"
              />
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{wordCount} words</span>
                <span>·</span>
                <span>~{estReading} min read</span>
                <span>·</span>
                <span>Use ## for headings, **bold**, - for lists, | for tables</span>
              </div>
            </CardContent>
          </Card>

          {/* Meta sidebar fields */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="text-sm font-semibold">Organisation</h3>
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" value={data.category} onChange={(e) => update("category", e.target.value)} placeholder="Pricing" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" value={data.tags} onChange={(e) => update("tags", e.target.value)} placeholder="curtain cleaning cost, pricing" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" value={data.author} onChange={(e) => update("author", e.target.value)} placeholder="JHB Curtain Cleaning" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="readingTime">Reading time (min) — leave 0 to auto-calc</Label>
                  <Input id="readingTime" type="number" min={0} max={60} value={data.readingTime} onChange={(e) => update("readingTime", Number(e.target.value))} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="text-sm font-semibold">Display & publish</h3>
                <div className="space-y-1.5">
                  <Label htmlFor="coverImage">Cover image URL (optional)</Label>
                  <Input id="coverImage" value={data.coverImage} onChange={(e) => update("coverImage", e.target.value)} placeholder="https://… or /blog/my-image.jpg" />
                  {data.coverImage && <img src={data.coverImage} alt="Cover preview" className="mt-2 h-24 w-full rounded-md object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                </div>
                <label className="flex items-center gap-2.5 rounded-md border border-border p-3 cursor-pointer hover:bg-accent">
                  <input type="checkbox" checked={data.published} onChange={(e) => update("published", e.target.checked)} className="h-4 w-4 accent-primary" />
                  <div>
                    <p className="text-sm font-medium">Published</p>
                    <p className="text-xs text-muted-foreground">Visible on the public blog</p>
                  </div>
                </label>
                <label className="flex items-center gap-2.5 rounded-md border border-border p-3 cursor-pointer hover:bg-accent">
                  <input type="checkbox" checked={data.featured} onChange={(e) => update("featured", e.target.checked)} className="h-4 w-4 accent-primary" />
                  <div>
                    <p className="text-sm font-medium">Featured</p>
                    <p className="text-xs text-muted-foreground">Shown as the highlighted post</p>
                  </div>
                </label>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
