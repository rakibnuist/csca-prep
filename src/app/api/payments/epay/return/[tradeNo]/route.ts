import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import {
  fulfillPaidOrder,
  getEnvEpayMethod,
  getPublicOrigin,
  verifyEpayCallback,
} from "@/lib/payments/epay";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tradeNo: string }> },
) {
  const { tradeNo } = await params;
  const cleanTradeNo = tradeNo.trim();
  const appOrigin = await getPublicOrigin(request);

  const [order, currentUser] = await Promise.all([
    prisma.order.findUnique({
      where: { tradeNo: cleanTradeNo },
      include: {
        paymentMethod: true,
        user: { select: { teachingTrack: true } },
      },
    }),
    getCurrentUser(),
  ]);

  // If EPay appended signed callback parameters on return_url, verify and fulfill
  // idempotently so instant feedback works even before the async webhook arrives.
  const rawParams: Record<string, unknown> = {};
  for (const [k, v] of request.nextUrl.searchParams.entries()) {
    rawParams[k] = v;
  }

  if (order && order.status === "PENDING" && typeof rawParams.sign === "string") {
    const outTradeNo =
      typeof rawParams.out_trade_no === "string" ? rawParams.out_trade_no.trim() : "";
    if (!outTradeNo || outTradeNo === order.tradeNo) {
      const method = order.paymentMethod
        ? order.paymentMethod
        : order.paymentMethodId === null
          ? getEnvEpayMethod()
          : null;

      if (method && method.enable) {
        const verified = verifyEpayCallback(method, rawParams);
        if (verified.ok && verified.tradeNo === order.tradeNo) {
          const cleanPayload: Record<string, string> = {};
          for (const [k, v] of Object.entries(rawParams)) {
            if (k !== "sign" && typeof v === "string") {
              cleanPayload[k] = v.slice(0, 500);
            }
          }
          await fulfillPaidOrder({
            tradeNo: verified.tradeNo,
            callbackNo: verified.callbackNo,
            paidMoneyCents: verified.paidMoneyCents,
            notifyPayload: cleanPayload,
          });
        }
      }
    }
  }

  const track = order?.user.teachingTrack ?? currentUser?.teachingTrack ?? "EN";
  const trackSlug = track === "CN" ? "cn" : "en";
  const dest = new URL(`/${trackSlug}/billing`, appOrigin);
  dest.searchParams.set("order", cleanTradeNo);

  return NextResponse.redirect(dest, {
    status: 302,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
