"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  Loader2,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import {
  PURCHASABLE_PLAN_LIST,
  PURCHASABLE_PLANS,
  computeOrderPricing,
  formatCny,
  formatCnyFixed,
  type PurchasablePlanId,
} from "@/lib/plans";
import { trackLink, type TaughtTrack } from "@/lib/tracks";

export type CheckoutPaymentMethod = {
  id: string;
  uuid: string;
  name: string;
  gateway: string;
  icon: string | null;
  feePercent: number;
  feeFixedCents: number;
  paymentType: string | null;
  source: "db" | "env";
};

export type StudentOrderItem = {
  tradeNo: string;
  plan: string;
  status: string;
  totalAmountCents: number;
  paymentMethodName: string | null;
  payUrl: string | null;
  paidAt: string | null;
  createdAt: string;
};

function MethodIcon({ icon, name }: { icon: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!icon || failed) {
    return <CreditCard className="h-4 w-4 text-vermillion" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon}
      alt={name}
      className="h-5 w-5 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export function OrderStatusBanner({
  initialOrder,
  track,
}: {
  initialOrder: StudentOrderItem;
  track: TaughtTrack;
}) {
  const router = useRouter();
  const zh = track === "CN";
  const [polledOrder, setPolledOrder] = useState<StudentOrderItem | null>(null);
  const [checking, setChecking] = useState(false);

  const order =
    initialOrder.status !== "PENDING"
      ? initialOrder
      : polledOrder && polledOrder.tradeNo === initialOrder.tradeNo
        ? polledOrder
        : initialOrder;

  const orderStatus = order.status;
  const orderTradeNo = order.tradeNo;

  useEffect(() => {
    if (orderStatus !== "PENDING") return;
    let cancelled = false;
    let attempts = 0;

    const timer = setInterval(async () => {
      if (cancelled || attempts >= 40) {
        clearInterval(timer);
        return;
      }
      attempts += 1;
      try {
        const res = await fetch(`/api/payments/orders/${encodeURIComponent(orderTradeNo)}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { order?: StudentOrderItem };
        if (data.order && !cancelled) {
          const next = data.order;
          setPolledOrder((prev) => ({ ...(prev ?? initialOrder), ...next }));
          if (next.status === "PAID") {
            clearInterval(timer);
            router.refresh();
          }
        }
      } catch {
        // Retry silently on transient network hiccup
      }
    }, 2500);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [orderStatus, orderTradeNo, initialOrder, router]);

  async function refreshStatus() {
    setChecking(true);
    try {
      const res = await fetch(`/api/payments/orders/${encodeURIComponent(order.tradeNo)}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { order?: StudentOrderItem };
        if (data.order) {
          setPolledOrder((prev) => ({ ...(prev ?? order), ...data.order }));
          if (data.order.status === "PAID") {
            router.refresh();
          }
        }
      }
    } finally {
      setChecking(false);
    }
  }

  if (order.status === "PAID") {
    return (
      <div className="mb-6 rounded-2xl border border-jade/30 bg-jade-soft/60 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-jade">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {zh
                ? `支付成功！${order.plan === "LIFETIME" ? "终身版" : "专业版"}权限已即时开通`
                : `Payment confirmed — ${order.plan === "LIFETIME" ? "Lifetime" : "Pro"} access is now active`}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              {zh ? "订单号：" : "Order #"}
              <span className="font-mono text-ink">{order.tradeNo}</span> ·{" "}
              {formatCnyFixed(order.totalAmountCents)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={trackLink("/app/mocks", track)}
              className="inline-flex h-9 items-center rounded-lg bg-jade px-3.5 text-xs font-medium text-white transition hover:bg-jade/90"
            >
              {zh ? "开始计时模拟" : "Sit a mock"}
            </Link>
            <Link
              href={trackLink("/app/official", track)}
              className="inline-flex h-9 items-center rounded-lg border border-jade/30 bg-white px-3.5 text-xs font-medium text-jade transition hover:bg-jade/10"
            >
              {zh ? "查看官方真题" : "Official papers"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (order.status === "PENDING") {
    return (
      <div className="mb-6 rounded-2xl border border-gold/35 bg-gold/8 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Loader2 className="h-4 w-4 animate-spin text-gold" />
              {zh ? "正在确认支付结果…" : "Confirming your payment…"}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              {zh
                ? `订单 ${order.tradeNo}（${formatCnyFixed(order.totalAmountCents)}）正在等待网关回调。通常几秒内自动完成。`
                : `Order ${order.tradeNo} (${formatCnyFixed(order.totalAmountCents)}) is awaiting gateway confirmation. This usually updates automatically within seconds.`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={refreshStatus}
              disabled={checking}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-xs font-medium text-ink transition hover:border-ink/30 disabled:opacity-60"
            >
              {checking ? <Loader2 className="h-3 w-3 animate-spin" /> : <Clock className="h-3 w-3" />}
              {zh ? "刷新状态" : "Check status"}
            </button>
            {order.payUrl ? (
              <a
                href={order.payUrl}
                className="inline-flex h-8 items-center gap-1 rounded-lg bg-ink px-3 text-xs font-medium text-paper transition hover:bg-ink/85"
              >
                {zh ? "继续付款" : "Continue payment"}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-2xl border border-line bg-paper-deep/60 p-4 text-xs text-ink-soft">
      {zh
        ? `订单 ${order.tradeNo} 当前状态为「${order.status}」。如需开通，请在下方重新发起支付。`
        : `Order ${order.tradeNo} is marked as ${order.status.toLowerCase()}. You can start a new checkout below.`}
    </div>
  );
}

export function EpayCheckout({
  track,
  currentPlan,
  methods,
  recentOrders,
}: {
  track: TaughtTrack;
  currentPlan: "FREE" | "PRO" | "LIFETIME";
  methods: CheckoutPaymentMethod[];
  recentOrders: StudentOrderItem[];
}) {
  const router = useRouter();
  const zh = track === "CN";

  const [selectedPlan, setSelectedPlan] = useState<PurchasablePlanId>(
    currentPlan === "PRO" ? "LIFETIME" : "PRO",
  );
  const [selectedMethodId, setSelectedMethodId] = useState<string>(methods[0]?.id ?? "");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    percent: number;
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [cancellingTradeNo, setCancellingTradeNo] = useState<string | null>(null);

  const selectedMethod =
    methods.find((m) => m.id === selectedMethodId) ?? methods[0] ?? null;
  const planSpec = PURCHASABLE_PLANS[selectedPlan];
  const pricing = computeOrderPricing({
    baseAmountCents: planSpec.priceCents,
    discountPercent: appliedCoupon?.percent ?? 0,
    feePercent: selectedMethod?.feePercent ?? 0,
    feeFixedCents: selectedMethod?.feeFixedCents ?? 0,
  });

  async function handleApplyCoupon() {
    const trimmed = couponInput.trim();
    if (!trimmed) {
      setCouponError(zh ? "请输入优惠码。" : "Enter a discount code.");
      return;
    }
    setPreviewLoading(true);
    setCouponError(null);
    try {
      const res = await fetch("/api/payments/epay/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          paymentMethodId: selectedMethod?.id ?? null,
          couponCode: trimmed,
          lang: zh ? "zh" : "en",
        }),
      });
      const data = (await res.json()) as {
        coupon?: { code: string; percent: number } | null;
        couponError?: string | null;
        error?: string;
      };
      if (!res.ok) {
        setCouponError(data.error ?? (zh ? "优惠码校验失败。" : "Could not check coupon."));
        return;
      }
      if (data.couponError || !data.coupon) {
        setAppliedCoupon(null);
        setCouponError(data.couponError ?? (zh ? "该优惠码无效。" : "Invalid coupon code."));
        return;
      }
      setAppliedCoupon(data.coupon);
      setCouponInput(data.coupon.code);
    } catch {
      setCouponError(zh ? "网络异常，请重试。" : "Network error — please try again.");
    } finally {
      setPreviewLoading(false);
    }
  }

  async function handleCheckout() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/payments/epay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          paymentMethodId: selectedMethod?.id ?? null,
          couponCode: appliedCoupon?.code ?? null,
          lang: zh ? "zh" : "en",
        }),
      });
      const data = (await res.json()) as {
        immediate?: boolean;
        tradeNo?: string;
        payUrl?: string;
        error?: string;
      };
      if (!res.ok) {
        setSubmitError(
          data.error ?? (zh ? "无法发起支付，请重试。" : "Could not start checkout."),
        );
        return;
      }
      if (data.immediate && data.tradeNo) {
        router.replace(
          `${trackLink("/app/billing", track)}?order=${encodeURIComponent(data.tradeNo)}`,
        );
        router.refresh();
        return;
      }
      if (data.payUrl) {
        window.location.assign(data.payUrl);
        return;
      }
      setSubmitError(zh ? "支付链接生成失败。" : "Payment redirect URL was not returned.");
    } catch {
      setSubmitError(zh ? "网络错误，请重试。" : "Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCancelOrder(tradeNo: string) {
    setCancellingTradeNo(tradeNo);
    try {
      await fetch(`/api/payments/orders/${encodeURIComponent(tradeNo)}`, {
        method: "DELETE",
      });
      router.refresh();
    } finally {
      setCancellingTradeNo(null);
    }
  }

  const canPayOnline = methods.length > 0 || pricing.totalAmountCents === 0;

  return (
    <div className="space-y-6">
      {currentPlan !== "LIFETIME" ? (
        <section
          id="checkout"
          className="scroll-mt-24 rounded-2xl border border-vermillion/25 bg-card p-6 shadow-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium tracking-[0.14em] text-vermillion uppercase">
                {zh ? "在线支付开通" : "Instant online checkout"}
              </p>
              <h2 className="mt-1 font-display text-xl text-ink">
                {currentPlan === "PRO"
                  ? zh
                    ? "续期专业版或升级终身版"
                    : "Extend Pro or upgrade to Lifetime"
                  : zh
                    ? "选择方案并立即支付"
                    : "Choose a plan & pay online"}
              </h2>
            </div>
            <Sparkles className="h-4 w-4 text-gold" />
          </div>

          {/* Plan Cards */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PURCHASABLE_PLAN_LIST.map((plan) => {
              const active = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-vermillion bg-vermillion/5 ring-1 ring-vermillion/25"
                      : "border-line bg-paper hover:border-ink/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-base font-semibold text-ink">
                      {zh ? plan.nameZh : plan.nameEn}
                    </span>
                    <span className="font-display text-lg font-semibold tabular-nums text-vermillion">
                      {formatCny(plan.priceCents)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] font-medium text-ink-soft">
                    {zh ? plan.periodZh : plan.periodEn}
                  </p>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
                    {zh ? plan.summaryZh : plan.summaryEn}
                  </p>
                </button>
              );
            })}
          </div>

          {currentPlan === "PRO" && selectedPlan === "PRO" ? (
            <p className="mt-2.5 text-[11.5px] text-ink-soft">
              {zh
                ? "你当前已是专业版，再次购买将在现有有效期基础上自动顺延 12 个月。"
                : "Purchasing Pro while active automatically adds 12 months onto your current expiry date."}
            </p>
          ) : null}

          {/* Discount Coupon */}
          <div className="mt-4 rounded-xl border border-line bg-paper-deep/40 p-3.5">
            <label className="flex items-center gap-1.5 text-[11px] font-medium text-ink-faint uppercase">
              <Tag className="h-3 w-3" />
              {zh ? "折扣优惠码（选填）" : "Discount coupon (optional)"}
            </label>
            {appliedCoupon ? (
              <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-jade/30 bg-jade-soft/50 px-3 py-2 text-xs">
                <span className="font-medium text-jade">
                  <span className="font-mono font-semibold">{appliedCoupon.code}</span> · -
                  {appliedCoupon.percent}% ({zh ? "已优惠" : "saves"}{" "}
                  {formatCnyFixed(pricing.discountCents)})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedCoupon(null);
                    setCouponInput("");
                    setCouponError(null);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-soft hover:text-ink"
                >
                  <X className="h-3 w-3" /> {zh ? "移除" : "Remove"}
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    if (couponError) setCouponError(null);
                  }}
                  placeholder={zh ? "输入折扣码…" : "Enter % promo code…"}
                  className="h-9 min-w-0 flex-1 rounded-lg border border-line bg-white px-3 text-xs uppercase text-ink placeholder:text-ink-faint focus:border-vermillion focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={previewLoading}
                  className="h-9 shrink-0 rounded-lg border border-line-strong bg-white px-3.5 text-xs font-medium text-ink transition hover:border-ink/40 disabled:opacity-60"
                >
                  {previewLoading ? (zh ? "验证中…" : "Checking…") : zh ? "应用" : "Apply"}
                </button>
              </div>
            )}
            {couponError ? (
              <p className="mt-1.5 flex items-start gap-1 text-[11.5px] text-vermillion-deep">
                <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
                {couponError}
              </p>
            ) : null}
          </div>

          {/* Payment Method Selection */}
          {pricing.totalAmountCents > 0 ? (
            <div className="mt-4">
              <p className="text-[11px] font-medium text-ink-faint uppercase">
                {zh ? "支付方式" : "Payment method"}
              </p>
              {methods.length === 0 ? (
                <div className="mt-2 rounded-xl border border-line bg-paper-deep/50 p-3.5 text-xs text-ink-soft">
                  {zh
                    ? "在线支付通道暂未开启。请使用下方的专业版兑换码或人工申请开通。"
                    : "Online checkout is not enabled yet. Redeem a Pro code or request activation below."}
                </div>
              ) : (
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {methods.map((method) => {
                    const chosen = selectedMethod?.id === method.id;
                    const hasFee = method.feePercent > 0 || method.feeFixedCents > 0;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethodId(method.id)}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${
                          chosen
                            ? "border-vermillion bg-vermillion/5 ring-1 ring-vermillion/25"
                            : "border-line bg-paper hover:border-ink/25"
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white">
                            <MethodIcon icon={method.icon} name={method.name} />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-ink">
                              {method.name}
                            </p>
                            {hasFee ? (
                              <p className="text-[10.5px] text-ink-faint">
                                {zh ? "通道手续费" : "Fee"}:{" "}
                                {method.feePercent > 0 ? `${method.feePercent}%` : ""}
                                {method.feePercent > 0 && method.feeFixedCents > 0 ? " + " : ""}
                                {method.feeFixedCents > 0
                                  ? formatCnyFixed(method.feeFixedCents)
                                  : ""}
                              </p>
                            ) : (
                              <p className="text-[10.5px] text-ink-faint">
                                {zh ? "即时自动开通" : "Instant activation"}
                              </p>
                            )}
                          </div>
                        </div>
                        {chosen ? <Check className="h-4 w-4 shrink-0 text-vermillion" /> : null}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          {/* Summary & Checkout CTA */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <div className="space-y-0.5 text-xs">
              <div className="flex items-baseline gap-2">
                <span className="text-ink-soft">{zh ? "实付金额：" : "Total due:"}</span>
                <span className="font-display text-2xl font-semibold tabular-nums text-ink">
                  {formatCny(pricing.totalAmountCents)}
                </span>
              </div>
              {pricing.discountCents > 0 || pricing.handlingFeeCents > 0 ? (
                <p className="text-[11px] text-ink-faint">
                  {zh ? "原价" : "Base"} {formatCnyFixed(pricing.baseAmountCents)}
                  {pricing.discountCents > 0
                    ? ` − ${formatCnyFixed(pricing.discountCents)}`
                    : ""}
                  {pricing.handlingFeeCents > 0
                    ? ` + ${formatCnyFixed(pricing.handlingFeeCents)} ${zh ? "手续费" : "fee"}`
                    : ""}
                </p>
              ) : (
                <p className="text-[11px] text-ink-faint">
                  {zh ? "支付完成后系统自动升级账户权限。" : "Access unlocks automatically as soon as payment settles."}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={!canPayOnline || submitting}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-vermillion px-5 text-[13px] font-medium text-paper transition hover:bg-vermillion-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {submitting
                ? zh
                  ? "正在跳转支付…"
                  : "Redirecting to payment…"
                : pricing.totalAmountCents === 0
                  ? zh
                    ? "免费确认开通"
                    : "Activate now (¥0)"
                  : selectedMethod
                    ? zh
                      ? `立即支付 ${formatCny(pricing.totalAmountCents)} (${selectedMethod.name})`
                      : `Pay ${formatCny(pricing.totalAmountCents)} with ${selectedMethod.name}`
                    : zh
                      ? "暂无可用通道"
                      : "Payment unavailable"}
              {!submitting && canPayOnline ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </div>

          {submitError ? (
            <p className="mt-3 flex items-start gap-1.5 text-xs text-vermillion-deep">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {submitError}
            </p>
          ) : null}
        </section>
      ) : null}

      {/* Recent Student Orders */}
      {recentOrders.length > 0 ? (
        <section className="rounded-xl border border-line bg-card p-5">
          <p className="text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
            {zh ? "支付记录" : "Payment history"}
          </p>
          <div className="mt-3 divide-y divide-line">
            {recentOrders.map((order) => (
              <div
                key={order.tradeNo}
                className="flex flex-wrap items-center justify-between gap-3 py-2.5 text-xs first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-medium text-ink">{order.tradeNo}</span>
                    <span className="font-semibold text-ink">
                      {order.plan === "LIFETIME"
                        ? zh
                          ? "终身版"
                          : "Lifetime"
                        : zh
                          ? "专业版"
                          : "Pro"}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        order.status === "PAID"
                          ? "border-jade/25 bg-jade/10 text-jade"
                          : order.status === "PENDING"
                            ? "border-gold/30 bg-gold/10 text-gold"
                            : "border-line bg-paper-deep text-ink-faint"
                      }`}
                    >
                      {order.status === "PAID"
                        ? zh
                          ? "已支付"
                          : "Paid"
                        : order.status === "PENDING"
                          ? zh
                            ? "待支付"
                            : "Pending"
                          : zh
                            ? "已取消"
                            : "Cancelled"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-ink-faint">
                    {order.paymentMethodName ?? "EPay"} · {order.createdAt.slice(0, 10)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold tabular-nums text-ink">
                    {formatCnyFixed(order.totalAmountCents)}
                  </span>
                  {order.status === "PENDING" && order.payUrl ? (
                    <a
                      href={order.payUrl}
                      className="rounded-lg border border-vermillion/35 bg-vermillion/10 px-2.5 py-1 text-[11px] font-medium text-vermillion hover:bg-vermillion/15"
                    >
                      {zh ? "去付款" : "Pay"}
                    </a>
                  ) : null}
                  {order.status === "PENDING" ? (
                    <button
                      type="button"
                      disabled={cancellingTradeNo === order.tradeNo}
                      onClick={() => handleCancelOrder(order.tradeNo)}
                      className="rounded-lg border border-line px-2 py-1 text-[11px] text-ink-soft hover:text-ink disabled:opacity-50"
                    >
                      {cancellingTradeNo === order.tradeNo
                        ? "…"
                        : zh
                          ? "取消"
                          : "Cancel"}
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
