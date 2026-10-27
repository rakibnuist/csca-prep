import Link from "next/link";
import { Logo } from "@/components/site/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo />
      <p className="mt-12 font-display text-[6rem] leading-none text-vermillion/20 tabular">404</p>
      <h1 className="mt-2 font-display text-3xl text-ink">This page did not make the cut.</h1>
      <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-ink-soft">
        The link may be old, or the paper may have been retired. Everything current is one click away.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
        >
          Home
        </Link>
        <Link
          href="/app/mocks"
          className="inline-flex h-10 items-center rounded-lg border border-line-strong px-4 text-[12.5px] font-medium text-ink"
        >
          Mock exams
        </Link>
        <Link
          href="/syllabus"
          className="inline-flex h-10 items-center rounded-lg border border-line-strong px-4 text-[12.5px] font-medium text-ink"
        >
          Syllabus
        </Link>
      </div>
    </div>
  );
}
