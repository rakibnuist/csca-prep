import type { SeedQuestion } from "../types";

/**
 * Official CSCA Mathematics — October 2025 sitting, Part 2 (Q21–47).
 *
 * The scanned paper has no published key; answers are reconstructed. Two
 * faulty items (Q37 has no false statement; Q43's printed options do not match
 * the printed expression) are omitted. Combined with Part 1 this gives 45 of 47.
 */
export const officialMathOct2025Part2Questions: SeedQuestion[] = [
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "If a, b, c are rational and a > b > c, which expression is correct?",
    options: ["a/c < b/c", "a + b > b + c", "a − b > b − c", "ab > bc"],
    correct: 1,
    explanation:
      "Since a > c, adding b to both sides gives a + b > b + c. The other inequalities depend on signs or on the gaps.",
    explanationZh:
      "因为 a > c，两边同时加 b 得 a + b > b + c。其余不等式取决于符号或差值。",
    tags: ["inequalities"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The graphs of the power functions y = x³ and y = x^(1/3) are symmetric about",
    options: ["the x-axis", "the line y = x", "the y-axis", "the origin"],
    correct: 1,
    explanation:
      "The two functions are inverse to each other, so their graphs are reflections in the line y = x.",
    explanationZh: "这两个函数互为反函数，因此它们的图像关于直线 y = x 对称。",
    tags: ["functions", "inverse"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If cos α = 1/3, then cos 2α =",
    options: ["4√2/9", "−7/9", "−4√2/9", "7/9"],
    correct: 1,
    explanation:
      "cos 2α = 2cos²α − 1 = 2(1/9) − 1 = −7/9.",
    explanationZh: "cos 2α = 2cos²α − 1 = 2(1/9) − 1 = −7/9。",
    tags: ["trigonometry", "double angle"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The intersection of 3x + 2y + 4 = 0 and x − y + 3 = 0 is",
    options: ["(1, −2)", "(2, 5)", "(−2, 1)", "(5, 2)"],
    correct: 2,
    explanation:
      "From x − y + 3 = 0, y = x + 3. Substituting: 3x + 2(x + 3) + 4 = 0 ⇒ 5x = −10 ⇒ x = −2, y = 1.",
    explanationZh:
      "由 x − y + 3 = 0 得 y = x + 3。代入得 3x + 2(x + 3) + 4 = 0 ⇒ 5x = −10 ⇒ x = −2，y = 1。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The foci of the hyperbola x²/7 − y²/9 = 1 are",
    options: ["(0, 4)", "(4, 0)", "(0, ±4)", "(±4, 0)"],
    correct: 3,
    explanation:
      "Here a² = 7, b² = 9, so c² = a² + b² = 16 and c = 4. The transverse axis is horizontal, so the foci are (±4, 0).",
    explanationZh:
      "此处 a² = 7，b² = 9，故 c² = a² + b² = 16，c = 4。实轴为水平方向，因此焦点为 (±4, 0)。",
    tags: ["analytic geometry", "hyperbola"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "Which inequality is correct?",
    options: [
      "2.1^(2/3) > 1.2^(2/3)",
      "2.1^(−2) > 1.2^(−2)",
      "0.75^(−0.2) > 0.75^(−0.4)",
      "3^2.25 > 3^3",
    ],
    correct: 0,
    explanation:
      "The function x^(2/3) is increasing for x > 0, so 2.1^(2/3) > 1.2^(2/3). Negative exponents reverse the first comparison; for base 0.75 < 1 the larger exponent gives the smaller value; and 3^2.25 < 3^3.",
    explanationZh:
      "函数 x^(2/3) 在 x > 0 时递增，故 2.1^(2/3) > 1.2^(2/3)。负指数会使第一个比较反向；底数 0.75 < 1 时指数越大值越小；且 3^2.25 < 3^3。",
    tags: ["exponents", "inequalities"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "log₄27 / log₂3 =",
    options: ["3/2", "−3/2", "2/3", "−2/3"],
    correct: 0,
    explanation:
      "log₄27 = log₂27 / log₂4 = 3log₂3 / 2. Dividing by log₂3 gives 3/2.",
    explanationZh: "log₄27 = log₂27 / log₂4 = 3log₂3 / 2。除以 log₂3 得 3/2。",
    tags: ["logarithms"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Regarding y = cos x, which statement is correct?",
    options: ["It is periodic", "It is decreasing", "It is increasing", "It is odd"],
    correct: 0,
    explanation:
      "cos x is periodic with period 2π. It is neither increasing nor decreasing on its whole domain, and it is even, not odd.",
    explanationZh:
      "cos x 是周期为 2π 的周期函数。它在整个定义域上既不递增也不递减，且为偶函数而非奇函数。",
    tags: ["trigonometry", "cosine"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The standard equation of the parabola with vertex at the origin and focus F(3/2, 0) is",
    options: ["y² = (3/2)x", "y² = 3x", "y² = 6x", "y² = −6x"],
    correct: 2,
    explanation:
      "For y² = 4px the focus is (p, 0). Here p = 3/2, so 4p = 6 and y² = 6x.",
    explanationZh: "对 y² = 4px，焦点为 (p, 0)。此处 p = 3/2，故 4p = 6，y² = 6x。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The distance from P(−1, 2) to Q(3, 1) is",
    options: ["√5", "√13", "√17", "5"],
    correct: 2,
    explanation:
      "|PQ| = √((3 + 1)² + (1 − 2)²) = √(16 + 1) = √17.",
    explanationZh: "|PQ| = √((3 + 1)² + (1 − 2)²) = √(16 + 1) = √17。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "If l₁: ax + 2y − 1 = 0 and l₂: x + (a + 1)y + 4 = 0 are parallel, then a =",
    options: ["1", "−2 or 1", "−2", "2 or −1"],
    correct: 1,
    explanation:
      "Parallel lines satisfy a(a + 1) = 2, so a² + a − 2 = 0 and a = 1 or a = −2. Both give distinct parallel lines.",
    explanationZh:
      "平行直线满足 a(a + 1) = 2，故 a² + a − 2 = 0，得 a = 1 或 a = −2。两者都给出不同的平行直线。",
    tags: ["analytic geometry", "parallel lines"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "A circle has centre (−3, 2) and radius 4. Its equation is",
    options: [
      "(x − 3)² + (y + 2)² = 4",
      "(x − 3)² + (y + 2)² = 16",
      "(x + 3)² + (y − 2)² = 4",
      "(x + 3)² + (y − 2)² = 16",
    ],
    correct: 3,
    explanation:
      "With centre (h, k) = (−3, 2) and r = 4, the equation is (x + 3)² + (y − 2)² = 16.",
    explanationZh: "圆心 (h, k) = (−3, 2)，半径 r = 4，方程为 (x + 3)² + (y − 2)² = 16。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given cos α = −4/5 and α ∈ (π/2, π), sin(α + π/4) =",
    options: ["7√2/10", "−√2/10", "√2/10", "−7√2/10"],
    correct: 1,
    explanation:
      "In the second quadrant sin α = 3/5. Then sin(α + π/4) = (3/5)(√2/2) + (−4/5)(√2/2) = −√2/10.",
    explanationZh:
      "在第二象限 sin α = 3/5。于是 sin(α + π/4) = (3/5)(√2/2) + (−4/5)(√2/2) = −√2/10。",
    tags: ["trigonometry", "addition formula"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "Which pair are the same function?",
    options: [
      "y = ln x² and y = 2 ln x",
      "y = |x − 1| and y = √((x − 1)²)",
      "y = (x⁴ − 1)/(x² − 1) and y = x + 1",
      "y = ln[x(x − 1)] and y = ln x + ln(x − 1)",
    ],
    correct: 1,
    explanation:
      "√((x − 1)²) = |x − 1| for every real x, so the domains and rules agree. The other pairs have different domains or different values.",
    explanationZh:
      "对任意实数 x，√((x − 1)²) = |x − 1|，因此定义域与对应法则一致。其余各组或定义域不同，或取值不同。",
    tags: ["functions", "domain"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given sin α = 3/5 and α ∈ (0, π/2), 2sin 2α/(1 + cos 2α) − tan α =",
    options: ["3/5", "4/3", "3/4", "4/5"],
    correct: 2,
    explanation:
      "2sin 2α = 4sin α cos α and 1 + cos 2α = 2cos²α, so the fraction is 2tan α. Subtracting tan α leaves tan α = (3/5)/(4/5) = 3/4.",
    explanationZh:
      "2sin 2α = 4sin α cos α，1 + cos 2α = 2cos²α，故该分式为 2tan α。减去 tan α 后得 tan α = (3/5)/(4/5) = 3/4。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which expression is correct?",
    options: [
      "sin(α + 4π) = cos α",
      "sin(α + 3π) = sin α",
      "cos(α + 3π/2) = sin α",
      "cos(α + π/2) = sin α",
    ],
    correct: 2,
    explanation:
      "cos(α + 3π/2) = cos α cos(3π/2) − sin α sin(3π/2) = 0 + sin α = sin α. The others have the wrong sign or function.",
    explanationZh:
      "cos(α + 3π/2) = cos α cos(3π/2) − sin α sin(3π/2) = 0 + sin α = sin α。其余项的符号或函数有误。",
    tags: ["trigonometry", "reduction"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given cos α = −1/2 and α ∈ (π/2, π), sin(α/2) =",
    options: ["−1/2", "−√3/2", "1/2", "√3/2"],
    correct: 3,
    explanation:
      "α = 2π/3, so α/2 = π/3 and sin(π/3) = √3/2.",
    explanationZh: "α = 2π/3，故 α/2 = π/3，sin(π/3) = √3/2。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "For a sequence with a₁ = 1, a₂ = 3 and aₙ₊₂ = aₙ₊₁ + aₙ, a₅ =",
    options: ["7", "−7", "11", "−11"],
    correct: 2,
    explanation:
      "a₃ = 3 + 1 = 4, a₄ = 4 + 3 = 7, a₅ = 7 + 4 = 11.",
    explanationZh: "a₃ = 3 + 1 = 4，a₄ = 4 + 3 = 7，a₅ = 7 + 4 = 11。",
    tags: ["sequences", "recurrence"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The directrix of the parabola y = −x² is",
    options: ["y = 1/4", "y = −1/2", "y = −1/4", "y = 1/2"],
    correct: 0,
    explanation:
      "Write x² = −y, so 4p = −1 and p = −1/4. The directrix is y = −p = 1/4.",
    explanationZh: "写成 x² = −y，故 4p = −1，p = −1/4。准线为 y = −p = 1/4。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "Given a = ln 3, b = log₀.₃ 2 and c = log₃ 2, the order is",
    options: ["a < c < b", "c < a < b", "a < b < c", "b < c < a"],
    correct: 3,
    explanation:
      "a = ln 3 > 1; c = log₃2 lies between 0 and 1; b = log₀.₃2 < 0 because the base is below 1. Hence b < c < a.",
    explanationZh:
      "a = ln 3 > 1；c = log₃2 介于 0 与 1 之间；由于底数小于 1，b = log₀.₃2 < 0。因此 b < c < a。",
    tags: ["logarithms", "comparison"],
  },
  {
    topic: "M3.1",
    difficulty: "HARD",
    stem: "An ellipse centred at the origin has a major axis twice its minor axis and passes through P(−2, 0). Its equation is",
    options: [
      "x²/16 + y²/4 = 1 or x²/4 + y² = 1",
      "x² + y²/4 = 1",
      "x²/4 + y²/16 = 1 or x²/4 + y² = 1",
      "x²/16 + y²/4 = 1",
    ],
    correct: 2,
    explanation:
      "If the major axis is along x, a = 2 and b = 1: x²/4 + y² = 1. If it is along y, the point (−2, 0) is a minor-axis endpoint, so b = 2 and a = 4: x²/4 + y²/16 = 1.",
    explanationZh:
      "若长轴沿 x 轴，a = 2，b = 1：x²/4 + y² = 1。若长轴沿 y 轴，则点 (−2, 0) 为短轴端点，故 b = 2，a = 4：x²/4 + y²/16 = 1。",
    tags: ["analytic geometry", "ellipse"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Line l is perpendicular to x + 2y + 4 = 0 and passes through the intersection of x + y + 1 = 0 and 2x + y − 1 = 0. Its equation is",
    options: ["2x − y − 7 = 0", "x + 2y − 3 = 0", "2x + y − 5 = 0", "x − 2y − 6 = 0"],
    correct: 0,
    explanation:
      "The given line has slope −1/2, so l has slope 2. Solving x + y + 1 = 0 and 2x + y − 1 = 0 gives (2, −3). Then y + 3 = 2(x − 2), i.e. 2x − y − 7 = 0.",
    explanationZh:
      "已知直线斜率为 −1/2，故 l 的斜率为 2。联立 x + y + 1 = 0 与 2x + y − 1 = 0 得 (2, −3)。于是 y + 3 = 2(x − 2)，即 2x − y − 7 = 0。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M2.4",
    difficulty: "EASY",
    stem: "If |z| = 1, the maximum value of |2z + 1| is",
    options: ["2", "1", "5/2", "3"],
    correct: 3,
    explanation:
      "By the triangle inequality |2z + 1| ≤ 2|z| + 1 = 3, attained when z = 1.",
    explanationZh: "由三角不等式 |2z + 1| ≤ 2|z| + 1 = 3，当 z = 1 时取等号。",
    tags: ["complex numbers", "modulus"],
  },
  {
    topic: "M2.3",
    difficulty: "HARD",
    stem: "A geometric sequence has S₂ = 4 and S₄ = 20. Then S₈ =",
    options: ["160", "340", "180", "210"],
    correct: 1,
    explanation:
      "S₄ = S₂(1 + r²), so 20 = 4(1 + r²) and r² = 4. Then S₈ = S₄(1 + r⁴) = 20(1 + 16) = 340.",
    explanationZh:
      "S₄ = S₂(1 + r²)，故 20 = 4(1 + r²)，r² = 4。于是 S₈ = S₄(1 + r⁴) = 20(1 + 16) = 340。",
    tags: ["sequences", "geometric series"],
  },
  {
    topic: "M4.3",
    difficulty: "HARD",
    stem: "Six balls are numbered 1–6. Three are drawn without replacement, one at a time. m is the mean of the first two and n the mean of all three. The probability that |m − n| ≤ 1/2 is",
    options: ["13/30", "2/3", "8/15", "7/15"],
    correct: 3,
    explanation:
      "|m − n| = |a + b − 2c|/6, so the condition is |a + b − 2c| ≤ 3. Counting the 120 ordered draws gives 56 favourable outcomes, so the probability is 56/120 = 7/15.",
    explanationZh:
      "|m − n| = |a + b − 2c|/6，故条件为 |a + b − 2c| ≤ 3。在 120 种有序抽取中，有利结果为 56 种，因此概率为 56/120 = 7/15。",
    tags: ["probability", "counting"],
  },
];
