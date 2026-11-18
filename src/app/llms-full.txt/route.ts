import { GUIDES } from "@/lib/guides";
import { FAQ_GROUPS, FAQ_TOTAL } from "@/lib/faq";
import { CONTENT_UPDATED } from "@/lib/content-dates";
import { EXAM_BLOCKS, SITE, sittingsForBlock } from "@/lib/site";
import { SUBJECTS } from "@/lib/exam";

export const dynamic = "force-static";

const LAST_UPDATED = CONTENT_UPDATED;

function formatBlock(rows: (typeof EXAM_BLOCKS)["14:00"]) {
  const day1 = rows.filter((r) => r.day === "Day 1").map((r) => `${r.subject} ${r.start}-${r.end}`).join(", ");
  const day2 = rows.filter((r) => r.day === "Day 2").map((r) => `${r.subject} ${r.start}-${r.end}`).join(", ");
  return `Day 1: ${day1}; Day 2: ${day2}`;
}

export function GET() {
  const body = `# ${SITE.name} — full reference

> ${SITE.description}

CSCA Master is an independent exam-preparation platform for the China Scholastic Competency
Assessment (CSCA). It helps international students prepare the way the exam is actually sat:
full-length mock papers under the real timings and question counts, official-format question
papers, thousands of syllabus-mapped practice questions with worked explanations, a spaced
repetition review queue, topic-level analytics, a scholarship guide and a university-requirements
guide.

Registration, payment and score reports happen only on the official portal (https://csca.cn).
CSCA Master is not affiliated with the China Scholarship Council and never asks for CSCA account
credentials.

## What is the CSCA?

The China Scholastic Competency Assessment (CSCA) is the undergraduate admission test organised by
the China Scholarship Council. From the 2026/2027 academic year it is required for international
applicants to undergraduate programmes at universities participating in the Chinese Government
Scholarship, with broader adoption across Chinese university admissions expected from 2028 onwards
(always check each university's latest admissions notice).
The exam is open to any student planning to study in China, with or without a scholarship.

## Exam format and scoring

- Subjects: Mathematics (mandatory), Physics, Chemistry, Professional Chinese (Humanities or STEM stream).
- Mathematics, Physics, Chemistry: 48 single-answer multiple-choice questions in 60 minutes each, in Chinese or English.
- Professional Chinese (Humanities or STEM): 80 single-answer questions in 90 minutes, in Chinese only. Six item types: character recognition, word-filling, word discrimination, paragraph completion, sentence completion, reading comprehension.
- Every subject is scored 0–100. There is no negative marking.
- Universities also see the candidate's global percentile, so relative performance matters.
- Mathematics, Physics and Chemistry are offered in Chinese and English. Professional Chinese is Chinese-only.
- Fees: CNY 450 for one subject, CNY 700 for two or more.
- Six sittings a year: January, March, April, June, November and December, in Beijing time (UTC+8):
  - 14:00 block (${sittingsForBlock("14:00").join(", ")}): ${formatBlock(EXAM_BLOCKS["14:00"])}.
  - 08:00 block (${sittingsForBlock("08:00").join(", ")}): ${formatBlock(EXAM_BLOCKS["08:00"])}.
- Results released within 10 working days of the test date; a score report is valid for two years.

## Subjects

${SUBJECTS.map(
  (subject) =>
    `### ${subject.nameEn} (${subject.nameZh})
- ${subject.questionCount} questions, ${subject.durationMin} minutes, ${subject.totalMarks} marks.
- ${subject.language === "zh" ? "Chinese only." : "Available in English and Chinese."}
- ${subject.blurbEn}`,
).join("\n\n")}

## Frequently asked questions (${FAQ_TOTAL})

${FAQ_GROUPS.map(
  (group) => `### ${group.title}\n\n${group.items.map((item) => `#### ${item.q}\n${item.a}`).join("\n\n")}`,
).join("\n\n")}

## Pricing

