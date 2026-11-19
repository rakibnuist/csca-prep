import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileCheck2, IdCard, Ticket } from "lucide-react";
import { Eyebrow } from "@/components/site/section";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/jsonld";
import { EXAM_BLOCKS, OFFICIAL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "CSCA 考试介绍：科目、报名与考试当天",
  description:
    "CSCA 考试中文介绍：适用人群与院校范围、五个科目如何选择、报名所需材料与费用、准考证与成绩查询流程，另附考试时间与费用、成绩与百分位、常见误解与官方来源。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: `${SITE.url}/zh/kaoshi`,
    siteName: SITE.name,
    title: "CSCA 考试介绍：谁需要考、考哪些科目、怎么报名",
    description: "谁需要参加、科目与卷长、报名材料与费用、考场与成绩规则，逐条标注官方来源。",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSCA 考试介绍：谁需要考、考哪些科目、怎么报名",
    description: "谁需要参加、科目与卷长、报名材料与费用、考场与成绩规则，逐条标注官方来源。",
  },
  alternates: { canonical: "/zh/kaoshi", languages: { en: "/csca", zh: "/zh/kaoshi", "x-default": "/csca" } },
  keywords: ["CSCA 考试介绍", "CSCA 谁需要考", "CSCA 报名流程", "来华留学本科入学学业水平测试"],
};

const FAQ = [
  {
    q: "CSCA 是必考的吗？",
    a: "由接收院校决定。申请中国政府奖学金本科项目、以及申请中文授课项目的考生，按 CSCA 规定需要参加相应科目；其他项目是否要求，以院校当年招生简章为准。CSCA 成绩是招生与奖学金评审的重要参考之一，但不是唯一标准，也不保证录取。",
  },
  {
    q: "我应该考哪几科？",
    a: "数学为必考。专业中文（文科中文或理科中文）按拟申请专业选择：文科类多考文科中文，理工类多考理科中文。物理、化学是否选考，取决于专业要求——理工、农、医类通常至少需要其中一科。最终组合以院校专业要求为准。",
  },
  {
    q: "报名需要哪些材料？",
    a: "一个可长期使用的邮箱、有效身份证件（通常为护照）、符合要求的电子证件照，以及可支付考试费用的信用卡（Visa 或 Mastercard）。所填信息必须与护照及后续院校申请材料完全一致。",
  },
  {
    q: "报名后可以改科目或改时间吗？",
    a: "不可以。报名信息提交后即锁定；准考证生成前可申请更正或退考，准考证生成后不再接受任何修改，也不接受退考申请。",
  },
  {
    q: "准考证什么时候可以下载？",
    a: "考试前在报名系统开放下载，并会通过邮件通知。准考证上包含姓名、证件信息、考试日期与科目、考点与座位号；信息与证件不一致将无法入场。",
  },
  {
    q: "成绩怎么查？",
    a: "考试结束后 10 个工作日内，登录 csca.cn 账户下载电子成绩报告。成绩自出具之日起两年内有效。",
  },
];

