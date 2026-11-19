import "server-only";

import { headers } from "next/headers";

/**
 * Best-effort client IP for rate limiting.
 *
 * Prefer reverse-proxy/CDN edge headers (`CF-Connecting-IP`, `X-Real-IP`) set
 * directly by the proxy over the leftmost `X-Forwarded-For` value (which a
 * client can forge unless stripped upstream), falling back to the last hop of
 * `X-Forwarded-For`.
 */
export async function clientIp(): Promise<string> {
  try {
    const h = await headers();
    const edgeIp = h.get("cf-connecting-ip")?.trim() || h.get("x-real-ip")?.trim();
    if (edgeIp) return edgeIp;
    const forwarded = h.get("x-forwarded-for");
    if (forwarded) {
      const parts = forwarded
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
      const last = parts[parts.length - 1];
      if (last) return last;
    }
    return "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * A bcrypt hash of a value nobody knows, used to keep the password check
 * timing constant whether or not the account exists.
 *
 * Without it, an unknown email returned in ~14 ms while a known email took
 * ~136 ms (the bcrypt comparison was skipped), which let an attacker
 * enumerate every registered email at 15 ms a pop.
 */
export const DUMMY_PASSWORD_HASH = "$2b$11$zoKxTH6e0B4.lgS0KPNLm.jjeXqLEvIG8PMbTLnmAEyhMUnYHw4UK";
