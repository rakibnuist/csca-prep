import Link from "next/link";
import { redirect } from "next/navigation";
import { Clock, ShieldX } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { getCurrentUser } from "@/lib/auth";
import { signOutAction } from "@/lib/actions/auth";

export const metadata = {
  title: "Account review",
  robots: { index: false, follow: false },
};

export default async function PendingApprovalPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  if (user.status === "APPROVED") {
    redirect(user.teachingTrack === "CN" ? "/cn/dashboard" : "/en/dashboard");
  }

  const rejected = user.status === "REJECTED";

  return (
    <div className="grid min-h-screen place-items-center bg-paper px-6 py-12">
      <div className="w-full max-w-[460px]">
        <Logo />

        <div className="panel mt-8 p-6 sm:p-7">
          <div
            className={
              rejected
                ? "grid h-10 w-10 place-items-center rounded-full bg-vermillion/10 text-vermillion"
                : "grid h-10 w-10 place-items-center rounded-full bg-gold-soft text-gold"
            }
          >
            {rejected ? <ShieldX className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
          </div>

          <h1 className="mt-4 font-display text-[1.5rem] leading-tight text-ink">
            {rejected ? "This account is suspended." : "This account is held for review."}
          </h1>

          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            {rejected
              ? "An admin disabled access for this account. If you think this is a mistake, get in touch and we'll take another look."
              : "This account is currently held for review before accessing the app. Once an admin restores access, you'll be able to continue normally."}
          </p>

          <div className="mt-4 rounded-lg border border-line bg-paper-deep/50 px-3 py-2.5">
            <p className="text-[10px] tracking-[0.1em] text-ink-faint uppercase">Signed in as</p>
            <p className="mt-1 truncate text-[12.5px] text-ink">{user.email}</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center rounded-lg bg-vermillion px-4 text-[13px] font-medium text-paper transition hover:bg-vermillion-deep"
            >
              Contact support
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-[12.5px] text-ink-soft underline underline-offset-2 hover:text-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">
            Back to the public site
          </Link>
        </p>
      </div>
    </div>
  );
}
