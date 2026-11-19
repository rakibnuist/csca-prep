"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";
import { updateProfileAction, type SettingsState } from "@/lib/actions/settings";
import { t } from "@/lib/i18n";

function SaveButton({ lang }: { lang: "en" | "zh" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper disabled:opacity-70"
    >
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {pending ? t(lang, "Saving…") : t(lang, "Save changes")}
    </button>
  );
}

export function SettingsForm({
  lang = "en",
  initialSaved = false,
  user,
}: {
  lang?: "en" | "zh";
  initialSaved?: boolean;
  user: {
    name: string | null;
    country: string | null;
    track: string | null;
    targetYear: number;
    teachingTrack: string;
  };
}) {
  const [state, action] = useActionState<SettingsState, FormData>(updateProfileAction, null);
  const [selectedLang, setSelectedLang] = useState<"en" | "zh">(
    user.teachingTrack === "CN" ? "zh" : "en",
  );
  const zh = lang === "zh";
  const showSaved = state?.ok || (initialSaved && state === null);

  const input =
    "h-10 w-full rounded-lg border border-line bg-card px-3 text-[13px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none";

  return (
    <form action={action} className="space-y-6">
      {showSaved && (
        <p className="flex items-center gap-1.5 rounded-lg border border-jade/25 bg-jade-soft/60 px-3 py-2 text-[12px] text-jade">
          <Check className="h-3.5 w-3.5" /> {t(lang, "Profile updated.")}
        </p>
      )}
      {state?.error && (
        <p className="rounded-lg border border-vermillion/25 bg-vermillion/6 px-3 py-2 text-[12px] text-vermillion-deep">
          {state.error}
        </p>
      )}

      <section className="panel p-5">
        <h2 className="font-display text-lg text-ink">{zh ? "个人资料" : "Profile"}</h2>
        <p className="text-[11.5px] text-ink-faint">
          {zh ? "用于调整你的学习计划与面板。" : "Used to tailor your plan and dashboard."}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[11.5px] font-medium text-ink-soft">
              {zh ? "姓名" : "Full name"}
            </span>
            <input
              name="name"
              defaultValue={user.name ?? ""}
              required
              minLength={2}
              maxLength={120}
              className={input}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11.5px] font-medium text-ink-soft">
              {zh ? "国家/地区" : "Country"}
            </span>
            <input
              name="country"
              defaultValue={user.country ?? ""}
              maxLength={80}
              placeholder={zh ? "例如：尼日利亚、哈萨克斯坦、印度尼西亚…" : "Nigeria, Kazakhstan, Indonesia…"}
              className={input}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11.5px] font-medium text-ink-soft">
              {zh ? "目标入学" : "Target intake"}
            </span>
            <select name="targetYear" defaultValue={String(user.targetYear)} className={input}>
              {[2027, 2028, 2029, 2030].map((year) => (
                <option key={year} value={year}>
                  {zh ? `${year} 年 9 月` : `September ${year}`}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[11.5px] font-medium text-ink-soft">
              {zh ? "授课语言" : "Teaching language"}
            </span>
            <select
              name="testLanguage"
              value={selectedLang}
              onChange={(event) => setSelectedLang(event.target.value === "zh" ? "zh" : "en")}
              className={input}
            >
              <option value="en">
                {zh ? "英文授课 — 数学、物理、化学" : "English-taught — Mathematics, Physics, Chemistry"}
              </option>
              <option value="zh">
                {zh ? "中文授课 — 数学、物理、化学 + 专业中文" : "Chinese-taught — Maths, Physics, Chemistry + Professional Chinese"}
              </option>
            </select>
            <span className="mt-1 block text-[10.5px] leading-relaxed text-ink-faint">
              {zh
                ? "设置你的默认分区。两个分区严格分开：英文授课区不显示中文试卷或题目，中文授课区不显示仅英文的内容。"
                : "Sets your default section. The two sections stay separate: English-taught never shows Chinese papers or items, Chinese-taught never shows English-only ones."}
            </span>
          </label>
        </div>

        <fieldset className="mt-4">
          <legend className="mb-1.5 text-[11.5px] font-medium text-ink-soft">
            {zh ? "专业方向" : "Stream"}
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              {
                value: "STEM",
                label: zh ? "理工 / 工程" : "STEM / Engineering",
                note:
                  selectedLang === "zh"
                    ? zh
                      ? "理科中文 + 数学 + 物理 + 化学"
                      : "STEM Chinese + Maths, Physics, Chemistry"
                    : zh
                      ? "数学 + 物理 + 化学（英文卷）"
                      : "Mathematics, Physics & Chemistry",
              },
              {
                value: "HUMANITIES",
                label: zh ? "人文 / 经管 / 法学" : "Humanities / Business / Law",
                note:
                  selectedLang === "zh"
                    ? zh
                      ? "文科中文 + 数学"
                      : "Humanities Chinese + Maths"
                    : zh
                      ? "英文授课区含数学、物理、化学"
                      : "English track covers Maths, Physics & Chemistry",
              },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-card px-3 py-2.5 has-checked:border-vermillion/50 has-checked:bg-vermillion/5"
              >
                <input
                  type="radio"
                  name="track"
                  value={option.value}
                  defaultChecked={user.track === option.value}
                  className="accent-[#d31d3c]"
                />
                <span>
                  <span className="block text-[12.5px] text-ink">{option.label}</span>
                  <span className="block text-[10.5px] text-ink-faint">{option.note}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 flex justify-end">
          <SaveButton lang={lang} />
        </div>
      </section>
    </form>
  );
}
