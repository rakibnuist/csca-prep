import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cscamaster.com'), // Replace with actual domain
  title: {
    default: "CSCA Prep Master | Free CSCA Exam Preparation",
    template: "%s | CSCA Prep Master",
  },
  description: "The only 100% Free preparation platform for English & Chinese tracks. Access 15+ Mock Tests, Whiteboard-Mode practice, and verified scholarship leads.",
  keywords: ["CSCA Exam", "Study in China", "CSC Scholarship", "CSCA Preparation", "Chinese Universities", "Mock Tests"],
  authors: [{ name: "CSCA Prep Team" }],
  creator: "CSCA Prep Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cscamaster.com",
    siteName: "CSCA Prep Master",
    title: "CSCA Prep Master | Free CSCA Exam Preparation",
    description: "The only 100% Free preparation platform for English & Chinese tracks. Access 15+ Mock Tests, Whiteboard-Mode practice, and verified scholarship leads.",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "CSCA Prep Master Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSCA Prep Master | Free CSCA Exam Preparation",
    description: "Ace the CSCA Exam with free mock tests and study guides.",
    images: ["/og-image.png"],
    creator: "@cscaprep",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'p_uUt3M-pejdzU4AkxQQgwlXzGW9Jfu7woOPLJwP2_M',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
