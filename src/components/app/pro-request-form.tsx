"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { submitLeadAction, type LeadState } from "@/lib/actions/leads";

function SubmitBtn({ zh }: { zh: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper transition hover:bg-ink/85 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
      {pending
        ? zh
          ? "提交中…"
          : "Sending request…"
        : zh
          ? "申请开通 / 获取兑换码"
          : "Request Pro access code"}
    </button>
  );
}

export function ProRequestForm({
  name,
  email,
  whatsapp,
  country,
  zh = false,
}: {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  zh?: boolean;
}) {
  const [state, action] = useActionState<LeadState, FormData>(submitLeadAction, null);

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-jade/30 bg-jade-soft/60 p-4">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-jade">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {zh ? "申请已提交！我们会尽快联系你" : "Request received — our team will send your code"}
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
          {zh
            ? "你的申请已进入高优先级队列，管理员会通过邮箱或 WhatsApp 将开通码发送给你。"
            : "Your request has been logged in our priority queue. Check your email or WhatsApp for activation details."}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="source" value="billing-upgrade" />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-[11px] font-medium text-ink-faint uppercase">
            {zh ? "姓名" : "Name"}
          </label>
          <input
            name="name"
            required
            defaultValue={name}
            className="mt-1 h-9 w-full rounded-lg border border-line bg-paper px-3 text-[12.5px] text-ink focus:border-vermillion focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium text-ink-faint uppercase">
            {zh ? "邮箱" : "Email"}
          </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={email}
            className="mt-1 h-9 w-full rounded-lg border border-line bg-paper px-3 text-[12.5px] text-ink focus:border-vermillion focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-[11px] font-medium text-ink-faint uppercase">
            {zh ? "WhatsApp / 微信号" : "WhatsApp (with country code)"}
          </label>
          <input
            name="whatsapp"
            defaultValue={whatsapp}
            placeholder="+86 / +880 / +60..."
            className="mt-1 h-9 w-full rounded-lg border border-line bg-paper px-3 text-[12.5px] text-ink focus:border-vermillion focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium text-ink-faint uppercase">
            {zh ? "国家 / 地区" : "Country"}
          </label>
          <input
            name="country"
            defaultValue={country}
            placeholder={zh ? "如：印度尼西亚" : "e.g. Bangladesh"}
            className="mt-1 h-9 w-full rounded-lg border border-line bg-paper px-3 text-[12.5px] text-ink focus:border-vermillion focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-medium text-ink-faint uppercase">
          {zh ? "开通类型" : "Access option"}
        </label>
        <select
          name="goal"
          defaultValue="Pro upgrade — upcoming sitting (urgent)"
          className="mt-1 h-9 w-full rounded-lg border border-line bg-paper px-3 text-[12.5px] text-ink focus:border-vermillion focus:bg-white focus:outline-none"
        >
          <option value="Pro upgrade — upcoming sitting (urgent)">
            {zh ? "考前冲刺专业版开通（加急）" : "Pro upgrade — upcoming sitting (urgent)"}
          </option>
          <option value="Full intake bundle request">
            {zh ? "全年备考专业版 / 终身版申请" : "Full intake bundle / Lifetime access request"}
          </option>
          <option value="Scholarship / partner voucher inquiry">
            {zh ? "合作机构 / 奖学金兑换码咨询" : "Scholarship / partner voucher inquiry"}
          </option>
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-medium text-ink-faint uppercase">
          {zh ? "备注（目标考试时间或付款方式偏好）" : "Notes (target sitting or preferred payment method)"}
        </label>
        <textarea
          name="message"
          rows={2}
          maxLength={600}
          placeholder={
            zh
              ? "例如：计划参加 12 月考试，方便微信/支付宝/银行卡联系…"
              : "e.g. Sitting Dec 2026 exam, prefer WhatsApp invoice / card / Alipay…"
          }
          className="mt-1 w-full rounded-lg border border-line bg-paper p-2.5 text-[12.5px] text-ink focus:border-vermillion focus:bg-white focus:outline-none"
        />
      </div>

      {state?.error ? (
        <p className="flex items-center gap-1.5 text-[12px] text-rose-700">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {state.error}
        </p>
      ) : null}

      <div className="flex justify-end">
        <SubmitBtn zh={zh} />
      </div>
    </form>
  );
}
