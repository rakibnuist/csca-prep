import type { SeedQuestion } from "../types";

/**
 * Official CSCA Mathematics past paper — December 2025 sitting.
 *
 * Transcribed from the official paper and answer key (bilingual CN/EN).
 * Source keys for Q12, Q41, Q47 and Q48 were inconsistent and have been
 * corrected against the mathematics. No diagram items appear on this sitting.
 */
export const officialMathDec2025Questions: SeedQuestion[] = [
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "If A = {1, 2} and B = {1, 2, 3}, which statement is true?",
    stemZh: "若集合 A = {1, 2}，B = {1, 2, 3}，则以下哪个是正确的？",
    options: ["B ⊆ A", "A = B", "A ⊆ B", "A ⊄ B"],
    optionsZh: ["B ⊆ A", "A = B", "A ⊆ B", "A ⊄ B"],
    correct: 2,
    explanation:
      "Every element of A (1 and 2) is also in B, so A ⊆ B. B is not a subset of A because 3 ∉ A.",
    explanationZh:
      "A 的元素 1、2 都属于 B，故 A ⊆ B。B 不是 A 的子集，因为 3 ∉ A。",
    tags: ["sets", "subsets"],
  },
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "If A = (−1, 3) and B = [2, 4], then A ∩ B =",
    stemZh: "若集合 A = (−1, 3)，B = [2, 4]，则 A ∩ B =",
    options: ["[2, 3]", "[2, 3)", "(2, 3]", "(2, 3)"],
    optionsZh: ["[2, 3]", "[2, 3)", "(2, 3]", "(2, 3)"],
    correct: 1,
    explanation:
      "2 belongs to both intervals (A is open at −1 and 3, but 2 is interior), while 3 is excluded from A. Hence A ∩ B = [2, 3).",
    explanationZh:
      "2 同时属于两个区间（A 只在 −1、3 处开），而 3 不属于 A。故 A ∩ B = [2, 3)。",
    tags: ["sets", "intersection"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "The solution set of x² − 5x + 4 < 0 is",
    stemZh: "一元二次不等式 x² − 5x + 4 < 0 的解集为",
    options: ["(−4, −1)", "(−∞, 1) ∪ (4, +∞)", "(−∞, −4) ∪ (−1, +∞)", "(1, 4)"],
    optionsZh: ["(−4, −1)", "(−∞, 1) ∪ (4, +∞)", "(−∞, −4) ∪ (−1, +∞)", "(1, 4)"],
    correct: 3,
    explanation:
      "x² − 5x + 4 = (x − 1)(x − 4) < 0. The upward parabola is negative between the roots, so 1 < x < 4.",
    explanationZh:
      "x² − 5x + 4 = (x − 1)(x − 4) < 0。开口向上的抛物线在两根之间为负，故 1 < x < 4。",
    tags: ["inequalities", "quadratic"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The domain of y = 1/√(x + 1) is",
    stemZh: "函数 y = 1/√(x + 1) 的定义域为",
    options: ["[−1, +∞)", "(−1, +∞)", "(0, +∞)", "(−∞, −1)"],
    optionsZh: ["[−1, +∞)", "(−1, +∞)", "(0, +∞)", "(−∞, −1)"],
    correct: 1,
    explanation:
      "The radicand must be strictly positive because it is in a denominator: x + 1 > 0, so x > −1.",
    explanationZh:
      "根式在分母中，被开方数必须严格大于 0：x + 1 > 0，故 x > −1。",
    tags: ["functions", "domain"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If {aₙ} is arithmetic with a₁ = 5 and d = 2, then a₁₀₀ =",
    stemZh: "若 {aₙ} 为等差数列，a₁ = 5，d = 2，则 a₁₀₀ =",
    options: ["203", "205", "199", "204"],
    optionsZh: ["203", "205", "199", "204"],
    correct: 0,
    explanation:
      "a₁₀₀ = a₁ + 99d = 5 + 99 × 2 = 203.",
    explanationZh:
      "a₁₀₀ = a₁ + 99d = 5 + 99×2 = 203。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The point (−1, 3 − π) lies in the",
    stemZh: "点 (−1, 3 − π) 位于平面直角坐标系的",
    options: ["third quadrant", "first quadrant", "second quadrant", "fourth quadrant"],
    optionsZh: ["第三象限", "第一象限", "第二象限", "第四象限"],
    correct: 0,
    explanation:
      "x = −1 < 0 and 3 − π ≈ −0.14 < 0, so the point is in the third quadrant.",
    explanationZh:
      "x = −1 < 0，且 3 − π ≈ −0.14 < 0，故点在第三象限。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "(sin(π/4) + cos(π/4)) · tan(π/4) =",
    stemZh: "(sin(π/4) + cos(π/4)) · tan(π/4) =",
    options: ["2√2", "2", "√2", "1"],
    optionsZh: ["2√2", "2", "√2", "1"],
    correct: 2,
    explanation:
      "sin(π/4) = cos(π/4) = √2/2 and tan(π/4) = 1, so the product is (√2/2 + √2/2) × 1 = √2.",
    explanationZh:
      "sin(π/4) = cos(π/4) = √2/2，tan(π/4) = 1，故原式 = (√2/2 + √2/2)×1 = √2。",
    tags: ["trigonometry", "special angles"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Which of the following functions is odd?",
    stemZh: "下列函数是奇函数的是",
    options: ["y = x sin x", "y = x⁴", "y = cos x", "y = x + x³"],
    optionsZh: ["y = x sin x", "y = x⁴", "y = cos x", "y = x + x³"],
    correct: 3,
    explanation:
      "f(−x) = −x − x³ = −(x + x³) = −f(x), so y = x + x³ is odd. The others are even.",
    explanationZh:
      "f(−x) = −x − x³ = −(x + x³) = −f(x)，故 y = x + x³ 是奇函数。其余均为偶函数。",
    tags: ["functions", "parity"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The inverse function of y = x³ is",
    stemZh: "函数 y = x³ 的反函数是",
    options: ["y = x/3", "y = 3x", "y = x³", "y = ∛x"],
    optionsZh: ["y = x/3", "y = 3x", "y = x³", "y = ∛x"],
    correct: 3,
    explanation:
      "From y = x³, x = ∛y. Swapping x and y gives y = ∛x.",
    explanationZh:
      "由 y = x³ 得 x = ∛y，互换 x、y 得 y = ∛x。",
    tags: ["functions", "inverse"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which function is monotonically increasing?",
    stemZh: "下列函数中单调递增的是",
    options: ["y = (1/3)ˣ", "y = log₀.₅ x", "y = 2x + 1", "y = sin x"],
    optionsZh: ["y = (1/3)ˣ", "y = log₀.₅ x", "y = 2x + 1", "y = sin x"],
    correct: 2,
    explanation:
      "y = 2x + 1 is a line with positive slope, so it is increasing. The exponential and logarithm with bases below 1 are decreasing, and sin x is not monotonic on ℝ.",
    explanationZh:
      "y = 2x + 1 的斜率为正，单调递增。底数小于 1 的指数、对数函数单调递减，sin x 在 ℝ 上不单调。",
    tags: ["functions", "monotonicity"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which point is in the third quadrant?",
    stemZh: "下列点位于第三象限的是",
    options: ["(−1, −2)", "(−1, 2)", "(2, 2)", "(1, −2)"],
    optionsZh: ["(−1, −2)", "(−1, 2)", "(2, 2)", "(1, −2)"],
    correct: 0,
    explanation:
      "The third quadrant requires x < 0 and y < 0, which only (−1, −2) satisfies.",
    explanationZh:
      "第三象限要求 x < 0 且 y < 0，只有 (−1, −2) 满足。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M1.2",
    difficulty: "MEDIUM",
    stem: "The solution set of (x − 1)/(x − 2) ≤ 1 is",
    stemZh: "不等式 (x − 1)/(x − 2) ≤ 1 的解集为",
    options: ["(2, +∞)", "[1, 2]", "(−∞, 2)", "(−∞, 1]"],
    optionsZh: ["(2, +∞)", "[1, 2]", "(−∞, 2)", "(−∞, 1]"],
    correct: 2,
    explanation:
      "(x − 1)/(x − 2) − 1 = 1/(x − 2) ≤ 0. The numerator is positive, so the denominator must be negative: x − 2 < 0, i.e. x < 2. The point x = 2 is excluded.",
    explanationZh:
      "(x − 1)/(x − 2) − 1 = 1/(x − 2) ≤ 0。分子为正，故分母必须为负：x − 2 < 0，即 x < 2。x = 2 时分母为零，故排除。",
    tags: ["inequalities", "rational"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If a, b, c form an arithmetic sequence and a + c = 20, then b =",
    stemZh: "已知 a，b，c 构成等差数列且 a + c = 20，则 b =",
    options: ["10", "5", "20", "0"],
    optionsZh: ["10", "5", "20", "0"],
    correct: 0,
    explanation:
      "The middle term of an arithmetic progression is the average of its neighbours: b = (a + c)/2 = 10.",
    explanationZh:
      "等差数列的中间项等于两端项的算术平均：b = (a + c)/2 = 10。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The angle of inclination of y = √3x + 10 is",
    stemZh: "直线 y = √3x + 10 的倾斜角为",
    options: ["60°", "30°", "45°", "120°"],
    optionsZh: ["60°", "30°", "45°", "120°"],
    correct: 0,
    explanation:
      "The slope is √3. From tan α = √3 and 0° ≤ α < 180°, α = 60°.",
    explanationZh:
      "斜率为 √3。由 tan α = √3 且 0° ≤ α < 180°，得 α = 60°。",
    tags: ["analytic geometry", "lines", "slope"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Which inequality is correct?",
    stemZh: "下列不等式正确的是",
    options: [
      "0.75⁻⁰·² > 0.75⁻⁰·⁴",
      "3⁴·⁵ > 3⁵",
      "2.1⁻² > 2.1⁻²",
      "2.1²/³ > 1.2²/³",
    ],
    optionsZh: [
      "0.75⁻⁰·² > 0.75⁻⁰·⁴",
      "3⁴·⁵ > 3⁵",
      "2.1⁻² > 2.1⁻²",
      "2.1²/³ > 1.2²/³",
    ],
    correct: 3,
    explanation:
      "f(x) = x^(2/3) is increasing for x > 0, and 2.1 > 1.2, so 2.1^(2/3) > 1.2^(2/3). The other options are false.",
    explanationZh:
      "f(x) = x^(2/3) 在 x > 0 时递增，且 2.1 > 1.2，故 2.1^(2/3) > 1.2^(2/3)。其余选项均不成立。",
    tags: ["inequalities", "power functions"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If P(1, y) is on the terminal side of α and tan α = 2, then y =",
    stemZh: "若点 P(1, y) 是角 α 终边上的点，且 tan α = 2，则 y =",
    options: ["1", "1/2", "√3", "2"],
    optionsZh: ["1", "1/2", "√3", "2"],
    correct: 3,
    explanation:
      "tan α = y/x = y/1 = 2, so y = 2.",
    explanationZh:
      "tan α = y/x = y/1 = 2，故 y = 2。",
    tags: ["trigonometry", "definitions"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If {aₙ} is arithmetic with a₁ = 1 and a₂ = 2, then a₂₀₂₅ =",
    stemZh: "若 {aₙ} 是等差数列，a₁ = 1，a₂ = 2，则 a₂₀₂₅ =",
    options: ["2", "2025", "2024", "20"],
    optionsZh: ["2", "2025", "2024", "20"],
    correct: 1,
    explanation:
      "d = a₂ − a₁ = 1, so a₂₀₂₅ = 1 + 2024 × 1 = 2025.",
    explanationZh:
      "d = a₂ − a₁ = 1，故 a₂₀₂₅ = 1 + 2024×1 = 2025。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "A circle has centre (−3, 2) and radius 4. Its equation is",
    stemZh: "若圆的圆心为 (−3, 2)，半径为 4，则圆的方程是",
    options: [
      "(x + 3)² + (y − 2)² = 4",
      "(x − 3)² + (y + 2)² = 4",
      "(x − 3)² + (y + 2)² = 16",
      "(x + 3)² + (y − 2)² = 16",
    ],
    optionsZh: [
      "(x + 3)² + (y − 2)² = 4",
      "(x − 3)² + (y + 2)² = 4",
      "(x − 3)² + (y + 2)² = 16",
      "(x + 3)² + (y − 2)² = 16",
    ],
    correct: 3,
    explanation:
      "The standard equation is (x + 3)² + (y − 2)² = 4² = 16.",
    explanationZh:
      "圆的标准方程为 (x + 3)² + (y − 2)² = 4² = 16。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If sin α = 3/5 and α is in the second quadrant, then cos α =",
    stemZh: "已知 sin α = 3/5，且 α 是第二象限角，则 cos α =",
    options: ["4/5", "−4/5", "3/4", "−3/4"],
    optionsZh: ["4/5", "−4/5", "3/4", "−3/4"],
    correct: 1,
    explanation:
      "In the second quadrant cosine is negative: cos α = −√(1 − 9/25) = −4/5.",
    explanationZh:
      "第二象限余弦为负：cos α = −√(1 − 9/25) = −4/5。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The domain of y = √(x − 1) is",
    stemZh: "函数 y = √(x − 1) 的定义域是",
    options: ["[1, +∞)", "(1, +∞)", "(−∞, 1]", "(−∞, 1)"],
    optionsZh: ["[1, +∞)", "(1, +∞)", "(−∞, 1]", "(−∞, 1)"],
    correct: 0,
    explanation:
      "The radicand must be non-negative: x − 1 ≥ 0, so x ≥ 1.",
    explanationZh:
      "被开方数非负：x − 1 ≥ 0，故 x ≥ 1。",
    tags: ["functions", "domain"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The radius of the circle x² + y² + 2x − 2y = 0 is",
    stemZh: "圆 x² + y² + 2x − 2y = 0 的半径为",
    options: ["2", "1/2", "√2", "1"],
    optionsZh: ["2", "1/2", "√2", "1"],
    correct: 2,
    explanation:
      "Complete the square: (x + 1)² + (y − 1)² = 2, so r = √2.",
    explanationZh:
      "配方得 (x + 1)² + (y − 1)² = 2，故 r = √2。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If α is acute and sin α = √3/2, then tan α =",
    stemZh: "若 α 为锐角，且 sin α = √3/2，则 tan α =",
    options: ["1/2", "√3", "1/4", "√3/3"],
    optionsZh: ["1/2", "√3", "1/4", "√3/3"],
    correct: 1,
    explanation:
      "For an acute angle, sin α = √3/2 gives α = 60°, so tan α = √3.",
    explanationZh:
      "α 为锐角，sin α = √3/2，故 α = 60°，tan α = √3。",
    tags: ["trigonometry", "special angles"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "The first three terms of a geometric sequence are 1, 2, 4. Its general term is",
    stemZh: "等比数列 {aₙ} 的前三项为 1，2，4，则通项公式为",
    options: ["aₙ = 2n", "aₙ = 8", "aₙ = 2ⁿ⁻¹", "aₙ = 2ⁿ"],
    optionsZh: ["aₙ = 2n", "aₙ = 8", "aₙ = 2ⁿ⁻¹", "aₙ = 2ⁿ"],
    correct: 2,
    explanation:
      "a₁ = 1 and q = 2, so aₙ = 1 × 2ⁿ⁻¹ = 2ⁿ⁻¹.",
    explanationZh:
      "a₁ = 1，q = 2，故 aₙ = 1×2ⁿ⁻¹ = 2ⁿ⁻¹。",
    tags: ["sequences", "geometric"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "If a > b, then",
    stemZh: "已知 a > b，则",
    options: ["1/a < 1/b", "a² > b²", "5ᵃ > 5ᵇ", "sin a > sin b"],
    optionsZh: ["1/a < 1/b", "a² > b²", "5ᵃ > 5ᵇ", "sin a > sin b"],
    correct: 2,
    explanation:
      "f(x) = 5ˣ is strictly increasing, so a > b implies 5ᵃ > 5ᵇ. The other options fail for some values (e.g. signs or periodicity).",
    explanationZh:
      "f(x) = 5ˣ 严格递增，故 a > b 推出 5ᵃ > 5ᵇ。其余选项在部分取值下不成立（如符号、周期性）。",
    tags: ["inequalities", "exponential"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The distance from P(−1, 2) to Q(3, 1) is",
    stemZh: "点 P(−1, 2) 到 Q(3, 1) 的距离是",
    options: ["√17", "√13", "√5", "5"],
    optionsZh: ["√17", "√13", "√5", "5"],
    correct: 0,
    explanation:
      "|PQ| = √((3 + 1)² + (1 − 2)²) = √(16 + 1) = √17.",
    explanationZh:
      "|PQ| = √((3 + 1)² + (1 − 2)²) = √(16 + 1) = √17。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which description of y = (1/2)ˣ is correct?",
    stemZh: "下列关于函数 y = (1/2)ˣ 的描述正确的是",
    options: ["Symmetric about the origin", "Symmetric about the x-axis", "Increasing", "Decreasing"],
    optionsZh: ["关于原点对称", "关于 x 轴对称", "单调递增", "单调递减"],
    correct: 3,
    explanation:
      "The base 1/2 lies between 0 and 1, so the exponential function is decreasing on ℝ.",
    explanationZh:
      "底数 1/2 在 0 与 1 之间，故该指数函数在 ℝ 上单调递减。",
    tags: ["functions", "exponential", "monotonicity"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If sin α = 1/4, then cos 2α =",
    stemZh: "若 sin α = 1/4，则 cos 2α =",
    options: ["−7/8", "1/8", "7/8", "−1/8"],
    optionsZh: ["−7/8", "1/8", "7/8", "−1/8"],
    correct: 2,
    explanation:
      "cos 2α = 1 − 2sin²α = 1 − 2(1/16) = 7/8.",
    explanationZh:
      "cos 2α = 1 − 2sin²α = 1 − 2(1/16) = 7/8。",
    tags: ["trigonometry", "double angle"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The intersection of l₁: y = 2x + 1 and l₂: x + y + 1 = 0 is",
    stemZh: "直线 l₁：y = 2x + 1 与 l₂：x + y + 1 = 0 的交点为",
    options: ["(1/3, 2/3)", "(2/3, 1/3)", "(−1/3, −2/3)", "(−2/3, −1/3)"],
    optionsZh: ["(1/3, 2/3)", "(2/3, 1/3)", "(−1/3, −2/3)", "(−2/3, −1/3)"],
    correct: 3,
    explanation:
      "Substitute y = 2x + 1 into x + y + 1 = 0: 3x + 2 = 0, so x = −2/3 and y = −1/3.",
    explanationZh:
      "将 y = 2x + 1 代入 x + y + 1 = 0，得 3x + 2 = 0，故 x = −2/3，y = −1/3。",
    tags: ["analytic geometry", "lines", "intersection"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The foci of the hyperbola x² − y² = 1 are",
    stemZh: "双曲线 x² − y² = 1 的焦点坐标是",
    options: ["(±√2, 0)", "(0, ±2)", "(0, ±√2)", "(±2, 0)"],
    optionsZh: ["(±√2, 0)", "(0, ±2)", "(0, ±√2)", "(±2, 0)"],
    correct: 0,
    explanation:
      "a² = 1 and b² = 1, so c² = a² + b² = 2 and c = √2. The transverse axis is horizontal, giving foci (±√2, 0).",
    explanationZh:
      "a² = 1，b² = 1，故 c² = a² + b² = 2，c = √2。实轴在 x 轴上，焦点为 (±√2, 0)。",
    tags: ["analytic geometry", "hyperbola"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "log₂ 32 + log₁/₂ 32 =",
    stemZh: "log₂ 32 + log₁/₂ 32 =",
    options: ["−5", "10", "0", "5"],
    optionsZh: ["−5", "10", "0", "5"],
    correct: 2,
    explanation:
      "log₂ 32 = 5 and log₁/₂ 32 = −5, so the sum is 0.",
    explanationZh:
      "log₂ 32 = 5，log₁/₂ 32 = −5，故和为 0。",
    tags: ["logarithms", "change of base"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which statement about y = cos x is correct?",
    stemZh: "关于函数 y = cos x，下列说法正确的是",
    options: [
      "cos(x + π) = cos x",
      "The function is odd",
      "The function is increasing on [0, π]",
      "The function has period 2π",
    ],
    optionsZh: ["cos(x + π) = cos x", "该函数是奇函数", "该函数在 [0, π] 上单调递增", "该函数是以 2π 为周期的函数"],
    correct: 3,
    explanation:
      "cos(x + π) = −cos x, cosine is even, and it decreases on [0, π]. Its period is 2π, so D is correct.",
    explanationZh:
      "cos(x + π) = −cos x，余弦是偶函数，且在 [0, π] 上递减。其周期为 2π，故 D 正确。",
    tags: ["trigonometry", "properties"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which statement about the parabola y² = 4x is correct?",
    stemZh: "关于抛物线 y² = 4x，下列说法正确的是",
    options: [
      "It passes through (−4, 4)",
      "Its axis of symmetry is x = 0",
      "Its foci are (±1, 0)",
      "Its focus is (1, 0)",
    ],
    optionsZh: [
      "它经过点 (−4, 4)",
      "它的对称轴为 x = 0",
      "它的焦点为 (±1, 0)",
      "它的焦点为 (1, 0)",
    ],
    correct: 3,
    explanation:
      "For y² = 4x, p = 1 and the focus is (1, 0). The axis is y = 0, and (−4, 4) does not satisfy the equation.",
    explanationZh:
      "由 y² = 4x 得 p = 1，焦点为 (1, 0)。对称轴为 y = 0，点 (−4, 4) 不满足方程。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which line is perpendicular to l: x + y + 3 = 0?",
    stemZh: "下列直线和直线 l：x + y + 3 = 0 垂直的是",
    options: ["y = −2x + 1", "y = x + 2", "y = 1 − x", "y = 2x + 2"],
    optionsZh: ["y = −2x + 1", "y = x + 2", "y = 1 − x", "y = 2x + 2"],
    correct: 1,
    explanation:
      "l has slope −1, so a perpendicular line has slope 1. Only y = x + 2 has slope 1.",
    explanationZh:
      "l 的斜率为 −1，故垂线斜率为 1。只有 y = x + 2 的斜率为 1。",
    tags: ["analytic geometry", "lines", "perpendicular"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If cos α = −1/2 and α ∈ (π/2, π), then sin α =",
    stemZh: "已知 cos α = −1/2，α ∈ (π/2, π)，则 sin α =",
    options: ["−√3/2", "√3/2", "1/2", "−1/2"],
    optionsZh: ["−√3/2", "√3/2", "1/2", "−1/2"],
    correct: 1,
    explanation:
      "In the second quadrant sine is positive: sin α = √(1 − 1/4) = √3/2.",
    explanationZh:
      "第二象限正弦为正：sin α = √(1 − 1/4) = √3/2。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given sin(π/4) = √2/2 and sin(π/6) = 1/2, then cos(π/12) =",
    stemZh: "已知 sin(π/4) = √2/2，sin(π/6) = 1/2，则 cos(π/12) =",
    options: ["√6/4", "(√6 + √2)/4", "(√6 − √2)/2", "(1 + √3)/4"],
    optionsZh: ["√6/4", "(√6 + √2)/4", "(√6 − √2)/2", "(1 + √3)/4"],
    correct: 1,
    explanation:
      "cos(π/12) = cos(π/4 − π/6) = cos(π/4)cos(π/6) + sin(π/4)sin(π/6) = (√6 + √2)/4.",
    explanationZh:
      "cos(π/12) = cos(π/4 − π/6) = cos(π/4)cos(π/6) + sin(π/4)sin(π/6) = (√6 + √2)/4。",
    tags: ["trigonometry", "angle difference"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "Which function is identical to y = |x|?",
    stemZh: "下列函数和 y = |x| 相同的是",
    options: ["y = ∛(x³)", "y = (√x)²", "y = x", "y = √(x²)"],
    optionsZh: ["y = ∛(x³)", "y = (√x)²", "y = x", "y = √(x²)"],
    correct: 3,
    explanation:
      "√(x²) = |x| for every real x. ∛(x³) = x, (√x)² = x only for x ≥ 0, and y = x differs from |x| for negative x.",
    explanationZh:
      "对任意实数 x，√(x²) = |x|。∛(x³) = x；(√x)² 仅在 x ≥ 0 时等于 x；y = x 在 x < 0 时与 |x| 不同。",
    tags: ["functions", "domain", "identity"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If α is acute and cos α = 1/2, then sin(α/2) =",
    stemZh: "若 α 为锐角，且 cos α = 1/2，则 sin(α/2) =",
    options: ["±√3/2", "±1/2", "√3/2", "1/2"],
    optionsZh: ["±√3/2", "±1/2", "√3/2", "1/2"],
    correct: 3,
    explanation:
      "cos α = 1/2 with α acute gives α = 60°, so sin(α/2) = sin 30° = 1/2.",
    explanationZh:
      "α 为锐角且 cos α = 1/2，故 α = 60°，sin(α/2) = sin 30° = 1/2。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which trigonometric formula is incorrect?",
    stemZh: "关于三角函数公式，下列式子错误的是",
    options: [
      "cos(2π − α) = cos α",
      "tan(π + α) = −tan α",
      "sin(π − α) = sin α",
      "sin(π/2 − α) = cos α",
    ],
    optionsZh: [
      "cos(2π − α) = cos α",
      "tan(π + α) = −tan α",
      "sin(π − α) = sin α",
      "sin(π/2 − α) = cos α",
    ],
    correct: 1,
    explanation:
      "Tangent has period π, so tan(π + α) = tan α, not −tan α. The other three formulas are correct.",
    explanationZh:
      "正切函数的周期为 π，故 tan(π + α) = tan α，而不是 −tan α。其余三式均正确。",
    tags: ["trigonometry", "reduction formulas"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The directrix of y² = −x is",
    stemZh: "抛物线 y² = −x 的准线方程为",
    options: ["x = 1/2", "x = −1/2", "x = 1/4", "x = −1/4"],
    optionsZh: ["x = 1/2", "x = −1/2", "x = 1/4", "x = −1/4"],
    correct: 2,
    explanation:
      "Write y² = −4px, so 4p = 1 and p = 1/4. The parabola opens left and its directrix is x = p = 1/4.",
    explanationZh:
      "写成 y² = −4px，得 4p = 1，p = 1/4。抛物线开口向左，准线为 x = p = 1/4。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If (cos α − sin α)/(cos α + sin α) = 1/3, then tan α =",
    stemZh: "已知 (cos α − sin α)/(cos α + sin α) = 1/3，则 tan α =",
    options: ["1/2", "1/4", "2/3", "1/3"],
    optionsZh: ["1/2", "1/4", "2/3", "1/3"],
    correct: 0,
    explanation:
      "Divide numerator and denominator by cos α: (1 − tan α)/(1 + tan α) = 1/3. Cross-multiplying gives 3 − 3tan α = 1 + tan α, so tan α = 1/2.",
    explanationZh:
      "分子分母同除以 cos α，得 (1 − tan α)/(1 + tan α) = 1/3。交叉相乘得 3 − 3tan α = 1 + tan α，故 tan α = 1/2。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "A sequence satisfies a₁ = 1 and aₙ = 1/(1 + 1/aₙ₋₁) for n ≥ 2. Then a₁₀₀ =",
    stemZh: "数列 {aₙ} 满足 a₁ = 1，aₙ = 1/(1 + 1/aₙ₋₁)（n ≥ 2），则 a₁₀₀ =",
    options: ["50", "1/100", "1", "100"],
    optionsZh: ["50", "1/100", "1", "100"],
    correct: 1,
    explanation:
      "Simplify: aₙ = aₙ₋₁/(aₙ₋₁ + 1). With a₁ = 1 this gives a₂ = 1/2, a₃ = 1/3, and in general aₙ = 1/n. Hence a₁₀₀ = 1/100.",
    explanationZh:
      "化简得 aₙ = aₙ₋₁/(aₙ₋₁ + 1)。由 a₁ = 1 得 a₂ = 1/2，a₃ = 1/3，一般地 aₙ = 1/n，故 a₁₀₀ = 1/100。",
    tags: ["sequences", "recurrence"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which statement about y = logₐ x is correct?",
    stemZh: "关于对数函数 y = logₐ x，下面说法正确的是",
    options: [
      "The domain is (−∞, +∞)",
      "When a > 1, it is decreasing on its domain",
      "When a > 1, logₐ x > 1 for every x > 0",
      "When 0 < a < 1, it is decreasing on its domain",
    ],
    optionsZh: [
      "定义域为 (−∞, +∞)",
      "当 a > 1 时，在定义域上单调递减",
      "当 a > 1 时，对任意 x > 0 都有 logₐ x > 1",
      "当 0 < a < 1 时，在定义域上单调递减",
    ],
    correct: 3,
    explanation:
      "The domain is (0, +∞). For a > 1 the function is increasing, and logₐ 1 = 0, so C is false. For 0 < a < 1 it is decreasing, so D is correct.",
    explanationZh:
      "定义域为 (0, +∞)。a > 1 时函数递增，且 logₐ 1 = 0，故 C 错。0 < a < 1 时函数递减，故 D 正确。",
    tags: ["logarithms", "monotonicity"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Which statement about the ellipse x²/4 + y²/20 = 1 is correct?",
    stemZh: "关于椭圆 x²/4 + y²/20 = 1，下面说法正确的是",
    options: [
      "The foci are (0, ±4)",
      "The foci are (±4, 0)",
      "The vertices are (±4, 0) and (0, ±20)",
      "The major and minor axes have lengths 20 and 4",
    ],
    optionsZh: [
      "两个焦点为 (0, ±4)",
      "两个焦点为 (±4, 0)",
      "顶点为 (±4, 0) 和 (0, ±20)",
      "长轴和短轴的长度分别为 20 和 4",
    ],
    correct: 0,
    explanation:
      "Here a² = 20 > b² = 4, so the major axis is vertical. c² = 20 − 4 = 16, c = 4, and the foci are (0, ±4).",
    explanationZh:
      "a² = 20 > b² = 4，故长轴在 y 轴上。c² = 20 − 4 = 16，c = 4，焦点为 (0, ±4)。",
    tags: ["analytic geometry", "ellipse"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Line l is perpendicular to l₁: x + 2y + 4 = 0 and passes through the intersection of l₂: x + y + 1 = 0 and l₃: 2x + y − 1 = 0. The equation of l is",
    stemZh: "直线 l 垂直于 l₁：x + 2y + 4 = 0，且经过 l₂：x + y + 1 = 0 与 l₃：2x + y − 1 = 0 的交点，则 l 的方程是",
    options: ["x + 2y − 3 = 0", "2x + y − 5 = 0", "2x − y − 7 = 0", "x − 2y − 1 = 0"],
    optionsZh: ["x + 2y − 3 = 0", "2x + y − 5 = 0", "2x − y − 7 = 0", "x − 2y − 1 = 0"],
    correct: 2,
    explanation:
      "l₁ has slope −1/2, so l has slope 2. Solving l₂ and l₃ gives x = 2, y = −3. The line through (2, −3) with slope 2 is 2x − y − 7 = 0.",
    explanationZh:
      "l₁ 的斜率为 −1/2，故 l 的斜率为 2。联立 l₂、l₃ 得交点 (2, −3)。由点斜式得 2x − y − 7 = 0。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.2",
    difficulty: "EASY",
    stem: "O is the origin, A and B are points in the plane, and P is the midpoint of AB. Then $\\overrightarrow{OP} =$",
    stemZh: "已知 O 为原点，A、B 是平面上的两点，P 为 AB 的中点，则 $\\overrightarrow{OP} =$",
    options: [
      "$(1/2)(\\overrightarrow{OA} + \\overrightarrow{OB})$",
      "$\\overrightarrow{OA} + \\overrightarrow{OB}$",
      "$\\overrightarrow{OB} - \\overrightarrow{OA}$",
      "$(1/2)(\\overrightarrow{OA} - \\overrightarrow{OB})$",
    ],
    optionsZh: [
      "$(1/2)(\\overrightarrow{OA} + \\overrightarrow{OB})$",
      "$\\overrightarrow{OA} + \\overrightarrow{OB}$",
      "$\\overrightarrow{OB} - \\overrightarrow{OA}$",
      "$(1/2)(\\overrightarrow{OA} - \\overrightarrow{OB})$",
    ],
    correct: 0,
    explanation:
      "The position vector of the midpoint is the average of the position vectors of the endpoints: $\\overrightarrow{OP} = (\\overrightarrow{OA} + \\overrightarrow{OB})/2$.",
    explanationZh:
      "中点 P 的位置向量等于两端点位置向量的平均：$\\overrightarrow{OP} = (\\overrightarrow{OA} + \\overrightarrow{OB})/2$。",
    tags: ["vectors", "midpoint"],
  },
  {
    topic: "M3.3",
    difficulty: "HARD",
    stem: "If z³ = 1 and z ≠ 1, then 1 + z + z² + … + z⁹⁹⁹ =",
    stemZh: "若复数 z 满足 z³ = 1 且 z ≠ 1，则 1 + z + z² + … + z⁹⁹⁹ =",
    options: ["(1 ± √3i)/2", "(−1 ± √3i)/2", "1", "i"],
    optionsZh: ["(1 ± √3i)/2", "(−1 ± √3i)/2", "1", "i"],
    correct: 2,
    explanation:
      "Since z³ = 1 and z ≠ 1, z² + z + 1 = 0. Group the 1000 terms in triples: each triple sums to 0, leaving z⁹⁹⁹ = (z³)³³³ = 1.",
    explanationZh:
      "由 z³ = 1 且 z ≠ 1，得 z² + z + 1 = 0。把 1000 项每三项分组，每组和为 0，最后剩下 z⁹⁹⁹ = (z³)³³³ = 1。",
    tags: ["complex numbers", "roots of unity"],
  },
  {
    topic: "M2.3",
    difficulty: "HARD",
    stem: "An arithmetic sequence satisfies 3(a₂ + a₆) + 2(a₆ + a₁₀ + a₁₄) = 24. Then S₁₃ =",
    stemZh: "等差数列 {aₙ} 满足 3(a₂ + a₆) + 2(a₆ + a₁₀ + a₁₄) = 24，则 S₁₃ =",
    options: ["104", "52", "39", "26"],
    optionsZh: ["104", "52", "39", "26"],
    correct: 3,
    explanation:
      "a₂ + a₆ = 2a₄ and a₆ + a₁₀ + a₁₄ = 3a₁₀, so 6a₄ + 6a₁₀ = 24, giving a₄ + a₁₀ = 4. Hence 2a₇ = 4 and a₇ = 2. Then S₁₃ = 13a₇ = 26.",
    explanationZh:
      "a₂ + a₆ = 2a₄，a₆ + a₁₀ + a₁₄ = 3a₁₀，故 6a₄ + 6a₁₀ = 24，a₄ + a₁₀ = 4，即 2a₇ = 4，a₇ = 2。于是 S₁₃ = 13a₇ = 26。",
    tags: ["sequences", "arithmetic", "sum"],
  },
  {
    topic: "M4.1",
    difficulty: "HARD",
    stem: "The twelve Chinese zodiac signs are equally likely. The probability that at least two of three randomly selected people share the same zodiac sign is",
    stemZh: "十二生肖等可能出现。随机选取三人，至少有两人属相相同的概率是",
    options: ["17/72", "1/12", "55/72", "143/144"],
    optionsZh: ["17/72", "1/12", "55/72", "143/144"],
    correct: 0,
    explanation:
      "The complement is all three signs different: P = (12 × 11 × 10)/12³ = 55/72. Thus the required probability is 1 − 55/72 = 17/72.",
    explanationZh:
      "对立事件是三人属相全不同：P = (12×11×10)/12³ = 55/72。故所求概率为 1 − 55/72 = 17/72。",
    tags: ["probability", "complement"],
  },
];
