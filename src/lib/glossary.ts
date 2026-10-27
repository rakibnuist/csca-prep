export type GlossaryTerm = {
  slug: string;
  term: string;
  zh?: string;
  category: "The exam" | "Admissions" | "Preparation";
  definition: string;
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "csca",
    term: "CSCA",
    zh: "来华留学本科入学学业水平测试",
    category: "The exam",
    definition:
      "China Scholastic Competency Assessment — the standardized undergraduate admission test for international students applying to Chinese universities, organised by the China Scholarship Council. It covers Professional Chinese and the fundamental subjects Mathematics, Physics and Chemistry.",
  },
  {
    slug: "csc",
    term: "China Scholarship Council (CSC)",
    zh: "国家留学基金管理委员会",
    category: "The exam",
    definition:
      "The government body that funds Chinese Government Scholarships and develops the CSCA with university experts. It is not the same organisation as the universities that admit you.",
  },
  {
    slug: "professional-chinese",
    term: "Professional Chinese",
    zh: "专业中文",
    category: "The exam",
    definition:
      "The CSCA paper that tests Chinese for academic study rather than daily conversation. It comes in two streams — Humanities and STEM — and is 80 questions in 90 minutes, scored 0–100.",
  },
  {
    slug: "humanities-chinese",
    term: "Humanities Chinese",
    zh: "文科中文",
    category: "The exam",
    definition:
      "The Professional Chinese stream for applicants to literature, philosophy, law, education, history and arts programmes. Reading passages are drawn from humanities disciplines.",
  },
  {
    slug: "stem-chinese",
    term: "STEM Chinese",
    zh: "理科中文",
    category: "The exam",
    definition:
      "The Professional Chinese stream for science and engineering applicants. It tests mathematical symbols, formula language, physical laws, chemical equations and laboratory terminology.",
  },
  {
    slug: "fundamental-subjects",
    term: "Fundamental subjects",
    category: "The exam",
    definition:
      "Mathematics, Physics and Chemistry — the three subject papers that can be sat in Chinese or English. Each is 48 questions in 60 minutes and scored 0–100.",
  },
  {
    slug: "home-based-online",
    term: "Home-based online proctoring",
    category: "The exam",
    definition:
      "The default CSCA delivery format: you sit the exam at home under remote supervision. Test centres are being added gradually, starting in Vietnam and Thailand.",
  },
  {
    slug: "percentile",
    term: "Percentile",
    category: "The exam",
    definition:
      "Your position relative to every candidate who sat the same paper. A 90th percentile means you scored above 90% of candidates. Universities see this alongside your raw 0–100 score.",
  },
  {
    slug: "score-report",
    term: "Score report",
    category: "The exam",
    definition:
      "The official document issued through your CSCA account after results are released — within 7 working days for online and computer-based tests, 14 for paper-based tests.",
  },
  {
    slug: "negative-marking",
    term: "Negative marking",
    category: "The exam",
    definition:
      "A penalty for wrong answers. The CSCA does not use one, which means an educated guess is never worse than a blank.",
  },
  {
    slug: "cgs",
    term: "Chinese Government Scholarship (CGS)",
    zh: "中国政府奖学金",
    category: "Admissions",
    definition:
      "The flagship Chinese government scholarship for international students. The CSCA requirement applies to undergraduate applicants at CGS-participating universities from the 2026/27 academic year.",
  },
  {
    slug: "campus-china",
    term: "Campus China",
    category: "Admissions",
    definition:
      "The online application system for Chinese Government Scholarships. You submit your CGS application there, while CSCA registration happens separately at csca.cn.",
  },
  {
    slug: "double-first-class",
    term: "Double First Class",
    zh: "双一流",
    category: "Admissions",
    definition:
      "China's current national university excellence scheme, replacing 985/211 as the headline classification. Many universities carry both labels in their marketing.",
  },
  {
    slug: "985-211",
    term: "985 and 211",
    category: "Admissions",
    definition:
      "Earlier tiers of elite Chinese universities. 985 refers to roughly 39 top universities; 211 covers about 115. The labels still signal selectivity and scholarship competition.",
  },
  {
    slug: "hsk",
    term: "HSK",
    zh: "汉语水平考试",
    category: "Admissions",
    definition:
      "The standardized Chinese proficiency test (Hanyu Shuiping Kaoshi), separate from the CSCA. Some universities accept HSK 4 or 5 in place of Professional Chinese for certain programmes, including Chinese Language majors.",
  },
  {
    slug: "english-taught",
    term: "English-taught programme",
    category: "Admissions",
    definition:
      "A degree taught entirely in English. Applicants are normally exempt from Professional Chinese but still sit Mathematics and any required science subject.",
  },
  {
    slug: "chinese-taught",
    term: "Chinese-taught programme",
    category: "Admissions",
    definition:
      "A degree taught in Chinese. Applicants usually need Professional Chinese plus the fundamental subjects for their programme, and may also need an HSK score for admission.",
  },
  {
    slug: "pre-admission",
    term: "Pre-admission letter",
    category: "Admissions",
    definition:
      "A conditional offer issued by a university before formal admission. Some scholarship routes ask for one; it does not replace the CSCA score report.",
  },
  {
    slug: "jw202",
    term: "JW202 form",
    category: "Admissions",
    definition:
      "The visa application form for foreign students (Visa Application for Study in China), issued by the university after admission and used for the X1/X2 student visa.",
  },
  {
    slug: "application-window",
    term: "Application window",
    category: "Admissions",
    definition:
      "The dates during which a university accepts applications for a given intake. CGS rounds usually run December to March; self-funded deadlines vary and are often rolling.",
  },
  {
    slug: "syllabus",
    term: "Syllabus",
    category: "Preparation",
    definition:
      "The official topic list for each paper, published by CSCA as PDFs. It defines what can be examined, but not the exact questions or the weighting of each topic.",
  },
  {
    slug: "topic-mastery",
    term: "Topic mastery",
    category: "Preparation",
    definition:
      "A per-topic accuracy percentage built from your answers across papers. It is far more actionable than an overall score because it names what to study next.",
  },
  {
    slug: "mock-exam",
    term: "Mock exam",
    category: "Preparation",
    definition:
      "A full-length paper sat under exam conditions. Its value comes from the timing and the review afterwards, not from the number itself.",
  },
  {
    slug: "diagnostic-paper",
    term: "Diagnostic paper",
    category: "Preparation",
    definition:
      "A full paper taken before any revision, to establish an honest baseline. Starting with revision hides the topics you actually need to fix.",
  },
  {
    slug: "error-log",
    term: "Error log",
    category: "Preparation",
    definition:
      "A running list of every missed question with the topic, the cause (concept, arithmetic, misread) and the rule you forgot. Official CSCA preparation guidance recommends one.",
  },
  {
    slug: "sectional-timing",
    term: "Sectional timing",
    category: "Preparation",
    definition:
      "Budgeting minutes per block of questions. In a 48-question, 60-minute paper you have about 75 seconds per question — a number worth rehearsing.",
  },
  {
    slug: "spaced-repetition",
    term: "Spaced repetition",
    category: "Preparation",
    definition:
      "Revisiting material at increasing intervals so it moves into long-term memory. Our review queue applies it to missed questions at 1, 3, 6, 12 and 21 days.",
  },
  {
    slug: "readiness",
    term: "Readiness score",
    category: "Preparation",
    definition:
      "A composite coaching signal (recent performance, syllabus coverage and practice volume) that tracks whether you are trending towards your target. It is not a prediction of your exam result.",
  },
];

export const GLOSSARY_CATEGORIES = ["The exam", "Admissions", "Preparation"] as const;
