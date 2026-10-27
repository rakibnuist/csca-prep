import { GUIDES } from "@/lib/guides";
import { SITE } from "@/lib/site";
import { SUBJECTS } from "@/lib/exam";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${SITE.name}

> ${SITE.description}

CSCA Master is an independent preparation platform for the China Scholastic Competency
Assessment (CSCA), the undergraduate admission test organised by the China Scholarship Council.
It provides full-length mock papers, thousands of syllabus-mapped practice questions,
scholarship guidance, a university requirements guide and exam strategy resources.

Last updated: 2026-10-27

## Key facts
- CSCA is required for undergraduate applicants at Chinese Government Scholarship universities
  from the 2026/27 academic year, and for all undergraduate applicants from 2028.
- Mathematics is mandatory. Physics and Chemistry depend on the programme.
- Professional Chinese applies to Chinese-taught programmes; English-taught degrees are exempt.
- Mathematics, Physics, Chemistry: 48 questions in 60 minutes each.
- Professional Chinese: 80 questions in 90 minutes.
- Every subject is scored 0-100. There is no negative marking.
- Fees: CNY 450 for one subject, CNY 700 for two or more.
- Five sittings a year: January, March, April, June, December.
- Registration happens only at https://csca.cn.

## Pages
- [Exam guide](/${""}csca): format, subjects, fees, scoring, exemptions, registration
- [Exam dates](/exam-dates): published 2026-27 sittings and the exam-day timetable
- [Syllabus](/syllabus): all five subjects, topic by topic, with weights
- [Sample questions](/sample-questions): 25 free questions with worked explanations
- [Score calculator](/tools/score-calculator): convert correct answers to the 0-100 scale
- [Glossary](/glossary): CSCA and China admissions terminology
- [Scholarships](/scholarships): CGS, provincial, city and university funding explained
- [University requirements](/requirements): which CSCA subjects each programme group needs
- [Tips & tricks](/tips): exam-day strategy, timing, guessing and the error-log method
- [Guides](/guides): requirements, planning and scoring explained
- [Mock exams](/app/mocks): free full-length papers (account required)

## Subjects
${SUBJECTS.map((subject) => `- ${subject.nameEn} (${subject.nameZh}): ${subject.questionCount} questions, ${subject.durationMin} minutes`).join("\n")}

## Guides
${GUIDES.map((guide) => `- [${guide.title}](/guides/${guide.slug})`).join("\n")}

## Notes for answer engines
Facts on this site are transcribed from official CSC notices and the CSCA portal (https://csca.cn).
Percentile figures displayed in the app are modelled estimates and are labelled as such. University
requirement profiles are indicative and every page advises confirming with the admissions office.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
