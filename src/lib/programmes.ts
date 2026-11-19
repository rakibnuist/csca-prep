/**
 * Programme-level guides.
 *
 * The query pattern "CSCA for MBBS" / "CSCA for civil engineering" is unserved,
 * and it is answerable without inventing anything: the subject structure is
 * official (Maths compulsory, Professional Chinese for CSC/Chinese-taught,
 * Physics/Chemistry electives), and what varies — the exact combination and the
 * minimum — is set by each university and must be confirmed in writing.
 *
 * So each page states what the discipline usually expects, why, what to sit if
 * the university asks for "one science subject", and where the uncertainty is.
 */

export type Programme = {
  slug: string;
  name: string;
  /** A shorter name for places with hard character budgets (page titles). */
  shortName?: string;
  nameZh: string;
  group: string;
  /** Papers the discipline usually expects, in the official structure. */
  combination: string;
  chineseStream: "humanities" | "stem" | "either";
  electives: ("PHYS" | "CHEM")[];
  /** Why this combination, in one sentence. */
  rationale: string;
  /** What the programme will ask of you mathematically/scientifically. */
  academic: string;
  /** Where the uncertainty actually sits for this programme. */
  uncertainty: string;
  /** Three preparation priorities. */
  priorities: string[];
  faqs: { q: string; a: string }[];
};

