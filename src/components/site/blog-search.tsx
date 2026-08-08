"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, Loader2, CalendarDays, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

type SearchResult = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  publishedAt: string;
};

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searched, setSearched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim() || q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/search?q=${encodeURIComponent(q.trim())}`);
      const json = await res.json();
      setResults(json.posts ?? []);
      setSearched(true);
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
    setSearched(false);
  };

  // Close results on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles… (e.g. cost, shrinkage, allergens)"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowResults(true)}
          className="pl-9 pr-9"
          aria-label="Search blog posts"
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
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          {loading ? null : results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">No articles found for "{query}"</p>
              <p className="mt-1 text-xs text-muted-foreground/70">Try different keywords or browse all articles below.</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto scrollbar-thin">
              <p className="border-b border-border px-4 py-2 text-xs font-medium text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
              </p>
              {results.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  onClick={() => { setShowResults(false); setQuery(""); }}
                  className="block border-b border-border p-4 transition-colors last:border-b-0 hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{r.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {r.readingTime} min
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-medium leading-snug hover:text-primary">{r.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.excerpt}</p>
                  <span className="mt-1.5 flex items-center gap-1 text-xs text-primary">
                    Read article <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