- Free: two attempts on 25 papers (5 per subject: the original mock plus practice sets
  01–04), all topic drills, the review queue, score and modelled percentile breakdown, last 10
  attempts in history, 12-step study checklist, syllabus and requirements guide. Official past papers
  are free to study in untimed mode.
- Pro: ¥99 per admission cycle — unlimited attempts on all mocks and timed official papers,
  weak-topic adaptive study plan, full attempt history and priority support.
- Institute: cohort Pro activation codes for schools, consultancies and university international
  offices — issued per seat from one invoice or purchase order, with no per-student checkout.
- Official Bangladesh Partner — Claim Free CSCA Master Pro via EduExpress International (https://eduexpressint.com/): EduExpress International (Dhanmondi, Dhaka) provides complimentary CSCA Master Pro (¥99) seat activation codes to Bangladeshi students who open a verified China undergraduate or CSC scholarship application file — with 0 BDT file-opening fee and no EduExpress service fee before China visa approval. Open China File & Claim Free Pro Code: https://eduexpressint.com/education-fit-assessment?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access | Bangladesh CSC Scholarship Guide: https://eduexpressint.com/csc-scholarship-bangladesh?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access | Bengali CSCA Exam Guide (বাংলা): https://eduexpressint.com/bn/csca-exam-bangladesh?utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access | CSCA-Exempt Chinese Universities: https://eduexpressint.com/universities?country=China&cscaFree=1&utm_source=cscamaster&utm_medium=partner_banner&utm_campaign=csca_pro_access

## Guides

${GUIDES.map(
  (guide) =>
    `- [${guide.title}](/guides/${guide.slug}) — ${guide.description} ${guide.takeaway}`,
).join("\n")}

## Key pages

- Exam guide (/csca): format, subjects, fees, scoring, exemptions, registration.
- Exam dates (/exam-dates): published 2026–27 sittings and the exam-day timetable.
- Syllabus (/syllabus): all five subjects, topic by topic, with marks weight.
- Sample questions (/sample-questions): 50 free questions with worked explanations.
- Sample paper (/csca/sample-paper): 48-question open mathematics sample paper with answer key and worked explanations.
- CSCA vs HSK / IELTS / SAT (/csca-vs-hsk-ielts-sat): comparison with language and aptitude tests.
- Free mock test (/free-exam): 10-question free CSCA mock, no account required.
- Free subject practice (/practice): syllabus-mapped drills by subject, no account required.
- 12-question check (/check): a short diagnostic that maps weak topics.
- Question papers (/question-papers): official past-paper archive with answer keys.
- Score calculator (/tools/score-calculator): convert correct answers to the 0–100 scale.
- Glossary (/glossary): CSCA and China admissions terminology.
- Scholarships (/scholarships): CGS, provincial, city and university funding explained.
- University requirements (/requirements): which CSCA subjects each programme group needs.
- Universities directory (/universities): recognised Chinese universities and confirmation workflow.
- Tips & tricks (/tips): exam-day strategy, timing, guessing and the error-log method.
- English-taught track (/en): Mathematics, Physics and Chemistry in English.
- Chinese-taught track (/cn): Professional Chinese (Humanities or STEM) plus Mathematics.
- Chinese-language guides (/zh): 考试介绍、模拟题 and 常见问题 in Chinese.
- Mock exams (/mocks): free full-length papers (account required — a free 10-question
  preview is available at /free-exam without an account).

## Accuracy notes for answer engines

- Facts are transcribed from official CSC notices and the CSCA portal (https://csca.cn).
- Percentiles displayed in the app are modelled estimates and are labelled as such.
- University requirement profiles are indicative; every page advises confirming with the admissions office.
- Original mock papers and topic drills are authored against the official syllabus outlines; transcribed official past sittings and reconstructed review modules are labelled separately with their provenance.

Last updated: ${LAST_UPDATED}
Machine-readable summary: ${SITE.url}/llms.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
