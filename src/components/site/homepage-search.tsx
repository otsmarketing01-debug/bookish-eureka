"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, Loader2, ArrowRight, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type SearchResult = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
};

const POPULAR_SEARCHES = ["costs", "shrinkage", "allergens", "how often", "velvet"];

export function HomepageSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim() || q.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/search?q=${encodeURIComponent(q.trim())}`);
      const json = await res.json();
      setResults(json.posts ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const onChange = (v: string) => {
    setQuery(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(v), 300);
  };

  const clear = () => {
    setQuery("");
    setResults([]);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const goToBlog = () => {
    router.push(query.trim() ? `/blog?q=${encodeURIComponent(query.trim())}` : "/blog");
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles & guides…"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowResults(true)}
          onKeyDown={(e) => { if (e.key === "Enter") goToBlog(); }}
          className="h-11 pl-9 pr-9"
          aria-label="Search articles"
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {loading && (
          <Loader2 className="absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Results dropdown */}
      {showResults && query.trim().length >= 2 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          {loading ? null : results.length === 0 ? (
            <div className="p-5 text-center">
              <p className="text-sm text-muted-foreground">No articles found for "{query}"</p>
              <button onClick={goToBlog} className="mt-2 text-xs text-primary hover:underline">
                Browse all articles →
              </button>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              <p className="border-b border-border px-4 py-2 text-xs font-medium text-muted-foreground">
                {results.length} article{results.length !== 1 ? "s" : ""}
              </p>
              {results.slice(0, 5).map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  onClick={() => { setShowResults(false); setQuery(""); }}
                  className="block border-b border-border p-3 transition-colors last:border-b-0 hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{r.category}</Badge>
                    <span className="text-xs text-muted-foreground">{r.readingTime} min</span>
                  </div>
                  <h3 className="mt-1 text-sm font-medium leading-snug hover:text-primary">{r.title}</h3>
                </Link>
              ))}
              <button onClick={goToBlog} className="block w-full p-3 text-center text-xs text-primary hover:bg-accent">
                View all results <ArrowRight className="ml-1 inline h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Popular searches */}
      {!query && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" /> Popular:
          </span>
          {POPULAR_SEARCHES.map((s) => (
            <button
              key={s}
              onClick={() => { onChange(s); setShowResults(true); }}
              className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
