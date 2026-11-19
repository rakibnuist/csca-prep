import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignInForm } from "@/components/auth/auth-forms";
import { ForgotPassword } from "@/components/auth/forgot-password";
import { getCurrentUser } from "@/lib/auth";
import { parseTrack, trackLink } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your CSCA Master account to continue practising.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  // DB-backed check: a stale session cookie for a deleted or revoked account
  // must not trap the visitor in a /sign-in <-> /app redirect loop.
  const user = await getCurrentUser();
  if (user) {
    redirect(user.status === "APPROVED" ? trackLink("/app/dashboard", parseTrack(user.teachingTrack) ?? "EN") : "/pending");
  }

  const { next } = await searchParams;

  return (
    <div>
      <p className="eyebrow">Welcome back</p>
      <h1 className="display-md mt-3">Sign in to keep going.</h1>
      <p className="mt-2 mb-7 text-[13.5px] text-ink-soft">
        Your attempts, review queue and study plan are waiting.
      </p>

      <SignInForm next={next} />

      <div className="mt-5">
        <ForgotPassword />
      </div>
    </div>
  );
}
