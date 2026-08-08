import Link from "next/link";
import { Home, Phone, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Search className="h-5 w-5" />
            </span>
            <span className="font-bold">{siteConfig.shortName}</span>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="text-7xl font-bold text-primary sm:text-9xl">404</p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">This page took its curtains down</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            We couldn't find the page you were looking for. It may have been moved or never existed.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/"><Home className="mr-2 h-4 w-4" /> Back to Home</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${siteConfig.phone}`}><Phone className="mr-2 h-4 w-4" /> {siteConfig.phoneDisplay}</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <Link href="/blog" className="inline-flex items-center gap-1 hover:text-foreground">Blog <ArrowRight className="h-3 w-3" /></Link>
            <span>·</span>
            <Link href="/contact" className="inline-flex items-center gap-1 hover:text-foreground">Contact <ArrowRight className="h-3 w-3" /></Link>
            <span>·</span>
            <Link href="/#services" className="inline-flex items-center gap-1 hover:text-foreground">Services <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </main>
    </div>
  );
}
