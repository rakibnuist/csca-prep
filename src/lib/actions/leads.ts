"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";

export type LeadState = { ok?: boolean; error?: string } | null;

const LEAD_STATUSES = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"] as const;
const LEAD_PRIORITIES = ["P1", "P2", "P3"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

function normalise(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export async function submitLeadAction(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const name = normalise(formData.get("name")).slice(0, 120);
  const email = normalise(formData.get("email")).toLowerCase().slice(0, 160);
  const whatsapp = normalise(formData.get("whatsapp")).slice(0, 32);
  const country = normalise(formData.get("country")).slice(0, 80);
  const goal = normalise(formData.get("goal")).slice(0, 80);
  const message = normalise(formData.get("message")).slice(0, 2000);
  const source = (normalise(formData.get("source")) || "site").slice(0, 64);

  if (name.length < 2) return { error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Enter a valid email address." };

  // The public lead form is an unauthenticated write endpoint — throttle it
  // per IP so the CRM cannot be flooded.
  const ip = await clientIp();
  const limited = await rateLimit(`lead:${ip}`, 6, 60 * 60 * 1000);
  if (!limited.allowed) {
    return { error: "Too many submissions from this device. Please try again later." };
  }

  await prisma.lead.create({
    data: {
      name,
      email,
      whatsapp: whatsapp || null,
      country: country || null,
      goal: goal || null,
      message: message || null,
      source,
      priority: inferPriority({ goal, message }),
    },
  });

  return { ok: true };
}

/** Lightweight automatic triage for brand-new leads. */
function inferPriority(input: { goal?: string; message?: string }): LeadPriority {
  const text = `${input.goal ?? ""} ${input.message ?? ""}`.toLowerCase();
  if (/(asap|urgent|immediate|this month|scholarship)/.test(text)) return "P1";
  if (/(pro|paid|subscribe|plan|price|fee)/.test(text)) return "P2";
  return "P3";
}

/** Admin: update a lead's CRM fields and refresh the admin view. */
export async function updateLeadAction(formData: FormData) {
  await requireAdmin();
  const id = normalise(formData.get("id"));
  if (!id) return;

  const status = normalise(formData.get("status"));
  const priority = normalise(formData.get("priority"));
  const tagInput = normalise(formData.get("tags"));
  const assignedTo = normalise(formData.get("assignedTo")).slice(0, 80);
  const note = normalise(formData.get("note")).slice(0, 2000);

  const data: Record<string, unknown> = {};
  if (LEAD_STATUSES.includes(status as LeadStatus)) data.status = status;
  if (LEAD_PRIORITIES.includes(priority as LeadPriority)) data.priority = priority;
  if (formData.has("tags")) {
    data.tags = tagInput
      ? tagInput
          .split(",")
          .map((tag) => tag.trim().slice(0, 40))
          .filter(Boolean)
          .slice(0, 12)
      : [];
  }
  if (formData.has("assignedTo")) data.assignedTo = assignedTo === "" ? null : assignedTo;
  if (formData.has("note")) data.note = note === "" ? null : note;

  await prisma.lead.update({ where: { id }, data }).catch(() => undefined);
  revalidatePath("/admin/leads");
}

/** Admin: hard-delete a lead. */
export async function deleteLeadAction(formData: FormData) {
  await requireAdmin();
  const id = normalise(formData.get("id"));
  if (!id) return;
  await prisma.lead.delete({ where: { id } }).catch(() => undefined);
  revalidatePath("/admin/leads");
}

/** Admin: approve + grant Pro/Lifetime to a matching student and mark lead converted. */
export async function fulfilLeadProAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = normalise(formData.get("id"));
  const plan = normalise(formData.get("plan")) === "LIFETIME" ? "LIFETIME" : "PRO";
  if (!id) return;

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return;

  const student = await prisma.user.findUnique({
    where: { email: lead.email.toLowerCase() },
    select: { id: true, role: true },
  });

  if (student && student.role === "STUDENT") {
    await prisma.user.update({
      where: { id: student.id },
      data: {
        plan,
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewedBy: admin.id,
      },
    });
  }

  await prisma.lead.update({
    where: { id: lead.id },
    data: {
      status: "CONVERTED",
      note: [lead.note, `Granted ${plan} access`].filter(Boolean).join(" · ").slice(0, 2000),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath("/admin/students");
  if (student) revalidatePath(`/admin/students/${student.id}`);
}
