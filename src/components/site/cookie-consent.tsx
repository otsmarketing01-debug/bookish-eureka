"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

const CONSENT_KEY = "jhb_popia_consent";
const CONSENT_VERSION = "1.0";

type Consent = {
  version: string;
  accepted: boolean;
  analytics: boolean;
  timestamp: number;
};

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const parsed: Consent = JSON.parse(stored);
        // Re-show if version changed
        if (parsed.version === CONSENT_VERSION && parsed.accepted) return;
      }
    } catch {
      // ignore parse errors
    }
    // Small delay so it doesn't fight with the newsletter popup on first paint
    const timer = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const save = useCallback((accepted: boolean, analytics: boolean) => {
    const consent: Consent = {
      version: CONSENT_VERSION,
      accepted,
      analytics: accepted ? analytics : false,
      timestamp: Date.now(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setOpen(false);
  }, []);

  const acceptAll = () => save(true, true);
  const acceptEssential = () => save(true, false);
  const dismiss = () => save(false, false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-4 sm:bottom-4"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
        >
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cookie className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="cookie-title" className="text-sm font-semibold sm:text-base">
                  We value your privacy
                </h2>
                <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                  We use cookies to keep our site working (essential), understand how you use it (analytics), and remember your preferences. Under South Africa's <strong className="font-medium text-foreground">POPIA</strong> (Protection of Personal Information Act), you choose what to allow. Read our{" "}
                  <a href="/contact" className="font-medium text-primary underline-offset-2 hover:underline">privacy policy</a>.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" onClick={acceptAll} className="h-9">
                    <Check className="mr-1.5 h-4 w-4" /> Accept all
                  </Button>
                  <Button size="sm" variant="outline" onClick={acceptEssential} className="h-9">
                    Essential only
                  </Button>
                  <Button size="sm" variant="ghost" onClick={dismiss} className="h-9 text-muted-foreground" aria-label="Dismiss">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
