import type { SeedQuestion } from "../types";

/**
 * Official CSCA Mathematics past paper — April 2026 sitting.
 *
 * Transcribed from the official paper and answer key. Question text is the
 * official content (bilingual CN/EN); kept free and attributed, never behind
 * the paid tier. Mapped to the syllabus topics below.
 *
 * Difficulty follows the paper's ramp: a long easy warm-up, then medium items,
 * with the conic-section and sequence questions at the hard end.
 */
export const officialMathApr2026Questions: SeedQuestion[] = [
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "Let A = {1, 3, 4, 6, 7} and B = {1, 3, 4}. Which of the following statements is correct?",
    stemZh: "设 A = {1, 3, 4, 6, 7}，B = {1, 3, 4}，下列说法正确的是",
    options: ["A ∈ B", "A ⊆ B", "B ∈ A", "B ⊆ A"],
    optionsZh: ["A ∈ B", "A ⊆ B", "B ∈ A", "B ⊆ A"],
    correct: 3,
    explanation:
      "Every element of B — 1, 3 and 4 — is also in A, so B ⊆ A. A is not a subset of B because 6 and 7 are missing from B. The ∈ symbol links an element to a set, so options A and C misuse it.",
    explanationZh:
      "集合 B 的每个元素 1、3、4 都属于 A，故 B ⊆ A；A 中的 6、7 不属于 B，故 A 不是 B 的子集。∈ 表示元素与集合的关系，A、C 两项属于符号误用。",
    tags: ["sets", "subsets"],
  },
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "Let A = {x | 3 < x < 5} and B = {x | x > 4}. Then A ∩ B =",
    stemZh: "设 A = {x | 3 < x < 5}，B = {x | x > 4}，则 A ∩ B =",
    options: [
      "{x | 3 < x ≤ 4}",
      "{x | 4 ≤ x < 5}",
      "{x | 4 < x < 5}",
      "{x | 3 < x < 4}",
    ],
    optionsZh: [
      "{x | 3 < x ≤ 4}",
      "{x | 4 ≤ x < 5}",
      "{x | 4 < x < 5}",
      "{x | 3 < x < 4}",
    ],
    correct: 2,
    explanation:
      "A = (3, 5) and B = (4, +∞). Their overlap is the set of numbers greater than 4 and less than 5; neither endpoint is included, so A ∩ B = {x | 4 < x < 5}.",
    explanationZh:
      "A = (3, 5)，B = (4, +∞)，交集为大于 4 且小于 5 的部分，两端都不包含，即 A ∩ B = {x | 4 < x < 5}。",
    tags: ["sets", "intersection"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which of the following points is in the third quadrant?",
    stemZh: "下列哪个点在第三象限？",
    options: ["(1, −2)", "(1, 2)", "(−1, −2)", "(−1, 2)"],
    optionsZh: ["(1, −2)", "(1, 2)", "(−1, −2)", "(−1, 2)"],
    correct: 2,
    explanation:
      "A point in the third quadrant has x < 0 and y < 0. Of the options, only (−1, −2) has both coordinates negative.",
    explanationZh:
      "第三象限内 x < 0 且 y < 0，只有 (−1, −2) 同时满足。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "The solution set of the inequality x² − 2x − 3 ≥ 0 is",
    stemZh: "不等式 x² − 2x − 3 ≥ 0 的解集是",
    options: [
      "(−1, 3)",
      "(−∞, −1] ∪ [3, +∞)",
      "(−∞, −1) ∪ (3, +∞)",
      "[−1, 3]",
    ],
    optionsZh: [
      "(−1, 3)",
      "(−∞, −1] ∪ [3, +∞)",
      "(−∞, −1) ∪ (3, +∞)",
      "[−1, 3]",
    ],
    correct: 1,
    explanation:
      "Factorise: x² − 2x − 3 = (x − 3)(x + 1). The upward parabola is non-negative outside its roots, so x ≤ −1 or x ≥ 3, i.e. (−∞, −1] ∪ [3, +∞).",
    explanationZh:
      "因式分解得 (x − 3)(x + 1) ≥ 0。开口向上的抛物线在两根之外非负，故 x ≤ −1 或 x ≥ 3，即 (−∞, −1] ∪ [3, +∞)。",
    tags: ["inequalities", "quadratic"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The domain of the function f(x) = ∛(3x + 1) is",
    stemZh: "函数 f(x) = ∛(3x + 1) 的定义域是",
    options: ["(−∞, 0]", "(−∞, +∞)", "[1, +∞)", "[0, +∞)"],
    optionsZh: ["(−∞, 0]", "(−∞, +∞)", "[1, +∞)", "[0, +∞)"],
    correct: 1,
    explanation:
      "The cube root is defined for every real number, so 3x + 1 can take any value and the domain is (−∞, +∞). Only even roots require a non-negative radicand.",
    explanationZh:
      "立方根对任意实数都有意义，故定义域为 (−∞, +∞)。只有偶次根式才要求被开方数非负。",
    tags: ["functions", "domain", "radicals"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "In the Cartesian coordinate system, the abscissa of point M is −4 and its distance to the x-axis is 5. The coordinates of M are",
    stemZh: "在直角坐标系中，点 M 的横坐标为 −4，到 x 轴的距离为 5，则 M 的坐标为",
    options: [
      "(−4, 5) or (−4, 3)",
      "(−4, 5) or (−4, −5)",
      "(5, −4)",
      "(−5, −4)",
    ],
    optionsZh: [
      "(−4, 5) 或 (−4, 3)",
      "(−4, 5) 或 (−4, −5)",
      "(5, −4)",
      "(−5, −4)",
    ],
    correct: 1,
    explanation:
      "The distance to the x-axis is |y|, so |y| = 5 and y = ±5. The abscissa is given as −4, hence M is (−4, 5) or (−4, −5).",
    explanationZh:
      "点到 x 轴的距离为 |y|，故 |y| = 5，y = ±5。横坐标已给定为 −4，所以 M 为 (−4, 5) 或 (−4, −5)。",
    tags: ["analytic geometry", "coordinates"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "sin 120° =",
    stemZh: "sin 120° =",
    options: ["√3/2", "−√3/2", "−1/2", "1/2"],
    optionsZh: ["√3/2", "−√3/2", "−1/2", "1/2"],
    correct: 0,
    explanation:
      "sin 120° = sin(180° − 60°) = sin 60° = √3/2, using sin(180° − α) = sin α.",
    explanationZh:
      "sin 120° = sin(180° − 60°) = sin 60° = √3/2，利用诱导公式 sin(180° − α) = sin α。",
    tags: ["trigonometry", "special angles"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Which of the following functions is an odd function?",
    stemZh: "下列哪个函数是奇函数？",
    options: ["y = √(3x + 2)", "y = x² + 3", "y = x³ + 1", "y = −x"],
    optionsZh: ["y = √(3x + 2)", "y = x² + 3", "y = x³ + 1", "y = −x"],
    correct: 3,
    explanation:
      "An odd function satisfies f(−x) = −f(x). A has a domain that is not symmetric about the origin; B is even; C gives f(−x) = −x³ + 1 ≠ −f(x); D gives f(−x) = x = −f(x), so it is odd.",
    explanationZh:
      "奇函数满足 f(−x) = −f(x)。A 的定义域不关于原点对称；B 满足 f(−x) = f(x)，是偶函数；C 的 f(−x) = −x³ + 1 ≠ −f(x)；D 的 f(−x) = x = −f(x)，是奇函数。",
    tags: ["functions", "parity"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The slope of the straight line passing through points A(−1, 1) and B(2, 3) is",
    stemZh: "过点 A(−1, 1)，B(2, 3) 的直线斜率为",
    options: ["−3/2", "−2/3", "3/2", "2/3"],
    optionsZh: ["−3/2", "−2/3", "3/2", "2/3"],
    correct: 3,
    explanation:
      "Slope formula: k = (y₂ − y₁)/(x₂ − x₁) = (3 − 1)/(2 − (−1)) = 2/3.",
    explanationZh:
      "由斜率公式 k = (y₂ − y₁)/(x₂ − x₁) = (3 − 1)/(2 − (−1)) = 2/3。",
    tags: ["analytic geometry", "lines", "slope"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The inverse function of y = 10x + 3 is",
    stemZh: "函数 y = 10x + 3 的反函数是",
    options: [
      "y = (x + 10)/3",
      "y = (x − 10)/3",
      "y = (x + 3)/10",
      "y = (x − 3)/10",
    ],
    optionsZh: [
      "y = (x + 10)/3",
      "y = (x − 10)/3",
      "y = (x + 3)/10",
      "y = (x − 3)/10",
    ],
    correct: 3,
    explanation:
      "Solve y = 10x + 3 for x: x = (y − 3)/10. Swapping x and y gives the inverse y = (x − 3)/10. The inverse is not the reciprocal.",
    explanationZh:
      "由 y = 10x + 3 反解 x，得 x = (y − 3)/10，互换 x、y 得反函数 y = (x − 3)/10。注意反函数不是倒数。",
    tags: ["functions", "inverse"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Which of the following functions is decreasing on (−∞, +∞)?",
    stemZh: "下列哪个函数在 (−∞, +∞) 上单调递减？",
    options: ["y = −x + 5", "y = x³", "y = x² + 1", "y = −1/x"],
    optionsZh: ["y = −x + 5", "y = x³", "y = x² + 1", "y = −1/x"],
    correct: 0,
    explanation:
      "A has slope −1, so it decreases on all of ℝ. B increases; C decreases only on (−∞, 0) and increases on (0, +∞); D is undefined at x = 0, so it is not monotonic on ℝ.",
    explanationZh:
      "A 的斜率为 −1，在 ℝ 上单调递减；B 单调递增；C 在 (−∞, 0) 上递减、在 (0, +∞) 上递增；D 在 x = 0 处无定义，不能说在 ℝ 上单调。",
    tags: ["functions", "monotonicity"],
  },
  {
    topic: "M1.2",
    difficulty: "MEDIUM",
    stem: "The solution set of the inequality (2x + 1)/(x − 1) < 0 is",
    stemZh: "不等式 (2x + 1)/(x − 1) < 0 的解集是",
    options: [
      "(−∞, −1/2] ∪ [1, +∞)",
      "(−1/2, 1)",
      "[−1/2, 1]",
      "(−∞, −1/2) ∪ (1, +∞)",
    ],
    optionsZh: [
      "(−∞, −1/2] ∪ [1, +∞)",
      "(−1/2, 1)",
      "[−1/2, 1]",
      "(−∞, −1/2) ∪ (1, +∞)",
    ],
    correct: 1,
    explanation:
      "The numerator vanishes at x = −1/2 and the denominator at x = 1. The fraction is negative when the two factors have opposite signs, i.e. −1/2 < x < 1. Both endpoints are excluded (one makes the fraction zero, the other undefined).",
    explanationZh:
      "分子零点为 x = −1/2，分母零点为 x = 1。分式小于 0 时分子、分母异号，故 −1/2 < x < 1。两个端点都使分式等于 0 或无意义，均不取。",
    tags: ["inequalities", "rational"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If −1, a, 15 form an arithmetic sequence, then a =",
    stemZh: "若 −1，a，15 成等差数列，则 a =",
    options: ["9", "5", "7", "11"],
    optionsZh: ["9", "5", "7", "11"],
    correct: 2,
    explanation:
      "In an arithmetic progression the middle term is the average of its neighbours: a = (−1 + 15)/2 = 7.",
    explanationZh:
      "等差数列中，中间项等于两端项的算术平均：a = (−1 + 15)/2 = 7。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "If the angle of inclination of a straight line l is 60°, then the slope of l is",
    stemZh: "若直线 l 的倾斜角为 60°，则 l 的斜率为",
    options: ["−√3", "√3/2", "1/2", "√3"],
    optionsZh: ["−√3", "√3/2", "1/2", "√3"],
    correct: 3,
    explanation:
      "The slope equals the tangent of the angle of inclination: k = tan 60° = √3.",
    explanationZh:
      "倾斜角为 α 的直线斜率 k = tan α，故 k = tan 60° = √3。",
    tags: ["analytic geometry", "lines", "slope"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If {aₙ} is an arithmetic sequence with a₁ = 1 and a₂ = 3, then a₅ =",
    stemZh: "若 {aₙ} 是等差数列，a₁ = 1，a₂ = 3，则 a₅ =",
    options: ["9", "5", "7", "11"],
    optionsZh: ["9", "5", "7", "11"],
    correct: 0,
    explanation:
      "The common difference is d = a₂ − a₁ = 2, so a₅ = a₁ + 4d = 1 + 8 = 9.",
    explanationZh:
      "公差 d = a₂ − a₁ = 2，故 a₅ = a₁ + 4d = 1 + 8 = 9。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If point P(x, y) lies on the terminal side of angle α and its distance from the origin is r (r ≠ 0), then cos α =",
    stemZh: "若点 P(x, y) 在角 α 的终边上，P 到原点的距离为 r (r ≠ 0)，则 cos α =",
    options: ["y/r", "y/x", "x/y", "x/r"],
    optionsZh: ["y/r", "y/x", "x/y", "x/r"],
    correct: 3,
    explanation:
      "By the definition of trigonometric functions for any angle, cos α = x/r, sin α = y/r and tan α = y/x.",
    explanationZh:
      "由任意角三角函数的定义，cos α = x/r，sin α = y/r，tan α = y/x。",
    tags: ["trigonometry", "definitions"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "The general term of a sequence {aₙ} is aₙ = 2n − 1. Which of the following statements is correct?",
    stemZh: "若数列 {aₙ} 的通项公式为 aₙ = 2n − 1，下列说法正确的是",
    options: [
      "It is both arithmetic and geometric",
      "It is neither arithmetic nor geometric",
      "It is an arithmetic sequence",
      "It is a geometric sequence",
    ],
    optionsZh: [
      "既是等差数列又是等比数列",
      "既不是等差数列也不是等比数列",
      "是等差数列",
      "是等比数列",
    ],
    correct: 2,
    explanation:
      "The terms are 1, 3, 5, 7, …; consecutive terms differ by 2, so the sequence is arithmetic. It is not geometric because a₂/a₁ = 3 while a₃/a₂ = 5/3.",
    explanationZh:
      "数列为 1, 3, 5, 7, …，相邻两项之差恒为 2，故是等差数列；又 a₂/a₁ = 3，a₃/a₂ = 5/3，比值不恒定，故不是等比数列。",
    tags: ["sequences", "arithmetic", "geometric"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The distance from point A(0, 3) to point B(x, −1) is 5. Then x =",
    stemZh: "点 A(0, 3) 到点 B(x, −1) 的距离为 5，则 x =",
    options: ["√21", "±3", "3", "−3"],
    optionsZh: ["√21", "±3", "3", "−3"],
    correct: 1,
    explanation:
      "Using the distance formula: √(x² + (−1 − 3)²) = 5 → x² + 16 = 25 → x² = 9 → x = ±3.",
    explanationZh:
      "由两点间距离公式，√(x² + (−1 − 3)²) = 5，即 x² + 16 = 25，x² = 9，故 x = ±3。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "If line l has slope −3 and passes through the point (1, 2), then the equation of l is",
    stemZh: "若直线 l 的斜率为 −3，且过点 (1, 2)，则 l 的方程为",
    options: [
      "3x + y − 5 = 0",
      "x + 3y − 7 = 0",
      "3x + y + 1 = 0",
      "x + 3y + 5 = 0",
    ],
    optionsZh: [
      "3x + y − 5 = 0",
      "x + 3y − 7 = 0",
      "3x + y + 1 = 0",
      "x + 3y + 5 = 0",
    ],
    correct: 0,
    explanation:
      "Point-slope form: y − 2 = −3(x − 1) → y = −3x + 5 → 3x + y − 5 = 0.",
    explanationZh:
      "由点斜式 y − 2 = −3(x − 1)，整理得 y = −3x + 5，即 3x + y − 5 = 0。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "A circle has radius 3 and centre (−1, 2). Its equation is",
    stemZh: "圆心为 (−1, 2)，半径为 3 的圆的方程为",
    options: [
      "x² + y² − 2x − 4y − 4 = 0",
      "x² + y² + 2x + 4y − 4 = 0",
      "x² + y² + 2x − 4y + 4 = 0",
      "x² + y² + 2x − 4y − 4 = 0",
    ],
    optionsZh: [
      "x² + y² − 2x − 4y − 4 = 0",
      "x² + y² + 2x + 4y − 4 = 0",
      "x² + y² + 2x − 4y + 4 = 0",
      "x² + y² + 2x − 4y − 4 = 0",
    ],
    correct: 3,
    explanation:
      "The standard equation is (x + 1)² + (y − 2)² = 9. Expanding: x² + 2x + 1 + y² − 4y + 4 = 9 → x² + y² + 2x − 4y − 4 = 0.",
    explanationZh:
      "标准方程为 (x + 1)² + (y − 2)² = 9，展开得 x² + 2x + 1 + y² − 4y + 4 = 9，即 x² + y² + 2x − 4y − 4 = 0。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If cos α = 2/3 and 0 < α < π/2, then tan α =",
    stemZh: "若 cos α = 2/3，且 0 < α < π/2，则 tan α =",
    options: ["√3/3", "−√3/2", "2√5/5", "√5/2"],
    optionsZh: ["√3/3", "−√3/2", "2√5/5", "√5/2"],
    correct: 3,
    explanation:
      "Since α is in the first quadrant, sin α = √(1 − cos²α) = √(1 − 4/9) = √5/3. Therefore tan α = sin α/cos α = (√5/3)/(2/3) = √5/2.",
    explanationZh:
      "由 α 在第一象限，sin α = √(1 − cos²α) = √(1 − 4/9) = √5/3，故 tan α = sin α/cos α = (√5/3)/(2/3) = √5/2。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If {aₙ} is a geometric sequence with a₁ = −48 and a₄ = 6, then the common ratio q =",
    stemZh: "若数列 {aₙ} 是等比数列，a₁ = −48，a₄ = 6，则公比 q =",
    options: ["−1/2", "−2", "1/2", "2"],
    optionsZh: ["−1/2", "−2", "1/2", "2"],
    correct: 0,
    explanation:
      "a₄ = a₁q³ gives −48q³ = 6, so q³ = −1/8 and q = −1/2.",
    explanationZh:
      "由 a₄ = a₁q³，得 −48q³ = 6，q³ = −1/8，故 q = −1/2。",
    tags: ["sequences", "geometric"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "A circle passes through A(2, 2) and has centre (2, 0). Its equation is",
    stemZh: "过点 A(2, 2)，圆心在 (2, 0) 的圆的方程为",
    options: [
      "x² + (y − 2)² = 2",
      "(x − 2)² + y² = 4",
      "(x − 2)² + y² = 2",
      "(x − 2)² + (y − 2)² = 4",
    ],
    optionsZh: [
      "x² + (y − 2)² = 2",
      "(x − 2)² + y² = 4",
      "(x − 2)² + y² = 2",
      "(x − 2)² + (y − 2)² = 4",
    ],
    correct: 1,
    explanation:
      "The radius is r = √((2 − 2)² + (2 − 0)²) = 2, so the equation is (x − 2)² + y² = 4.",
    explanationZh:
      "半径 r = √((2 − 2)² + (2 − 0)²) = 2，故方程为 (x − 2)² + y² = 4。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "If a, b, c are rational numbers and a > b, which of the following statements is correct?",
    stemZh: "若 a，b，c 是有理数，且 a > b，下列说法正确的是",
    options: [
      "a + c > b + c",
      "a/c > b/c",
      "ac > bc",
      "a − c < b − c",
    ],
    optionsZh: [
      "a + c > b + c",
      "a/c > b/c",
      "ac > bc",
      "a − c < b − c",
    ],
    correct: 0,
    explanation:
      "Adding the same number c to both sides preserves the inequality, so a + c > b + c. Options B and C reverse when c < 0; D should read a − c > b − c.",
    explanationZh:
      "不等式两边同加同一个数 c，不等号方向不变，故 a + c > b + c；B、C 在 c < 0 时方向改变；D 应为 a − c > b − c。",
    tags: ["inequalities", "properties"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If the exponential function y = aˣ is monotonically decreasing, then the range of a is",
    stemZh: "若指数函数 y = aˣ 单调递减，则 a 的范围是",
    options: ["a > 0", "0 < a < 1", "a > 1", "a < 1"],
    optionsZh: ["a > 0", "0 < a < 1", "a > 1", "a < 1"],
    correct: 1,
    explanation:
      "For y = aˣ to be an exponential function we need a > 0 and a ≠ 1; it is decreasing exactly when 0 < a < 1. Option D also admits a ≤ 0, which cannot be a base.",
    explanationZh:
      "指数函数 y = aˣ 要求 a > 0 且 a ≠ 1；当 0 < a < 1 时函数单调递减。D 项 a < 1 还包含 a ≤ 0 的情形，不能作为底数。",
    tags: ["functions", "exponential", "monotonicity"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If sin α = 3/4, then cos 2α =",
    stemZh: "若 sin α = 3/4，则 cos 2α =",
    options: ["7/16", "−7/16", "1/8", "−1/8"],
    optionsZh: ["7/16", "−7/16", "1/8", "−1/8"],
    correct: 3,
    explanation:
      "cos 2α = 1 − 2sin²α = 1 − 2(9/16) = 1 − 9/8 = −1/8.",
    explanationZh:
      "由二倍角公式 cos 2α = 1 − 2sin²α = 1 − 2 × (9/16) = 1 − 9/8 = −1/8。",
    tags: ["trigonometry", "double angle"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The coordinates of the intersection of the lines l₁: 3x − y + 2 = 0 and l₂: 4x − y + 3 = 0 are",
    stemZh: "直线 l₁：3x − y + 2 = 0 与 l₂：4x − y + 3 = 0 的交点坐标为",
    options: ["(1, −1)", "(−1, −1)", "(−1, 1)", "(1, 1)"],
    optionsZh: ["(1, −1)", "(−1, −1)", "(−1, 1)", "(1, 1)"],
    correct: 1,
    explanation:
      "Subtracting the first equation from the second gives x + 1 = 0, so x = −1. Substituting into l₁: y = 3(−1) + 2 = −1. The intersection is (−1, −1).",
    explanationZh:
      "两式相减得 x + 1 = 0，即 x = −1；代入 l₁ 得 y = 3 × (−1) + 2 = −1，故交点为 (−1, −1)。",
    tags: ["analytic geometry", "lines", "intersection"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "If the eccentricity of the hyperbola x²/a² − y²/3 = 1 (a > 0) is e = 2, then a =",
    stemZh: "若双曲线 x²/a² − y²/3 = 1 (a > 0) 的离心率 e = 2，则 a =",
    options: ["2", "√6/2", "√5/2", "1"],
    optionsZh: ["2", "√6/2", "√5/2", "1"],
    correct: 3,
    explanation:
      "For this hyperbola c² = a² + 3. With e = c/a = 2 we get c = 2a, so 4a² = a² + 3 → a² = 1. Since a > 0, a = 1.",
    explanationZh:
      "双曲线中 c² = a² + 3，离心率 e = c/a = 2，故 c = 2a，4a² = a² + 3，解得 a² = 1，又 a > 0，故 a = 1。",
    tags: ["analytic geometry", "hyperbola", "eccentricity"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If the sequence {aₙ} is 1/2, −1/4, 1/8, …, then its general term is aₙ =",
    stemZh: "若数列 {aₙ} 为 1/2，−1/4，1/8，…，则通项公式 aₙ =",
    options: ["1/2ⁿ", "(−1)ⁿ⁻¹ · 1/2ⁿ", "1/2ⁿ⁻¹", "(−1)ⁿ · 1/2ⁿ"],
    optionsZh: ["1/2ⁿ", "(−1)ⁿ⁻¹ · 1/2ⁿ", "1/2ⁿ⁻¹", "(−1)ⁿ · 1/2ⁿ"],
    correct: 1,
    explanation:
      "The first term is 1/2 and the common ratio is −1/2. Thus aₙ = a₁qⁿ⁻¹ = (1/2)(−1/2)ⁿ⁻¹ = (−1)ⁿ⁻¹/2ⁿ.",
    explanationZh:
      "首项 a₁ = 1/2，公比 q = −1/2，故 aₙ = a₁qⁿ⁻¹ = (1/2)(−1/2)ⁿ⁻¹ = (−1)ⁿ⁻¹/2ⁿ。",
    tags: ["sequences", "geometric", "general term"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "(log₃ 27)(log₆₄ 16) =",
    stemZh: "(log₃ 27)(log₆₄ 16) =",
    options: ["1/6", "2", "6", "5"],
    optionsZh: ["1/6", "2", "6", "5"],
    correct: 1,
    explanation:
      "log₃ 27 = 3 and log₆₄ 16 = log₂ 16 / log₂ 64 = 4/6 = 2/3. Their product is 3 × 2/3 = 2.",
    explanationZh:
      "log₃ 27 = 3；log₆₄ 16 = log₂ 16 / log₂ 64 = 4/6 = 2/3；故乘积为 3 × 2/3 = 2。",
    tags: ["logarithms", "change of base"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "The minimum value of the function y = cos 5x + 4 is",
    stemZh: "函数 y = cos 5x + 4 的最小值为",
    options: ["5", "3", "4", "2"],
    optionsZh: ["5", "3", "4", "2"],
    correct: 1,
    explanation:
      "The minimum of cos 5x is −1, so the minimum of y is −1 + 4 = 3.",
    explanationZh:
      "cos 5x 的最小值为 −1，故 y 的最小值为 −1 + 4 = 3。",
    tags: ["trigonometry", "range"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "If the parabola y = ax² passes through the point (1, 2), then a =",
    stemZh: "若抛物线 y = ax² 过点 (1, 2)，则 a =",
    options: ["−1/2", "2", "1/2", "1"],
    optionsZh: ["−1/2", "2", "1/2", "1"],
    correct: 1,
    explanation:
      "Substitute (1, 2): 2 = a × 1², so a = 2.",
    explanationZh:
      "将 (1, 2) 代入 y = ax²，得 2 = a × 1²，故 a = 2。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which of the following lines is perpendicular to the line −2x + y − 2 = 0?",
    stemZh: "下列直线与直线 −2x + y − 2 = 0 垂直的是",
    options: [
      "2x + y − 2 = 0",
      "x + 2y − 2 = 0",
      "x + y − 2 = 0",
      "−x + 2y − 2 = 0",
    ],
    optionsZh: [
      "2x + y − 2 = 0",
      "x + 2y − 2 = 0",
      "x + y − 2 = 0",
      "−x + 2y − 2 = 0",
    ],
    correct: 1,
    explanation:
      "The given line −2x + y − 2 = 0 has slope 2, so a perpendicular line must have slope −1/2. Rewriting B as y = −x/2 + 1 confirms its slope is −1/2.",
    explanationZh:
      "已知直线斜率为 2，与其垂直的直线斜率应为 −1/2。B 项 x + 2y − 2 = 0 化为 y = −x/2 + 1，斜率为 −1/2，符合。",
    tags: ["analytic geometry", "lines", "perpendicular"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given cos α = −1/2 and α ∈ (π/2, π), then sin(α/2) =",
    stemZh: "已知 cos α = −1/2，α ∈ (π/2, π)，则 sin(α/2) =",
    options: ["1/2", "−√3/2", "√3/2", "−1/2"],
    optionsZh: ["1/2", "−√3/2", "√3/2", "−1/2"],
    correct: 2,
    explanation:
      "Since α ∈ (π/2, π), we have α/2 ∈ (π/4, π/2), where sine is positive. Using sin²(α/2) = (1 − cos α)/2 = (1 + 1/2)/2 = 3/4 gives sin(α/2) = √3/2.",
    explanationZh:
      "由 α ∈ (π/2, π)，得 α/2 ∈ (π/4, π/2)，其正弦为正。由半角公式 sin²(α/2) = (1 − cos α)/2 = (1 + 1/2)/2 = 3/4，故 sin(α/2) = √3/2。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "cos 75° =",
    stemZh: "cos 75° =",
    options: [
      "−(√6 + √2)/4",
      "(√2 − √6)/4",
      "(√6 + √2)/4",
      "(√6 − √2)/4",
    ],
    optionsZh: [
      "−(√6 + √2)/4",
      "(√2 − √6)/4",
      "(√6 + √2)/4",
      "(√6 − √2)/4",
    ],
    correct: 3,
    explanation:
      "cos 75° = cos(45° + 30°) = cos 45°cos 30° − sin 45°sin 30° = (√6 − √2)/4.",
    explanationZh:
      "cos 75° = cos(45° + 30°) = cos 45°cos 30° − sin 45°sin 30° = (√6 − √2)/4。",
    tags: ["trigonometry", "angle sum"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "If the domain of y = f(x) is (−1, 0), then the domain of y = f(x² − 1) is",
    stemZh: "若函数 y = f(x) 的定义域为 (−1, 0)，则函数 y = f(x² − 1) 的定义域为",
    options: ["[−1, 1]", "(−1, 1)", "(−1, 0) ∪ (0, 1)", "(−1, 0)"],
    optionsZh: ["[−1, 1]", "(−1, 1)", "(−1, 0) ∪ (0, 1)", "(−1, 0)"],
    correct: 2,
    explanation:
      "We need −1 < x² − 1 < 0, so 0 < x² < 1. This gives −1 < x < 1 with x ≠ 0, i.e. (−1, 0) ∪ (0, 1).",
    explanationZh:
      "令 −1 < x² − 1 < 0，得 0 < x² < 1，即 −1 < x < 1 且 x ≠ 0，故定义域为 (−1, 0) ∪ (0, 1)。",
    tags: ["functions", "domain", "composite"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If cos α = −7/25 and π/2 < α < π, then cos(α/2) =",
    stemZh: "若 cos α = −7/25，且 π/2 < α < π，则 cos(α/2) =",
    options: ["−4/5", "4/5", "3/5", "−3/5"],
    optionsZh: ["−4/5", "4/5", "3/5", "−3/5"],
    correct: 2,
    explanation:
      "Since α ∈ (π/2, π), α/2 ∈ (π/4, π/2), where cosine is positive. Then cos²(α/2) = (1 + cos α)/2 = (1 − 7/25)/2 = 9/25, so cos(α/2) = 3/5.",
    explanationZh:
      "由 α ∈ (π/2, π)，得 α/2 ∈ (π/4, π/2)，余弦为正。由半角公式 cos²(α/2) = (1 + cos α)/2 = (1 − 7/25)/2 = 9/25，故 cos(α/2) = 3/5。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which of the following equations is correct?",
    stemZh: "下列等式中正确的是",
    options: [
      "cos(π/2 + α) = sin α",
      "sin(π/2 + α) = cos α",
      "cos(π + α) = cos α",
      "sin(π + α) = sin α",
    ],
    optionsZh: [
      "cos(π/2 + α) = sin α",
      "sin(π/2 + α) = cos α",
      "cos(π + α) = cos α",
      "sin(π + α) = sin α",
    ],
    correct: 1,
    explanation:
      "Reduction formulas: cos(π/2 + α) = −sin α, sin(π/2 + α) = cos α, cos(π + α) = −cos α and sin(π + α) = −sin α. Only option B is correct.",
    explanationZh:
      "由诱导公式：cos(π/2 + α) = −sin α；sin(π/2 + α) = cos α；cos(π + α) = −cos α；sin(π + α) = −sin α。只有 B 正确。",
    tags: ["trigonometry", "reduction formulas"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "The minimum positive period of the function y = 2tan(3x + π/4) is",
    stemZh: "函数 y = 2tan(3x + π/4) 的最小正周期为",
    options: ["π/3", "2π", "π/4", "π"],
    optionsZh: ["π/3", "2π", "π/4", "π"],
    correct: 0,
    explanation:
      "The tangent function has period π, and the coefficient of x is 3, so the minimum positive period is T = π/3.",
    explanationZh:
      "正切函数 tan x 的周期为 π，x 的系数为 3，故最小正周期 T = π/3。",
    tags: ["trigonometry", "period"],
  },
  {
    topic: "M3.1",
    difficulty: "HARD",
    stem: "Ellipse C is centred at the origin, its foci lie on the y-axis, the focal distance is 4, and its eccentricity is 2/3. The equation of C is",
    stemZh: "椭圆 C 以原点为中心，焦点在 y 轴上，焦距为 4，离心率为 2/3，则 C 的方程为",
    options: [
      "x²/9 + y²/5 = 1",
      "x²/8 + y²/12 = 1",
      "x²/5 + y²/9 = 1",
      "x²/12 + y²/8 = 1",
    ],
    optionsZh: [
      "x²/9 + y²/5 = 1",
      "x²/8 + y²/12 = 1",
      "x²/5 + y²/9 = 1",
      "x²/12 + y²/8 = 1",
    ],
    correct: 2,
    explanation:
      "The focal distance 2c = 4 gives c = 2, and e = c/a = 2/3 gives a = 3. Then b² = a² − c² = 9 − 4 = 5. Since the foci lie on the y-axis, the larger denominator 9 goes with y²: x²/5 + y²/9 = 1.",
    explanationZh:
      "焦距 2c = 4，故 c = 2；离心率 e = c/a = 2/3，故 a = 3；b² = a² − c² = 9 − 4 = 5。焦点在 y 轴上，a² = 9 属于 y² 项，故方程为 x²/5 + y²/9 = 1。",
    tags: ["analytic geometry", "ellipse", "eccentricity"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "A sequence {aₙ} satisfies aₙ = (−1)ⁿ · 2aₙ₋₁ (n ≥ 2) and a₁ = 1/3. Then a₄ =",
    stemZh: "若数列 {aₙ} 满足 aₙ = (−1)ⁿ · 2aₙ₋₁ (n ≥ 2)，且 a₁ = 1/3，则 a₄ =",
    options: ["−16/3", "−8/3", "16/3", "8/3"],
    optionsZh: ["−16/3", "−8/3", "16/3", "8/3"],
    correct: 1,
    explanation:
      "Compute successively: a₂ = (−1)² × 2 × 1/3 = 2/3; a₃ = (−1)³ × 2 × 2/3 = −4/3; a₄ = (−1)⁴ × 2 × (−4/3) = −8/3.",
    explanationZh:
      "依次计算：a₂ = (−1)² × 2 × 1/3 = 2/3；a₃ = (−1)³ × 2 × 2/3 = −4/3；a₄ = (−1)⁴ × 2 × (−4/3) = −8/3。",
    tags: ["sequences", "recurrence"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "The domain of the function y = 1/lg|x − 5| is",
    stemZh: "函数 y = 1/lg|x − 5| 的定义域是",
    options: [
      "(−∞, 4) ∪ (4, 5) ∪ (5, 6) ∪ (6, +∞)",
      "(−∞, 4) ∪ (4, +∞)",
      "(−∞, 5) ∪ (5, 6) ∪ (6, +∞)",
      "(−∞, 5) ∪ (5, +∞)",
    ],
    optionsZh: [
      "(−∞, 4) ∪ (4, 5) ∪ (5, 6) ∪ (6, +∞)",
      "(−∞, 4) ∪ (4, +∞)",
      "(−∞, 5) ∪ (5, 6) ∪ (6, +∞)",
      "(−∞, 5) ∪ (5, +∞)",
    ],
    correct: 0,
    explanation:
      "We need |x − 5| > 0 and lg|x − 5| ≠ 0, so x ≠ 5 and |x − 5| ≠ 1, i.e. x ≠ 4, 5, 6. The domain is (−∞, 4) ∪ (4, 5) ∪ (5, 6) ∪ (6, +∞).",
    explanationZh:
      "需满足 |x − 5| > 0 且 lg|x − 5| ≠ 0，即 x ≠ 5 且 |x − 5| ≠ 1，故 x ≠ 4、5、6。定义域为 (−∞, 4) ∪ (4, 5) ∪ (5, 6) ∪ (6, +∞)。",
    tags: ["functions", "domain", "logarithms"],
  },
  {
    topic: "M3.1",
    difficulty: "HARD",
    stem: "Ellipse C has the same foci as the ellipse x²/4 + y²/9 = 1, and its minor axis has length 4√5. The equation of C is",
    stemZh: "椭圆 C 与椭圆 x²/4 + y²/9 = 1 有相同的焦点，且其短轴长为 4√5，则椭圆 C 的方程为",
    options: [
      "x²/20 + y²/25 = 1",
      "x²/25 + y²/20 = 1",
      "x²/20 + y²/45 = 1",
      "x²/80 + y²/85 = 1",
    ],
    optionsZh: [
      "x²/20 + y²/25 = 1",
      "x²/25 + y²/20 = 1",
      "x²/20 + y²/45 = 1",
      "x²/80 + y²/85 = 1",
    ],
    correct: 0,
    explanation:
      "For x²/4 + y²/9 = 1 the foci are on the y-axis with c² = 9 − 4 = 5. The new ellipse has minor axis 4√5, so b = 2√5 and b² = 20; then a² = b² + c² = 25. With foci on the y-axis, the equation is x²/20 + y²/25 = 1.",
    explanationZh:
      "已知椭圆中 c² = 9 − 4 = 5，焦点在 y 轴上。C 的短轴长 2b = 4√5，故 b = 2√5，b² = 20；a² = b² + c² = 25。焦点在 y 轴上，故 a² = 25 属于 y² 项，方程为 x²/20 + y²/25 = 1。",
    tags: ["analytic geometry", "ellipse", "foci"],
  },
  {
    topic: "M3.2",
    difficulty: "MEDIUM",
    stem: "Let ABCD be a square, E the midpoint of CD, $\\overrightarrow{AB} = \\vec{a}$ and $\\overrightarrow{AD} = \\vec{b}$. Then $\\overrightarrow{BE} =$",
    stemZh: "设 ABCD 是正方形，E 是 CD 的中点，$\\overrightarrow{AB} = \\vec{a}$，$\\overrightarrow{AD} = \\vec{b}$，则 $\\overrightarrow{BE} =$",
    options: [
      "$\\vec{a} - (1/2)\\vec{b}$",
      "$\\vec{b} - (1/2)\\vec{a}$",
      "$\\vec{a} + (1/2)\\vec{b}$",
      "$\\vec{b} + (1/2)\\vec{a}$",
    ],
    optionsZh: [
      "$\\vec{a} - (1/2)\\vec{b}$",
      "$\\vec{b} - (1/2)\\vec{a}$",
      "$\\vec{a} + (1/2)\\vec{b}$",
      "$\\vec{b} + (1/2)\\vec{a}$",
    ],
    correct: 1,
    explanation:
      "Take A as the origin: $B = \\vec{a}$, $D = \\vec{b}$, $C = \\vec{a} + \\vec{b}$. Since E is the midpoint of CD, $E = (C + D)/2 = \\vec{a}/2 + \\vec{b}$. Hence $\\overrightarrow{BE} = E - B = \\vec{b} - \\vec{a}/2$.",
    explanationZh:
      "以 A 为原点，则 $B = \\vec{a}$，$D = \\vec{b}$，$C = \\vec{a} + \\vec{b}$。E 为 CD 中点，故 $E = (C + D)/2 = \\vec{a}/2 + \\vec{b}$。于是 $\\overrightarrow{BE} = E - B = \\vec{b} - \\vec{a}/2$。",
    tags: ["vectors", "geometry"],
  },
  {
    topic: "M2.3",
    difficulty: "HARD",
    stem: "Let Sₙ be the sum of the first n terms of a geometric sequence {aₙ}, and suppose 2Sₙ = 3aₙ₊₁ − 3. Then Sₙ =",
    stemZh: "设等比数列 {aₙ} 的前 n 项和为 Sₙ，且 2Sₙ = 3aₙ₊₁ − 3，则 Sₙ =",
    options: [
      "(3/2)(5/3)ⁿ − 3/2",
      "(2/3)(5/3)ⁿ − 2/3",
      "(3/2)(3/5)ⁿ − 3/2",
      "(2/3)(3/5)ⁿ − 2/3",
    ],
    optionsZh: [
      "(3/2)(5/3)ⁿ − 3/2",
      "(2/3)(5/3)ⁿ − 2/3",
      "(3/2)(3/5)ⁿ − 3/2",
      "(2/3)(3/5)ⁿ − 2/3",
    ],
    correct: 0,
    explanation:
      "Subtracting the relation for n − 1 from the relation for n (n ≥ 2) gives 2aₙ = 3aₙ₊₁ − 3aₙ, so 3aₙ₊₁ = 5aₙ and q = 5/3. For n = 1: 2a₁ = 3a₂ − 3 = 5a₁ − 3, so a₁ = 1. Then Sₙ = (qⁿ − 1)/(q − 1) = (3/2)((5/3)ⁿ − 1) = (3/2)(5/3)ⁿ − 3/2.",
    explanationZh:
      "当 n ≥ 2 时，将相邻两式相减得 2aₙ = 3aₙ₊₁ − 3aₙ，即 3aₙ₊₁ = 5aₙ，公比 q = 5/3。令 n = 1，2a₁ = 3a₂ − 3 = 5a₁ − 3，得 a₁ = 1。故 Sₙ = (qⁿ − 1)/(q − 1) = (3/2)((5/3)ⁿ − 1) = (3/2)(5/3)ⁿ − 3/2。",
    tags: ["sequences", "geometric", "sum"],
  },
  {
    topic: "M3.3",
    difficulty: "MEDIUM",
    stem: "If a complex number z satisfies (z − 2i)(2 − i) = 5, then z =",
    stemZh: "若复数 z 满足方程 (z − 2i)(2 − i) = 5，则 z =",
    options: ["2 + 3i", "2 − 3i", "3 − 2i", "3 + 2i"],
    optionsZh: ["2 + 3i", "2 − 3i", "3 − 2i", "3 + 2i"],
    correct: 0,
    explanation:
      "From (z − 2i)(2 − i) = 5, z − 2i = 5/(2 − i) = 5(2 + i)/5 = 2 + i, hence z = 2 + 3i.",
    explanationZh:
      "由 (z − 2i)(2 − i) = 5，得 z − 2i = 5/(2 − i) = 5(2 + i)/5 = 2 + i，故 z = 2 + 3i。",
    tags: ["complex numbers", "division"],
  },
  {
    topic: "M2.3",
    difficulty: "HARD",
    stem: "The sum of the first n terms of a sequence {aₙ} is Sₙ = (2/3)aₙ + 1/3. Then the general term is aₙ =",
    stemZh: "若数列 {aₙ} 的前 n 项和 Sₙ = (2/3)aₙ + 1/3，则通项公式 aₙ =",
    options: ["(1/2)ⁿ⁻¹", "(−2)ⁿ⁻¹", "(−2)ⁿ", "−(1/2)ⁿ⁻¹"],
    optionsZh: ["(1/2)ⁿ⁻¹", "(−2)ⁿ⁻¹", "(−2)ⁿ", "−(1/2)ⁿ⁻¹"],
    correct: 1,
    explanation:
      "For n = 1: a₁ = (2/3)a₁ + 1/3 gives a₁ = 1. For n ≥ 2: aₙ = Sₙ − Sₙ₋₁ = (2/3)(aₙ − aₙ₋₁), so aₙ = −2aₙ₋₁. The sequence is geometric with ratio −2, hence aₙ = (−2)ⁿ⁻¹.",
    explanationZh:
      "令 n = 1，a₁ = (2/3)a₁ + 1/3，得 a₁ = 1。当 n ≥ 2 时，aₙ = Sₙ − Sₙ₋₁ = (2/3)(aₙ − aₙ₋₁)，即 aₙ = −2aₙ₋₁，故 {aₙ} 是首项为 1、公比为 −2 的等比数列，aₙ = (−2)ⁿ⁻¹。",
    tags: ["sequences", "sum", "general term"],
  },
  {
    topic: "M4.1",
    difficulty: "MEDIUM",
    stem: "An opaque bag contains 12 identical balls in red, black, yellow and green. The probability of drawing red is 1/3, of drawing yellow or green is 5/12, and of drawing black or yellow is also 5/12. The probabilities of drawing yellow, black and green are respectively",
    stemZh:
      "一个不透明袋子里有 12 个形状相同的球：红、黑、黄、绿各若干个。随机取一个球，取到红球的概率为 1/3，取到黄球或绿球的概率为 5/12，取到黑球或黄球的概率也为 5/12。则取到黄球、黑球、绿球的概率分别为",
    options: [
      "1/6, 1/4, 1/4",
      "1/3, 1/4, 1/6",
      "1/4, 1/5, 1/6",
      "1/5, 1/4, 1/6",
    ],
    optionsZh: [
      "1/6，1/4，1/4",
      "1/3，1/4，1/6",
      "1/4，1/5，1/6",
      "1/5，1/4，1/6",
    ],
    correct: 0,
    explanation:
      "There are 12 × 1/3 = 4 red balls. Writing y, b, g for yellow, black and green: y + g = 5, b + y = 5 and y + b + g = 8. Solving gives b = g = 3 and y = 2, so P(yellow) = 2/12 = 1/6, P(black) = 3/12 = 1/4 and P(green) = 3/12 = 1/4.",
    explanationZh:
      "红球有 12 × 1/3 = 4 个。设黄、黑、绿球数分别为 y、b、g，则 y + g = 5，b + y = 5，y + b + g = 8。解得 b = g = 3，y = 2。故 P(黄) = 2/12 = 1/6，P(黑) = 3/12 = 1/4，P(绿) = 3/12 = 1/4。",
    tags: ["probability", "counting"],
  },
];
