import Link from "next/link";
import { ArrowRight, BookOpen, Check, Crown, KeyRound, Play, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getAccess } from "@/lib/access";
import { AppBody, PageHeader } from "@/components/app/page-header";
import {
  EpayCheckout,
  OrderStatusBanner,
  type StudentOrderItem,
} from "@/components/app/epay-checkout";
import { ProRequestForm } from "@/components/app/pro-request-form";
import { RedeemForm } from "@/components/app/redeem-form";
import { formatDate } from "@/lib/utils";
import {
  FREE_ATTEMPTS_PER_ORIGINAL,
  FREE_ATTEMPTS_PER_SET,
  FREE_SETS_PER_SUBJECT,
} from "@/lib/entitlements";
import { PAPER_STATS, SITTABLE_PAPERS } from "@/lib/paper-stats";
import { getPublicPaymentMethods } from "@/lib/payments/epay";
import { trackLink, trackMetaTitle } from "@/lib/tracks";
import { getSectionTrack } from "@/lib/section";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  return trackMetaTitle(track, "Billing & plan", "订阅与方案");
}

const PLAN_LABEL: Record<string, { en: string; zh: string }> = {
  FREE: { en: "Free", zh: "免费版" },
  PRO: { en: "Pro", zh: "专业版" },
  LIFETIME: { en: "Lifetime", zh: "终身版" },
};

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const session = await requireUser();
  const { order: orderQuery } = await searchParams;
  const orderTradeNo = typeof orderQuery === "string" ? orderQuery.trim() : "";

  const [access, profile, paymentMethods, recentOrderRows, highlightedOrderRow] = await Promise.all([
    getAccess(session.id),
    prisma.user.findUnique({
      where: { id: session.id },
      select: { name: true, email: true, whatsapp: true, country: true },
    }),
    getPublicPaymentMethods(),
    prisma.order.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        tradeNo: true,
        plan: true,
        status: true,
        totalAmountCents: true,
        paymentMethodName: true,
        payUrl: true,
        paidAt: true,
        createdAt: true,
      },
    }),
    orderTradeNo
      ? prisma.order.findFirst({
          where: { tradeNo: orderTradeNo, userId: session.id },
          select: {
            tradeNo: true,
            plan: true,
            status: true,
            totalAmountCents: true,
            paymentMethodName: true,
            payUrl: true,
            paidAt: true,
            createdAt: true,
          },
        })
      : Promise.resolve(null),
  ]);

  const track = await getSectionTrack(session.teachingTrack);
  const zh = track === "CN";
  const planName = (PLAN_LABEL[access.plan] ?? PLAN_LABEL.FREE)[zh ? "zh" : "en"];

  const recentOrders: StudentOrderItem[] = recentOrderRows.map((o) => ({
    tradeNo: o.tradeNo,
    plan: o.plan,
    status: o.status,
    totalAmountCents: o.totalAmountCents,
    paymentMethodName: o.paymentMethodName,
    payUrl: o.payUrl,
    paidAt: o.paidAt ? o.paidAt.toISOString() : null,
    createdAt: o.createdAt.toISOString(),
  }));

  const highlightedOrder: StudentOrderItem | null = highlightedOrderRow
    ? {
        tradeNo: highlightedOrderRow.tradeNo,
        plan: highlightedOrderRow.plan,
        status: highlightedOrderRow.status,
        totalAmountCents: highlightedOrderRow.totalAmountCents,
        paymentMethodName: highlightedOrderRow.paymentMethodName,
        payUrl: highlightedOrderRow.payUrl,
        paidAt: highlightedOrderRow.paidAt ? highlightedOrderRow.paidAt.toISOString() : null,
        createdAt: highlightedOrderRow.createdAt.toISOString(),
      }
    : null;

  return (
    <>
      <PageHeader
        eyebrow={zh ? "订阅" : "Billing"}
        title={
          access.isPro
            ? zh
              ? "专业版已开通。"
              : "Your Pro access is active."
            : zh
              ? "开通专业版。"
              : "Upgrade to Pro."
        }
        body={
          access.isPro
            ? zh
              ? "所有模拟卷与官方真题不限次数，并包含自适应学习计划。"
              : "Unlimited attempts on every mock and official paper, plus the adaptive study plan."
            : zh
              ? "支持在线支付即时开通，也可以在下方输入兑换码激活专业版。"
              : "Pay online for instant activation, or redeem a Pro code below."
        }
      />

      <AppBody className="max-w-[920px]">
        {highlightedOrder ? (
          <OrderStatusBanner initialOrder={highlightedOrder} track={track} />
        ) : null}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Current plan */}
          <div className="panel min-w-0 p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">
                {zh ? "当前方案" : "Current plan"}
              </p>
              {access.isPro ? (
                <Sparkles className="h-4 w-4 text-gold" />
              ) : (
                <KeyRound className="h-4 w-4 text-ink-faint" />
              )}
            </div>
            <p className="mt-3 font-display text-4xl text-ink">{planName}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
              {access.plan === "FREE"
                ? zh
                  ? `每套原创模拟卷 ${FREE_ATTEMPTS_PER_ORIGINAL} 次，每科练习卷 01–${FREE_SETS_PER_SUBJECT} 各 ${FREE_ATTEMPTS_PER_SET} 次，官方真题可免费学习。`
                  : `${FREE_ATTEMPTS_PER_ORIGINAL} attempts on each original mock, ${FREE_ATTEMPTS_PER_SET} attempts on practice sets 01–${FREE_SETS_PER_SUBJECT} per subject, and every official paper free to study.`
                : access.plan === "LIFETIME"
                  ? zh
                    ? "全部功能、全部试卷，永不过期。"
                    : "Every feature, on every paper, with no expiry."
                  : zh
                    ? `生效中${access.proExpiresAt ? `，有效期至 ${formatDate(access.proExpiresAt)}` : ""}${access.proDaysLeft != null ? ` · 剩余 ${access.proDaysLeft} 天` : ""}。`
                    : `Active${access.proExpiresAt ? ` until ${formatDate(access.proExpiresAt)}` : ""}${access.proDaysLeft != null ? ` · ${access.proDaysLeft} days left` : ""}.`}
            </p>

            <ul className="mt-5 space-y-2.5 text-[12.5px] text-ink-soft">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" />
                <span>
                  {zh ? (
                    <>
                      全部 {PAPER_STATS.official + PAPER_STATS.review} 套官方真题与复习卷 —— 所有账号
                      <span className="font-medium text-ink">免费学习</span>
                    </>
                  ) : (
                    <>
                      All {PAPER_STATS.official + PAPER_STATS.review} official papers —{" "}
                      <span className="font-medium text-ink">study free</span> on every account
                    </>
                  )}
                </span>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" />
                <span>
                  {zh
                    ? `题库全部 ${PAPER_STATS.questions.toLocaleString()} 道题目与专题练习`
                    : `All ${PAPER_STATS.questions.toLocaleString()} questions, lessons and topic drills`}
                </span>
              </li>
              <li className="flex gap-2">
                {access.isPro ? (
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                ) : (
                  <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-ink-faint">·</span>
                )}
                <span className={access.isPro ? "text-ink" : ""}>
                  {zh
                    ? `全库 ${SITTABLE_PAPERS} 套模拟卷不限作答次数`
                    : `Unlimited attempts on all ${SITTABLE_PAPERS} mock papers`}
                </span>
              </li>
              <li className="flex gap-2">
                {access.isPro ? (
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                ) : (
                  <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-ink-faint">·</span>
                )}
                <span className={access.isPro ? "text-ink" : ""}>
                  {zh
                    ? "在官方计时模式下作答真题并按标准评分"
                    : "Sit official papers on the clock, scored against the published key"}
                </span>
              </li>
              <li className="flex gap-2">
                {access.isPro ? (
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                ) : (
                  <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-ink-faint">·</span>
                )}
                <span className={access.isPro ? "text-ink" : ""}>
                  {zh ? "自适应学习计划与完整历史记录" : "Adaptive study plan and full history"}
                </span>
              </li>
            </ul>

            {access.isPro && (
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href={trackLink("/app/mocks", track)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-vermillion px-4 text-[12.5px] font-medium text-paper transition hover:bg-vermillion-deep"
                >
                  <Play className="h-3.5 w-3.5" /> {zh ? "做一套模拟卷" : "Sit a mock"}
                </Link>
                <Link
                  href={trackLink("/app/official", track)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-4 text-[12.5px] font-medium text-ink transition hover:border-ink/30"
                >
                  <BookOpen className="h-3.5 w-3.5" /> {zh ? "官方真题" : "Official papers"}
                </Link>
              </div>
            )}
          </div>

          {/* Redeem */}
          <div
            id="redeem"
            className={
              access.isPro
                ? "panel min-w-0 p-6"
                : "min-w-0 scroll-mt-24 rounded-2xl border border-vermillion/25 bg-vermillion/5 p-6"
            }
          >
            <div className="flex items-center gap-2">
              {!access.isPro && <Crown className="h-4 w-4 text-vermillion" />}
              <p className="text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                {access.isPro
                  ? zh
                    ? "兑换更多兑换码"
                    : "Redeem another code"
                  : zh
                    ? "输入你的专业版兑换码"
                    : "Redeem your Pro code"}
              </p>
            </div>
            <p className="mt-2 font-display text-xl text-ink">
              {access.isPro
                ? zh
                  ? "续期或升级"
                  : "Extend or upgrade"
                : zh
                  ? "开通专业版权限"
                  : "Activate Pro access"}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              {access.isPro
                ? zh
                  ? "还有新的兑换码？在此输入。按月生效的兑换码会自动顺延当前有效期。"
                  : "Have another code? Redeem it here. Time-based codes extend your current access."
                : zh
                  ? `输入你收到的兑换码即可立即生效——不限次数作答全部 ${SITTABLE_PAPERS} 套模拟卷，并解锁官方真题计时模式。`
                  : `Enter the code you received. It applies instantly — unlimited attempts on all ${SITTABLE_PAPERS} mock papers and the ability to sit every official paper on the clock.`}
            </p>

            <div className="mt-5">
              <RedeemForm track={track} />
            </div>

            {!access.isPro && (
              <p className="mt-4 text-[11px] leading-relaxed text-ink-faint">
                {zh ? (
                  <>
                    还没有兑换码？可在下方在线支付开通，或{" "}
                    <Link href="/pricing" className="font-medium text-vermillion underline underline-offset-2">
                      查看专业版权益说明
                    </Link>
                    。
                  </>
                ) : (
                  <>
                    Don&apos;t have a code? Pay online below or{" "}
                    <Link href="/pricing" className="font-medium text-vermillion underline underline-offset-2">
                      see what&apos;s included
                    </Link>
                    .
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        {/* EPay Checkout + Order History */}
        <div className="mt-6">
          <EpayCheckout
            track={track}
            currentPlan={access.plan}
            methods={paymentMethods}
            recentOrders={recentOrders}
          />
        </div>

        {!access.isPro && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-xl border border-line bg-card p-6">
              <p className="text-[11px] font-medium tracking-[0.14em] text-vermillion uppercase">
                {zh ? "需要人工协助或机构对公？" : "Need manual billing or an invoice?"}
              </p>
              <h2 className="mt-1 font-display text-xl text-ink">
                {zh ? "直接申请开通专业版" : "Request direct Pro activation"}
              </h2>
              <p className="mt-1 mb-4 text-[12.5px] leading-relaxed text-ink-soft">
                {zh
                  ? "填写下方信息，管理员会通过 WhatsApp 或邮箱直接向你发送可用兑换码或付款链接。"
                  : "Submit your contact details below and our admissions desk will reach out with a voucher or invoice directly."}
              </p>
              <ProRequestForm
                name={profile?.name ?? ""}
                email={profile?.email ?? session.email}
                whatsapp={profile?.whatsapp ?? ""}
                country={profile?.country ?? ""}
                zh={zh}
              />
            </div>

            <div className="rounded-xl border border-line bg-card p-6">
              <p className="text-[12.5px] font-medium text-ink">
                {zh ? "永远保持免费的内容" : "What stays free, always"}
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
                {zh
                  ? `免费版不是试用版。你可以长期享有每套原创模拟卷 ${FREE_ATTEMPTS_PER_ORIGINAL} 次作答、每科练习卷 01–${FREE_SETS_PER_SUBJECT} 各 ${FREE_ATTEMPTS_PER_SET} 次作答、全部专题练习，以及所有官方真题的学习模式——无需银行卡、永不过期。专业版仅增加不限次计时模拟。`
                  : `The free tier is not a trial. You keep ${FREE_ATTEMPTS_PER_ORIGINAL} attempts on each of the ${PAPER_STATS.originals} original mock papers, ${FREE_ATTEMPTS_PER_SET} attempts on practice sets 01–${FREE_SETS_PER_SUBJECT} of every subject, every lesson and topic drill, and the full official archive in study mode — with no card and no expiry. Pro is for unlimited timed sitting.`}
              </p>
              <Link
                href="/pricing"
                className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-ink-soft transition hover:text-ink"
              >
                {zh ? "对比免费版与专业版" : "Compare Free and Pro"} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </AppBody>
    </>
  );
}
