import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { CookieConsent } from "@/components/site/cookie-consent";
import { Analytics } from "@/components/site/analytics";
import { warnIfEnvIncomplete } from "@/lib/env-guard";
import { siteConfig } from "@/lib/config";

// Run env integrity check once at module load (startup)
warnIfEnvIncomplete();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Professional Curtain Cleaning Johannesburg | JHB Curtain Cleaning — Free Assessment",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "curtain cleaning Johannesburg",
    "on-site curtain cleaning",
    "curtain cleaning near me",
    "no shrinkage curtain cleaning",
    "professional curtain cleaners Johannesburg",
    "blind cleaning",
    "mattress sanitisation",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Professional Curtain Cleaning Johannesburg | JHB Curtain Cleaning",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_ZA",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1344, height: 768, alt: "JHB Curtain Cleaning — professional on-site curtain cleaning" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JHB Curtain Cleaning",
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <CookieConsent />
        <Toaster />
        <SonnerToaster richColors position="top-center" />
      </body>
    </html>
  );
}
