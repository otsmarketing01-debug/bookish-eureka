"use client";
import { useEffect, useState, useCallback } from "react";
import { Mail, Loader2, RefreshCw, Search, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/format";

type Email = {
  id: string;
  to: string;
  subject: string;
  body: string;
  type: string;
  status: string;
  error: string | null;
  createdAt: string;
};

type Stats = { total: number; sent: number; logged: number; failed: number };

const statusStyles: Record<string, string> = {
  sent: "border-success/30 bg-success/10 text-success",
  logged: "border-info/30 bg-info/10 text-info",
  failed: "border-destructive/30 bg-destructive/10 text-destructive",
};

const statusIcon: Record<string, typeof CheckCircle2> = {
  sent: CheckCircle2,
  logged: Clock,
  failed: XCircle,
};

const typeLabels: Record<string, string> = {
  admin_notification: "Admin",
  booking_confirmation: "Booking",
  contact_confirmation: "Contact",
  review_request: "Review",
};

export default function EmailLogPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, sent: 0, logged: 0, failed: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Email | null>(null);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/emails");
    const json = await res.json();
    setEmails(json.emails ?? []);
    setStats(json.stats ?? { total: 0, sent: 0, logged: 0, failed: 0 });
    setLoading(false);
  }, []);

  useEffect(() => { fetchEmails(); }, [fetchEmails]);

  const filtered = emails.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return e.to.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.type.toLowerCase().includes(q);
  });

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Email Log</h1>
            <p className="text-sm text-muted-foreground">
              {stats.total} total · {stats.sent} sent · {stats.logged} logged · {stats.failed} failed
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchEmails} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
          <Mail className="h-4 w-4 text-primary shrink-0" />
          <p>
            Emails are <strong className="text-foreground">logged</strong> when SMTP isn't configured (set <code className="rounded bg-background px-1 py-0.5">SMTP_HOST</code>, <code className="rounded bg-background px-1 py-0.5">SMTP_USER</code>, <code className="rounded bg-background px-1 py-0.5">SMTP_PASS</code> in .env to send for real). Logged emails show what <em>would</em> be sent so you can follow up manually.
          </p>
        </div>
        <div className="relative mt-3 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search recipient, subject, type…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-5">
        {/* List */}
        <ScrollArea className="h-full lg:col-span-2 lg:border-r">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Mail className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No emails yet.</p>
              <p className="px-6 text-xs text-muted-foreground/70">Booking/contact submissions will generate emails here.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((e) => {
                const Icon = statusIcon[e.status] ?? Clock;
                return (
                  <button
                    key={e.id}
                    onClick={() => setSelected(e)}
                    className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-accent ${selected?.id === e.id ? "bg-accent" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium">{e.subject}</span>
                      <Badge variant="outline" className={`capitalize ${statusStyles[e.status] ?? ""}`}>
                        <Icon className="mr-1 h-3 w-3" /> {e.status}
                      </Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">To: {e.to}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{typeLabels[e.type] ?? e.type}</span>
                      <span>·</span>
                      <span>{formatDate(e.createdAt)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Detail */}
        <div className="hidden overflow-y-auto lg:col-span-3 lg:block">
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <Mail className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Select an email to view its content</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{selected.subject}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">To: {selected.to}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(selected.createdAt)} · {typeLabels[selected.type] ?? selected.type}</p>
                </div>
                <Badge variant="outline" className={`capitalize ${statusStyles[selected.status] ?? ""}`}>{selected.status}</Badge>
              </div>
              {selected.error && (
                <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  <strong>Error:</strong> {selected.error}
                </div>
              )}
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold">Email content</h3>
                <div className="overflow-hidden rounded-lg border border-border">
                  <iframe
                    srcDoc={selected.body}
                    className="h-[28rem] w-full bg-white"
                    title="Email preview"
                    sandbox=""
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
