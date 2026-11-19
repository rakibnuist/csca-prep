import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock3, Layers, Play, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/site/section";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/jsonld";
import { SUBJECTS } from "@/lib/exam";
import { MathText } from "@/components/math-text";
import { chineseStemQuestions } from "../../../../../prisma/seed-data/questions/chinese-stem";
import { chineseStemExtraQuestions } from "../../../../../prisma/seed-data/questions/chinese-stem-extra";
import { mathQuestions } from "../../../../../prisma/seed-data/questions/math";
import { PAPER_STATS } from "@/lib/paper-stats";
import { OFFICIAL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "CSCA 模拟题与全真模考：48 题 / 60 分钟、80 题 / 90 分钟",
  description:
    "免费 CSCA 模拟题：五个科目按官方结构组卷，48 题 60 分钟、80 题 90 分钟，自动计时、自动交卷、逐题解析与科目分析。另附官方样题下载入口。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: `${SITE.url}/zh/moniti`,
    siteName: SITE.name,
    title: "CSCA 模拟题与全真模考：48 题 / 60 分钟、80 题 / 90 分钟",
    description: "按官方结构做题：数学、物理、化学 48 题 60 分钟；专业中文 80 题 90 分钟，含样题与解析。",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSCA 模拟题与全真模考：48 题 / 60 分钟、80 题 / 90 分钟",
    description: "按官方结构做题：数学、物理、化学 48 题 60 分钟；专业中文 80 题 90 分钟，含样题与解析。",
  },
  alternates: { canonical: "/zh/moniti", languages: { en: "/mocks", zh: "/zh/moniti", "x-default": "/mocks" } },
  keywords: ["CSCA 模拟题", "CSCA 模考", "CSCA 样题", "CSCA 真题", "CSCA 练习"],
};

