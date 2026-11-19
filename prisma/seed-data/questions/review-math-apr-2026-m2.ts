import type { SeedQuestion } from "../types";

/**
 * April 2026 Mathematics sprint review — Module 2: Functions.
 *
 * Review sheet, not an official sitting. One source item (Q5, a log expression
 * whose options do not match the printed expression) is omitted; the remaining
 * 19 are reproduced with a reconstructed key.
 */
export const officialMathAprReviewM2Questions: SeedQuestion[] = [
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The domain of f(x) = 1/√(x − 1) + ln(2 − x) is",
    options: ["(−1, 2)", "[−1, 2)", "(−1, 2]", "(1, 2)"],
    correct: 3,
    explanation:
      "The root requires x − 1 > 0, so x > 1; the logarithm requires 2 − x > 0, so x < 2. Hence (1, 2).",
    explanationZh: "根式要求 x − 1 > 0，故 x > 1；对数要求 2 − x > 0，故 x < 2。因此定义域为 (1, 2)。",
    tags: ["functions", "domain", "review"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Which function is odd on its domain?",
    options: ["f(x) = x² + cos x", "f(x) = x³ + sin x", "f(x) = 2ˣ + 2⁻ˣ", "f(x) = √x"],
    correct: 1,
    explanation:
      "f(−x) = (−x)³ + sin(−x) = −x³ − sin x = −f(x), so x³ + sin x is odd. The first and third are even; √x has a domain that is not symmetric.",
    explanationZh:
      "f(−x) = (−x)³ + sin(−x) = −x³ − sin x = −f(x)，故 x³ + sin x 为奇函数。第一、第三项为偶函数；√x 的定义域不对称。",
    tags: ["functions", "parity", "review"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which function is increasing on (0, +∞)?",
    options: ["y = 1/x", "y = (1/2)ˣ", "y = log₁/₂ x", "y = x² + 2x"],
    correct: 3,
    explanation:
      "x² + 2x has derivative 2x + 2 > 0 for x > 0, so it is increasing. The other three are decreasing on (0, +∞).",
    explanationZh:
      "x² + 2x 的导数为 2x + 2，当 x > 0 时大于 0，故递增。其余三个在 (0, +∞) 上递减。",
    tags: ["functions", "monotonicity", "review"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "Which pair are identical functions?",
    options: [
      "y = (√x)² and y = x",
      "y = √(x²) and y = |x|",
      "y = (x² − 1)/(x − 1) and y = x + 1",
      "y = ln x² and y = 2 ln x",
    ],
    correct: 1,
    explanation:
      "√(x²) = |x| for every real x, so the rules and domains agree. The others differ in domain or values.",
    explanationZh:
      "对任意实数 x，√(x²) = |x|，因此对应法则与定义域一致。其余各组或定义域不同，或取值不同。",
    tags: ["functions", "domain", "review"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "If 2ᵃ = 3, then 4ᵃ =",
    options: ["6", "9", "3", "12"],
    correct: 1,
    explanation: "4ᵃ = (2²)ᵃ = (2ᵃ)² = 3² = 9.",
    explanationZh: "4ᵃ = (2²)ᵃ = (2ᵃ)² = 3² = 9。",
    tags: ["exponents", "review"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The graph of f(x) = aˣ (a > 0, a ≠ 1) passes through (2, 9). Then f(1/2) =",
    options: ["3", "1/3", "√3", "−√3"],
    correct: 2,
    explanation: "a² = 9 gives a = 3, so f(1/2) = 3^(1/2) = √3.",
    explanationZh: "a² = 9 得 a = 3，故 f(1/2) = 3^(1/2) = √3。",
    tags: ["exponents", "functions", "review"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "Let a = log₂3, b = ln 2, c = 5^(−1/2). The order is",
    options: ["a > b > c", "b > a > c", "c > a > b", "c < b < a"],
    correct: 3,
    explanation:
      "a = log₂3 > 1, b = ln 2 ≈ 0.693, and c = 1/√5 ≈ 0.447, so c < b < a.",
    explanationZh: "a = log₂3 > 1，b = ln 2 ≈ 0.693，c = 1/√5 ≈ 0.447，故 c < b < a。",
    tags: ["logarithms", "comparison", "review"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Given α = −3π/4, which conclusion is correct?",
    options: ["sin α = √2/2", "cos α = √2/2", "tan α = 1", "sin α = −√2/2"],
    correct: 2,
    explanation:
      "At −3π/4, sin α = −√2/2 and cos α = −√2/2, so tan α = sin/cos = 1.",
    explanationZh:
      "在 −3π/4 处，sin α = −√2/2，cos α = −√2/2，故 tan α = sin/cos = 1。",
    tags: ["trigonometry", "special angles", "review"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given sin α = −1/3 and α is in the third quadrant, cos α =",
    options: ["2/3", "−2√2/3", "1/3", "−1/3"],
    correct: 1,
    explanation:
      "cos²α = 1 − 1/9 = 8/9, and cos α < 0 in the third quadrant, so cos α = −2√2/3.",
    explanationZh: "cos²α = 1 − 1/9 = 8/9，第三象限中 cos α < 0，故 cos α = −2√2/3。",
    tags: ["trigonometry", "identities", "review"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If tan α = 2, then sin 2α =",
    options: ["4/5", "−4/5", "3/5", "−3/5"],
    correct: 0,
    explanation:
      "sin 2α = 2tan α/(1 + tan²α) = 4/(1 + 4) = 4/5.",
    explanationZh: "sin 2α = 2tan α/(1 + tan²α) = 4/(1 + 4) = 4/5。",
    tags: ["trigonometry", "double angle", "review"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which induction formula is incorrect?",
    options: [
      "sin(π − α) = sin α",
      "cos(π + α) = −cos α",
      "tan(2π − α) = tan α",
      "sin(π/2 + α) = cos α",
    ],
    correct: 2,
    explanation:
      "tan(2π − α) = −tan α, not tan α. The other three are standard reduction formulas.",
    explanationZh: "tan(2π − α) = −tan α，而非 tan α。其余三个是标准诱导公式。",
    tags: ["trigonometry", "reduction", "review"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given cos α = 3/5 and α ∈ (0, π/2), cos(α + π/6) =",
    options: ["(3√3 − 4)/10", "(3√3 + 4)/10", "(4√3 − 3)/10", "(4√3 + 3)/10"],
    correct: 0,
    explanation:
      "sin α = 4/5. cos(α + π/6) = (3/5)(√3/2) − (4/5)(1/2) = (3√3 − 4)/10.",
    explanationZh: "sin α = 4/5。cos(α + π/6) = (3/5)(√3/2) − (4/5)(1/2) = (3√3 − 4)/10。",
    tags: ["trigonometry", "addition formula", "review"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Regarding y = sin x, which statement is correct?",
    options: [
      "The domain is [−1, 1]",
      "The minimum positive period is π",
      "It is monotonically increasing on [0, π/2]",
      "It is an even function",
    ],
    correct: 2,
    explanation:
      "sin x increases on [0, π/2]. Its domain is ℝ, its range is [−1, 1], its period is 2π and it is odd.",
    explanationZh:
      "sin x 在 [0, π/2] 上递增。其定义域为 ℝ，值域为 [−1, 1]，周期为 2π，且为奇函数。",
    tags: ["trigonometry", "sine", "review"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "An arithmetic sequence has a₁ = 5 and d = −2. Then a₂₀ =",
    options: ["−33", "−35", "43", "35"],
    correct: 0,
    explanation: "a₂₀ = a₁ + 19d = 5 + 19(−2) = −33.",
    explanationZh: "a₂₀ = a₁ + 19d = 5 + 19(−2) = −33。",
    tags: ["sequences", "arithmetic", "review"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "A geometric sequence has a₁ = 2 and q = 2. Then S₅ =",
    options: ["30", "32", "62", "64"],
    correct: 2,
    explanation: "S₅ = a₁(q⁵ − 1)/(q − 1) = 2(32 − 1) = 62.",
    explanationZh: "S₅ = a₁(q⁵ − 1)/(q − 1) = 2(32 − 1) = 62。",
    tags: ["sequences", "geometric", "review"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "A sequence satisfies a₁ = 1 and aₙ₊₁ = aₙ + 3 (n ≥ 1). Its general term is",
    options: ["aₙ = 3n − 2", "aₙ = 3n + 1", "aₙ = 2n − 1", "aₙ = 2n + 1"],
    correct: 0,
    explanation:
      "This is arithmetic with first term 1 and common difference 3, so aₙ = 1 + (n − 1)3 = 3n − 2.",
    explanationZh:
      "这是首项为 1、公差为 3 的等差数列，故 aₙ = 1 + (n − 1)3 = 3n − 2。",
    tags: ["sequences", "arithmetic", "review"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "The general term of 1/2, 2/3, 3/4, 4/5, … is",
    options: ["aₙ = n/(n + 1)", "aₙ = (n + 1)/n", "aₙ = n/(n − 1)", "aₙ = (n − 1)/n"],
    correct: 0,
    explanation: "The numerator is n and the denominator is n + 1, so aₙ = n/(n + 1).",
    explanationZh: "分子为 n，分母为 n + 1，故 aₙ = n/(n + 1)。",
    tags: ["sequences", "general term", "review"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The inverse of y = 2x + 3 (x ∈ ℝ) is",
    options: ["y = (x − 3)/2", "y = (x + 3)/2", "y = 2x − 3", "y = x/2 + 3"],
    correct: 0,
    explanation: "From y = 2x + 3, 2x = y − 3, so x = (y − 3)/2. Swap x and y.",
    explanationZh: "由 y = 2x + 3 得 2x = y − 3，故 x = (y − 3)/2。交换 x 与 y 即得反函数。",
    tags: ["functions", "inverse", "review"],
  },
  {
    topic: "M4.1",
    difficulty: "EASY",
    stem: "The derivative of f(x) = x² − 2x at x = 1 is",
    options: ["0", "1", "−1", "2"],
    correct: 0,
    explanation: "f′(x) = 2x − 2, so f′(1) = 0.",
    explanationZh: "f′(x) = 2x − 2，故 f′(1) = 0。",
    tags: ["derivatives", "review"],
  },
];
