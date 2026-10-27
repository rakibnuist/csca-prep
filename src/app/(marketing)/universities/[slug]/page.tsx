import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CalendarClock,
  GraduationCap,
  Languages,
  MapPin,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Pill } from "@/components/site/section";
import { toggleSaveUniversityAction } from "@/lib/actions/universities";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const university = await prisma.university.findUnique({ where: { slug } });
  if (!university) return { title: "University" };
  return {
    title: `${university.nameEn} — CSCA requirements and profile`,
    description:
      university.summary ??
      `CSCA subject requirements, language rules and application notes for ${university.nameEn} (${university.nameZh}) in ${university.city}.`,
    alternates: { canonical: `/universities/${slug}` },
  };
}

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getSession();

  const university = await prisma.university.findUnique({ where: { slug } });
  if (!university) notFound();

  const [saved, nearby] = await Promise.all([
    session
      ? prisma.savedUniversity.findUnique({
          where: { userId_universityId: { userId: session.id, universityId: university.id } },
        })
      : null,
    prisma.university.findMany({
      where: { city: university.city, id: { not: university.id } },
      orderBy: [{ rank: "asc" }],
      take: 4,
    }),
  ]);

  const requirements = [
    {
      label: "Mathematics",
      value: "Required for every applicant",
      note: "No exemption exists for undergraduate CSCA candidates.",
      tone: "required" as const,
    },
    {
      label: "Science / engineering / medicine",
      value: university.scienceSubjectRule,
      note: "Applicants to these programme groups normally need at least one science subject.",
      tone: "default" as const,
    },
    {
      label: "Humanities / business / law",
      value: university.humanitiesRule,
      note: "Usually Mathematics only, plus Professional Chinese for Chinese-taught degrees.",
      tone: "default" as const,
    },
    {
      label: "Professional Chinese",
      value: university.needsChineseTest
        ? "Required for Chinese-taught programmes"
        : "Not required",
      note: "Fully English-taught programmes are exempt. Chinese Language majors may qualify with HSK 4.",
      tone: university.needsChineseTest ? "required" as const : "exempt" as const,
    },
  ];

  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-10 sm:py-14">
          <Link
            href="/universities"
            className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All universities
          </Link>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {university.tier.map((tier) => (
                  <span
                    key={tier}
                    className="rounded border border-line px-1.5 py-0.5 text-[10px] font-medium text-ink-soft"
                  >
                    {tier === "DFC" ? "Double First Class" : tier === "CSCA_CENTRE" ? "CSCA centre" : tier}
                  </span>
                ))}
                {university.verified ? (
                  <Pill tone="jade">
                    <BadgeCheck className="h-3 w-3" /> Curated profile
                  </Pill>
                ) : (
                  <Pill>Listed · verify specifics</Pill>
                )}
              </div>

              <h1 className="display-lg mt-3">{university.nameEn}</h1>
              <p className="mt-1 font-chinese text-xl text-vermillion">{university.nameZh}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-ink-faint" /> {university.city}
                </span>
                {university.rank && (
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-ink-faint" /> Curated rank #{university.rank}
                  </span>
                )}
                {university.internationalCount && (
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-ink-faint" /> ~
                    {university.internationalCount.toLocaleString()} international students
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Languages className="h-3.5 w-3.5 text-ink-faint" /> {university.languages.join(" · ")}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <form action={toggleSaveUniversityAction}>
                <input type="hidden" name="slug" value={university.slug} />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-4 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
                >
                  {saved ? (
                    <>
                      <BookmarkCheck className="h-3.5 w-3.5 text-jade" /> Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3.5 w-3.5" /> Save to shortlist
                    </>
                  )}
                </button>
              </form>

              {university.website && (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
                >
                  University site <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid gap-8 py-10 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-8">
          {university.summary && (
            <div>
              <h2 className="font-display text-xl text-ink">Profile</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{university.summary}</p>
            </div>
          )}

          <div>
            <h2 className="font-display text-xl text-ink">CSCA requirements (indicative)</h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-line bg-card">
              {requirements.map((requirement) => (
                <div
                  key={requirement.label}
                  className="flex flex-col gap-1 border-b border-line/70 px-4 py-3.5 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div className="sm:w-56 sm:shrink-0">
                    <p className="text-[12.5px] font-medium text-ink">{requirement.label}</p>
                    <p className="text-[10.5px] text-ink-faint">{requirement.note}</p>
                  </div>
                  <p
                    className={
                      requirement.tone === "required"
                        ? "text-[12.5px] font-medium text-vermillion-deep"
                        : requirement.tone === "exempt"
                          ? "text-[12.5px] font-medium text-jade"
                          : "text-[12.5px] text-ink-soft"
                    }
                  >
                    {requirement.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10.5px] text-ink-faint">
              Last reviewed {formatDate(university.lastVerified)}. Requirements change each cycle —
              confirm with the admissions office before you register for subjects.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-4">
              <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">English-taught entry</p>
              <p className="mt-1.5 text-[12.5px] text-ink-soft">
                {university.englishRequirement ?? "Not published — ask admissions."}
              </p>
            </div>
            <div className="panel p-4">
              <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">Chinese-taught entry</p>
              <p className="mt-1.5 text-[12.5px] text-ink-soft">
                {university.hskRequirement ?? "Not published — ask admissions."}
              </p>
            </div>
          </div>

          {university.popularMajors.length > 0 && (
            <div>
              <h2 className="font-display text-xl text-ink">Popular programmes</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {university.popularMajors.map((major) => (
                  <span
                    key={major}
                    className="rounded-full border border-line bg-card px-2.5 py-1 text-[11px] text-ink-soft"
                  >
                    {major}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="eyebrow">Application window</p>
            <p className="mt-2 flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-soft">
              <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
              {university.applicationDeadline ?? "Not published — check the university's international office."}
            </p>
          </div>

          <div className="panel p-5">
            <p className="eyebrow">Prepare for this profile</p>
            <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
              Based on the subject rules above, these are the papers to prioritise.
            </p>
            <div className="mt-3 space-y-1.5">
              {[
                { label: "Mathematics", code: "math" },
                { label: "Physics", code: "phys" },
                { label: "Chemistry", code: "chem" },
                { label: "Professional Chinese", code: "ch_hum" },
              ].map((subject) => (
                <Link
                  key={subject.code}
                  href={`/syllabus/${subject.code}`}
                  className="flex items-center justify-between rounded-md border border-line px-2.5 py-1.5 text-[11.5px] text-ink-soft transition hover:border-line-strong hover:text-ink"
                >
                  {subject.label}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>

          {nearby.length > 0 && (
            <div className="panel p-5">
              <p className="eyebrow">Also in {university.city}</p>
              <div className="mt-2 space-y-1.5">
                {nearby.map((entry) => (
                  <Link
                    key={entry.id}
                    href={`/universities/${entry.slug}`}
                    className="block truncate text-[11.5px] text-ink-soft hover:text-vermillion"
                  >
                    {entry.nameEn}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
