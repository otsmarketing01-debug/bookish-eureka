"use client";
import { useEffect, useState, useCallback } from "react";
import { Star, Loader2, RefreshCw, Search, Trash2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";

type Review = {
  id: string;
  name: string;
  area: string | null;
  service: string;
  rating: number;
  title: string;
  body: string;
  status: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  pending: "border-warning/30 bg-warning/10 text-warning",
  approved: "border-success/30 bg-success/10 text-success",
  rejected: "border-destructive/30 bg-destructive/10 text-destructive",
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/reviews/${filter !== "all" ? `?status=${filter}` : ""}`);
    const json = await res.json();
    setReviews(json.reviews ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) { toast.error("Update failed"); return; }
    toast.success(status === "approved" ? "Review approved" : status === "rejected" ? "Review rejected" : "Updated");
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this review permanently?")) return;
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Delete failed"); return; }
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Deleted");
  };

  const filtered = reviews.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.body.toLowerCase().includes(q);
  });

  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Reviews</h1>
            <p className="text-sm text-muted-foreground">{pendingCount} pending · {approvedCount} approved · {reviews.length} total</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchReviews} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, title, body…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["all", "pending", "approved", "rejected"].map((s) => (
              <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)} className="capitalize">
                {s}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Star className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
              <p className="px-6 text-xs text-muted-foreground/70">Customer reviews from the /review page will appear here for moderation.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((r) => (
                <Card key={r.id}>
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30"}`} />
                            ))}
                          </div>
                          <h3 className="font-semibold">{r.title}</h3>
                          <Badge variant="outline" className={`capitalize ${statusStyles[r.status] ?? ""}`}>{r.status}</Badge>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">{r.body}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{r.name}</span>
                          {r.area && <><span>·</span><span>{r.area}</span></>}
                          <span>·</span>
                          <span>{r.service}</span>
                          <span>·</span>
                          <span>{formatDate(r.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        {r.status !== "approved" && (
                          <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "approved")} title="Approve">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          </Button>
                        )}
                        {r.status !== "rejected" && (
                          <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "rejected")} title="Reject">
                            <XCircle className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => remove(r.id)} title="Delete" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