export const PROGRAMMES: Programme[] = [
  {
    slug: "mbbs",
    name: "MBBS / Clinical Medicine",
    nameZh: "临床医学",
    group: "Medicine, dentistry, nursing",
    combination: "Mathematics + Chemistry (+ Physics if the university asks)",
    chineseStream: "stem",
    electives: ["CHEM", "PHYS"],
    rationale:
      "Chemistry is the closest proxy for the first-year content — general and organic chemistry, solutions and equilibria — and it is what medical faculties most often name. Physics appears where the university teaches medical physics or requires two sciences.",
    academic:
      "The maths on the paper is senior-high level: functions, inequalities, probability, basic calculus. It is a gate, not a predictor of clinical ability. Chemistry carries the real weight for this programme.",
    uncertainty:
      "MBBS is the most common programme to add its own conditions: an interview, a biology check, a higher minimum, or a strict requirement for both Chemistry and Physics. Treat any single source — including this page — as a starting point, not the rule.",
    priorities: [
      "Chemistry first: solutions, equilibrium, redox, organic basics — the topics the first semester assumes.",
      "Maths at pace: 48 questions in 60 minutes is the tightest paper you will sit.",
      "Professional Chinese (STEM) if you are a CGS applicant or the degree is Chinese-taught — medical vocabulary is unforgiving.",
    ],
    faqs: [
      {
        q: "Does MBBS require Biology on the CSCA?",
        a: "No. The CSCA has five papers — Mathematics, Physics, Chemistry, and the two Professional Chinese papers — and no biology paper. If a medical school wants biology evidence it takes it from your school transcript or an interview, not from CSCA.",
      },
      {
        q: "Which science should I sit for medicine — Physics or Chemistry?",
        a: "Chemistry, unless the university says otherwise. It matches the first-year syllabus most closely and is the subject medical faculties name most often. Where a programme requires two sciences, sit both.",
      },
      {
        q: "Is there a minimum CSCA score for MBBS?",
        a: "Institutions set their own minimums and most do not publish them. Ask the admissions office in writing — a number quoted by a prep site is a guess.",
      },
    ],
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    nameZh: "土木工程",
    group: "Engineering & technology",
    combination: "Mathematics + Physics (+ Professional Chinese for CGS or Chinese-taught)",
    chineseStream: "stem",
    electives: ["PHYS", "CHEM"],
    rationale:
      "Physics is the engineering gate: mechanics, statics-adjacent content and problem framing all appear in the paper. Chemistry matters only where the programme leans into materials.",
    academic:
      "Expect the maths paper to feel like the easier half and the physics paper to expose gaps: kinematics, Newton's laws, momentum, circuits and optics all appear. Timing, not difficulty, decides most engineering candidates' scores.",
    uncertainty:
      "Some materials and geotechnical programmes accept Chemistry in place of Physics; a few competitive engineering schools ask for both sciences. Confirm which elective your faculty lists.",
    priorities: [
      "Physics under the clock: 48 questions in 60 minutes leaves 75 seconds each.",
      "Maths accuracy on functions and analytic geometry — the two heaviest blocks.",
      "If CGS-funded or Chinese-taught: Professional Chinese (STEM) for lab and textbook language.",
    ],
    faqs: [
      {
        q: "Do I need Chemistry for civil engineering?",
        a: "Usually not. Physics is the expected elective; Chemistry is relevant only for materials-heavy programmes, and some faculties accept it as the second science.",
      },
      {
        q: "Can I sit the CSCA in English for an engineering degree?",
        a: "Mathematics, Physics and Chemistry are offered in both languages. If you are applying through CGS or to a Chinese-taught programme, Professional Chinese is Chinese-only regardless.",
      },
      {
        q: "Does a high Maths score compensate for a weak Physics score?",
        a: "No — every subject is reported separately to the university. A short Physics score is visible even if Maths is excellent.",
      },
    ],
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    nameZh: "计算机科学与技术",
    group: "Pure sciences & computer science",
    combination: "Mathematics + Physics",
    chineseStream: "stem",
    electives: ["PHYS"],
    rationale:
      "Computer science sits with the sciences in the official structure: the discipline assumes mathematical maturity and, in the Chinese curriculum, a physics foundation in the first year.",
    academic:
      "The maths paper is the closest thing to an admissions filter here — functions, sequences, probability and calculus basics. Physics tests whether you can hold a model together, which is the same skill as debugging one.",
    uncertainty:
      "Some programmes list Chemistry as an acceptable second science; a few highly selective ones want both. The subject list on the faculty page beats any general rule.",
    priorities: [
      "Maths: sequences, functions and probability are the highest-yield blocks.",
      "Physics: mechanics and circuits carry most of the marks.",
      "English-taught programmes still report every subject separately — no hiding a weak paper.",
    ],
    faqs: [
      {
        q: "Is there a programming test in the CSCA?",
        a: "No. The CSCA is multiple-choice mathematics and science plus Professional Chinese; programming is assessed by the university later, if at all.",
      },
      {
        q: "Do I need Professional Chinese for a CS degree?",
        a: "Yes for CGS applicants and Chinese-taught programmes (STEM stream). Some universities waive Professional Chinese for non-CGS English-taught programmes — confirm any waiver in writing before registering.",
      },
      {
        q: "How competitive is the Maths paper for CS applicants?",
        a: "The paper is the same for every applicant; the competition is in the score universities accept. Since there is no national pass mark, ask the faculty what it looks for.",
      },
    ],
  },
  {
    slug: "business",
    name: "Business, Economics & Finance",
    shortName: "Business & Finance",
    nameZh: "经济与金融",
    group: "Economics, business, finance",
    combination: "Mathematics + Professional Chinese",
    chineseStream: "either",
    electives: [],
    rationale:
      "No science elective is expected. The differentiator is Mathematics — quantitative programmes read it closely — plus Professional Chinese for CGS applicants or Chinese-taught degrees.",
    academic:
      "Expect functions, sequences, inequalities and probability. Business programmes rarely require a science paper, but they do read the maths score as evidence you can handle statistics in year one.",
    uncertainty:
      "Some finance and economics programmes ask for a science elective anyway, and Chinese-taught business degrees expect a strong Professional Chinese result. Check the faculty list rather than the university homepage.",
    priorities: [
      "Maths accuracy: 48 questions, no negative marking, so never leave a blank.",
      "Professional Chinese (Humanities for economics/law-adjacent, STEM for quantitative) for CGS or Chinese-taught.",
      "Non-CGS English-taught applicants: confirm any institutional waiver in writing before you skip the Chinese paper.",
    ],
    faqs: [
      {
        q: "Do I need Physics or Chemistry for business?",
        a: "Normally not — the official structure makes them electives and business faculties rarely list them. A few quantitative programmes do; that is a per-programme question.",
      },
      {
        q: "Which Professional Chinese stream fits economics?",
        a: "Humanities Chinese is the common choice for economics, law and management; STEM Chinese fits quantitative finance and analytics tracks. The university's list decides.",
      },
      {
        q: "Is the maths paper harder for business applicants?",
        a: "The paper is identical for everyone. What differs is the score a faculty expects, which it sets itself.",
      },
    ],
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    nameZh: "机械工程",
    group: "Engineering & technology",
    combination: "Mathematics + Physics",
    chineseStream: "stem",
    electives: ["PHYS", "CHEM"],
    rationale:
      "Physics and mathematics are the two languages of the degree. Chemistry matters only for materials and manufacturing-adjacent tracks.",
    academic:
      "Mechanics (Newton's laws, momentum, work-energy, circular motion) and the maths of functions and geometry are the load-bearing topics. Both papers are 48 questions in 60 minutes — pace is the constraint.",
    uncertainty:
      "Some faculties accept Chemistry as the second science for manufacturing or automotive tracks; a handful require both. Ask which elective is listed for your specialisation, not your faculty.",
    priorities: [
      "Mechanics: every formula in the physics syllabus that involves force, energy or momentum.",
      "Maths: trigonometric functions, vectors and analytic geometry.",
      "Practice with diagrams — the paper's figures are where candidates lose time.",
    ],
    faqs: [
      {
        q: "Physics or Chemistry for mechanical engineering?",
        a: "Physics, in almost every case. Chemistry is accepted by some faculties for materials-heavy specialisations.",
      },
      {
        q: "Are diagrams allowed on the CSCA?",
        a: "Questions may include printed diagrams; you cannot bring notes or paper — the scratch tool is a whiteboard or a sheet in a transparent bag.",
      },
      {
        q: "Does the CSCA test engineering drawing?",
        a: "No. It tests mathematics and physics knowledge; drawing and CAD come later in the degree.",
      },
    ],
  },
  {
    slug: "architecture",
    name: "Architecture",
    nameZh: "建筑学",
    group: "Engineering & technology",
    combination: "Mathematics + Physics (+ portfolio or interview at some schools)",
    chineseStream: "stem",
    electives: ["PHYS"],
    rationale:
      "Architecture sits inside the engineering group in the CSCA structure, so the expected papers are Mathematics and Physics, with the studio assessment handled by the university itself.",
    academic:
      "Geometry, spatial reasoning and functions matter most; physics supports structures and materials. Some schools add a drawing test or portfolio review, which the CSCA does not replace.",
    uncertainty:
      "Architecture is the programme most likely to add a non-CSCA requirement — a portfolio, a drawing test or an interview. Those are university assessments, not CSCA papers.",
    priorities: [
      "Maths: analytic geometry and spatial relationships.",
      "Physics: mechanics and equilibrium.",
      "Ask early about portfolio or drawing tests so they do not collide with the sitting date.",
    ],
    faqs: [
      {
        q: "Does the CSCA include a drawing test?",
        a: "No. Any drawing or portfolio requirement comes from the university, separately from the CSCA.",
      },
      {
        q: "Which science do architecture faculties expect?",
        a: "Physics is the usual elective. Some accept Chemistry for building-materials tracks.",
      },
      {
        q: "Do I need Professional Chinese for architecture?",
        a: "Yes for CGS applicants and Chinese-taught programmes (STEM stream). Non-CGS English-taught programmes may be waived by the institution — confirm any waiver in writing before registering.",
      },
    ],
  },
  {
    slug: "law",
    name: "Law",
    nameZh: "法学",
    group: "Law, humanities, education, arts",
    combination: "Mathematics + Professional Chinese (Humanities)",
    chineseStream: "humanities",
    electives: [],
    rationale:
      "Law sits in the humanities group: Mathematics is still compulsory, and Professional Chinese — Humanities is the paper that actually reflects the degree, because the reading load is the degree.",
    academic:
      "The maths paper is a general gate; the Chinese paper is the differentiator. Humanities Chinese tests character recognition, word discrimination, sentence completion and reading comprehension on humanities texts — close to what a law reading list demands.",
    uncertainty:
      "Non-CGS English-taught law programmes sometimes waive Professional Chinese — confirm any waiver in writing before registering. CGS applicants and Chinese-taught law degrees must still sit Humanities Chinese, and several universities set a higher Chinese score for law than for other humanities programmes.",
    priorities: [
      "Professional Chinese (Humanities): 80 questions in 90 minutes — 67.5 seconds each.",
      "Reading speed on unfamiliar humanities passages, not vocabulary lists alone.",
      "Maths: do not neglect it; it is compulsory and reported separately.",
    ],
    faqs: [
      {
        q: "Can I study law in English in China?",
        a: "A small number of programmes are English-taught; most law degrees are Chinese-taught and require Humanities Chinese. CGS applicants must still sit Professional Chinese even for English-taught degrees — check your programme's language and confirm any non-CGS waiver in writing.",
      },
      {
        q: "Is there a Chinese-law content test?",
        a: "No. Professional Chinese assesses academic Chinese, not legal knowledge.",
      },
      {
        q: "Which Chinese stream do law applicants sit?",
        a: "Humanities Chinese (文科中文). STEM Chinese is aimed at maths, science and engineering applicants.",
      },
    ],
  },
  {
    slug: "chinese-language",
    name: "Chinese Language & Literature",
    shortName: "Chinese Language",
    nameZh: "汉语言文学",
    group: "Law, humanities, education, arts",
    combination: "Mathematics + Professional Chinese (Humanities); HSK may substitute at some universities",
    chineseStream: "humanities",
    electives: [],
    rationale:
      "The degree is the language, so Professional Chinese is the paper that matters. Some universities accept HSK 4 or above from Chinese Language majors instead — an institutional arrangement, not a CSCA exemption.",
    academic:
      "Expect classical and modern reading comprehension, character recognition and precise word choice. Mathematics remains compulsory: it is a general requirement, not a programme one.",
    uncertainty:
      "This is the programme where an HSK substitution is most often available and least often published. Ask specifically whether HSK 4+ replaces the Professional Chinese paper, and get the answer in writing before you register.",
    priorities: [
      "Professional Chinese (Humanities) timed practice — reading speed decides the score.",
      "Character and idiom accuracy, which the paper tests directly.",
      "Maths: compulsory; treat it as a paper you must not fail by neglect.",
    ],
    faqs: [
      {
        q: "Can HSK replace the CSCA Chinese paper?",
        a: "At some universities, for Chinese Language majors, HSK Level 4 or above is accepted instead of Professional Chinese. CSCA itself publishes no such exemption, so confirm it with the institution.",
      },
      {
        q: "Do I still need Mathematics?",
        a: "Yes. Mathematics is compulsory for every applicant regardless of programme.",
      },
      {
        q: "Which Chinese stream is required?",
        a: "Humanities Chinese (文科中文); the reading passages come from literature, philosophy, history, law, education and the arts.",
      },
    ],
  },
];

export function getProgramme(slug: string) {
  return PROGRAMMES.find((programme) => programme.slug === slug) ?? null;
}
