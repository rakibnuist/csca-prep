"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";

export type AuthState = { error?: string } | null;

function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  if (next.startsWith("/") && !next.startsWith("//")) return next;
  return "/app/dashboard";
}

function normaliseEmail(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export async function signUpAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = normaliseEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const track = String(formData.get("track") ?? "");
  const next = safeNext(formData.get("next"));

  if (name.length < 2) return { error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Use at least 8 characters for your password." };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with this email already exists. Try signing in." };

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hashPassword(password),
      track: track === "HUMANITIES" || track === "STEM" ? track : null,
      targetYear: 2027,
    },
  });

  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role });
  redirect(next);
}

export async function signInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = normaliseEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  if (!email || !password) return { error: "Enter your email and password." };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) return { error: "Email or password is incorrect." };

  const valid = await verifyPassword(password, user.password);
  if (!valid) return { error: "Email or password is incorrect." };

  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role });
  redirect(next);
}

export async function signOutAction() {
  await destroySession();
  redirect("/");
}
