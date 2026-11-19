/**
 * Test-day rules for the CSCA home-based test (居家网考).
 *
 * Every statement here is taken from the official CSCA documentation:
 *
 *   - Device & Environment Requirements (CSCA, 2026)
 *   - Test Rules (CSCA, 2026)
 *   - Candidate notice pages on csca.cn
 *
 * Keep this file as data: the /test-day page renders it, the exam briefing
 * links to it, and the glossary quotes it. If CSCA republishes the rules,
 * update here and date the page.
 */

export const RULES_UPDATED = "November 2026";

export type RuleGroup = {
  id: string;
  title: string;
  intro: string;
  items: { label: string; detail: string; ok?: boolean }[];
};

export const EQUIPMENT_RULES: RuleGroup = {
  id: "equipment",
  title: "Equipment and network",
  intro:
    "The home-based test is dual-device: one computer to answer the questions, one phone or tablet behind you for the proctor's view.",
  items: [
    {
      label: "Primary device",
      detail:
        "A genuine 64-bit Windows 10/11 machine (or Windows 7 SP1 and above). macOS is not supported. Screen resolution at least 1366×768, RAM at least 4 GB, and 2 GB of free space on the partition that hosts the CSCA Test Client.",
      ok: true,
    },
    {
      label: "Camera and audio",
      detail:
        "Built-in webcam or external USB camera at the top of the screen, 720p minimum (1080p recommended), plus working speakers and a microphone. Wireless headphones are strictly prohibited.",
      ok: true,
    },
    {
      label: "Secondary device",
      detail:
        "A smartphone or tablet with a working camera running the proctoring app, on a stand at roughly a 45° rear-side angle so it captures your upper body, hands and the primary screen.",
      ok: true,
    },
    {
      label: "Network",
      detail:
        "Symmetrical upload and download of at least 20 Mbps, and at least 500 KB/s to the testing platform. Wired broadband is strongly recommended; keep a 4G hotspot ready as a backup.",
      ok: true,
    },
    {
      label: "Privacy screens",
      detail: "Anti-glare and privacy filters are not allowed — the proctor must be able to read your screen.",
      ok: false,
    },
    {
      label: "MacOS, tablets or phones as the primary device",
      detail: "The Test Client is Windows-only. You cannot sit the paper from macOS, iOS, Android or a Chromebook.",
      ok: false,
    },
  ],
};

export const ENVIRONMENT_RULES: RuleGroup = {
  id: "environment",
  title: "Room and desk",
  intro:
    "The room has to work for a remote proctor: enclosed, quiet, well lit, and empty of anything that could be used to cheat.",
  items: [
    {
      label: "Private, enclosed room",
      detail:
        "Independent, quiet, well lit, with no blind spots. Nobody else may enter or disturb you during the test.",
      ok: true,
    },
    { label: "Standard desk and chair", detail: "Sit at a desk. Bed, sofa, lap or floor are not allowed.", ok: true },
    {
      label: "Scratch tool",
      detail:
        "A small whiteboard with an erasable marker, or one blank sheet inside a transparent file bag written on with an erasable marker. Show it blank to the proctor before the test and erase it in front of them afterwards.",
      ok: true,
    },
    {
      label: "On the desk",
      detail: "Only permitted items: computer, keyboard, mouse, scratch tool, your ID document and Admission Ticket.",
      ok: true,
    },
    {
      label: "Paper, notes, phones, books",
      detail:
        "Paper scratch sheets, sticky notes, textbooks, notes and unauthorised devices are prohibited in the testing area.",
      ok: false,
    },
    {
      label: "Public or shared spaces",
      detail: "Parks, cafés, restaurants, open-plan offices and internet cafés are all prohibited.",
      ok: false,
    },
  ],
};

