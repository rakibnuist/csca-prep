/**
 * Universities applicants ask about most.
 *
 * This file deliberately holds **no CSCA requirements**. Institutions set their
 * own subject combinations and minimums per programme, publish them in their
 * own international-admissions pages, and change them between cycles. A prep
 * site that prints "University X needs 75" is guessing — so these pages give
 * the official baseline, the institution's own domain, and a message template
 * that gets the real answer in writing.
 */

export type University = {
  slug: string;
  name: string;
  nameZh: string;
  city: string;
  domain: string;
  note: string;
};

export const UNIVERSITIES: University[] = [
  { slug: "peking", name: "Peking University", nameZh: "北京大学", city: "Beijing", domain: "pku.edu.cn", note: "Highly selective across all faculties; expect a per-programme subject list." },
  { slug: "tsinghua", name: "Tsinghua University", nameZh: "清华大学", city: "Beijing", domain: "tsinghua.edu.cn", note: "Engineering and science programmes are the most competitive; design and architecture interview separately." },
  { slug: "fudan", name: "Fudan University", nameZh: "复旦大学", city: "Shanghai", domain: "fudan.edu.cn", note: "Broad programme menu; medicine and economics are the usual draws for international applicants." },
  { slug: "sjtu", name: "Shanghai Jiao Tong University", nameZh: "上海交通大学", city: "Shanghai", domain: "sjtu.edu.cn", note: "Engineering, medicine and business; several English-taught tracks." },
  { slug: "zhejiang", name: "Zhejiang University", nameZh: "浙江大学", city: "Hangzhou", domain: "zju.edu.cn", note: "Large international intake across engineering, agriculture and medicine." },
  { slug: "nanjing", name: "Nanjing University", nameZh: "南京大学", city: "Nanjing", domain: "nju.edu.cn", note: "Strong in sciences and humanities; Chinese-taught tracks dominate." },
  { slug: "ustc", name: "University of Science and Technology of China", nameZh: "中国科学技术大学", city: "Hefei", domain: "ustc.edu.cn", note: "Science and engineering focus; small international cohort." },
  { slug: "wuhan", name: "Wuhan University", nameZh: "武汉大学", city: "Wuhan", domain: "whu.edu.cn", note: "Broad catalogue; popular with scholarship applicants." },
  { slug: "hust", name: "Huazhong University of Science and Technology", nameZh: "华中科技大学", city: "Wuhan", domain: "hust.edu.cn", note: "Engineering and medicine; large campus intake." },
  { slug: "sysu", name: "Sun Yat-sen University", nameZh: "中山大学", city: "Guangzhou", domain: "sysu.edu.cn", note: "Medicine and business are common choices; multiple campuses." },
  { slug: "scu", name: "Sichuan University", nameZh: "四川大学", city: "Chengdu", domain: "scu.edu.cn", note: "Medicine, engineering and humanities; strong regional draw." },
  { slug: "xjtu", name: "Xi'an Jiaotong University", nameZh: "西安交通大学", city: "Xi'an", domain: "xjtu.edu.cn", note: "Engineering-led; some English-taught programmes." },
  { slug: "hit", name: "Harbin Institute of Technology", nameZh: "哈尔滨工业大学", city: "Harbin", domain: "hit.edu.cn", note: "Engineering and aerospace; Chinese-taught tracks are the norm." },
  { slug: "buaa", name: "Beihang University", nameZh: "北京航空航天大学", city: "Beijing", domain: "buaa.edu.cn", note: "Aerospace and engineering; check whether the programme is Chinese- or English-taught." },
  { slug: "bit", name: "Beijing Institute of Technology", nameZh: "北京理工大学", city: "Beijing", domain: "bit.edu.cn", note: "Engineering and computer science; runs recruitment events for international applicants." },
  { slug: "tongji", name: "Tongji University", nameZh: "同济大学", city: "Shanghai", domain: "tongji.edu.cn", note: "Architecture, civil engineering and medicine; a CSCA test centre appears in its own materials." },
  { slug: "nankai", name: "Nankai University", nameZh: "南开大学", city: "Tianjin", domain: "nankai.edu.cn", note: "Sciences, economics and humanities." },
  { slug: "tju", name: "Tianjin University", nameZh: "天津大学", city: "Tianjin", domain: "tju.edu.cn", note: "Engineering and chemistry; long history of international intake." },
  { slug: "sdu", name: "Shandong University", nameZh: "山东大学", city: "Jinan", domain: "sdu.edu.cn", note: "Broad catalogue; medicine is competitive." },
  { slug: "xmu", name: "Xiamen University", nameZh: "厦门大学", city: "Xiamen", domain: "xmu.edu.cn", note: "Economics, management and marine sciences; strong regional appeal." },
  { slug: "seu", name: "Southeast University", nameZh: "东南大学", city: "Nanjing", domain: "seu.edu.cn", note: "Architecture and engineering." },
  { slug: "blcu", name: "Beijing Language and Culture University", nameZh: "北京语言大学", city: "Beijing", domain: "blcu.edu.cn", note: "Chinese-language teaching specialists; publishes candidate instructions for CSCA." },
];

/** The email that gets a usable answer, in both languages. */
export const EMAIL_TEMPLATE_EN = `Subject: CSCA requirements — [Programme name], [Intake year] entry

Dear International Admissions Office,

I am an international applicant preparing to apply to [programme name] for [intake year].

Could you confirm, for this programme specifically:
1. Which CSCA subjects are required or recommended (Mathematics, Professional Chinese, Physics, Chemistry)?
2. Whether the Professional Chinese paper is required for this programme, and if the programme is English-taught, whether it is waived.
3. The minimum CSCA score, if the university publishes one.
4. The deadline by which a CSCA score must reach you.

If the answer differs by campus or by track, please indicate which applies to me.

Thank you,
[Full name] · Passport nationality: [country] · Intended intake: [month/year]`;

export const EMAIL_TEMPLATE_ZH = `主题：CSCA 成绩要求咨询 —— [专业名称]，[入学年份] 入学

尊敬的国际学生招生办公室：

我是一名准备申请 [入学年份] [专业名称] 的国际学生。

希望确认与该项目相关的以下信息：
1. 该项目要求或建议提供哪些 CSCA 科目成绩（数学、专业中文、物理、化学）？
2. 该项目是否要求专业中文？若为英文授课项目，是否可免考？
3. 学校是否公布该项目的 CSCA 成绩最低要求？
4. CSCA 成绩需在什么时间之前提交？

如不同校区或不同方向要求不同，请说明适用于我的情况。

谢谢！
[姓名] · 护照国籍：[国家] · 预计入学：[年月]`;
