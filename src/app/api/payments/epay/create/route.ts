import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { parsePurchasablePlan } from "@/lib/plans";
import {
  buildEpayCheckoutUrl,
  buildNotifyUrl,
  calculateCheckoutQuote,
  fulfillPaidOrder,
  generateTradeNo,
  getAvailablePaymentMethods,
  getPublicOrigin,
} from "@/lib/payments/epay";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.status !== "APPROVED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400, headers: NO_STORE });
  }

  const zh = body.lang === "zh";
  const L = (en: string, cn: string) => (zh ? cn : en);

  const limited = await rateLimit(`epay:create:${user.id}`, 15, 15 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      {
        error: L(
          "Too many checkout requests — please wait a few minutes and try again.",
          "创建订单过于频繁，请稍后再试。",
        ),
      },
      { status: 429, headers: NO_STORE },
    );
  }

  const planId = parsePurchasablePlan(body.planId);
  if (!planId) {
    return NextResponse.json(
      { error: L("Select a valid plan.", "请选择有效的方案。") },
      { status: 400, headers: NO_STORE },
    );
  }

  const access = await getAccess(user.id);
  if (access.plan === "LIFETIME") {
    return NextResponse.json(
      { error: L("You already have lifetime access.", "你已拥有终身版权限。") },
      { status: 400, headers: NO_STORE },
    );
  }

  const requestedMethodId =
    typeof body.paymentMethodId === "string" ? body.paymentMethodId.trim() : "";
  const couponCode = typeof body.couponCode === "string" ? body.couponCode.trim() : "";

  let paymentMethodId: string | null = requestedMethodId || null;
  if (!paymentMethodId) {
    const methods = await getAvailablePaymentMethods();
    paymentMethodId = methods[0]?.id ?? null;
  }

  const quote = await calculateCheckoutQuote({
    planId,
    userId: user.id,
    paymentMethodId,
    couponCode: couponCode || null,
    zh,
  });

  if (couponCode && quote.couponError) {
    return NextResponse.json({ error: quote.couponError }, { status: 400, headers: NO_STORE });
  }

  const tradeNo = generateTradeNo();

  // 100% discount coupon: fulfill directly without calling external gateway.
  if (quote.pricing.totalAmountCents <= 0) {
    await prisma.order.create({
      data: {
        tradeNo,
        userId: user.id,
        plan: quote.plan.id,
        durationMonths: quote.plan.durationMonths,
        baseAmountCents: quote.pricing.baseAmountCents,
        discountCents: quote.pricing.discountCents,
        handlingFeeCents: 0,
        totalAmountCents: 0,
        currency: "CNY",
        status: "PENDING",
        gateway: "COUPON",
        couponId: quote.coupon?.id ?? null,
        couponCode: quote.coupon?.code ?? null,
      },
    });

    const fulfilled = await fulfillPaidOrder({
      tradeNo,
      callbackNo: `COUPON-${quote.coupon?.code ?? tradeNo}`,
      paidMoneyCents: 0,
    });
    if (!fulfilled.ok) {
      return NextResponse.json(
        { error: L("Could not activate order.", "订单开通失败，请重试。") },
        { status: 500, headers: NO_STORE },
      );
    }

    return NextResponse.json(
      {
        immediate: true,
        tradeNo,
        totalAmountCents: 0,
      },
      { headers: NO_STORE },
    );
  }

  if (!quote.method) {
    return NextResponse.json(
      {
        error: L(
          "No online payment gateway is currently available. Please use a code or request activation below.",
          "当前暂无可用的在线支付通道，请使用兑换码或下方申请开通。",
        ),
      },
      { status: 400, headers: NO_STORE },
    );
  }

  const appOrigin = await getPublicOrigin(request);
  const notifyUrl = buildNotifyUrl(appOrigin, quote.method);
  const returnUrl = `${appOrigin}/api/payments/epay/return/${encodeURIComponent(tradeNo)}`;
  const orderName = `CSCA-Master-${quote.plan.id}-${tradeNo.slice(-6)}`;

  const payUrl = buildEpayCheckoutUrl(quote.method, {
    tradeNo,
    totalAmountCents: quote.pricing.totalAmountCents,
    name: orderName,
    notifyUrl,
    returnUrl,
  });

  await prisma.order.create({
    data: {
      tradeNo,
      userId: user.id,
      plan: quote.plan.id,
      durationMonths: quote.plan.durationMonths,
      baseAmountCents: quote.pricing.baseAmountCents,
      discountCents: quote.pricing.discountCents,
      handlingFeeCents: quote.pricing.handlingFeeCents,
      totalAmountCents: quote.pricing.totalAmountCents,
      currency: "CNY",
      status: "PENDING",
      gateway: "EPAY",
      paymentMethodId: quote.method.source === "db" ? quote.method.id : null,
      paymentMethodName: quote.method.name,
      paymentType: quote.method.paymentType,
      couponId: quote.coupon?.id ?? null,
      couponCode: quote.coupon?.code ?? null,
      payUrl,
    },
  });

  return NextResponse.json(
    {
      immediate: false,
      tradeNo,
      payUrl,
      totalAmountCents: quote.pricing.totalAmountCents,
    },
    { headers: NO_STORE },
  );
}
