import { NextResponse, type NextRequest } from "next/server";

/**
 * Route-level guard for the admin area (Next.js 16 `proxy` convention) plus
 * the teaching-section resolver for the student app.
 *
 * The app is monolingual per section: English-taught pages render English,
 * Chinese-taught pages render Chinese. The section is resolved here from the
 * `?taught=` query or the section root path, forwarded to the layout as a
 * request header (so the current render is correct) and persisted in a cookie
 * (so the next page keeps the chosen language).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("csca_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
      // Fail closed rather than letting an unverified request through.
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      const { jwtVerify } = await import("jose");
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
        algorithms: ["HS256"],
      });
      if (payload.role !== "ADMIN") {
        const dest = request.cookies.get("csca_taught")?.value === "CN" ? "/cn/dashboard" : "/en/dashboard";
        return NextResponse.redirect(new URL(dest, request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return withSection(request);
}

function normaliseTrack(value: string | null) {
  const v = String(value ?? "")
    .trim()
    .toLowerCase();
  if (["en", "eng", "english", "en-taught", "english-taught"].includes(v)) return "EN";
  if (["zh", "cn", "chi", "chinese", "zh-taught", "chinese-taught"].includes(v)) return "CN";
  return null;
}

function withSection(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const fromQuery = normaliseTrack(searchParams.get("taught"));
  const fromPath =
    pathname === "/cn" || pathname.startsWith("/cn/") || pathname.startsWith("/app/chinese")
      ? "CN"
      : pathname === "/en" || pathname.startsWith("/en/") || pathname.startsWith("/app/english")
        ? "EN"
        : null;
  const chosen = fromQuery ?? fromPath;

  const headers = new Headers(request.headers);
  if (chosen) headers.set("x-csca-track", chosen);

  const response = NextResponse.next({ request: { headers } });

  if (chosen) {
    response.cookies.set("csca_taught", chosen, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/app/:path*", "/en/:path*", "/cn/:path*", "/exam/:path*"],
};
