import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "csca_session";
const SESSION_DAYS = 30;

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) {
    throw new Error(
      "JWT_SECRET must be set to at least 32 characters (openssl rand -hex 32). See .env.example.",
    );
  }
  // The example value ships in .env.example. Refusing it stops a staging box
  // that copied the template from handing anyone an admin token.
  if (value.startsWith("dev-only-change-me")) {
    throw new Error("Refusing to start with the example JWT_SECRET. Generate a real one.");
  }
  return new TextEncoder().encode(value);
}

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  /** Bumped server-side to invalidate every issued token for this user. */
  tokenVersion: number;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 11);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: Omit<SessionUser, "tokenVersion"> & { tokenVersion?: number }) {
  const token = await new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    tv: user.tokenVersion ?? 0,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/**
 * Invalidate every session issued for a user by bumping `tokenVersion`.
 * Used after a password change and for a forced sign-out everywhere.
 */
export async function invalidateSessions(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { tokenVersion: { increment: 1 } },
  });
}

export const getSession = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    if (!payload.sub) return null;
    return {
      id: payload.sub,
      email: String(payload.email ?? ""),
      name: (payload.name as string | null) ?? null,
      role: String(payload.role ?? "STUDENT"),
      tokenVersion: Number(payload.tv ?? 0),
    };
  } catch {
    return null;
  }
});

/** Fresh user row (settings can change after the token was issued). */
export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return null;
  // A stale token (password changed, forced sign-out) is treated as no
  // session at all, even though it is still cryptographically valid.
  if (user.tokenVersion !== session.tokenVersion) return null;
  return user;
});

/**
 * Fresh DB row, so an account rejected after sign-in loses access immediately.
 * Sessions are only issued to approved students, but approval can be revoked.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  if (user.status !== "APPROVED") redirect("/pending");
  return user;
}

export async function requireAdmin() {
  const session = await requireUser();
  if (session.role !== "ADMIN") {
    redirect(session.teachingTrack === "CN" ? "/cn/dashboard" : "/en/dashboard");
  }
  return session;
}
