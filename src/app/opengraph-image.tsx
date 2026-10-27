import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "CSCA Master — exam-accurate CSCA preparation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf7f0",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 10,
              background: "#c8102e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff8f3",
              fontSize: 30,
            }}
          >
            C
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, color: "#16120f", letterSpacing: -0.5 }}>CSCA Master</span>
            <span style={{ fontSize: 12, color: "#8b8378", letterSpacing: 3 }}>EXAM PREPARATION</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 74, color: "#16120f", lineHeight: 1.05, letterSpacing: -2 }}>
            Sit the CSCA
          </span>
          <span style={{ fontSize: 74, color: "#c8102e", lineHeight: 1.05, letterSpacing: -2 }}>
            before you sit the CSCA.
          </span>
          <span style={{ marginTop: 24, fontSize: 24, color: "#5a534b" }}>
            Full-length mocks · official timing · topic analytics
          </span>
        </div>

        <div style={{ display: "flex", gap: 48, fontSize: 18, color: "#5a534b" }}>
          <span>5 subjects</span>
          <span>48 questions · 60 minutes</span>
          <span>0–100 scale</span>
          <span style={{ color: "#c8102e" }}>cscamaster.com</span>
        </div>
      </div>
    ),
    size,
  );
}
