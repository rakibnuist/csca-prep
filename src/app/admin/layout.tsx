import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { AdminNav } from "@/components/admin/admin-nav";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { signOutAction } from "@/lib/actions/auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  const [pendingStudents, newLeads] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT", status: "PENDING" } }),
    prisma.lead.count({ where: { status: "NEW" } }),
  ]);

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-5 gap-y-2.5 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full border border-vermillion/20 bg-vermillion/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-vermillion uppercase sm:inline-flex">
              Admin Console
            </span>
          </div>

          <AdminNav pendingStudents={pendingStudents} newLeads={newLeads} />

          <div className="flex items-center gap-3">
            <span
              className="hidden rounded-full border border-line bg-paper-deep/60 px-2.5 py-1 text-[11px] font-medium text-ink-soft lg:inline-block"
              title={admin.email}
            >
              {admin.email}
            </span>
            <Link
              href={admin.teachingTrack === "CN" ? "/cn/dashboard" : "/en/dashboard"}
              className="rounded-lg border border-line bg-white px-2.5 py-1 text-[12px] font-medium text-ink-soft transition hover:border-ink/25 hover:text-ink"
            >
              Student App
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-lg px-2 py-1 text-[12px] font-medium text-vermillion transition hover:bg-vermillion/8"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1240px] px-5 py-7 sm:px-8 sm:py-9">{children}</main>
    </div>
  );
}
