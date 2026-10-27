import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { SettingsForm } from "@/components/app/settings-form";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await requireUser();
  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return null;

  const attemptCount = await prisma.attempt.count({
    where: { userId: user.id, status: "SUBMITTED" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        body="Your profile shapes which papers and universities we put in front of you. It does not affect your scores."
      />

      <AppBody className="max-w-[820px]">
        <SettingsForm
          user={{
            name: user.name,
            country: user.country,
            track: user.track,
            targetYear: user.targetYear,
            testLanguage: user.testLanguage,
          }}
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Email", value: user.email },
            { label: "Member since", value: formatDate(user.createdAt) },
            { label: "Papers completed", value: String(attemptCount) },
          ].map((item) => (
            <div key={item.label} className="panel p-4">
              <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">{item.label}</p>
              <p className="mt-1 truncate text-[12.5px] text-ink">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-line bg-paper-deep/50 p-4">
          <p className="text-[11.5px] font-medium text-ink">Data & privacy</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
            We store your email, profile, attempts and practice history to run the product. We do not
            sell data and we never ask for your CSCA account credentials. To delete your account,
            email support and we will remove it within 7 days.
          </p>
        </div>
      </AppBody>
    </>
  );
}
