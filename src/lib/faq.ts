/**
 * The CSCA FAQ, in one place.
 *
 * Every answer here is a restatement of an official source (csca.cn, the CSC
 * syllabi, the CSCA Test Rules or the Device & Environment document) or of a
 * policy this site states openly (e.g. "we model the percentile"). Nothing is
 * invented to fill a gap: where the official rules are silent, the answer says
 * so and tells the reader what to confirm with the university.
 */

export type FaqItem = { id: string; q: string; a: string };
export type FaqGroup = { id: string; title: string; blurb: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "basics",
    title: "The exam itself",
    blurb: "What the CSCA is, who runs it, and what it is used for.",
    items: [
      {
        id: "what-is-csca",
        q: "What is the CSCA?",
        a: "The China Scholastic Competency Assessment (来华留学本科入学学业水平测试) is the standardised undergraduate entrance test for international students applying to Chinese universities. It is organised by the China Scholarship Council (CSC) with Chinese university experts, and it measures academic readiness — and, for CGS applicants and Chinese-taught degrees, academic Chinese — rather than conversational language ability.",
      },
      {
        id: "who-needs-it",
        q: "Who has to take the CSCA?",
        a: "Applicants to Chinese Government Scholarship (CGS) universities need it, and CGS applicants as well as Chinese-taught programmes must sit one of the two Professional Chinese papers. CSCA scores are recognised by 300+ universities as an admission reference. It is not the sole criterion, it does not guarantee admission, and each institution applies its own rules.",
      },
      {
        id: "is-it-mandatory",
        q: "Is the CSCA compulsory for every applicant?",
        a: "Not universally. CSCA is compulsory where the receiving university requires it, and for Chinese Government Scholarship applicants. Because institutions set their own requirements, confirm with the admissions office of the programme you are applying to before you pay a registration fee.",
      },
      {
        id: "who-is-eligible",
        q: "Who is eligible to register?",
        a: "Non-Chinese citizens planning to study for an undergraduate degree in mainland China. Holders of Chinese passports, or of Hong Kong, Macao or Taiwan residence permits, are not eligible. There is no age limit, but applicants under 18 need a parent or guardian to complete registration.",
      },
      {
        id: "how-many-subjects",
        q: "How many subjects can I take in one sitting?",
        a: "There is no limit on the number of subjects per session. In practice the combination is two or three papers: Mathematics plus Professional Chinese, with Physics and/or Chemistry where the programme requires them.",
      },
      {
        id: "postgraduate",
        q: "Does the CSCA apply to master's or PhD applicants?",
        a: "The CSCA is an undergraduate admission test. Postgraduate applicants follow their programme's own rules, which usually involve language requirements and academic transcripts rather than the CSCA. Check the specific programme page.",
      },
    ],
  },
  {
    id: "subjects",
    title: "Subjects and format",
    blurb: "Five papers, two lengths, and which combination your programme needs.",
    items: [
      {
        id: "which-subjects",
        q: "Which subjects do I need?",
        a: "Mathematics is compulsory for every applicant. CSCA lists Professional Chinese — Humanities (文科中文) or STEM (理科中文) depending on your major — as compulsory for Chinese Government Scholarship applicants and for Chinese-taught programmes. Physics and Chemistry are electives in the official structure, but a science, engineering, agriculture or medicine programme will usually require at least one of them. The receiving university sets the final combination.",
      },
      {
        id: "paper-lengths",
        q: "How long is each paper and how many questions does it have?",
        a: "Mathematics, Physics and Chemistry are 48 single-answer questions in 60 minutes each. Both Professional Chinese papers are 80 single-answer questions in 90 minutes. Every paper is scored 0–100.",
      },
      {
        id: "language",
        q: "Can I take the exam in English?",
        a: "Mathematics, Physics and Chemistry are offered in Chinese and English, and you choose per subject at registration. Professional Chinese is Chinese only. Where an institution specifies a language, sit that one — the score report records the language you sat.",
      },
      {
        id: "chinese-stream",
        q: "How do I choose between Humanities Chinese and STEM Chinese?",
        a: "Follow your major group. Literature, philosophy, law, education, history and arts applicants sit 文科中文; maths, science, engineering and computer applicants sit 理科中文. Both use the same six item types (character recognition, word-filling, word discrimination, paragraph completion, sentence completion, reading comprehension) applied to different topic domains.",
      },
      {
        id: "negative-marking",
        q: "Is there negative marking?",
        a: "No. Each question has one correct answer among four options, and a wrong answer scores the same as a blank. Guessing is never worse than leaving a question empty.",
      },
      {
        id: "different-language",
        q: "Can I choose a different language for each subject?",
        a: "Yes. For Mathematics, Physics and Chemistry you may choose Chinese or English per subject. Professional Chinese is always Chinese. If your target institution requires a specific language, follow that requirement.",
      },
      {
        id: "syllabus",
        q: "Is there an official syllabus?",
        a: "Yes — CSC published 2025 syllabi covering all five papers (Mathematics, Physics and Chemistry PDFs on csca.cn/about/testprep, plus specifications for 文科中文 and 理科中文). The maths syllabus covers sets and inequalities, functions (including sequences and derivatives), geometry and algebra, and probability and statistics; physics covers mechanics, electromagnetism, thermodynamics, optics and modern physics; chemistry covers basic concepts and calculations, substance properties and reactions, theories and laws, and experimental applications.",
      },
    ],
  },
  {
    id: "registration",
    title: "Registration, fees and tickets",
    blurb: "Where to register, what it costs, and what cannot be changed later.",
    items: [
      {
        id: "how-to-register",
        q: "How do I register?",
        a: "Only on the official portal, csca.cn. Create an account, complete the required information, choose your sitting, format and subjects, and pay the fee. Registration is complete once you receive a confirmation email. No third-party site can register you.",
      },
      {
        id: "fees",
        q: "How much does it cost?",
        a: "CNY 450 for one subject and CNY 700 for two or more, paid by Visa or Mastercard. A retake is a new registration, and there is no per-retake discount.",
      },
      {
        id: "documents",
        q: "What do I need before registering?",
        a: "A long-term email address, a valid ID document (a passport is the most common), a compliant digital ID photo, and a card for the fee. The details you enter must match your passport and your later university application exactly — a mismatch can mean denied entry on test day.",
      },
      {
        id: "change-registration",
        q: "Can I change my subjects, date or test centre after registering?",
        a: "No. Once submitted, registration details are locked. Correction and withdrawal requests are only possible before the Admission Ticket is generated; after that, no changes are accepted and withdrawals are refused.",
      },
      {
        id: "refund",
        q: "Can I cancel and get a refund?",
        a: "You can request a cancellation before the Admission Ticket is generated; if approved, the fee is refunded less any processing fee. After the ticket is generated, cancellation is not accepted. If you cannot attend due to force majeure (serious illness, natural disaster), submit supporting documents within 7 business days of the test — approval leads to a refund minus any processing fee.",
      },
      {
        id: "ticket",
        q: "What is the Admission Ticket and when do I get it?",
        a: "It is the document you download from the registration system before the test. It carries your ticket number and password (used to log in), and your name, ID details, date, subjects, centre and seat. Its generation time is set by the platform, and once issued nothing can be edited — download it early and check every field.",
      },
      {
        id: "how-often",
        q: "How often are sittings held?",
        a: "Six times a year: January, March, April, June, November and December. Each sitting runs over two days in Beijing time — Professional Chinese then Mathematics on day one, Physics then Chemistry on day two. Start times alternate by sitting: some run an 08:00 block (08:00–09:30, 11:00–12:00, 08:00–09:00, 10:30–11:30) and others a 14:00 block (14:00–15:30, 17:00–18:00, 14:00–15:00, 16:30–17:30). Check your sitting's timetable and Admission Ticket.",
      },
    ],
  },
  {
    id: "test-day",
    title: "Test day",
    blurb: "Equipment, room rules, check-in and what gets a score cancelled.",
    items: [
      {
        id: "formats",
        q: "How is the test delivered?",
        a: "Three modes with identical content, timings and 0–100 scoring: the remote-proctored home-based test (居家网考) on your own Windows computer, the computer-based test at an authorised centre (集中机考), and a paper-based mode (纸笔考试) in designated regions. Availability per sitting is set inside csca.cn; the home-based test applies where no centre serves your region.",
      },
      {
        id: "equipment",
        q: "What equipment does the home-based test require?",
        a: "A genuine 64-bit Windows 10/11 machine (Windows 7 SP1 and above also works; macOS is not supported), screen resolution at least 1366×768, 4 GB RAM, 2 GB free space, a 720p webcam at the top of the screen, speakers and a microphone, and no wireless headphones. A smartphone or tablet is required as the second camera, positioned at roughly 45° behind you.",
      },
      {
        id: "network",
        q: "What internet speed does it need?",
        a: "At least 20 Mbps symmetrical upload and download, and at least 500 KB/s to the testing platform. Wired broadband is strongly recommended, with a 4G hotspot as backup. The Test Client includes a speed test.",
      },
      {
        id: "scratch",
        q: "Can I use rough paper?",
        a: "No paper. Allowed: a small whiteboard with an erasable marker, or one blank sheet inside a transparent file bag written on with an erasable marker. Show it blank to the proctor before the test and erase it on camera afterwards.",
      },
      {
        id: "check-in",
        q: "When do I have to log in?",
        a: "Login opens 60 minutes before the start, and you must log in no later than 30 minutes early so device checks, facial recognition and ID verification finish before countdown (at least 5 minutes before). Late arrivals are not admitted once the test begins, and the system does not allow early submission or early exit.",
      },
      {
        id: "identity",
        q: "What identity checks happen?",
        a: "You log in with your Admission Ticket number and password, complete facial recognition and ID verification, and follow the proctor's instructions to show your ID and do a 360° scan of the room. If verification fails or you refuse the checks, the test is terminated and the fee is not refunded.",
      },
      {
        id: "violations",
        q: "What happens if I break a rule?",
        a: "CSCA publishes four tiers. Minor: the affected result is cancelled. Serious: cancellation plus a two-year registration ban. Severe: all previous results cancelled plus a permanent ban. Extremely severe: referral to judicial authorities, which can affect study-in-China eligibility and visas. Misconduct can be actioned at any time, including after scores are released.",
      },
      {
        id: "network-failure",
        q: "What if my internet drops during the test?",
        a: "You may log back in and resume; the system keeps your saved progress. Failures on your side (device, power, local network, malware, incorrect setup) are your responsibility and fees are not refunded. If CSCA's own systems fail, CSCA may add time, reschedule, arrange a make-up test or refund at its discretion.",
      },
    ],
  },
  {
    id: "scores",
    title: "Scores, results and retakes",
    blurb: "When results arrive, how long they last, and how universities read them.",
    items: [
      {
        id: "results",
        q: "When do results come out?",
        a: "Within 10 working days of the test date. The electronic score report is published on your CSCA account, and you can download it from there.",
      },
      {
        id: "validity",
        q: "How long is a CSCA score valid?",
        a: "Two years from the date the report is issued. You can sit again and submit your best valid score when applying, subject to the receiving university's policy.",
      },
      {
        id: "retake",
        q: "Can I retake the exam?",
        a: "Yes. CSCA places no limit on the number of attempts. A retake is a new registration and a new fee, and there is no per-retake discount.",
      },
      {
        id: "passing-score",
        q: "What is the passing score?",
        a: "There is no national pass mark. Each subject is scored 0–100 and each university sets its own minimum, so 'passing' depends on your programme. A score is a reference point in the application, not a threshold CSCA itself enforces.",
      },
      {
        id: "percentile",
        q: "Do universities see a percentile?",
        a: "Yes — when verifying a score report, universities can see the candidate's global percentile ranking alongside the score. We publish a modelled percentile in our dashboard and label it as a modelled estimate: we do not have access to live CSCA cohort data, so treat ours as a coaching indicator, never as an official percentile.",
      },
      {
        id: "score-explain",
        q: "How is the raw mark converted to 0–100?",
        a: "Each paper's raw correct count is scaled to 100: correct ÷ total × 100, rounded. With 48 questions each correct answer is worth about 2.08 points; with 80 questions each is worth 1.25. There is no negative marking, so unanswered questions are simply worth zero.",
      },
      {
        id: "send-scores",
        q: "Do I send scores to universities myself?",
        a: "You download the electronic report from your CSCA account and submit it with your application. CSCA does not act as an admissions agent, and universities make their own decisions.",
      },
    ],
  },
  {
    id: "preparation",
    title: "Preparation",
    blurb: "How much time it takes, and what actually moves a score.",
    items: [
      {
        id: "how-long",
        q: "How long should I prepare?",
        a: "The honest answer depends on your starting level. Students entering at a comfortable A-level or senior-high standard typically need 6–10 weeks of focused work; rebuilding weak maths topics takes longer. What matters more than total hours is sitting full papers under time pressure and reviewing every error.",
      },
      {
        id: "timing",
        q: "Is time pressure really a factor?",
        a: "Yes. 48 questions in 60 minutes is 75 seconds each, and 80 questions in 90 minutes is 67.5 seconds each — including reading. Almost every candidate loses marks to the clock before they lose them to difficulty, which is why our simulator anchors the timer server-side and reproduces the palette.",
      },
      {
        id: "practice-value",
        q: "Do mock tests actually improve scores?",
        a: "They improve the two things examinations reward: recognition speed on familiar item types and error correction. A mock you review is worth three you don't. Our papers come with a worked explanation for every question, a topic breakdown, and a review queue that resurfaces what you missed.",
      },
      {
        id: "official-papers",
        q: "Are official past papers available?",
        a: "CSC publishes official syllabi and sample questions for Mathematics, Physics and Chemistry on csca.cn/about/testprep (no public Professional Chinese syllabus PDF is included there). Full past papers are not released as an archive; we transcribe official sittings for study and label every transcription, including how many items a partial transcription contains.",
      },
      {
        id: "chinese-prep",
        q: "How do I prepare for Professional Chinese?",
        a: "Two things in parallel: technical vocabulary for your stream (maths symbols, physics laws, chemistry equations and lab language for 理科中文; literature, law, history and education for 文科中文) and timed reading practice, because 80 questions in 90 minutes is a reading-speed test as much as a vocabulary test.",
      },
      {
        id: "sitting-choice",
        q: "Which sitting should I book?",
        a: "Work backwards from your university deadline and leave room for one retake. Sitting in December or January lets you retake in March or April if the score falls short. Registration windows are short and announced on csca.cn.",
      },
    ],
  },
];

export const FAQ_TOTAL = FAQ_GROUPS.reduce((total, group) => total + group.items.length, 0);
