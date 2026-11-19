import "server-only";

import { revalidatePath } from "next/cache";
import { parseTrack, type TaughtTrack } from "@/lib/tracks";

/**
 * Revalidate an authenticated app route under both track roots (`/en/...` and
 * `/cn/...`) plus the legacy `/app/...` alias.
 */
export function revalidateTrackPath(appSubPath: string, type?: "page" | "layout") {
  const clean = appSubPath.startsWith("/app/")
    ? appSubPath.slice(4)
    : appSubPath === "/app"
      ? ""
      : appSubPath.startsWith("/")
        ? appSubPath
        : `/${appSubPath}`;

  for (const prefix of ["/en", "/cn", "/app"]) {
    const target = `${prefix}${clean}`;
    if (type) revalidatePath(target, type);
    else revalidatePath(target);
  }
}

/**
 * The section for the current request is the student's account-bound teaching
 * track (`User.teachingTrack`). It is a property of the user, chosen at sign-up
 * and changeable only in Settings — never a URL parameter or a cross-track
 * switch that exposes both sections to everyone.
 */
export async function getSectionTrack(
  teachingTrack: string | null | undefined,
): Promise<TaughtTrack> {
  return parseTrack(teachingTrack) ?? "EN";
}

/** Explicit `?taught=` is ignored: the track belongs to the account. */
export async function getResolvedTrack(
  _explicit: string | null | undefined,
  teachingTrack: string | null | undefined,
): Promise<TaughtTrack> {
  return getSectionTrack(teachingTrack);
}
