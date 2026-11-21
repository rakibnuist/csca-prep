import { NextResponse } from "next/server";
import { getProPlanConfig, getPublicPaymentMethods } from "@/lib/payments/epay";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const [proPlan, methods] = await Promise.all([
    getProPlanConfig(),
    getPublicPaymentMethods(),
  ]);
  return NextResponse.json(
    {
      plans: [proPlan],
      methods,
    },
    { headers: NO_STORE },
  );
}
