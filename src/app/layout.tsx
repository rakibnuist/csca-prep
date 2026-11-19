import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";

/**
 * Fonts are vendored under `src/fonts/` and loaded with `next/font/local`
 * rather than `next/font/google`.
 *
 * `next/font/google` downloads the font files from fonts.googleapis.com at
 * build time. That made `next build` fail outright whenever the build host
 * could not reach Google — including the Docker build that runs on the
 * Hostinger VPS. Vendoring the binaries removes that dependency entirely and
 * keeps the fonts self-hosted (no third-party request, no GDPR surface).
 */
const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

const display = localFont({
  src: [
    { path: "../fonts/Sora-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Sora-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Sora-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Sora-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

/**
 * Editorial display face. Sora is the interface voice; the serif is the
 * editorial voice — used for the biggest statements only (hero headline,
 * section openers). One weight, italic included, 21 kB each: cheaper than a
 * second sans family and far more distinctive.
 */
const serif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif-editorial",
  display: "swap",
});

const mono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CSCA Exam Preparation 2026–27 — Free Mock Tests & Question Papers",
    template: "%s · CSCA Master",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "CSCA",
    "CSCA exam",
    "CSCA exam preparation",
    "CSCA preparation",
    "CSCA question paper",
    "CSCA mock test",
    "CSCA free exam",
    "China Scholastic Competency Assessment",
    "study in China",
    "CSC scholarship",
    "CSCA mathematics",
    "CSCA physics",
    "CSCA chemistry",
    "CSCA sample questions",
  ],
  authors: [{ name: "CSCA Master" }],
  creator: "CSCA Master",
  // No global canonical: each page declares its own. A root-level "/" would
  // make every page that forgets one — auth, admin, the student app — claim to
  // be the homepage.
  // Machine-readable index for AI answer engines. Without this link an AI
  // crawler that lands on the homepage has no way to discover /llms.txt —
  // Cloudflare's AI Crawl Control showed crawlers arriving on "/" but never
  // on the structured file.
  other: {
    "llms-txt": `${SITE.url}/llms.txt`,
    "llms-full-txt": `${SITE.url}/llms-full.txt`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "CSCA Exam Preparation 2026–27 — Free Mock Tests & Question Papers",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "CSCA Exam Preparation 2026–27 — Free Mock Tests & Question Papers",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "education",
  /**
   * Search-engine ownership proofs.
   *
   * Set the value in the environment (Vercel/Hostinger env vars or .env.local)
   * and the meta tag appears in <head> on every page — no code change, no
   * secret in the repository. Empty values are omitted entirely so an
   * unconfigured deployment does not emit an empty tag.
   */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
        ? { "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
        : {}),
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/*
          Machine-readable index for AI answer engines. Without this link an
          AI crawler that lands on the homepage has no way to discover
          /llms.txt — Cloudflare's AI Crawl Control showed crawlers arriving
          on "/" but never on the structured file.
        */}
        <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="llms-full.txt" href="/llms-full.txt" />
      </head>
      <body className={`${inter.variable} ${display.variable} ${serif.variable} ${mono.variable} font-sans`}>
        {/*
          Marks JavaScript as available before hydration. Scroll-reveal animations
          only hide themselves behind `html.js`, so crawlers and no-JS visitors
          still receive the complete content.
        */}
        <Script id="csca-js-flag" strategy="beforeInteractive">
          {'document.documentElement.classList.add("js")'}
        </Script>
        {children}
      </body>
    </html>
  );
}
