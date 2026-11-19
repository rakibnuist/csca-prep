"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  Archive,
  ArrowUpRight,
  CheckCircle2,
  Crown,
  Download,
  Filter,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Search,
  Star,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { updateLeadAction, deleteLeadAction, fulfilLeadProAction } from "@/lib/actions/leads";
import { cn, formatDate, initials } from "@/lib/utils";

export type LeadRow = {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  country: string | null;
  goal: string | null;
  message: string | null;
  source: string;
  status: string;
  priority: string;
  tags: string[];
  assignedTo: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  studentId?: string | null;
  studentPlan?: string | null;
  studentStatus?: string | null;
};

const STATUSES = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"] as const;
const PRIORITIES = ["P1", "P2", "P3"] as const;

const STATUS_META: Record<string, { label: string; className: string; dot: string }> = {
  NEW: { label: "New", className: "bg-ink/5 text-ink", dot: "bg-sky-500" },
  CONTACTED: { label: "Contacted", className: "bg-gold-soft text-gold", dot: "bg-gold" },
  CONVERTED: { label: "Converted", className: "bg-jade-soft text-jade", dot: "bg-jade" },
  CLOSED: { label: "Closed", className: "bg-ink/5 text-ink-faint", dot: "bg-ink-faint" },
};

const PRIORITY_META: Record<string, { className: string }> = {
  P1: { className: "border-vermillion/30 bg-vermillion/8 text-vermillion-deep" },
  P2: { className: "border-gold/30 bg-gold-soft/60 text-gold" },
  P3: { className: "border-line bg-paper-deep/50 text-ink-faint" },
};

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  const palette = ["#d31d3c", "#0a7a53", "#a97a1f", "#35507a", "#7a3b5d", "#374151"];
  return palette[Math.abs(hash) % palette.length];
}

function SourceTag({ source }: { source: string }) {
  return (
    <span className="inline-flex max-w-full items-center truncate rounded border border-line bg-card px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
      {source}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const meta = PRIORITY_META[priority] ?? PRIORITY_META.P3;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-semibold tabular",
        meta.className,
      )}
    >
      <Star className={cn("h-2.5 w-2.5", priority === "P1" && "fill-current")} />
      {priority}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const meta = STATUS_META[status] ?? STATUS_META.NEW;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-medium",
        meta.className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function saveDisabled(original: LeadRow, draft: LeadRow, draftTags: string[]) {
  return (
    original.status === draft.status &&
    original.priority === draft.priority &&
    (original.tags ?? []).join(",") === draftTags.join(",") &&
    (original.assignedTo ?? "") === (draft.assignedTo ?? "") &&
    (original.note ?? "") === (draft.note ?? "")
  );
}

