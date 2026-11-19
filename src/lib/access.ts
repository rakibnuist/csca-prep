import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export type Plan = "FREE" | "PRO" | "LIFETIME";

export type AccessInfo = {
  plan: Plan;
  isPro: boolean;
  proExpiresAt: Date | null;
  /** Remaining whole days of Pro (for active PRO plans), else null. */
  proDaysLeft: number | null;
};

export const FREE_ATTEMPTS_PER_MOCK = 2;

/** Resolve the effective plan for a user id, applying expiry. */
export async function getAccess(userId: string): Promise<AccessInfo> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, proExpiresAt: true, role: true },
  });
  if (!user) return { plan: "FREE", isPro: false, proExpiresAt: null, proDaysLeft: null };

  const now = new Date();
  let plan: Plan = user.plan === "LIFETIME" ? "LIFETIME" : user.plan === "PRO" ? "PRO" : "FREE";

  if (plan === "PRO" && user.proExpiresAt && user.proExpiresAt.getTime() <= now.getTime()) {
    plan = "FREE";
  }

  const proDaysLeft =
    plan === "PRO" && user.proExpiresAt
      ? Math.max(0, Math.ceil((user.proExpiresAt.getTime() - now.getTime()) / 86_400_000))
      : plan === "LIFETIME"
        ? Infinity
        : null;

  return {
    plan,
    isPro: plan === "PRO" || plan === "LIFETIME" || user.role === "ADMIN",
    proExpiresAt: plan === "PRO" ? user.proExpiresAt : null,
    proDaysLeft: proDaysLeft === Infinity ? null : proDaysLeft,
  };
}

/** Cached variant usable from server components without an explicit id. */
export const getCurrentAccess = cache(async () => {
  const session = await getSession();
  if (!session) return { plan: "FREE", isPro: false, proExpiresAt: null, proDaysLeft: null } as AccessInfo;
  return getAccess(session.id);
});

/** Whether a user can start a fresh attempt on a given mock. */
export async function canStartMock(
  userId: string,
  mockId: string,
  isPro: boolean,
): Promise<{ allowed: boolean; used: number; remaining: number }> {
  if (isPro) return { allowed: true, used: 0, remaining: Infinity };
  const used = await prisma.attempt.count({
    where: { userId, mockId, status: "SUBMITTED" },
  });
  const remaining = Math.max(0, FREE_ATTEMPTS_PER_MOCK - used);
  return { allowed: used < FREE_ATTEMPTS_PER_MOCK, used, remaining };
}