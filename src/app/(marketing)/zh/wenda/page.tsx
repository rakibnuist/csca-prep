import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Eyebrow, Pill } from "@/components/site/section";
import { JsonLd } from "@/components/seo/jsonld";
import { OFFICIAL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "CSCA 常见问题（20 问）：报名、科目、考场、成绩与重考",
  description:
    "CSCA 常见问题中文解答：谁需要考、考哪些科目、报名材料与费用、居家网考设备与规则、成绩公布与有效期、重考与院校要求，逐条标注官方来源。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: `${SITE.url}/zh/wenda`,
    siteName: SITE.name,
    title: "CSCA 常见问题（20 问）：报名、科目、考场、成绩与重考",
    description: "20 个常见问题：科目、报名、设备、考场规则、成绩与重考，逐条标注官方来源。",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSCA 常见问题（20 问）：报名、科目、考场、成绩与重考",
    description: "20 个常见问题：科目、报名、设备、考场规则、成绩与重考，逐条标注官方来源。",
  },
  alternates: { canonical: "/zh/wenda", languages: { en: "/csca/faq", zh: "/zh/wenda", "x-default": "/csca/faq" } },
  keywords: ["CSCA 常见问题", "CSCA 问答", "CSCA 报名", "CSCA 成绩", "CSCA 重考"],
};

const GROUPS = [
  {
    id: "jichu",
    title: "考试与科目",
    items: [
      {
        q: "CSCA 是什么？",
        a: "CSCA（来华留学本科入学学业水平测试）由国家留学基金管理委员会（CSC）组织，联合中国高校专家研发，面向计划赴中国攻读本科学位的国际学生，成绩作为本科招生与奖学金评审的参考之一。",
      },
      {
        q: "哪些人需要参加？",
        a: "申请中国政府奖学金本科项目的考生、以及申请中文授课项目的考生按 CSCA 规定需要参加相应科目；其他项目是否需要以接收院校当年要求为准。CSCA 面向计划来华攻读本科学位的非中国籍考生；持中国护照或港澳台居民居住身份者不符合报名条件。",
      },
      {
        q: "一共几个科目？各多少题、多长时间？",
        a: "五个科目：文科中文、理科中文各 80 题、90 分钟；数学、物理、化学各 48 题、60 分钟。每科满分 100 分，均为单项选择，无倒扣分。",
      },
      {
        q: "数学、物理、化学可以考英文卷吗？",
        a: "可以，基础科目提供中文与英文两种试卷；专业中文仅提供中文卷。按拟申请院校要求选择，成绩报告会记录所考语言。",
      },
      {
        q: "专业中文考什么题型？",
        a: "六类题型：识解汉字、选词填空、辨析词语、选词成段、补全语句、阅读理解。文科中文取材于文学、哲学、法学、教育学、历史学与艺术；理科中文取材于数学符号与公式、物理定律、化学方程式、实验术语与学术阅读。",
      },
    ],
  },
  {
    id: "baoming",
    title: "报名与费用",
    items: [
      {
        q: "在哪里报名？",
        a: "只在官方网站 csca.cn 报名。注册账户、填写信息、选择场次与科目并缴费；收到确认邮件即报名完成。任何第三方网站都无法代为报名或保留考位。",
      },
      {
        q: "费用多少？",
        a: "一科 450 元人民币，两科及以上 700 元人民币，使用 Visa 或 Mastercard 支付。重考按新报名缴纳全额费用，没有重考折扣。",
      },
      {
        q: "需要准备哪些材料？",
        a: "可长期使用的邮箱、有效身份证件（通常为护照）、符合要求的电子证件照、可支付外币的信用卡。所有信息必须与护照及后续院校申请一致。",
      },
      {
        q: "报名后可以改科目、改时间或改考点吗？",
        a: "不可以。信息提交后即锁定；准考证生成前可申请更正或退考，准考证生成后不再接受任何修改或退考申请。",
      },
      {
        q: "准考证什么时候能下载？上面有什么？",
        a: "考试前在报名系统开放下载，并会邮件通知。上面包含姓名、证件信息、考试日期与科目、考点与座位号，以及当天需要遵守的说明；须与所持证件完全一致。",
      },
    ],
  },
  {
    id: "kaochang",
    title: "居家网考与考场",
    items: [
      {
        q: "居家网考需要什么设备？",
        a: "正版 64 位 Windows 10/11 电脑（不支持 macOS），分辨率 ≥1366×768，摄像头 720p 以上，麦克风与扬声器可用；另需一部手机或平板作为第二机位，置于身后约 45°。",
      },
      {
        q: "网络要求是什么？",
        a: "上下行各 ≥20 Mbps，到考试平台的速率 ≥500 KB/s；建议有线网络，并准备 4G 热点备用。考试客户端内置测速工具。",
      },
      {
        q: "可以带纸笔做草稿吗？",
        a: "不可以。只允许小白板＋可擦笔，或透明文件袋内的空白纸＋可擦笔；考前向监考展示空白，考后当面擦除。纸、便签、普通笔一律不允许。",
      },
      {
        q: "什么时候必须登录？",
        a: "开考前 60 分钟开放登录（最晚考前 30 分钟前登录）并完成设备检查、人脸识别与身份核验，最迟考前 5 分钟完成。考试开始后迟到者不得入场，且不允许提前交卷或提前退出。",
      },
      {
        q: "违规会怎么处理？",
        a: "分四级：一般违规取消当次成绩；严重违规取消成绩并两年内禁止报考；特别严重取消历史成绩并永久禁考；极严重者移交司法机关处理。",
      },
    ],
  },
  {
    id: "chengji",
    title: "成绩、院校与重考",
    items: [
      {
        q: "成绩什么时候公布？",
        a: "考试结束后 10 个工作日内公布，电子成绩报告可在 CSCA 账户下载。",
      },
      {
        q: "成绩有效期多久？",
        a: "自成绩报告出具之日起两年内有效。",
      },
      {
        q: "可以重考吗？",
        a: "可以，考试次数不限。重考需重新报名并缴纳全额费用；申请时可使用最佳有效成绩，具体以院校政策为准。",
      },
      {
        q: "有及格线吗？",
        a: "没有全国统一及格线。每科 0–100 分，各院校按专业自行设定要求，CSCA 本身不设通过标准。",
      },
      {
        q: "各校要求在哪里查？",
        a: "以院校国际学生招生页面或招生办的书面答复为准。专业不同、授课语言不同，要求可能不同；报名前务必确认到书面。",
      },
    ],
  },
];