export default function ZhMonitiPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "zh-CN",
          mainEntity: [
            {
              "@type": "Question",
              name: "CSCA 模拟题和真题一样吗？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "结构与时长一致（48 题/60 分钟、80 题/90 分钟，单项选择、满分 100、无倒扣分），题目由我们按官方大纲编写，不复制受保护的真题内容。官方公开样题可在 csca.cn 备考资源页下载。",
              },
            },
            {
              "@type": "Question",
              name: "免费吗？需要注册吗？",
              acceptedAnswer: {
                "@type": "Answer",
                text: `免费样题无需注册；注册免费账号可获得 25 套全真模拟卷（每科 5 套：原创卷与练习卷 01–04，各两次计时作答，共 50 次）、全部 ${PAPER_STATS.official + PAPER_STATS.review} 套官方真题与复习卷的自由浏览模式、54 节概念课、专题练习与错题复习队列。专业版解锁全部 ${PAPER_STATS.originals + PAPER_STATS.sets} 套模拟卷不限次数及官方卷计时模考。`,
              },
            },
            {
              "@type": "Question",
              name: "模考界面和真实考试一样吗？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "我们按官方文档复现了考试端流程：设备自检、诚信承诺、倒计时后全屏作答、左侧题号面板（已答显示绿色）、自动保存、时间到自动交卷、正式模式禁止提前交卷。",
              },
            },
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
            <Link href="/zh" className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-paper/60 transition hover:text-paper">
              <ArrowLeft className="h-3.5 w-3.5" /> 返回中文指南
            </Link>
            <Reveal>
            <Eyebrow className="text-paper/70">模拟题 · 全真结构</Eyebrow>
            <h1 className="display-lg mt-4 max-w-3xl text-balance text-paper">
              按官方结构做题：48 题 60 分钟，80 题 90 分钟。
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-paper/65">
              题库共 {PAPER_STATS.questions.toLocaleString()} 道题、{PAPER_STATS.total} 套试卷，五个科目全部按官方题量与时长组卷。计时以服务器时间为准，刷新页面不会多出时间。
            </p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-vermillion-light/40 bg-vermillion/15 px-2.5 py-1 text-[11px] font-medium text-vermillion-light">{PAPER_STATS.total} 套试卷</span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-paper/75">{PAPER_STATS.questions.toLocaleString()} 道题</span>
              <span className="inline-flex items-center rounded-full border border-jade-light/35 bg-jade/15 px-2.5 py-1 text-[11px] font-medium text-jade-light">逐题解析</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <Link href="/free-exam" className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-vermillion px-5 text-[13px] font-medium text-paper">
                免费 10 题体验 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/app/mocks" className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-line bg-card px-5 text-[13px] font-medium text-ink">
                <Play className="h-3.5 w-3.5" /> 进入模拟卷库
              </Link>
            </div>
          </div>
        </section>

        <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
          <article className="prose-edu min-w-0 max-w-none">
            <section id="structure">
              <h2>各科题量与时长</h2>
              <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
                <table className="w-full text-[12.5px]">
                  <thead>
                    <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                      <th className="px-3 py-2.5">科目</th>
                      <th className="px-3 py-2.5">题量</th>
                      <th className="px-3 py-2.5">时长</th>
                      <th className="px-3 py-2.5">每题平均</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-card">
                    {SUBJECTS.map((subject) => (
                      <tr key={subject.code}>
                        <td className="px-3 py-2.5 text-ink">
                          {subject.nameZh}
                          <span className="ml-1.5 text-[11px] text-ink-faint">{subject.nameEn}</span>
                        </td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{subject.questionCount}</td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">{subject.durationMin} 分钟</td>
                        <td className="px-3 py-2.5 text-ink-soft tabular">
                          {Math.round((subject.durationMin * 60) / subject.questionCount)} 秒
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                注意：每题平均只有 60–75 秒，包含读题时间。绝大多数失分来自节奏，而不是难度——这也是我们把计时做成服务器锚定的原因。
              </p>
            </section>

            <section id="client">
              <h2>界面按考试端复现</h2>
              <ul>
                <li>开考前：设备自检 → 诚信承诺 → 语言与模式选择 → 3-2-1 倒计时后全屏作答。</li>
                <li>作答中：左侧题号面板，已答题目标号显示为绿色；可标记待复查；答案自动保存。</li>
                <li>正式模式：禁止提前交卷，时间到自动交卷；切出窗口会记录并提示，模拟监考提醒。</li>
                <li>结束后：0–100 计分、科目逐一分析、错题进入复习队列，可打印成绩报告。</li>
              </ul>
              <p>
                我们无法复现的部分（人脸识别、第二机位监考、Windows 考试客户端）在页面上明确标注，不做假承诺。
              </p>
            </section>

            <section id="official">
              <h2>官方样题与大纲</h2>
              <p>
                CSCA 在官方备考资源页提供各科考试大纲，其中数学、物理、化学另有样题下载；专业中文目前暂无公开样题。建议两者结合：官方样题熟悉命题口径，我们的题库提供练习量与解析。
              </p>
              <p className="not-prose">
                <a
                  href={OFFICIAL.syllabus}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line bg-card px-4 text-[12px] font-medium text-ink"
                >
                  官方大纲与样题 <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </p>
            </section>

            <section id="why">
              <h2>为什么用模考而不是刷题</h2>
              <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: Clock3, title: "节奏", body: "真实计时下才知道哪一科会做不完。" },
                  { icon: Layers, title: "覆盖", body: "整卷跨所有考纲专题，暴露真实短板。" },
                  { icon: ShieldCheck, title: "诚信", body: "不押题、不宣称命中，只对结构负责。" },
                ].map((item) => (
                  <div key={item.title} className="panel min-w-0 p-4">
                    <item.icon className="h-4 w-4 text-vermillion" />
                    <p className="mt-2 text-[12.5px] font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>


            <section id="samples">
              <h2>中文样题：题目与解析</h2>
              <p>
                下面 8 道题来自题库，题型与真实试卷一致：专业中文考识解汉字、选词填空、辨析词语、选词成段、补全语句与阅读理解；数学为单项选择，四个选项，答错不扣分。
              </p>
              <div className="not-prose mt-4 space-y-3">
                {(() => {
                  const chinese = [...chineseStemQuestions, ...chineseStemExtraQuestions].slice(0, 6);
                  const maths = mathQuestions.slice(0, 2);
                  const items = [
                    ...chinese.map((item) => ({ ...item, subject: "理科中文" })),
                    ...maths.map((item) => ({ ...item, subject: "数学" })),
                  ];
                  return items.map((item, index) => (
                    <details key={`${item.topic}-${index}`} className="group rounded-xl border border-line bg-card px-4 py-3">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-[13px] font-medium text-ink">
                        <span className="flex min-w-0 gap-2">
                          <span className="shrink-0 text-ink-faint tabular">{String(index + 1).padStart(2, "0")}</span>
                          <span className="min-w-0 flex-1">
                            <span className="mr-2 rounded bg-paper-deep px-1.5 py-0.5 text-[10px] font-normal text-ink-soft">
                              {item.subject}
                            </span>
                            <MathText inline>{item.stem}</MathText>
                          </span>
                        </span>
                        <span className="mt-0.5 shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                      </summary>
                      <ol className="mt-3 space-y-1.5">
                        {item.options.map((option, optionIndex) => {
                          const isCorrect = optionIndex === item.correct;
                          return (
                            <li
                              key={optionIndex}
                              className={
                                isCorrect
                                  ? "flex items-start gap-2 rounded-lg border border-jade/40 bg-jade-soft/50 px-2.5 py-1.5 text-[12.5px] text-ink"
                                  : "flex items-start gap-2 px-2.5 py-1.5 text-[12.5px] text-ink-soft"
                              }
                            >
                              <span className="mt-0.5 w-4 shrink-0 text-[11px] font-semibold text-ink-faint">
                                {"ABCD"[optionIndex]}
                              </span>
                              <span className="min-w-0 flex-1">
                                <MathText inline>{option}</MathText>
                              </span>
                              {isCorrect && <span className="shrink-0 text-[10px] font-medium text-jade uppercase">正确</span>}
                            </li>
                          );
                        })}
                      </ol>
                      <div className="mt-3 rounded-lg bg-paper-deep/60 px-3 py-2 text-[12px] leading-relaxed text-ink-soft">
                        <span className="mr-1.5 text-[10px] font-medium tracking-[0.1em] text-ink-faint uppercase">解析</span>
                        <MathText>{item.explanation}</MathText>
                      </div>
                    </details>
                  ));
                })()}
              </div>
              <p className="not-prose mt-4">
                <Link href="/sample-questions" className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line bg-card px-4 text-[12px] font-medium text-ink">
                  50 道完整样题（英文页面） <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </p>
            </section>

            <p className="mt-8 flex items-center gap-2 text-[11px] text-ink-faint">
              <Check className="h-3.5 w-3.5" /> 来源：csca.cn 考试介绍与备考资源页、CSCA 考试规则与设备环境要求。{SITE.name} 为独立备考平台。
            </p>
          </article>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-5">
              <p className="text-[12px] font-medium text-ink">相关页面</p>
              <ul className="mt-2 space-y-1.5 text-[11.5px]">
                {[
                  ["/zh/kaoshi#dates", "考试时间与费用"],
                  ["/zh/kaoshi#scoring", "分数与百分位"],
                  ["/zh/wenda", "20 个常见问题"],
                  ["/sample-questions", "50 道样题（含解析）"],
                  ["/app/mocks", "模拟卷库（免费账号）"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-ink-soft hover:text-vermillion">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-paper-deep/40 p-4">
              <p className="text-[11.5px] font-medium text-ink">免费账号</p>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                包含 25 套模拟卷（每科 5 套、各两次作答）、{PAPER_STATS.official + PAPER_STATS.review} 套官方与复习卷浏览模式、知识点练习与错题复习。专业版解锁 {PAPER_STATS.originals + PAPER_STATS.sets} 套模拟卷不限次数及官方卷计时模考。
              </p>
              <Link href="/sign-up" className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-lg bg-ink text-[12px] font-medium text-paper">
                免费注册
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
