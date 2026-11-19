import type { SeedQuestion } from "../types";

/**
 * Official CSCA Mathematics — October 2025 sitting.
 *
 * Part 1 (questions 1–20 of 48) transcribed from the scanned paper. The paper
 * has no published answer key, so the answers here are reconstructed and
 * labelled accordingly. Part 2 (Q21–48) follows separately.
 */
export const officialMathOct2025Part1Questions: SeedQuestion[] = [
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "Which of the following statements is correct?",
    stemZh: "下列说法正确的是？",
    options: ["−2 ∈ ℕ", "π ∈ ℚ", "3/2 ∈ ℤ", "√3 ∈ ℝ"],
    optionsZh: ["−2 ∈ ℕ", "π ∈ ℚ", "3/2 ∈ ℤ", "√3 ∈ ℝ"],
    correct: 3,
    explanation:
      "√3 is a real number, so √3 ∈ ℝ. −2 is not a natural number, π is irrational (not rational), and 3/2 is not an integer.",
    explanationZh:
      "√3 是实数，故 √3 ∈ ℝ。−2 不是自然数，π 是无理数，3/2 不是整数。",
    tags: ["sets", "number systems"],
  },
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, which operation is correct?",
    stemZh: "已知集合 A = {1, 2, 3, 4}，B = {3, 4, 5, 6}，则下列运算正确的是？",
    options: ["A ∪ B = {3, 4}", "A ∩ B = {5, 6}", "A ∩ B = {1, 2, 5, 6}", "A ∪ B = {1, 2, 3, 4, 5, 6}"],
    optionsZh: ["A ∪ B = {3, 4}", "A ∩ B = {5, 6}", "A ∩ B = {1, 2, 5, 6}", "A ∪ B = {1, 2, 3, 4, 5, 6}"],
    correct: 3,
    explanation:
      "The union contains every element of either set: {1, 2, 3, 4, 5, 6}. The intersection is only {3, 4}.",
    explanationZh:
      "并集包含两个集合的所有元素：{1, 2, 3, 4, 5, 6}；交集仅为 {3, 4}。",
    tags: ["sets", "union", "intersection"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The domain of f(x) = ln x + √(1 − x) is",
    stemZh: "函数 f(x) = ln x + √(1 − x) 的定义域是",
    options: ["{x | 0 < x ≤ 1}", "{x | x > 0}", "{x | x ≤ 1}", "{x | x ≥ 1}"],
    optionsZh: ["{x | 0 < x ≤ 1}", "{x | x > 0}", "{x | x ≤ 1}", "{x | x ≥ 1}"],
    correct: 0,
    explanation:
      "ln x requires x > 0, and the square root requires 1 − x ≥ 0, i.e. x ≤ 1. Together: 0 < x ≤ 1.",
    explanationZh:
      "ln x 要求 x > 0，根式要求 1 − x ≥ 0，即 x ≤ 1。两者取交集得 0 < x ≤ 1。",
    tags: ["functions", "domain"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Point M(a + 3, a + 1) lies on the x-axis. Its coordinates are",
    stemZh: "点 M(a + 3, a + 1) 在 x 轴上，则该点的坐标是",
    options: ["(0, −4)", "(0, −2)", "(2, 0)", "(4, 0)"],
    optionsZh: ["(0, −4)", "(0, −2)", "(2, 0)", "(4, 0)"],
    correct: 2,
    explanation:
      "On the x-axis the y-coordinate is zero: a + 1 = 0, so a = −1. Then x = a + 3 = 2, giving (2, 0).",
    explanationZh:
      "x 轴上的点纵坐标为 0：a + 1 = 0，a = −1，故 x = a + 3 = 2，点为 (2, 0)。",
    tags: ["analytic geometry", "coordinates"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Given α = 5π/6, which conclusion is correct?",
    stemZh: "已知角 α = 5π/6，下列结论正确的是？",
    options: ["sin α = 1/2", "sin α = −1/2", "sin α = √3/2", "sin α = −√3/2"],
    optionsZh: ["sin α = 1/2", "sin α = −1/2", "sin α = √3/2", "sin α = −√3/2"],
    correct: 0,
    explanation:
      "5π/6 is in the second quadrant. sin(5π/6) = sin(π − π/6) = sin(π/6) = 1/2.",
    explanationZh:
      "5π/6 在第二象限，sin(5π/6) = sin(π − π/6) = sin(π/6) = 1/2。",
    tags: ["trigonometry", "special angles"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Which of the following functions is even?",
    stemZh: "下列哪个函数是偶函数？",
    options: ["f(x) = 2x² + cos x", "f(x) = x + 3x²", "f(x) = √x", "f(x) = x² − sin x"],
    optionsZh: ["f(x) = 2x² + cos x", "f(x) = x + 3x²", "f(x) = √x", "f(x) = x² − sin x"],
    correct: 0,
    explanation:
      "f(−x) = 2(−x)² + cos(−x) = 2x² + cos x = f(x), so the first function is even. The others are not even (and √x has a restricted domain).",
    explanationZh:
      "f(−x) = 2(−x)² + cos(−x) = 2x² + cos x = f(x)，故第一个函数是偶函数。其余均不是偶函数（√x 的定义域也不对称）。",
    tags: ["functions", "parity"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which point lies in the third quadrant?",
    stemZh: "下列哪个点位于第三象限？",
    options: ["(1, −2)", "(−1, −2)", "(1, 2)", "(−1, 2)"],
    optionsZh: ["(1, −2)", "(−1, −2)", "(1, 2)", "(−1, 2)"],
    correct: 1,
    explanation:
      "The third quadrant requires x < 0 and y < 0; only (−1, −2) satisfies both.",
    explanationZh:
      "第三象限要求 x < 0 且 y < 0，只有 (−1, −2) 满足。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "The inverse function of y = 1 − x³ is",
    stemZh: "函数 y = 1 − x³ 的反函数是",
    options: ["y = ∛(1 − x)", "y = ∛(x − 1)", "y = ∛(1 + x)", "y = √(1 − x)"],
    optionsZh: ["y = ∛(1 − x)", "y = ∛(x − 1)", "y = ∛(1 + x)", "y = √(1 − x)"],
    correct: 0,
    explanation:
      "From y = 1 − x³, x³ = 1 − y, so x = ∛(1 − y). Swapping x and y gives y = ∛(1 − x).",
    explanationZh:
      "由 y = 1 − x³ 得 x³ = 1 − y，x = ∛(1 − y)，互换 x、y 得 y = ∛(1 − x)。",
    tags: ["functions", "inverse"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which function is decreasing on (0, +∞)?",
    stemZh: "下列哪个函数在 (0, +∞) 上是减函数？",
    options: ["y = 3x", "y = x²", "y = x³", "y = 1/x"],
    optionsZh: ["y = 3x", "y = x²", "y = x³", "y = 1/x"],
    correct: 3,
    explanation:
      "y = 1/x is decreasing on (0, +∞). The other three are increasing on that interval.",
    explanationZh:
      "y = 1/x 在 (0, +∞) 上单调递减；其余三个函数在该区间上单调递增。",
    tags: ["functions", "monotonicity"],
  },
  {
    topic: "M1.2",
    difficulty: "MEDIUM",
    stem: "The solution set of (2x − 4)/(x − 1) ≤ 0 is",
    stemZh: "有理不等式 (2x − 4)/(x − 1) ≤ 0 的解集是",
    options: ["{x | 1 < x ≤ 2}", "{x | 1 ≤ x < 2}", "{x | 1 ≤ x ≤ 2}", "{x | x < 1 or x > 2}"],
    optionsZh: ["{x | 1 < x ≤ 2}", "{x | 1 ≤ x < 2}", "{x | 1 ≤ x ≤ 2}", "{x | x < 1 或 x > 2}"],
    correct: 0,
    explanation:
      "The numerator is zero at x = 2 and the denominator at x = 1. The fraction is non-positive between them, with 2 included and 1 excluded: (1, 2].",
    explanationZh:
      "分子零点为 x = 2，分母零点为 x = 1。分式在两者之间非正，2 可取等号，1 使分母为零，故解集为 (1, 2]。",
    tags: ["inequalities", "rational"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If a = √2 + 1 and b = √2 − 1, the geometric mean of a and b is",
    stemZh: "已知 a = √2 + 1，b = √2 − 1，则 a 和 b 的几何平均数是",
    options: ["±1", "1", "√2", "−1"],
    optionsZh: ["±1", "1", "√2", "−1"],
    correct: 1,
    explanation:
      "The geometric mean is √(ab) = √((√2 + 1)(√2 − 1)) = √(2 − 1) = 1.",
    explanationZh:
      "几何平均数为 √(ab) = √((√2 + 1)(√2 − 1)) = √(2 − 1) = 1。",
    tags: ["sequences", "geometric mean"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "In an arithmetic sequence with a₁ = 2 and d = 3, a₁₀₀ =",
    stemZh: "等差数列中 a₁ = 2，d = 3，则 a₁₀₀ =",
    options: ["299", "302", "298", "305"],
    optionsZh: ["299", "302", "298", "305"],
    correct: 0,
    explanation:
      "a₁₀₀ = a₁ + 99d = 2 + 99 × 3 = 299.",
    explanationZh:
      "a₁₀₀ = a₁ + 99d = 2 + 99×3 = 299。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The slope of the line through A(−1, 1) and B(2, 3) is",
    stemZh: "经过点 A(−1, 1) 和 B(2, 3) 的直线的斜率是",
    options: ["3", "2/3", "3/2", "−2/3"],
    optionsZh: ["3", "2/3", "3/2", "−2/3"],
    correct: 1,
    explanation:
      "k = (3 − 1)/(2 − (−1)) = 2/3.",
    explanationZh:
      "k = (3 − 1)/(2 − (−1)) = 2/3。",
    tags: ["analytic geometry", "lines", "slope"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If the terminal side of angle α passes through M(2, 4), then tan α =",
    stemZh: "已知角 α 的终边经过点 M(2, 4)，则 tan α =",
    options: ["2", "−2", "1/2", "−1/2"],
    optionsZh: ["2", "−2", "1/2", "−1/2"],
    correct: 0,
    explanation:
      "tan α = y/x = 4/2 = 2.",
    explanationZh:
      "tan α = y/x = 4/2 = 2。",
    tags: ["trigonometry", "definitions"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If {aₙ} is arithmetic with a₁ = 1 and a₂ = 3, then a₅ =",
    stemZh: "若数列 {aₙ} 是等差数列，a₁ = 1，a₂ = 3，则 a₅ =",
    options: ["9", "11", "5", "7"],
    optionsZh: ["9", "11", "5", "7"],
    correct: 0,
    explanation:
      "d = 3 − 1 = 2, so a₅ = 1 + 4 × 2 = 9.",
    explanationZh:
      "d = 3 − 1 = 2，故 a₅ = 1 + 4×2 = 9。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The distance between A(−1, 2) and B(3, −1) is",
    stemZh: "已知点 A(−1, 2) 和 B(3, −1)，则两点间的距离 |AB| =",
    options: ["√5", "25", "5", "4"],
    optionsZh: ["√5", "25", "5", "4"],
    correct: 2,
    explanation:
      "|AB| = √((3 + 1)² + (−1 − 2)²) = √(16 + 9) = 5.",
    explanationZh:
      "|AB| = √((3 + 1)² + (−1 − 2)²) = √(16 + 9) = 5。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The equation of the line through M(−2, 3) with slope k = 2 is",
    stemZh: "经过点 M(−2, 3) 且斜率 k = 2 的直线方程是",
    options: ["y = x + 7", "y = 2x − 1", "y = 2x + 7", "y = x + 5"],
    optionsZh: ["y = x + 7", "y = 2x − 1", "y = 2x + 7", "y = x + 5"],
    correct: 2,
    explanation:
      "Point-slope form: y − 3 = 2(x + 2), so y = 2x + 7.",
    explanationZh:
      "由点斜式 y − 3 = 2(x + 2)，得 y = 2x + 7。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "A circle passes through A(2, 2) and has centre (2, 0). Its equation is",
    stemZh: "一个圆经过点 A(2, 2)，圆心为 (2, 0)，则该圆的方程是",
    options: ["(x − 2)² + y² = 2", "x² + (y − 2)² = 2", "(x − 2)² + (y − 2)² = 4", "(x − 2)² + y² = 4"],
    optionsZh: ["(x − 2)² + y² = 2", "x² + (y − 2)² = 2", "(x − 2)² + (y − 2)² = 4", "(x − 2)² + y² = 4"],
    correct: 3,
    explanation:
      "The radius is the distance from (2, 0) to (2, 2), which is 2. With centre (2, 0), the equation is (x − 2)² + y² = 4.",
    explanationZh:
      "半径等于圆心 (2, 0) 到 A(2, 2) 的距离，即 2。故方程为 (x − 2)² + y² = 4。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If tan α = 2, then (3sin α + 2cos α)/(4sin α − 3cos α) =",
    stemZh: "若 tan α = 2，则 (3sin α + 2cos α)/(4sin α − 3cos α) =",
    options: ["8/5", "−8/5", "5/3", "−5/3"],
    optionsZh: ["8/5", "−8/5", "5/3", "−5/3"],
    correct: 0,
    explanation:
      "Divide numerator and denominator by cos α: (3tan α + 2)/(4tan α − 3) = (6 + 2)/(8 − 3) = 8/5.",
    explanationZh:
      "分子分母同除以 cos α，得 (3tan α + 2)/(4tan α − 3) = (6 + 2)/(8 − 3) = 8/5。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "The general term of the sequence 1/2, −1/4, 1/8, … is",
    stemZh: "数列 1/2，−1/4，1/8，… 的通项公式是",
    options: ["(−1)ⁿ⁻¹ · 1/2ⁿ", "1/2ⁿ", "(−1)ⁿ⁻¹ · 1/2ⁿ⁻¹", "1/2ⁿ⁻¹"],
    optionsZh: ["(−1)ⁿ⁻¹ · 1/2ⁿ", "1/2ⁿ", "(−1)ⁿ⁻¹ · 1/2ⁿ⁻¹", "1/2ⁿ⁻¹"],
    correct: 0,
    explanation:
      "The first term is 1/2 and the ratio is −1/2, so aₙ = (1/2)(−1/2)ⁿ⁻¹ = (−1)ⁿ⁻¹/2ⁿ.",
    explanationZh:
      "首项为 1/2，公比为 −1/2，故 aₙ = (1/2)(−1/2)ⁿ⁻¹ = (−1)ⁿ⁻¹/2ⁿ。",
    tags: ["sequences", "geometric"],
  },
];
