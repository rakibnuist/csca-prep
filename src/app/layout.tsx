import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CSCA Master — Full-length CSCA mock exams & syllabus-aligned practice",
    template: "%s · CSCA Master",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "CSCA",
    "CSCA exam",
    "CSCA mock test",
    "China Scholastic Competency Assessment",
    "CSCA preparation",
    "study in China",
    "CSC scholarship",
    "CSCA mathematics",
    "CSCA physics",
    "CSCA chemistry",
    "CSCA sample questions",
  ],
  authors: [{ name: "CSCA Master" }],
  creator: "CSCA Master",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "CSCA Master — the exam-accurate CSCA preparation platform",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "CSCA Master — the exam-accurate CSCA preparation platform",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  width: "device-width",
  initialScale: 1,
};

const ORGANISATION_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      email: SITE.email,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${display.variable} ${mono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANISATION_JSONLD) }}
        />
        {children}
      </body>
    </html>
  );
}
