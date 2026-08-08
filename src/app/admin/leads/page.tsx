"use client";
import { useEffect, useState, useCallback } from "react";
import { Inbox, Mail, Phone, MapPin, Loader2, Search, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  area: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  new: "border-success/30 bg-success/10 text-success",
  contacted: "border-warning/30 bg-warning/10 text-warning",
  won: "border-info/30 bg-info/10 text-info",
  lost: "border-destructive/30 bg-destructive/10 text-destructive",
};

const statuses = ["new", "contacted", "won", "lost"];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/leads?status=${filter}`);
    const json = await res.json();
    setLeads(json.submissions ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) { toast.error("Failed to update"); return; }
    toast.success(`Marked as ${status}`);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setSelected((prev) => prev && prev.id === id ? { ...prev, status } : prev);
  };

  const filtered = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.service ?? "").toLowerCase().includes(q);
  });

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Leads</h1>
            <p className="text-sm text-muted-foreground">{leads.length} submission{leads.length !== 1 ? "s" : ""}</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, email, service…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1.5">
            {["all", ...statuses].map((s) => (
              <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)} className="capitalize">
                {s}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-5">
        {/* List */}
        <ScrollArea className="h-full lg:col-span-2 lg:border-r">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Inbox className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No leads found.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-accent ${selected?.id === lead.id ? "bg-accent" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{lead.name}</span>
                    <Badge variant="outline" className={`capitalize ${statusStyles[lead.status] ?? ""}`}>{lead.status}</Badge>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{lead.email}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {lead.service && <span className="truncate">{lead.service}</span>}
                    {lead.area && <><span>·</span><span>{lead.area}</span></>}
                  </div>
                  <span className="text-[11px] text-muted-foreground/70">{formatDate(lead.createdAt)}</span>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Detail */}
        <div className="hidden overflow-y-auto lg:col-span-3 lg:block">
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <Mail className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Select a lead to view details</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {selected.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground">Submitted {formatDate(selected.createdAt)}</p>
                  </div>
                </div>
                <Badge variant="outline" className={`capitalize ${statusStyles[selected.status] ?? ""}`}>{selected.status}</Badge>
              </div>

              <div className="mt-6 space-y-3">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2.5 rounded-lg border border-border p-3 text-sm hover:bg-accent">
                  <Mail className="h-4 w-4 text-primary" /> {selected.email}
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2.5 rounded-lg border border-border p-3 text-sm hover:bg-accent">
                    <Phone className="h-4 w-4 text-primary" /> {selected.phone}
                  </a>
                )}
                {(selected.service || selected.area) && (
                  <div className="flex items-center gap-2.5 rounded-lg border border-border p-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    {[selected.service, selected.area].filter(Boolean).join(" · ")}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Message</h3>
                <p className="mt-2 rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">{selected.message}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Update status</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <Button key={s} size="sm" variant={selected.status === s ? "default" : "outline"} onClick={() => updateStatus(selected.id, s)} className="capitalize">
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
