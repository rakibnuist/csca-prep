import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Shared social-card builder.
 *
 * Each section route exports its own `opengraph-image.tsx` that calls this, so
 * a link shared to `/csca` does not carry the homepage headline. Keeping one
 * builder means the brand block, wash and chip row cannot drift between cards.
 *
 * Satori rules apply: every container needs an explicit `display: flex`, no
 * shorthand CSS, and text must sit inside a single element.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export type OgVariant = {
  eyebrow: string;
  headline: string;
  subline: string;
  chips: string[];
  /** Optional small badge in the top-right, e.g. "Verified November 2026". */
  badge?: string;
  /** Chinese cards need the CJK font stack, not the default sans fallback. */
  lang?: "zh";
};

/**
 * Satori cannot read WOFF2, so the share cards load a TTF copy of the editorial
 * serif that the site itself uses. Read once per process and cached.
 */
let serifData: ArrayBuffer | null = null;
async function loadSerif() {
  if (serifData) return serifData;
  const file = await readFile(join(process.cwd(), "src/fonts/og/InstrumentSerif-Regular.ttf"));
  serifData = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
  return serifData;
}

export async function renderOgCard({
  eyebrow,
  headline,
  subline,
  chips,
  badge = "Verified November 2026",
  lang,
}: OgVariant) {
  const serif = await loadSerif();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f3",
          padding: "60px 68px",
          // Satori needs a fallback list; the serif is registered below.
          fontFamily: lang === "zh" ? "sans-serif" : "Instrument Serif, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(70% 60% at 50% -10%, #f6e7d5 0%, rgba(250,248,243,0) 70%), radial-gradient(38% 42% at 100% 100%, rgba(211,29,60,0.18), rgba(250,248,243,0) 65%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: "#d31d3c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 28,
            }}
          >
            C
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ display: "flex", fontSize: 26, letterSpacing: -0.5 }}>
              <span style={{ color: "#14110e" }}>CSCA&nbsp;</span>
              <span style={{ color: "#d31d3c" }}>Master</span>
            </span>
            <span style={{ fontSize: 12, color: "#7a736a", letterSpacing: 3 }}>
              EXAM PREPARATION
            </span>
          </div>
          <span
            style={{
              display: "flex",
              marginLeft: "auto",
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid #dfe3f4",
              background: "#eceefb",
              fontSize: 17,
              color: "#3b4a9c",
            }}
          >
            {badge}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <span style={{ fontSize: 15, color: "#3b4a9c", letterSpacing: 3 }}>{eyebrow}</span>
          <span
            style={{
              marginTop: 16,
              fontSize: headline.length > 42 ? 58 : 68,
              color: "#14110e",
              lineHeight: 1.06,
              letterSpacing: -0.5,
              maxWidth: 960,
              fontFamily: lang === "zh" ? "sans-serif" : "Instrument Serif",
            }}
          >
            {headline}
          </span>
          <span style={{ marginTop: 22, fontSize: 25, color: "#57514a", maxWidth: 880 }}>
            {subline}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          {chips.map((chip) => (
            <span
              key={chip}
              style={{
                display: "flex",
                padding: "9px 17px",
                borderRadius: 999,
                border: "1px solid #e7dfd2",
                background: "#ffffff",
                fontSize: 19,
                color: "#57514a",
              }}
            >
              {chip}
            </span>
          ))}
          <span style={{ display: "flex", marginLeft: "auto", fontSize: 21, color: "#7a736a" }}>
            cscamaster.com
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }],
    },
  );
}
