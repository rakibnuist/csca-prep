export type GuideSection = {
  id: string;
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: string;
  table?: { head: string[]; rows: string[][] };
};

export type Guide = {
  slug: string;
  eyebrow: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  published: string;
  modified: string;
  readingMinutes: number;
  intro: string;
  takeaway: string;
  sections: GuideSection[];
  related: { label: string; href: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "csca-vs-hsk",
    eyebrow: "Language requirements",
    title: "CSCA vs HSK: which Chinese test do you actually need?",
    h1: "CSCA vs HSK: which Chinese test do you actually need?",
    description:
      "CSCA Professional Chinese and HSK measure different things and are not interchangeable. Here is when each applies, who is exempt, and how to avoid paying for a test you do not need.",
    keywords: ["CSCA vs HSK", "CSCA Professional Chinese", "HSK requirement China university", "CSCA exemption"],
    published: "2026-10-20",
    modified: "2026-10-27",
    readingMinutes: 6,
    intro:
      "Applicants routinely confuse the two because both involve Chinese and both appear in admission checklists. They are different exams, run by different organisations, testing different abilities — and for a given programme you may need one, both, or neither.",
    takeaway:
      "HSK proves general Chinese proficiency. CSCA Professional Chinese proves you can study a subject in Chinese. English-taught programmes usually need neither for admission.",
    sections: [
      {
        id: "what-they-measure",
        h2: "What each test actually measures",
        paragraphs: [
          "HSK (Hanyu Shuiping Kaoshi) is a general proficiency ladder from beginner to advanced. It tests everyday vocabulary, grammar and reading across six levels and is used by universities and employers as a language credential.",
          "CSCA Professional Chinese is an academic reading test. It asks you to recognise characters, discriminate near-synonyms, complete sentences and read passages from humanities or STEM disciplines. The vocabulary is deliberately not conversational — it is the language of lectures, textbooks and lab reports.",
        ],
        table: {
          head: ["", "HSK", "CSCA Professional Chinese"],
          rows: [
            ["Purpose", "General Chinese proficiency", "Academic readiness in Chinese"],
            ["Format", "Listening, reading, writing", "Multiple choice only"],
            ["Length", "Level dependent", "90 minutes, 80 questions"],
            ["Score", "Level pass/fail", "0–100, plus percentile"],
            ["Run by", "Chinese testing centres", "China Scholarship Council"],
            ["Required by", "Some universities, some programmes", "CSCA requirement for Chinese-taught degrees"],
          ],
        },
      },
      {
        id: "who-needs-what",
        h2: "Who needs which",
        bullets: [
          "Chinese-taught undergraduate programme: CSCA Professional Chinese (Humanities or STEM stream) is normally required. The university may also ask for HSK 4–5 as an admission condition.",
          "Fully English-taught programme: normally exempt from Professional Chinese. HSK is rarely required, though it can help socially and for internships.",
          "Chinese Language major: some universities accept HSK 4 in place of Professional Chinese. This is a university-level exemption, not a national rule — get it in writing.",
          "Preparatory year (foundation) programmes: requirements vary; many use HSK progression instead of CSCA for the language component.",
        ],
      },
      {
        id: "exemptions",
        h2: "The exemptions that exist — and the ones people invent",
        paragraphs: [
          "The two real exemptions are English-taught degrees and, for Chinese Language majors, an HSK 4 result accepted by the university. Everything else is institution-specific.",
          "Be sceptical of advice that says a high HSK score exempts you from CSCA entirely. HSK measures language, not mathematics or physics. Even applicants with HSK 6 sit Mathematics.",
        ],
        callout:
          "Always ask admissions one precise question: “For my programme, which CSCA papers are required, and do I need an HSK score as well?” Ambiguous answers are common; a written reply is not.",
      },
      {
        id: "how-to-choose",
        h2: "How to sequence your preparation",
        paragraphs: [
          "If you need both, do not prepare them in parallel from day one. HSK is a vocabulary and listening grind; Professional Chinese is a reading-speed and collocation skill. Build HSK vocabulary first, then convert it into reading practice with CSCA-style passages.",
          "If you need only Professional Chinese, skip HSK prep entirely and spend the time on academic reading. Our Humanities and STEM Chinese papers use the same item types as the official paper, which is the fastest way to find out whether your reading speed is sufficient.",
        ],
        bullets: [
          "Weeks 1–3: characters and high-frequency academic vocabulary.",
          "Weeks 4–6: timed reading sets, 15 minutes per passage block.",
          "Weeks 7–8: full 80-question papers under the 90-minute limit.",
        ],
      },
    ],
    related: [
      { label: "CSCA subject requirements by major", href: "/guides/csca-subjects-by-major" },
      { label: "Professional Chinese syllabus", href: "/syllabus/ch_hum" },
      { label: "Free sample questions", href: "/sample-questions" },
    ],
  },
  {
    slug: "8-week-csca-study-plan",
    eyebrow: "Planning",
    title: "An 8-week CSCA study plan that fits around school",
    h1: "An 8-week CSCA study plan that fits around school",
    description:
      "A realistic eight-week schedule for the CSCA: weekly focus, mock cadence, review rhythm and the last-week taper. Built for students with six to ten hours a week.",
    keywords: ["CSCA study plan", "how to prepare for CSCA", "CSCA 8 week plan", "CSCA revision schedule"],
    published: "2026-10-18",
    modified: "2026-10-27",
    readingMinutes: 7,
    intro:
      "Most CSCA plans fail for one reason: they assume unlimited time. This plan assumes six to ten hours a week, which is what a final-year school student can realistically protect. It works because it is sequenced, not because it is long.",
    takeaway:
      "Two papers in week one, one paper every fortnight after, and a hard rule that every missed question gets logged and revisited. That is the whole method.",
    sections: [
      {
        id: "before",
        h2: "Before week one: choose your papers",
        paragraphs: [
          "Confirm the exact CSCA subject combination from your target universities, not from a forum. Mathematics is mandatory; Physics and Chemistry depend on the programme; Professional Chinese depends on the teaching language.",
        ],
        bullets: [
          "Write down the papers and the official question count and time for each.",
          "Mark your target sitting from the published calendar and subtract two weeks as a personal deadline.",
          "Block two fixed sessions per week in a calendar — same time, same place.",
        ],
      },
      {
        id: "phase-1",
        h2: "Weeks 1–3: baseline and foundation",
        paragraphs: [
          "Sit a diagnostic paper per subject in week one. Do not revise first — the point is to expose the topics you have quietly avoided. Score it, read every explanation, and build a ranked list of weak topics.",
        ],
        bullets: [
          "Week 1: diagnostic papers + topic ranking.",
          "Week 2: two weakest topics per subject, 20 questions each, explanations read properly.",
          "Week 3: next two topics + a timed half-paper to check pacing.",
        ],
        callout:
          "Keep an error log from day one: topic, cause (concept, arithmetic, misread), and the rule you forgot. One line each. It becomes the only revision document you need in the final week.",
      },
      {
        id: "phase-2",
        h2: "Weeks 4–6: timed papers and targeted drilling",
        paragraphs: [
          "Now the work becomes cyclical: one full paper every fortnight, drills in between for whatever the paper exposes. The paper is the diagnostic; the drills are the treatment.",
        ],
        table: {
          head: ["Week", "Focus", "Time"],
          rows: [
            ["4", "Full paper 1 + full review", "3 h"],
            ["5", "Drill two weak topics per subject", "4 h"],
            ["6", "Full paper 2 + full review", "3 h"],
          ],
        },
        bullets: [
          "Review takes longer than the paper. Budget for it.",
          "Re-attempt every missed question without looking at the explanation first.",
          "Track topic mastery, not the total score.",
        ],
      },
      {
        id: "phase-3",
        h2: "Weeks 7–8: simulation and taper",
        paragraphs: [
          "Sit papers at the real time of day, back to back if you are taking several subjects on one day. The CSCA timetable runs Professional Chinese first, then Mathematics, Physics and Chemistry in sequence, so practise in that order at least once.",
          "In the final three days, do nothing new. Re-read the error log, sleep at exam-day hours, and stop. Cramming new topics this late reduces performance more than it adds.",
        ],
        bullets: [
          "Week 7: two full papers under exam conditions.",
          "Week 8: one paper early in the week, then error-log revision only.",
          "Day before: logistics, ID, connection test, sleep.",
        ],
      },
    ],
    related: [
      { label: "Build a plan in the app", href: "/app/plan" },
      { label: "CSCA exam dates", href: "/exam-dates" },
      { label: "Scoring and percentiles", href: "/guides/csca-scoring-and-percentiles" },
    ],
  },
  {
    slug: "csca-subjects-by-major",
    eyebrow: "Requirements",
    title: "Which CSCA subjects do you need for your major?",
    h1: "Which CSCA subjects do you need for your major?",
    description:
      "Mathematics is compulsory for everyone. Physics and Chemistry depend on the programme, and Professional Chinese depends on the teaching language. A practical mapping by major group.",
    keywords: ["CSCA subjects by major", "CSCA requirements engineering", "CSCA medicine subjects", "CSCA humanities"],
    published: "2026-10-16",
    modified: "2026-10-27",
    readingMinutes: 5,
    intro:
      "There is no single CSCA subject combination. The rules follow the programme, not the university's reputation — which is why two applicants to the same university can need different papers.",
    takeaway:
      "Maths for everyone; at least one of Physics/Chemistry for science, engineering, agriculture and medicine; Professional Chinese only for Chinese-taught degrees.",
    sections: [
      {
        id: "table",
        h2: "The mapping, by programme group",
        table: {
          head: ["Programme group", "Usually required", "Notes"],
          rows: [
            ["Engineering & technology", "Maths + Physics", "Some universities also accept Chemistry for materials or chemical engineering."],
            ["Pure sciences (physics, maths, CS)", "Maths + Physics", "Computer science sits with engineering at most institutions."],
            ["Chemistry, pharmacy, materials", "Maths + Chemistry", "Physics may be accepted as the second subject at some universities."],
            ["Medicine, dentistry, nursing", "Maths + Chemistry", "MBBS programmes often add an interview or biology background check."],
            ["Agriculture & life sciences", "Maths + Chemistry or Physics", "Rules vary widely; confirm per programme."],
            ["Economics, business, finance", "Maths only", "A humanities applicant pool, but Maths is not waived."],
            ["Law, humanities, education, arts", "Maths only", "Plus Humanities Chinese if the degree is Chinese-taught."],
          ],
        },
      },
      {
        id: "chinese-language",
        h2: "Professional Chinese is a language rule, not a subject rule",
        paragraphs: [
          "The Chinese paper depends on how the degree is taught, not what it is about. A Chinese-taught engineering degree needs STEM Chinese; the same degree taught in English needs none.",
          "Humanities and STEM Chinese use the same item types but different reading material. Choosing the wrong stream is a common and expensive mistake — confirm it with admissions before you register.",
        ],
      },
      {
        id: "how-to-check",
        h2: "How to check a specific programme in five minutes",
        bullets: [
          "Find the programme page on the university's international admissions site, not the Chinese-language homepage.",
          "Look for the CSCA section: most list required papers by programme.",
          "If it is not published, email admissions with your programme name and intake year.",
          "Check the programme page on the university's international admissions site, then verify by email.",
          "Write the answer into your application spreadsheet — requirements change between cycles.",
        ],
        callout:
          "Some universities require three papers (Maths + Physics + Chemistry) for specific engineering programmes. If yours does, your CSCA fee is CNY 700 rather than 450 — budget for it.",
      },
    ],
    related: [
      { label: "University requirements", href: "/requirements" },
      { label: "CSCA exam guide", href: "/csca" },
      { label: "CSCA vs HSK", href: "/guides/csca-vs-hsk" },
    ],
  },
  {
    slug: "csca-registration-step-by-step",
    eyebrow: "Registration",
    title: "CSCA registration, step by step (and what goes wrong)",
    h1: "CSCA registration, step by step (and what goes wrong)",
    description:
      "How to register for the CSCA: documents, photo rules, subject selection, payment, test-day setup and the mistakes that cost applicants a sitting.",
    keywords: ["CSCA registration", "how to register for CSCA", "CSCA exam fee", "CSCA photo requirements"],
    published: "2026-10-15",
    modified: "2026-10-27",
    readingMinutes: 6,
    intro:
      "Registration is straightforward — until it is not. Photo rejections, closed windows and wrong subject combinations are the three failures we see most often, and all three are avoidable.",
    takeaway:
      "Register as early as the window allows, pay immediately, and screenshot every confirmation page. The system is not forgiving about late payment.",
    sections: [
      {
        id: "documents",
        h2: "What you need before you start",
        bullets: [
          "A valid government-issued passport (the number must match exactly).",
          "A compliant photo: plain background, full face, no filters, recent.",
          "A credit card that works for international payments.",
          "Your target universities' subject requirements, in writing.",
          "An email address you check daily — all notices go there.",
        ],
      },
      {
        id: "steps",
        h2: "The registration sequence",
        paragraphs: [
          "All registration happens at csca.cn. Create an account first, because you cannot register or raise enquiries without one.",
        ],
        bullets: [
          "1. Create an account and verify your email.",
          "2. Complete your profile: name exactly as in your passport, ID number, nationality.",
          "3. Choose the sitting and the format available to you.",
          "4. Select subjects. This is the step to double-check against admissions guidance.",
          "5. Upload the photo and submit the identity document.",
          "6. Pay: CNY 450 for one subject, CNY 700 for two or more.",
          "7. Save the confirmation and note the registration close date.",
        ],
        callout:
          "A registration is not complete until payment clears. Unpaid applications are dropped when the window closes, with no grace period.",
      },
      {
        id: "test-day",
        h2: "Test-day setup for home-based online proctoring",
        paragraphs: [
          "If you are sitting online, the technical setup is part of the exam. Test it a day early, not ten minutes before.",
        ],
        bullets: [
          "Wired or stable internet; a phone hotspot as backup is sensible.",
          "A quiet, private room with a desk and no notes on the walls.",
          "A working camera and microphone, tested in the proctoring system.",
          "Your ID document on the desk, and nothing else.",
          "The correct local start time converted from Beijing time.",
        ],
      },
      {
        id: "mistakes",
        h2: "The mistakes that actually happen",
        bullets: [
          "Registering for the wrong Chinese stream (Humanities vs STEM).",
          "Assuming an English-taught programme needs Professional Chinese.",
          "Missing the payment window by minutes.",
          "A photo that does not match the passport photo rules.",
          "Booking a sitting too late for the university's application deadline.",
        ],
        paragraphs: [
          "Work backwards from the university deadline, leave room for one retake, and register in the earliest window you can. A retake is a new registration and a new fee.",
        ],
      },
    ],
    related: [
      { label: "Exam dates and fees", href: "/exam-dates" },
      { label: "Which subjects by major", href: "/guides/csca-subjects-by-major" },
      { label: "CSCA exam guide", href: "/csca" },
    ],
  },
  {
    slug: "csca-scoring-and-percentiles",
    eyebrow: "Scoring",
    title: "How CSCA scoring and percentiles actually work",
    h1: "How CSCA scoring and percentiles actually work",
    description:
      "Each CSCA subject is scored 0–100, but universities also see your global percentile. What that means for target scores, retakes and scholarship shortlisting.",
    keywords: ["CSCA scoring", "CSCA percentile", "CSCA passing score", "CSCA score report"],
    published: "2026-10-22",
    modified: "2026-10-27",
    readingMinutes: 5,
    intro:
      "The 0–100 score is easy to understand and easy to misread. Two applicants with the same score can look very different to an admissions officer, because the percentile sits beside the number.",
    takeaway:
      "Aim for 70+ as a baseline, 85+ to be genuinely competitive at top universities, and treat every score as a diagnosis of topics rather than a verdict.",
    sections: [
      {
        id: "scoring",
        h2: "From answers to a 0–100 score",
        paragraphs: [
          "Every paper is single-answer multiple choice with no negative marking. The score is proportional to correct answers: correct ÷ total × 100, rounded.",
          "That means 34 of 48 on Mathematics is a 71. On an 80-question Chinese paper, 56 correct is a 70. The arithmetic is simple; the interpretation is not.",
        ],
      },
      {
        id: "percentile",
        h2: "Why percentile changes the story",
        paragraphs: [
          "Universities can see where you sat in the global cohort that took the same paper. A 70 in a strong cohort may be a below-average percentile; a 70 in a weak cohort may be well above average.",
          "Percentiles are also unstable early in a new exam's life, when cohorts are small and self-selected. Treat them as context, not destiny.",
        ],
        callout:
          "We show a modelled percentile in the app and label it as an estimate. Anyone presenting an official percentile outside your score report is guessing.",
      },
      {
        id: "targets",
        h2: "Setting a target that means something",
        bullets: [
          "Baseline for most scholarship shortlists: 70+ on every required paper.",
          "Competitive at top-20 universities: 85+.",
          "Medicine and competitive engineering: 80+ with strong science scores.",
          "Below 50: rebuild foundations before re-sitting — a retake without remediation rarely moves much.",
        ],
        paragraphs: [
          "Set targets per subject rather than an overall average. Universities see each paper separately, and a strong Maths score does not compensate for a weak required science paper.",
        ],
      },
      {
        id: "retakes",
        h2: "Should you retake?",
        paragraphs: [
          "Retake if your score is below the target for your programme and you have at least four weeks to fix specific topics. Do not retake hoping for a better day: without remediation, scores regress to the same mean.",
          "Check whether your university accepts the best score across sittings or the most recent one. Policies differ, and it changes the calculation.",
        ],
      },
    ],
    related: [
      { label: "Score calculator", href: "/tools/score-calculator" },
      { label: "8-week study plan", href: "/guides/8-week-csca-study-plan" },
      { label: "Full exam guide", href: "/csca" },
    ],
  },
];

export const GUIDE_MAP = Object.fromEntries(GUIDES.map((guide) => [guide.slug, guide]));
