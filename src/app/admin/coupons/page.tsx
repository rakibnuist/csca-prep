import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { CouponsManager, type CouponRow } from "@/components/admin/coupons-manager";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  await requireAdmin();
  const now = new Date();

  const [coupons, totalRedemptions] = await Promise.all([
    prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        redemptions: {
          orderBy: { createdAt: "desc" },
          take: 5,
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    }),
    prisma.redemption.count(),
  ]);

  const rows: CouponRow[] = coupons.map((coupon) => ({
    id: coupon.id,
    code: coupon.code,
    kind: coupon.kind,
    value: coupon.value,
    maxUses: coupon.maxUses,
    usedCount: coupon.usedCount,
    active: coupon.active,
    expired: coupon.expiresAt ? coupon.expiresAt < now : false,
    expiresAt: coupon.expiresAt ? coupon.expiresAt.toISOString() : null,
    note: coupon.note,
    createdAt: coupon.createdAt.toISOString(),
    recentRedemptions: coupon.redemptions.map((r) => ({
      id: r.id,
      userId: r.user.id,
      userName: r.user.name ?? r.user.email,
      userEmail: r.user.email,
      createdAt: r.createdAt.toISOString(),
    })),
  }));

  return (
    <div className="space-y-7">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.18em] text-vermillion uppercase">
          Promotions &amp; Scholarships
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
          Coupons &amp; Redemptions
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Create Pro-month grants, Lifetime partner vouchers, and percentage promo codes with live usage tracking.
        </p>
      </div>

      <CouponsManager coupons={rows} totalRedemptions={totalRedemptions} />
    </div>
  );
}
