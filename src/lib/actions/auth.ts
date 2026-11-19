"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  createSession,
  destroySession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { isNationality } from "@/lib/nationalities";
import { isValidDial } from "@/lib/countries";
import { sendOtpEmail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp, DUMMY_PASSWORD_HASH } from "@/lib/request";
import { trackLink } from "@/lib/tracks";
import {
  generateOtp,
  hashOtp,
  otpMatches,
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_MS,
  OTP_TTL_MS,
} from "@/lib/otp";

/* ── Abuse limits ─────────────────────────────────────────────────────── */
const SIGNIN_ACCOUNT_LIMIT = 8; // wrong tries against one account
const SIGNIN_IP_LIMIT = 30; // wrong tries from one address
const SIGNIN_WINDOW_MS = 15 * 60 * 1000;
const OTP_REQUEST_LIMIT = 5; // code requests per window
const OTP_REQUEST_WINDOW_MS = 60 * 60 * 1000;
const OTP_VERIFY_LIMIT = 10; // code guesses per window
const OTP_VERIFY_WINDOW_MS = 15 * 60 * 1000;

/**
 * One message for every failure mode, so the endpoint cannot be used to
 * discover which addresses have accounts.
 */
const GENERIC_AUTH_ERROR = "Email or password is incorrect.";

export type AuthState = {
  error?: string;
  step?: "code" | "reset";
  email?: string;
  devCode?: string;
  done?: boolean;
} | null;

type SignupPayload = {
  name: string;
  email: string;
  passwordHash: string;
  whatsapp: string;
  track: string | null;
  testLanguage: string;
  teachingTrack: string;
  uiLocale: string;
  country: string;
};

function safeNext(value: FormDataEntryValue | null, fallback = "/en/dashboard") {
  const next = typeof value === "string" ? value : "";
  // Only allow simple same-origin absolute paths. Reject protocol-relative
  // ("//host"), backslash variants ("/\host", which browsers normalise to
  // "//host") and any control characters.
  if (!next.startsWith("/")) return fallback;
  if (next.startsWith("//") || next.startsWith("/\\")) return fallback;
  if (/[\\\x00-\x1f\x7f]/.test(next)) return fallback;
  return next;
}

