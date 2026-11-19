import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { parseTrack } from "@/lib/tracks";

/**
 * Legacy `/app/<...>` routes. The authenticated app moved to `/{track}/...`,
 * so every old link/bookmark is redirected to the same page under the
 * student's account track.
 */
export default async function LegacyAppPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) qs.append(key, item);
    } else if (value !== undefined) {
      qs.set(key, value);
    }
  }
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  const joined = (slug ?? []).join("/");

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/sign-in?next=${encodeURIComponent(`/app/${joined}${suffix}`)}`);
  }
  const track = parseTrack(user.teachingTrack) ?? "EN";
  const base = track === "CN" ? "cn" : "en";
  redirect(`/${base}/${joined}${suffix}`);
}
