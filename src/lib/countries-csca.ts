import { EXAM_BLOCKS, type ExamBlock } from "@/lib/site";

/**
 * Country data for CSCA applicants.
 *
 * Two rules keep this file honest:
 *
 *   1. Nothing here is a claim about a specific country's exam rules. The CSCA
 *      rules are global (Beijing-time sittings, home-based test only where no
 *      centre exists, CNY fees) — the only thing that changes by country is the
 *      local clock and, for some, whether a centre has been announced.
 *   2. Local times are arithmetic on the published Beijing timetable (UTC+8),
 *      not a claim that CSCA has scheduled anything locally. CSCA sittings
 *      alternate between two published start blocks (14:00 and 08:00 Beijing
 *      time), and where a country observes daylight saving the offset changes.
 */

export type CountryGuide = {
  slug: string;
  name: string;
  nameZh: string;
  /** Standard offset from UTC in hours; null where DST makes a single figure wrong. */
  utcOffset: number | null;
  dst?: string;
  /** ISO-ish label used in copy. */
  offsetLabel: string;
  note: string;
  /** Why applicants from here usually sit the exam. */
  context: string;
};

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    slug: "bangladesh",
    name: "Bangladesh",
    nameZh: "孟加拉国",
    utcOffset: 6,
    offsetLabel: "UTC+6 (no daylight saving)",
    note: "Bangladesh is two hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 12:00 local time and Mathematics at 15:00; on 08:00-block sittings (Dec 2026, Jun 2027) they start at 06:00 and 09:00.",
    context:
      "One of the largest sources of Chinese Government Scholarship applications, with a well-developed agency ecosystem in Dhaka. Both maths-and-science and humanities tracks are common.",
  },
  {
    slug: "nigeria",
    name: "Nigeria",
    nameZh: "尼日利亚",
    utcOffset: 1,
    offsetLabel: "UTC+1 (no daylight saving)",
    note: "Nigeria is seven hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 07:00 local time and Mathematics at 10:00; on 08:00-block sittings (Dec 2026, Jun 2027) they move to 01:00 and 04:00 overnight.",
    context:
      "Applicants usually combine CSCA with a CSC online application in the same cycle; the time difference makes the 14:00-block sittings far more manageable from West Africa.",
  },
  {
    slug: "pakistan",
    name: "Pakistan",
    nameZh: "巴基斯坦",
    utcOffset: 5,
    offsetLabel: "UTC+5 (no daylight saving)",
    note: "Pakistan is three hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 11:00 local time and Mathematics at 14:00; on 08:00-block sittings (Dec 2026, Jun 2027) they start at 05:00 and 08:00.",
    context:
      "Engineering and medicine applicants dominate, so Mathematics plus Physics or Chemistry is the usual combination, with Professional Chinese added for CGS applicants and Chinese-taught programmes.",
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    nameZh: "越南",
    utcOffset: 7,
    offsetLabel: "UTC+7 (no daylight saving)",
    note: "Vietnam is one hour behind Beijing: on 14:00-block sittings Professional Chinese starts at 13:00 local time and Mathematics at 16:00; on 08:00-block sittings (Dec 2026, Jun 2027) they start at 07:00 and 10:00.",
    context:
      "Close time zone alignment makes both 08:00 and 14:00 Beijing blocks straightforward, and both STEM and humanities Chinese papers are commonly sat.",
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    nameZh: "印度尼西亚",
    utcOffset: 7,
    offsetLabel: "UTC+7 (Jakarta; other islands differ)",
    note: "Jakarta (WIB) is one hour behind Beijing (13:00/16:00 on 14:00 blocks; 07:00/10:00 on 08:00 blocks). WITA (UTC+8) matches Beijing time and WIT (UTC+9) is one hour ahead, so verify against your own province.",
    context:
      "A large applicant base across Java and Sumatra; candidates often sit Mathematics plus Chemistry for medicine and pharmacy programmes.",
  },
  {
    slug: "kenya",
    name: "Kenya",
    nameZh: "肯尼亚",
    utcOffset: 3,
    offsetLabel: "UTC+3 (no daylight saving)",
    note: "Kenya is five hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 09:00 local time and Mathematics at 12:00; on 08:00-block sittings (Dec 2026, Jun 2027) they start at 03:00 and 06:00.",
    context:
      "East African applicants typically target engineering and agriculture programmes, and the January, March or April 14:00-block sittings avoid overnight starts.",
  },
  {
    slug: "egypt",
    name: "Egypt",
    nameZh: "埃及",
    utcOffset: 2,
    offsetLabel: "UTC+2 (UTC+3 in Egyptian summer time)",
    dst: "Egypt reintroduced daylight saving in 2023, so the offset becomes UTC+3 from late April to late October — the April and June sittings can fall either side of the change. Re-check the hour on your own clock that week.",
    note: "Cairo is six hours behind Beijing in standard time (08:00/11:00 on 14:00 blocks; 02:00/05:00 on 08:00 blocks). During Egyptian summer time both blocks shift one hour later locally.",
    context:
      "A long-established applicant base for Chinese Government Scholarships, with medicine and engineering the most common targets.",
  },
  {
    slug: "ethiopia",
    name: "Ethiopia",
    nameZh: "埃塞俄比亚",
    utcOffset: 3,
    offsetLabel: "UTC+3 (no daylight saving)",
    note: "Ethiopia is five hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 09:00 local time and Mathematics at 12:00; on 08:00-block sittings (Dec 2026, Jun 2027) they start at 03:00 and 06:00.",
    context:
      "Applicants typically prepare with limited access to invigilated mock tests, so a browser-based simulation is often the only timed practice available.",
  },
  {
    slug: "ghana",
    name: "Ghana",
    nameZh: "加纳",
    utcOffset: 0,
    offsetLabel: "UTC+0 (no daylight saving)",
    note: "Ghana shares UTC, eight hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 06:00 local time and Mathematics at 09:00; on 08:00-block sittings (Dec 2026, Jun 2027) they land overnight at 00:00 and 03:00.",
    context:
      "Engineering and agriculture programmes are the usual targets; the January, March and April 14:00-block sittings fit daytime hours far better than December or June.",
  },
  {
    slug: "india",
    name: "India",
    nameZh: "印度",
    utcOffset: 5.5,
    offsetLabel: "UTC+5:30 (no daylight saving)",
    note: "India is 2.5 hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 11:30 local time and Mathematics at 14:30; on 08:00-block sittings (Dec 2026, Jun 2027) they start at 05:30 and 08:30.",
    context:
      "A very large applicant base across engineering, medicine and business; both English and Chinese exam languages are chosen depending on the programme.",
  },
  {
    slug: "iran",
    name: "Iran",
    nameZh: "伊朗",
    utcOffset: 3.5,
    offsetLabel: "UTC+3:30 (no daylight saving since 2022)",
    note: "Iran is 4.5 hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 09:30 local time and Mathematics at 12:30; on 08:00-block sittings (Dec 2026, Jun 2027) they start at 03:30 and 06:30.",
    context:
      "Engineering and pure sciences dominate, and candidates usually sit Mathematics plus Physics rather than Chemistry.",
  },
  {
    slug: "kazakhstan",
    name: "Kazakhstan",
    nameZh: "哈萨克斯坦",
    utcOffset: 5,
    offsetLabel: "UTC+5 (single national zone since 2024)",
    note: "Kazakhstan unified on UTC+5 in 2024, three hours behind Beijing: on 14:00-block sittings Professional Chinese starts at 11:00 and Mathematics at 14:00; on 08:00-block sittings (Dec 2026, Jun 2027) they start at 05:00 and 08:00.",
    context:
      "Central Asian applicants often apply through regional scholarship channels, with engineering, medicine and economics the common programmes.",
  },
];

export type SittingRow = { paper: string; zh: string; day: string; beijing: string; local: string; minutes: number };

const SUBJECT_NAMES = [
  { paper: "Professional Chinese", zh: "专业中文" },
  { paper: "Mathematics", zh: "数学" },
  { paper: "Physics", zh: "物理" },
  { paper: "Chemistry", zh: "化学" },
];

/** Beijing start time → local start time string. */
export function localTime(beijing: string, offset: number | null) {
  if (offset === null) return beijing;
  const [hours, minutes] = beijing.split(":").map(Number);
  const local = ((hours - 8 + offset + 24) % 24) * 60 + minutes;
  const h = Math.floor(local / 60) % 24;
  const m = local % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function sittingTable(country: CountryGuide, block: ExamBlock = "14:00"): SittingRow[] {
  return EXAM_BLOCKS[block].map((row, index) => ({
    paper: SUBJECT_NAMES[index].paper,
    zh: SUBJECT_NAMES[index].zh,
    day: row.day,
    beijing: row.start,
    local: localTime(row.start, country.utcOffset),
    minutes: row.minutes,
  }));
}

export function getCountryGuide(slug: string) {
  return COUNTRY_GUIDES.find((country) => country.slug === slug) ?? null;
}
