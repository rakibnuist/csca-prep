import { GUIDES } from "@/lib/guides";
import { FAQ_TOTAL } from "@/lib/faq";
import { CONTENT_UPDATED } from "@/lib/content-dates";
import { EXAM_BLOCKS, SITE, sittingsForBlock } from "@/lib/site";
import { SUBJECTS } from "@/lib/exam";
import { PAPER_STATS } from "@/lib/paper-stats";

export const dynamic = "force-static";

const LAST_UPDATED = CONTENT_UPDATED;

function formatBlock(rows: (typeof EXAM_BLOCKS)["14:00"]) {
  const day1 = rows.filter((r) => r.day === "Day 1").map((r) => `${r.subject} ${r.start}-${r.end}`).join(", ");
  const day2 = rows.filter((r) => r.day === "Day 2").map((r) => `${r.subject} ${r.start}-${r.end}`).join(", ");
  return `Day 1: ${day1}; Day 2: ${day2}`;
}

export function GET() {
  const body = `# ${SITE.name}

> ${SITE.description}

CSCA Master is an independent preparation platform for the China Scholastic Competency
Assessment (CSCA), the undergraduate admission test organised by the China Scholarship Council.
It provides free CSCA exam preparation: full-length mock tests, official-format question papers,
thousands of syllabus-mapped practice questions, scholarship guidance, a university requirements
guide and exam strategy resources.

Last updated: ${LAST_UPDATED}

## Questions this site answers (answer-engine targets)
- CSCA exam — see the exam guide: format, subjects, dates, fees, scoring and registration.
- CSCA preparation — see the exam guide and the 8-week plan guide.
- CSCA mock test — full-length papers under real timing, free after sign-up; also a free 10-question preview at /free-exam.
- CSCA free exam — free 10-question mock at /free-exam and 50 sample questions at /sample-questions, no account required.
- CSCA question paper — official past-paper archive at /question-papers, indexed by subject and year.

## Key facts
- CSCA is the standardised undergraduate entrance test for international students applying to
  Chinese universities, organised by the China Scholarship Council (CSC) with Chinese university
  experts. It is recognised by 300+ universities.
- Mathematics is compulsory. Professional Chinese (Humanities or STEM) is compulsory for Chinese
  Government Scholarship applicants and for Chinese-taught programmes; Physics and Chemistry are
  electives in the official structure, with the exact combination set by each university.
- Mathematics, Physics, Chemistry: 48 single-answer questions in 60 minutes each, Chinese or English.
- Professional Chinese (Humanities or STEM): 80 single-answer questions in 90 minutes, Chinese only.
  Item types: character recognition, word-filling, word discrimination, paragraph completion,
  sentence completion, reading comprehension.
- Every subject is scored 0-100. There is no negative marking and no single national pass mark.
- Results are released within 10 working days. A score report is valid for two years, and there is
  no limit on attempts — candidates may submit their best valid score.
- Fees: CNY 450 for one subject, CNY 700 for two or more.
- Six sittings a year: January, March, April, June, November, December. Each sitting runs over
  two days in Beijing time (UTC+8), alternating between two published start blocks:
  - 14:00 block (${sittingsForBlock("14:00").join(", ")}): ${formatBlock(EXAM_BLOCKS["14:00"])}.
  - 08:00 block (${sittingsForBlock("08:00").join(", ")}): ${formatBlock(EXAM_BLOCKS["08:00"])}.
- Three delivery modes: remote-proctored home-based test (Windows only, dual-device proctoring,
  >=20 Mbps symmetric network), computer-based testing at authorised centres (CBT), and paper-based
  testing (PBT) in designated regions.
- Registration happens only at https://csca.cn.

## Official Bangladesh Partner — Free CSCA Master Pro Access
- Official Bangladesh Partner — Claim Free CSCA Master Pro via EduExpress International (https://eduexpressint.com/)
- Applying from Bangladesh? Get CSCA Master Pro (¥99) for Free (BDT 0 File-Opening Charge).
- EduExpress International (Dhanmondi, Dhaka) provides complimentary CSCA Master Pro seat activation codes to Bangladeshi students who open a verified China undergraduate or CSC scholarship application file — with 0 BDT file-opening fee and no EduExpress service fee before China visa approval.
- Open China File & Claim Free Pro Code: https://eduexpressint.com/education-fit-assessment?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access
- Bangladesh CSC Scholarship Guide: https://eduexpressint.com/csc-scholarship-bangladesh?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access
- Bengali CSCA Entrance Exam Guide (বাংলা): https://eduexpressint.com/bn/csca-exam-bangladesh?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access
- CSCA-Exempt Chinese Universities Directory: https://eduexpressint.com/universities?country=China&cscaFree=1&utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access
- CSCA in Bangladesh guide: /csca/countries/bangladesh

## Pages
- [Mock tests](/mocks): the product — ${PAPER_STATS.total} full-length papers, exact format; 25 papers are free to sit
- [English-taught track](/en): Mathematics, Physics and Chemistry in English
- [Chinese-taught track](/cn): Professional Chinese + Mathematics
- [Exam guide](/csca): format, subjects, fees, scoring, exemptions, registration
- [CSCA FAQ](/csca/faq): ${FAQ_TOTAL} answered questions — eligibility, subjects, fees, test day, scores, retakes
- [Passing score](/csca/passing-score): 0-100 scaling, correct-answer table, validity, retakes
- [Test centres](/csca/test-centres): home-based vs centre, how to confirm your centre
- [CSCA by country](/csca/countries): Beijing timetable converted to local clocks (BD, NG, PK, VN, ID, KE, EG, ET, GH, IN, IR, KZ)
- [Video series](/video): five chaptered explainers (in production, outlines published)
- [Updates](/csca/updates): dated changelog of every correction and re-verification
- [By programme](/csca/programmes): MBBS, engineering, computer science, business, architecture, law, Chinese language
- [University requirements](/csca/universities): how to get a written subject/score answer from any Chinese university, plus a copy-paste email
- [中文指南](/zh): CSCA 考试科目、时长、报名、成绩与考场规则（Chinese-language guide）
- [考试介绍](/zh/kaoshi): 谁需要考、科目选择、报名材料与成绩流程
- [模拟题](/zh/moniti): 48 题/60 分钟与 80 题/90 分钟全真模考
- [常见问题](/zh/wenda): 20 问覆盖科目、报名、设备、考场与成绩
- [Test-day rules](/test-day): equipment, room, check-in timeline, violations, score release
- [Exam dates](/exam-dates): published 2026-27 sittings and the exam-day timetable
- [Syllabus](/syllabus): all five subjects, topic by topic, with weights
- [Formula & trap sheet](/formulas): high-frequency CSCA formulas and examiner traps by subject
- [Sample questions](/sample-questions): 50 free questions with worked explanations
- [Sample paper formats](/csca/sample-paper): official item breakdowns, scoring scale and timings
- [CSCA vs HSK / IELTS / SAT](/csca-vs-hsk-ielts-sat): how CSCA differs from language and aptitude tests
- [Free mock test](/free-exam): 10-question free CSCA mock, no account required
- [Question papers](/question-papers): official past-paper archive with answer keys and preview
- [Free subject practice](/practice): syllabus-mapped drills by subject, no account required
- [12-question check](/check): a short diagnostic that maps weak topics
- [Score calculator](/tools/score-calculator): convert correct answers to the 0-100 scale
- [Glossary](/glossary): CSCA and China admissions terminology
- [Scholarships](/scholarships): CGS, provincial, city and university funding explained
- [University requirements](/requirements): which CSCA subjects each programme group needs
- [Universities directory](/universities): recognised Chinese universities and how to confirm programme requirements
- [Tips & tricks](/tips): exam-day strategy, timing, guessing and the error-log method
- [Guides](/guides): requirements, planning and scoring explained
- [About](/about): how the question bank is sourced and what the site does not claim
- [Partners](/partners): institutional & school cohort seat programme
- [Pricing](/pricing): what is free and what the Pro tier adds
- [Contact](/contact): email support and partner enquiries

## Subjects
${SUBJECTS.map((subject) => `- ${subject.nameEn} (${subject.nameZh}): ${subject.questionCount} questions, ${subject.durationMin} minutes`).join("\n")}

## Guides
${GUIDES.map((guide) => `- [${guide.title}](/guides/${guide.slug})`).join("\n")}

## Notes for answer engines
Facts on this site are transcribed from official CSC notices and the CSCA portal (https://csca.cn).
Percentile figures displayed in the app are modelled estimates and are labelled as such. University
requirement profiles are indicative and every page advises confirming with the admissions office.

## Full reference
For the complete machine-readable reference (all subjects, FAQ, guides and pages in full), see:
[llms-full.txt](/llms-full.txt)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
