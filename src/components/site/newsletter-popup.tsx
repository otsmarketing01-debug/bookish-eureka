"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

const DISMISS_KEY = "jhb_popup_dismissed_at";
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MIN_TIME_ON_PAGE_MS = 8000; // show after 8s if exit intent triggers
const TRIGGER_DELAY_MS = 12000; // fallback: show after 12s even without exit intent

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [mountedAt] = useState(() => Date.now());

  const shouldShow = useCallback(() => {
    if (typeof window === "undefined") return false;
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const age = Date.now() - parseInt(dismissed, 10);
      if (age < DISMISS_COOLDOWN_MS) return false;
    }
    return true;
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }, []);

  // Exit-intent detection (desktop: mouseout top, mobile: fallback timer)
  useEffect(() => {
    if (!shouldShow()) return;

    let triggered = false;
    const tryOpen = () => {
      if (triggered) return;
      if (Date.now() - mountedAt < MIN_TIME_ON_PAGE_MS) return;
      triggered = true;
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      // Only trigger when the mouse leaves through the top of the viewport
      if (e.clientY <= 0 && !e.relatedTarget) {
        tryOpen();
      }
    };

    // Fallback timer for mobile / no exit-intent
    const timer = setTimeout(() => {
      if (!triggered) {
        triggered = true;
        setOpen(true);
      }
    }, TRIGGER_DELAY_MS);

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      clearTimeout(timer);
    };
  }, [shouldShow, mountedAt]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "popup" }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Something went wrong");
        return;
      }
      setDone(true);
      toast.success("You're in! Check your inbox for your discount.");
      setTimeout(() => dismiss(), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {done ? (
              <div className="flex flex-col items-center gap-3 p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h2 id="popup-title" className="text-xl font-bold">Welcome aboard!</h2>
                <p className="max-w-xs text-sm text-muted-foreground">
                  You're subscribed. We'll send your cleaning tips and exclusive offers straight to your inbox.
                </p>
              </div>
            ) : (
              <>
                {/* Header band */}
                <div className="relative bg-primary px-6 py-8 text-center text-primary-foreground">
                  <div className="absolute inset-0 bg-grid opacity-10" />
                  <div className="relative">
                    <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/15">
                      <Gift className="h-6 w-6" />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                      Exclusive offer
                    </p>
                    <h2 id="popup-title" className="mt-1 text-2xl font-bold">
                      Get 10% off your first clean
                    </h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-center text-sm text-muted-foreground">
                    Join 2,000+ Johannesburg homeowners. Get monthly cleaning tips, seasonal offers, and an instant <span className="font-semibold text-foreground">10% discount</span> on your first booking.
                  </p>
                  <form onSubmit={onSubmit} className="mt-5 space-y-3">
                    <Input
                      type="email"
                      placeholder="you@example.co.za"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      className="h-11"
                      aria-label="Email address"
                    />
                    <Button type="submit" className="h-11 w-full" disabled={loading || !email.trim()}>
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Claim my 10% discount
                    </Button>
                  </form>
                  <button
                    onClick={dismiss}
                    className="mt-3 w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    No thanks, I'll pay full price
                  </button>
                  <p className="mt-3 text-center text-[11px] text-muted-foreground/70">
                    No spam. Unsubscribe anytime. POPIA compliant.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
