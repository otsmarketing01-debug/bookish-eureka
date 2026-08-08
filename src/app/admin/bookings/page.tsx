"use client";
import { useEffect, useState, useCallback } from "react";
import { CalendarCheck, Loader2, RefreshCw, Search, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  area: string | null;
  address: string | null;
  preferredDate: string;
  preferredSlot: string;
  message: string | null;
  status: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  pending: "border-warning/30 bg-warning/10 text-warning",
  confirmed: "border-info/30 bg-info/10 text-info",
  completed: "border-success/30 bg-success/10 text-success",
  cancelled: "border-destructive/30 bg-destructive/10 text-destructive",
};

const statuses = ["pending", "confirmed", "completed", "cancelled"];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

const slotLabels: Record<string, string> = {
  morning: "Morning (07:00–12:00)",
  afternoon: "Afternoon (12:00–18:00)",
  anytime: "Flexible",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/bookings?status=${filter}`);
    const json = await res.json();
    setBookings(json.bookings ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) { toast.error("Failed to update"); return; }
    toast.success(`Marked as ${status}`);
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    setSelected((prev) => prev && prev.id === id ? { ...prev, status } : prev);
  };

  const filtered = bookings.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return b.name.toLowerCase().includes(q) || b.phone.includes(q) || b.service.toLowerCase().includes(q);
  });

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Bookings</h1>
            <p className="text-sm text-muted-foreground">{bookings.length} booking{bookings.length !== 1 ? "s" : ""}</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchBookings} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, phone, service…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-1.5">
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
              <CalendarCheck className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-accent ${selected?.id === b.id ? "bg-accent" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{b.name}</span>
                    <Badge variant="outline" className={`capitalize ${statusStyles[b.status] ?? ""}`}>{b.status}</Badge>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{b.service} · {b.phone}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(b.preferredDate)}</span>
                    <span>·</span>
                    <span className="capitalize">{b.preferredSlot}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Detail */}
        <div className="hidden overflow-y-auto lg:col-span-3 lg:block">
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <CalendarCheck className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Select a booking to view details</p>
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
                    <p className="text-sm text-muted-foreground">Booked {formatDate(selected.createdAt)}</p>
                  </div>
                </div>
                <Badge variant="outline" className={`capitalize ${statusStyles[selected.status] ?? ""}`}>{selected.status}</Badge>
              </div>

              <div className="mt-6 space-y-3">
                <a href={`tel:${selected.phone}`} className="flex items-center gap-2.5 rounded-lg border border-border p-3 text-sm hover:bg-accent">
                  <Phone className="h-4 w-4 text-primary" /> {selected.phone}
                </a>
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2.5 rounded-lg border border-border p-3 text-sm hover:bg-accent">
                  <Mail className="h-4 w-4 text-primary" /> <span className="break-all">{selected.email}</span>
                </a>
                <div className="flex items-center gap-2.5 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                  <CalendarCheck className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">{formatDate(selected.preferredDate)}</p>
                    <p className="text-xs text-muted-foreground">{slotLabels[selected.preferredSlot] ?? selected.preferredSlot}</p>
                  </div>
                </div>
                {(selected.area || selected.address) && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-border p-3 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      {selected.area && <p className="font-medium">{selected.area}</p>}
                      {selected.address && <p className="text-muted-foreground">{selected.address}</p>}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Service requested</h3>
                <p className="mt-1 rounded-lg bg-muted/50 p-3 text-sm">{selected.service}</p>
              </div>

              {selected.message && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold">Customer notes</h3>
                  <p className="mt-1 rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">{selected.message}</p>
                </div>
              )}

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
