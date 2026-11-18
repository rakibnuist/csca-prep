import { cn } from "@/lib/utils";

export function BangladeshPartnerBanner({ className }: { className?: string }) {
  return (
    <aside className={cn("my-8 rounded-2xl border border-jade/30 bg-paper-deep p-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full bg-jade/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-jade">
          Official Bangladesh Partner · Free Pro Access
        </span>
        <span className="text-xs font-medium text-ink-soft">BDT 0 File-Opening Charge</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl text-ink">
        Applying from Bangladesh? Get CSCA Master Pro (¥99) for Free.
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        <strong>EduExpress International</strong> (Dhanmondi, Dhaka) provides complimentary{" "}
        <strong>CSCA Master Pro seat activation codes</strong> to Bangladeshi students who open a
        verified China undergraduate or CSC scholarship application file — with{" "}
        <strong>0 BDT file-opening fee</strong> and{" "}
        <strong>no EduExpress service fee before China visa approval</strong>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href="https://eduexpressint.com/education-fit-assessment?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-vermillion px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Open China File &amp; Claim Free Pro Code →
        </a>
        <a
          href="https://eduexpressint.com/csc-scholarship-bangladesh?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-medium text-ink transition hover:border-line-strong"
        >
          Bangladesh CSC Scholarship Guide
        </a>
        <a
          href="https://eduexpressint.com/bn/csca-exam-bangladesh?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access"
          target="_blank"
          rel="noopener noreferrer"
          lang="bn"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-medium text-ink transition hover:border-line-strong"
        >
          বাংলায় CSCA পরীক্ষার গাইড
        </a>
      </div>
    </aside>
  );
}
