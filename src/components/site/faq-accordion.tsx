"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Static FAQ content rendered on the server (SEO-friendly, no Radix IDs).
function StaticFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="w-full divide-y divide-border">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <h3 className="text-left text-base font-medium">{item.q}</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  );
}

// Interactive accordion — client-only via dynamic import (ssr: false)
const InteractiveAccordion = dynamic(
  () => import("@/components/site/interactive-accordion").then((m) => m.InteractiveAccordion),
  {
    ssr: false,
    loading: () => null,
  }
);

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [swapped, setSwapped] = useState(false);
  useEffect(() => {
    // Small delay to ensure the dynamic import has rendered
    const timer = setTimeout(() => setSwapped(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Static content — visible until interactive accordion loads */}
      <div className={swapped ? "hidden" : ""}>
        <StaticFaq items={items} />
      </div>
      {/* Interactive accordion — replaces static content on client */}
      {swapped && (
        <InteractiveAccordion items={items} />
      )}
    </>
  );
}
