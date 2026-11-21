import type { NextRequest } from "next/server";
import { handleEpayNotifyRequest } from "@/lib/payments/epay-http";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return handleEpayNotifyRequest(request);
}

export async function POST(request: NextRequest) {
  return handleEpayNotifyRequest(request);
}
