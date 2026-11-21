/**
 * Single source of truth for purchasable CSCA Master plans and pricing.
 *
 * Keep this file client-safe: it is imported by both checkout UI components
 * and server payment handlers so displayed prices and charged amounts never drift.
 */

export type PurchasablePlanId = "PRO" | "LIFETIME";

export type PurchasablePlan = {
  id: PurchasablePlanId;
  priceCents: number;
  durationMonths: number;
  durationDays: number;
  nameEn: string;
  nameZh: string;
  periodEn: string;
  periodZh: string;
  summaryEn: string;
  summaryZh: string;
};

export const PURCHASABLE_PLANS: Record<PurchasablePlanId, PurchasablePlan> = {
  PRO: {
    id: "PRO",
    priceCents: 9900,
    durationMonths: 12,
    durationDays: 365,
    nameEn: "Pro",
    nameZh: "专业版",
    periodEn: "12 months (1 admission cycle)",
    periodZh: "12 个月（一个申请季）",
    summaryEn: "Unlimited attempts on all mock papers, timed official sittings, and adaptive study plan.",
    summaryZh: "全部模拟卷不限次作答、官方真题计时作答与自适应学习计划。",
  },
  LIFETIME: {
    id: "LIFETIME",
    priceCents: 19900,
    durationMonths: 0,
    durationDays: 0,
    nameEn: "Lifetime",
    nameZh: "终身版",
    periodEn: "One-time · never expires",
    periodZh: "一次购买 · 永久有效",
    summaryEn: "Full Pro access across every future intake and update, with no expiry.",
    summaryZh: "包含专业版全部功能及未来所有考季更新，永久有效。",
  },
};

export const PURCHASABLE_PLAN_LIST: PurchasablePlan[] = [
  PURCHASABLE_PLANS.PRO,
  PURCHASABLE_PLANS.LIFETIME,
];

export function parsePurchasablePlan(value: unknown): PurchasablePlanId | null {
  const normalized = String(value ?? "").trim().toUpperCase();
  if (normalized === "PRO") return "PRO";
  if (normalized === "LIFETIME") return "LIFETIME";
  return null;
}

export function formatCny(cents: number): string {
  const safe = Math.max(0, Math.round(cents));
  if (safe % 100 === 0) return `¥${safe / 100}`;
  return `¥${(safe / 100).toFixed(2)}`;
}

export function formatCnyFixed(cents: number): string {
  return `¥${(Math.max(0, Math.round(cents)) / 100).toFixed(2)}`;
}

export type OrderPricingBreakdown = {
  baseAmountCents: number;
  discountCents: number;
  subtotalCents: number;
  handlingFeeCents: number;
  totalAmountCents: number;
};

/**
 * Compute checkout amounts in integer fen/cents using Xboard's fee formula:
 * `round((subtotal * (feePercent / 100)) + feeFixedCents)`.
 */
export function computeOrderPricing(input: {
  baseAmountCents: number;
  discountPercent?: number;
  feePercent?: number;
  feeFixedCents?: number;
}): OrderPricingBreakdown {
  const baseAmountCents = Math.max(0, Math.round(input.baseAmountCents));
  const discountPercent = Math.min(100, Math.max(0, Math.round(input.discountPercent ?? 0)));
  const feePercent = Math.min(100, Math.max(0, Number(input.feePercent ?? 0) || 0));
  const feeFixedCents = Math.max(0, Math.round(input.feeFixedCents ?? 0));

  const discountCents =
    discountPercent > 0
      ? Math.min(baseAmountCents, Math.floor((baseAmountCents * discountPercent) / 100))
      : 0;
  const subtotalCents = Math.max(0, baseAmountCents - discountCents);
  const handlingFeeCents =
    subtotalCents > 0 ? Math.round(subtotalCents * (feePercent / 100) + feeFixedCents) : 0;
  const totalAmountCents = subtotalCents + handlingFeeCents;

  return {
    baseAmountCents,
    discountCents,
    subtotalCents,
    handlingFeeCents,
    totalAmountCents,
  };
}
