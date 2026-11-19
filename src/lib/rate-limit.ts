import "server-only";

import { prisma } from "@/lib/db";

/**
 * Fixed-window rate limiter backed by Postgres.
 *
 * Deliberately not in-memory: a container restart (or a second replica) must
 * not hand an attacker a fresh allowance. The counters are tiny rows that are
 * overwritten in place, so the table stays small — expired rows are swept
 * lazily on write.
 */
export type RateLimitResult = {
  allowed: boolean;
  /** Attempts recorded in the current window. */
  count: number;
  /** Milliseconds until the window resets. */
  retryAfterMs: number;
  /** Seconds to show the user. */
  retryAfterSeconds: number;
};

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowMs);

  const existing = await prisma.rateLimit.findUnique({
    where: { key },
    select: { count: true, resetAt: true },
  });

  if (!existing) {
    try {
      await prisma.rateLimit.create({ data: { key, count: 1, resetAt } });
      return { allowed: true, count: 1, retryAfterMs: windowMs, retryAfterSeconds: Math.ceil(windowMs / 1000) };
    } catch {
      // Another request created the row first — fall through to the increment.
    }
  }

  if (existing && existing.resetAt.getTime() <= now.getTime()) {
    // Window expired: atomically reset (or recreate if a concurrent sweep pruned it).
    const fresh = await prisma.rateLimit.upsert({
      where: { key },
      create: { key, count: 1, resetAt },
      update: { count: 1, resetAt },
    });
    // Lazily prune expired rows after resetting our key so sweep cannot delete it mid-update.
    void sweepRateLimits().catch(() => undefined);
    return {
      allowed: fresh.count <= limit,
      count: fresh.count,
      retryAfterMs: windowMs,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  const updated = await prisma.rateLimit
    .update({
      where: { key },
      data: { count: { increment: 1 } },
    })
    .catch(() =>
      prisma.rateLimit.upsert({
        where: { key },
        create: { key, count: 1, resetAt },
        update: { count: { increment: 1 } },
      }),
    );

  const retryAfterMs = Math.max(0, updated.resetAt.getTime() - now.getTime());
  return {
    allowed: updated.count <= limit,
    count: updated.count,
    retryAfterMs,
    retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
  };
}

/** Remove counters whose window has long passed. Cheap to run occasionally. */
export async function sweepRateLimits() {
  await prisma.rateLimit.deleteMany({
    where: { resetAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
  });
}
