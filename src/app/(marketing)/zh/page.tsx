import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, CreditCard, Timer } from "lucide-react";
import { Eyebrow } from "@/components/site/section";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/jsonld";
import { OFFICIAL, SITE } from "@/lib/site";
import { SUBJECTS } from "@/lib/exam";
import { FAQ_TOTAL } from "@/lib/faq";

/**
 * Chinese-language landing page.
 *
 * Targets the queries Chinese-speaking applicants and counsellors type
 * (CSCA 考试, CSCA 模拟题, 考试科目), which the English market does not serve.
 * Every fact is the same verified set used in English; nothing is invented or
 * translated loosely.
 */
export const metadata: Metadata = {
  title: "CSCA 考试中文指南：科目、时长与模拟题",
  description:
    "来华留学本科入学学业水平测试（CSCA）中文指南：五个科目与题型、80题/90分钟与48题/60分钟的时长结构、考试时间、费用、成绩与有效期，以及免费全真模拟题。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: `${SITE.url}/zh`,
    siteName: SITE.name,
    title: "CSCA 考试 2026–2027：科目、时长、模拟题与备考（中文指南）",
    description: "五个科目与题型、80题/90分钟与48题/60分钟的时长结构、考试时间、费用、成绩与有效期。",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSCA 考试 2026–2027：科目、时长、模拟题与备考（中文指南）",
    description: "五个科目与题型、80题/90分钟与48题/60分钟的时长结构、考试时间、费用、成绩与有效期。",
  },
  alternates: {
    canonical: "/zh",
    languages: { en: "/", zh: "/zh", "x-default": "/" },
  },
  keywords: [
    "CSCA 考试",
    "CSCA 模拟题",
    "CSCA 考试科目",
    "来华留学本科入学学业水平测试",
    "CSCA 真题",
    "CSCA 备考",
    "CSCA 成绩",
  ],
};

const SUBJECT_ROWS = SUBJECTS.map((subject) => ({
  name: subject.nameZh,
  en: subject.nameEn,
  questions: subject.questionCount,
  minutes: subject.durationMin,
  language: subject.language === "zh" ? "中文" : "中文 / 英文",
}));

const FAQ = [
  {
    q: "CSCA 是什么考试？",
    a: "CSCA（来华留学本科入学学业水平测试，China Scholastic Competency Assessment）由国家留学基金管理委员会（CSC）组织，联合中国高校专家研发，面向计划赴中国攻读本科学位的国际学生。成绩作为中国高校本科招生及奖学金评审的重要参考之一。",
  },
  {
    q: "CSCA 有哪些科目？考试多长时间？",
    a: "共五个科目。专业中文（文科中文、理科中文）各 80 题、90 分钟；数学、物理、化学各 48 题、60 分钟。每科满分 100 分，全部为单项选择，无倒扣分。",
  },
  {
    q: "数学、物理、化学可以选英文吗？",
    a: "可以。基础科目提供中文和英文两种试卷，考生按拟申请院校要求选择；专业中文仅提供中文试卷。",
  },
  {
    q: "CSCA 什么时候考试？一年几次？",
    a: "每年 1 月、3 月、4 月、6 月、11 月、12 月共六次，每场考试分两天进行（北京时间）：第一天专业中文、数学，第二天物理、化学。开考时间按场次分为 08:00 与 14:00 两个时段，具体以官方通知和准考证为准。",
  },
  {
    q: "考试费用是多少？",
    a: "一科 450 元人民币，两科及以上 700 元人民币，仅通过 csca.cn 报名并使用信用卡支付。重考需重新报名并缴纳全额费用。",
  },
  {
    q: "成绩什么时候出？有效期多久？",
    a: "考试结束后 10 个工作日内公布，可在 CSCA 账户下载电子成绩报告。成绩自出具之日起两年内有效，考试次数不限，申请时可使用最佳有效成绩。",
  },
  {
    q: "居家网考需要什么设备？",
    a: "一台正版 64 位 Windows 10/11 电脑（不支持 macOS），分辨率不低于 1366×768，摄像头 720p 以上，麦克风与扬声器可用；另需一部手机或平板作为第二机位，置于身后约 45°。网络需上下行各 20 Mbps 以上。",
  },
  {
    q: "模拟题和真题一样吗？",
    a: "本平台的模拟题按照官方大纲和题型自行编写，结构与时长与真实考试一致（48 题/60 分钟、80 题/90 分钟）；官方公开的样题可在 csca.cn 备考资源页下载。我们不冒充官方试卷，也不承诺押题。",
  },
];

