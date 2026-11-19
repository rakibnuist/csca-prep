import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { LeadsCrm, type LeadRow } from "@/components/admin/leads-crm";

export const metadata = { title: "Admin · Leads" };

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdmin();

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const emails = Array.from(new Set(leads.map((l) => l.email.toLowerCase())));
  const users =
    emails.length > 0
      ? await prisma.user.findMany({
          where: { email: { in: emails }, role: "STUDENT" },
          select: { id: true, email: true, plan: true, status: true },
        })
      : [];
  const userByEmail = new Map(users.map((u) => [u.email.toLowerCase(), u]));

  const stats = {
    total: leads.length,
    new: leads.filter((lead) => lead.status === "NEW").length,
    converted: leads.filter((lead) => lead.status === "CONVERTED").length,
    p1: leads.filter((lead) => lead.priority === "P1").length,
  };

  const rows: LeadRow[] = leads.map((lead) => {
    const matched = userByEmail.get(lead.email.toLowerCase());
    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      whatsapp: lead.whatsapp,
      country: lead.country,
      goal: lead.goal,
      message: lead.message,
      source: lead.source,
      status: lead.status,
      priority: lead.priority,
      tags: lead.tags ?? [],
      assignedTo: lead.assignedTo,
      note: lead.note,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
      studentId: matched?.id ?? null,
      studentPlan: matched?.plan ?? null,
      studentStatus: matched?.status ?? null,
    };
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Leads</p>
          <h1 className="display-md mt-2">Leads &amp; pipeline</h1>
          <p className="mt-2 max-w-2xl text-[13px] text-ink-soft">
            Everyone who left their details — from the contact form, the pricing page or anywhere
            else. Triage
            priority, track status, and export whenever you need it.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <LeadsCrm leads={rows} stats={stats} />
      </div>
    </div>
  );
}
