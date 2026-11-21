"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import {
  adminCancelOrderAction,
  adminMarkOrderPaidAction,
  deletePaymentMethodAction,
  importEnvPaymentMethodAction,
  saveBillingConfigAction,
  savePaymentMethodAction,
  togglePaymentMethodAction,
  type PaymentAdminState,
} from "@/lib/actions/payments";
import { formatCnyFixed } from "@/lib/plans";

export type AdminPaymentMethodRow = {
  id: string;
  uuid: string;
  name: string;
  gateway: string;
  icon: string | null;
  notifyDomain: string | null;
  notifyUrl: string;
  feePercent: number;
  feeFixedCents: number;
  enable: boolean;
  sort: number;
  gatewayUrl: string;
  merchantId: string;
  secretPreview: string;
  paymentType: string | null;
  orderCount: number;
};

export type AdminOrderRow = {
  id: string;
  tradeNo: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: string;
  baseAmountCents: number;
  discountCents: number;
  handlingFeeCents: number;
  totalAmountCents: number;
  status: string;
  gateway: string;
  paymentMethodName: string | null;
  paymentType: string | null;
  couponCode: string | null;
  callbackNo: string | null;
  paidAt: string | null;
  createdAt: string;
};

export type EnvFallbackPreview = {
  name: string;
  gatewayUrl: string;
  merchantId: string;
  secretPreview: string;
  paymentType: string | null;
  notifyUrl: string;
} | null;

function orderStatusBadge(status: string) {
  if (status === "PAID") return "border-jade/25 bg-jade/10 text-jade";
  if (status === "PENDING") return "border-gold/30 bg-gold/10 text-gold";
  return "border-line bg-paper-deep text-ink-faint";
}