export default function ZhKaoshiPage() {
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
            <Eyebrow className="text-paper/70">CSCA 考试介绍 · 2026 年 11 月核对</Eyebrow>
            <h1 className="display-lg mt-4 max-w-3xl text-balance text-paper">
              谁需要考 CSCA、考哪些科目、怎么报名。
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-paper/65">
              来华留学本科入学学业水平测试（CSCA）由国家留学基金管理委员会（CSC）组织。本页面把适用范围、科目选择、报名材料与成绩流程讲清楚，并标注官方来源；涉及具体院校要求的，一律建议以院校书面答复为准。
            </p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-vermillion-light/40 bg-vermillion/15 px-2.5 py-1 text-[11px] font-medium text-vermillion-light">数学必考</span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-paper/75">专业中文按专业方向</span>
              <span className="inline-flex items-center rounded-full border border-jade-light/35 bg-jade/15 px-2.5 py-1 text-[11px] font-medium text-jade-light">成绩两年有效</span>
            </div>
          </div>
        </section>

        <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
          <article className="prose-edu min-w-0 max-w-none">
            <section id="who">
              <h2>谁需要参加</h2>
              <p>
                CSCA 面向计划赴中国攻读本科学位的非中国籍学生。持有中国护照，或持有香港、澳门、台湾地区居留身份者不能报名。报名没有年龄限制，但未满 18 岁的考生需由监护人同意并协助完成报名。
              </p>
              <p>
                是否需要成绩由接收院校决定：中国政府奖学金本科项目申请人，以及中文授课项目申请人，按 CSCA 规定必须参加相应科目；其他项目是否要求，以院校当年招生简章为准。CSCA 成绩是重要参考之一，但不是唯一录取标准。
              </p>
            </section>

            <section id="subjects">
              <h2>科目怎么选</h2>
              <ul>
                <li><strong>数学：</strong>所有考生必考，无免考。</li>
                <li><strong>专业中文：</strong>分文科中文与理科中文，按拟申请专业方向选择；以中文授课的项目通常必须提供。</li>
                <li><strong>物理 / 化学：</strong>按专业要求选考；理工、农、医类通常至少需要其中一科。部分院校对特定专业有指定要求。</li>
              </ul>
              <p>
                科目组合选错的代价很高：报名费不退，准考证生成后无法更改。报名前请把院校专业的科目要求确认到书面。
              </p>
            </section>

            <section id="register">
              <h2>报名流程</h2>
              <div className="not-prose my-5 space-y-2">
                {[
                  { icon: FileCheck2, title: "准备材料", body: "邮箱、护照、电子证件照、可支付外币的信用卡（Visa / Mastercard）。" },
                  { icon: IdCard, title: "填写信息", body: "姓名与证件信息必须与护照一致，后续院校申请也需保持一致。" },
                  { icon: Ticket, title: "缴费与确认", body: "一科 450 元，两科及以上 700 元人民币；收到确认邮件即报名完成。" },
                ].map((step) => (
                  <div key={step.title} className="flex gap-3 rounded-xl border border-line bg-card px-4 py-3">
                    <step.icon className="mt-0.5 h-4 w-4 shrink-0 text-vermillion" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-medium text-ink">{step.title}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>
                报名窗口通常只有一周左右（例如 2026 年 11 月场次为 10 月 15 日至 21 日），且仅在 csca.cn 办理；任何第三方网站都不能代报名或保留考位。
              </p>
            </section>

            <section id="results">
              <h2>成绩与有效期</h2>
              <p>
                考试结束后 10 个工作日内公布成绩，电子报告可在账户下载，自出具之日起两年内有效。考试次数不限，重考按新报名缴纳费用；申请时可使用最佳有效成绩。各院校自行设定成绩要求，CSCA 不设全国统一及格线。
              </p>
            </section>


            <section id="exempt">
              <h2>免考与例外</h2>
              <p>
                CSCA 本身只规定：专业中文对申请中国政府奖学金本科项目、以及中文授课项目的考生为必考科目。除此之外的“免考”都属于院校安排，不是 CSCA 规则：
              </p>
              <ul>
                <li><strong>非奖学金英文授课项目：</strong>部分院校可免专业中文，另一部分仍然要求（中国政府奖学金考生仍须参加专业中文）。数学（以及该项目要求的理科选考）始终适用。</li>
                <li><strong>汉语言类专业：</strong>部分院校接受 HSK 四级及以上替代专业中文；CSCA 官方并未承诺此替代。</li>
                <li><strong>没有自动免考：</strong>务必在报名前拿到招生办的书面确认，一次误判的代价是一门 90 分钟的考试和报名费。</li>
              </ul>
            </section>

            <section id="day">
              <h2>考试当天要点</h2>
              <ul>
                <li>开考前 60 分钟开放登录（最晚考前 30 分钟前登录）并完成设备检查、人脸识别与身份核验；考试开始后不得入场。</li>
                <li>居家网考为双机位：主机位为 Windows 电脑（不支持 macOS），第二机位置于身后约 45°。</li>
                <li>网络上下行各 ≥20 Mbps；建议有线网络，并准备 4G 热点备用。</li>
                <li>草稿只可用小白板或透明文件袋内的空白纸＋可擦笔；考前展示空白，考后当面擦除。</li>
                <li>时间到自动交卷，不允许提前交卷；切出窗口会被记录并提示。</li>
              </ul>
              <p>
                完整设备规格、违规分级与签到流程见 <Link href="/test-day">考试当天规则</Link> 页面。
              </p>
            </section>

            <section id="plan">
              <h2>六周备考安排（示例）</h2>
              <div className="not-prose my-5 space-y-2">
                {[
                  { w: "第 1 周", t: "摸底", b: "每个科目完整做一套卷（48 题/60 分钟、80 题/90 分钟），记录每科用时与正确率。" },
                  { w: "第 2–3 周", t: "补基础", b: "按正确率排序，主攻最弱两个专题；每次 10–20 题，做完立刻看解析。" },
                  { w: "第 4 周", t: "提速", b: "限时做半套题，目标是把每题用时压到 75 秒（中文 67.5 秒）以内。" },
                  { w: "第 5 周", t: "整卷", b: "隔天一套完整试卷，重点看错题是否重复出现同一专题。" },
                  { w: "第 6 周", t: "还原考场", b: "按考试时间作息，用模拟考试端流程（设备自检→诚信承诺→全屏作答）熟悉节奏。" },
                ].map((item) => (
                  <div key={item.w} className="flex gap-3 rounded-xl border border-line bg-card px-4 py-3">
                    <span className="shrink-0 text-[11px] font-medium tracking-[0.08em] text-vermillion uppercase">{item.w}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-medium text-ink">{item.t}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{item.b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>


            <section id="dates">
              <h2>考试时间与费用</h2>
              <p>
                2026 年起每年六次考试：<strong>1 月、3 月、4 月、6 月、11 月、12 月</strong>。每次考试分两天进行，覆盖全部五科。所有场次全球同时开考，因此在中国的下午场，对亚太区考生最方便，欧洲、非洲与美洲考生则在上午或凌晨作答。
              </p>
              <div className="not-prose my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-card p-4">
                  <p className="font-display text-2xl text-ink">450 元</p>
                  <p className="text-[11.5px] text-ink-soft">单科</p>
                </div>
                <div className="rounded-xl border border-line bg-card p-4">
                  <p className="font-display text-2xl text-ink">700 元</p>
                  <p className="text-[11.5px] text-ink-soft">两科及以上</p>
                </div>
              </div>
              <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[520px] text-[12.5px]">
                  <thead>
                    <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                      <th className="px-3 py-2.5">日期</th>
                      <th className="px-3 py-2.5">科目</th>
                      <th className="px-3 py-2.5">北京时间 · 08:00 场</th>
                      <th className="px-3 py-2.5">北京时间 · 14:00 场</th>
                      <th className="px-3 py-2.5">时长</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-card">
                    {EXAM_BLOCKS["08:00"].map((early, i) => {
                      const late = EXAM_BLOCKS["14:00"][i];
                      const dayZh = early.day === "Day 1" ? "第 1 天" : "第 2 天";
                      const subjectZh = early.subject.startsWith("Professional Chinese")
                        ? "专业中文（文科 / 理科）"
                        : early.subject === "Mathematics"
                          ? "数学"
                          : early.subject === "Physics"
                            ? "物理"
                            : early.subject === "Chemistry"
                              ? "化学"
                              : early.subject;
                      return (
                        <tr key={early.subject}>
                          <td className="px-3 py-2.5 text-[11px] tracking-[0.1em] text-ink-faint">{dayZh}</td>
                          <td className="px-3 py-2.5 text-ink">{subjectZh}</td>
                          <td className="px-3 py-2.5 text-ink-soft tabular">{early.time}</td>
                          <td className="px-3 py-2.5 text-ink-soft tabular">{late.time}</td>
                          <td className="px-3 py-2.5 text-ink-soft tabular">{early.minutes} 分钟</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p>
                每场考试的开考时间分为 08:00 与 14:00 两个时段，具体场次以官方通知和准考证为准。报名窗口很短：2026 年 11 月场次仅开放七天（10 月 15–21 日）。<strong>准考证生成后信息即锁定</strong>——不能改科目、改时间、改考点，也不接受退考。请在窗口开放前决定场次，而不是在窗口内临时决定。
              </p>
            </section>

            <section id="timeline">
              <h2>申请时间线</h2>
              <p>
                大多数可避免的错误是顺序错误：语言成绩出得太晚、CSCA 与院校申请截止日冲突、或者以为成绩可以随时生成。正确顺序是：
              </p>
              <ol className="not-prose my-5 space-y-2">
                {[
                  ["提前 8–10 个月", "确认目标院校与专业，拿到书面科目要求"],
                  ["提前 6 个月", "确认是否需要专业中文、是否适用免考，并确定语言成绩时间表"],
                  ["报名窗口开启时", "在 csca.cn 完成注册与缴费；准备好护照与证件照"],
                  ["考前 1–2 周", "下载准考证，完成设备与网络自检，按考试日作息演练一次"],
                  ["考后 10 个工作日内", "成绩公布；确认是否需要补考或加考科目"],
                  ["成绩公布后", "提交院校申请，使用有效的成绩报告"],
                ].map(([when, what]) => (
                  <li key={when} className="flex gap-3 rounded-xl border border-line bg-card px-4 py-3">
                    <span className="w-[92px] shrink-0 text-[10.5px] font-medium tracking-[0.06em] text-indigo uppercase">{when}</span>
                    <span className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-ink-soft">{what}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section id="scoring">
              <h2>分数与百分位</h2>
              <p>
                每科满分 100 分，答错不扣分，因此<strong>留空永远不优于猜测</strong>。没有全国统一及格线，各院校自定最低要求。
              </p>
              <p>
                院校在成绩报告上看到的不只是原始分，还有<strong>全球百分位</strong>。同样 70 分，在平均 55 分的群体里与在平均 75 分的群体里，含义并不相同。我们的<Link href="/app/dashboard">学习面板</Link>显示的是<strong>模拟百分位</strong>，并明确标注为估计值——我们无法获得真实考生群体数据。
              </p>
              <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
                <table className="w-full text-[12.5px]">
                  <thead>
                    <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                      <th className="px-4 py-2.5">分数区间</th>
                      <th className="px-4 py-2.5">通常意味着</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-card">
                    {[
                      ["85–100", "在顶尖院校短名单中具竞争力。"],
                      ["70–84", "对大多数中国政府奖学金项目而言具备竞争力。"],
                      ["50–69", "多数院校可以接受，但对第一梯队偏弱。"],
                      ["50 分以下", "先重建基础，再考虑重考。"],
                    ].map(([band, note]) => (
                      <tr key={band}>
                        <td className="px-4 py-2.5 font-medium text-ink tabular">{band}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11.5px] text-ink-faint">
                以上区间是我们的备考经验划分，不是官方标准。官方只公布 0–100 的计分方式，不公布及格线。
              </p>
            </section>

            <section id="myths">
              <h2>关于 CSCA 的六个常见误解</h2>
              <div className="not-prose my-5 space-y-2">
                {[
                  ["“CSCA 可以代替 HSK。”", "不能。CSCA 考查学术能力与学术中文，HSK 是独立的语言证书。部分院校对汉语言类专业接受 HSK 四级替代专业中文，这是院校安排，不是 CSCA 的替代关系。"],
                  ["“60 分及格。”", "没有及格线。每科 0–100 分，各院校自定最低要求——同一个分数在一所学校足够，在另一所可能不够。"],
                  ["“英文授课就完全不用考专业中文。”", "CSCA 规定专业中文对中国政府奖学金申请者与中文授课项目为必考；部分院校对英文授课项目有免考安排，务必拿到书面确认。"],
                  ["“可以随便选居家网考。”", "居家网考只在所在地区没有机考或纸笔考点时提供。有考点就必须去考点。"],
                  ["“可以带草稿纸。”", "纸、便签、普通笔一律禁止。只允许小白板＋可擦笔，或透明文件袋内的空白纸，考前展示空白，考后当着镜头擦除。"],
                  ["“考完可以改时间。”", "准考证生成后不能改期、改科目、改考点，也不退费。"],
                ].map(([myth, fact]) => (
                  <div key={myth} className="rounded-xl border border-line bg-card px-4 py-3">
                    <p className="text-[12.5px] font-medium text-ink">{myth}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{fact}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="compare">
              <h2>CSCA、HSK 与 SAT 的区别</h2>
              <div className="not-prose my-5 overflow-x-auto rounded-xl border border-line">
                <table className="w-full text-[12.5px]">
                  <thead>
                    <tr className="bg-paper-deep/70 text-left text-[10.5px] tracking-[0.1em] text-ink-faint uppercase">
                      <th className="px-3 py-2.5">考试</th>
                      <th className="px-3 py-2.5">考查什么</th>
                      <th className="px-3 py-2.5">谁需要</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-card">
                    {[
                      ["CSCA", "学术能力 + 学术中文（五科）", "CGS 申请者、中文授课项目申请者"],
                      ["HSK", "中文语言水平（1–6 级）", "院校语言要求，多数专业需要 HSK 4 以上"],
                      ["SAT / A-Level", "英美体系学术能力", "部分院校对国际课程背景考生的替代材料"],
                    ].map(([exam, what, who]) => (
                      <tr key={exam}>
                        <td className="px-3 py-2.5 font-medium text-ink">{exam}</td>
                        <td className="px-3 py-2.5 text-ink-soft">{what}</td>
                        <td className="px-3 py-2.5 text-ink-soft">{who}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>三者不互相替代。HSK 证明语言，CSCA 证明你能用中文完成本科学业。</p>
            </section>

            <section id="prepare">
              <h2>按专业准备</h2>
              <p>
                不同专业要求的科目组合不同：医学通常数学＋化学，工程通常数学＋物理，经济与法学通常数学（中文授课另加专业中文）。我们已经把这八类专业的科目要求逐条写清楚：
              </p>
              <div className="not-prose my-4 flex flex-wrap gap-2">
                {[
                  ["/csca/programmes/mbbs", "临床医学"],
                  ["/csca/programmes/civil-engineering", "土木工程"],
                  ["/csca/programmes/mechanical-engineering", "机械工程"],
                  ["/csca/programmes/computer-science", "计算机"],
                  ["/csca/programmes/business", "经济与金融"],
                  ["/csca/programmes/architecture", "建筑学"],
                  ["/csca/programmes/law", "法学"],
                  ["/csca/programmes/chinese-language", "汉语言文学"],
                ].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-full border border-line bg-card px-3 py-1.5 text-[11.5px] text-ink-soft transition hover:border-indigo/40 hover:text-indigo"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <p className="text-[11.5px] text-ink-faint">
                这些页面为英文，科目组合与院校差异均有标注。中文页面正在补齐。
              </p>
            </section>

            <section id="resource-map">
              <h2>资源地图</h2>
              <div className="not-prose my-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  ["/zh/moniti", "模拟题与样题", "48 题 60 分钟、80 题 90 分钟的完整试卷"],
                  ["/zh/wenda", "20 个常见问题", "报名、科目、设备、考场与成绩"],
                  ["/csca", "完整英文指南", "2,800 词的逐条说明，含官方来源"],
                  ["/test-day", "考试当天规则", "设备、房间、签到与违规分级"],
                  ["/csca/passing-score", "分数解读", "0–100 如何计算，为何没有及格线"],
                  ["/csca/universities", "院校要求", "如何向招生办要到书面科目要求"],
                ].map(([href, title, body]) => (
                  <Link key={href} href={href} className="rounded-xl border border-line bg-card px-4 py-3 transition hover:border-indigo/40">
                    <p className="text-[12.5px] font-medium text-ink">{title}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-ink-soft">{body}</p>
                  </Link>
                ))}
              </div>
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
              来源：csca.cn（考试介绍、考生须知）、CSCA 考试规则与设备环境要求。{SITE.name} 为独立备考平台，与国家留学基金管理委员会（CSC）无隶属关系。
            </p>
          </article>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-5">
              <p className="text-[12px] font-medium text-ink">相关页面</p>
              <ul className="mt-2 space-y-1.5 text-[11.5px]">
                {[
                  ["/zh", "CSCA 中文指南"],
                  ["/zh/moniti", "全真模拟与样题"],
                  ["/test-day", "考试当天规则"],
                  ["/csca/test-centres", "考点与居家网考"],
                  ["/csca/passing-score", "成绩与 0–100 换算"],
                  ["/exam-dates", "考试时间与费用"],
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
              <p className="text-[12px] font-medium text-ink">官方报名</p>
              <a
                href={OFFICIAL.site}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-vermillion hover:underline"
              >
                csca.cn <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <Link
              href="/zh/moniti"
              className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-vermillion text-[12px] font-medium text-paper"
            >
              去做一套模拟题 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
