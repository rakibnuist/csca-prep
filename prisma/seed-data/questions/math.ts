import type { SeedQuestion } from "../types";

/**
 * CSCA Mathematics — 56 original items mapped to the official 2025 syllabus.
 * Difficulty mix follows the paper: roughly a third easy, half medium, the rest
 * hard. Correct answers are spread across all four positions.
 */
export const mathQuestions: SeedQuestion[] = [
  /* ── M1.1 Sets ─────────────────────────────────────────────── */
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "If A = {1, 2, 3, 4, 5} and B = {3, 4, 5, 6}, how many elements are in A ∪ B?",
    stemZh: "设 A = {1, 2, 3, 4, 5}，B = {3, 4, 5, 6}，则 A ∪ B 中元素的个数是多少？",
    options: ["6", "5", "8", "4"],
    optionsZh: ["6", "5", "8", "4"],
    correct: 0,
    explanation:
      "A ∪ B = {1, 2, 3, 4, 5, 6}. The shared elements 3, 4, 5 are counted once, so |A ∪ B| = 5 + 4 − 3 = 6.",
    explanationZh:
      "A ∪ B = {1, 2, 3, 4, 5, 6}。公共元素 3、4、5 只计一次，因此 |A ∪ B| = 5 + 3 − 3 = 6。",
    tags: ["sets", "union"],
  },
  {
    topic: "M1.1",
    difficulty: "MEDIUM",
    stem: "How many subsets does the set {a, b, c, d} have?",
    stemZh: "集合 {a, b, c, d} 共有多少个子集？",
    options: ["16", "8", "15", "32"],
    optionsZh: ["16", "8", "15", "32"],
    correct: 0,
    explanation:
      "A set with n elements has 2ⁿ subsets. Here n = 4, so 2⁴ = 16 (15 proper subsets plus the set itself).",
    explanationZh:
      "含 n 个元素的集合有 2ⁿ 个子集。这里 n = 4，所以 2⁴ = 16（其中 15 个真子集，加上集合本身）。",
    tags: ["sets", "subsets"],
  },
  {
    topic: "M1.1",
    difficulty: "MEDIUM",
    stem: "Let A = {1, 2, 3}, B = {2, 3, 4} and C = {3, 4, 5}. What is (A ∪ B) ∩ C?",
    stemZh: "设 A = {1, 2, 3}，B = {2, 3, 4}，C = {3, 4, 5}，则 (A ∪ B) ∩ C 等于什么？",
    options: ["{3, 4}", "{2, 3}", "{3}", "{1, 2, 3, 4, 5}"],
    optionsZh: ["{3, 4}", "{2, 3}", "{3}", "{1, 2, 3, 4, 5}"],
    correct: 0,
    explanation: "A ∪ B = {1, 2, 3, 4}. Intersecting with C = {3, 4, 5} leaves {3, 4}.",
    explanationZh: "A ∪ B = {1, 2, 3, 4}，再与 C = {3, 4, 5} 求交集，得到 {3, 4}。",
    tags: ["sets", "intersection"],
  },
  {
    topic: "M1.1",
    difficulty: "HARD",
    stem: "The set A = {x ∈ ℝ | x² − 5x + 6 = 0}. What is the sum of the elements of A?",
    stemZh: "集合 A = {x ∈ ℝ | x² − 5x + 6 = 0}，A 中所有元素之和是多少？",
    options: ["5", "6", "−5", "1"],
    optionsZh: ["5", "6", "−5", "1"],
    correct: 0,
    explanation:
      "x² − 5x + 6 = (x − 2)(x − 3) = 0, so A = {2, 3} and 2 + 3 = 5. By Vieta the sum of roots is −b/a = 5.",
    explanationZh:
      "x² − 5x + 6 = (x − 2)(x − 3) = 0，所以 A = {2, 3}，2 + 3 = 5。用韦达定理，两根之和为 −b/a = 5。",
    tags: ["sets", "quadratic"],
  },

  /* ── M1.2 Inequalities ─────────────────────────────────────── */
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "What is the solution set of x² − 5x + 6 < 0?",
    stemZh: "不等式 x² − 5x + 6 < 0 的解集是什么？",
    options: ["(2, 3)", "[2, 3]", "(−∞, 2) ∪ (3, ∞)", "(−3, −2)"],
    optionsZh: ["(2, 3)", "[2, 3]", "(−∞, 2) ∪ (3, ∞)", "(−3, −2)"],
    correct: 0,
    explanation:
      "x² − 5x + 6 = (x − 2)(x − 3). The upward parabola is below zero between its roots, so 2 < x < 3.",
    explanationZh:
      "x² − 5x + 6 = (x − 2)(x − 3)。开口向上的抛物线在两根之间位于 x 轴下方，因此 2 < x < 3。",
    tags: ["inequalities", "quadratic"],
  },
  {
    topic: "M1.2",
    difficulty: "MEDIUM",
    stem: "What is the solution set of (x − 1)/(x + 2) ≥ 0?",
    stemZh: "不等式 (x − 1)/(x + 2) ≥ 0 的解集是什么？",
    options: [
      "(−∞, −2) ∪ [1, ∞)",
      "(−2, 1]",
      "[−2, 1]",
      "(−∞, −2] ∪ [1, ∞)",
    ],
    optionsZh: [
      "(−∞, −2) ∪ [1, ∞)",
      "(−2, 1]",
      "[−2, 1]",
      "(−∞, −2] ∪ [1, ∞)",
    ],
    correct: 0,
    explanation:
      "Critical points are x = 1 (numerator) and x = −2 (excluded, denominator). Testing intervals gives positive values for x < −2 and x ≥ 1. x = −2 is excluded, so it is open at −2.",
    explanationZh:
      "临界点为 x = 1（分子）与 x = −2（分母，不能取）。检验各区间可知 x < −2 与 x ≥ 1 时商为正。x = −2 不能取，故左端为开区间。",
    tags: ["inequalities", "rational"],
  },
  {
    topic: "M1.2",
    difficulty: "MEDIUM",
    stem: "Solve |2x − 3| ≤ 5.",
    stemZh: "解不等式 |2x − 3| ≤ 5。",
    options: ["−1 ≤ x ≤ 4", "x ≤ 4", "−4 ≤ x ≤ 1", "x ≥ −1"],
    optionsZh: ["−1 ≤ x ≤ 4", "x ≤ 4", "−4 ≤ x ≤ 1", "x ≥ −1"],
    correct: 0,
    explanation:
      "|2x − 3| ≤ 5 means −5 ≤ 2x − 3 ≤ 5. Add 3: −2 ≤ 2x ≤ 8, then divide by 2: −1 ≤ x ≤ 4.",
    explanationZh:
      "|2x − 3| ≤ 5 等价于 −5 ≤ 2x − 3 ≤ 5。两边加 3 得 −2 ≤ 2x ≤ 8，再除以 2 得 −1 ≤ x ≤ 4。",
    tags: ["inequalities", "absolute value"],
  },
  {
    topic: "M1.2",
    difficulty: "HARD",
    stem: "For x > 0, what is the minimum value of x + 4/x?",
    stemZh: "当 x > 0 时，x + 4/x 的最小值是多少？",
    options: ["4", "2", "8", "5"],
    optionsZh: ["4", "2", "8", "5"],
    correct: 0,
    explanation:
      "By AM–GM, x + 4/x ≥ 2√(x · 4/x) = 2√4 = 4, with equality when x = 4/x, i.e. x = 2.",
    explanationZh:
      "由基本不等式，x + 4/x ≥ 2√(x · 4/x) = 2√4 = 4，当且仅当 x = 4/x 即 x = 2 时取等号。",
    tags: ["inequalities", "am-gm"],
  },

  /* ── M2.1 Function concepts ────────────────────────────────── */
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "What is the domain of f(x) = √(x − 2) / (x − 5)?",
    stemZh: "函数 f(x) = √(x − 2) / (x − 5) 的定义域是什么？",
    options: [
      "[2, 5) ∪ (5, ∞)",
      "[2, ∞)",
      "(2, 5) ∪ (5, ∞)",
      "[2, 5)",
    ],
    optionsZh: [
      "[2, 5) ∪ (5, ∞)",
      "[2, ∞)",
      "(2, 5) ∪ (5, ∞)",
      "[2, 5)",
    ],
    correct: 0,
    explanation:
      "The square root needs x − 2 ≥ 0, so x ≥ 2. The denominator needs x ≠ 5. Combining: x ≥ 2 and x ≠ 5.",
    explanationZh:
      "根号内需 x − 2 ≥ 0，即 x ≥ 2；分母需 x ≠ 5。两者合并得 x ≥ 2 且 x ≠ 5。",
    tags: ["functions", "domain"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "Which statement about f(x) = x³ + 2x is correct?",
    stemZh: "关于函数 f(x) = x³ + 2x，下列哪项正确？",
    options: [
      "It is an odd function",
      "It is an even function",
      "It is neither odd nor even",
      "It is periodic",
    ],
    optionsZh: ["奇函数", "偶函数", "既非奇函数也非偶函数", "周期函数"],
    correct: 0,
    explanation:
      "f(−x) = (−x)³ + 2(−x) = −x³ − 2x = −f(x). Since f(−x) = −f(x) for every x in the domain, f is odd.",
    explanationZh:
      "f(−x) = (−x)³ + 2(−x) = −x³ − 2x = −f(x)。对定义域内任意 x 都有 f(−x) = −f(x)，故为奇函数。",
    tags: ["functions", "parity"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "If f(x) = 2x + 1, what is f⁻¹(7)?",
    stemZh: "已知 f(x) = 2x + 1，求 f⁻¹(7)。",
    options: ["3", "15", "4", "7/2"],
    optionsZh: ["3", "15", "4", "7/2"],
    correct: 0,
    explanation:
      "Solve 2x + 1 = 7 → 2x = 6 → x = 3. Equivalently f⁻¹(x) = (x − 1)/2, so f⁻¹(7) = 3.",
    explanationZh:
      "解 2x + 1 = 7 得 2x = 6，即 x = 3。也可先求 f⁻¹(x) = (x − 1)/2，得 f⁻¹(7) = 3。",
    tags: ["functions", "inverse"],
  },
  {
    topic: "M2.1",
    difficulty: "HARD",
    stem: "What is the minimum value of f(x) = x² − 4x + 7?",
    stemZh: "函数 f(x) = x² − 4x + 7 的最小值是多少？",
    options: ["3", "7", "−3", "4"],
    optionsZh: ["3", "7", "−3", "4"],
    correct: 0,
    explanation:
      "Complete the square: x² − 4x + 7 = (x − 2)² + 3. Since (x − 2)² ≥ 0, the minimum is 3 at x = 2.",
    explanationZh:
      "配方得 x² − 4x + 7 = (x − 2)² + 3。因为 (x − 2)² ≥ 0，所以当 x = 2 时取得最小值 3。",
    tags: ["functions", "minimum"],
  },

  /* ── M2.2 Elementary functions ─────────────────────────────── */
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Evaluate log₂ 8 + log₃(1/9).",
    stemZh: "计算 log₂ 8 + log₃(1/9)。",
    options: ["1", "5", "−1", "3"],
    optionsZh: ["1", "5", "−1", "3"],
    correct: 0,
    explanation:
      "log₂ 8 = 3 because 2³ = 8. log₃(1/9) = log₃(3⁻²) = −2. Sum: 3 + (−2) = 1.",
    explanationZh:
      "因为 2³ = 8，所以 log₂ 8 = 3；log₃(1/9) = log₃(3⁻²) = −2。两者相加得 3 + (−2) = 1。",
    tags: ["logarithms"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If 2ˣ = 5, what is the value of 4ˣ?",
    stemZh: "若 2ˣ = 5，则 4ˣ 的值是多少？",
    options: ["25", "10", "20", "5²ˣ⁻¹"],
    optionsZh: ["25", "10", "20", "5²ˣ⁻¹"],
    correct: 0,
    explanation: "4ˣ = (2²)ˣ = (2ˣ)² = 5² = 25.",
    explanationZh: "4ˣ = (2²)ˣ = (2ˣ)² = 5² = 25。",
    tags: ["exponentials"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "What is sin 30° + cos 60°?",
    stemZh: "sin 30° + cos 60° 等于多少？",
    options: ["1", "1/2", "√3/2", "√3"],
    optionsZh: ["1", "1/2", "√3/2", "√3"],
    correct: 0,
    explanation: "sin 30° = 1/2 and cos 60° = 1/2, so the sum is 1.",
    explanationZh: "sin 30° = 1/2，cos 60° = 1/2，所以二者之和为 1。",
    tags: ["trigonometry", "special angles"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "What is the range of y = 2ˣ + 1?",
    stemZh: "函数 y = 2ˣ + 1 的值域是什么？",
    options: ["(1, ∞)", "(0, ∞)", "[1, ∞)", "(−∞, ∞)"],
    optionsZh: ["(1, ∞)", "(0, ∞)", "[1, ∞)", "(−∞, ∞)"],
    correct: 0,
    explanation:
      "2ˣ > 0 for all real x, so 2ˣ + 1 > 1. The value 1 is never reached, hence the open interval (1, ∞).",
    explanationZh:
      "对任意实数 x 都有 2ˣ > 0，所以 2ˣ + 1 > 1。函数永远取不到 1，因此值域为开区间 (1, ∞)。",
    tags: ["exponentials", "range"],
  },
  {
    topic: "M2.2",
    difficulty: "HARD",
    stem: "For a > 0 and a ≠ 1, what is log_a 1 + log_a a?",
    stemZh: "设 a > 0 且 a ≠ 1，则 log_a 1 + log_a a 等于多少？",
    options: ["1", "0", "a", "2"],
    optionsZh: ["1", "0", "a", "2"],
    correct: 0,
    explanation:
      "log_a 1 = 0 because a⁰ = 1, and log_a a = 1 because a¹ = a. The sum is 0 + 1 = 1.",
    explanationZh:
      "因为 a⁰ = 1，所以 log_a 1 = 0；因为 a¹ = a，所以 log_a a = 1。两者之和为 0 + 1 = 1。",
    tags: ["logarithms", "identities"],
  },

  /* ── M2.3 Sequences ────────────────────────────────────────── */
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "An arithmetic sequence has first term 3 and common difference 4. What is the 10th term?",
    stemZh: "等差数列首项为 3，公差为 4，求第 10 项。",
    options: ["39", "43", "36", "40"],
    optionsZh: ["39", "43", "36", "40"],
    correct: 0,
    explanation: "aₙ = a₁ + (n − 1)d = 3 + 9 × 4 = 39.",
    explanationZh: "aₙ = a₁ + (n − 1)d = 3 + 9 × 4 = 39。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "A geometric sequence has first term 2 and common ratio 3. What is the sum of the first 5 terms?",
    stemZh: "等比数列首项为 2，公比为 3，求前 5 项之和。",
    options: ["242", "243", "240", "121"],
    optionsZh: ["242", "243", "240", "121"],
    correct: 0,
    explanation:
      "Sₙ = a₁(rⁿ − 1)/(r − 1) = 2(3⁵ − 1)/(3 − 1) = 2(243 − 1)/2 = 242.",
    explanationZh:
      "Sₙ = a₁(rⁿ − 1)/(r − 1) = 2(3⁵ − 1)/(3 − 1) = 2(243 − 1)/2 = 242。",
    tags: ["sequences", "geometric"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "The nth term of a sequence is aₙ = 2n + 1. What is the sum of the first 10 terms?",
    stemZh: "数列的通项公式为 aₙ = 2n + 1，求前 10 项之和。",
    options: ["120", "110", "121", "100"],
    optionsZh: ["120", "110", "121", "100"],
    correct: 0,
    explanation:
      "The terms are 3, 5, …, 21 — an arithmetic sequence with 10 terms. S₁₀ = (3 + 21) × 10/2 = 120.",
    explanationZh:
      "各项为 3, 5, …, 21，是共有 10 项的等差数列。S₁₀ = (3 + 21) × 10/2 = 120。",
    tags: ["sequences", "sum"],
  },
  {
    topic: "M2.3",
    difficulty: "HARD",
    stem: "In a geometric sequence with positive terms, a₁ = 8 and a₃ = 2. What is a₅?",
    stemZh: "正项等比数列中，a₁ = 8，a₃ = 2，求 a₅。",
    options: ["1/2", "1/4", "1", "4"],
    optionsZh: ["1/2", "1/4", "1", "4"],
    correct: 0,
    explanation:
      "a₃ = a₁r² gives 2 = 8r², so r² = 1/4. Positive terms mean r = 1/2. Then a₅ = a₃r² = 2 × 1/4 = 1/2.",
    explanationZh:
      "由 a₃ = a₁r² 得 2 = 8r²，故 r² = 1/4。因各项为正，r = 1/2，于是 a₅ = a₃r² = 2 × 1/4 = 1/2。",
    tags: ["sequences", "geometric"],
  },

  /* ── M2.4 Derivatives ──────────────────────────────────────── */
  {
    topic: "M2.4",
    difficulty: "EASY",
    stem: "Differentiate f(x) = 3x⁴ − 2x.",
    stemZh: "求 f(x) = 3x⁴ − 2x 的导数。",
    options: ["12x³ − 2", "12x³ − 2x", "3x³ − 2", "12x⁴ − 2"],
    optionsZh: ["12x³ − 2", "12x³ − 2x", "3x³ − 2", "12x⁴ − 2"],
    correct: 0,
    explanation:
      "Power rule: d/dx(3x⁴) = 12x³ and d/dx(−2x) = −2, so f′(x) = 12x³ − 2.",
    explanationZh:
      "由幂函数求导法则，d/dx(3x⁴) = 12x³，d/dx(−2x) = −2，所以 f′(x) = 12x³ − 2。",
    tags: ["derivatives", "power rule"],
  },
  {
    topic: "M2.4",
    difficulty: "MEDIUM",
    stem: "If f(x) = x³ − 3x, what is f′(2)?",
    stemZh: "已知 f(x) = x³ − 3x，求 f′(2)。",
    options: ["9", "6", "3", "12"],
    optionsZh: ["9", "6", "3", "12"],
    correct: 0,
    explanation: "f′(x) = 3x² − 3, so f′(2) = 3(4) − 3 = 9.",
    explanationZh: "f′(x) = 3x² − 3，因此 f′(2) = 3 × 4 − 3 = 9。",
    tags: ["derivatives"],
  },
  {
    topic: "M2.4",
    difficulty: "EASY",
    stem: "What is the slope of the tangent to y = x² at x = 3?",
    stemZh: "曲线 y = x² 在 x = 3 处的切线斜率是多少？",
    options: ["6", "9", "3", "12"],
    optionsZh: ["6", "9", "3", "12"],
    correct: 0,
    explanation:
      "y′ = 2x, so at x = 3 the slope is 6. (9 is the y-value, not the slope.)",
    explanationZh: "y′ = 2x，在 x = 3 处斜率为 6。（9 是该点的函数值，不是斜率。）",
    tags: ["derivatives", "tangent"],
  },
  {
    topic: "M2.4",
    difficulty: "HARD",
    stem: "Where does f(x) = x³ − 3x² + 2 have a local maximum?",
    stemZh: "函数 f(x) = x³ − 3x² + 2 在何处取得极大值？",
    options: ["x = 0", "x = 2", "x = 1", "x = −2"],
    optionsZh: ["x = 0", "x = 2", "x = 1", "x = −2"],
    correct: 0,
    explanation:
      "f′(x) = 3x² − 6x = 3x(x − 2), so critical points are x = 0 and x = 2. f′ changes from + to − at x = 0 (local maximum) and from − to + at x = 2 (local minimum).",
    explanationZh:
      "f′(x) = 3x² − 6x = 3x(x − 2)，驻点为 x = 0 与 x = 2。在 x = 0 处 f′ 由正变负，取得极大值；在 x = 2 处由负变正，取得极小值。",
    tags: ["derivatives", "extrema"],
  },
  {
    topic: "M2.4",
    difficulty: "HARD",
    stem: "Evaluate ∫₀² 3x² dx.",
    stemZh: "计算 ∫₀² 3x² dx。",
    options: ["8", "12", "6", "4"],
    optionsZh: ["8", "12", "6", "4"],
    correct: 0,
    explanation:
      "∫3x² dx = x³. Evaluating from 0 to 2 gives 2³ − 0³ = 8.",
    explanationZh:
      "∫3x² dx = x³，代入上下限得 2³ − 0³ = 8。",
    tags: ["calculus", "integration"],
  },

  /* ── M3.1 Analytic geometry ────────────────────────────────── */
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "What is the equation of the line through (1, 2) and (3, 6)?",
    stemZh: "过点 (1, 2) 与 (3, 6) 的直线方程是什么？",
    options: ["y = 2x", "y = 2x + 1", "y = x + 1", "y = 3x − 1"],
    optionsZh: ["y = 2x", "y = 2x + 1", "y = x + 1", "y = 3x − 1"],
    correct: 0,
    explanation:
      "Slope = (6 − 2)/(3 − 1) = 2. Using (1, 2): y − 2 = 2(x − 1), so y = 2x.",
    explanationZh:
      "斜率 = (6 − 2)/(3 − 1) = 2。代入点 (1, 2)：y − 2 = 2(x − 1)，即 y = 2x。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "What is the distance from the origin to the line 3x + 4y − 10 = 0?",
    stemZh: "原点到直线 3x + 4y − 10 = 0 的距离是多少？",
    options: ["2", "10", "5/2", "10/7"],
    optionsZh: ["2", "10", "5/2", "10/7"],
    correct: 0,
    explanation:
      "Distance = |Ax₀ + By₀ + C| / √(A² + B²) = |−10| / √(9 + 16) = 10/5 = 2.",
    explanationZh:
      "点到直线距离公式：d = |Ax₀ + By₀ + C| / √(A² + B²) = |−10| / √(9 + 16) = 10/5 = 2。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "What are the centre and radius of x² + y² − 4x + 2y − 4 = 0?",
    stemZh: "圆 x² + y² − 4x + 2y − 4 = 0 的圆心与半径分别是什么？",
    options: [
      "Centre (2, −1), radius 3",
      "Centre (−2, 1), radius 3",
      "Centre (2, −1), radius 9",
      "Centre (4, −2), radius 4",
    ],
    optionsZh: [
      "圆心 (2, −1)，半径 3",
      "圆心 (−2, 1)，半径 3",
      "圆心 (2, −1)，半径 9",
      "圆心 (4, −2)，半径 4",
    ],
    correct: 0,
    explanation:
      "Complete the square: (x − 2)² + (y + 1)² = 4 + 4 + 1 = 9. Centre (2, −1), radius √9 = 3.",
    explanationZh:
      "配方得 (x − 2)² + (y + 1)² = 4 + 4 + 1 = 9，所以圆心为 (2, −1)，半径为 √9 = 3。",
    tags: ["analytic geometry", "circles"],
  },
  {
    topic: "M3.1",
    difficulty: "HARD",
    stem: "For the ellipse x²/25 + y²/9 = 1, what is the eccentricity?",
    stemZh: "椭圆 x²/25 + y²/9 = 1 的离心率是多少？",
    options: ["4/5", "3/5", "5/4", "16/25"],
    optionsZh: ["4/5", "3/5", "5/4", "16/25"],
    correct: 0,
    explanation:
      "a² = 25, b² = 9, so c² = a² − b² = 16 and c = 4. Eccentricity e = c/a = 4/5.",
    explanationZh:
      "a² = 25，b² = 9，所以 c² = a² − b² = 16，c = 4。离心率 e = c/a = 4/5。",
    tags: ["analytic geometry", "ellipse"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "What is the focus of the parabola y² = 8x?",
    stemZh: "抛物线 y² = 8x 的焦点坐标是什么？",
    options: ["(2, 0)", "(4, 0)", "(0, 2)", "(8, 0)"],
    optionsZh: ["(2, 0)", "(4, 0)", "(0, 2)", "(8, 0)"],
    correct: 0,
    explanation:
      "For y² = 2px, the focus is (p/2, 0). Here 2p = 8, so p = 4 and the focus is (2, 0).",
    explanationZh:
      "对 y² = 2px，焦点为 (p/2, 0)。此处 2p = 8，故 p = 4，焦点为 (2, 0)。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M3.1",
    difficulty: "HARD",
    stem: "What are the asymptotes of x²/9 − y²/16 = 1?",
    stemZh: "双曲线 x²/9 − y²/16 = 1 的渐近线方程是什么？",
    options: ["y = ±(4/3)x", "y = ±(3/4)x", "y = ±(16/9)x", "y = ±(9/16)x"],
    optionsZh: ["y = ±(4/3)x", "y = ±(3/4)x", "y = ±(16/9)x", "y = ±(9/16)x"],
    correct: 0,
    explanation:
      "For x²/a² − y²/b² = 1 the asymptotes are y = ±(b/a)x. With a = 3 and b = 4: y = ±(4/3)x.",
    explanationZh:
      "对 x²/a² − y²/b² = 1，渐近线为 y = ±(b/a)x。此处 a = 3，b = 4，故 y = ±(4/3)x。",
    tags: ["analytic geometry", "hyperbola"],
  },

  /* ── M3.2 Vectors ──────────────────────────────────────────── */
  {
    topic: "M3.2",
    difficulty: "EASY",
    stem: "If a = (1, 2) and b = (3, −1), what is a · b?",
    stemZh: "已知 a = (1, 2)，b = (3, −1)，求 a · b。",
    options: ["1", "5", "7", "−1"],
    optionsZh: ["1", "5", "7", "−1"],
    correct: 0,
    explanation: "a · b = 1 × 3 + 2 × (−1) = 3 − 2 = 1.",
    explanationZh: "a · b = 1 × 3 + 2 × (−1) = 3 − 2 = 1。",
    tags: ["vectors", "dot product"],
  },
  {
    topic: "M3.2",
    difficulty: "EASY",
    stem: "What is the magnitude of the vector (3, 4)?",
    stemZh: "向量 (3, 4) 的模是多少？",
    options: ["5", "7", "25", "4"],
    optionsZh: ["5", "7", "25", "4"],
    correct: 0,
    explanation: "|v| = √(3² + 4²) = √25 = 5.",
    explanationZh: "|v| = √(3² + 4²) = √25 = 5。",
    tags: ["vectors", "magnitude"],
  },
  {
    topic: "M3.2",
    difficulty: "MEDIUM",
    stem: "If a = (2, −1) and b = (m, 4) are perpendicular, what is m?",
    stemZh: "若向量 a = (2, −1) 与 b = (m, 4) 垂直，求 m。",
    options: ["2", "−2", "8", "1/2"],
    optionsZh: ["2", "−2", "8", "1/2"],
    correct: 0,
    explanation:
      "Perpendicular means a · b = 0: 2m + (−1)(4) = 0, so 2m = 4 and m = 2.",
    explanationZh:
      "垂直意味着 a · b = 0：2m + (−1)(4) = 0，即 2m = 4，m = 2。",
    tags: ["vectors", "perpendicular"],
  },
  {
    topic: "M3.2",
    difficulty: "MEDIUM",
    stem: "What is the magnitude of the vector (1, 2, 2)?",
    stemZh: "向量 (1, 2, 2) 的模是多少？",
    options: ["3", "5", "√5", "9"],
    optionsZh: ["3", "5", "√5", "9"],
    correct: 0,
    explanation: "|v| = √(1² + 2² + 2²) = √9 = 3.",
    explanationZh: "|v| = √(1² + 2² + 2²) = √9 = 3。",
    tags: ["vectors", "3d"],
  },

  /* ── M3.3 Complex numbers ──────────────────────────────────── */
  {
    topic: "M3.3",
    difficulty: "EASY",
    stem: "Simplify (3 + 2i) + (1 − 4i).",
    stemZh: "计算 (3 + 2i) + (1 − 4i)。",
    options: ["4 − 2i", "4 + 6i", "2 + 6i", "2 − 2i"],
    optionsZh: ["4 − 2i", "4 + 6i", "2 + 6i", "2 − 2i"],
    correct: 0,
    explanation: "Add real and imaginary parts separately: (3 + 1) + (2 − 4)i = 4 − 2i.",
    explanationZh: "实部与虚部分别相加：(3 + 1) + (2 − 4)i = 4 − 2i。",
    tags: ["complex numbers", "addition"],
  },
  {
    topic: "M3.3",
    difficulty: "MEDIUM",
    stem: "What is (1 + i)²?",
    stemZh: "(1 + i)² 等于多少？",
    options: ["2i", "2", "1 + 2i", "−2i"],
    optionsZh: ["2i", "2", "1 + 2i", "−2i"],
    correct: 0,
    explanation:
      "(1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i, using i² = −1.",
    explanationZh:
      "(1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i，其中用到 i² = −1。",
    tags: ["complex numbers", "multiplication"],
  },
  {
    topic: "M3.3",
    difficulty: "EASY",
    stem: "What is the modulus of 3 + 4i?",
    stemZh: "复数 3 + 4i 的模是多少？",
    options: ["5", "7", "25", "√7"],
    optionsZh: ["5", "7", "25", "√7"],
    correct: 0,
    explanation: "|3 + 4i| = √(3² + 4²) = √25 = 5.",
    explanationZh: "|3 + 4i| = √(3² + 4²) = √25 = 5。",
    tags: ["complex numbers", "modulus"],
  },
  {
    topic: "M3.3",
    difficulty: "HARD",
    stem: "What is i²⁰²⁷?",
    stemZh: "i²⁰²⁷ 等于多少？",
    options: ["−i", "i", "1", "−1"],
    optionsZh: ["−i", "i", "1", "−1"],
    correct: 0,
    explanation:
      "Powers of i repeat with period 4. 2027 = 4 × 506 + 3, so i²⁰²⁷ = i³ = −i.",
    explanationZh:
      "i 的幂以 4 为周期循环。2027 = 4 × 506 + 3，所以 i²⁰²⁷ = i³ = −i。",
    tags: ["complex numbers", "powers"],
  },

  /* ── M3.4 Spatial geometry ─────────────────────────────────── */
  {
    topic: "M3.4",
    difficulty: "EASY",
    stem: "What is the distance between the points (1, 2, 3) and (4, 6, 3)?",
    stemZh: "点 (1, 2, 3) 与 (4, 6, 3) 之间的距离是多少？",
    options: ["5", "7", "√7", "25"],
    optionsZh: ["5", "7", "√7", "25"],
    correct: 0,
    explanation:
      "d = √((4−1)² + (6−2)² + (3−3)²) = √(9 + 16 + 0) = 5.",
    explanationZh:
      "d = √((4−1)² + (6−2)² + (3−3)²) = √(9 + 16 + 0) = 5。",
    tags: ["spatial geometry", "distance"],
  },
  {
    topic: "M3.4",
    difficulty: "MEDIUM",
    stem: "A sphere has radius 3. What is its volume?",
    stemZh: "半径为 3 的球的体积是多少？",
    options: ["36π", "12π", "9π", "27π"],
    optionsZh: ["36π", "12π", "9π", "27π"],
    correct: 0,
    explanation: "V = (4/3)πr³ = (4/3)π(27) = 36π.",
    explanationZh: "V = (4/3)πr³ = (4/3)π × 27 = 36π。",
    tags: ["spatial geometry", "sphere"],
  },
  {
    topic: "M3.4",
    difficulty: "MEDIUM",
    stem: "A cube has edge length 4. What is the length of its space diagonal?",
    stemZh: "棱长为 4 的正方体，其体对角线长度是多少？",
    options: ["4√3", "4√2", "8", "12"],
    optionsZh: ["4√3", "4√2", "8", "12"],
    correct: 0,
    explanation: "Space diagonal = a√3 = 4√3. The face diagonal would be a√2.",
    explanationZh: "体对角线长为 a√3 = 4√3；面对角线则是 a√2。",
    tags: ["spatial geometry", "cube"],
  },
  {
    topic: "M3.4",
    difficulty: "MEDIUM",
    stem: "A cylinder has radius 2 and height 5. What is its volume?",
    stemZh: "圆柱底面半径为 2，高为 5，体积是多少？",
    options: ["20π", "10π", "40π", "25π"],
    optionsZh: ["20π", "10π", "40π", "25π"],
    correct: 0,
    explanation: "V = πr²h = π(4)(5) = 20π.",
    explanationZh: "V = πr²h = π × 4 × 5 = 20π。",
    tags: ["spatial geometry", "cylinder"],
  },

  /* ── M4.1 Probability ──────────────────────────────────────── */
  {
    topic: "M4.1",
    difficulty: "EASY",
    stem: "A fair die is rolled once. What is the probability of an even number?",
    stemZh: "掷一枚均匀骰子一次，得到偶数的概率是多少？",
    options: ["1/2", "1/3", "2/3", "1/6"],
    optionsZh: ["1/2", "1/3", "2/3", "1/6"],
    correct: 0,
    explanation: "Even outcomes are 2, 4, 6 — three of six equally likely results, so 3/6 = 1/2.",
    explanationZh: "偶数结果为 2、4、6，共 3 个等可能结果，所以概率为 3/6 = 1/2。",
    tags: ["probability", "dice"],
  },
  {
    topic: "M4.1",
    difficulty: "MEDIUM",
    stem: "Two fair coins are tossed. What is the probability of at least one head?",
    stemZh: "抛两枚均匀硬币，至少出现一次正面的概率是多少？",
    options: ["3/4", "1/2", "1/4", "2/3"],
    optionsZh: ["3/4", "1/2", "1/4", "2/3"],
    correct: 0,
    explanation:
      "The complement is two tails, with probability 1/4. So P(at least one head) = 1 − 1/4 = 3/4.",
    explanationZh:
      "对立事件是两次都是反面，概率为 1/4。因此至少一次正面的概率为 1 − 1/4 = 3/4。",
    tags: ["probability", "complement"],
  },
  {
    topic: "M4.1",
    difficulty: "HARD",
    stem: "A bag holds 3 red and 2 blue balls. Two are drawn without replacement. What is the probability both are red?",
    stemZh: "袋中有 3 个红球和 2 个蓝球，不放回地取出 2 个，求两个都是红球的概率。",
    options: ["3/10", "9/25", "2/5", "1/5"],
    optionsZh: ["3/10", "9/25", "2/5", "1/5"],
    correct: 0,
    explanation:
      "P = (3/5) × (2/4) = 6/20 = 3/10. Equivalently C(3,2)/C(5,2) = 3/10.",
    explanationZh:
      "P = (3/5) × (2/4) = 6/20 = 3/10，也可写作 C(3,2)/C(5,2) = 3/10。",
    tags: ["probability", "without replacement"],
  },
  {
    topic: "M4.1",
    difficulty: "MEDIUM",
    stem: "If P(A) = 0.5 and P(B) = 0.4 and A, B are independent, what is P(A ∩ B)?",
    stemZh: "若 P(A) = 0.5，P(B) = 0.4，且 A、B 相互独立，求 P(A ∩ B)。",
    options: ["0.2", "0.9", "0.1", "0.45"],
    optionsZh: ["0.2", "0.9", "0.1", "0.45"],
    correct: 0,
    explanation: "Independence gives P(A ∩ B) = P(A)P(B) = 0.5 × 0.4 = 0.2.",
    explanationZh: "由独立性，P(A ∩ B) = P(A)P(B) = 0.5 × 0.4 = 0.2。",
    tags: ["probability", "independence"],
  },
  {
    topic: "M4.1",
    difficulty: "MEDIUM",
    stem: "How many 4-digit codes can be formed from the digits 1, 2, 3, 4 without repetition?",
    stemZh: "用数字 1、2、3、4 不重复地组成 4 位数，共有多少种？",
    options: ["24", "12", "256", "16"],
    optionsZh: ["24", "12", "256", "16"],
    correct: 0,
    explanation:
      "Each ordering of four distinct digits is different: 4! = 4 × 3 × 2 × 1 = 24. Repetition would give 4⁴ = 256.",
    explanationZh:
      "四个不同数字的每一种排列都不同：4! = 4 × 3 × 2 × 1 = 24。若允许重复则为 4⁴ = 256。",
    tags: ["probability", "counting"],
  },

  /* ── M4.2 Data characteristics ─────────────────────────────── */
  {
    topic: "M4.2",
    difficulty: "EASY",
    stem: "What is the mean of 4, 6, 8, 10, 12?",
    stemZh: "4、6、8、10、12 的平均数是多少？",
    options: ["8", "7", "9", "10"],
    optionsZh: ["8", "7", "9", "10"],
    correct: 0,
    explanation: "Sum = 40, count = 5, so mean = 40/5 = 8.",
    explanationZh: "总和为 40，数据个数为 5，所以平均数为 40/5 = 8。",
    tags: ["statistics", "mean"],
  },
  {
    topic: "M4.2",
    difficulty: "HARD",
    stem: "What is the variance of 2, 4, 6, 8, 10?",
    stemZh: "2、4、6、8、10 的方差是多少？",
    options: ["8", "4", "10", "40"],
    optionsZh: ["8", "4", "10", "40"],
    correct: 0,
    explanation:
      "Mean = 6. Squared deviations: 16, 4, 0, 4, 16 — sum 40. Variance = 40/5 = 8.",
    explanationZh:
      "平均数为 6。各偏差平方为 16、4、0、4、16，合计 40，方差 = 40/5 = 8。",
    tags: ["statistics", "variance"],
  },
  {
    topic: "M4.2",
    difficulty: "MEDIUM",
    stem: "What is the median of 3, 7, 9, 12, 15, 20?",
    stemZh: "3、7、9、12、15、20 的中位数是多少？",
    options: ["10.5", "9", "11", "12"],
    optionsZh: ["10.5", "9", "11", "12"],
    correct: 0,
    explanation:
      "With six ordered values the median is the mean of the 3rd and 4th: (9 + 12)/2 = 10.5.",
    explanationZh:
      "数据共 6 个且已排序，中位数为第 3、4 个数的平均：(9 + 12)/2 = 10.5。",
    tags: ["statistics", "median"],
  },
  {
    topic: "M4.2",
    difficulty: "MEDIUM",
    stem: "If 5 is added to every value in a data set, what happens to the mean and standard deviation?",
    stemZh: "若数据集中每个数值都加 5，平均数与标准差分别如何变化？",
    options: [
      "Mean increases by 5, standard deviation unchanged",
      "Both increase by 5",
      "Mean unchanged, standard deviation increases by 5",
      "Both unchanged",
    ],
    optionsZh: [
      "平均数增加 5，标准差不变",
      "两者都增加 5",
      "平均数不变，标准差增加 5",
      "两者都不变",
    ],
    correct: 0,
    explanation:
      "Adding a constant shifts every value and the mean by that constant, but leaves the spread — and therefore the standard deviation — unchanged.",
    explanationZh:
      "每个数据加同一常数，平均数随之增加该常数，但数据的离散程度不变，因此标准差不变。",
    tags: ["statistics", "standard deviation"],
  },

  /* ── M4.3 Normal distribution ──────────────────────────────── */
  {
    topic: "M4.3",
    difficulty: "EASY",
    stem: "For a normal distribution with mean μ, what is P(X < μ)?",
    stemZh: "正态分布的均值为 μ，则 P(X < μ) 等于多少？",
    options: ["0.5", "0", "1", "0.68"],
    optionsZh: ["0.5", "0", "1", "0.68"],
    correct: 0,
    explanation:
      "The normal curve is symmetric about its mean, so exactly half the area lies below μ.",
    explanationZh: "正态曲线关于均值对称，因此均值以下的面积恰好占一半。",
    tags: ["normal distribution", "symmetry"],
  },
  {
    topic: "M4.3",
    difficulty: "MEDIUM",
    stem: "Using the 68–95–99.7 rule, what is P(μ − σ < X < μ + σ) approximately?",
    stemZh: "根据 68–95–99.7 法则，P(μ − σ < X < μ + σ) 约等于多少？",
    options: ["0.68", "0.95", "0.34", "0.997"],
    optionsZh: ["0.68", "0.95", "0.34", "0.997"],
    correct: 0,
    explanation:
      "About 68% of the area lies within one standard deviation of the mean, 95% within two, and 99.7% within three.",
    explanationZh:
      "约 68% 的面积位于均值一个标准差范围内，两个标准差内约 95%，三个标准差内约 99.7%。",
    tags: ["normal distribution", "empirical rule"],
  },
  {
    topic: "M4.3",
    difficulty: "HARD",
    stem: "A normal variable has mean 60 and standard deviation 10. What is the z-score of x = 75?",
    stemZh: "某正态变量均值为 60，标准差为 10，x = 75 的标准分数 z 是多少？",
    options: ["1.5", "0.15", "15", "−1.5"],
    optionsZh: ["1.5", "0.15", "15", "−1.5"],
    correct: 0,
    explanation: "z = (x − μ)/σ = (75 − 60)/10 = 15/10 = 1.5.",
    explanationZh: "z = (x − μ)/σ = (75 − 60)/10 = 15/10 = 1.5。",
    tags: ["normal distribution", "z-score"],
  },
];