function normaliseEmail(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

/** Step 1: validate the signup, email a 6-digit code, keep the payload pending. */
export async function requestSignupOtpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = normaliseEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const whatsappCode = String(formData.get("whatsappCode") ?? "").replace(/\D/g, "");
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").replace(/\D/g, "");
  const nationality = String(formData.get("nationality") ?? "").trim();
  const track = String(formData.get("track") ?? "");
  const testLanguage = String(formData.get("testLanguage") ?? "en");

  if (name.length < 2) return { error: "Please enter your name." };
  if (name.length > 120) return { error: "Name must be 120 characters or fewer." };
  if (email.length > 160 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (!isValidDial(whatsappCode)) return { error: "Select the country code for your WhatsApp number." };
  if (!/^\d{6,14}$/.test(whatsappNumber)) {
    return { error: "Enter your WhatsApp number (without the country code), 6–14 digits." };
  }
  const whatsapp = `+${whatsappCode}${whatsappNumber}`;
  if (!isNationality(nationality)) return { error: "Please select your nationality." };
  if (password.length < 8) return { error: "Use at least 8 characters for your password." };
  if (password.length > 200) return { error: "Password must be 200 characters or fewer." };

  const ip = await clientIp();
  const limited = await rateLimit(
    `signup:req:${ip}`,
    OTP_REQUEST_LIMIT,
    OTP_REQUEST_WINDOW_MS,
  );
  if (!limited.allowed) {
    return { error: "Too many signup attempts. Try again later." };
  }

  // Return the same OTP-step response when the email already exists so the
  // endpoint cannot be used as an account-enumeration oracle.
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { step: "code", email };

  // Resend cooldown: one live code per target at a time.
  const last = await prisma.verificationCode.findFirst({
    where: { target: email, purpose: "SIGNUP" },
    orderBy: { createdAt: "desc" },
  });
  if (last && !last.consumedAt && Date.now() - last.createdAt.getTime() < OTP_RESEND_COOLDOWN_MS) {
    return { error: "A code was just sent. Wait a minute to request another." };
  }

  const code = generateOtp();
  const payload: SignupPayload = {
    name,
    email,
    passwordHash: await hashPassword(password),
    whatsapp,
    track: track === "HUMANITIES" || track === "STEM" ? track : null,
    testLanguage: testLanguage === "zh" ? "zh" : "en",
    teachingTrack: testLanguage === "zh" ? "CN" : "EN",
    uiLocale: testLanguage === "zh" ? "zh" : "en",
    country: nationality,
  };

  await prisma.verificationCode.create({
    data: {
      purpose: "SIGNUP",
      target: email,
      codeHash: hashOtp(email, code),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
      payload,
    },
  });

  const mail = await sendOtpEmail(email, code, "Verify your email.");
  if (!mail.ok) return { error: mail.error };
  return { step: "code", email, devCode: mail.devCode };
}

/** Step 2: check the code, then create the approved, verified account and sign in. */
export async function verifySignupOtpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = normaliseEmail(formData.get("email"));
  const code = String(formData.get("code") ?? "").trim();

  if (!email) return { error: "Missing email — please restart the signup." };
  if (!/^\d{6}$/.test(code)) return { error: "Enter the 6-digit code from your email." };

  const ip = await clientIp();
  const limited = await rateLimit(
    `signup:try:${ip}:${email}`,
    OTP_VERIFY_LIMIT,
    OTP_VERIFY_WINDOW_MS,
  );
  if (!limited.allowed) {
    return { error: "Too many wrong attempts. Request a new code." };
  }

  const record = await prisma.verificationCode.findFirst({
    where: { target: email, purpose: "SIGNUP", consumedAt: null },
    orderBy: { createdAt: "desc" },
  });
  if (!record) return { error: "That code isn't valid anymore. Request a new one." };
  if (record.expiresAt.getTime() < Date.now()) return { error: "That code expired. Request a new one." };
  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    return { error: "Too many wrong attempts. Request a new code." };
  }

  if (!otpMatches(email, code, record.codeHash)) {
    // Count against every live code for this target so a resend cannot reset
    // the allowance.
    await prisma.verificationCode.updateMany({
      where: { target: email, purpose: "SIGNUP", consumedAt: null },
      data: { attempts: { increment: 1 } },
    });
    return { error: "That code is wrong." };
  }

  const payload = record.payload as unknown as SignupPayload | null;
  if (!payload) return { error: "Signup data missing — please restart the signup." };

  const already = await prisma.user.findUnique({ where: { email } });
  if (already) return { error: "An account with this email already exists. Try signing in." };

  let user: { id: string; email: string; name: string | null; role: string; tokenVersion: number; teachingTrack: string } | null = null;
  try {
    user = await prisma.$transaction(async (tx) => {
      const consumed = await tx.verificationCode.updateMany({
        where: { id: record.id, consumedAt: null },
        // Drop the stored payload (it holds the password hash) as soon as it is
        // consumed, and fail closed if a concurrent request already consumed it.
        data: { consumedAt: new Date(), payload: Prisma.DbNull },
      });
      if (consumed.count === 0) return null;

      return tx.user.create({
        data: {
          email: payload.email,
          name: payload.name,
          password: payload.passwordHash,
          whatsapp: payload.whatsapp,
          country: payload.country,
          track: payload.track,
          testLanguage: payload.testLanguage,
          uiLocale: payload.uiLocale,
          teachingTrack: payload.teachingTrack,
          targetYear: 2027,
          // No admin approval step: signup is self-serve via email OTP.
          status: "APPROVED",
          emailVerifiedAt: new Date(),
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          tokenVersion: true,
          teachingTrack: true,
        },
      });
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: "An account with this email already exists. Try signing in." };
    }
    throw err;
  }

  if (!user) return { error: "That code isn't valid anymore. Request a new one." };

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    tokenVersion: user.tokenVersion,
  });
  // Email-verified and approved — straight into the requested path or the
  // student's track dashboard.
  const fallback = trackLink("/app/dashboard", user.teachingTrack === "CN" ? "CN" : "EN");
  redirect(safeNext(formData.get("next"), fallback));
}

export async function signInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = normaliseEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const rawNext = formData.get("next");

  if (!email || !password) return { error: "Enter your email and password." };
  if (email.length > 160 || password.length > 200) return { error: GENERIC_AUTH_ERROR };

  // Two buckets: one per IP (stops one host spraying many accounts) and one
  // per account (stops a distributed attack on a single account).
  //
  // The IP allowance is deliberately much looser than the per-account one:
  // students sit behind campus and country-level NAT, so a tight IP limit
  // would lock out every legitimate user behind the same address.
  const ip = await clientIp();
  const [byIp, byAccount] = await Promise.all([
    rateLimit(`signin:ip:${ip}`, SIGNIN_IP_LIMIT, SIGNIN_WINDOW_MS),
    rateLimit(`signin:acct:${email}`, SIGNIN_ACCOUNT_LIMIT, SIGNIN_WINDOW_MS),
  ]);
  if (!byIp.allowed || !byAccount.allowed) {
    const wait = Math.max(byIp.retryAfterSeconds, byAccount.retryAfterSeconds);
    return { error: `Too many sign-in attempts. Try again in ${Math.ceil(wait / 60)} minute(s).` };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always run a bcrypt comparison, even for an unknown address. Skipping it
  // made the response time depend on whether the account existed (~14 ms vs
  // ~136 ms), which enumerated every registered email.
  const valid = await verifyPassword(password, user?.password ?? DUMMY_PASSWORD_HASH);
  if (!user || !user.password || !valid) return { error: GENERIC_AUTH_ERROR };

  if (user.status !== "APPROVED") {
    return { error: "This account isn't accessible. Contact support if you think this is a mistake." };
  }

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    tokenVersion: user.tokenVersion,
  });
  const fallback = trackLink("/app/dashboard", user.teachingTrack === "CN" ? "CN" : "EN");
  redirect(safeNext(rawNext, fallback));
}

