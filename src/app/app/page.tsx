import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { parseTrack } from "@/lib/tracks";

/** Legacy `/app` index; redirect a signed-in student to their track dashboard. */
export default async function LegacyAppIndex() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=%2Fapp");
  const track = parseTrack(user.teachingTrack) ?? "EN";
  redirect(`/${track === "CN" ? "cn" : "en"}/dashboard`);
}
