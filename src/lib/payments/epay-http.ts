import "server-only";

import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import {
  fulfillPaidOrder,
  getEnvEpayMethod,
  resolvePaymentMethodByUuid,
  verifyEpayCallback,
  type ResolvedPaymentMethod,
} from "@/lib/payments/epay";

const NO_STORE_TEXT = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-store, max-age=0",
};

function textResponse(body: string, status = 200) {
  return new Response(body, { status, headers: NO_STORE_TEXT });
}

export async function extractCallbackParams(
  request: NextRequest,
): Promise<Record<string, unknown>> {
  const out: Record<string, unknown> = {};

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    out[key] = value;
  }

  if (request.method === "POST") {
    const contentType = (request.headers.get("content-type") ?? "").toLowerCase();
    try {
      if (contentType.includes("application/json")) {
        const json = (await request.json()) as unknown;
        if (json && typeof json === "object" && !Array.isArray(json)) {
          Object.assign(out, json);
        }
      } else if (contentType.includes("multipart/form-data")) {
        const fd = await request.formData();
        for (const [key, value] of fd.entries()) {
          if (typeof value === "string") out[key] = value;
        }
      } else {
        const rawText = await request.text();
        if (rawText.trim()) {
          if (rawText.trim().startsWith("{")) {
            const parsed = JSON.parse(rawText) as unknown;
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
              Object.assign(out, parsed);
            }
          } else {
            const form = new URLSearchParams(rawText);
            for (const [key, value] of form.entries()) {
              out[key] = value;
            }
          }
        }
      }
    } catch {
      // Ignore malformed body if query parameters were already provided
    }
  }

  return out;
}

function sanitizeNotifyPayload(params: Record<string, unknown>): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (key === "sign") continue;
    if (typeof value === "string" || typeof value === "number") {
      clean[key] = String(value).slice(0, 500);
    }
  }
  return clean;
}

export async function handleEpayNotifyRequest(
  request: NextRequest,
  uuid?: string,
): Promise<Response> {
  const rawParams = await extractCallbackParams(request);
  const outTradeNo = typeof rawParams.out_trade_no === "string" ? rawParams.out_trade_no.trim() : "";

  let method: ResolvedPaymentMethod | null = null;
  if (uuid) {
    method = await resolvePaymentMethodByUuid(uuid);
  } else if (outTradeNo) {
    const existing = await prisma.order.findUnique({
      where: { tradeNo: outTradeNo },
      include: { paymentMethod: true },
    });
    if (existing?.paymentMethod) {
      method = {
        ...existing.paymentMethod,
        source: "db",
      };
    } else if (existing && existing.paymentMethodId === null) {
      method = getEnvEpayMethod();
    }
  } else {
    method = getEnvEpayMethod();
  }

  if (!method || !method.enable) {
    return textResponse("fail", 400);
  }

  const verified = verifyEpayCallback(method, rawParams);
  if (!verified.ok) {
    console.warn("[epay:notify] verification failed:", verified.reason);
    return textResponse("fail", 400);
  }

  const order = await prisma.order.findUnique({
    where: { tradeNo: verified.tradeNo },
    select: { id: true, paymentMethodId: true, status: true },
  });
  if (!order) {
    return textResponse("fail", 404);
  }

  // Bind callback verification strictly to the method used to create the order.
  if (method.source === "db" && order.paymentMethodId && order.paymentMethodId !== method.id) {
    return textResponse("fail", 400);
  }
  if (method.source === "env" && order.paymentMethodId !== null) {
    return textResponse("fail", 400);
  }

  const fulfilled = await fulfillPaidOrder({
    tradeNo: verified.tradeNo,
    callbackNo: verified.callbackNo,
    paidMoneyCents: verified.paidMoneyCents,
    notifyPayload: sanitizeNotifyPayload(rawParams),
  });

  if (!fulfilled.ok) {
    console.warn("[epay:notify] fulfill failed:", fulfilled.reason);
    return textResponse("fail", 400);
  }

  return textResponse("success", 200);
}
