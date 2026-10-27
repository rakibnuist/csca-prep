import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, MapPin, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { removeSavedUniversityAction } from "@/lib/actions/universities";

export const metadata = { title: "Shortlist" };

export default async function SavedUniversitiesPage() {
  const session = await requireUser();

  const saved = await prisma.savedUniversity.findMany({
    where: { userId: session.id },
    include: { university: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Shortlist"
        title="The universities you are actually preparing for."
        body="Saving a university keeps its subject requirements beside your practice work. Start from the directory if the list is empty."
        action={
          <Link
            href="/universities"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-[12.5px] font-medium text-paper"
          >
            <Building2 className="h-3.5 w-3.5" /> Browse directory
          </Link>
        }
      />

      <AppBody>
        {saved.length === 0 ? (
          <div className="panel p-10 text-center">
            <Building2 className="mx-auto h-6 w-6 text-ink-faint" />
            <p className="mt-3 font-display text-2xl text-ink">No universities saved</p>
            <p className="mx-auto mt-2 max-w-sm text-[13px] text-ink-soft">
              Save two or three realistic targets and one stretch. Then check which CSCA subjects
              they actually require.
            </p>
            <Link
              href="/universities"
              className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper"
            >
              Find universities <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {saved.map((entry) => (
              <div key={entry.universityId} className="panel flex flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
                      {entry.university.nameEn}
                      {entry.university.verified && <BadgeCheck className="h-3.5 w-3.5 text-jade" />}
                    </p>
                    <p className="text-[10.5px] text-ink-faint">{entry.university.nameZh}</p>
                  </div>
                  <form action={removeSavedUniversityAction}>
                    <input type="hidden" name="universityId" value={entry.universityId} />
                    <button
                      type="submit"
                      aria-label="Remove from shortlist"
                      className="rounded-md border border-line p-1.5 text-ink-faint transition hover:border-vermillion/40 hover:text-vermillion"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-soft">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-ink-faint" /> {entry.university.city}
                  </span>
                  <span>{entry.university.scienceSubjectRule}</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <Link
                    href={`/universities/${entry.university.slug}`}
                    className="text-[11.5px] text-ink-soft hover:text-ink"
                  >
                    Requirements & deadlines
                  </Link>
                  <Link
                    href="/app/mocks"
                    className="inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
                  >
                    Practise <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </AppBody>
    </>
  );
}
