"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitLeadAction, type LeadState } from "@/lib/actions/leads";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-vermillion text-[13px] font-medium text-paper transition hover:bg-vermillion-deep disabled:opacity-70"
    >
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {pending ? "Sending…" : label}
    </button>
  );
}

const input =
  "h-11 w-full rounded-lg border border-line bg-card px-3 text-[13px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none";

export function LeadForm({
  source,
  cta = "Get updates",
  includeMessage = false,
  successTitle = "Thanks — you're in.",
  successBody = "We'll be in touch — no more than one message.",
}: {
  source: string;
  cta?: string;
  includeMessage?: boolean;
  successTitle?: string;
  successBody?: string;
}) {
  const [state, action] = useActionState<LeadState, FormData>(submitLeadAction, null);

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-jade/25 bg-jade-soft/60 p-5 text-center">
        <CheckCircle2 className="mx-auto h-5 w-5 text-jade" />
        <p className="mt-2 text-[13px] font-medium text-ink">{successTitle}</p>
        <p className="mt-1 text-[12px] text-ink-soft">{successBody}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-2.5">
      <input type="hidden" name="source" value={source} />

      {state?.error && (
        <p className="rounded-lg border border-vermillion/25 bg-vermillion/6 px-3 py-2 text-[12px] text-vermillion-deep">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <input name="name" required maxLength={120} aria-label="Full name" placeholder="Full name" className={input} />
        <input name="email" type="email" required maxLength={160} aria-label="Email" placeholder="Email" className={input} />
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <input name="country" maxLength={80} aria-label="Country" placeholder="Country" className={input} />
        <input name="whatsapp" maxLength={32} aria-label="WhatsApp (optional)" placeholder="WhatsApp (optional)" className={input} />
      </div>

      <select name="goal" defaultValue="" className={input} aria-label="Goal">
        <option value="">Target intake</option>
        <option value="September 2027">September 2027</option>
        <option value="September 2028">September 2028</option>
        <option value="Later">Later</option>
        <option value="Not sure yet">Not sure yet</option>
      </select>

      {includeMessage && (
        <textarea
          name="message"
          rows={3}
          maxLength={2000}
          aria-label="Message"
          placeholder="What are you stuck on?"
          className="w-full rounded-lg border border-line bg-card px-3 py-2.5 text-[13px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none"
        />
      )}

      <Submit label={cta} />
      <p className="text-center text-[10px] text-ink-faint">
        One email when it matters. No resale of your details.
      </p>
    </form>
  );
}
