"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { redeemCouponAction, type CouponState } from "@/lib/actions/coupons";
import { trackLink, type TaughtTrack } from "@/lib/tracks";

function Submit({ zh }: { zh: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-vermillion px-4 text-[13px] font-medium text-paper transition hover:bg-vermillion-deep disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? (zh ? "兑换中…" : "Redeeming…") : zh ? "兑换" : "Redeem"}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}

export function RedeemForm({ track = "EN" }: { track?: TaughtTrack }) {
  const [state, action] = useActionState<CouponState, FormData>(redeemCouponAction, null);
  const zh = track === "CN";

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-jade/25 bg-jade-soft/60 px-3.5 py-3">
        <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-jade">
          <Check className="h-3.5 w-3.5" />{" "}
          {zh ? "兑换成功，专业版已开通。" : "Code applied — Pro is active."}
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-jade/90">
          {zh
            ? "现在可不限次数作答全部模拟卷，并在计时模式下作答所有官方真题。"
            : "You now have unlimited attempts on every mock and can sit the official papers on the clock."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={trackLink("/app/mocks", track)}
            className="inline-flex h-8 items-center rounded-md bg-jade px-3 text-[11.5px] font-medium text-white transition hover:bg-jade/90"
          >
            {zh ? "做一套模拟卷" : "Sit a mock"}
          </Link>
          <Link
            href={trackLink("/app/official", track)}
            className="inline-flex h-8 items-center rounded-md border border-jade/30 px-3 text-[11.5px] font-medium text-jade transition hover:bg-jade/10"
          >
            {zh ? "官方真题" : "Official papers"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="min-w-0 flex-1">
          <input type="hidden" name="lang" value={zh ? "zh" : "en"} />
          <label htmlFor="code" className="sr-only">
            {zh ? "兑换码" : "Coupon code"}
          </label>
          <input
            id="code"
            name="code"
            placeholder="CSCA-XXXXXX"
            className="h-11 w-full rounded-lg border border-line bg-card px-3.5 text-[13px] text-ink uppercase placeholder:text-ink-faint/70 focus:border-vermillion/50 focus:ring-2 focus:ring-vermillion/15 focus:outline-none"
          />
        </div>
        <Submit zh={zh} />
      </div>
      {state?.error && (
        <p className="flex items-start gap-1.5 text-[12px] text-vermillion-deep">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {state.error}
        </p>
      )}
    </form>
  );
}
