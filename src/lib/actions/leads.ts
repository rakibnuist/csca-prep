"use server";

import { prisma } from "@/lib/db";

export type LeadState = { ok?: boolean; error?: string } | null;

function normalise(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export async function submitLeadAction(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const name = normalise(formData.get("name"));
  const email = normalise(formData.get("email")).toLowerCase();
  const whatsapp = normalise(formData.get("whatsapp"));
  const country = normalise(formData.get("country"));
  const goal = normalise(formData.get("goal"));
  const message = normalise(formData.get("message"));
  const source = normalise(formData.get("source")) || "site";

  if (name.length < 2) return { error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Enter a valid email address." };

  await prisma.lead.create({
    data: {
      name,
      email,
      whatsapp: whatsapp || null,
      country: country || null,
      goal: goal || null,
      message: message || null,
      source,
    },
  });

  return { ok: true };
}
