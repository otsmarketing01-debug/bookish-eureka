"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export function Markdown({ content }: { content: string }) {
  return (
    <div className="text-[15px] leading-relaxed text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="mt-10 text-2xl font-bold tracking-tight first:mt-0">{children}</h1>,
          h2: ({ children }) => (
            <h2 className="mt-10 scroll-mt-24 border-b border-border pb-2 text-xl font-bold tracking-tight">{children}</h2>
          ),
          h3: ({ children }) => <h3 className="mt-6 text-lg font-semibold tracking-tight">{children}</h3>,
          h4: ({ children }) => <h4 className="mt-5 text-base font-semibold">{children}</h4>,
          p: ({ children }) => <p className="my-4">{children}</p>,
          a: ({ href, children }) => (
            <Link href={href ?? "#"} className="font-medium text-primary underline-offset-2 hover:underline">
              {children}
            </Link>
          ),
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => <ul className="my-4 list-disc space-y-1.5 pl-6 marker:text-primary">{children}</ul>,
          ol: ({ children }) => <ol className="my-4 list-decimal space-y-1.5 pl-6 marker:font-semibold marker:text-primary">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-5 border-l-4 border-primary bg-muted/40 py-2 pl-4 pr-3 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-border" />,
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-muted/60">{children}</thead>,
          th: ({ children }) => <th className="px-4 py-2.5 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="border-t border-border px-4 py-2.5 align-top">{children}</td>,
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) return <code className="rounded bg-muted px-1.5 py-0.5 text-[13px] font-mono">{children}</code>;
            return <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code>{children}</code></pre>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
