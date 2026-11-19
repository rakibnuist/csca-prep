/** Compact nationality list covering the exam's main student bases. */
export const NATIONALITIES = [
  "Afghanistan", "Australia", "Bangladesh", "Brazil", "Cambodia", "Cameroon",
  "Canada", "Chile", "China", "Colombia", "Egypt", "Ethiopia", "France",
  "Germany", "Ghana", "Hong Kong SAR", "India", "Indonesia", "Iran", "Iraq",
  "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan",
  "Laos", "Malaysia", "Maldives", "Mongolia", "Morocco", "Myanmar", "Nepal",
  "Netherlands", "New Zealand", "Nigeria", "Oman", "Pakistan", "Philippines",
  "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tunisia", "Türkiye",
  "UAE", "Uganda", "Ukraine", "United Kingdom", "United States", "Uzbekistan",
  "Vietnam", "Yemen", "Other",
] as const;

export function isNationality(value: string): value is (typeof NATIONALITIES)[number] {
  return (NATIONALITIES as readonly string[]).includes(value);
}
