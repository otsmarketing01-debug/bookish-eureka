"use client";
import { useEffect, useState, useCallback } from "react";
import { Mail, Loader2, RefreshCw, Search, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  source: string;
  active: boolean;
  createdAt: string;
};

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchSubs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/newsletter");
    const json = await res.json();
    setSubscribers(json.subscribers ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSubs(); }, [fetchSubs]);

  const filtered = subscribers.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return s.email.toLowerCase().includes(q) || (s.name ?? "").toLowerCase().includes(q);
  });

  const activeCount = subscribers.filter((s) => s.active).length;
  const allEmails = subscribers.filter((s) => s.active).map((s) => s.email).join(", ");

  const copyEmails = async () => {
    try {
      await navigator.clipboard.writeText(allEmails);
      setCopied(true);
      toast.success(`Copied ${activeCount} email addresses`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Newsletter Subscribers</h1>
            <p className="text-sm text-muted-foreground">{activeCount} active · {subscribers.length} total</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyEmails} disabled={activeCount === 0}>
              {copied ? <CheckCircle2 className="mr-2 h-4 w-4 text-success" /> : <Copy className="mr-2 h-4 w-4" />}
              Copy all emails
            </Button>
            <Button variant="outline" size="sm" onClick={fetchSubs} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>
        </div>
        <div className="relative mt-4 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search email or name…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Mail className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No subscribers yet.</p>
              <p className="px-6 text-xs text-muted-foreground/70">Footer signups will appear here.</p>
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filtered.map((sub) => (
                    <div key={sub.id} className="flex items-center gap-4 px-4 py-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        <Mail className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{sub.email}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {sub.name ? `${sub.name} · ` : ""}Source: {sub.source} · {formatDate(sub.createdAt)}
                        </p>
                      </div>
                      <Badge variant={sub.active ? "outline" : "secondary"} className={sub.active ? "border-success/30 bg-success/10 text-success" : ""}>
                        {sub.active ? "Active" : "Unsubscribed"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