export default function ZhWendaPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "zh-CN",
          mainEntity: GROUPS.flatMap((group) =>
            group.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          ),
        }}
      />
      <div lang="zh-CN">
        <section className="border-b border-line">
          <div className="shell py-12 sm:py-16">
            <Link href="/zh" className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-ink-soft hover:text-ink">
              <ArrowLeft className="h-3.5 w-3.5" /> 返回中文指南
            </Link>
            <Eyebrow>CSCA 常见问题 · 2026 年 11 月核对</Eyebrow>
            <h1 className="display-lg mt-4 max-w-3xl text-balance">
              20 个问题，把 CSCA 讲清楚。
            </h1>
            <p className="lead mt-5 max-w-2xl">
              报名、科目、设备、考场规则、成绩与重考——每一条都可追溯到官方文件。官方没有规定的，我们直接说明，不替院校编造要求。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill tone="red">按官方文件核对</Pill>
              <Pill>不编造及格线</Pill>
              <Pill tone="jade">含居家网考细节</Pill>
            </div>
          </div>
        </section>

        <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-16">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="eyebrow">快速跳转</p>
              <nav className="mt-3 space-y-1.5 text-[12.5px]">
                {GROUPS.map((group) => (
                  <a key={group.id} href={`#${group.id}`} className="block text-ink-soft hover:text-vermillion">
                    {group.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 space-y-10">
            {GROUPS.map((group) => (
              <section key={group.id} id={group.id} className="scroll-mt-24">
                <h2 className="font-display text-xl text-ink">{group.title}</h2>
                <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
                  {group.items.map((item) => (
                    <details key={item.q} className="group px-4 py-3">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13px] font-medium text-ink">
                        <span className="flex min-w-0 items-start gap-2.5">
                          <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-vermillion/70" />
                          <span className="min-w-0 flex-1">{item.q}</span>
                        </span>
                        <span className="mt-0.5 shrink-0 text-ink-faint transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-2 pl-[24px] text-[12px] leading-relaxed text-ink-soft">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}

            <div className="not-prose rounded-2xl border border-line bg-card p-4">
              <p className="text-[12px] font-medium text-ink">这些问题的完整版本</p>
              <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {[
                  ["/zh/kaoshi#register", "报名步骤与材料"],
                  ["/zh/kaoshi#exempt", "免考与例外情形"],
                  ["/zh/kaoshi#day", "考试当天要点"],
                  ["/zh/kaoshi#results", "成绩与有效期"],
                  ["/zh/moniti", "模拟题与样题"],
                  ["/test-day", "设备与考场规则（英文）"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="text-[11.5px] text-ink-soft hover:text-indigo">
                    {label} →
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-[11px] leading-relaxed text-ink-faint">
              来源：csca.cn（考试介绍、考生须知、备考资源）、CSCA 考试规则与设备环境要求。{SITE.name} 为独立备考平台，与国家留学基金管理委员会（CSC）无隶属关系；报名、缴费与成绩仅通过{" "}
              <a href={OFFICIAL.site} target="_blank" rel="noreferrer noopener" className="underline underline-offset-2 hover:text-ink">
                csca.cn
              </a>{" "}
              办理。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
