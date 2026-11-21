import { NextResponse } from "next/server";
import { getPublicPaymentMethods } from "@/lib/payments/epay";
import { PURCHASABLE_PLAN_LIST } from "@/lib/plans";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const methods = await getPublicPaymentMethods();
  return NextResponse.json(
    {
      plans: PURCHASABLE_PLAN_LIST,
      methods,
    },
    { headers: NO_STORE },
  );
}
