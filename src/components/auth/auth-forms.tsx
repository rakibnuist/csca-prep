"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { signInAction, signUpAction, type AuthState } from "@/lib/actions/auth";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-vermillion text-[14px] font-medium text-paper transition hover:bg-vermillion-deep disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? "One moment…" : label}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-card px-3.5 text-[14px] text-ink placeholder:text-ink-faint/70 focus:border-vermillion/50 focus:ring-2 focus:ring-vermillion/15 focus:outline-none";

const labelClass = "mb-1.5 block text-[12px] font-medium tracking-wide text-ink-soft";

export function SignInForm({ next }: { next?: string }) {
  const [state, action] = useActionState<AuthState, FormData>(signInAction, null);

  return (
    <form action={action} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      {state?.error && (
        <p className="flex items-start gap-2 rounded-lg border border-vermillion/25 bg-vermillion/6 px-3 py-2.5 text-[12.5px] text-vermillion-deep">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {state.error}
        </p>
      )}

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      <Submit label="Sign in" />

      <p className="pt-1 text-center text-[12.5px] text-ink-soft">
        New here?{" "}
        <Link href="/sign-up" className="font-medium text-vermillion hover:underline">
          Create a free account
        </Link>
      </p>
    </form>
  );
}

export function SignUpForm({ next }: { next?: string }) {
  const [state, action] = useActionState<AuthState, FormData>(signUpAction, null);

  return (
    <form action={action} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      {state?.error && (
        <p className="flex items-start gap-2 rounded-lg border border-vermillion/25 bg-vermillion/6 px-3 py-2.5 text-[12.5px] text-vermillion-deep">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>
          Full name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder="Amina Yusuf"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="At least 8 characters"
          className={inputClass}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>Which stream are you applying for?</legend>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "STEM", label: "STEM / Engineering" },
            { value: "HUMANITIES", label: "Humanities / Law" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-card px-3 py-2.5 text-[12.5px] text-ink-soft has-checked:border-vermillion/50 has-checked:bg-vermillion/5 has-checked:text-ink"
            >
              <input
                type="radio"
                name="track"
                value={option.value}
                className="accent-[#c8102e]"
                defaultChecked={option.value === "STEM"}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <Submit label="Create account" />

      <p className="pt-1 text-center text-[12.5px] text-ink-soft">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-vermillion hover:underline">
          Sign in
        </Link>
      </p>

      <p className="text-center text-[11px] leading-relaxed text-ink-faint">
        By creating an account you agree to use original practice content for personal study. CSCA
        registration itself happens at csca.cn.
      </p>
    </form>
  );
}
