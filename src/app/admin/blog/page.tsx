"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FileText, Loader2, RefreshCw, ExternalLink, Trash2, Star, Eye, EyeOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published: boolean;
  featured: boolean;
  readingTime: number;
  publishedAt: string;
  createdAt: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/blog");
    const json = await res.json();
    setPosts(json.posts ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const toggle = async (id: string, field: "published" | "featured", value: boolean) => {
    const res = await fetch(`/api/blog/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    if (!res.ok) { toast.error("Update failed"); return; }
    const data = await res.json();
    setPosts((prev) => prev.map((p) => (p.id === id ? data.post : p)));
    toast.success(`${field} ${value ? "enabled" : "disabled"}`);
  };

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Delete failed"); return; }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Post deleted");
  };

  const publishedCount = posts.filter((p) => p.published).length;
  const featuredCount = posts.filter((p) => p.featured).length;

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-sm text-muted-foreground">{publishedCount} published · {featuredCount} featured · {posts.length} total</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchPosts} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button size="sm" onClick={() => toast.info("Blog editor coming soon — posts are seeded via the content system.")}>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <FileText className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <Card key={post.id} className="transition-shadow hover:shadow-sm">
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{post.title}</h3>
                        {post.published ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                        {post.featured && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300"><Star className="mr-1 h-3 w-3 fill-current" />Featured</Badge>}
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{post.excerpt}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>/blog/{post.slug}</span>
                        <span>·</span>
                        <span>{post.readingTime} min read</span>
                        <span>·</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button asChild variant="ghost" size="icon" title="View post">
                        <Link href={`/blog/${post.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" title={post.published ? "Unpublish" : "Publish"} onClick={() => toggle(post.id, "published", !post.published)}>
                        {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" title={post.featured ? "Unfeature" : "Feature"} onClick={() => toggle(post.id, "featured", !post.featured)}>
                        <Star className={`h-4 w-4 ${post.featured ? "fill-amber-400 text-amber-400" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => remove(post.id, post.title)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
