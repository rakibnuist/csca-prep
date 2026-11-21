import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { parsePurchasablePlan } from "@/lib/plans";
import {
  calculateCheckoutQuote,
  getAvailablePaymentMethods,
  toPublicPaymentMethod,
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
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400, headers: NO_STORE });
  }

  const planId = parsePurchasablePlan(body.planId);
  if (!planId) {
    return NextResponse.json({ error: "Invalid plan selection." }, { status: 400, headers: NO_STORE });
  }

  const zh = body.lang === "zh";
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

  return NextResponse.json(
    {
      plan: quote.plan,
      pricing: quote.pricing,
      coupon: quote.coupon,
      couponError: quote.couponError,
      method: quote.method ? toPublicPaymentMethod(quote.method) : null,
    },
    { headers: NO_STORE },
  );
}
