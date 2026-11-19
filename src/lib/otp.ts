import "server-only";

import { createHash, randomInt, timingSafeEqual } from "node:crypto";

/** Shared secret for hashing codes: JWT_SECRET keeps codes bound to the app. */
function pepper() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET must be set for verification codes.");
  }
  return secret;
}

export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000;

export function generateOtp() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function hashOtp(target: string, code: string) {
  return createHash("sha256").update(`${target.toLowerCase()}:${code}:${pepper()}`).digest("hex");
}

export function otpMatches(target: string, code: string, hash: string) {
  const candidate = Buffer.from(hashOtp(target, code));
  const expected = Buffer.from(hash);
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}
