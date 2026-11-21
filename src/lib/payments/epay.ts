import "server-only";

import crypto from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { SITE } from "@/lib/site";
import { revalidateTrackPath } from "@/lib/section";
import {
  PURCHASABLE_PLANS,
  computeOrderPricing,
  type PurchasablePlanId,
} from "@/lib/plans";

export type PublicPaymentMethod = {
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

export type ResolvedPaymentMethod = PublicPaymentMethod & {
  enable: boolean;
  sort: number;
  notifyDomain: string | null;
  gatewayUrl: string;
  merchantId: string;
  secretKey: string;
};

export function isValidHttpUrl(raw: string): boolean {
  try {
    const parsed = new URL(raw.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function normalizeBaseUrl(raw: string): string {
  return raw.trim().replace(/\/+$/, "");
}

export function maskSecret(secret: string): string {
  const s = secret.trim();
  if (!s) return "";
  if (s.length <= 8) return "••••••••";
  return `${s.slice(0, 4)}••••${s.slice(-4)}`;
}

export function generateMethodUuid(): string {
  return crypto.randomBytes(6).toString("hex");
}

export function generateTradeNo(): string {
  const now = new Date();
  const stamp = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
    String(now.getUTCHours()).padStart(2, "0"),
    String(now.getUTCMinutes()).padStart(2, "0"),
    String(now.getUTCSeconds()).padStart(2, "0"),
  ].join("");
  const rand = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `CSCA${stamp}${rand}`;
}

/** Resolve the public origin for notify_url / return_url behind Traefik or locally. */
export async function getPublicOrigin(request?: Request): Promise<string> {
  const fallback = normalizeBaseUrl(process.env.NEXT_PUBLIC_APP_URL ?? SITE.url);
  try {
    const h = request ? request.headers : await headers();
    const forwardedHost = h.get("x-forwarded-host")?.split(",")[0]?.trim();
    const forwardedProto = h.get("x-forwarded-proto")?.split(",")[0]?.trim();
    if (forwardedHost && !forwardedHost.startsWith("0.0.0.0")) {
      const proto = forwardedProto || (forwardedHost.startsWith("localhost") || forwardedHost.startsWith("127.0.0.1") ? "http" : "https");
      return `${proto}://${forwardedHost}`;
    }
    const host = h.get("host")?.split(",")[0]?.trim();
    if (host && !host.startsWith("0.0.0.0")) {
      const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
      const proto = forwardedProto || (isLocal ? "http" : "https");
      return `${proto}://${host}`;
    }
  } catch {
    // headers() unavailable outside a request context — use fallback
  }
  return fallback;
}

export function buildNotifyUrl(
  appOrigin: string,
  method: { uuid: string; notifyDomain: string | null },
): string {
  const base =
    method.notifyDomain && isValidHttpUrl(method.notifyDomain)
      ? normalizeBaseUrl(method.notifyDomain)
      : normalizeBaseUrl(appOrigin);
  return `${base}/api/payments/epay/notify/${encodeURIComponent(method.uuid)}`;
}

export function getEnvEpayMethod(): ResolvedPaymentMethod | null {
  const gatewayUrl = (process.env.EPAY_URL ?? "").trim();
  const merchantId = (process.env.EPAY_PID ?? "").trim();
  const secretKey = (process.env.EPAY_KEY ?? "").trim();
  if (!gatewayUrl || !merchantId || !secretKey || !isValidHttpUrl(gatewayUrl)) {
    return null;
  }

  const feePercentRaw = Number(process.env.EPAY_FEE_PERCENT ?? "0");
  const feeFixedRaw = Number(process.env.EPAY_FEE_FIXED_CENTS ?? "0");
  const notifyDomainRaw = (process.env.EPAY_NOTIFY_DOMAIN ?? "").trim();
  const iconRaw = (process.env.EPAY_ICON ?? "").trim();

  return {
    id: "env-epay",
    uuid: "env",
    name: (process.env.EPAY_NAME ?? "").trim() || "支付宝 Pay",
    gateway: "EPAY",
    icon: iconRaw && isValidHttpUrl(iconRaw) ? iconRaw : null,
    notifyDomain: notifyDomainRaw && isValidHttpUrl(notifyDomainRaw) ? normalizeBaseUrl(notifyDomainRaw) : null,
    feePercent: Number.isFinite(feePercentRaw) ? Math.min(100, Math.max(0, feePercentRaw)) : 0,
    feeFixedCents: Number.isFinite(feeFixedRaw) ? Math.max(0, Math.round(feeFixedRaw)) : 0,
    enable: true,
    sort: 0,
    gatewayUrl: normalizeBaseUrl(gatewayUrl),
    merchantId,
    secretKey,
    paymentType: (process.env.EPAY_TYPE ?? "").trim() || null,
    source: "env",
  };
}

function mapDbMethod(row: {
  id: string;
  uuid: string;
  name: string;
  gateway: string;
  icon: string | null;
  notifyDomain: string | null;
  feePercent: number;
  feeFixedCents: number;
  enable: boolean;
  sort: number;
  gatewayUrl: string;
  merchantId: string;
  secretKey: string;
  paymentType: string | null;
}): ResolvedPaymentMethod {
  return {
    ...row,
    gatewayUrl: normalizeBaseUrl(row.gatewayUrl),
    notifyDomain: row.notifyDomain ? normalizeBaseUrl(row.notifyDomain) : null,
    source: "db",
  };
}

export function toPublicPaymentMethod(method: ResolvedPaymentMethod): PublicPaymentMethod {
  return {
    id: method.id,
    uuid: method.uuid,
    name: method.name,
    gateway: method.gateway,
    icon: method.icon,
    feePercent: method.feePercent,
    feeFixedCents: method.feeFixedCents,
    paymentType: method.paymentType,
    source: method.source,
  };
}

/**
 * Resolve all currently enabled payment methods.
 *
 * Once any PaymentMethod row exists in Postgres, DB configuration is authoritative
 * (so pausing every DB method pauses checkout rather than silently falling back).
 * When the table has zero rows, `.env` EPAY_* vars act as a zero-config fallback.
 */
export async function getAvailablePaymentMethods(): Promise<ResolvedPaymentMethod[]> {
  const totalCount = await prisma.paymentMethod.count();
  if (totalCount > 0) {
    const rows = await prisma.paymentMethod.findMany({
      where: { enable: true },
      orderBy: [{ sort: "asc" }, { createdAt: "asc" }],
    });
    return rows.map(mapDbMethod);
  }

  const envMethod = getEnvEpayMethod();
  return envMethod ? [envMethod] : [];
}

export async function getPublicPaymentMethods(): Promise<PublicPaymentMethod[]> {
  const methods = await getAvailablePaymentMethods();
  return methods.map(toPublicPaymentMethod);
}

export async function resolveEnabledPaymentMethodById(
  id: string,
): Promise<ResolvedPaymentMethod | null> {
  if (id === "env-epay") {
    const totalCount = await prisma.paymentMethod.count();
    if (totalCount > 0) return null;
    return getEnvEpayMethod();
  }
  const row = await prisma.paymentMethod.findUnique({ where: { id } });
  if (!row || !row.enable) return null;
  return mapDbMethod(row);
}

export async function resolvePaymentMethodByUuid(
  uuid: string,
): Promise<ResolvedPaymentMethod | null> {
  if (uuid === "env") {
    return getEnvEpayMethod();
  }
  const row = await prisma.paymentMethod.findUnique({ where: { uuid } });
  return row ? mapDbMethod(row) : null;
}

/* ── Xboard EPay signature & protocol (plugins-core/Epay/Plugin.php) ─── */

export function formatEpayMoney(cents: number): string {
  return Number((Math.max(0, Math.round(cents)) / 100).toFixed(2)).toString();
}

export function buildEpaySign(
  params: Record<string, string | number | null | undefined>,
  secretKey: string,
): string {
  const keys = Object.keys(params)
    .filter((key) => {
      if (key === "sign" || key === "sign_type") return false;
      const val = params[key];
      if (val === null || val === undefined) return false;
      return String(val) !== "";
    })
    .sort();

  const query = keys.map((key) => `${key}=${String(params[key])}`).join("&");
  return crypto.createHash("md5").update(`${query}${secretKey}`, "utf8").digest("hex");
}

export function buildEpayCheckoutUrl(
  method: Pick<ResolvedPaymentMethod, "gatewayUrl" | "merchantId" | "secretKey" | "paymentType">,
  order: {
    tradeNo: string;
    totalAmountCents: number;
    name: string;
    notifyUrl: string;
    returnUrl: string;
  },
): string {
  const params: Record<string, string> = {
    money: formatEpayMoney(order.totalAmountCents),
    name: order.name,
    notify_url: order.notifyUrl,
    out_trade_no: order.tradeNo,
    pid: method.merchantId.trim(),
    return_url: order.returnUrl,
  };

  if (method.paymentType && method.paymentType.trim()) {
    params.type = method.paymentType.trim();
  }

  const sign = buildEpaySign(params, method.secretKey.trim());
  const search = new URLSearchParams({
    ...params,
    sign,
    sign_type: "MD5",
  });

  return `${normalizeBaseUrl(method.gatewayUrl)}/submit.php?${search.toString()}`;
}

export type EpayVerifyResult =
  | {
      ok: true;
      tradeNo: string;
      callbackNo: string;
      paidMoneyCents: number | null;
    }
  | {
      ok: false;
      reason: string;
    };

export function verifyEpayCallback(
  method: Pick<ResolvedPaymentMethod, "merchantId" | "secretKey">,
  rawParams: Record<string, unknown>,
): EpayVerifyResult {
  const secret = method.secretKey.trim();
  const pidConfig = method.merchantId.trim();
  if (!secret || !pidConfig) {
    return { ok: false, reason: "gateway_not_configured" };
  }

  const flat: Record<string, string> = {};
  for (const [k, v] of Object.entries(rawParams)) {
    if (v === undefined || v === null) continue;
    if (typeof v !== "string" && typeof v !== "number") {
      return { ok: false, reason: "invalid_param_type" };
    }
    flat[k] = String(v);
  }

  const sign = (flat.sign ?? "").trim().toLowerCase();
  const outTradeNo = (flat.out_trade_no ?? "").trim();
  const tradeNo = (flat.trade_no ?? "").trim();
  const pid = (flat.pid ?? "").trim();
  const tradeStatus = (flat.trade_status ?? "").trim();
  const signType = (flat.sign_type ?? "MD5").trim().toUpperCase();

  if (!/^[a-f0-9]{32}$/.test(sign) || !outTradeNo || !tradeNo) {
    return { ok: false, reason: "missing_required_fields" };
  }
  if (pid !== pidConfig) {
    return { ok: false, reason: "merchant_id_mismatch" };
  }
  if (tradeStatus !== "TRADE_SUCCESS") {
    return { ok: false, reason: "trade_not_success" };
  }
  if (signType !== "MD5") {
    return { ok: false, reason: "unsupported_sign_type" };
  }

  const expected = buildEpaySign(flat, secret).toLowerCase();
  const expectedBuf = Buffer.from(expected, "utf8");
  const actualBuf = Buffer.from(sign, "utf8");
  if (expectedBuf.length !== actualBuf.length || !crypto.timingSafeEqual(expectedBuf, actualBuf)) {
    return { ok: false, reason: "signature_mismatch" };
  }

  let paidMoneyCents: number | null = null;
  if (flat.money !== undefined && flat.money.trim() !== "") {
    const parsedMoney = Number(flat.money);
    if (!Number.isFinite(parsedMoney) || parsedMoney < 0) {
      return { ok: false, reason: "invalid_money" };
    }
    paidMoneyCents = Math.round(parsedMoney * 100);
  }

  return {
    ok: true,
    tradeNo: outTradeNo,
    callbackNo: tradeNo,
    paidMoneyCents,
  };
}

/* ── Coupons & order fulfillment ───────────────────────────────────────── */

export type DiscountCouponCheck =
  | {
      ok: true;
      coupon: { id: string; code: string; percent: number };
    }
  | {
      ok: false;
      error: string;
    };

export async function validateCheckoutCoupon(
  rawCode: string,
  userId: string,
  zh = false,
): Promise<DiscountCouponCheck> {
  const L = (en: string, cn: string) => (zh ? cn : en);
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return { ok: false, error: L("Enter a coupon code.", "请输入优惠码。") };
  }
  if (code.length > 64) {
    return { ok: false, error: L("That coupon is not valid.", "该优惠码无效。") };
  }

  const coupon = await prisma.coupon.findUnique({ where: { code } });
  if (!coupon || !coupon.active) {
    return { ok: false, error: L("That coupon is not valid.", "该优惠码无效。") };
  }
  if (coupon.expiresAt && coupon.expiresAt.getTime() <= Date.now()) {
    return { ok: false, error: L("That coupon has expired.", "该优惠码已过期。") };
  }
  if (coupon.usedCount >= coupon.maxUses) {
    return { ok: false, error: L("That coupon has been fully used.", "该优惠码已达到使用上限。") };
  }
  if (coupon.kind !== "PERCENT") {
    return {
      ok: false,
      error: L(
        "This is an activation code — redeem it directly in the \"Redeem your Pro code\" box.",
        "这是开通兑换码，请在「输入专业版兑换码」区域直接兑换。",
      ),
    };
  }
  const already = await prisma.redemption.findUnique({
    where: { couponId_userId: { couponId: coupon.id, userId } },
  });
  if (already) {
    return { ok: false, error: L("You already used this coupon.", "你已经使用过该优惠码。") };
  }

  return {
    ok: true,
    coupon: {
      id: coupon.id,
      code: coupon.code,
      percent: Math.min(100, Math.max(1, coupon.value)),
    },
  };
}

export async function calculateCheckoutQuote(input: {
  planId: PurchasablePlanId;
  userId: string;
  paymentMethodId?: string | null;
  couponCode?: string | null;
  zh?: boolean;
}) {
  const plan = PURCHASABLE_PLANS[input.planId];
  let coupon: { id: string; code: string; percent: number } | null = null;
  let couponError: string | null = null;

  if (input.couponCode && input.couponCode.trim()) {
    const check = await validateCheckoutCoupon(input.couponCode, input.userId, input.zh);
    if (check.ok) {
      coupon = check.coupon;
    } else {
      couponError = check.error;
    }
  }

  let method: ResolvedPaymentMethod | null = null;
  if (input.paymentMethodId) {
    method = await resolveEnabledPaymentMethodById(input.paymentMethodId);
  }

  const pricing = computeOrderPricing({
    baseAmountCents: plan.priceCents,
    discountPercent: coupon?.percent ?? 0,
    feePercent: method?.feePercent ?? 0,
    feeFixedCents: method?.feeFixedCents ?? 0,
  });

  return {
    plan,
    coupon,
    couponError,
    method,
    pricing,
  };
}

function safeRevalidateOrderPaths(userId: string) {
  try {
    revalidateTrackPath("/billing");
    revalidateTrackPath("/dashboard");
    revalidateTrackPath("/mocks", "layout");
    revalidateTrackPath("/official", "layout");
    revalidateTrackPath("/practice", "layout");
    revalidateTrackPath("/results", "layout");
    revalidateTrackPath("/plan", "layout");
    revalidatePath("/admin");
    revalidatePath("/admin/payments");
    revalidatePath("/admin/students");
    revalidatePath(`/admin/students/${userId}`);
    revalidatePath("/admin/coupons");
  } catch {
    // Ignore when invoked outside a Next.js request context
  }
}

export type FulfillOrderResult =
  | { ok: true; alreadyPaid: boolean; orderId: string; userId: string }
  | { ok: false; reason: string };

/**
 * Atomically mark an order PAID and upgrade the student's plan inside a single
 * Postgres transaction. Safe under concurrent notify + return callbacks.
 */
export async function fulfillPaidOrder(input: {
  tradeNo: string;
  callbackNo: string;
  paidMoneyCents?: number | null;
  notifyPayload?: Record<string, string>;
}): Promise<FulfillOrderResult> {
  const result = await prisma.$transaction(async (tx): Promise<FulfillOrderResult> => {
    const order = await tx.order.findUnique({ where: { tradeNo: input.tradeNo } });
    if (!order) {
      return { ok: false, reason: "order_not_found" };
    }
    if (order.status === "PAID") {
      return { ok: true, alreadyPaid: true, orderId: order.id, userId: order.userId };
    }
    if (order.status !== "PENDING") {
      return { ok: false, reason: `invalid_order_status_${order.status.toLowerCase()}` };
    }

    if (
      input.paidMoneyCents !== undefined &&
      input.paidMoneyCents !== null &&
      Math.abs(input.paidMoneyCents - order.totalAmountCents) > 1
    ) {
      return { ok: false, reason: "amount_mismatch" };
    }

    const now = new Date();
    const claimed = await tx.order.updateMany({
      where: { id: order.id, status: "PENDING" },
      data: {
        status: "PAID",
        callbackNo: input.callbackNo,
        paidAt: now,
        notifyPayload: (input.notifyPayload ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });
    if (claimed.count === 0) {
      return { ok: true, alreadyPaid: true, orderId: order.id, userId: order.userId };
    }

    const user = await tx.user.findUnique({
      where: { id: order.userId },
      select: { id: true, plan: true, proExpiresAt: true },
    });
    if (!user) {
      return { ok: false, reason: "user_not_found" };
    }

    let nextPlan = user.plan;
    let nextExpiry = user.proExpiresAt;

    if (order.plan === "LIFETIME" || user.plan === "LIFETIME") {
      nextPlan = "LIFETIME";
      nextExpiry = null;
    } else {
      nextPlan = "PRO";
      const baseDate =
        user.plan === "PRO" && user.proExpiresAt && user.proExpiresAt.getTime() > now.getTime()
          ? user.proExpiresAt
          : now;
      const days =
        order.durationMonths === 12
          ? PURCHASABLE_PLANS.PRO.durationDays
          : Math.max(1, order.durationMonths) * 30;
      nextExpiry = new Date(baseDate.getTime() + days * 86_400_000);
    }

    await tx.user.update({
      where: { id: user.id },
      data: { plan: nextPlan, proExpiresAt: nextExpiry },
    });

    if (order.couponId) {
      const existingRedemption = await tx.redemption.findUnique({
        where: { couponId_userId: { couponId: order.couponId, userId: user.id } },
      });
      if (!existingRedemption) {
        const freshCoupon = await tx.coupon.findUnique({
          where: { id: order.couponId },
          select: { id: true, maxUses: true },
        });
        if (freshCoupon) {
          await tx.coupon.updateMany({
            where: { id: freshCoupon.id, usedCount: { lt: freshCoupon.maxUses } },
            data: { usedCount: { increment: 1 } },
          });
          await tx.redemption
            .create({
              data: { couponId: freshCoupon.id, userId: user.id },
            })
            .catch((err) => {
              if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
                return;
              }
              throw err;
            });
        }
      }
    }

    return { ok: true, alreadyPaid: false, orderId: order.id, userId: order.userId };
  });

  if (result.ok && !result.alreadyPaid) {
    safeRevalidateOrderPaths(result.userId);
  }
  return result;
}
