/**
 * FaqAccordion — renders FAQ items as native <details>/<summary> elements.
 * Pure server component (no "use client" needed — no hooks, no state, no event handlers).
 * Native HTML expand/collapse works without JavaScript.
 */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="w-full divide-y divide-border">
      {items.map((item, i) => (
        <details key={i} className="group py-4">
          <summary className="flex flex-1 cursor-pointer items-start justify-between gap-4 text-left text-base font-medium outline-none hover:underline [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg
              className="text-muted-foreground pointer-events-none mt-0.5 size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
