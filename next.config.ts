import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
];

/**
 * The student app, the exam runner, the admin area, the auth pages and every
 * API route are per-user or per-session and must never be stored by a CDN.
 *
 * The marketing pages are prerendered at build time and set no cookie, so
 * they can be served from an edge. Without an explicit Cache-Control,
 * Cloudflare leaves HTML uncached (`cf-cache-status: DYNAMIC`) and every
 * request reaches the single Node process on the VPS.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // Pre-relaunch routes that still exist in Google's index.
      { source: "/guidelines", destination: "/csca", permanent: true },
      // Teaching-track aliases (D1 URL topology).
      { source: "/english", destination: "/en", permanent: true },
      { source: "/chinese", destination: "/cn", permanent: true },
      { source: "/favicon.ico", destination: "/icon.svg", permanent: false },
    ];
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // Floor for any public route that does not set its own Cache-Control.
        // Next overrides this with `s-maxage=31536000` on the prerendered
        // marketing pages (which is what the Cloudflare cache rule honours),
        // and with `private, no-cache, no-store` on anything that reads a
        // session. `stale-while-revalidate` keeps the site up if the origin
        // hiccups.
        source: "/:path((?!_next(?:$|/)|api(?:$|/)|app(?:$|/)|exam(?:$|/)|admin(?:$|/)|en/|cn/|sign-in(?:$|/)|sign-up(?:$|/)|pending(?:$|/)).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/_next/static/(.*)",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
          ]
        : []),
      {
        // Per-user data must never be stored anywhere.
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
      {
        // Discovery files must never be a day stale: a sitemap that Cloudflare
        // caches for 24 hours hides every page added in the last deploy.
        // Five minutes at the edge is enough to absorb crawler bursts.
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
