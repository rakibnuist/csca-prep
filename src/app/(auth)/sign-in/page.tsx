import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignInForm } from "@/components/auth/auth-forms";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your CSCA Master account to continue practising.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/app/dashboard");

  const { next } = await searchParams;

  return (
    <div>
      <p className="eyebrow">Welcome back</p>
      <h1 className="display-md mt-3">Sign in to keep going.</h1>
      <p className="mt-2 mb-7 text-[13.5px] text-ink-soft">
        Your attempts, review queue and study plan are waiting.
      </p>

      <SignInForm next={next} />

      <div className="mt-7 rounded-xl border border-line bg-paper-deep/60 p-3.5">
        <p className="text-[10.5px] font-medium tracking-[0.12em] text-ink-faint uppercase">
          Demo accounts
        </p>
        <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-ink-soft">
          student@cscamaster.com · password123
          <br />
          Admin accounts are not published. Use your own credentials.
        </p>
      </div>
    </div>
  );
}
