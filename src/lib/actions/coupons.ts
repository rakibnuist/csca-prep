"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin, requireUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { rateLimit } from "@/lib/rate-limit";
import { revalidateTrackPath } from "@/lib/section";

class CouponRedeemError extends Error {}

export type CouponState = { ok?: boolean; error?: string } | null;

function normalise(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

/** Generate a short, unambiguous code. */
function makeCouponCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "CSCA-";
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

/* ── Admin ─────────────────────────────────────────────────────────────── */

const VALID_KINDS = ["PRO_MONTHS", "LIFETIME", "PERCENT"] as const;

export async function createCouponAction(
  _prev: CouponState,
  formData: FormData,
): Promise<CouponState> {
  await requireAdmin();

  const rawKind = normalise(formData.get("kind")) || "PRO_MONTHS";
  if (!VALID_KINDS.includes(rawKind as (typeof VALID_KINDS)[number])) {
    return { ok: false, error: "Unsupported coupon kind." };
  }
  const kind = rawKind;
  const valueInput = normalise(formData.get("value"));
  const maxUsesInput = normalise(formData.get("maxUses"));
  const note = normalise(formData.get("note")).slice(0, 200);
  const expiresAtInput = normalise(formData.get("expiresAt"));
  const codeInput = normalise(formData.get("code")).slice(0, 32).toUpperCase();

  const rawValue = Math.max(0, Math.floor(Number(valueInput) || 0));
  if (kind === "PRO_MONTHS" && rawValue < 1) {
    return { ok: false, error: "Pro months must be at least 1." };
  }
  if (kind === "PERCENT" && (rawValue < 1 || rawValue > 100)) {
    return { ok: false, error: "Discount percent must be between 1 and 100." };
  }
  const value = kind === "LIFETIME" ? 0 : rawValue;
  const maxUses = Math.min(100_000, Math.max(1, Math.floor(Number(maxUsesInput) || 100)));
  const code = codeInput || makeCouponCode();

  let expiresAt: Date | null = null;
  if (expiresAtInput) {
    expiresAt = /^\d{4}-\d{2}-\d{2}$/.test(expiresAtInput)
      ? new Date(`${expiresAtInput}T23:59:59.999Z`)
      : new Date(expiresAtInput);
    if (Number.isNaN(expiresAt.getTime())) {
      return { ok: false, error: "Invalid expiry date." };
    }
  }

  const existing = await prisma.coupon.findUnique({ where: { code } });
  if (existing) return { ok: false, error: `Code "${code}" already exists.` };

  await prisma.coupon.create({
    data: {
      code,
      kind,
      value,
      maxUses,
      expiresAt,
      note: note || null,
      active: true,
    },
  });

  revalidatePath("/admin/coupons");
  return { ok: true };
}

export async function toggleCouponAction(formData: FormData) {
  await requireAdmin();
  const id = normalise(formData.get("id"));
  const active = formData.get("active") === "true";
  if (!id) return;
  await prisma.coupon.update({ where: { id }, data: { active } }).catch(() => undefined);
  revalidatePath("/admin/coupons");
}

export async function deleteCouponAction(formData: FormData) {
  await requireAdmin();
  const id = normalise(formData.get("id"));
  if (!id) return;
  await prisma.coupon.delete({ where: { id } }).catch(() => undefined);
  revalidatePath("/admin/coupons");
}

/* ── Student ───────────────────────────────────────────────────────────── */

export async function redeemCouponAction(_prev: CouponState, formData: FormData) {
  const session = await requireUser();
  const zh = normalise(formData.get("lang")) === "zh";
  const L = (en: string, cn: string) => (zh ? cn : en);
  const code = normalise(formData.get("code")).toUpperCase();

  if (!code) return { error: L("Enter a coupon code.", "请输入兑换码。") };
  if (code.length > 64) return { error: L("That coupon is not valid.", "该兑换码无效。") };

  const limit = await rateLimit(`coupon:${session.id}`, 10, 15 * 60 * 1000);
  if (!limit.allowed) {
    return {
      error: L(
        "Too many attempts — wait a few minutes and try again.",
        "尝试次数过多，请稍后再试。",
      ),
    };
  }

  const coupon = await prisma.coupon.findUnique({ where: { code } });
  if (!coupon || !coupon.active) return { error: L("That coupon is not valid.", "该兑换码无效。") };
  if (coupon.expiresAt && coupon.expiresAt.getTime() < Date.now()) {
    return { error: L("That coupon has expired.", "该兑换码已过期。") };
  }
  if (coupon.usedCount >= coupon.maxUses) {
    return { error: L("That coupon has been fully used.", "该兑换码已达到使用上限。") };
  }

  const access = await getAccess(session.id);
  if (access.plan === "LIFETIME") {
    return { error: L("You already have lifetime access.", "你已拥有终身版权限。") };
  }

  const already = await prisma.redemption.findUnique({
    where: { couponId_userId: { couponId: coupon.id, userId: session.id } },
  });
  if (already) return { error: L("You already redeemed this coupon.", "你已经使用过该兑换码。") };

  // Compute the new plan and expiry. Never truncate an active PRO expiry when
  // applying a courtesy PERCENT coupon.
  let plan = "PRO";
  let proExpiresAt: Date | null = null;
  const base =
    access.plan === "PRO" && access.proExpiresAt && access.proExpiresAt.getTime() > Date.now()
      ? access.proExpiresAt
      : new Date();

  if (coupon.kind === "LIFETIME") {
    plan = "LIFETIME";
  } else if (coupon.kind === "PRO_MONTHS") {
    proExpiresAt = new Date(base.getTime() + coupon.value * 30 * 86_400_000);
  } else {
    // PERCENT is informational-only in this build; treat as +1 day PRO courtesy.
    proExpiresAt = new Date(base.getTime() + 86_400_000);
  }

  try {
    await prisma.$transaction(async (tx) => {
      const now = new Date();
      const fresh = await tx.coupon.findUnique({ where: { id: coupon.id } });
      if (!fresh || !fresh.active) {
        throw new CouponRedeemError(L("That coupon is not valid.", "该兑换码无效。"));
      }
      if (fresh.expiresAt && fresh.expiresAt.getTime() <= now.getTime()) {
        throw new CouponRedeemError(L("That coupon has expired.", "该兑换码已过期。"));
      }
      if (fresh.usedCount >= fresh.maxUses) {
        throw new CouponRedeemError(L("That coupon has been fully used.", "该兑换码已达到使用上限。"));
      }

      const bumped = await tx.coupon.updateMany({
        where: {
          id: fresh.id,
          active: true,
          usedCount: { lt: fresh.maxUses },
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
        data: { usedCount: { increment: 1 } },
      });
      if (bumped.count === 0) {
        throw new CouponRedeemError(L("That coupon has been fully used.", "该兑换码已达到使用上限。"));
      }

      await tx.redemption.create({
        data: { couponId: fresh.id, userId: session.id },
      });
      await tx.user.update({
        where: { id: session.id },
        data: { plan, proExpiresAt },
      });
    });
  } catch (err) {
    if (err instanceof CouponRedeemError) {
      return { error: err.message };
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: L("You already redeemed this coupon.", "你已经使用过该兑换码。") };
    }
    throw err;
  }

  // Refresh everything that reads the plan/entitlements so the unlocked state
  // shows immediately without a hard reload.
  revalidateTrackPath("/billing");
  revalidateTrackPath("/dashboard");
  revalidateTrackPath("/mocks", "layout");
  revalidateTrackPath("/official", "layout");
  revalidateTrackPath("/practice", "layout");
  revalidateTrackPath("/results", "layout");
  revalidateTrackPath("/plan", "layout");
  return { ok: true, error: undefined };
}