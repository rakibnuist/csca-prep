import Link from "next/link";
import { Logo } from "./logo";
import { FOOTER_LINKS, OFFICIAL, SITE } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-deep/70">
      <div className="shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Exam-accurate CSCA preparation. Built on the official syllabus, calibrated to the
              real paper, and free to start.
            </p>
            <p className="mt-5 text-[11px] leading-relaxed text-ink-faint">
              Independent preparation platform. CSCA registration, fees and score reports are
              handled only at{" "}
              <a
                href={OFFICIAL.site}
                className="underline decoration-line-strong underline-offset-2 hover:text-ink"
                target="_blank"
                rel="noreferrer noopener"
              >
                csca.cn
              </a>
              .
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <p className="eyebrow">{group.title}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition hover:text-vermillion"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Official resources</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-soft">
              <a
                href={OFFICIAL.syllabus}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 hover:text-vermillion"
              >
                Syllabus downloads <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={OFFICIAL.campusChina}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 hover:text-vermillion"
              >
                Campus China <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={OFFICIAL.csc}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 hover:text-vermillion"
              >
                China Scholarship Council <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-[13px] text-ink-faint">
              © {new Date().getFullYear()} {SITE.name}. All question content is original.
            </p>
            <p className="mt-1 text-[13px] text-ink-faint">
              {SITE.domain} · Made for the next intake.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
