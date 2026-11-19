"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { AlertCircle, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { signInAction, requestSignupOtpAction, verifySignupOtpAction, type AuthState } from "@/lib/actions/auth";
import { NATIONALITIES } from "@/lib/nationalities";
import { COUNTRIES, dialForCountryName } from "@/lib/countries";

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

function DemoStudentButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line-strong bg-paper text-[13px] font-semibold text-ink transition hover:border-vermillion/40 hover:bg-indigo-soft/40 disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? "Signing in…" : "Continue as Demo Student (Dev)"}
    </button>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-card px-3.5 text-[14px] text-ink placeholder:text-ink-faint/70 focus:border-vermillion/50 focus:ring-2 focus:ring-vermillion/15 focus:outline-none";

const labelClass = "mb-1.5 block text-[12px] font-medium tracking-wide text-ink-soft";

export function SignInForm({ next }: { next?: string }) {
  const [state, action] = useActionState<AuthState, FormData>(signInAction, null);

  return (
    <div className="space-y-4">
      <form action={action} className="space-y-4">
        {next && <input type="hidden" name="next" value={next} />}

        {state?.error && (
          <p className="flex items-start gap-2 rounded-lg border border-rose-500/25 bg-rose-500/8 px-3 py-2.5 text-[12.5px] text-rose-700">
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
            maxLength={160}
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
            maxLength={200}
            placeholder="••••••••"
            className={inputClass}
          />
        </div>

        <Submit label="Sign in" />
      </form>

      {process.env.NODE_ENV !== "production" && (
        <form action={action} className="pt-1">
          {next && <input type="hidden" name="next" value={next} />}
          <input type="hidden" name="email" value="student@cscamaster.com" />
          <input type="hidden" name="password" value="password123" />
          <DemoStudentButton />
        </form>
      )}

      <p className="pt-1 text-center text-[12.5px] text-ink-soft">
        New here?{" "}
        <Link href="/sign-up" className="font-medium text-vermillion hover:underline">
          Create a free account
        </Link>
      </p>
    </div>
  );
}

export function SignUpForm({
  next,
  defaultTaught = "en",
}: {
  next?: string;
  defaultTaught?: "en" | "zh";
}) {
  const [state, requestOtp] = useActionState<AuthState, FormData>(requestSignupOtpAction, null);
  const [verifyState, verifyOtp] = useActionState<AuthState, FormData>(verifySignupOtpAction, null);
  const [taught, setTaught] = useState<"en" | "zh">(defaultTaught);

  const onCodeStep = state?.step === "code";
  const email = state?.email ?? "";

  if (onCodeStep) {
    return (
      <form action={verifyOtp} className="space-y-4">
        <input type="hidden" name="email" value={email} />
        {next && <input type="hidden" name="next" value={next} />}

        <div className="rounded-xl border border-jade/25 bg-jade-soft/60 px-3.5 py-3">
          <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-jade">
            <ShieldCheck className="h-3.5 w-3.5" /> Step 2 — verify your email
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
            We sent a 6-digit code to <strong className="text-ink">{email}</strong>. It expires in
            10 minutes.
          </p>
        </div>

        {(verifyState?.error || state?.error) && (
          <p className="flex items-start gap-2 rounded-lg border border-vermillion/25 bg-vermillion/6 px-3 py-2.5 text-[12.5px] text-vermillion-deep">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {verifyState?.error ?? state?.error}
          </p>
        )}

        {state.devCode && process.env.NODE_ENV !== "production" && (
          <p className="rounded-lg border border-line bg-paper-deep/60 px-3 py-2 text-[11px] text-ink-soft">
            Dev mode (no RESEND_API_KEY): your code is{" "}
            <strong className="text-ink">{state.devCode}</strong>
          </p>
        )}

        <div>
          <label htmlFor="code" className={labelClass}>
            Verification code
          </label>
          <input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{6}"
            maxLength={6}
            required
            autoFocus
            placeholder="••••••"
            className={`${inputClass} text-center font-mono text-[20px] tracking-[0.5em]`}
          />
        </div>

        <Submit label="Verify & create account" />

        <button
          type="button"
          onClick={() => {
            const params = new URLSearchParams();
            if (next) params.set("next", next);
            if (defaultTaught === "zh") params.set("taught", "CN");
            const qs = params.toString();
            window.location.assign(qs ? `/sign-up?${qs}` : "/sign-up");
          }}
          className="text-[12px] text-ink-soft underline underline-offset-2 hover:text-ink"
        >
          Wrong email? Start over
        </button>
      </form>
    );
  }

  return (
    <form action={requestOtp} className="space-y-4">
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
          minLength={2}
          maxLength={120}
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
          maxLength={160}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className={labelClass}>
          WhatsApp number
        </label>
        <div className="flex gap-2">
          <select
            name="whatsappCode"
            required
            defaultValue=""
            aria-label="Country code"
            className="h-12 w-[7.5rem] shrink-0 rounded-xl border border-line bg-card px-2 text-[13px] text-ink focus:border-vermillion/50 focus:ring-2 focus:ring-vermillion/15 focus:outline-none"
          >
            <option value="" disabled>
              Code
            </option>
            {COUNTRIES.map((country) => (
              <option key={`${country.dial}-${country.name}`} value={country.dial}>
                {country.name} (+{country.dial})
              </option>
            ))}
          </select>
          <input
            id="whatsapp"
            name="whatsappNumber"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            maxLength={20}
            placeholder="1712 345678"
            className={`${inputClass} min-w-0 flex-1`}
          />
        </div>
        <p className="mt-1 text-[10.5px] leading-relaxed text-ink-faint">
          Pick your country code, then type the number. We use WhatsApp to reach you about your
          account.
        </p>
      </div>

      <div>
        <label htmlFor="nationality" className={labelClass}>
          Nationality
        </label>
        <select
          id="nationality"
          name="nationality"
          required
          defaultValue=""
          className={inputClass}
          onChange={(event) => {
            const dial = dialForCountryName(event.target.value);
            if (!dial) return;
            const code = document.querySelector<HTMLSelectElement>('select[name="whatsappCode"]');
            if (code) code.value = dial;
          }}
        >
          <option value="" disabled>
            Select your nationality
          </option>
          {NATIONALITIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
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
          maxLength={200}
          placeholder="At least 8 characters"
          className={inputClass}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>Which programme are you applying for?</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { value: "en", label: "English-taught", note: "Maths, Physics, Chemistry" },
            { value: "zh", label: "中文授课", note: "数理化 + 专业中文" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-card px-3 py-2.5 text-[12.5px] text-ink-soft has-checked:border-vermillion/50 has-checked:bg-vermillion/5 has-checked:text-ink"
            >
              <input
                type="radio"
                name="testLanguage"
                value={option.value}
                className="accent-[#d31d3c]"
                defaultChecked={option.value === defaultTaught}
                onChange={() => setTaught(option.value as "en" | "zh")}
              />
              <span>
                <span className="block">{option.label}</span>
                <span className="block text-[10.5px] text-ink-faint">{option.note}</span>
              </span>
            </label>
          ))}
        </div>
        <p className="mt-1 text-[10.5px] leading-relaxed text-ink-faint">
          This sets your papers, questions and dashboard. You can change it later in Settings.
        </p>
      </fieldset>

      {taught === "zh" && (
        <fieldset>
          <legend className={labelClass}>Which stream are you applying for?</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                  className="accent-[#d31d3c]"
                  defaultChecked={option.value === "STEM"}
                />
                {option.label}
              </label>
            ))}
          </div>
          <p className="mt-1 text-[10.5px] leading-relaxed text-ink-faint">
            文科 = 文科中文 + 数学 · 理科 = 理科中文 + 数学 + 物理 + 化学
          </p>
        </fieldset>
      )}

      <Submit label="Continue — email me a code" />

      <p className="pt-1 text-center text-[12.5px] text-ink-soft">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-vermillion hover:underline">
          Sign in
        </Link>
      </p>

      <p className="text-center text-[11px] leading-relaxed text-ink-faint">
        Next step: a 6-digit verification code lands in your inbox. By creating an account you
        agree to use original practice content for personal study. CSCA registration itself happens
        at csca.cn.
      </p>
    </form>
  );
}