function LeadCard({ lead }: { lead: LeadRow }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<LeadRow>(lead);
  const [tagsText, setTagsText] = useState(() => (lead.tags ?? []).join(", "));
  const [pending, startTransition] = useTransition();

  function save() {
    const cleanedTags = parseTags(tagsText);
    const form = new FormData();
    form.set("id", lead.id);
    form.set("status", draft.status);
    form.set("priority", draft.priority);
    form.set("tags", cleanedTags.join(", "));
    form.set("assignedTo", draft.assignedTo ?? "");
    form.set("note", draft.note ?? "");
    startTransition(async () => {
      await updateLeadAction(form);
      setDraft((prev) => ({ ...prev, tags: cleanedTags }));
      setTagsText(cleanedTags.join(", "));
      setOpen(false);
    });
  }

  function remove() {
    if (!confirm(`Delete ${lead.name}'s record? This cannot be undone.`)) return;
    const form = new FormData();
    form.set("id", lead.id);
    startTransition(async () => {
      await deleteLeadAction(form);
    });
  }

  function grantPro() {
    const form = new FormData();
    form.set("id", lead.id);
    form.set("plan", "PRO");
    startTransition(async () => {
      await fulfilLeadProAction(form);
    });
  }

  return (
    <article className="flex flex-col gap-4 border-b border-line/70 px-4 py-4 last:border-0">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
          style={{ backgroundColor: colorFor(lead.name) }}
        >
          {initials(lead.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[14px] font-semibold text-ink">{lead.name}</h3>
            <PriorityBadge priority={lead.priority} />
            <span className="ml-auto flex items-center gap-1.5">
              <StatusPill status={lead.status} />
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] text-ink-soft">
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-1 hover:text-ink hover:underline"
            >
              <Mail className="h-3 w-3 text-ink-faint" /> {lead.email}
            </a>
            {lead.whatsapp && (
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3 w-3 text-ink-faint" /> {lead.whatsapp}
              </span>
            )}
            {lead.country && <span>· {lead.country}</span>}
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {lead.goal && (
              <span className="inline-flex items-center gap-1 rounded bg-paper-deep/70 px-1.5 py-0.5 text-[10.5px] text-ink-soft">
                <UserCheck className="h-2.5 w-2.5" /> {lead.goal}
              </span>
            )}
            {(lead.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded bg-ink/5 px-1.5 py-0.5 text-[10px] font-medium text-ink-faint"
              >
                #{tag}
              </span>
            ))}
            {lead.assignedTo && (
              <span className="rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-faint">
                → {lead.assignedTo}
              </span>
            )}
            {lead.studentId && (
              <Link
                href={`/admin/students/${lead.studentId}`}
                className="inline-flex items-center gap-1 rounded border border-indigo/25 bg-indigo/8 px-1.5 py-0.5 text-[10px] font-semibold text-indigo transition hover:bg-indigo hover:text-white"
              >
                Student: {lead.studentPlan ?? "FREE"}
                <ArrowUpRight className="h-2.5 w-2.5" />
              </Link>
            )}
            {lead.source === "question-report" && (
              <Link
                href="/admin/content?filter=REPORTED"
                className="inline-flex items-center gap-1 rounded border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 transition hover:bg-rose-600 hover:text-white"
              >
                Inspect in Content Bank →
              </Link>
            )}
          </div>

          {lead.note && (
            <p className="mt-2 line-clamp-2 rounded-lg bg-gold-soft/40 px-2.5 py-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              {lead.note}
            </p>
          )}
          {!lead.note && lead.message && (
            <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-ink-faint">
              <MessageSquare className="mr-1 inline h-3 w-3" />
              {lead.message}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <SourceTag source={lead.source} />
          <span className="text-[10.5px] text-ink-faint">{formatDate(lead.createdAt, true)}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pl-0 sm:pl-[52px]">
        <span className="text-[10px] text-ink-faint">Updated {formatDate(lead.updatedAt, true)}</span>
        <div className="flex flex-wrap items-center gap-1.5">
          {lead.studentId && lead.studentPlan !== "PRO" && lead.studentPlan !== "LIFETIME" && (
            <button
              type="button"
              onClick={grantPro}
              disabled={pending}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-jade/30 bg-jade/10 px-2.5 text-[11px] font-semibold text-jade transition hover:bg-jade hover:text-white disabled:opacity-50"
            >
              <Crown className="h-3 w-3" />
              Grant Pro &amp; Convert
            </button>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-7 items-center gap-1 rounded-md border border-line px-2 text-[11px] font-medium text-ink-soft transition hover:border-ink/25 hover:text-ink"
          >
            <MoreHorizontal className="h-3 w-3" />
            {open ? "Close" : "Manage"}
          </button>
          <button
            onClick={remove}
            disabled={pending}
            className="inline-flex h-7 items-center gap-1 rounded-md border border-line px-2 text-[11px] font-medium text-ink-faint transition hover:border-vermillion/30 hover:text-vermillion disabled:opacity-50"
            aria-label="Delete lead"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {open && (
        <div className="ml-0 rounded-xl border border-line bg-paper-deep/30 p-4 sm:ml-[52px]">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            <Filter className="h-3 w-3" /> Pipeline
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-ink-soft">Status</span>
              <select
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                className="h-9 w-full rounded-lg border border-line bg-card px-2.5 text-[12.5px] text-ink focus:border-vermillion/50 focus:outline-none"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_META[s].label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-ink-soft">Priority</span>
              <div className="flex overflow-hidden rounded-lg border border-line">
                {PRIORITIES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDraft({ ...draft, priority: p })}
                    className={cn(
                      "h-9 flex-1 text-[12px] font-semibold tabular transition",
                      draft.priority === p
                        ? p === "P1"
                          ? "bg-vermillion text-paper"
                          : p === "P2"
                            ? "bg-gold text-white"
                            : "bg-ink text-paper"
                        : "bg-card text-ink-soft hover:bg-paper-deep",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-ink-soft">Owner</span>
              <input
                value={draft.assignedTo ?? ""}
                maxLength={80}
                onChange={(e) => setDraft({ ...draft, assignedTo: e.target.value })}
                placeholder="Assign to a teammate"
                className="h-9 w-full rounded-lg border border-line bg-card px-2.5 text-[12.5px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-ink-soft">
                Tags <span className="text-ink-faint">(comma separated)</span>
              </span>
              <input
                value={tagsText}
                maxLength={200}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="scholarship, pro, uae"
                className="h-9 w-full rounded-lg border border-line bg-card px-2.5 text-[12.5px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] font-medium text-ink-soft">Note</span>
              <textarea
                value={draft.note ?? ""}
                maxLength={2000}
                onChange={(e) => setDraft({ ...draft, note: e.target.value })}
                rows={2}
                placeholder="Internal note (not shown to the lead)"
                className="w-full rounded-lg border border-line bg-card px-2.5 py-2 text-[12.5px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setDraft(lead);
                setTagsText((lead.tags ?? []).join(", "));
              }}
              className="inline-flex h-8 items-center rounded-md border border-line px-3 text-[12px] font-medium text-ink-soft hover:text-ink"
            >
              Reset
            </button>
            <button
              onClick={save}
              disabled={pending || saveDisabled(lead, draft, parseTags(tagsText))}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-vermillion px-3 text-[12px] font-medium text-paper transition hover:bg-vermillion-deep disabled:opacity-50"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {pending ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export function LeadsCrm({
  leads: initialLeads,
  stats,
}: {
  leads: LeadRow[];
  stats: { total: number; new: number; converted: number; p1: number };
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("ALL");
  const [source, setSource] = useState<string>("ALL");
  const [sort, setSort] = useState<string>("newest");
  const [_, startTransition] = useTransition();
  const leads = initialLeads;

  const extraSources = useMemo(() => {
    const known = new Set(["billing-upgrade", "question-report", "site"]);
    return Array.from(new Set(leads.map((l) => l.source).filter((s) => s && !known.has(s)))).sort();
  }, [leads]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = leads.filter((lead) => {
      if (status !== "ALL" && lead.status !== status) return false;
      if (source !== "ALL" && lead.source !== source) return false;
      if (!term) return true;
      return (
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        (lead.country ?? "").toLowerCase().includes(term) ||
        (lead.goal ?? "").toLowerCase().includes(term) ||
        (lead.source ?? "").toLowerCase().includes(term) ||
        (lead.tags ?? []).some((tag) => tag.toLowerCase().includes(term))
      );
    });
    if (sort === "priority") {
      const order = { P1: 0, P2: 1, P3: 2 } as const;
      list = list.sort((a, b) => (order[a.priority as "P1"] ?? 3) - (order[b.priority as "P1"] ?? 3));
    } else if (sort === "oldest") {
      list = list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else {
      list = list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return list;
  }, [leads, query, status, source, sort]);

  // Re-sort after a mutation by forcing a fresh key on the container.
  void _;
  void startTransition;

  const cards = [
    { label: "All leads", value: stats.total, icon: Users, tone: "text-ink" },
    { label: "New", value: stats.new, icon: Archive, tone: "text-sky-600" },
    { label: "Converted", value: stats.converted, icon: CheckCircle2, tone: "text-jade" },
    { label: "High priority", value: stats.p1, icon: Star, tone: "text-vermillion" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="panel p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-ink-faint">{card.label}</p>
              <card.icon className={cn("h-4 w-4", card.tone)} />
            </div>
            <p className="mt-2 font-display text-3xl text-ink tabular">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, country, tag…"
            className="h-10 w-full rounded-lg border border-line bg-card pr-8 pl-9 text-[13px] text-ink placeholder:text-ink-faint focus:border-vermillion/50 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-ink-faint hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            value={status}
            onChange={setStatus}
            options={[
              { value: "ALL", label: "All" },
              ...STATUSES.map((s) => ({ value: s, label: STATUS_META[s].label })),
            ]}
          />
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="h-10 rounded-lg border border-line bg-card px-2.5 text-[12.5px] text-ink focus:border-vermillion/50 focus:outline-none"
            aria-label="Filter by source"
          >
            <option value="ALL">All sources</option>
            <option value="billing-upgrade">Pro upgrades</option>
            <option value="question-report">Question reports</option>
            <option value="site">Site / contact</option>
            {extraSources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 rounded-lg border border-line bg-card px-2.5 text-[12.5px] text-ink focus:border-vermillion/50 focus:outline-none"
            aria-label="Sort leads"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
          </select>
          {/* A download route, not a page: Link would client-navigate instead of
              triggering the Content-Disposition attachment. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/admin/leads/export"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line bg-card px-3 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </a>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-line bg-card p-10 text-center">
          <Users className="mx-auto h-6 w-6 text-ink-faint" />
          <p className="mt-3 text-[13px] font-medium text-ink">No leads match</p>
          <p className="mt-1 text-[12px] text-ink-faint">Adjust the search or filters.</p>
        </div>
      ) : (
        <div className="mt-5 overflow-hidden rounded-xl border border-line bg-card shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-deep/50 px-4 py-2 text-[10px] tracking-[0.1em] text-ink-faint uppercase">
            <span>
              {filtered.length} lead{filtered.length === 1 ? "" : "s"}
            </span>
            <span>Click “Manage” to update status, priority and notes</span>
          </div>
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex max-w-full overflow-x-auto rounded-lg border border-line bg-card">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "h-10 shrink-0 px-2.5 text-[12px] font-medium transition sm:px-3",
            value === option.value ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
