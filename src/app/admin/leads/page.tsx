import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin · leads" };

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div>
      <p className="eyebrow">Leads</p>
      <h1 className="display-md mt-2">Waitlist & enquiries</h1>
      <p className="mt-2 text-[13px] text-ink-soft">
        Captured from the pricing waitlist and contact form. Nothing is sent to a third party.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-card">
        <div className="grid grid-cols-[0.9fr_1fr_0.7fr_0.6fr_1.4fr_0.6fr] gap-3 border-b border-line bg-paper-deep/60 px-4 py-2.5 text-[10px] tracking-[0.1em] text-ink-faint uppercase">
          <span>Name</span>
          <span>Email</span>
          <span>Country</span>
          <span>Source</span>
          <span>Goal</span>
          <span>Date</span>
        </div>

        {leads.length === 0 && (
          <p className="px-4 py-10 text-center text-[12.5px] text-ink-faint">
            No leads yet. The pricing page captures Pro waitlist sign-ups.
          </p>
        )}

        {leads.map((lead) => (
          <div
            key={lead.id}
            className="grid grid-cols-[0.9fr_1fr_0.7fr_0.6fr_1.4fr_0.6fr] items-center gap-3 border-b border-line/60 px-4 py-2.5 last:border-0"
          >
            <span className="truncate text-[11.5px] text-ink">{lead.name}</span>
            <span className="truncate text-[11px] text-ink-soft">{lead.email}</span>
            <span className="truncate text-[11px] text-ink-soft">{lead.country ?? "—"}</span>
            <span className="text-[10.5px] text-ink-faint">{lead.source}</span>
            <span className="truncate text-[11px] text-ink-soft">{lead.goal ?? lead.message ?? "—"}</span>
            <span className="text-[10.5px] text-ink-faint">
              {formatDate(lead.createdAt, true)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
