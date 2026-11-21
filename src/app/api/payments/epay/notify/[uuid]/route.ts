import type { NextRequest } from "next/server";
import { handleEpayNotifyRequest } from "@/lib/payments/epay-http";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  return handleEpayNotifyRequest(request, uuid);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  return handleEpayNotifyRequest(request, uuid);
}
