import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { OFFICIAL } from "@/lib/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="/" className="text-[12.5px] text-ink-soft hover:text-ink">
            Back to site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>

        <p className="text-[11px] leading-relaxed text-ink-faint">
          Independent preparation platform. Register for the exam at{" "}
          <a
            href={OFFICIAL.site}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 hover:text-ink"
          >
            csca.cn
          </a>
          .
        </p>
      </div>

      <aside className="relative hidden overflow-hidden bg-night text-paper lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(200,16,46,0.28),transparent_60%)]"
        />
        <div className="relative p-12">
          <p className="eyebrow text-paper/40">Why students start here</p>
          <blockquote className="mt-6 font-display text-[2rem] leading-tight text-balance text-paper">
            “The first time I saw the real interface, I had already seen it four times.”
          </blockquote>
          <p className="mt-4 text-[13px] text-paper/50">
            Familiarity is worth marks. The timer is not the place to learn how the palette works.
          </p>
        </div>

        <div className="relative grid grid-cols-2 gap-px bg-paper/10">
          {[
            { k: "5", v: "Subjects in official format" },
            { k: "48", v: "Questions per fundamental paper" },
            { k: "0–100", v: "Same scoring scale as the exam" },
            { k: "7d", v: "Official result turnaround" },
          ].map((item) => (
            <div key={item.v} className="bg-night p-6">
              <p className="font-display text-3xl text-paper">{item.k}</p>
              <p className="mt-1 text-[11.5px] text-paper/50">{item.v}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