export default function ChineseLandingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "zh-CN",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            { "@type": "ListItem", position: 2, name: "中文指南", item: `${SITE.url}/zh` },
          ],
        }}
      />

      <div lang="zh-CN">
        <section className="grain relative overflow-hidden border-b border-line bg-night text-paper">
          <div aria-hidden className="grid-mesh pointer-events-none absolute inset-0 opacity-[0.18]" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(211,29,60,0.3),transparent_62%)] blur-3xl"
          />
          <div className="shell relative py-12 sm:py-16">
            <Reveal>
            <Eyebrow className="text-paper/70">CSCA 中文指南 · 2026 年 11 月核对</Eyebrow>
            <h1 className="display-lg mt-4 max-w-3xl text-balance text-paper">
              CSCA 考试：五个科目、两种卷长，一份说清楚的中文指南。
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-paper/65">
              来华留学本科入学学业水平测试（CSCA）由国家留学基金管理委员会组织。这份指南把科目、题型、时长、报名、费用、成绩与考场规则逐条写清楚，并标注官方来源；凡是我们的估计，都会明确标注为估计。
            </p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-vermillion-light/40 bg-vermillion/15 px-2.5 py-1 text-[11px] font-medium text-vermillion-light">5 个科目</span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] text-paper/75">48 题 / 60 分钟</span>
              <span className="inline-flex items-center rounded-full border border-jade-light/35 bg-jade/15 px-2.5 py-1 text-[11px] text-jade-light">80 题 / 90 分钟</span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] text-paper/75">成绩两年有效</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <Link
                href="/free-exam"
                className="btn-sheen inline-flex h-11 items-center gap-1.5 rounded-lg bg-vermillion px-5 text-[13px] font-medium text-paper transition hover:-translate-y-0.5"
              >
                免费 10 题模拟测试 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/sample-questions"
                className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-paper/25 px-5 text-[13px] font-medium text-paper transition hover:border-paper/50"
              >
                50 道样题（含解析）
              </Link>
            </div>
          </div>
        </section>

        <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
          <article className="prose-edu min-w-0 max-w-none">
            <section id="subjects">
              <h2>考试科目与试卷结构</h2>
              <p>
                专业中文（文科中文、理科中文）各 80 题、90 分钟，仅提供中文试卷；数学、物理、化学各 48
                题、60 分钟，可选中文或英文。每科满分 100 分，全部为单项选择题，答错与未答同样计零分，因此没有理由留空。
              </p>
              <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
                <table className="w-full text-[12.5px]">
                  <thead>
                    <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                      <th className="px-3 py-2.5">科目</th>
                      <th className="px-3 py-2.5">题量</th>
                      <th className="px-3 py-2.5">时长</th>
                      <th className="px-3 py-2.5">语言</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-card">
                    {SUBJECT_ROWS.map((row) => (
                      <tr key={row.en}>
                        <td className="px-3 py-2.5 font-medium text-ink">
                          {row.name}
                          <span className="ml-1.5 text-[11px] font-normal text-ink-faint">{row.en}</span>
                        </td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{row.questions}</td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{row.minutes} 分钟</td>
                        <td className="px-3 py-2.5 text-ink-soft">{row.language}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                专业中文的题型固定为六类：识解汉字、选词填空、辨析词语、选词成段、补全语句、阅读理解。文科中文取材于文学、哲学、法学、教育学、历史学与艺术；理科中文取材于数学符号与公式、物理定律、化学方程式、实验术语与学术阅读。
              </p>
            </section>

            <section id="dates">
              <h2>考试时间与费用</h2>
              <p>
                每年 1 月、3 月、4 月、6 月、11 月、12 月共六次，每场分两天进行（北京时间）：第一天专业中文、数学，第二天物理、化学。开考时间按场次分为 08:00 与 14:00 两个时段，具体以官方通知和准考证为准。报名窗口很短（例如
                2026 年 11 月场次为 10 月 15 日至 21 日），准考证生成后信息不可修改。
              </p>
              <div className="not-prose my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="panel p-4">
                  <CreditCard className="h-4 w-4 text-ink-faint" />
                  <p className="mt-2 font-display text-2xl text-ink">450 元</p>
                  <p className="text-[11.5px] text-ink-soft">一科 · 人民币</p>
                </div>
                <div className="panel p-4">
                  <CreditCard className="h-4 w-4 text-ink-faint" />
                  <p className="mt-2 font-display text-2xl text-ink">700 元</p>
                  <p className="text-[11.5px] text-ink-soft">两科及以上 · 人民币</p>
                </div>
              </div>
            </section>

            <section id="scores">
              <h2>成绩、有效期与重考</h2>
              <p>
                考试结束后 10 个工作日内公布成绩，电子成绩报告可在 CSCA 账户下载。成绩自出具之日起两年内有效；考试次数不限，重考需重新报名并缴纳全额费用，申请时可使用最佳有效成绩。各高校自行设定成绩要求，CSCA 不设全国统一及格线。
              </p>
            </section>

            <section id="rules">
              <h2>居家网考的关键规则</h2>
              <ul>
                <li>仅支持正版 64 位 Windows 10/11（不支持 macOS），分辨率 ≥1366×768，摄像头 720p 以上。</li>
                <li>必须双机位：第二机位置于身后约 45°，监考须能看清上半身、双手与电脑屏幕。</li>
                <li>网络上下行各 ≥20 Mbps；建议有线网络，并准备 4G 热点备用。</li>
                <li>禁止使用纸张、便签与普通笔；只可用小白板或透明文件袋内的空白纸＋可擦笔，考前展示空白、考后当面擦除。</li>
                <li>开考前 60 分钟开放登录（最晚考前 30 分钟前登录）并完成身份核验、人脸识别与 360° 环境检查；迟到不得入场。</li>
                <li>时间到自动交卷，不允许提前交卷；提前离开或违规可能被取消成绩，情节严重者两年内禁止报考。</li>
              </ul>
            </section>

            <section id="faq">
              <h2>常见问题</h2>
              <div className="not-prose mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
                {FAQ.map((item) => (
                  <details key={item.q} className="group px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[12.5px] font-medium text-ink">
                      <span className="min-w-0 flex-1">{item.q}</span>
                      <span className="mt-0.5 shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <p className="mt-8 text-[11px] leading-relaxed text-ink-faint">
              来源：csca.cn（考试介绍、考生须知、考试大纲）、CSCA 考试规则与设备环境要求。CSCA Master
              为独立备考平台，与国家留学基金管理委员会（CSC）无隶属关系；报名、缴费与成绩仅通过 csca.cn 办理。
            </p>
          </article>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-5">
              <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                <Timer className="h-3.5 w-3.5 text-ink-faint" /> 时间分配
              </p>
              <ul className="mt-2 space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
                <li>48 题 / 60 分钟 ≈ 每题 75 秒</li>
                <li>80 题 / 90 分钟 ≈ 每题 67.5 秒</li>
                <li>建议预留 5 分钟复查</li>
              </ul>
            </div>

            <div className="panel p-5">
              <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                <BookOpen className="h-3.5 w-3.5 text-ink-faint" /> 相关页面
              </p>
              <ul className="mt-2 space-y-1.5 text-[11.5px]">
                {[
                  ["/zh/kaoshi", "考试介绍与报名（中文）"],
                  ["/zh/moniti", "模拟题与全真模考（中文）"],
                  ["/zh/wenda", "20 个常见问题（中文）"],
                  ["/csca", "CSCA 完整指南（英文）"],
                  ["/csca/faq", `${FAQ_TOTAL} 条常见问题（英文）`],
                  ["/csca/passing-score", "成绩与 0–100 换算（英文）"],
                  ["/csca/test-centres", "考点与居家网考（英文）"],
                  ["/syllabus", "五个科目的考试大纲（英文）"],
                  ["/app/mocks", "全真模拟（48/60 · 80/90）"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-ink-soft hover:text-vermillion">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-5">
              <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                <CalendarDays className="h-3.5 w-3.5 text-ink-faint" /> 官方报名
              </p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">
                报名、缴费、准考证与成绩查询仅在官方平台办理。
              </p>
              <a
                href={OFFICIAL.site}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
              >
                csca.cn <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
