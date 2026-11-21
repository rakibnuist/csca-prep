import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  buildNotifyUrl,
  getEnvEpayMethod,
  getProPlanConfig,
  getPublicOrigin,
  maskSecret,
} from "@/lib/payments/epay";
import {
  PaymentsManager,
  type AdminOrderRow,
  type AdminPaymentMethodRow,
  type EnvFallbackPreview,
} from "@/components/admin/payments-manager";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  await requireAdmin();

  const [origin, proPlan, dbMethods, recentOrders, paidAgg, pendingCount] = await Promise.all([
    getPublicOrigin(),
    getProPlanConfig(),
    prisma.paymentMethod.findMany({
      orderBy: [{ sort: "asc" }, { createdAt: "asc" }],
      include: {
        _count: { select: { orders: true } },
      },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.order.aggregate({
      where: { status: "PAID" },
      _count: { _all: true },
      _sum: { totalAmountCents: true },
    }),
    prisma.order.count({ where: { status: "PENDING" } }),
  ]);

  const methodRows: AdminPaymentMethodRow[] = dbMethods.map((m) => ({
    id: m.id,
    uuid: m.uuid,
    name: m.name,
    gateway: m.gateway,
    icon: m.icon,
    notifyDomain: m.notifyDomain,
    notifyUrl: buildNotifyUrl(origin, m),
    feePercent: m.feePercent,
    feeFixedCents: m.feeFixedCents,
    enable: m.enable,
    sort: m.sort,
    gatewayUrl: m.gatewayUrl,
    merchantId: m.merchantId,
    secretPreview: maskSecret(m.secretKey),
    paymentType: m.paymentType,
    orderCount: m._count.orders,
  }));

  const orderRows: AdminOrderRow[] = recentOrders.map((o) => ({
    id: o.id,
    tradeNo: o.tradeNo,
    userId: o.user.id,
    userName: o.user.name ?? o.user.email,
    userEmail: o.user.email,
    plan: o.plan,
    baseAmountCents: o.baseAmountCents,
    discountCents: o.discountCents,
    handlingFeeCents: o.handlingFeeCents,
    totalAmountCents: o.totalAmountCents,
    status: o.status,
    gateway: o.gateway,
    paymentMethodName: o.paymentMethodName,
    paymentType: o.paymentType,
    couponCode: o.couponCode,
    callbackNo: o.callbackNo,
    paidAt: o.paidAt ? o.paidAt.toISOString() : null,
    createdAt: o.createdAt.toISOString(),
  }));

  const envMethod = getEnvEpayMethod();
  const envFallback: EnvFallbackPreview = envMethod
    ? {
        name: envMethod.name,
        gatewayUrl: envMethod.gatewayUrl,
        merchantId: envMethod.merchantId,
        secretPreview: maskSecret(envMethod.secretKey),
        paymentType: envMethod.paymentType,
        notifyUrl: buildNotifyUrl(origin, envMethod),
      }
    : null;

  const activeMethods =
    dbMethods.length > 0
      ? dbMethods.filter((m) => m.enable).length
      : envFallback
        ? 1
        : 0;

  return (
    <div className="space-y-7">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.18em] text-vermillion uppercase">
          Checkout &amp; Revenue
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
          Payment Gateways (EPay) &amp; Orders
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Configure Xboard-compatible EPay gateways (Alipay, WeChat Pay, QQ Pay), Pro plan checkout
          pricing, notify domains, fees, and monitor live Pro checkout orders.
        </p>
      </div>

      <PaymentsManager
        methods={methodRows}
        orders={orderRows}
        stats={{
          activeMethods,
          paidCount: paidAgg._count._all,
          pendingCount,
          totalRevenueCents: paidAgg._sum.totalAmountCents ?? 0,
        }}
        billingConfig={{
          proPriceCents: proPlan.priceCents,
          proDurationMonths: proPlan.durationMonths,
        }}
        envFallback={envFallback}
        defaultOrigin={origin}
      />
    </div>
  );
}
