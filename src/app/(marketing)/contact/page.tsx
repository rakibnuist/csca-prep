import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock3, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/site/section";
import { LeadForm } from "@/components/site/lead-form";
import { pageMetadata } from "@/lib/seo";
import { OFFICIAL, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact CSCA Master about preparation content, content corrections, partnerships or account issues.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="shell grid grid-cols-1 gap-12 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="min-w-0">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="display-lg mt-4 max-w-md text-balance">
          Tell us what is broken, missing, or wrong.
        </h1>
        <p className="lead mt-4 max-w-md">
          Content corrections get priority — if an explanation is wrong, we want to fix it before you
          sit the paper.
        </p>

        <div className="mt-8 space-y-3">
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-start gap-3 rounded-xl border border-line bg-card p-4 transition hover:border-line-strong"
          >
            <Mail className="mt-0.5 h-4 w-4 text-vermillion" />
            <div>
              <p className="text-[12.5px] font-medium text-ink">General & content</p>
              <p className="text-[11.5px] text-ink-soft">{SITE.email}</p>
            </div>
          </a>

          <div className="flex items-start gap-3 rounded-xl border border-line bg-card p-4">
            <MessageSquare className="mt-0.5 h-4 w-4 text-jade" />
            <div>
              <p className="text-[12.5px] font-medium text-ink">Partnerships</p>
              <p className="text-[11.5px] text-ink-soft">
                Consultancies, schools and university international offices: use the form with
                “partnership” in the message.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-line bg-card p-4">
            <Clock3 className="mt-0.5 h-4 w-4 text-gold" />
            <div>
              <p className="text-[12.5px] font-medium text-ink">Response time</p>
              <p className="text-[11.5px] text-ink-soft">
                Within two working days. Content corrections usually same day.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-paper-deep/60 p-4">
          <p className="text-[11.5px] font-medium text-ink">Exam administration</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
            Registration, fees, test centres and score reports are handled by the CSCA organisers, not
            by us. Use the official portal for anything related to your exam account.
          </p>
          <a
            href={OFFICIAL.site}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-vermillion hover:underline"
          >
            csca.cn <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="panel min-w-0 p-6 sm:p-8">
        <h2 className="font-display text-2xl text-ink">Send a message</h2>
        <p className="mt-1 mb-5 text-[12.5px] text-ink-soft">
          If you are reporting a wrong answer, include the topic code and the paper name.
        </p>
        <LeadForm
          source="contact"
          cta="Send message"
          includeMessage
          successTitle="Message sent"
          successBody="We'll reply to your email shortly — usually within a day."
        />
        <p className="mt-5 text-[11px] text-ink-faint">
          We never ask for your CSCA password or payment details. Read the{" "}
          <Link href="/about" className="underline underline-offset-2 hover:text-ink">
            about page
          </Link>{" "}
          for how we handle data.
        </p>
      </div>
    </section>
  );
}
