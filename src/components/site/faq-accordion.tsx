"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Before hydration: render FAQs as static HTML.
  // This prevents the Radix useId() mismatch (server vs client IDs differ
  // when the component tree position changes due to async data fetching).
  // Static HTML is also better for SEO — content is fully crawlable.
  if (!mounted) {
    return (
      <div className="w-full divide-y divide-border">
        {items.map((item, i) => (
          <div key={i} className="py-4">
            <h3 className="flex flex-1 items-start justify-between gap-4 text-left text-base font-medium">
              {item.q}
            </h3>
            <p className="mt-1 pb-1 text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // After hydration: render the interactive accordion
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left text-base font-medium">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
