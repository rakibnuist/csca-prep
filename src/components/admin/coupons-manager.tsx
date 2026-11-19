"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Check, Copy, Plus, Ticket, Trash2 } from "lucide-react";
import {
  createCouponAction,
  deleteCouponAction,
  toggleCouponAction,
  type CouponState,
} from "@/lib/actions/coupons";

export type CouponRedemptionPreview = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: string;
};

export type CouponRow = {
  id: string;
  code: string;
  kind: string;
  value: number;
  maxUses: number;
  usedCount: number;
  active: boolean;
  expired: boolean;
  expiresAt: string | null;
  note: string | null;
  createdAt: string;
  recentRedemptions: CouponRedemptionPreview[];
};

function kindLabel(kind: string, value: number) {
  if (kind === "LIFETIME") return "Lifetime Pro";
  if (kind === "PERCENT") return `${value}% off`;
  return `+${value} mo Pro`;
}

export function CouponsManager({
  coupons,
  totalRedemptions,
}: {
  coupons: CouponRow[];
  totalRedemptions: number;
}) {
  const [state, formAction, pending] = useActionState<CouponState, FormData>(
    createCouponAction,
    null
  );
  const [kind, setKind] = useState("PRO_MONTHS");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeCount = coupons.filter((c) => c.active).length;
  const remainingSlots = coupons
    .filter((c) => c.active)
    .reduce((acc, c) => acc + Math.max(0, c.maxUses - c.usedCount), 0);

  async function handleCopy(id: string, code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((cur) => (cur === id ? null : cur));
      }, 1600);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Total Codes
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-ink">
            {coupons.length}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Active Codes
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-jade">
            {activeCount}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Total Redemptions
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-vermillion">
            {totalRedemptions}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Active Remaining Uses
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-ink">
            {remainingSlots}
          </p>
        </div>
      </div>

      {/* Create Coupon Form */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-vermillion/10 p-1.5 text-vermillion">
            <Plus className="h-4 w-4" />
          </span>
          <h2 className="font-display text-lg font-semibold text-ink">
            Generate Coupon Code
          </h2>
        </div>

        <form
          action={formAction}
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
        >
          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Kind
            </label>
            <select
              name="kind"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
            >
              <option value="PRO_MONTHS">Pro Months</option>
              <option value="LIFETIME">Lifetime Access</option>
              <option value="PERCENT">Percent Off</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              {kind === "PERCENT"
                ? "Discount (%)"
                : kind === "LIFETIME"
                  ? "Value (n/a)"
                  : "Pro Months"}
            </label>
            <input
              type="number"
              name="value"
              min={kind === "LIFETIME" ? 0 : 1}
              max={kind === "PERCENT" ? 100 : 60}
              defaultValue={kind === "LIFETIME" ? 0 : 1}
              disabled={kind === "LIFETIME"}
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink disabled:bg-paper-deep/50 focus:border-vermillion focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Max Uses
            </label>
            <input
              type="number"
              name="maxUses"
              min={1}
              max={100000}
              defaultValue={50}
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Custom Code (opt)
            </label>
            <input
              name="code"
              maxLength={32}
              placeholder="Auto (CSCA-XXXXXX)"
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm uppercase text-ink focus:border-vermillion focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Expires (opt)
            </label>
            <input
              type="date"
              name="expiresAt"
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
            />
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Note
              </label>
              <input
                name="note"
                maxLength={200}
                placeholder="Batch / campaign"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="h-9 shrink-0 rounded-xl bg-vermillion px-4 text-xs font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Create"}
            </button>
          </div>
        </form>

        {state?.error ? (
          <p className="mt-3 text-xs font-medium text-rose-700">{state.error}</p>
        ) : null}
        {state?.ok ? (
          <p className="mt-3 text-xs font-medium text-jade">
            Coupon code created and ready to share.
          </p>
        ) : null}
      </section>

      {/* Coupons List */}
      <div className="space-y-3">
        {coupons.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white p-10 text-center text-sm text-ink-soft">
            No coupon codes created yet.
          </div>
        ) : (
          coupons.map((coupon) => {
            const pct = Math.min(
              100,
              Math.round((coupon.usedCount / Math.max(1, coupon.maxUses)) * 100)
            );
            const expired = coupon.expired;
            const isCopied = copiedId === coupon.id;

            return (
              <div
                key={coupon.id}
                className="rounded-2xl border border-line bg-white p-5 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper-deep/60 px-3 py-1 font-mono text-sm font-semibold text-ink">
                      <Ticket className="h-3.5 w-3.5 text-vermillion" />
                      {coupon.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(coupon.id, coupon.code)}
                      className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] font-medium text-ink-soft transition hover:border-vermillion/40 hover:text-vermillion"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3 w-3 text-jade" />
                          <span className="text-jade">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <span className="rounded-full border border-indigo/25 bg-indigo/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-indigo">
                      {kindLabel(coupon.kind, coupon.value)}
                    </span>

                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold uppercase ${
                        coupon.active && !expired
                          ? "border-jade/25 bg-jade/10 text-jade"
                          : "border-line bg-paper-deep text-ink-faint"
                      }`}
                    >
                      {expired ? "Expired" : coupon.active ? "Active" : "Paused"}
                    </span>

                    {coupon.note ? (
                      <span className="text-xs text-ink-soft">· {coupon.note}</span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-xs tabular-nums">
                      <span className="font-semibold text-ink">
                        {coupon.usedCount} / {coupon.maxUses}
                      </span>{" "}
                      <span className="text-ink-faint">used</span>
                      <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-paper-deep">
                        <div
                          className="h-full rounded-full bg-vermillion"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <form action={toggleCouponAction}>
                      <input type="hidden" name="id" value={coupon.id} />
                      <input
                        type="hidden"
                        name="active"
                        value={coupon.active ? "false" : "true"}
                      />
                      <button
                        type="submit"
                        className="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink transition hover:border-vermillion/40"
                      >
                        {coupon.active ? "Pause" : "Activate"}
                      </button>
                    </form>

                    <form action={deleteCouponAction}>
                      <input type="hidden" name="id" value={coupon.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-xs text-ink-soft transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                        title="Delete coupon"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Metadata + Recent 5 Redemptions */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-xs text-ink-soft">
                  <span>
                    Created {coupon.createdAt.slice(0, 10)}
                    {coupon.expiresAt ? ` · Expires ${coupon.expiresAt.slice(0, 10)}` : ""}
                  </span>

                  {coupon.recentRedemptions.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-medium text-ink-faint">
                        Recent claims:
                      </span>
                      {coupon.recentRedemptions.map((r) => (
                        <Link
                          key={r.id}
                          href={`/admin/students/${r.userId}`}
                          className="rounded-full border border-line bg-paper-deep/50 px-2.5 py-0.5 text-[11px] font-medium text-ink transition hover:border-vermillion/40 hover:text-vermillion"
                          title={`${r.userEmail} · ${r.createdAt.slice(0, 10)}`}
                        >
                          {r.userName}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-ink-faint">No redemptions yet</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
