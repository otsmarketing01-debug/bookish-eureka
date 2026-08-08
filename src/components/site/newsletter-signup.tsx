"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup({ variant = "footer" }: { variant?: "footer" | "inline" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: variant }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Something went wrong");
        return;
      }
      toast.success("Subscribed! Check your inbox for a welcome email.");
      setDone(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className={`flex items-center gap-2.5 ${variant === "footer" ? "rounded-lg bg-success/10 px-3 py-2.5" : "rounded-xl border border-success/30 bg-success/10 p-6 text-center"}`}>
        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
        <div className={variant === "inline" ? "mx-auto" : ""}>
          <p className="text-sm font-medium text-foreground">You're subscribed!</p>
          <p className="text-xs text-muted-foreground">Watch your inbox for cleaning tips & special offers.</p>
        </div>
        {variant === "footer" && (
          <button onClick={() => setDone(false)} className="ml-auto text-xs text-muted-foreground hover:text-foreground">
            Undo
          </button>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Get cleaning tips in your inbox</h3>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Join 2,000+ Johannesburg homeowners. Monthly tips, no spam, unsubscribe anytime.
        </p>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="you@example.co.za"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !email.trim()}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
            Subscribe
          </Button>
        </form>
      </div>
    );
  }

  // footer variant — compact
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-9 bg-background/60"
          aria-label="Email address"
        />
        <Button type="submit" size="sm" disabled={loading || !email.trim()} className="shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
        </Button>
      </div>
      <p className="text-[11px] text-muted-foreground/70">Monthly tips & offers. Unsubscribe anytime.</p>
    </form>
  );
}
