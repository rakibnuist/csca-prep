import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { parseTrack } from "@/lib/tracks";
import { AppSidebar } from "@/components/app/app-sidebar";
import { MobileTabBar } from "@/components/app/mobile-tab-bar";

/** Authenticated, per-user pages: never index them. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * The authenticated app lives under `/{track}/...` (e.g. `/en/dashboard`,
 * `/cn/mocks`). The track is the account's property: the URL segment must
 * match `User.teachingTrack`, or the student is redirected to their own root.
 */
export default async function TrackAppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ track: string }>;
}) {
  // Reject unknown route segments (e.g. typos, bots, `/zh/...`) BEFORE auth
  // so 404s never turn into soft-404 `/sign-in` redirects or wasted session queries.
  const { track: rawTrack } = await params;
  if (rawTrack !== "en" && rawTrack !== "cn") notFound();
  const urlTrack = rawTrack === "cn" ? "CN" : "EN";

  const user = await getCurrentUser();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(`/${rawTrack}`)}`);
  if (user.status !== "APPROVED") redirect("/pending");

  const accountTrack = parseTrack(user.teachingTrack) ?? "EN";
  if (urlTrack !== accountTrack) {
    redirect(`/${accountTrack === "CN" ? "cn" : "en"}/dashboard`);
  }

  const access = await getAccess(user.id);

  return (
    <div className="min-h-screen bg-paper lg:flex print:block print:min-h-0">
      <AppSidebar
        user={{
          name: user.name,
          email: user.email,
          role: user.role,
          plan: access.plan,
          teachingTrack: user.teachingTrack,
        }}
        sectionTrack={accountTrack}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      </div>
      <MobileTabBar teachingTrack={user.teachingTrack} sectionTrack={accountTrack} />
    </div>
  );
}
