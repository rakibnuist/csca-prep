"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { requestPasswordResetAction, resetPasswordAction, type AuthState } from "@/lib/actions/auth";

const inputClass =
  "h-11 w-full rounded-xl border border-line bg-card px-3.5 text-[14px] text-ink placeholder:text-ink-faint/70 focus:border-vermillion/50 focus:ring-2 focus:ring-vermillion/15 focus:outline-none";

const labelClass = "mb-1.5 block text-[12px] font-medium tracking-wide text-ink-soft";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[13.5px] font-medium text-paper transition hover:bg-ink/85 disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? "One moment…" : label}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}

export function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [requestState, request] = useActionState<AuthState, FormData>(requestPasswordResetAction, null);
  const [resetState, reset] = useActionState<AuthState, FormData>(resetPasswordAction, null);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[12.5px] text-ink-soft underline underline-offset-2 hover:text-ink"
      >
        Forgot your password?
      </button>
    );
  }

  if (resetState?.done) {
    return (
      <div className="rounded-xl border border-jade/25 bg-jade-soft/60 px-3.5 py-3 text-[12.5px]">
        <p className="font-medium text-jade">Password updated.</p>
        <p className="mt-1 text-ink-soft">
          Sign in with your new password.{" "}
          <button type="button" onClick={() => setOpen(false)} className="underline hover:text-ink">
            Back to sign in
          </button>
        </p>
      </div>
    );
  }

  const onCodeStep = requestState?.step === "reset";
  const email = requestState?.email ?? "";

  return (
    <div className="rounded-xl border border-line bg-paper-deep/50 p-4">
      <p className="text-[12.5px] font-medium text-ink">Reset your password</p>

      {onCodeStep ? (
        <form action={reset} className="mt-3 space-y-3">
          <input type="hidden" name="email" value={email} />
          {resetState?.error && (
            <p className="flex items-start gap-2 rounded-lg border border-vermillion/25 bg-vermillion/6 px-3 py-2 text-[12px] text-vermillion-deep">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {resetState.error}
            </p>
          )}
          {requestState.devCode && process.env.NODE_ENV !== "production" && (
            <p className="rounded-lg border border-line bg-paper px-3 py-2 text-[11px] text-ink-soft">
              Dev mode (no RESEND_API_KEY): your code is{" "}
              <strong className="text-ink">{requestState.devCode}</strong>
            </p>
          )}
          <div>
            <label htmlFor="reset-code" className={labelClass}>
              Code from your email
            </label>
            <input
              id="reset-code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{6}"
              maxLength={6}
              required
              placeholder="••••••"
              className={`${inputClass} text-center font-mono tracking-[0.5em]`}
            />
          </div>
          <div>
            <label htmlFor="reset-password" className={labelClass}>
              New password
            </label>
            <input
              id="reset-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={200}
              placeholder="At least 8 characters"
              className={inputClass}
            />
          </div>
          <Submit label="Set new password" />
        </form>
      ) : (
        <form action={request} className="mt-3 space-y-3">
          {requestState?.error && (
            <p className="flex items-start gap-2 rounded-lg border border-vermillion/25 bg-vermillion/6 px-3 py-2 text-[12px] text-vermillion-deep">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {requestState.error}
            </p>
          )}
          <div>
            <label htmlFor="reset-email" className={labelClass}>
              Your account email
            </label>
            <input
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={160}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <Submit label="Email me a code" />
        </form>
      )}

      <button
        type="button"
        onClick={() => setOpen(false)}
        className="mt-3 text-[11.5px] text-ink-faint underline underline-offset-2 hover:text-ink"
      >
        Cancel
      </button>
    </div>
  );
}
