import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ tradeNo: string }> },
) {
  const user = await getCurrentUser();
  if (!user || user.status !== "APPROVED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }

  const { tradeNo } = await params;
  const order = await prisma.order.findUnique({
    where: { tradeNo: tradeNo.trim() },
    select: {
      tradeNo: true,
      userId: true,
      plan: true,
      status: true,
      totalAmountCents: true,
      paymentMethodName: true,
      paidAt: true,
      createdAt: true,
    },
  });

  if (!order || (order.userId !== user.id && user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Order not found" }, { status: 404, headers: NO_STORE });
  }

  return NextResponse.json(
    {
      order: {
        tradeNo: order.tradeNo,
        plan: order.plan,
        status: order.status,
        totalAmountCents: order.totalAmountCents,
        paymentMethodName: order.paymentMethodName,
        paidAt: order.paidAt?.toISOString() ?? null,
        createdAt: order.createdAt.toISOString(),
      },
    },
    { headers: NO_STORE },
  );
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ tradeNo: string }> },
) {
  const user = await getCurrentUser();
  if (!user || user.status !== "APPROVED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }

  const { tradeNo } = await params;
  const updated = await prisma.order.updateMany({
    where: {
      tradeNo: tradeNo.trim(),
      userId: user.id,
      status: "PENDING",
    },
    data: { status: "CANCELLED" },
  });

  if (updated.count === 0) {
    return NextResponse.json(
      { error: "Pending order not found." },
      { status: 404, headers: NO_STORE },
    );
  }

  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
