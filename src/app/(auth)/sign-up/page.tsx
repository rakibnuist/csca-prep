import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/auth/auth-forms";
import { getCurrentUser } from "@/lib/auth";
import { parseTrack, trackLink } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "Create your free account",
  description:
    "Create a free CSCA Master account: two attempts on 25 papers (five per subject), topic drills and the syllabus explorer.",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; taught?: string }>;
}) {
  // Same DB-backed check as /sign-in: never redirect a stale/revoked session.
  const user = await getCurrentUser();
  if (user) {
    redirect(user.status === "APPROVED" ? trackLink("/app/dashboard", parseTrack(user.teachingTrack) ?? "EN") : "/pending");
  }

  const { next, taught } = await searchParams;
  const defaultTaught = parseTrack(taught) === "CN" ? "zh" : "en";

  return (
    <div>
      <p className="eyebrow">Free account</p>
      <h1 className="display-md mt-3">Start with one honest mock.</h1>
      <p className="mt-2 mb-7 text-[13.5px] text-ink-soft">
        No card. No trial countdown. Five mock papers per subject, topic drills, and full Study Q&amp;A on official papers.
      </p>

      <SignUpForm next={next} defaultTaught={defaultTaught} />
    </div>
  );
}