export async function signOutAction() {
  await destroySession();
  redirect("/");
}

/* ── Password reset ─────────────────────────────────────────────────── */

/** Step 1: email a one-time reset code. */
export async function requestPasswordResetAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = normaliseEmail(formData.get("email"));
  if (email.length > 160 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }

  const ip = await clientIp();
  const limited = await rateLimit(`reset:req:${ip}`, OTP_REQUEST_LIMIT, OTP_REQUEST_WINDOW_MS);
  if (!limited.allowed) {
    return { error: "Too many reset requests. Try again later." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  // Same response whether or not the account exists — the old message
  // ("No account uses that email address") was a free account-enumeration
  // oracle.
  if (!user) {
    return { step: "reset", email };
  }

  const last = await prisma.verificationCode.findFirst({
    where: { target: email, purpose: "RESET" },
    orderBy: { createdAt: "desc" },
  });
  if (last && !last.consumedAt && Date.now() - last.createdAt.getTime() < OTP_RESEND_COOLDOWN_MS) {
    return { error: "A code was just sent. Wait a minute to request another." };
  }

  const code = generateOtp();
  await prisma.verificationCode.create({
    data: {
      purpose: "RESET",
      target: email,
      codeHash: hashOtp(email, code),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
    },
  });

  const mail = await sendOtpEmail(email, code, "Reset your password.");
  if (!mail.ok) return { error: mail.error };
  return { step: "reset", email, devCode: mail.devCode };
}

/** Step 2: verify the code and set a new password. */
export async function resetPasswordAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = normaliseEmail(formData.get("email"));
  const code = String(formData.get("code") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || email.length > 160) return { error: "Missing email — please start over." };
  if (!/^\d{6}$/.test(code)) return { error: "Enter the 6-digit code from your email." };
  if (password.length < 8) return { error: "Use at least 8 characters for your new password." };
  if (password.length > 200) return { error: "Password must be 200 characters or fewer." };

  const ip = await clientIp();
  const limited = await rateLimit(`reset:try:${ip}:${email}`, OTP_VERIFY_LIMIT, OTP_VERIFY_WINDOW_MS);
  if (!limited.allowed) {
    return { error: "Too many wrong attempts. Request a new code." };
  }

  const record = await prisma.verificationCode.findFirst({
    where: { target: email, purpose: "RESET", consumedAt: null },
    orderBy: { createdAt: "desc" },
  });
  if (!record) return { error: "That code isn't valid anymore. Request a new one." };
  if (record.expiresAt.getTime() < Date.now()) return { error: "That code expired. Request a new one." };
  if (record.attempts >= OTP_MAX_ATTEMPTS) return { error: "Too many wrong attempts. Request a new code." };

  if (!otpMatches(email, code, record.codeHash)) {
    // Count the failure against every live code for this target, not just the
    // newest one. Counting per row let an attacker request a fresh code and
    // reset the allowance — five guesses a minute, forever.
    await prisma.verificationCode.updateMany({
      where: { target: email, purpose: "RESET", consumedAt: null },
      data: { attempts: { increment: 1 } },
    });
    return { error: "That code is wrong." };
  }

  const newPasswordHash = await hashPassword(password);
  const reset = await prisma.$transaction(async (tx) => {
    const consumed = await tx.verificationCode.updateMany({
      where: { id: record.id, consumedAt: null },
      data: { consumedAt: new Date(), payload: Prisma.DbNull },
    });
    if (consumed.count === 0) return false;

    await tx.user.update({
      where: { email },
      data: {
        password: newPasswordHash,
        // Invalidate every session issued before the reset. A stolen cookie
        // must not survive a password change.
        tokenVersion: { increment: 1 },
      },
    });
    return true;
  });

  if (!reset) return { error: "That code isn't valid anymore. Request a new one." };

  return { done: true };
}