export const TIMELINE_RULES: { time: string; title: string; detail: string }[] = [
  {
    time: "60–30 min before",
    title: "Log in and set up",
    detail:
      "Login opens 60 minutes before the test and closes for entry 30 minutes before start. Sign in to the Test Client, complete the system, camera, microphone and network check, and connect the secondary device by scanning the QR code on screen.",
  },
  {
    time: "15–30 min before",
    title: "Identity verification",
    detail:
      "Log in with your Admission Ticket number and password, complete facial recognition and ID verification, and follow the proctor's 360° room scan. Have your ID and ticket on the desk.",
  },
  {
    time: "5 min before",
    title: "Final checks",
    detail:
      "Show your blank scratch tool, read and accept the Integrity Commitment Form, then wait for the countdown. Late arrivals are not admitted after the test begins.",
  },
  {
    time: "During",
    title: "Answering",
    detail:
      "The timer starts automatically in full screen. Answers save continuously and answered questions turn green in the palette. You may review and change answers until time expires.",
  },
  {
    time: "At the end",
    title: "Automatic submission",
    detail:
      "The system submits for you when time runs out — early submission is not permitted. Wait for the submission confirmation, then erase your scratch tool on camera.",
  },
];

export const CONDUCT_RULES: string[] = [
  "Both cameras and microphones stay on for the whole test. Do not move, cover or switch off the primary camera.",
  "No leaving your seat, no talking to anyone, no accessories that obscure your face.",
  "Switching screens, using a second monitor, running non-test apps, remote access or screen sharing are prohibited.",
  "Recording, photographing or sharing questions or answers is prohibited, before, during and after the test.",
  "Close antivirus and background apps before you start. Put the secondary device in Do Not Disturb; “Airplane Mode + Wi-Fi” is the recommended setup.",
];

export const VIOLATION_RULES: { level: string; consequence: string }[] = [
  {
    level: "Minor",
    consequence: "The affected test's results are cancelled.",
  },
  {
    level: "Serious",
    consequence:
      "Results cancelled plus a two-year suspension from registering for any CSCA test, from the date of the violation.",
  },
  {
    level: "Severe",
    consequence: "All previous CSCA results cancelled and a permanent ban from taking any CSCA test.",
  },
  {
    level: "Extremely severe",
    consequence:
      "Referred to judicial authorities, which can affect eligibility to study in China and future visa applications.",
  },
];

/** Things that invalidate a registration or a score, worth stating plainly. */
export const REGISTRATION_FACTS: { q: string; a: string }[] = [
  {
    q: "Who is eligible?",
    a: "Non-Chinese citizens applying for undergraduate study in mainland China. Holders of Chinese passports, or of Hong Kong, Macao or Taiwan residence permits, are not eligible to register. There is no age limit, but applicants under 18 need a parent or guardian to complete registration.",
  },
  {
    q: "What do I need before registering?",
    a: "A long-term email address, a valid ID document (a passport is the usual one), a compliant digital ID photo, and a Visa or Mastercard for the fee. The details you enter must match your passport and your later university application exactly.",
  },
  {
    q: "Can I change my subjects, date or centre after registering?",
    a: "No. Once submitted, registration details are locked. Corrections and withdrawals are only possible before the Admission Ticket is generated — after that, no changes are accepted and withdrawals are refused.",
  },
  {
    q: "Can I take it more than once?",
    a: "Yes. There is no limit on attempts, each score is valid for two years, and you may submit your best valid score when applying — subject to the receiving university's policy.",
  },
  {
    q: "Can I sit the home-based test if my city has a centre?",
    a: "No. The remote-proctored home-based test is only available in countries and regions where computer-based or paper-based testing at a centre is not yet accessible.",
  },
  {
    q: "What happens if my equipment fails?",
    a: "Candidates are responsible for their own equipment, connection, power and environment. If you cannot sit the test for those reasons, fees are not refunded. If CSCA's own systems fail, CSCA may add time, reschedule, arrange a make-up test or refund at its discretion.",
  },
];