export function PaymentsManager({
  methods,
  orders,
  stats,
  billingConfig,
  envFallback,
  defaultOrigin,
}: {
  methods: AdminPaymentMethodRow[];
  orders: AdminOrderRow[];
  stats: {
    activeMethods: number;
    paidCount: number;
    pendingCount: number;
    totalRevenueCents: number;
  };
  billingConfig: {
    proPriceCents: number;
    proDurationMonths: number;
  };
  envFallback: EnvFallbackPreview;
  defaultOrigin: string;
}) {
  const [state, formAction, pending] = useActionState<PaymentAdminState, FormData>(
    savePaymentMethodAction,
    null,
  );
  const [billingState, billingFormAction, billingPending] = useActionState<
    PaymentAdminState,
    FormData
  >(saveBillingConfigAction, null);
  const [editing, setEditing] = useState<AdminPaymentMethodRow | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyText(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((cur) => (cur === id ? null : cur));
      }, 1600);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Active Gateways
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-jade">
            {stats.activeMethods}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Paid Orders
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-ink">
            {stats.paidCount}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Pending Orders
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-gold">
            {stats.pendingCount}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-xs">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
            Total Revenue
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-vermillion">
            {formatCnyFixed(stats.totalRevenueCents)}
          </p>
        </div>
      </div>

      {/* Pro Plan Checkout Pricing */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Pro Plan Checkout Pricing
            </h2>
            <p className="text-xs text-ink-soft">
              Base price and access duration charged to students on Billing checkout (before any
              discount coupon or gateway surcharge).
            </p>
          </div>
        </div>

        <form
          key={`${billingConfig.proPriceCents}-${billingConfig.proDurationMonths}`}
          action={billingFormAction}
          className="mt-4 grid gap-4 sm:grid-cols-3 sm:items-end"
        >
          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Pro Plan Price (¥) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max="10000"
              required
              name="proPriceYuan"
              defaultValue={(billingConfig.proPriceCents / 100).toFixed(2)}
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm tabular-nums text-ink focus:border-vermillion focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-ink-faint uppercase">
              Duration (Months) *
            </label>
            <input
              type="number"
              min={1}
              max={60}
              required
              name="proDurationMonths"
              defaultValue={billingConfig.proDurationMonths}
              className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm tabular-nums text-ink focus:border-vermillion focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={billingPending}
              className="h-9 rounded-xl bg-ink px-5 text-xs font-semibold text-paper transition hover:bg-ink/85 disabled:opacity-60"
            >
              {billingPending ? "Saving…" : "Save Plan Price"}
            </button>
          </div>
        </form>
        {billingState?.error ? (
          <p className="mt-2.5 text-xs font-medium text-rose-700">{billingState.error}</p>
        ) : null}
        {billingState?.ok ? (
          <p className="mt-2.5 text-xs font-medium text-jade">{billingState.message}</p>
        ) : null}
      </section>

      {/* Env fallback banner if DB has 0 rows */}
      {methods.length === 0 && envFallback ? (
        <section className="rounded-2xl border border-jade/30 bg-jade-soft/40 p-5 shadow-xs">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-jade uppercase">
                Environment Fallback Active
              </p>
              <h2 className="font-display text-lg font-semibold text-ink">
                {envFallback.name} ({envFallback.paymentType || "EPay"})
              </h2>
              <p className="text-xs text-ink-soft">
                Gateway: <span className="font-mono text-ink">{envFallback.gatewayUrl}</span> · PID{" "}
                <span className="font-mono text-ink">{envFallback.merchantId}</span> · Key{" "}
                <span className="font-mono text-ink">{envFallback.secretPreview}</span>
              </p>
              <p className="text-xs text-ink-soft">
                Notify URL: <span className="font-mono text-ink">{envFallback.notifyUrl}</span>
              </p>
            </div>
            <form action={importEnvPaymentMethodAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-jade px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-95"
              >
                <Download className="h-3.5 w-3.5" />
                Import into Database
              </button>
            </form>
          </div>
        </section>
      ) : null}

      {/* Add / Edit Payment Method Form (modeled on Xboard EPay config) */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-vermillion/10 p-1.5 text-vermillion">
              {editing ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                {editing ? `Edit Payment Method — ${editing.name}` : "Add EPay Payment Method"}
              </h2>
              <p className="text-xs text-ink-soft">
                Xboard-compatible EPay gateway settings (Alipay, WeChat Pay, QQ Pay, etc.).
              </p>
            </div>
          </div>
          {editing ? (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setShowSecret(false);
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition hover:text-ink"
            >
              <X className="h-3.5 w-3.5" /> Cancel edit
            </button>
          ) : null}
        </div>

        <form key={editing?.id ?? "new"} action={formAction} className="mt-5 space-y-5">
          {editing ? <input type="hidden" name="id" value={editing.id} /> : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Display Name *
              </label>
              <input
                name="name"
                required
                defaultValue={editing?.name ?? ""}
                placeholder="支付宝 Pay"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-ink-faint">Used for frontend display</p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Icon URL
              </label>
              <input
                name="icon"
                defaultValue={editing?.icon ?? ""}
                placeholder="https://example.com/images/alipay.svg"
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-ink-faint">Icon URL for frontend display</p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Notify Domain
              </label>
              <input
                name="notifyDomain"
                defaultValue={editing?.notifyDomain ?? ""}
                placeholder={defaultOrigin}
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-ink-faint">
                Optional override (defaults to {defaultOrigin})
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Gateway Handling Fee (%)
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={100}
                name="feePercent"
                defaultValue={editing ? editing.feePercent.toFixed(2) : "0.00"}
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm tabular-nums text-ink focus:border-vermillion focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-ink-faint">
                Extra % surcharge added on top of plan price
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                Gateway Extra Fixed Fee (¥)
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={10000}
                name="feeFixedYuan"
                defaultValue={editing ? (editing.feeFixedCents / 100).toFixed(2) : "0.00"}
                className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm tabular-nums text-ink focus:border-vermillion focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-ink-faint">
                Extra surcharge added on top of the plan price (leave 0.00 for no extra fee)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  Gateway *
                </label>
                <select
                  name="gateway"
                  defaultValue="EPAY"
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-paper-deep/40 px-3 text-sm text-ink focus:border-vermillion focus:outline-none"
                >
                  <option value="EPAY">EPay</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  Sort Order
                </label>
                <input
                  type="number"
                  name="sort"
                  defaultValue={editing?.sort ?? 0}
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 text-sm tabular-nums text-ink focus:border-vermillion focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-line pt-4">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Payment Configuration
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  支付网关地址 · Gateway URL *
                </label>
                <input
                  name="gatewayUrl"
                  required
                  defaultValue={editing?.gatewayUrl ?? ""}
                  placeholder="https://gw28.001cyy.com/"
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 font-mono text-sm text-ink focus:border-vermillion focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-ink-faint">
                  请填写完整的支付网关地址，包括协议（http或https）
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  商户ID · Merchant ID (pid) *
                </label>
                <input
                  name="merchantId"
                  required
                  defaultValue={editing?.merchantId ?? ""}
                  placeholder="1462"
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 font-mono text-sm text-ink focus:border-vermillion focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-ink-faint">请填写商户ID</p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  通信密钥 · Secret Key {editing ? "(optional)" : "*"}
                </label>
                <div className="relative mt-1">
                  <input
                    type={showSecret ? "text" : "password"}
                    name="secretKey"
                    required={!editing}
                    defaultValue=""
                    autoComplete="new-password"
                    placeholder={
                      editing
                        ? `Leave blank to keep (${editing.secretPreview})`
                        : "Enter EPay MD5 key"
                    }
                    className="h-9 w-full rounded-xl border border-line bg-white pr-9 pl-3 font-mono text-sm text-ink focus:border-vermillion focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret((prev) => !prev)}
                    className="absolute right-2.5 top-2 text-ink-faint hover:text-ink"
                    aria-label={showSecret ? "Hide secret" : "Show secret"}
                  >
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-ink-faint">
                  {editing
                    ? "Leave blank to preserve existing secret key."
                    : "请填写通信密钥 (never exposed to browser clients)"}
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-ink-faint uppercase">
                  支付类型 · Payment Type
                </label>
                <input
                  name="paymentType"
                  defaultValue={editing?.paymentType ?? ""}
                  placeholder="alipay"
                  className="mt-1 h-9 w-full rounded-xl border border-line bg-white px-3 font-mono text-sm text-ink focus:border-vermillion focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-ink-faint">
                  支付类型，如：alipay, wxpay, qqpay 等，可自定义
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-ink">
              <input
                type="checkbox"
                name="enable"
                defaultChecked={editing ? editing.enable : true}
                className="h-4 w-4 rounded border-line accent-vermillion"
              />
              Enable this payment method on student checkout
            </label>

            <div className="flex items-center gap-2">
              {editing ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setShowSecret(false);
                  }}
                  className="h-9 rounded-xl border border-line bg-white px-4 text-xs font-medium text-ink transition hover:border-ink/30"
                >
                  Cancel
                </button>
              ) : null}
              <button
                type="submit"
                disabled={pending}
                className="h-9 rounded-xl bg-vermillion px-5 text-xs font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
              >
                {pending ? "Saving…" : editing ? "Save Changes" : "Confirm & Add"}
              </button>
            </div>
          </div>

          {state?.error ? (
            <p className="text-xs font-medium text-rose-700">{state.error}</p>
          ) : null}
          {state?.ok ? (
            <p className="text-xs font-medium text-jade">{state.message ?? "Saved."}</p>
          ) : null}
        </form>
      </section>

      {/* Configured Methods List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Configured Payment Methods ({methods.length})
          </h2>
        </div>

        {methods.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white p-8 text-center text-sm text-ink-soft">
            {envFallback
              ? "Using .env fallback gateway above. Add a method above or import it to customize in the database."
              : "No payment gateways configured yet. Add an EPay gateway above."}
          </div>
        ) : (
          methods.map((method) => {
            const isCopied = copiedId === method.id;
            return (
              <div
                key={method.id}
                className="rounded-2xl border border-line bg-white p-5 shadow-xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper-deep/50">
                      {method.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={method.icon}
                          alt={method.name}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <CreditCard className="h-4 w-4 text-vermillion" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-base font-semibold text-ink">
                          {method.name}
                        </span>
                        <span className="rounded-full border border-indigo/25 bg-indigo/10 px-2 py-0.5 text-[10px] font-semibold text-indigo uppercase">
                          {method.gateway}
                        </span>
                        {method.paymentType ? (
                          <span className="rounded-full border border-line bg-paper-deep/60 px-2 py-0.5 font-mono text-[10px] text-ink-soft">
                            {method.paymentType}
                          </span>
                        ) : null}
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            method.enable
                              ? "border-jade/25 bg-jade/10 text-jade"
                              : "border-line bg-paper-deep text-ink-faint"
                          }`}
                        >
                          {method.enable ? "Active" : "Paused"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-soft">
                        Gateway: <span className="font-mono text-ink">{method.gatewayUrl}</span> ·
                        PID: <span className="font-mono text-ink">{method.merchantId}</span> · Key:{" "}
                        <span className="font-mono text-ink">{method.secretPreview}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-ink-soft">
                        Fee: {method.feePercent.toFixed(2)}% +{" "}
                        {formatCnyFixed(method.feeFixedCents)} · Sort: {method.sort} · Orders:{" "}
                        {method.orderCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(method);
                        setShowSecret(false);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink transition hover:border-vermillion/40 hover:text-vermillion"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </button>

                    <form action={togglePaymentMethodAction}>
                      <input type="hidden" name="id" value={method.id} />
                      <input
                        type="hidden"
                        name="enable"
                        value={method.enable ? "false" : "true"}
                      />
                      <button
                        type="submit"
                        className="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink transition hover:border-vermillion/40"
                      >
                        {method.enable ? "Pause" : "Enable"}
                      </button>
                    </form>

                    <form action={deletePaymentMethodAction}>
                      <input type="hidden" name="id" value={method.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-lg border border-line px-2.5 py-1 text-xs text-ink-soft transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                        title="Delete payment method"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-xs">
                  <div className="min-w-0 truncate text-ink-soft">
                    <span className="font-medium text-ink-faint">Notify URL: </span>
                    <span className="font-mono text-ink">{method.notifyUrl}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(method.id, method.notifyUrl)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] font-medium text-ink-soft transition hover:border-vermillion/40 hover:text-vermillion"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-jade" />
                        <span className="text-jade">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Notify URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Recent Orders */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Recent Orders ({orders.length})
            </h2>
            <p className="text-xs text-ink-soft">
              Latest 50 checkout orders across Pro and Lifetime upgrades.
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <p className="mt-5 text-sm text-ink-soft">No checkout orders created yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-xs">
              <thead>
                <tr className="border-b border-line text-[10.5px] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                  <th className="py-2.5 pr-3">Order</th>
                  <th className="px-3 py-2.5">Student</th>
                  <th className="px-3 py-2.5">Plan</th>
                  <th className="px-3 py-2.5">Gateway</th>
                  <th className="px-3 py-2.5">Amount</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Created</th>
                  <th className="py-2.5 pl-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-paper-deep/30">
                    <td className="py-3 pr-3 font-mono text-[11.5px] text-ink">
                      <div>{order.tradeNo}</div>
                      {order.callbackNo ? (
                        <div className="text-[10.5px] text-ink-faint">
                          ref: {order.callbackNo}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-3 py-3">
                      <Link
                        href={`/admin/students/${order.userId}`}
                        className="font-medium text-ink hover:text-vermillion"
                      >
                        {order.userName}
                      </Link>
                      <div className="text-[11px] text-ink-soft">{order.userEmail}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-semibold text-ink">{order.plan}</span>
                      {order.couponCode ? (
                        <div className="font-mono text-[10.5px] text-jade">
                          {order.couponCode} (-{formatCnyFixed(order.discountCents)})
                        </div>
                      ) : null}
                    </td>
                    <td className="px-3 py-3 text-ink-soft">
                      <div>{order.paymentMethodName ?? order.gateway}</div>
                      {order.paymentType ? (
                        <div className="font-mono text-[10.5px] text-ink-faint">
                          {order.paymentType}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-3 py-3 tabular-nums">
                      <div className="font-semibold text-ink">
                        {formatCnyFixed(order.totalAmountCents)}
                      </div>
                      {order.handlingFeeCents > 0 ? (
                        <div className="text-[10.5px] text-ink-faint">
                          incl. {formatCnyFixed(order.handlingFeeCents)} fee
                        </div>
                      ) : null}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${orderStatusBadge(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                      {order.paidAt ? (
                        <div className="mt-0.5 text-[10.5px] text-ink-faint">
                          {order.paidAt.slice(0, 16).replace("T", " ")} UTC
                        </div>
                      ) : null}
                    </td>
                    <td className="px-3 py-3 text-ink-soft tabular-nums">
                      {order.createdAt.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="py-3 pl-3 text-right">
                      {order.status === "PENDING" ? (
                        <div className="inline-flex items-center gap-1.5">
                          <form action={adminMarkOrderPaidAction}>
                            <input type="hidden" name="tradeNo" value={order.tradeNo} />
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1 rounded-lg border border-jade/30 bg-jade/10 px-2 py-1 text-[11px] font-medium text-jade transition hover:bg-jade/20"
                              title="Manually confirm payment & unlock plan"
                            >
                              <CheckCircle2 className="h-3 w-3" /> Mark paid
                            </button>
                          </form>
                          <form action={adminCancelOrderAction}>
                            <input type="hidden" name="tradeNo" value={order.tradeNo} />
                            <button
                              type="submit"
                              className="rounded-lg border border-line bg-white px-2 py-1 text-[11px] font-medium text-ink-soft transition hover:border-rose-300 hover:text-rose-700"
                            >
                              Cancel
                            </button>
                          </form>
                        </div>
                      ) : (
                        <span className="text-ink-faint">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
