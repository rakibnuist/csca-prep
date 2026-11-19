import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getAccess } from "@/lib/access";
import { AppBody, PageHeader } from "@/components/app/page-header";
import { SettingsForm } from "@/components/app/settings-form";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { langFromTrack } from "@/lib/i18n";
import { getSectionTrack } from "@/lib/section";
import { trackMetaTitle } from "@/lib/tracks";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Settings", "设置");
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const session = await requireUser();
  const [{ saved }, user] = await Promise.all([
    searchParams,
    prisma.user.findUnique({ where: { id: session.id } }),
  ]);
  if (!user) return null;
  const lang = langFromTrack(await getSectionTrack(user.teachingTrack));
  const zh = lang === "zh";

  const [attemptCount, access] = await Promise.all([
    prisma.attempt.count({ where: { userId: user.id, status: "SUBMITTED" } }),
    getAccess(user.id),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={zh ? "账户" : "Account"}
        title={zh ? "设置" : "Settings"}
        body={
          zh
            ? "个人资料会影响我们为你推荐的试卷与院校。授课语言决定你的默认分区——两个分区不会混合试卷或题目，也不会影响你的分数。"
            : "Your profile shapes which papers and universities we put in front of you. Teaching language picks your default section — the two sections never mix papers or questions. It does not affect your scores."
        }
      />

      <AppBody className="max-w-[820px]">
        <SettingsForm
          lang={lang}
          initialSaved={saved === "1"}
          user={{
            name: user.name,
            country: user.country,
            track: user.track,
            targetYear: user.targetYear,
            teachingTrack: user.teachingTrack,
          }}
        />

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: zh ? "邮箱" : "Email", value: user.email },
            { label: "WhatsApp", value: user.whatsapp ?? (zh ? "未设置" : "Not set") },
            {
              label: zh ? "方案" : "Plan",
              value: zh
                ? access.plan === "LIFETIME"
                  ? "终身版"
                  : access.plan === "PRO"
                    ? "专业版"
                    : "免费版"
                : access.plan,
              link: access.isPro ? undefined : "/pricing",
            },
            { label: zh ? "注册时间" : "Member since", value: formatDate(user.createdAt) },
            { label: zh ? "已完成试卷" : "Papers completed", value: String(attemptCount) },
            { label: zh ? "国籍" : "Nationality", value: user.country ?? (zh ? "未设置" : "Not set") },
          ].map((item) => (
            <div key={item.label} className="panel p-4">
              <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">{item.label}</p>
              <p className="mt-1 truncate text-[12.5px] text-ink">{item.value}</p>
              {item.link && (
                <Link
                  href={item.link}
                  className="mt-1 inline-block text-[11px] font-medium text-vermillion hover:underline"
                >
                  {zh ? "升级" : "Upgrade"}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link
            href={`/${zh ? "cn" : "en"}/billing`}
            className="text-[12px] font-medium text-ink-soft underline underline-offset-2 hover:text-ink"
          >
            {zh ? "管理方案与兑换码 →" : "Manage plan & redeem a code →"}
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-paper-deep/50 p-4">
          <p className="text-[11.5px] font-medium text-ink">
            {zh ? "数据与隐私" : "Data & privacy"}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
            {zh
              ? "我们保存你的邮箱、资料、作答记录与练习历史，用于提供产品功能。我们不会出售数据，也绝不会索取你的 CSCA 账号信息。如需删除账号，请发邮件联系，我们会在 7 天内处理。"
              : "We store your email, profile, attempts and practice history to run the product. We do not sell data and we never ask for your CSCA account credentials. To delete your account, email support and we will remove it within 7 days."}
          </p>
        </div>
      </AppBody>
    </>
  );
}
