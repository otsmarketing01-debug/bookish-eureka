"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CalendarCheck, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { services, areas } from "@/lib/config";

const slots = [
  { id: "morning", label: "Morning", time: "07:00 – 12:00" },
  { id: "afternoon", label: "Afternoon", time: "12:00 – 18:00" },
  { id: "anytime", label: "Anytime", time: "Flexible" },
] as const;

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}
function maxISO() {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().split("T")[0];
}

export function BookingForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    area: "",
    address: "",
    preferredDate: tomorrowISO(),
    preferredSlot: "morning" as "morning" | "afternoon" | "anytime",
    message: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Booking failed");
        return;
      }
      toast.success("Booking received! We'll confirm by phone.");
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Card className="border-success/30">
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <CheckCircle2 className="h-14 w-14 text-success" />
          <h3 className="text-xl font-bold">Booking received!</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Thank you, {form.name.split(" ")[0]}. We've got your request for{" "}
            <strong className="text-foreground">{form.service}</strong> on{" "}
            <strong className="text-foreground">{new Date(form.preferredDate).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })}</strong>{" "}
            ({form.preferredSlot}). One of our team will call you on {form.phone} within 1 business hour to confirm.
          </p>
          <Button variant="outline" size="sm" onClick={() => setDone(false)}>
            Make another booking
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-primary" /> Book your on-site assessment</CardTitle>
        <CardDescription>Pick a date and time that suits you. Free, no obligation.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+27 82 555 0000" required />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.co.za" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="service">Service needed *</Label>
              <select
                id="service"
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              >
                <option value="">Select service…</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.name}>{s.name}</option>
                ))}
                <option value="Not sure">Not sure yet</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="area">Area</Label>
              <select
                id="area"
                value={form.area}
                onChange={(e) => update("area", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select area…</option>
                {areas.map((a) => (
                  <option key={a.slug} value={a.region}>{a.region} ({a.suburb})</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Street address (optional)</Label>
              <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="10 2nd Ave, Florida" />
            </div>
          </div>

          {/* Date picker */}
          <div className="space-y-1.5">
            <Label htmlFor="preferredDate">Preferred date *</Label>
            <Input
              id="preferredDate"
              type="date"
              min={tomorrowISO()}
              max={maxISO()}
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Mon–Sat. We're closed Sundays.</p>
          </div>

          {/* Slot picker */}
          <div className="space-y-1.5">
            <Label>Preferred time *</Label>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => update("preferredSlot", slot.id)}
                  className={`flex flex-col items-center gap-0.5 rounded-lg border p-3 text-center transition-all ${
                    form.preferredSlot === slot.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <Clock className={`h-4 w-4 ${form.preferredSlot === slot.id ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium">{slot.label}</span>
                  <span className="text-[11px] text-muted-foreground">{slot.time}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Anything else? (optional)</Label>
            <Textarea id="message" rows={2} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Number of curtains, fabric type, access notes…" />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarCheck className="mr-2 h-4 w-4" />}
            Confirm booking request
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No payment now — we confirm by phone within 1 business hour.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
