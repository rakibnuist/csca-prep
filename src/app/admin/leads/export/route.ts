import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

function escapeCsv(value: string | null | undefined) {
  if (value == null) return "";
  let v = String(value);
  // Neutralise spreadsheet formula injection (OWASP CSV Injection). Excel,
  // LibreOffice and Sheets evaluate a quoted cell whose text starts with
  // =, +, - or @ as a formula. Leading with an apostrophe forces text.
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return `"${v.replace(/"/g, '""')}"`;
}

export async function GET() {
  await requireAdmin();

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const header = [
    "name",
    "email",
    "whatsapp",
    "country",
    "goal",
    "message",
    "source",
    "status",
    "priority",
    "tags",
    "assignedTo",
    "note",
    "createdAt",
    "updatedAt",
  ].join(",");

  const body = leads
    .map((lead) =>
      [
        escapeCsv(lead.name),
        escapeCsv(lead.email),
        escapeCsv(lead.whatsapp),
        escapeCsv(lead.country),
        escapeCsv(lead.goal),
        escapeCsv(lead.message),
        escapeCsv(lead.source),
        escapeCsv(lead.status),
        escapeCsv(lead.priority),
        escapeCsv(lead.tags.join("; ")),
        escapeCsv(lead.assignedTo),
        escapeCsv(lead.note),
        escapeCsv(formatDate(lead.createdAt)),
        escapeCsv(formatDate(lead.updatedAt)),
      ].join(","),
    )
    .join("\n");

  const csv = `\uFEFF${header}\n${body}`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="csca-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
