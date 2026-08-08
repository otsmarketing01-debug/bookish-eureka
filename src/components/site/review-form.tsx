"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Star, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, areas } from "@/lib/config";

export function ReviewForm({
  initialService,
  token,
  verifiedBooking,
}: {
  initialService?: string;
  token?: string;
  verifiedBooking?: { service: string; name: string; area?: string | null } | null;
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({
    name: verifiedBooking?.name || "",
    area: verifiedBooking?.area || "",
    service: verifiedBooking?.service || initialService || "",
    title: "",
    body: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, rating, token }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Submission failed");
        return;
      }
      toast.success("Review submitted!");
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
          <h3 className="text-xl font-bold">Thank you for your review!</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            We genuinely appreciate you taking the time to share your experience. Your review will appear on our testimonials page once approved by our team (usually within 1 business day).
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share your experience</CardTitle>
        <CardDescription>Your feedback helps other Johannesburg homeowners choose us.</CardDescription>
        {verifiedBooking && (
          <Badge variant="outline" className="mt-2 w-fit gap-1.5 border-success/30 bg-success/10 text-success">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified booking — {verifiedBooking.service}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Star rating */}
          <div className="space-y-1.5">
            <Label>Your rating *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="rounded p-1 transition-transform hover:scale-110"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      star <= (hover || rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && <span className="ml-2 text-sm font-medium text-muted-foreground">{rating}/5</span>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name *</Label>
              <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" required />
            </div>
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
                  <option key={a.slug} value={a.suburb}>{a.suburb}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="service">Service received *</Label>
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
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="title">Review title *</Label>
            <Input id="title" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Brilliant service, curtains look brand new!" required />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="body">Your review *</Label>
            <Textarea id="body" rows={4} value={form.body} onChange={(e) => update("body", e.target.value)} placeholder="Tell us about your experience — the process, the result, the team…" required />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Submit review
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Reviews are moderated and appear once approved. We never edit your words.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
