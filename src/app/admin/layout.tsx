import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { requireAdmin } from "@/lib/auth";
import { signOutAction } from "@/lib/actions/auth";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/leads", label: "Leads" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-paper-deep/40">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-6">
            <Logo />
            <span className="hidden rounded border border-line px-1.5 py-0.5 text-[9.5px] tracking-[0.14em] text-ink-faint uppercase sm:inline">
              Admin
            </span>
          </div>
          <nav className="flex items-center gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[12.5px] text-ink-soft transition hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/app/dashboard" className="text-[12.5px] text-ink-soft hover:text-ink">
              App
            </Link>
            <form action={signOutAction}>
              <button type="submit" className="text-[12.5px] text-vermillion hover:underline">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 sm:py-10">{children}</main>
    </div>
  );
}
