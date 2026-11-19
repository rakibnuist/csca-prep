import type { SeedQuestion } from "../types";

/**
 * Official CSCA Mathematics past paper — January 2026 sitting.
 *
 * Transcribed from the official paper and answer key (bilingual CN/EN).
 * The published source omits the data table for Q48 (running-app survey), so
 * that item is not included; the remaining 47 questions are complete.
 * Source keys for Q15, Q29, Q30, Q32, Q35 and Q46 were inconsistent and have
 * been corrected against the mathematics.
 */
export const officialMathJan2026Questions: SeedQuestion[] = [
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "Let A = {6, 7, 8, 9, 10} and let ∅ denote the empty set. Which statement is correct?",
    stemZh: "设 A = {6, 7, 8, 9, 10}，∅ 表示空集，则下列哪个说法是正确的？",
    options: ["9 ∈ A", "{6} ∈ A", "6 ⊆ A", "∅ ∈ A"],
    optionsZh: ["9 ∈ A", "{6} ∈ A", "6 ⊆ A", "∅ ∈ A"],
    correct: 0,
    explanation:
      "9 is one of the listed elements, so 9 ∈ A. The set {6} is not an element of A, 6 is an element rather than a set, and ∅ is not one of the listed numbers.",
    explanationZh:
      "9 是集合 A 中列出的元素，故 9 ∈ A。{6} 不是 A 的元素；6 是元素而不是集合；∅ 也不在 A 的元素之列。",
    tags: ["sets", "membership"],
  },
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "Let A = {x | −2 ≤ x ≤ 2} and B = {x | x > 0}. Then A ∪ B =",
    stemZh: "设 A = {x | −2 ≤ x ≤ 2}，B = {x | x > 0}，则 A ∪ B =",
    options: [
      "{x | x ≤ −2}",
      "{x | 0 < x ≤ 2}",
      "{x | x ≥ −2}",
      "{x | −2 ≤ x < 0}",
    ],
    optionsZh: [
      "{x | x ≤ −2}",
      "{x | 0 < x ≤ 2}",
      "{x | x ≥ −2}",
      "{x | −2 ≤ x < 0}",
    ],
    correct: 2,
    explanation:
      "A = [−2, 2] and B = (0, +∞). Their union covers every number from −2 upward, so A ∪ B = {x | x ≥ −2} = [−2, +∞).",
    explanationZh:
      "A = [−2, 2]，B = (0, +∞)。并集覆盖从 −2 开始的所有实数，故 A ∪ B = {x | x ≥ −2} = [−2, +∞)。",
    tags: ["sets", "union"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "The solution set of the inequality x² − x − 2 > 0 is",
    stemZh: "不等式 x² − x − 2 > 0 的解集是",
    options: [
      "{x | x < −1 or x > 2}",
      "{x | −1 < x < 2}",
      "{x | x < −2 or x > −1}",
      "{x | −2 < x ≤ 1}",
    ],
    optionsZh: [
      "{x | x < −1 或 x > 2}",
      "{x | −1 < x < 2}",
      "{x | x < −2 或 x > −1}",
      "{x | −2 < x ≤ 1}",
    ],
    correct: 0,
    explanation:
      "Factorise: (x − 2)(x + 1) > 0. The upward parabola is positive outside its roots, so x < −1 or x > 2.",
    explanationZh:
      "因式分解得 (x − 2)(x + 1) > 0。开口向上的抛物线在两根之外为正，故 x < −1 或 x > 2。",
    tags: ["inequalities", "quadratic"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "In an arithmetic sequence {aₙ}, a₁ = 2 and d = 3. Then a₁₀₀ =",
    stemZh: "等差数列 {aₙ} 中，a₁ = 2，d = 3，则 a₁₀₀ =",
    options: ["299", "302", "305", "298"],
    optionsZh: ["299", "302", "305", "298"],
    correct: 0,
    explanation:
      "a₁₀₀ = a₁ + 99d = 2 + 99 × 3 = 299.",
    explanationZh:
      "a₁₀₀ = a₁ + 99d = 2 + 99×3 = 299。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The domain of f(x) = 1/x + √(1 − x) is",
    stemZh: "函数 f(x) = 1/x + √(1 − x) 的定义域是",
    options: ["(−∞, 1]", "(−∞, 0) ∪ (0, 1)", "(−∞, 0) ∪ (0, 1]", "[1, +∞)"],
    optionsZh: ["(−∞, 1]", "(−∞, 0) ∪ (0, 1)", "(−∞, 0) ∪ (0, 1]", "[1, +∞)"],
    correct: 2,
    explanation:
      "The denominator requires x ≠ 0 and the square root requires 1 − x ≥ 0, i.e. x ≤ 1. Together: (−∞, 0) ∪ (0, 1].",
    explanationZh:
      "分母要求 x ≠ 0，根式要求 1 − x ≥ 0，即 x ≤ 1。两者结合得 (−∞, 0) ∪ (0, 1]。",
    tags: ["functions", "domain"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Point Q is symmetric to P(1, 2) about the x-axis. The coordinates of Q are",
    stemZh: "点 Q 与 P(1, 2) 关于 x 轴对称，则 Q 的坐标是",
    options: ["(2, 1)", "(1, −2)", "(−1, 2)", "(−1, −2)"],
    optionsZh: ["(2, 1)", "(1, −2)", "(−1, 2)", "(−1, −2)"],
    correct: 1,
    explanation:
      "Reflection in the x-axis changes the sign of the y-coordinate only, so Q = (1, −2).",
    explanationZh:
      "关于 x 轴对称只改变纵坐标的符号，故 Q = (1, −2)。",
    tags: ["analytic geometry", "symmetry"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If α = 30°, which statement is correct?",
    stemZh: "若 α = 30°，则下列哪个说法是正确的？",
    options: ["sin α = √2/2", "cos α = √3/2", "cos α = 1/2", "tan α = √3"],
    optionsZh: ["sin α = √2/2", "cos α = √3/2", "cos α = 1/2", "tan α = √3"],
    correct: 1,
    explanation:
      "cos 30° = √3/2. Also sin 30° = 1/2 and tan 30° = √3/3, so the other options are false.",
    explanationZh:
      "cos 30° = √3/2。又 sin 30° = 1/2，tan 30° = √3/3，故其余选项错误。",
    tags: ["trigonometry", "special angles"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "For f(x) = x⁴ + 3, which statement is correct?",
    stemZh: "关于函数 f(x) = x⁴ + 3，下列哪个说法是正确的？",
    options: [
      "The function is odd",
      "None of the above",
      "The function is neither odd nor even",
      "The function is even",
    ],
    optionsZh: ["函数是奇函数", "以上都不是", "函数既不是奇函数也不是偶函数", "函数是偶函数"],
    correct: 3,
    explanation:
      "f(−x) = (−x)⁴ + 3 = x⁴ + 3 = f(x), so f is an even function.",
    explanationZh:
      "f(−x) = (−x)⁴ + 3 = x⁴ + 3 = f(x)，故 f 是偶函数。",
    tags: ["functions", "parity"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "The inverse function of y = x³ + 3, x ∈ ℝ, is",
    stemZh: "函数 y = x³ + 3，x ∈ ℝ 的反函数是",
    options: [
      "y = ∛(x − 3), x ∈ ℝ",
      "y = ∛(x + 3), x ≥ −3",
      "y = ∛(x + 3), x ∈ ℝ",
      "y = ∛(x − 3), x ≥ 3",
    ],
    optionsZh: [
      "y = ∛(x − 3)，x ∈ ℝ",
      "y = ∛(x + 3)，x ≥ −3",
      "y = ∛(x + 3)，x ∈ ℝ",
      "y = ∛(x − 3)，x ≥ 3",
    ],
    correct: 0,
    explanation:
      "From y = x³ + 3, x³ = y − 3, so x = ∛(y − 3). Swapping x and y gives y = ∛(x − 3). The original range is ℝ, so the inverse domain is ℝ.",
    explanationZh:
      "由 y = x³ + 3 得 x³ = y − 3，故 x = ∛(y − 3)。互换 x、y 得 y = ∛(x − 3)。原函数值域为 ℝ，故反函数定义域为 ℝ。",
    tags: ["functions", "inverse"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which of the following points is in the third quadrant?",
    stemZh: "下列哪个点在第三象限？",
    options: ["(−1, 2)", "(−1, −2)", "(1, 2)", "(1, −2)"],
    optionsZh: ["(−1, 2)", "(−1, −2)", "(1, 2)", "(1, −2)"],
    correct: 1,
    explanation:
      "The third quadrant requires x < 0 and y < 0; only (−1, −2) satisfies both.",
    explanationZh:
      "第三象限要求 x < 0 且 y < 0，只有 (−1, −2) 满足。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Given y = |x|, which conclusion is correct?",
    stemZh: "已知 y = |x|，下列哪个结论是正确的？",
    options: [
      "When x < 0, the function is increasing",
      "When x > 0, the function is increasing",
      "On ℝ, the function is decreasing",
      "On ℝ, the function is increasing",
    ],
    optionsZh: [
      "当 x < 0 时，函数是增函数",
      "当 x > 0 时，函数是增函数",
      "当 x ∈ ℝ 时，函数是减函数",
      "当 x ∈ ℝ 时，函数是增函数",
    ],
    correct: 1,
    explanation:
      "For x > 0, |x| = x, which is increasing. For x < 0 it is decreasing, and it is not monotonic on all of ℝ.",
    explanationZh:
      "当 x > 0 时，|x| = x，函数递增；当 x < 0 时函数递减；在 ℝ 上不单调。",
    tags: ["functions", "monotonicity"],
  },
  {
    topic: "M1.2",
    difficulty: "MEDIUM",
    stem: "The solution set of (2x + 1)/(x − 2) ≤ 0 is",
    stemZh: "不等式 (2x + 1)/(x − 2) ≤ 0 的解集是",
    options: ["[−1/2, 2)", "(−∞, −1/2] ∪ (2, +∞)", "[−1/2, 2]", "(−∞, −1/2)"],
    optionsZh: ["[−1/2, 2)", "(−∞, −1/2] ∪ (2, +∞)", "[−1/2, 2]", "(−∞, −1/2)"],
    correct: 0,
    explanation:
      "The numerator is zero at x = −1/2 and the denominator at x = 2. The fraction is non-positive between the critical points, with −1/2 included (equality) and 2 excluded (undefined): [−1/2, 2).",
    explanationZh:
      "分子零点为 x = −1/2，分母零点为 x = 2。分式在两根之间非正，且 −1/2 可取等号、2 使分母为零，故解集为 [−1/2, 2)。",
    tags: ["inequalities", "rational"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If a = 2 − √3 and b = 2 + √3, the arithmetic mean of a and b is",
    stemZh: "已知 a = 2 − √3，b = 2 + √3，则 a 和 b 的算术平均数是",
    options: ["1", "2", "±1", "−1"],
    optionsZh: ["1", "2", "±1", "−1"],
    correct: 1,
    explanation:
      "(a + b)/2 = ((2 − √3) + (2 + √3))/2 = 4/2 = 2.",
    explanationZh:
      "(a + b)/2 = ((2 − √3) + (2 + √3))/2 = 4/2 = 2。",
    tags: ["sequences", "arithmetic mean"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The slope of the line through A(−2, 3) and B(3, 1) is",
    stemZh: "经过 A(−2, 3) 和 B(3, 1) 的直线斜率为",
    options: ["2/5", "5/2", "−2/5", "−5/2"],
    optionsZh: ["2/5", "5/2", "−2/5", "−5/2"],
    correct: 2,
    explanation:
      "k = (1 − 3)/(3 − (−2)) = −2/5.",
    explanationZh:
      "k = (1 − 3)/(3 − (−2)) = −2/5。",
    tags: ["analytic geometry", "lines", "slope"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If α is the angle between the x-axis and a line containing P(1, 3), then sin α =",
    stemZh: "若 α 是 x 轴与过点 P(1, 3) 的直线的夹角，则 sin α =",
    options: ["3", "3√10/10", "1/3", "√10/10"],
    optionsZh: ["3", "3√10/10", "1/3", "√10/10"],
    correct: 1,
    explanation:
      "r = √(1² + 3²) = √10, so sin α = y/r = 3/√10 = 3√10/10.",
    explanationZh:
      "r = √(1² + 3²) = √10，故 sin α = y/r = 3/√10 = 3√10/10。",
    tags: ["trigonometry", "definitions"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "Among the sequences (1) 7, 13, 19, 25; (2) 2, 4, 7, 11; (3) −1, −3, −5, −7; (4) 2, 4, 8, 16, the number of arithmetic sequences is",
    stemZh: "在以下四个数列中，等差数列的个数是（1）7, 13, 19, 25；（2）2, 4, 7, 11；（3）−1, −3, −5, −7；（4）2, 4, 8, 16",
    options: ["2", "3", "1", "4"],
    optionsZh: ["2", "3", "1", "4"],
    correct: 0,
    explanation:
      "(1) has common difference 6 and (3) has common difference −2, so both are arithmetic. (2) has differences 2, 3, 4; (4) is geometric, not arithmetic.",
    explanationZh:
      "（1）公差为 6，（3）公差为 −2，均为等差数列；（2）的差为 2、3、4，不是等差数列；（4）是等比数列，不是等差数列。故共有 2 个。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The distance |AB| between A(3, −2) and B(−5, −1) is",
    stemZh: "点 A(3, −2) 到 B(−5, −1) 的距离 |AB| =",
    options: ["65", "√65", "13", "√13"],
    optionsZh: ["65", "√65", "13", "√13"],
    correct: 1,
    explanation:
      "|AB| = √((−5 − 3)² + (−1 + 2)²) = √(64 + 1) = √65.",
    explanationZh:
      "|AB| = √((−5 − 3)² + (−1 + 2)²) = √(64 + 1) = √65。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "A line l has angle of inclination 45° and passes through (0, 2). Its equation is",
    stemZh: "直线 l 的倾斜角为 45°，且经过点 (0, 2)，则 l 的方程是",
    options: ["y = 2x − 2", "y = x + 2", "y = 2x + 2", "y = x − 2"],
    optionsZh: ["y = 2x − 2", "y = x + 2", "y = 2x + 2", "y = x − 2"],
    correct: 1,
    explanation:
      "The slope is tan 45° = 1. With y-intercept 2, the equation is y = x + 2.",
    explanationZh:
      "斜率 k = tan 45° = 1，纵截距为 2，故方程为 y = x + 2。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The circle x² + y² − 4x − 3 = 0 has centre and radius",
    stemZh: "圆 x² + y² − 4x − 3 = 0 的圆心和半径分别为",
    options: ["(0, 2) and √7", "(0, 2) and 7", "(2, 0) and √7", "(2, 0) and 7"],
    optionsZh: ["(0, 2) 和 √7", "(0, 2) 和 7", "(2, 0) 和 √7", "(2, 0) 和 7"],
    correct: 2,
    explanation:
      "Complete the square: (x − 2)² + y² = 7. The centre is (2, 0) and the radius is √7.",
    explanationZh:
      "配方得 (x − 2)² + y² = 7，故圆心为 (2, 0)，半径为 √7。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If sin α = 4/5 and α is in the second quadrant, which statement is correct?",
    stemZh: "已知 sin α = 4/5，且 α 属于第二象限，则下列哪个说法是正确的？",
    options: ["cos α = 3/5", "cos α = −3/5", "tan α = −3/4", "tan α = 4/3"],
    optionsZh: ["cos α = 3/5", "cos α = −3/5", "tan α = −3/4", "tan α = 4/3"],
    correct: 1,
    explanation:
      "In the second quadrant cosine is negative: cos α = −√(1 − 16/25) = −3/5. Then tan α = (4/5)/(−3/5) = −4/3, so C and D are false.",
    explanationZh:
      "第二象限余弦为负：cos α = −√(1 − 16/25) = −3/5。于是 tan α = (4/5)/(−3/5) = −4/3，故 C、D 错误。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "In an arithmetic sequence, a₂ = 1 and a₄ = 5. The first term a₁ and common difference d are",
    stemZh: "等差数列中，a₂ = 1，a₄ = 5，则首项 a₁ 和公差 d 分别为",
    options: ["−1, 2", "1, −2", "−1, −2", "1, 2"],
    optionsZh: ["−1, 2", "1, −2", "−1, −2", "1, 2"],
    correct: 0,
    explanation:
      "a₄ − a₂ = 2d = 4, so d = 2. Then a₁ = a₂ − d = −1.",
    explanationZh:
      "a₄ − a₂ = 2d = 4，故 d = 2；a₁ = a₂ − d = −1。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "Let a, b, c be real numbers. Which statement is correct?",
    stemZh: "设 a，b，c 是实数，下列哪个说法是正确的？",
    options: [
      "If a > b, then ac > bc",
      "If a > b, then a + c > b + c",
      "If ac > bc, then a > b",
      "If a > b, then a² > b²",
    ],
    optionsZh: [
      "若 a > b，则 ac > bc",
      "若 a > b，则 a + c > b + c",
      "若 ac > bc，则 a > b",
      "若 a > b，则 a² > b²",
    ],
    correct: 1,
    explanation:
      "Adding the same number to both sides preserves the inequality, so a + c > b + c. Multiplying depends on the sign of c, and squaring or dividing does not preserve order in general.",
    explanationZh:
      "不等式两边同加同一个数，不等号方向不变，故 a + c > b + c。乘以 c 要看 c 的符号；平方或相除一般不能保持大小关系。",
    tags: ["inequalities", "properties"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "For the exponential function y = aˣ (a > 0, a ≠ 1), which statement is incorrect?",
    stemZh: "关于指数函数 y = aˣ（a > 0，a ≠ 1），下列哪个说法是不正确的？",
    options: [
      "The range is (0, +∞)",
      "The graph passes through (0, 1)",
      "The function is increasing on its domain",
      "The domain is ℝ",
    ],
    optionsZh: ["值域是 (0, +∞)", "图象经过 (0, 1)", "函数在定义域上单调递增", "定义域是 ℝ"],
    correct: 2,
    explanation:
      "y = aˣ increases only when a > 1; for 0 < a < 1 it decreases. The range (0, +∞), the point (0, 1) and the domain ℝ are all correct.",
    explanationZh:
      "只有当 a > 1 时 y = aˣ 才递增；0 < a < 1 时递减。值域 (0, +∞)、过点 (0, 1)、定义域 ℝ 均正确。",
    tags: ["functions", "exponential"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If sin α = 3/5 and α is in the first quadrant, then sin 2α =",
    stemZh: "若 sin α = 3/5，且 α 属于第一象限，则 sin 2α =",
    options: ["12/25", "24/25", "18/25", "7/25"],
    optionsZh: ["12/25", "24/25", "18/25", "7/25"],
    correct: 1,
    explanation:
      "In the first quadrant cos α = 4/5, so sin 2α = 2 sin α cos α = 2(3/5)(4/5) = 24/25.",
    explanationZh:
      "第一象限中 cos α = 4/5，故 sin 2α = 2 sin α cos α = 2(3/5)(4/5) = 24/25。",
    tags: ["trigonometry", "double angle"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "The intersection of l₁: 3x − y + 8 = 0 and l₂: x + 2y − 9 = 0 is",
    stemZh: "直线 l₁：3x − y + 8 = 0 与 l₂：x + 2y − 9 = 0 的交点坐标是",
    options: ["(−5, 1)", "(1, −5)", "(5, −1)", "(−1, 5)"],
    optionsZh: ["(−5, 1)", "(1, −5)", "(5, −1)", "(−1, 5)"],
    correct: 3,
    explanation:
      "From l₁, y = 3x + 8. Substituting into l₂: x + 2(3x + 8) = 9 → 7x = −7 → x = −1, y = 5. The intersection is (−1, 5).",
    explanationZh:
      "由 l₁ 得 y = 3x + 8，代入 l₂：x + 2(3x + 8) = 9，得 7x = −7，x = −1，y = 5。交点为 (−1, 5)。",
    tags: ["analytic geometry", "lines", "intersection"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "For the hyperbola x²/64 − y²/16 = 1, which statement is correct?",
    stemZh: "已知双曲线 x²/64 − y²/16 = 1，下列哪个说法是正确的？",
    options: [
      "The focal distance is 8√5",
      "The semi-major axis is 4",
      "The eccentricity is √5",
      "The semi-minor axis is 8",
    ],
    optionsZh: ["焦距是 8√5", "半长轴是 4", "离心率是 √5", "半短轴是 8"],
    correct: 0,
    explanation:
      "Here a² = 64 and b² = 16, so a = 8 and b = 4. For a hyperbola c² = a² + b² = 80, hence c = 4√5 and the focal distance is 2c = 8√5.",
    explanationZh:
      "双曲线中 a² = 64，b² = 16，故 a = 8，b = 4。c² = a² + b² = 80，c = 4√5，焦距 2c = 8√5。",
    tags: ["analytic geometry", "hyperbola"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Which inequality is correct?",
    stemZh: "下列哪个不等式是正确的？",
    options: [
      "2.1⁻² > 1.2⁻²",
      "0.75⁻⁰·² > 0.75⁻⁰·⁴",
      "3²·²⁵ > 3³",
      "2.1²/³ > 1.2²/³",
    ],
    optionsZh: [
      "2.1⁻² > 1.2⁻²",
      "0.75⁻⁰·² > 0.75⁻⁰·⁴",
      "3²·²⁵ > 3³",
      "2.1²/³ > 1.2²/³",
    ],
    correct: 3,
    explanation:
      "The function f(x) = x^(2/3) is increasing for x > 0, and 2.1 > 1.2, so 2.1^(2/3) > 1.2^(2/3). The other options reverse the correct order.",
    explanationZh:
      "函数 f(x) = x^(2/3) 在 x > 0 时递增，且 2.1 > 1.2，故 2.1^(2/3) > 1.2^(2/3)。其余选项均与正确大小关系相反。",
    tags: ["inequalities", "power functions"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "A circle has centre (−3, 2) and radius 4. Its equation is",
    stemZh: "圆心为 (−3, 2)，半径为 4 的圆的方程是",
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
    difficulty: "MEDIUM",
    stem: "Let a > 0 and b > 0. Which statement is incorrect?",
    stemZh: "设 a > 0，b > 0，下列哪个说法是不正确的？",
    options: [
      "ln(aᵇ) = b ln a",
      "logₐ b = ln a / ln b (a ≠ 1, b ≠ 1)",
      "ln(a/b) = ln a − ln b",
      "ln(ab) = ln a + ln b",
    ],
    optionsZh: [
      "ln(aᵇ) = b ln a",
      "logₐ b = ln a / ln b（a ≠ 1，b ≠ 1）",
      "ln(a/b) = ln a − ln b",
      "ln(ab) = ln a + ln b",
    ],
    correct: 1,
    explanation:
      "The change-of-base formula is logₐ b = ln b / ln a, not ln a / ln b. The other three logarithm laws are correct for a, b > 0.",
    explanationZh:
      "换底公式应为 logₐ b = ln b / ln a，而不是 ln a / ln b。其余三条对数运算法则在 a、b > 0 时均正确。",
    tags: ["logarithms", "laws"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "For y = sin x, which statement is incorrect?",
    stemZh: "关于 y = sin x，下列哪个说法是不正确的？",
    options: [
      "The maximum and minimum are 1 and −1",
      "The function is periodic",
      "The function is even",
      "The domain is ℝ",
    ],
    optionsZh: ["最大值和最小值分别为 1 和 −1", "函数是周期函数", "函数是偶函数", "定义域是 ℝ"],
    correct: 2,
    explanation:
      "sin x is an odd function: sin(−x) = −sin x. Its range, periodicity and domain ℝ are all correct, so the incorrect statement is that it is even.",
    explanationZh:
      "sin x 是奇函数：sin(−x) = −sin x。其值域、周期性和定义域 ℝ 均正确，故“是偶函数”错误。",
    tags: ["trigonometry", "properties"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "The focus of the parabola y² = 4x is F. Point P is on the parabola with x = 4. Then |PF| =",
    stemZh: "抛物线 y² = 4x 的焦点为 F，点 P 在抛物线上且横坐标为 4，则 |PF| =",
    options: ["2", "3", "4", "5"],
    optionsZh: ["2", "3", "4", "5"],
    correct: 3,
    explanation:
      "For y² = 4x, p = 1 and the focus is (1, 0). The distance from P to the focus equals the distance to the directrix x = −1, so |PF| = x + p = 4 + 1 = 5.",
    explanationZh:
      "由 y² = 4x 得 p = 1，焦点为 (1, 0)。抛物线上点到焦点的距离等于到准线 x = −1 的距离，故 |PF| = x + p = 4 + 1 = 5。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M3.1",
    difficulty: "HARD",
    stem: "Lines l₁: ax + (a − 1)y + 3 = 0 and l₂: 2x + ay − 1 = 0 are perpendicular. The value of a is",
    stemZh: "直线 l₁：ax + (a − 1)y + 3 = 0 与 l₂：2x + ay − 1 = 0 垂直，则 a 的值是",
    options: ["−1", "−1 or 1", "1", "0 or −1"],
    optionsZh: ["−1", "−1 或 1", "1", "0 或 −1"],
    correct: 3,
    explanation:
      "Perpendicularity of the normal vectors gives (a, a − 1)·(2, a) = 0 → 2a + a(a − 1) = 0 → a(a + 1) = 0 → a = 0 or a = −1. Both values make the lines perpendicular.",
    explanationZh:
      "两直线垂直，法向量满足 (a, a − 1)·(2, a) = 0，即 2a + a(a − 1) = 0，a(a + 1) = 0，故 a = 0 或 a = −1。两者都使两直线垂直。",
    tags: ["analytic geometry", "lines", "perpendicular"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The distance between P(−1, 2) and Q(3, 1) is",
    stemZh: "点 P(−1, 2) 与 Q(3, 1) 之间的距离是",
    options: ["√5", "√17", "√13", "5"],
    optionsZh: ["√5", "√17", "√13", "5"],
    correct: 1,
    explanation:
      "|PQ| = √((3 + 1)² + (1 − 2)²) = √(16 + 1) = √17.",
    explanationZh:
      "|PQ| = √((3 + 1)² + (1 − 2)²) = √(16 + 1) = √17。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M2.2",
    difficulty: "HARD",
    stem: "If cos α = −√5/5 and α ∈ (π/2, π), then sin(π/6 + α) =",
    stemZh: "若 cos α = −√5/5，且 α ∈ (π/2, π)，则 sin(π/6 + α) =",
    options: [
      "(2√5 − √15)/10",
      "(2√15 + √5)/10",
      "(2√15 − √5)/10",
      "(2√5 + √15)/10",
    ],
    optionsZh: [
      "(2√5 − √15)/10",
      "(2√15 + √5)/10",
      "(2√15 − √5)/10",
      "(2√5 + √15)/10",
    ],
    correct: 2,
    explanation:
      "Since α is in the second quadrant, sin α = 2√5/5. Then sin(π/6 + α) = sin(π/6)cos α + cos(π/6)sin α = (1/2)(−√5/5) + (√3/2)(2√5/5) = (2√15 − √5)/10.",
    explanationZh:
      "α 在第二象限，故 sin α = 2√5/5。于是 sin(π/6 + α) = sin(π/6)cos α + cos(π/6)sin α = (1/2)(−√5/5) + (√3/2)(2√5/5) = (2√15 − √5)/10。",
    tags: ["trigonometry", "angle sum"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "Which pair of expressions represents the same function?",
    stemZh: "下列哪一组表示同一个函数？",
    options: [
      "y = (√x)² and y = √(x²)",
      "y = (x⁴ − 1)/(x² + 1) and y = x² − 1",
      "y = x and y = √(x²)",
      "y = x and y = (√x)²",
    ],
    optionsZh: [
      "y = (√x)² 和 y = √(x²)",
      "y = (x⁴ − 1)/(x² + 1) 和 y = x² − 1",
      "y = x 和 y = √(x²)",
      "y = x 和 y = (√x)²",
    ],
    correct: 1,
    explanation:
      "Since x² + 1 > 0 for all x, (x⁴ − 1)/(x² + 1) = (x² − 1)(x² + 1)/(x² + 1) = x² − 1, with domain ℝ for both. The other pairs differ in domain or rule: (√x)² has domain x ≥ 0, √(x²) = |x|, and (√x)² = x only for x ≥ 0.",
    explanationZh:
      "因为 x² + 1 > 0 恒成立，故 (x⁴ − 1)/(x² + 1) = (x² − 1)(x² + 1)/(x² + 1) = x² − 1，且两者定义域均为 ℝ。其余各组在定义域或对应关系上不同：(√x)² 要求 x ≥ 0，√(x²) = |x|，(√x)² 仅在 x ≥ 0 时等于 x。",
    tags: ["functions", "domain", "identity"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If sin α = −12/13 and α ∈ (π, 3π/2), then cos(α/2) =",
    stemZh: "若 sin α = −12/13，且 α ∈ (π, 3π/2)，则 cos(α/2) =",
    options: ["3√13/13", "−3√13/13", "−2√13/13", "2√13/13"],
    optionsZh: ["3√13/13", "−3√13/13", "−2√13/13", "2√13/13"],
    correct: 2,
    explanation:
      "In the third quadrant, cos α = −5/13. Since α/2 ∈ (π/2, 3π/4), cos(α/2) is negative. Then cos²(α/2) = (1 + cos α)/2 = (1 − 5/13)/2 = 4/13, so cos(α/2) = −2√13/13.",
    explanationZh:
      "α 在第三象限，cos α = −5/13。α/2 ∈ (π/2, 3π/4)，故 cos(α/2) 为负。由 cos²(α/2) = (1 + cos α)/2 = (1 − 5/13)/2 = 4/13，得 cos(α/2) = −2√13/13。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If cos α = −1/2 and α ∈ (π/2, π), then sin(α/2) =",
    stemZh: "若 cos α = −1/2，且 α ∈ (π/2, π)，则 sin(α/2) =",
    options: ["−√3/2", "√3/2", "−1/2", "1/2"],
    optionsZh: ["−√3/2", "√3/2", "−1/2", "1/2"],
    correct: 1,
    explanation:
      "α/2 ∈ (π/4, π/2), where sine is positive. sin²(α/2) = (1 − cos α)/2 = (1 + 1/2)/2 = 3/4, so sin(α/2) = √3/2.",
    explanationZh:
      "α/2 ∈ (π/4, π/2)，正弦为正。由 sin²(α/2) = (1 − cos α)/2 = (1 + 1/2)/2 = 3/4，得 sin(α/2) = √3/2。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which statement is correct?",
    stemZh: "下列哪个说法是正确的？",
    options: [
      "sin(π + α) = sin α",
      "cos(π + α) = cos α",
      "sin(−α) = sin α",
      "cos(−α) = cos α",
    ],
    optionsZh: [
      "sin(π + α) = sin α",
      "cos(π + α) = cos α",
      "sin(−α) = sin α",
      "cos(−α) = cos α",
    ],
    correct: 3,
    explanation:
      "cos(−α) = cos α because cosine is even. The others are false: sin(π + α) = −sin α, cos(π + α) = −cos α and sin(−α) = −sin α.",
    explanationZh:
      "余弦是偶函数，故 cos(−α) = cos α。其余错误：sin(π + α) = −sin α，cos(π + α) = −cos α，sin(−α) = −sin α。",
    tags: ["trigonometry", "reduction formulas"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "For y = tan x, which statement is correct?",
    stemZh: "关于 y = tan x，下列哪个说法是正确的？",
    options: [
      "The range is [−1, 1]",
      "The domain is ℝ",
      "The function is even",
      "The minimum positive period is π",
    ],
    optionsZh: ["值域是 [−1, 1]", "定义域是 ℝ", "函数是偶函数", "最小正周期是 π"],
    correct: 3,
    explanation:
      "tan x has period π and range ℝ; it is odd and undefined at x = π/2 + kπ. Only the period statement is correct.",
    explanationZh:
      "tan x 的周期为 π，值域为 ℝ，是奇函数，且在 x = π/2 + kπ 处无定义。只有“最小正周期是 π”正确。",
    tags: ["trigonometry", "properties"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "The general term of the sequence −1/5, 1/7, −1/9, 1/11, … is",
    stemZh: "数列 −1/5，1/7，−1/9，1/11，… 的通项公式是",
    options: [
      "(−1)ⁿ⁻¹/(3n + 2)",
      "(−1)ⁿ/(2n + 3)",
      "(−1)ⁿ⁻¹/(2n + 3)",
      "(−1)ⁿ/(3n + 2)",
    ],
    optionsZh: [
      "(−1)ⁿ⁻¹/(3n + 2)",
      "(−1)ⁿ/(2n + 3)",
      "(−1)ⁿ⁻¹/(2n + 3)",
      "(−1)ⁿ/(3n + 2)",
    ],
    correct: 1,
    explanation:
      "The signs alternate starting with negative, so the sign factor is (−1)ⁿ. The denominators 5, 7, 9, 11 are 2n + 3. Thus aₙ = (−1)ⁿ/(2n + 3); for n = 1 this gives −1/5.",
    explanationZh:
      "符号交替且首项为负，故符号因子为 (−1)ⁿ；分母 5、7、9、11 可写成 2n + 3。故 aₙ = (−1)ⁿ/(2n + 3)，n = 1 时得 −1/5。",
    tags: ["sequences", "general term"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "The graph of f(x) = 2 + logₐ(x − 3) (a > 0, a ≠ 1) passes through a fixed point P. The coordinates of P are",
    stemZh: "函数 f(x) = 2 + logₐ(x − 3)（a > 0，a ≠ 1）的图象经过定点 P，则 P 的坐标是",
    options: ["(3, 1)", "(3, 0)", "(4, 0)", "(4, 2)"],
    optionsZh: ["(3, 1)", "(3, 0)", "(4, 0)", "(4, 2)"],
    correct: 3,
    explanation:
      "logₐ 1 = 0 for every valid base. Setting x − 3 = 1 gives x = 4 and f(4) = 2 + 0 = 2, so the fixed point is (4, 2).",
    explanationZh:
      "对任意合法底数，logₐ 1 = 0。令 x − 3 = 1，得 x = 4，f(4) = 2 + 0 = 2，故定点为 (4, 2)。",
    tags: ["logarithms", "fixed point"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "The directrix of the parabola y² = −x is",
    stemZh: "抛物线 y² = −x 的准线方程是",
    options: ["x = 1/4", "x = −1/4", "x = −1/2", "x = 1/2"],
    optionsZh: ["x = 1/4", "x = −1/4", "x = −1/2", "x = 1/2"],
    correct: 0,
    explanation:
      "For y² = −4px, 4p = 1 so p = 1/4. The parabola opens left and its directrix is x = p = 1/4.",
    explanationZh:
      "抛物线 y² = −4px 中 4p = 1，故 p = 1/4。抛物线开口向左，准线为 x = p = 1/4。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The foci of the ellipse x²/4 + y²/2 = 1 are F₁ and F₂, and P is on the ellipse. Then |PF₁| + |PF₂| =",
    stemZh: "椭圆 x²/4 + y²/2 = 1 的焦点为 F₁、F₂，点 P 在椭圆上，则 |PF₁| + |PF₂| =",
    options: ["2", "4", "8", "6"],
    optionsZh: ["2", "4", "8", "6"],
    correct: 1,
    explanation:
      "Here a² = 4, so a = 2. For any point on an ellipse, the sum of distances to the foci is 2a = 4.",
    explanationZh:
      "椭圆中 a² = 4，故 a = 2。椭圆上任一点到两焦点的距离之和为 2a = 4。",
    tags: ["analytic geometry", "ellipse"],
  },
  {
    topic: "M3.2",
    difficulty: "MEDIUM",
    stem: "Vectors satisfy $\\overrightarrow{AB} = \\vec{a} + 5\\vec{b}$, $\\overrightarrow{BC} = -2\\vec{a} + 8\\vec{b}$ and $\\overrightarrow{CD} = 3\\vec{a} - 3\\vec{b}$. Then",
    stemZh: "已知向量 $\\overrightarrow{AB} = \\vec{a} + 5\\vec{b}$，$\\overrightarrow{BC} = -2\\vec{a} + 8\\vec{b}$，$\\overrightarrow{CD} = 3\\vec{a} - 3\\vec{b}$，则",
    options: [
      "A, C, D are collinear",
      "A, B, D are collinear",
      "B, C, D are collinear",
      "A, B, C are collinear",
    ],
    optionsZh: [
      "A、C、D 三点共线",
      "A、B、D 三点共线",
      "B、C、D 三点共线",
      "A、B、C 三点共线",
    ],
    correct: 1,
    explanation:
      "$\\overrightarrow{AD} = \\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} = (1 - 2 + 3)\\vec{a} + (5 + 8 - 3)\\vec{b} = 2\\vec{a} + 10\\vec{b} = 2(\\vec{a} + 5\\vec{b}) = 2\\overrightarrow{AB}$. Thus $\\overrightarrow{AD}$ is parallel to $\\overrightarrow{AB}$ and they share A, so A, B, D are collinear.",
    explanationZh:
      "$\\overrightarrow{AD} = \\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} = (1 - 2 + 3)\\vec{a} + (5 + 8 - 3)\\vec{b} = 2\\vec{a} + 10\\vec{b} = 2(\\vec{a} + 5\\vec{b}) = 2\\overrightarrow{AB}$，故 $\\overrightarrow{AD}$ 与 $\\overrightarrow{AB}$ 平行且共点 A，A、B、D 三点共线。",
    tags: ["vectors", "collinearity"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Line l is perpendicular to l₁: x + 2y + 4 = 0 and passes through the intersection of l₂: x + y + 1 = 0 and l₃: 2x + y − 1 = 0. The equation of l is",
    stemZh: "直线 l 垂直于 l₁：x + 2y + 4 = 0，且经过 l₂：x + y + 1 = 0 与 l₃：2x + y − 1 = 0 的交点，则 l 的方程是",
    options: ["2x − y − 7 = 0", "2x + y − 5 = 0", "x − 2y − 1 = 0", "x + 2y − 3 = 0"],
    optionsZh: ["2x − y − 7 = 0", "2x + y − 5 = 0", "x − 2y − 1 = 0", "x + 2y − 3 = 0"],
    correct: 0,
    explanation:
      "l₁ has slope −1/2, so l has slope 2. Solving l₂ and l₃ gives x = 2, y = −3. The line through (2, −3) with slope 2 is y + 3 = 2(x − 2), i.e. 2x − y − 7 = 0.",
    explanationZh:
      "l₁ 的斜率为 −1/2，故 l 的斜率为 2。联立 l₂、l₃ 得交点 (2, −3)。由点斜式 y + 3 = 2(x − 2)，整理得 2x − y − 7 = 0。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.3",
    difficulty: "HARD",
    stem: "On the complex plane, z lies on the line x − y = 0. If z is a root of x² + mx + 4 = 0, then m =",
    stemZh: "复平面上，复数 z 对应的点在直线 x − y = 0 上。若 z 是方程 x² + mx + 4 = 0 的一个根，则 m =",
    options: ["√2 or 2√2", "2√2 or −2√2", "−√2 or −2√2", "√2 or −√2"],
    optionsZh: ["√2 或 2√2", "2√2 或 −2√2", "−√2 或 −2√2", "√2 或 −√2"],
    correct: 1,
    explanation:
      "Write z = a + ai. Because the coefficients are real, z̄ = a − ai is also a root. The product of the roots is 4, so (a + ai)(a − ai) = 2a² = 4, giving a = ±√2. The sum is 2a = −m, so m = −2a = ∓2√2, i.e. m = ±2√2.",
    explanationZh:
      "设 z = a + ai。由于方程系数为实数，其共轭 a − ai 也是根。两根之积为 4，故 (a + ai)(a − ai) = 2a² = 4，a = ±√2。两根之和为 2a = −m，故 m = −2a = ∓2√2，即 m = ±2√2。",
    tags: ["complex numbers", "quadratic roots"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "In a sequence {aₙ}, a₁ = 1 and 1/aₙ + 2/aₙ₊₁ = 0 (n = 1, 2, …). If bₙ = |aₙ|, then the sum of the first n terms of {bₙ} is Sₙ =",
    stemZh: "数列 {aₙ} 中，a₁ = 1，且 1/aₙ + 2/aₙ₊₁ = 0（n = 1, 2, …）。若 bₙ = |aₙ|，则 {bₙ} 的前 n 项和 Sₙ =",
    options: ["(1 + 2ⁿ)/3", "|1 − (−2)ⁿ|/3", "2ⁿ − 1", "(−2)ⁿ − 1"],
    optionsZh: ["(1 + 2ⁿ)/3", "|1 − (−2)ⁿ|/3", "2ⁿ − 1", "(−2)ⁿ − 1"],
    correct: 2,
    explanation:
      "The relation gives 1/aₙ = −2/aₙ₊₁, so aₙ₊₁ = −2aₙ. Thus aₙ = (−2)ⁿ⁻¹ and bₙ = |aₙ| = 2ⁿ⁻¹. The sum is Sₙ = 1 + 2 + … + 2ⁿ⁻¹ = 2ⁿ − 1.",
    explanationZh:
      "由 1/aₙ + 2/aₙ₊₁ = 0 得 aₙ₊₁ = −2aₙ，故 aₙ = (−2)ⁿ⁻¹，bₙ = |aₙ| = 2ⁿ⁻¹。于是 Sₙ = 1 + 2 + … + 2ⁿ⁻¹ = 2ⁿ − 1。",
    tags: ["sequences", "geometric", "sum"],
  },
];
