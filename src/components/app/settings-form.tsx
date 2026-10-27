"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";
import { updateProfileAction, type SettingsState } from "@/lib/actions/settings";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper disabled:opacity-70"
    >
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

export function SettingsForm({
  user,
}: {
  user: {
    name: string | null;
    country: string | null;
    track: string | null;
    targetYear: number;
    testLanguage: string;
  };
}) {
  const [state, action] = useActionState<SettingsState, FormData>(updateProfileAction, null);

  const input =
    "h-10 w-full rounded-lg border border-line bg-card px-3 text-[13px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none";

  return (
    <form action={action} className="space-y-6">
      {state?.ok && (
        <p className="flex items-center gap-1.5 rounded-lg border border-jade/25 bg-jade-soft/60 px-3 py-2 text-[12px] text-jade">
          <Check className="h-3.5 w-3.5" /> Profile updated.
        </p>
      )}
      {state?.error && (
        <p className="rounded-lg border border-vermillion/25 bg-vermillion/6 px-3 py-2 text-[12px] text-vermillion-deep">
          {state.error}
        </p>
      )}

      <section className="panel p-5">
        <h2 className="font-display text-lg text-ink">Profile</h2>
        <p className="text-[11.5px] text-ink-faint">Used to tailor your plan and dashboard.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[11.5px] font-medium text-ink-soft">Full name</span>
            <input name="name" defaultValue={user.name ?? ""} required className={input} />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11.5px] font-medium text-ink-soft">Country</span>
            <input
              name="country"
              defaultValue={user.country ?? ""}
              placeholder="Nigeria, Kazakhstan, Indonesia…"
              className={input}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11.5px] font-medium text-ink-soft">Target intake</span>
            <select name="targetYear" defaultValue={String(user.targetYear)} className={input}>
              {[2027, 2028, 2029, 2030].map((year) => (
                <option key={year} value={year}>
                  September {year}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11.5px] font-medium text-ink-soft">
              Interface language
            </span>
            <select name="testLanguage" defaultValue={user.testLanguage} className={input}>
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </label>
        </div>

        <fieldset className="mt-4">
          <legend className="mb-1.5 text-[11.5px] font-medium text-ink-soft">Stream</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { value: "STEM", label: "STEM / Engineering", note: "Maths + Physics/Chemistry" },
              { value: "HUMANITIES", label: "Humanities / Law", note: "Maths + Humanities Chinese" },
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
                  className="accent-[#c8102e]"
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
          <SaveButton />
        </div>
      </section>
    </form>
  );
}
