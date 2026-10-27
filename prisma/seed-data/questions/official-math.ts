import type { SeedQuestion } from "../types";

/**
 * Official CSCA Mathematics past paper — March 2026 sitting.
 *
 * Transcribed from the official paper and answer key. Question text is the
 * official content (bilingual CN/EN); kept free and attributed, never behind
 * the paid tier. Mapped to the syllabus topics below.
 *
 * Difficulty is set to match the official paper: a long easy warm-up ramp,
 * rising to medium. There is no calculus or statistics on this sitting.
 */
export const officialMathQuestions: SeedQuestion[] = [
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "Let the set A = {x | −2 < x ≤ 3}. Which of the following statements is correct?",
    stemZh: "设集合 A = {x | −2 < x ≤ 3}，下列哪个说法是正确的？",
    options: ["−3 ∈ A", "3 ∈ A", "−2 ∈ A", "2 ∉ A"],
    optionsZh: ["−3 ∈ A", "3 ∈ A", "−2 ∈ A", "2 ∉ A"],
    correct: 1,
    explanation:
      "A contains real numbers greater than −2 and up to 3. 3 satisfies −2 < 3 ≤ 3, so 3 ∈ A. −3 and −2 are not greater than −2, and 2 does belong to A.",
    explanationZh:
      "A 表示大于 −2 且小于等于 3 的实数。3 满足 −2 < 3 ≤ 3，故 3 ∈ A；−3、−2 不大于 −2，而 2 属于 A。",
    tags: ["sets", "membership"],
  },
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "Let the sets M = {x | −5 < x < 2} and N = {x | −4 ≤ x < 2}. Then M ∩ N =",
    stemZh: "设集合 M = {x | −5 < x < 2}，N = {x | −4 ≤ x < 2}，则 M ∩ N =",
    options: ["[−4, 2)", "(−5, 2)", "[−5, 2]", "(−4, 2)"],
    optionsZh: ["[−4, 2)", "(−5, 2)", "[−5, 2]", "(−4, 2)"],
    correct: 0,
    explanation:
      "The intersection takes the common part of the two sets: M spans −5 < x < 2, N spans −4 ≤ x < 2, so the common part is −4 ≤ x < 2, i.e. [−4, 2).",
    explanationZh:
      "交集取两个集合的公共部分。M 的范围为 −5 < x < 2，N 的范围为 −4 ≤ x < 2，公共部分为 −4 ≤ x < 2，即 [−4, 2)。",
    tags: ["sets", "intersection"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "The solution set of the inequality x² − x − 6 > 0 is",
    stemZh: "不等式 x² − x − 6 > 0 的解集是",
    options: [
      "{x | x < −2 or x > 3}",
      "{x | −2 < x < 3}",
      "{x | x > 3}",
      "{x | x < −2}",
    ],
    optionsZh: ["{x | x < −2 或 x > 3}", "{x | −2 < x < 3}", "{x | x > 3}", "{x | x < −2}"],
    correct: 0,
    explanation:
      "Factorise: (x − 3)(x + 2) > 0. The upward parabola is positive outside its roots, so x < −2 or x > 3.",
    explanationZh:
      "因式分解得 (x − 3)(x + 2) > 0。开口向上的抛物线在两根之外为正，故 x < −2 或 x > 3。",
    tags: ["inequalities", "quadratic"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The domain of the function f(x) = 1/(1 − x) is",
    stemZh: "函数 f(x) = 1/(1 − x) 的定义域是",
    options: ["(−∞, 0) ∪ (0, +∞)", "ℝ", "(−∞, −1) ∪ (−1, +∞)", "(−∞, 1) ∪ (1, +∞)"],
    optionsZh: ["(−∞, 0) ∪ (0, +∞)", "ℝ", "(−∞, −1) ∪ (−1, +∞)", "(−∞, 1) ∪ (1, +∞)"],
    correct: 3,
    explanation:
      "The denominator cannot be 0, so 1 − x ≠ 0, i.e. x ≠ 1. The domain is (−∞, 1) ∪ (1, +∞).",
    explanationZh:
      "分式分母不为 0，即 1 − x ≠ 0，得 x ≠ 1，定义域为 (−∞, 1) ∪ (1, +∞)。",
    tags: ["functions", "domain"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "If a = −2 and ab < 0, then the point (a, b) lies in",
    stemZh: "若 a = −2，ab < 0，则点 (a, b) 位于",
    options: ["the third quadrant", "the fourth quadrant", "the second quadrant", "the first quadrant"],
    optionsZh: ["第三象限", "第四象限", "第二象限", "第一象限"],
    correct: 2,
    explanation:
      "a = −2 < 0 and ab < 0 means b > 0. A negative abscissa and positive ordinate puts the point in the second quadrant.",
    explanationZh:
      "a = −2 < 0，且 ab < 0 意味着 b > 0。横坐标为负、纵坐标为正，点在第二象限。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Let ω = 5π/6. Then cos ω =",
    stemZh: "设 ω = 5π/6，则 cos ω =",
    options: ["−√3/2", "1/2", "−1/2", "√3/2"],
    optionsZh: ["−√3/2", "1/2", "−1/2", "√3/2"],
    correct: 0,
    explanation:
      "cos(5π/6) = cos(π − π/6) = −cos(π/6) = −√3/2.",
    explanationZh:
      "cos(5π/6) = cos(π − π/6) = −cos(π/6) = −√3/2。",
    tags: ["trigonometry", "special angles"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Over its domain, the function f(x) = ln(x²) is",
    stemZh: "在其定义域上，函数 f(x) = ln(x²) 是",
    options: ["uncertain about its parity", "neither odd nor even", "an odd function", "an even function"],
    optionsZh: ["奇偶性不确定", "非奇非偶函数", "奇函数", "偶函数"],
    correct: 3,
    explanation:
      "The domain x ≠ 0 is symmetric about the origin, and f(−x) = ln((−x)²) = ln(x²) = f(x), so it is an even function.",
    explanationZh:
      "定义域 x ≠ 0 关于原点对称，且 f(−x) = ln((−x)²) = ln(x²) = f(x)，故为偶函数。",
    tags: ["functions", "parity", "logarithms"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "The inverse function of y = (3x − 2)/(2x − 1) is",
    stemZh: "函数 y = (3x − 2)/(2x − 1) 的反函数是",
    options: [
      "y = (x − 2)/(2x − 3)",
      "y = (x + 2)/(2x + 3)",
      "y = (2x − 2)/(x − 3)",
      "y = (x + 2)/(x − 2)",
    ],
    optionsZh: [
      "y = (x − 2)/(2x − 3)",
      "y = (x + 2)/(2x + 3)",
      "y = (2x − 2)/(x − 3)",
      "y = (x + 2)/(x − 2)",
    ],
    correct: 0,
    explanation:
      "Solve for x: y(2x − 1) = 3x − 2 → x(2y − 3) = y − 2 → x = (y − 2)/(2y − 3). Swapping x and y gives y = (x − 2)/(2x − 3).",
    explanationZh:
      "反解 x：y(2x − 1) = 3x − 2 → x(2y − 3) = y − 2 → x = (y − 2)/(2y − 3)，互换 x、y 得反函数 y = (x − 2)/(2x − 3)。",
    tags: ["functions", "inverse"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "A monotonic increasing interval of the function f(x) = sin x is",
    stemZh: "函数 f(x) = sin x 单调递增的区间是",
    options: ["[−π/2, π/2]", "[−π, 0]", "[0, π]", "[−π, π]"],
    optionsZh: ["[−π/2, π/2]", "[−π, 0]", "[0, π]", "[−π, π]"],
    correct: 0,
    explanation:
      "sin x increases on [−π/2 + 2kπ, π/2 + 2kπ]; [−π/2, π/2] is one such interval.",
    explanationZh:
      "正弦函数 sin x 的单调递增区间为 [−π/2 + 2kπ, π/2 + 2kπ]，[−π/2, π/2] 是其中一个区间。",
    tags: ["trigonometry", "monotonicity"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "Let aₙ be an arithmetic sequence with first term a₁ = 2 and common difference d = 3. Then a₁₀₀ =",
    stemZh: "设 {aₙ} 是等差数列，首项 a₁ = 2，公差 d = 3，则 a₁₀₀ =",
    options: ["298", "299", "302", "305"],
    optionsZh: ["298", "299", "302", "305"],
    correct: 1,
    explanation:
      "The general term is aₙ = a₁ + (n − 1)d, so a₁₀₀ = 2 + 99 × 3 = 299.",
    explanationZh:
      "等差数列通项 aₙ = a₁ + (n − 1)d，代入得 a₁₀₀ = 2 + 99 × 3 = 299。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M1.2",
    difficulty: "MEDIUM",
    stem: "The solution set of the inequality (2x − 3)/(3x − 4) < 0 is",
    stemZh: "不等式 (2x − 3)/(3x − 4) < 0 的解集是",
    options: ["(4/3, 3/2)", "(3/2, 4/3)", "(−∞, 4/3) ∪ (3/2, +∞)", "[4/3, 3/2]"],
    optionsZh: ["(4/3, 3/2)", "(3/2, 4/3)", "(−∞, 4/3) ∪ (3/2, +∞)", "[4/3, 3/2]"],
    correct: 0,
    explanation:
      "The fraction is negative where numerator and denominator have opposite signs. Critical points x = 3/2 and x = 4/3 give 4/3 < x < 3/2.",
    explanationZh:
      "分式为负时分子与分母异号。临界点为 x = 3/2 与 x = 4/3，解得 4/3 < x < 3/2。",
    tags: ["inequalities", "rational"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "The geometric mean of 3 and 12 is",
    stemZh: "3 和 12 的等比中项是",
    options: ["±10", "±8", "±4", "±6"],
    optionsZh: ["±10", "±8", "±4", "±6"],
    correct: 3,
    explanation:
      "Let the geometric mean be G. Then G² = 3 × 12 = 36, so G = ±6.",
    explanationZh:
      "设等比中项为 G，则 G² = 3 × 12 = 36，故 G = ±6。",
    tags: ["sequences", "geometric"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "The angle of inclination of the line x + √3·y − 2 = 0 is",
    stemZh: "直线 x + √3 y − 2 = 0 的倾斜角是",
    options: ["150°", "60°", "30°", "120°"],
    optionsZh: ["150°", "60°", "30°", "120°"],
    correct: 0,
    explanation:
      "The slope is k = −1/√3. tan θ = −1/√3 with θ in [0°, 180°) gives θ = 150°.",
    explanationZh:
      "直线斜率 k = −1/√3，tan θ = −1/√3，倾斜角 θ = 150°。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If the three sides of triangle ABC are BC = 5, AC = 12 and AB = 13, then sin A equals",
    stemZh: "若三角形 ABC 的三边分别为 BC = 5，AC = 12，AB = 13，则 sin A 等于",
    options: ["5/13", "5/12", "12/13", "12/5"],
    optionsZh: ["5/13", "5/12", "12/13", "12/5"],
    correct: 0,
    explanation:
      "5² + 12² = 13², so ABC is right-angled with ∠C = 90°. Thus sin A = BC/AB = 5/13.",
    explanationZh:
      "5² + 12² = 13²，故 △ABC 为直角三角形，∠C = 90°，sin A = BC/AB = 5/13。",
    tags: ["trigonometry", "right triangle"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "In the geometric sequence {aₙ}, if a₃ = 4 and a₆ = 32, then a₅ =",
    stemZh: "在等比数列 {aₙ} 中，若 a₃ = 4，a₆ = 32，则 a₅ 等于",
    options: ["8", "16", "−8", "−16"],
    optionsZh: ["8", "16", "−8", "−16"],
    correct: 1,
    explanation:
      "a₆ = a₃·q³ → 32 = 4·q³ → q = 2. Then a₅ = a₃·q² = 4 × 4 = 16.",
    explanationZh:
      "a₆ = a₃·q³，32 = 4q³，得 q = 2，故 a₅ = a₃·q² = 4 × 4 = 16。",
    tags: ["sequences", "geometric"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which of the following points lies in the third quadrant?",
    stemZh: "下列哪个点位于第三象限？",
    options: ["(1, 2)", "(1, −2)", "(−1, −2)", "(−1, 2)"],
    optionsZh: ["(1, 2)", "(1, −2)", "(−1, −2)", "(−1, 2)"],
    correct: 2,
    explanation:
      "A point in the third quadrant has both coordinates negative; (−1, −2) satisfies this.",
    explanationZh:
      "第三象限的点横、纵坐标均为负，(−1, −2) 符合条件。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Given points A(−2, −1) and B(a, 3), and |AB| = 5. Then the value of a is",
    stemZh: "已知点 A(−2, −1) 和 B(a, 3)，且 |AB| = 5，则 a 的值为",
    options: ["±5", "±1", "−1 or 5", "1 or −5"],
    optionsZh: ["±5", "±1", "−1 或 5", "1 或 −5"],
    correct: 3,
    explanation:
      "Distance formula: √((a + 2)² + (3 + 1)²) = 5 → (a + 2)² + 16 = 25 → (a + 2)² = 9 → a + 2 = ±3, so a = 1 or a = −5.",
    explanationZh:
      "两点间距离公式 √((a + 2)² + (3 + 1)²) = 5，平方得 (a + 2)² = 9，a + 2 = ±3，解得 a = 1 或 a = −5。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "If the line ℓ passes through M(0, −1) and N(−2, 0), then the equation of ℓ is",
    stemZh: "若直线 ℓ 经过两点 M(0, −1) 和 N(−2, 0)，则 ℓ 的方程为",
    options: ["2x + y + 2 = 0", "x + y + 2 = 0", "2x + y + 1 = 0", "x + 2y + 2 = 0"],
    optionsZh: ["2x + y + 2 = 0", "x + y + 2 = 0", "2x + y + 1 = 0", "x + 2y + 2 = 0"],
    correct: 3,
    explanation:
      "In intercept form x/(−2) + y/(−1) = 1, which rearranges to x + 2y + 2 = 0.",
    explanationZh:
      "由截距式 x/(−2) + y/(−1) = 1，整理得 x + 2y + 2 = 0。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Which of the following inequalities is correct?",
    stemZh: "下列哪个不等式是正确的？",
    options: ["2.1⁵ > 1.2⁵", "2.1⁻² > 1.2⁻²", "3.2⁻⁵ > 3.3⁻⁵", "0.75⁻⁰·² > 0.75⁻⁰·⁴"],
    optionsZh: ["2.1⁵ > 1.2⁵", "2.1⁻² > 1.2⁻²", "3.2⁻⁵ > 3.3⁻⁵", "0.75⁻⁰·² > 0.75⁻⁰·⁴"],
    correct: 0,
    explanation:
      "The power function y = x⁵ is increasing on (0, +∞), so 2.1 > 1.2 gives 2.1⁵ > 1.2⁵. The other options violate monotonicity.",
    explanationZh:
      "幂函数 y = x⁵ 在 (0, +∞) 上单调递增，2.1 > 1.2 故 2.1⁵ > 1.2⁵；其余选项不符合函数单调性。",
    tags: ["functions", "power", "monotonicity"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The equation of the circle with centre A(−3, 2) and radius 3 is",
    stemZh: "圆心在 A(−3, 2)、半径为 3 的圆的方程是",
    options: ["(x − 3)² + (y + 2)² = 3", "(x + 3)² + (y − 2)² = 9", "(x − 3)² + (y + 2)² = 9", "(x + 3)² + (y − 2)² = −3"],
    optionsZh: ["(x − 3)² + (y + 2)² = 3", "(x + 3)² + (y − 2)² = 9", "(x − 3)² + (y + 2)² = 9", "(x + 3)² + (y − 2)² = −3"],
    correct: 1,
    explanation:
      "The standard form is (x − x₀)² + (y − y₀)² = r². Substituting the centre and radius gives (x + 3)² + (y − 2)² = 9.",
    explanationZh:
      "圆的标准方程 (x − x₀)² + (y − y₀)² = r²，代入圆心与半径得 (x + 3)² + (y − 2)² = 9。",
    tags: ["analytic geometry", "circles"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which of the following definitions is correct?",
    stemZh: "下列哪个定义是正确的？",
    options: [
      "tan x = cos x / sin x (sin x ≠ 0)",
      "tan x = sin x / cos x (cos x ≠ 0)",
      "tan x = sin x · cos x (sin x ≠ 0)",
      "tan x = 1 / cos x (cos x ≠ 0)",
    ],
    optionsZh: [
      "tan x = cos x / sin x (sin x ≠ 0)",
      "tan x = sin x / cos x (cos x ≠ 0)",
      "tan x = sin x · cos x (sin x ≠ 0)",
      "tan x = 1 / cos x (cos x ≠ 0)",
    ],
    correct: 1,
    explanation:
      "By definition tan x = sin x / cos x, with cos x ≠ 0.",
    explanationZh:
      "正切函数的定义为 tan x = sin x / cos x，且 cos x ≠ 0。",
    tags: ["trigonometry", "definitions"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "In the arithmetic sequence {aₙ}, if a₁ = 1 and the common difference d = 2, then a₁₀ =",
    stemZh: "在等差数列 {aₙ} 中，若 a₁ = 1，公差 d = 2，则 a₁₀ =",
    options: ["19", "17", "15", "21"],
    optionsZh: ["19", "17", "15", "21"],
    correct: 0,
    explanation: "a₁₀ = a₁ + 9d = 1 + 9 × 2 = 19.",
    explanationZh: "a₁₀ = a₁ + 9d = 1 + 9 × 2 = 19。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Let a > b. Which of the following is correct?",
    stemZh: "设 a > b，则下列哪个是正确的？",
    options: ["a³ > b³", "|a| > |b|", "a² > b²", "|a| < |b|"],
    optionsZh: ["a³ > b³", "|a| > |b|", "a² > b²", "|a| < |b|"],
    correct: 0,
    explanation:
      "y = x³ is increasing on ℝ, so a > b gives a³ > b³. The absolute-value and square options can be overturned by counterexamples.",
    explanationZh:
      "函数 y = x³ 在 ℝ 上单调递增，a > b 则 a³ > b³；绝对值与平方的选项可举反例推翻。",
    tags: ["functions", "monotonicity"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The equation of the circle with centre (−3, 2) and radius 2 is",
    stemZh: "圆心为 (−3, 2)、半径为 2 的圆的方程是",
    options: ["(x + 3)² + (y − 2)² = 16", "(x + 3)² + (y − 2)² = 4", "(x − 3)² + (y + 2)² = 4", "(x − 3)² + (y + 2)² = 16"],
    optionsZh: ["(x + 3)² + (y − 2)² = 16", "(x + 3)² + (y − 2)² = 4", "(x − 3)² + (y + 2)² = 4", "(x − 3)² + (y + 2)² = 16"],
    correct: 1,
    explanation:
      "Substituting the centre and radius into the standard form gives (x + 3)² + (y − 2)² = 2² = 4.",
    explanationZh:
      "代入圆心与半径到标准方程，得 (x + 3)² + (y − 2)² = 2² = 4。",
    tags: ["analytic geometry", "circles"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If the exponential function y = aˣ is monotonically increasing on ℝ, then the range of a is",
    stemZh: "若指数函数 y = aˣ 在 ℝ 上单调递增，则 a 的取值范围是",
    options: ["a > 1", "a < 0 or a > 1", "0 < a < 1", "a > 0"],
    optionsZh: ["a > 1", "a < 0 或 a > 1", "0 < a < 1", "a > 0"],
    correct: 0,
    explanation:
      "The exponential function y = aˣ is increasing if and only if a > 1.",
    explanationZh:
      "指数函数 y = aˣ 单调递增的充要条件是 a > 1。",
    tags: ["exponentials", "monotonicity"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If sin a = 1/2, then cos 2a =",
    stemZh: "若 sin a = 1/2，则 cos 2a =",
    options: ["2/3", "1/2", "−1", "0"],
    optionsZh: ["2/3", "1/2", "−1", "0"],
    correct: 1,
    explanation:
      "Double-angle formula: cos 2a = 1 − 2sin²a = 1 − 2 × (1/4) = 1/2.",
    explanationZh:
      "二倍角公式 cos 2a = 1 − 2sin²a = 1 − 2 × (1/4) = 1/2。",
    tags: ["trigonometry", "double angle"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "If the three lines ax + 2y + 8 = 0, 4x + 3y = 10 and 2x − y = 10 meet at one point, then a =",
    stemZh: "若三条直线 ax + 2y + 8 = 0、4x + 3y = 10 和 2x − y = 10 交于一点，则 a =",
    options: ["1", "−1", "3", "−3"],
    optionsZh: ["1", "−1", "3", "−3"],
    correct: 1,
    explanation:
      "Solving 4x + 3y = 10 and 2x − y = 10 gives the intersection (4, −2). Substituting into ax + 2y + 8 = 0: 4a − 4 + 8 = 0 → a = −1.",
    explanationZh:
      "联立 4x + 3y = 10 与 2x − y = 10 得交点 (4, −2)，代入 ax + 2y + 8 = 0 得 4a − 4 + 8 = 0，a = −1。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Let mx² + ny² = 1 represent a hyperbola. Then m and n satisfy",
    stemZh: "设 mx² + ny² = 1 表示双曲线，则 m、n 满足",
    options: ["mn > 1", "mn < 0", "mn < 1", "mn > 0"],
    optionsZh: ["mn > 1", "mn < 0", "mn < 1", "mn > 0"],
    correct: 1,
    explanation:
      "A conic represents a hyperbola when the coefficients of x² and y² have opposite signs, i.e. mn < 0.",
    explanationZh:
      "二元二次方程表示双曲线的条件是 x² 与 y² 的系数异号，即 mn < 0。",
    tags: ["analytic geometry", "hyperbola"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Let a = lg 4, b = lg 5. Then a + 2b =",
    stemZh: "设 a = lg 4，b = lg 5，则 a + 2b =",
    options: ["100", "4", "5", "2"],
    optionsZh: ["100", "4", "5", "2"],
    correct: 3,
    explanation:
      "a + 2b = lg 4 + 2 lg 5 = lg 4 + lg 25 = lg 100 = 2.",
    explanationZh:
      "a + 2b = lg 4 + 2 lg 5 = lg 4 + lg 25 = lg 100 = 2。",
    tags: ["logarithms"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The distance between the points P(−1, 2) and Q(3, 1) is",
    stemZh: "点 P(−1, 2) 和 Q(3, 1) 之间的距离是",
    options: ["√5", "5", "√13", "√17"],
    optionsZh: ["√5", "5", "√13", "√17"],
    correct: 3,
    explanation:
      "Distance = √((3 + 1)² + (1 − 2)²) = √(16 + 1) = √17.",
    explanationZh:
      "距离 = √((3 + 1)² + (1 − 2)²) = √(16 + 1) = √17。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "The minimum positive period of f(x) = 3cos(4x − π) is",
    stemZh: "函数 f(x) = 3cos(4x − π) 的最小正周期是",
    options: ["π", "2π", "π/2", "π/4"],
    optionsZh: ["π", "2π", "π/2", "π/4"],
    correct: 2,
    explanation:
      "The period of cos(ωx) is 2π/ω. Here ω = 4, so T = 2π/4 = π/2.",
    explanationZh:
      "余弦函数周期 T = 2π/ω，此处 ω = 4，故 T = 2π/4 = π/2。",
    tags: ["trigonometry", "period"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "The directrix equation of the parabola y = −x²/4 is",
    stemZh: "抛物线 y = −x²/4 的准线方程是",
    options: ["y = 1", "x = −1", "y = −1", "x = 1"],
    optionsZh: ["y = 1", "x = −1", "y = −1", "x = 1"],
    correct: 0,
    explanation:
      "Rewrite as x² = −4y, so 2p = 4 and p = 2. The directrix is y = p/2 = 1.",
    explanationZh:
      "化为标准式 x² = −4y，2p = 4，p = 2，准线为 y = p/2 = 1。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The line parallel to 4x − 2y − 1 = 0 is",
    stemZh: "与直线 4x − 2y − 1 = 0 平行的直线是",
    options: ["x + 2y − 1 = 0", "2x − y − 1 = 0", "2x + y − 1 = 0", "x − 2y − 1 = 0"],
    optionsZh: ["x + 2y − 1 = 0", "2x − y − 1 = 0", "2x + y − 1 = 0", "x − 2y − 1 = 0"],
    correct: 1,
    explanation:
      "Parallel lines have equal slopes. 4x − 2y − 1 = 0 has slope 2, and 2x − y − 1 = 0 also has slope 2.",
    explanationZh:
      "两直线平行则斜率相等。4x − 2y − 1 = 0 的斜率为 2，2x − y − 1 = 0 的斜率也为 2。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given cos a = −1/2 and a ∈ (π/2, π), the value of sin(a/2) is",
    stemZh: "已知 cos a = −1/2，a ∈ (π/2, π)，则 sin(a/2) 的值为",
    options: ["√3/2", "−√3/2", "1/2", "−1/2"],
    optionsZh: ["√3/2", "−√3/2", "1/2", "−1/2"],
    correct: 0,
    explanation:
      "Since a ∈ (π/2, π), a/2 ∈ (π/4, π/2), so sin(a/2) > 0. sin(a/2) = √((1 − cos a)/2) = √((1 + 1/2)/2) = √3/2.",
    explanationZh:
      "a ∈ (π/2, π)，故 a/2 ∈ (π/4, π/2)，sin(a/2) > 0。sin(a/2) = √((1 − cos a)/2) = √(3/4) = √3/2。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Let a, β be acute angles. Which of the following is correct?",
    stemZh: "设 a、β 为锐角，则下列哪个是正确的？",
    options: [
      "sin a + sin β < sin(a + β)",
      "cos(a − β) < cos(a + β)",
      "cos a · cos β < cos(a + β)",
      "sin(a − β) < sin(a + β)",
    ],
    optionsZh: [
      "sin a + sin β < sin(a + β)",
      "cos(a − β) < cos(a + β)",
      "cos a · cos β < cos(a + β)",
      "sin(a − β) < sin(a + β)",
    ],
    correct: 3,
    explanation:
      "sin(a + β) − sin(a − β) = 2cos a · sin β > 0, so sin(a − β) < sin(a + β).",
    explanationZh:
      "sin(a + β) − sin(a − β) = 2cos a · sin β > 0，故 sin(a − β) < sin(a + β)。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "The range of the function f(x) = |x|/(1 + |x|) (x ∈ ℝ) is",
    stemZh: "函数 f(x) = |x|/(1 + |x|)（x ∈ ℝ）的值域是",
    options: ["(0, 1]", "[0, 1)", "[0, 1]", "(0, 1)"],
    optionsZh: ["(0, 1]", "[0, 1)", "[0, 1]", "(0, 1)"],
    correct: 0,
    explanation:
      "|x| ≥ 0, so 1 + |x| ≥ 1 and 0 < |x|/(1 + |x|) ≤ 1. The value reaches 1 as |x| → ∞ and approaches 0 at x = 0 but is never 0, so the range is (0, 1].",
    explanationZh:
      "|x| ≥ 0，故 1 + |x| ≥ 1，0 < |x|/(1 + |x|) ≤ 1。当 |x| → ∞ 时趋近 1，x = 0 时取 0 但 0 取不到，值域为 (0, 1]。",
    tags: ["functions", "range"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The directrix equation of the parabola y² = −x is",
    stemZh: "抛物线 y² = −x 的准线方程是",
    options: ["x = 1/4", "x = 1/2", "x = −1/4", "x = −1/2"],
    optionsZh: ["x = 1/4", "x = 1/2", "x = −1/4", "x = −1/2"],
    correct: 0,
    explanation:
      "Standard form y² = −2px gives 2p = 1, p = 1/2. The directrix is x = p/2 = 1/4.",
    explanationZh:
      "化为标准式 y² = −2px，2p = 1，p = 1/2，准线 x = p/2 = 1/4。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If cos a = 1/3 and −π/2 < a < 0, then tan(a/2) =",
    stemZh: "若 cos a = 1/3 且 −π/2 < a < 0，则 tan(a/2) =",
    options: ["−√2", "√2/2", "−√2/2", "√2"],
    optionsZh: ["−√2", "√2/2", "−√2/2", "√2"],
    correct: 2,
    explanation:
      "a ∈ (−π/2, 0), so a/2 ∈ (−π/4, 0) and tan(a/2) < 0. tan(a/2) = √((1 − cos a)/(1 + cos a)) = √((1 − 1/3)/(1 + 1/3)) = √(1/2) = √2/2, so tan(a/2) = −√2/2.",
    explanationZh:
      "a ∈ (−π/2, 0)，故 a/2 ∈ (−π/4, 0)，tan(a/2) < 0。tan(a/2) = √((1 − cos a)/(1 + cos a)) = √(1/2) = √2/2，故 tan(a/2) = −√2/2。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If sin a = 1/3, then cos(π/2 + a) =",
    stemZh: "若 sin a = 1/3，则 cos(π/2 + a) =",
    options: ["−1/3", "−2√2/3", "2√2/3", "1/3"],
    optionsZh: ["−1/3", "−2√2/3", "2√2/3", "1/3"],
    correct: 0,
    explanation:
      "Using the reduction formula, cos(π/2 + a) = −sin a = −1/3.",
    explanationZh:
      "由诱导公式 cos(π/2 + a) = −sin a = −1/3。",
    tags: ["trigonometry", "reduction formulas"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which description of the function f(x) = tan x is incorrect?",
    stemZh: "关于函数 f(x) = tan x 的描述，下列哪个是错误的？",
    options: [
      "On its domain, f(−x) = −f(x)",
      "f(x) is an even function",
      "f(x) is monotonically increasing on (−π/2, π/2)",
      "f(x) has exactly one zero on (−π/2, π/2)",
    ],
    optionsZh: [
      "在其定义域上满足 f(−x) = −f(x)",
      "f(x) 是偶函数",
      "f(x) 在区间 (−π/2, π/2) 上单调递增",
      "f(x) 在区间 (−π/2, π/2) 上恰有一个零点",
    ],
    correct: 1,
    explanation:
      "tan x is an odd function, not an even function, so B is wrong; A, C and D are correct.",
    explanationZh:
      "tan x 是奇函数而非偶函数，B 错误；A、C、D 均正确。",
    tags: ["trigonometry", "parity"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "In the sequence {aₙ}, if a₁ = 1/2 and 1/aₙ₊₁ = 1/aₙ + 1 (n ≥ 1), then a₆ =",
    stemZh: "在数列 {aₙ} 中，若 a₁ = 1/2 且 1/aₙ₊₁ = 1/aₙ + 1（n ≥ 1），则 a₆ =",
    options: ["1/7", "1/6", "1/5", "1/8"],
    optionsZh: ["1/7", "1/6", "1/5", "1/8"],
    correct: 0,
    explanation:
      "{1/aₙ} is an arithmetic sequence with first term 2 and common difference 1, so 1/a₆ = 2 + 5 = 7, hence a₆ = 1/7.",
    explanationZh:
      "{1/aₙ} 是首项为 2、公差为 1 的等差数列，故 1/a₆ = 2 + 5 = 7，a₆ = 1/7。",
    tags: ["sequences", "recurrence"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Let f(x) = log₅(2x + 1). The solution set of f(x) ≥ 0 is",
    stemZh: "设 f(x) = log₅(2x + 1)，则 f(x) ≥ 0 的解集是",
    options: ["{x | x ≥ 1}", "{x | x > 0}", "{x | x ≥ 0}", "{x | x > 1}"],
    optionsZh: ["{x | x ≥ 1}", "{x | x > 0}", "{x | x ≥ 0}", "{x | x > 1}"],
    correct: 2,
    explanation:
      "log₅(2x + 1) ≥ 0 = log₅1, so 2x + 1 ≥ 1 and 2x + 1 > 0, giving x ≥ 0.",
    explanationZh:
      "log₅(2x + 1) ≥ 0 = log₅1，得 2x + 1 ≥ 1 且 2x + 1 > 0，解得 x ≥ 0。",
    tags: ["logarithms", "inequalities"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "The major axis of an ellipse has length 10, and its two foci are at (3, 0) and (−3, 0). The equation of the ellipse is",
    stemZh: "已知椭圆的长轴长为 10，两焦点分别在 (3, 0) 和 (−3, 0)，则该椭圆的方程为",
    options: [
      "x²/25 + y²/16 = 1",
      "x²/16 + y²/25 = 1",
      "x²/25 + y²/9 = 1",
      "x²/9 + y²/25 = 1",
    ],
    optionsZh: [
      "x²/25 + y²/16 = 1",
      "x²/16 + y²/25 = 1",
      "x²/25 + y²/9 = 1",
      "x²/9 + y²/25 = 1",
    ],
    correct: 0,
    explanation:
      "2a = 10 gives a = 5; c = 3, so b² = a² − c² = 16. The ellipse equation is x²/25 + y²/16 = 1.",
    explanationZh:
      "2a = 10 得 a = 5；c = 3，b² = a² − c² = 16，椭圆方程为 x²/25 + y²/16 = 1。",
    tags: ["analytic geometry", "ellipse"],
  },
  {
    topic: "M3.2",
    difficulty: "EASY",
    stem: "Let a = (−2, 3) and b = (2, 1). Then a − 2b =",
    stemZh: "设 a = (−2, 3)，b = (2, 1)，则 a − 2b =",
    options: ["(−6, 1)", "(−6, −1)", "(6, −1)", "(6, 1)"],
    optionsZh: ["(−6, 1)", "(−6, −1)", "(6, −1)", "(6, 1)"],
    correct: 0,
    explanation: "2b = (4, 2), so a − 2b = (−2 − 4, 3 − 2) = (−6, 1).",
    explanationZh: "2b = (4, 2)，a − 2b = (−2 − 4, 3 − 2) = (−6, 1)。",
    tags: ["vectors"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Line ℓ is perpendicular to x + 2y + 4 = 0 and passes through the intersection of x + y + 1 = 0 and 2x + y − 1 = 0. The equation of ℓ is",
    stemZh: "直线 ℓ 垂直于直线 x + 2y + 4 = 0，且经过直线 x + y + 1 = 0 和 2x + y − 1 = 0 的交点，则 ℓ 的方程为",
    options: ["2x − y − 7 = 0", "x − 2y − 1 = 0", "2x + y − 5 = 0", "x + 2y − 3 = 0"],
    optionsZh: ["2x − y − 7 = 0", "x − 2y − 1 = 0", "2x + y − 5 = 0", "x + 2y − 3 = 0"],
    correct: 0,
    explanation:
      "The given line has slope −1/2, so ℓ has slope 2. The two lines intersect at (2, −3). Point-slope form gives y + 3 = 2(x − 2) → 2x − y − 7 = 0.",
    explanationZh:
      "已知直线斜率为 −1/2，故 ℓ 的斜率为 2。联立两直线得交点 (2, −3)，点斜式得 y + 3 = 2(x − 2)，即 2x − y − 7 = 0。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.3",
    difficulty: "MEDIUM",
    stem: "Let z₁ and z₂ be the roots of z² − 2z + 2 = 0, and let aₙ = (z₁ⁿ − z₂ⁿ)². Then a₄ =",
    stemZh: "设 z₁ 和 z₂ 是方程 z² − 2z + 2 = 0 的两个根，令 aₙ = (z₁ⁿ − z₂ⁿ)²，则 a₄ =",
    options: ["32", "−64", "0", "64"],
    optionsZh: ["32", "−64", "0", "64"],
    correct: 2,
    explanation:
      "The roots are z = 1 ± i. z₁⁴ = (1 + i)⁴ = −4 and z₂⁴ = (1 − i)⁴ = −4, so a₄ = (−4 + 4)² = 0.",
    explanationZh:
      "方程的根为 z = 1 ± i。z₁⁴ = (1 + i)⁴ = −4，z₂⁴ = (1 − i)⁴ = −4，故 a₄ = (−4 + 4)² = 0。",
    tags: ["complex numbers", "powers"],
  },
  {
    topic: "M2.3",
    difficulty: "HARD",
    stem: "Let aₙ = 2ⁿ⁺¹ − 3n (n ≥ 1), and let Sₙ be the sum of the first n terms. Then Sₙ =",
    stemZh: "设 aₙ = 2ⁿ⁺¹ − 3n（n ≥ 1），Sₙ 为数列前 n 项和，则 Sₙ =",
    options: [
      "2ⁿ⁺² − 3n(n+1)/2 − 4",
      "2ⁿ⁺² − 3n − 4",
      "2ⁿ⁺² + 3n(n+1)/2 − 4",
      "2ⁿ⁺² − 3n(n+1)/2 + 4",
    ],
    optionsZh: [
      "2ⁿ⁺² − 3n(n+1)/2 − 4",
      "2ⁿ⁺² − 3n − 4",
      "2ⁿ⁺² + 3n(n+1)/2 − 4",
      "2ⁿ⁺² − 3n(n+1)/2 + 4",
    ],
    correct: 0,
    explanation:
      "Split the sum: Σ2ⁿ⁺¹ is a geometric series summing to 2ⁿ⁺² − 4, and Σ3n = 3n(n+1)/2. Thus Sₙ = 2ⁿ⁺² − 3n(n+1)/2 − 4.",
    explanationZh:
      "分组求和：等比数列部分和为 2ⁿ⁺² − 4，等差数列部分和为 3n(n+1)/2，故 Sₙ = 2ⁿ⁺² − 3n(n+1)/2 − 4。",
    tags: ["sequences", "summation"],
  },
  {
    topic: "M4.1",
    difficulty: "HARD",
    stem:
      "A bag contains five identical balls: two red (labelled 1 and 2), two black (labelled 1 and 2) and one white (labelled 1). Two balls are drawn at random without replacement. The probabilities that the two balls have different colours, and that at least one ball is labelled 1, are respectively",
    stemZh:
      "一个袋子里有五个大小形状完全相同的小球，包括两个红球（分别标号 1 和 2）、两个黑球（分别标号 1 和 2）和一个白球（标号 1）。现从中随机抽取两个球（不放回）。两个球颜色不同的概率，以及至少有一个球标号为 1 的概率，分别为",
    options: ["4/5 and 9/10", "3/5 and 7/10", "3/5 and 9/10", "4/5 and 7/10"],
    optionsZh: ["4/5 和 9/10", "3/5 和 7/10", "3/5 和 9/10", "4/5 和 7/10"],
    correct: 0,
    explanation:
      "Total cases C(5,2) = 10. Different colours: red-black (2×2), red-white (2×1), black-white (2×1) = 8 cases, probability 8/10 = 4/5. At least one labelled 1: total minus the two balls labelled 2, i.e. 10 − C(2,2) = 9, probability 9/10.",
    explanationZh:
      "总情况 C(5,2) = 10。颜色不同：红黑 2×2、红白 2×1、黑白 2×1，共 8 种，概率 8/10 = 4/5。至少一个标号 1：总数减去两个都是标号 2，即 10 − C(2,2) = 9，概率 9/10。",
    tags: ["probability", "counting"],
  },
];
