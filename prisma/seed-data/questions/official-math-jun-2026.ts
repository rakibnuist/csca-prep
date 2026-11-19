import type { SeedQuestion } from "../types";

/**
 * Official CSCA Mathematics past paper — June 2026 sitting.
 *
 * Transcribed from the official paper and answer key (bilingual CN/EN).
 * Kept free for study, attributed to the original source. No diagram items
 * appear on this sitting.
 */
export const officialMathJun2026Questions: SeedQuestion[] = [
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "If the set A = {x | x² = 1}, which of the following representations is correct?",
    stemZh: "若集合 A = {x | x² = 1}，则下列表示正确的是",
    options: ["A = −1", "{1} ⊆ A", "1 ⊆ A", "A = {1}"],
    optionsZh: ["A = −1", "{1} ⊆ A", "1 ⊆ A", "A = {1}"],
    correct: 1,
    explanation:
      "x² = 1 gives x = 1 or x = −1, so A = {−1, 1}. Since 1 ∈ A, the set {1} is a subset of A: {1} ⊆ A. Option C misuses ⊆ between an element and a set, and D omits −1.",
    explanationZh:
      "由 x² = 1 得 x = 1 或 x = −1，故 A = {−1, 1}。因为 1 ∈ A，所以集合 {1} 是 A 的子集，即 {1} ⊆ A。C 项把元素与集合用 ⊆ 连接，D 项漏掉了 −1。",
    tags: ["sets", "subsets"],
  },
  {
    topic: "M1.1",
    difficulty: "EASY",
    stem: "If A = {1, 2, 3} and B = {2, 3, …, 2026}, then A ∩ B =",
    stemZh: "若集合 A = {1, 2, 3}，B = {2, 3, …, 2026}，则 A ∩ B =",
    options: ["{2, 3}", "{1, 2, 3}", "{2, 3, …, 2026}", "{1, 2, …, 2026}"],
    optionsZh: ["{2, 3}", "{1, 2, 3}", "{2, 3, …, 2026}", "{1, 2, …, 2026}"],
    correct: 0,
    explanation:
      "The intersection contains elements common to both sets. 1 is not in B because B starts at 2, while 2 and 3 are in both. Thus A ∩ B = {2, 3}.",
    explanationZh:
      "交集由两个集合的公共元素组成。B 从 2 开始，故 1 不属于 B；2、3 同时属于 A 和 B。因此 A ∩ B = {2, 3}。",
    tags: ["sets", "intersection"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "The solution set of the quadratic inequality 3(x + 4)(x − 2) < 0 is",
    stemZh: "一元二次不等式 3(x + 4)(x − 2) < 0 的解集为",
    options: ["(2, +∞)", "(−4, 2)", "(−∞, −4) ∪ (2, +∞)", "(−∞, 2) ∪ (−4, +∞)"],
    optionsZh: ["(2, +∞)", "(−4, 2)", "(−∞, −4) ∪ (2, +∞)", "(−∞, 2) ∪ (−4, +∞)"],
    correct: 1,
    explanation:
      "The roots are x = −4 and x = 2. The upward parabola is negative between the roots, so −4 < x < 2, i.e. (−4, 2).",
    explanationZh:
      "两根为 x = −4 和 x = 2。开口向上的抛物线在两根之间为负，故 −4 < x < 2，即 (−4, 2)。",
    tags: ["inequalities", "quadratic"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "The domain of the function y = 1/(x − 1) + 1/(x − 2) + 1/(x − 3) is",
    stemZh: "函数 y = 1/(x − 1) + 1/(x − 2) + 1/(x − 3) 的定义域为",
    options: [
      "(−∞, 1) ∪ (1, 2) ∪ (2, 3) ∪ (3, +∞)",
      "{1, 2, 3}",
      "[1, 3]",
      "ℝ",
    ],
    optionsZh: [
      "(−∞, 1) ∪ (1, 2) ∪ (2, 3) ∪ (3, +∞)",
      "{1, 2, 3}",
      "[1, 3]",
      "ℝ",
    ],
    correct: 0,
    explanation:
      "Each denominator must be non-zero, so x ≠ 1, x ≠ 2 and x ≠ 3. Excluding these three points gives (−∞, 1) ∪ (1, 2) ∪ (2, 3) ∪ (3, +∞).",
    explanationZh:
      "各分母均不能为零，故 x ≠ 1，x ≠ 2，x ≠ 3。去掉这三个点，定义域为 (−∞, 1) ∪ (1, 2) ∪ (2, 3) ∪ (3, +∞)。",
    tags: ["functions", "domain"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "If point P(x, y) lies in the second quadrant, then point Q(2x, 3y) lies in",
    stemZh: "若点 P(x, y) 位于第二象限，则点 Q(2x, 3y) 位于",
    options: ["the fourth quadrant", "the third quadrant", "the second quadrant", "the first quadrant"],
    optionsZh: ["第四象限", "第三象限", "第二象限", "第一象限"],
    correct: 2,
    explanation:
      "In the second quadrant x < 0 and y > 0. Multiplying by positive numbers preserves the signs: 2x < 0 and 3y > 0, so Q is also in the second quadrant.",
    explanationZh:
      "第二象限内 x < 0，y > 0。乘以正数不改变符号，故 2x < 0，3y > 0，Q 仍在第二象限。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which of the following results is correct?",
    stemZh: "下列结果正确的是",
    options: [
      "tan(π/3) = 2",
      "cos(π/3) = 1/2",
      "sin π = 1",
      "sin(π/3) = 1/2",
    ],
    optionsZh: [
      "tan(π/3) = 2",
      "cos(π/3) = 1/2",
      "sin π = 1",
      "sin(π/3) = 1/2",
    ],
    correct: 1,
    explanation:
      "cos(π/3) = 1/2. The others are false: tan(π/3) = √3, sin π = 0 and sin(π/3) = √3/2.",
    explanationZh:
      "cos(π/3) = 1/2。其余均错：tan(π/3) = √3，sin π = 0，sin(π/3) = √3/2。",
    tags: ["trigonometry", "special angles"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Which of the following statements about the odd function y = f(x) is incorrect?",
    stemZh: "下列关于奇函数 y = f(x) 的说法不正确的是",
    options: [
      "The domain of the function is symmetric about the origin",
      "In the domain, f(−x) = f(x)",
      "The graph of the function is symmetric about the origin",
      "In the domain, f(−x) = −f(x)",
    ],
    optionsZh: [
      "函数的定义域关于原点对称",
      "在定义域内，f(−x) = f(x)",
      "函数的图象关于原点对称",
      "在定义域内，f(−x) = −f(x)",
    ],
    correct: 1,
    explanation:
      "An odd function satisfies f(−x) = −f(x), and its domain and graph are symmetric about the origin. The statement f(−x) = f(x) defines an even function, so option B is incorrect.",
    explanationZh:
      "奇函数满足 f(−x) = −f(x)，其定义域和图象均关于原点对称。f(−x) = f(x) 是偶函数的定义，故 B 项错误。",
    tags: ["functions", "parity"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "The inverse function of y = 2x, x ∈ [−1, 1] is",
    stemZh: "函数 y = 2x，x ∈ [−1, 1] 的反函数是",
    options: [
      "y = x/2, x ∈ [−1, 1]",
      "y = x/2",
      "y = x/2, x ∈ [−2, 2]",
      "y = 2x, x ∈ [−1, 1]",
    ],
    optionsZh: [
      "y = x/2，x ∈ [−1, 1]",
      "y = x/2",
      "y = x/2，x ∈ [−2, 2]",
      "y = 2x，x ∈ [−1, 1]",
    ],
    correct: 2,
    explanation:
      "The original function maps [−1, 1] onto [−2, 2]. Solving y = 2x gives x = y/2, and swapping x and y gives y = x/2. The inverse's domain is the original range: x ∈ [−2, 2].",
    explanationZh:
      "原函数的值域为 [−2, 2]。由 y = 2x 反解得 x = y/2，互换 x、y 得 y = x/2，其定义域为原函数的值域 [−2, 2]。",
    tags: ["functions", "inverse"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which of the following functions is monotonically decreasing?",
    stemZh: "下列函数中单调递减的是",
    options: ["y = 1/eˣ", "y = x² − 1", "y = 100x", "y = cos x"],
    optionsZh: ["y = 1/eˣ", "y = x² − 1", "y = 100x", "y = cos x"],
    correct: 0,
    explanation:
      "y = 1/eˣ = e⁻ˣ is a decreasing exponential function on ℝ. The parabola y = x² − 1 is not monotonic on ℝ, y = 100x is increasing, and y = cos x is not monotonic on ℝ.",
    explanationZh:
      "y = 1/eˣ = e⁻ˣ 在 ℝ 上单调递减。y = x² − 1 在 ℝ 上不单调，y = 100x 单调递增，y = cos x 在 ℝ 上不单调。",
    tags: ["functions", "monotonicity", "exponential"],
  },
  {
    topic: "M1.2",
    difficulty: "MEDIUM",
    stem: "The solution set of the rational inequality 2/(x − 2) ≤ 0 is",
    stemZh: "分式不等式 2/(x − 2) ≤ 0 的解集为",
    options: ["(−∞, 2)", "(2, +∞)", "[0, 2]", "(−∞, 2]"],
    optionsZh: ["(−∞, 2)", "(2, +∞)", "[0, 2]", "(−∞, 2]"],
    correct: 0,
    explanation:
      "The numerator is always positive, so the fraction is at most zero exactly when the denominator is negative: x − 2 < 0, i.e. x < 2. At x = 2 the fraction is undefined, so the endpoint is excluded.",
    explanationZh:
      "分子恒为正，故分式 ≤ 0 等价于分母为负：x − 2 < 0，即 x < 2。x = 2 时分式无意义，故不包含端点。",
    tags: ["inequalities", "rational"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "Which of the following points lies in the third quadrant?",
    stemZh: "下列点位于第三象限的是",
    options: ["(−1, −2)", "(−1, 2)", "(1, 2)", "(1, −2)"],
    optionsZh: ["(−1, −2)", "(−1, 2)", "(1, 2)", "(1, −2)"],
    correct: 0,
    explanation:
      "The third quadrant requires x < 0 and y < 0. Only (−1, −2) satisfies both conditions.",
    explanationZh:
      "第三象限要求 x < 0 且 y < 0，只有 (−1, −2) 同时满足。",
    tags: ["analytic geometry", "quadrants"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If a, b, c form a geometric sequence and ac = 100, then b =",
    stemZh: "已知 a，b，c 构成等比数列，且 ac = 100，则 b =",
    options: ["±100", "10", "100", "±10"],
    optionsZh: ["±100", "10", "100", "±10"],
    correct: 3,
    explanation:
      "In a geometric sequence the middle term satisfies b² = ac. Here b² = 100, so b = 10 or b = −10.",
    explanationZh:
      "等比数列中，中间项的平方等于两端项之积：b² = ac = 100，故 b = ±10。",
    tags: ["sequences", "geometric"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "If a line passes through the points (−1, 1) and (0, 2), its angle of inclination is",
    stemZh: "若直线经过点 (−1, 1) 和 (0, 2)，则直线的倾斜角为",
    options: ["135°", "30°", "45°", "60°"],
    optionsZh: ["135°", "30°", "45°", "60°"],
    correct: 2,
    explanation:
      "The slope is k = (2 − 1)/(0 − (−1)) = 1. Since tan θ = 1, the angle of inclination is θ = 45°.",
    explanationZh:
      "斜率 k = (2 − 1)/(0 − (−1)) = 1。由 tan θ = 1，得倾斜角 θ = 45°。",
    tags: ["analytic geometry", "lines", "slope"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If point P(1, 2) lies on the terminal side of angle α, then sin α =",
    stemZh: "若点 P(1, 2) 是角 α 的终边上的点，则 sin α =",
    options: ["√5/5", "√2/2", "1/2", "2√5/5"],
    optionsZh: ["√5/5", "√2/2", "1/2", "2√5/5"],
    correct: 3,
    explanation:
      "The distance from the origin is r = √(1² + 2²) = √5. Thus sin α = y/r = 2/√5 = 2√5/5.",
    explanationZh:
      "点 P 到原点的距离 r = √(1² + 2²) = √5，故 sin α = y/r = 2/√5 = 2√5/5。",
    tags: ["trigonometry", "definitions"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The slope of the line passing through A(−1, 1) and B(2, 3) is",
    stemZh: "经过点 A(−1, 1)，B(2, 3) 的直线的斜率为",
    options: ["2/3", "−2/3", "3/2", "−3/2"],
    optionsZh: ["2/3", "−2/3", "3/2", "−3/2"],
    correct: 0,
    explanation:
      "k = (3 − 1)/(2 − (−1)) = 2/3.",
    explanationZh:
      "由斜率公式 k = (3 − 1)/(2 − (−1)) = 2/3。",
    tags: ["analytic geometry", "lines", "slope"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If {aₙ} is an arithmetic sequence with a₁ = 1 and d = 2, then a₉ =",
    stemZh: "已知 {aₙ} 是等差数列，且 a₁ = 1，d = 2，则 a₉ =",
    options: ["20", "18", "19", "17"],
    optionsZh: ["20", "18", "19", "17"],
    correct: 3,
    explanation:
      "aₙ = a₁ + (n − 1)d, so a₉ = 1 + 8 × 2 = 17.",
    explanationZh:
      "由 aₙ = a₁ + (n − 1)d，得 a₉ = 1 + 8×2 = 17。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The distance from point P(a, b) to point Q(a + 1, b − 1) is",
    stemZh: "点 P(a, b) 到点 Q(a + 1, b − 1) 的距离为",
    options: ["√((2a + 1)² + (2b − 1)²)", "2", "√2", "4"],
    optionsZh: ["√((2a + 1)² + (2b − 1)²)", "2", "√2", "4"],
    correct: 2,
    explanation:
      "|PQ| = √((a + 1 − a)² + (b − 1 − b)²) = √(1² + (−1)²) = √2.",
    explanationZh:
      "|PQ| = √((a + 1 − a)² + (b − 1 − b)²) = √(1² + (−1)²) = √2。",
    tags: ["analytic geometry", "distance"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The equation of the line passing through the origin with slope 2 is",
    stemZh: "过原点并且斜率为 2 的直线方程是",
    options: ["y = x + 2", "y = x", "y = 2x", "y = 2x + 2"],
    optionsZh: ["y = x + 2", "y = x", "y = 2x", "y = 2x + 2"],
    correct: 2,
    explanation:
      "A line through the origin has y-intercept 0, so y = kx. With k = 2, the equation is y = 2x.",
    explanationZh:
      "过原点的直线截距为 0，故方程为 y = kx；k = 2 时即 y = 2x。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "The equation of the circle centred at (2, 5) with radius 5 is",
    stemZh: "圆心为 (2, 5)，半径为 5 的圆的方程是",
    options: [
      "(x − 2)² + (y − 5)² = 5",
      "(x − 2)² + (y − 5)² = 25",
      "(x + 2)² + (y + 5)² = 25",
      "(x − 5)² + (y − 2)² = 25",
    ],
    optionsZh: [
      "(x − 2)² + (y − 5)² = 5",
      "(x − 2)² + (y − 5)² = 25",
      "(x + 2)² + (y + 5)² = 25",
      "(x − 5)² + (y − 2)² = 25",
    ],
    correct: 1,
    explanation:
      "The standard equation is (x − a)² + (y − b)² = r². With centre (2, 5) and r = 5, this is (x − 2)² + (y − 5)² = 25.",
    explanationZh:
      "圆的标准方程为 (x − a)² + (y − b)² = r²。圆心 (2, 5)，半径 5，故 (x − 2)² + (y − 5)² = 25。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If cos²α = 1/2, then tan α =",
    stemZh: "若 cos²α = 1/2，则 tan α =",
    options: ["1", "±1", "2", "1/2"],
    optionsZh: ["1", "±1", "2", "1/2"],
    correct: 1,
    explanation:
      "sin²α = 1 − cos²α = 1/2. Thus tan²α = sin²α/cos²α = 1, so tan α = 1 or tan α = −1.",
    explanationZh:
      "sin²α = 1 − cos²α = 1/2，故 tan²α = sin²α/cos²α = 1，因此 tan α = ±1。",
    tags: ["trigonometry", "identities"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "If the general term of the geometric sequence {aₙ} is aₙ = 2·(−1)ⁿ⁺¹, which statement is correct?",
    stemZh: "已知等比数列 {aₙ} 的通项公式为 aₙ = 2·(−1)ⁿ⁺¹，则",
    options: [
      "The common ratio is q = −2",
      "The first term is a₁ = −2",
      "The 100th term is a₁₀₀ = 2",
      "The sum of the first 10 terms is 0",
    ],
    optionsZh: [
      "数列的公比为 q = −2",
      "数列的首项为 a₁ = −2",
      "数列的第 100 项为 a₁₀₀ = 2",
      "前 10 项之和等于 0",
    ],
    correct: 3,
    explanation:
      "The terms are 2, −2, 2, −2, …; the common ratio is −1 and a₁ = 2, so A and B are false. a₁₀₀ = 2(−1)¹⁰¹ = −2, so C is false. The first 10 terms form five pairs summing to zero, so S₁₀ = 0.",
    explanationZh:
      "数列为 2, −2, 2, −2, …，公比为 −1，a₁ = 2，故 A、B 错误；a₁₀₀ = 2(−1)¹⁰¹ = −2，C 错误。前 10 项两两成对、每对和为 0，故 S₁₀ = 0。",
    tags: ["sequences", "geometric", "sum"],
  },
  {
    topic: "M1.2",
    difficulty: "EASY",
    stem: "If a > b and c ∈ ℝ, then",
    stemZh: "已知 a > b，c ∈ ℝ，则",
    options: ["a² > b²", "ac > bc", "a + c > b + c", "|a| > |b|"],
    optionsZh: ["a² > b²", "ac > bc", "a + c > b + c", "|a| > |b|"],
    correct: 2,
    explanation:
      "Adding the same number to both sides preserves the inequality, so a + c > b + c. The other options fail for some values: squaring or absolute values can reverse the order, and multiplying by a negative c reverses the inequality.",
    explanationZh:
      "不等式两边同加同一个数，不等号方向不变，故 a + c > b + c。其余选项在部分取值下不成立：平方或绝对值可能改变大小关系，乘以负数 c 会使不等号反向。",
    tags: ["inequalities", "properties"],
  },
  {
    topic: "M2.1",
    difficulty: "EASY",
    stem: "Which of the following statements about the function y = x² is correct?",
    stemZh: "下列关于函数 y = x² 的说法正确的是",
    options: [
      "The graph is symmetric about the origin",
      "The function is monotonically decreasing on its domain",
      "The graph is symmetric about the y-axis",
      "The function is monotonically increasing on its domain",
    ],
    optionsZh: [
      "函数的图象关于原点对称",
      "函数在定义域上单调递减",
      "函数的图象关于 y 轴对称",
      "函数在定义域上单调递增",
    ],
    correct: 2,
    explanation:
      "f(−x) = (−x)² = x² = f(x), so y = x² is even and its graph is symmetric about the y-axis. It decreases on (−∞, 0) and increases on (0, +∞), so it is not monotonic on ℝ.",
    explanationZh:
      "f(−x) = (−x)² = x² = f(x)，故 y = x² 是偶函数，图象关于 y 轴对称。它在 (−∞, 0) 上递减、在 (0, +∞) 上递增，故在 ℝ 上不单调。",
    tags: ["functions", "parity", "monotonicity"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If {aₙ} is an arithmetic sequence with a₁ = 1 and a₂ = 3, then a₅ =",
    stemZh: "若数列 {aₙ} 是等差数列，且 a₁ = 1，a₂ = 3，则 a₅ =",
    options: ["11", "5", "9", "7"],
    optionsZh: ["11", "5", "9", "7"],
    correct: 2,
    explanation:
      "The common difference is d = 3 − 1 = 2, so a₅ = a₁ + 4d = 1 + 8 = 9.",
    explanationZh:
      "公差 d = 3 − 1 = 2，故 a₅ = a₁ + 4d = 1 + 8 = 9。",
    tags: ["sequences", "arithmetic"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "If sin²α = 1/4, then cos 2α =",
    stemZh: "若 sin²α = 1/4，则 cos 2α =",
    options: ["−7/8", "7/8", "1/2", "−1/2"],
    optionsZh: ["−7/8", "7/8", "1/2", "−1/2"],
    correct: 2,
    explanation:
      "cos 2α = 1 − 2sin²α = 1 − 2(1/4) = 1/2.",
    explanationZh:
      "由 cos 2α = 1 − 2sin²α = 1 − 2×(1/4) = 1/2。",
    tags: ["trigonometry", "double angle"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Line l₁ is y = x + 3, and line l₂ passes through A(1, 0) and B(0, 1). Their intersection is",
    stemZh: "已知直线 l₁：y = x + 3，直线 l₂ 经过 A(1, 0) 和 B(0, 1)，则 l₁ 与 l₂ 的交点为",
    options: ["(−3/2, 3/2)", "(−2, 1)", "(−1, 2)", "(0, 3)"],
    optionsZh: ["(−3/2, 3/2)", "(−2, 1)", "(−1, 2)", "(0, 3)"],
    correct: 2,
    explanation:
      "The slope of l₂ is (1 − 0)/(0 − 1) = −1, so l₂: y = −x + 1. Setting x + 3 = −x + 1 gives x = −1 and y = 2, so the intersection is (−1, 2).",
    explanationZh:
      "l₂ 的斜率 = (1 − 0)/(0 − 1) = −1，故 l₂：y = −x + 1。联立 x + 3 = −x + 1，得 x = −1，y = 2，交点为 (−1, 2)。",
    tags: ["analytic geometry", "lines", "intersection"],
  },
  {
    topic: "M3.1",
    difficulty: "EASY",
    stem: "A circle passes through A(2, 2) and has centre (2, 0). Its equation is",
    stemZh: "若圆过点 A(2, 2)，圆心为 (2, 0)，则该圆的方程为",
    options: [
      "(x − 2)² + (y − 2)² = 4",
      "(x − 2)² + y² = 2",
      "(x − 2)² + y² = 4",
      "x² + (y − 2)² = 2",
    ],
    optionsZh: [
      "(x − 2)² + (y − 2)² = 4",
      "(x − 2)² + y² = 2",
      "(x − 2)² + y² = 4",
      "x² + (y − 2)² = 2",
    ],
    correct: 2,
    explanation:
      "The radius is the distance from (2, 0) to (2, 2): r = 2. With centre (2, 0), the equation is (x − 2)² + y² = 4.",
    explanationZh:
      "半径 r 为圆心 (2, 0) 到 A(2, 2) 的距离，r = 2。故方程为 (x − 2)² + y² = 4。",
    tags: ["analytic geometry", "circle"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "The foci of the hyperbola x²/16 − y²/9 = 1 are",
    stemZh: "双曲线 x²/16 − y²/9 = 1 的焦点为",
    options: ["(±25, 0)", "(0, ±25)", "(0, ±5)", "(±5, 0)"],
    optionsZh: ["(±25, 0)", "(0, ±25)", "(0, ±5)", "(±5, 0)"],
    correct: 3,
    explanation:
      "Here a² = 16 and b² = 9. For a hyperbola c² = a² + b² = 25, so c = 5. The positive x² term means the transverse axis is horizontal, so the foci are (±5, 0).",
    explanationZh:
      "双曲线中 a² = 16，b² = 9，c² = a² + b² = 25，故 c = 5。x² 项为正，实轴在 x 轴上，故焦点为 (±5, 0)。",
    tags: ["analytic geometry", "hyperbola"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "(log₅ 8)/(log₂₅ 4) + log₅ 1 =",
    stemZh: "(log₅ 8)/(log₂₅ 4) + log₅ 1 =",
    options: ["3", "2", "0", "4"],
    optionsZh: ["3", "2", "0", "4"],
    correct: 0,
    explanation:
      "log₂₅ 4 = log₅ 4 / log₅ 25 = (log₅ 4)/2. Thus the ratio is 2log₅ 8/log₅ 4 = 2(3log₅ 2)/(2log₅ 2) = 3. Since log₅ 1 = 0, the result is 3.",
    explanationZh:
      "log₂₅ 4 = log₅ 4 / log₅ 25 = (log₅ 4)/2，故原式比值 = 2log₅ 8/log₅ 4 = 2(3log₅ 2)/(2log₅ 2) = 3。又 log₅ 1 = 0，结果为 3。",
    tags: ["logarithms", "change of base"],
  },
  {
    topic: "M2.3",
    difficulty: "EASY",
    stem: "If the sequence {aₙ} is 1/2, −1/4, 1/8, …, then its general term is aₙ =",
    stemZh: "若数列 {aₙ} 为 1/2，−1/4，1/8，…，则通项 aₙ =",
    options: ["(1/2)ⁿ⁻¹", "1/2ⁿ", "(−1)ⁿ⁻¹ · 1/2ⁿ", "(−1)ⁿ · 1/2ⁿ"],
    optionsZh: ["(1/2)ⁿ⁻¹", "1/2ⁿ", "(−1)ⁿ⁻¹ · 1/2ⁿ", "(−1)ⁿ · 1/2ⁿ"],
    correct: 2,
    explanation:
      "The first term is 1/2 and the common ratio is −1/2. Then aₙ = (1/2)(−1/2)ⁿ⁻¹ = (−1)ⁿ⁻¹/2ⁿ.",
    explanationZh:
      "首项为 1/2，公比为 −1/2，故 aₙ = (1/2)(−1/2)ⁿ⁻¹ = (−1)ⁿ⁻¹/2ⁿ。",
    tags: ["sequences", "geometric", "general term"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which of the following statements about y = cos x is correct?",
    stemZh: "下列关于函数 y = cos x 的说法正确的是",
    options: [
      "The graph is symmetric about the origin",
      "The function has infinitely many zeros",
      "cos π = cos 2π",
      "The function is monotonically increasing on [2π, 3π]",
    ],
    optionsZh: [
      "函数的图象关于原点对称",
      "函数有无数个零点",
      "cos π = cos 2π",
      "函数在 [2π, 3π] 上单调递增",
    ],
    correct: 1,
    explanation:
      "cos x is even, so its graph is symmetric about the y-axis, not the origin. It has zeros at x = π/2 + kπ for every integer k, so there are infinitely many. cos π = −1 and cos 2π = 1, and cos x decreases on [2π, 3π].",
    explanationZh:
      "cos x 是偶函数，图象关于 y 轴对称，不关于原点对称；零点为 x = π/2 + kπ（k ∈ ℤ），有无数个；cos π = −1，cos 2π = 1；在 [2π, 3π] 上 cos x 单调递减。故只有 B 正确。",
    tags: ["trigonometry", "properties"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Which statement about the parabola y = x²/4 is correct?",
    stemZh: "关于抛物线 y = x²/4，下列说法正确的是",
    options: [
      "The axis of symmetry is y = 0",
      "The parabola passes through (4, −4)",
      "The focus is (0, ±1)",
      "The directrix is y = −1",
    ],
    optionsZh: [
      "对称轴为 y = 0",
      "抛物线过点 (4, −4)",
      "焦点为 (0, ±1)",
      "准线为 y = −1",
    ],
    correct: 3,
    explanation:
      "Rewrite as x² = 4y, which has the standard form x² = 4py with p = 1. The axis is x = 0, the focus is (0, 1), and the directrix is y = −1. The point (4, −4) does not satisfy the equation.",
    explanationZh:
      "化为 x² = 4y，与标准形式 x² = 4py 比较得 p = 1。对称轴为 x = 0，焦点为 (0, 1)，准线为 y = −1；点 (4, −4) 不满足方程。",
    tags: ["analytic geometry", "parabola"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "For the lines l₁: x + 2y + 1 = 0, l₂: x − y = 0 and l₃: 2x − y + 8 = 0, which statement is correct?",
    stemZh: "关于三条直线 l₁：x + 2y + 1 = 0，l₂：x − y = 0，l₃：2x − y + 8 = 0，下列说法正确的是",
    options: [
      "l₁ is parallel to l₃",
      "l₁ is perpendicular to l₂",
      "l₁ is parallel to l₂",
      "l₁ is perpendicular to l₃",
    ],
    optionsZh: ["l₁ 平行于 l₃", "l₁ 垂直于 l₂", "l₁ 平行于 l₂", "l₁ 垂直于 l₃"],
    correct: 3,
    explanation:
      "The slopes are k₁ = −1/2, k₂ = 1 and k₃ = 2. Since k₁k₃ = −1, l₁ is perpendicular to l₃. No pair is parallel, and k₁k₂ ≠ −1.",
    explanationZh:
      "三线斜率分别为 k₁ = −1/2，k₂ = 1，k₃ = 2。因为 k₁k₃ = −1，故 l₁ ⊥ l₃。没有平行线，且 k₁k₂ ≠ −1。",
    tags: ["analytic geometry", "lines"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given tan(π/4) = 1 and tan(π/6) = √3/3, then tan(π/12) =",
    stemZh: "已知 tan(π/4) = 1，tan(π/6) = √3/3，则 tan(π/12) =",
    options: ["1 − √3/3", "1 + √3/3", "2 − √3", "2 + √3"],
    optionsZh: ["1 − √3/3", "1 + √3/3", "2 − √3", "2 + √3"],
    correct: 2,
    explanation:
      "tan(π/12) = tan(π/4 − π/6) = (1 − √3/3)/(1 + √3/3) = (3 − √3)/(3 + √3) = 2 − √3 after rationalising.",
    explanationZh:
      "tan(π/12) = tan(π/4 − π/6) = (1 − √3/3)/(1 + √3/3) = (3 − √3)/(3 + √3)，分母有理化得 2 − √3。",
    tags: ["trigonometry", "angle difference"],
  },
  {
    topic: "M2.1",
    difficulty: "MEDIUM",
    stem: "The domain of y = √(x + 3)/(x − 2) + 3log x is",
    stemZh: "函数 y = √(x + 3)/(x − 2) + 3log x 的定义域是",
    options: [
      "[−3, +∞)",
      "(−3, 0) ∪ (0, 2) ∪ (2, +∞)",
      "(0, 2) ∪ (2, +∞)",
      "[−3, 0) ∪ (0, 2) ∪ (2, +∞)",
    ],
    optionsZh: [
      "[−3, +∞)",
      "(−3, 0) ∪ (0, 2) ∪ (2, +∞)",
      "(0, 2) ∪ (2, +∞)",
      "[−3, 0) ∪ (0, 2) ∪ (2, +∞)",
    ],
    correct: 2,
    explanation:
      "The square root requires x ≥ −3, the denominator requires x ≠ 2, and log x requires x > 0. The strictest lower bound is x > 0, so the domain is (0, 2) ∪ (2, +∞).",
    explanationZh:
      "根式要求 x ≥ −3，分母要求 x ≠ 2，对数要求 x > 0。取最严格的下界 x > 0，故定义域为 (0, 2) ∪ (2, +∞)。",
    tags: ["functions", "domain", "logarithms"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "If α ∈ [3π/2, 2π] and cos α = 3/5, then sin(α/2) =",
    stemZh: "若 α ∈ [3π/2, 2π]，且 cos α = 3/5，则 sin(α/2) =",
    options: ["√5/5", "±√5/5", "±2√5/5", "2√5/5"],
    optionsZh: ["√5/5", "±√5/5", "±2√5/5", "2√5/5"],
    correct: 0,
    explanation:
      "sin²(α/2) = (1 − cos α)/2 = (1 − 3/5)/2 = 1/5. Since α/2 ∈ [3π/4, π], the sine is positive, so sin(α/2) = 1/√5 = √5/5.",
    explanationZh:
      "sin²(α/2) = (1 − cos α)/2 = (1 − 3/5)/2 = 1/5。由 α/2 ∈ [3π/4, π] 知正弦为正，故 sin(α/2) = 1/√5 = √5/5。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "EASY",
    stem: "Which reduction formula is correct?",
    stemZh: "关于诱导公式，下列表达式正确的是",
    options: [
      "sin(π + α) = sin α",
      "cos(2π − α) = cos α",
      "tan(π + α) = −tan α",
      "sin(π/2 + α) = sin α",
    ],
    optionsZh: [
      "sin(π + α) = sin α",
      "cos(2π − α) = cos α",
      "tan(π + α) = −tan α",
      "sin(π/2 + α) = sin α",
    ],
    correct: 1,
    explanation:
      "cos(2π − α) = cos(−α) = cos α. The others are false: sin(π + α) = −sin α, tan(π + α) = tan α and sin(π/2 + α) = cos α.",
    explanationZh:
      "cos(2π − α) = cos(−α) = cos α。其余错误：sin(π + α) = −sin α，tan(π + α) = tan α，sin(π/2 + α) = cos α。",
    tags: ["trigonometry", "reduction formulas"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Given cos α = −1/2 and α ∈ (π/2, π), then sin(α/2) =",
    stemZh: "已知 cos α = −1/2，α ∈ (π/2, π)，则 sin(α/2) =",
    options: ["−1/2", "−√3/2", "1/2", "√3/2"],
    optionsZh: ["−1/2", "−√3/2", "1/2", "√3/2"],
    correct: 3,
    explanation:
      "sin²(α/2) = (1 − cos α)/2 = (1 + 1/2)/2 = 3/4. Since α/2 ∈ (π/4, π/2), the sine is positive, so sin(α/2) = √3/2.",
    explanationZh:
      "sin²(α/2) = (1 − cos α)/2 = (1 + 1/2)/2 = 3/4。由 α/2 ∈ (π/4, π/2) 知正弦为正，故 sin(α/2) = √3/2。",
    tags: ["trigonometry", "half angle"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Which statement about y = tan(−2x) is correct?",
    stemZh: "下列关于函数 y = tan(−2x) 的说法，正确的是",
    options: [
      "The function is bounded on its domain",
      "The domain of the function is ℝ",
      "The fundamental period is π",
      "The function is monotonically decreasing on (−π/4, π/4)",
    ],
    optionsZh: [
      "函数在定义域上有界",
      "函数的定义域为 ℝ",
      "函数的最小正周期为 π",
      "函数在 (−π/4, π/4) 上单调递减",
    ],
    correct: 3,
    explanation:
      "tan(−2x) = −tan(2x). The tangent is unbounded and undefined at x = π/4 + kπ/2, and its period is π/2. On (−π/4, π/4), tan(2x) is increasing, so −tan(2x) is decreasing.",
    explanationZh:
      "tan(−2x) = −tan(2x)。正切函数无界，且在 x = π/4 + kπ/2 处无定义，周期为 π/2。在 (−π/4, π/4) 上 tan(2x) 递增，故 −tan(2x) 递减。",
    tags: ["trigonometry", "properties"],
  },
  {
    topic: "M3.1",
    difficulty: "HARD",
    stem: "Ellipse C is centred at the origin, its foci are on the y-axis, the focal distance is 4 and the eccentricity is 2/3. The equation of C is",
    stemZh: "若椭圆 C 的中心在原点，焦点在 y 轴上，焦距为 4，离心率为 2/3，则 C 的方程是",
    options: [
      "x²/12 + y²/8 = 1",
      "x²/9 + y²/5 = 1",
      "x²/5 + y²/9 = 1",
      "x²/8 + y²/12 = 1",
    ],
    optionsZh: [
      "x²/12 + y²/8 = 1",
      "x²/9 + y²/5 = 1",
      "x²/5 + y²/9 = 1",
      "x²/8 + y²/12 = 1",
    ],
    correct: 2,
    explanation:
      "The focal distance 2c = 4 gives c = 2, and e = c/a = 2/3 gives a = 3. Then b² = a² − c² = 9 − 4 = 5. With foci on the y-axis, a² = 9 goes under y², so the equation is x²/5 + y²/9 = 1.",
    explanationZh:
      "焦距 2c = 4，故 c = 2；e = c/a = 2/3，故 a = 3；b² = a² − c² = 9 − 4 = 5。焦点在 y 轴上，a² = 9 属于 y² 项，故方程为 x²/5 + y²/9 = 1。",
    tags: ["analytic geometry", "ellipse"],
  },
  {
    topic: "M2.3",
    difficulty: "HARD",
    stem: "If the sum of the first n terms of {aₙ} is Sₙ = n³ + n² + n, then aₙ =",
    stemZh: "若数列 {aₙ} 的前 n 项和 Sₙ = n³ + n² + n，则通项 aₙ =",
    options: ["3n² − n + 1", "n² + n + 1", "3n² + n + 1", "3n² + 2n + 1"],
    optionsZh: ["3n² − n + 1", "n² + n + 1", "3n² + n + 1", "3n² + 2n + 1"],
    correct: 0,
    explanation:
      "For n ≥ 2, aₙ = Sₙ − Sₙ₋₁ = (n³ + n² + n) − ((n − 1)³ + (n − 1)² + (n − 1)) = 3n² − n + 1. For n = 1, S₁ = 3 and 3(1)² − 1 + 1 = 3, so the formula holds for all n.",
    explanationZh:
      "当 n ≥ 2 时，aₙ = Sₙ − Sₙ₋₁ = (n³ + n² + n) − ((n−1)³ + (n−1)² + (n−1)) = 3n² − n + 1。n = 1 时 S₁ = 3，而 3×1² − 1 + 1 = 3，故通项公式对一切 n 成立。",
    tags: ["sequences", "sum", "general term"],
  },
  {
    topic: "M2.2",
    difficulty: "MEDIUM",
    stem: "Which statement about logarithmic functions is correct?",
    stemZh: "关于对数函数，下面说法正确的是",
    options: [
      "log₂ 3 < log₃ 5",
      "If logₐ x > logₐ x² (a > 1), then 0 < x < 1",
      "log₁₀₀ 10 = log₁₀ 1",
      "If logₐ x > log_b x, then a > b",
    ],
    optionsZh: [
      "log₂ 3 < log₃ 5",
      "若 logₐ x > logₐ x²（a > 1），则 0 < x < 1",
      "log₁₀₀ 10 = log₁₀ 1",
      "若 logₐ x > log_b x，则 a > b",
    ],
    correct: 1,
    explanation:
      "Since a > 1, logₐ is increasing, so logₐ x > logₐ x² gives x > x², hence 0 < x < 1. A is false because log₂ 3 ≈ 1.585 > log₃ 5 ≈ 1.465; C is false because log₁₀₀ 10 = 1/2 ≠ 0; D is not generally true.",
    explanationZh:
      "a > 1 时 logₐ 单调递增，故 logₐ x > logₐ x² 推出 x > x²，即 0 < x < 1。A 错：log₂ 3 ≈ 1.585 > log₃ 5 ≈ 1.465；C 错：log₁₀₀ 10 = 1/2 ≠ 0；D 不一定成立。",
    tags: ["logarithms", "monotonicity"],
  },
  {
    topic: "M3.1",
    difficulty: "MEDIUM",
    stem: "Which statement about the ellipse x²/a² + y²/b² = 1 (a, b > 0) is correct?",
    stemZh: "下列关于椭圆 x²/a² + y²/b² = 1（a, b > 0）的说法，正确的是",
    options: [
      "The foci lie on the x-axis",
      "The sum of the distances from any point on the ellipse to the two foci equals 2a",
      "The centre of the ellipse is at the origin",
      "The eccentricity is e = b/a",
    ],
    optionsZh: [
      "椭圆的焦点在 x 轴上",
      "椭圆上任意一点到两焦点距离之和等于 2a",
      "椭圆的中心在原点",
      "椭圆的离心率为 e = b/a",
    ],
    correct: 2,
    explanation:
      "The centre of x²/a² + y²/b² = 1 is always the origin. The foci lie on the x-axis only when a > b, and the distance sum is 2 max(a, b), not necessarily 2a. The eccentricity is c/max(a, b), not b/a.",
    explanationZh:
      "椭圆 x²/a² + y²/b² = 1 的中心恒为原点。焦点只有在 a > b 时才在 x 轴上；距离之和为 2max(a, b)，不一定等于 2a；离心率为 c/max(a, b)，不是 b/a。",
    tags: ["analytic geometry", "ellipse"],
  },
  {
    topic: "M3.2",
    difficulty: "HARD",
    stem: "Plane vectors a and b satisfy |a| = 1, |b| = 1 and a·b = −1/2. Let c = λa + (1 − λ)b (λ ∈ ℝ). The minimum value of |c| is",
    stemZh: "已知平面向量 a、b 满足 |a| = 1，|b| = 1，a·b = −1/2，且 c = λa + (1 − λ)b（λ ∈ ℝ），则 |c| 的最小值为",
    options: ["1/2", "√3/2", "1", "√2/2"],
    optionsZh: ["1/2", "√3/2", "1", "√2/2"],
    correct: 0,
    explanation:
      "|c|² = λ² + (1 − λ)² + 2λ(1 − λ)(−1/2) = 3λ² − 3λ + 1. This quadratic has its minimum at λ = 1/2, where |c|² = 1/4, so |c|min = 1/2.",
    explanationZh:
      "|c|² = λ² + (1 − λ)² + 2λ(1 − λ)(−1/2) = 3λ² − 3λ + 1。该二次函数在 λ = 1/2 时取最小值 1/4，故 |c| 的最小值为 1/2。",
    tags: ["vectors", "dot product", "minimum"],
  },
  {
    topic: "M2.3",
    difficulty: "HARD",
    stem: "Let Sₙ be the sum of the first n terms of a geometric sequence {aₙ}, and 2Sₙ = 3aₙ₊₁ − 3 (n = 1, 2, …). Then Sₙ =",
    stemZh: "设等比数列 {aₙ} 的前 n 项和为 Sₙ，且 2Sₙ = 3aₙ₊₁ − 3（n = 1, 2, …），则 Sₙ =",
    options: [
      "(2/3)(3/5)ⁿ − 2/3",
      "(3/2)(5/3)ⁿ − 3/2",
      "(3/2)(3/5)ⁿ − 3/2",
      "(3/2)(5/3)ⁿ − 2/3",
    ],
    optionsZh: [
      "(2/3)(3/5)ⁿ − 2/3",
      "(3/2)(5/3)ⁿ − 3/2",
      "(3/2)(3/5)ⁿ − 3/2",
      "(3/2)(5/3)ⁿ − 2/3",
    ],
    correct: 1,
    explanation:
      "For n ≥ 2, subtracting 2Sₙ₋₁ = 3aₙ − 3 from 2Sₙ = 3aₙ₊₁ − 3 gives 2aₙ = 3aₙ₊₁ − 3aₙ, so 3aₙ₊₁ = 5aₙ and q = 5/3. For n = 1, 2a₁ = 3a₂ − 3 = 5a₁ − 3 gives a₁ = 1. Hence Sₙ = (3/2)((5/3)ⁿ − 1) = (3/2)(5/3)ⁿ − 3/2.",
    explanationZh:
      "当 n ≥ 2 时，由 2Sₙ = 3aₙ₊₁ − 3 与 2Sₙ₋₁ = 3aₙ − 3 相减得 2aₙ = 3aₙ₊₁ − 3aₙ，即 3aₙ₊₁ = 5aₙ，公比 q = 5/3。n = 1 时 2a₁ = 3a₂ − 3 = 5a₁ − 3，得 a₁ = 1。故 Sₙ = (3/2)((5/3)ⁿ − 1) = (3/2)(5/3)ⁿ − 3/2。",
    tags: ["sequences", "geometric", "sum"],
  },
  {
    topic: "M3.3",
    difficulty: "MEDIUM",
    stem: "If z = −1 + i, where i is the imaginary unit, then (z + 1)/(z + 2) + (z + 2)/(z + 1) =",
    stemZh: "若 z = −1 + i（i 为虚数单位），则 (z + 1)/(z + 2) + (z + 2)/(z + 1) =",
    options: ["3/2 + i/2", "2", "3/2 − i/2", "1"],
    optionsZh: ["3/2 + i/2", "2", "3/2 − i/2", "1"],
    correct: 2,
    explanation:
      "z + 1 = i and z + 2 = 1 + i. Then i/(1 + i) = (1 + i)/2 and (1 + i)/i = 1 − i. Their sum is 3/2 − i/2.",
    explanationZh:
      "z + 1 = i，z + 2 = 1 + i。则 i/(1 + i) = (1 + i)/2，(1 + i)/i = 1 − i，相加得 3/2 − i/2。",
    tags: ["complex numbers", "division"],
  },
  {
    topic: "M2.3",
    difficulty: "MEDIUM",
    stem: "If {aₙ} satisfies a₁ = 1/2 and aₙ₊₁ = aₙ/(1 + 2aₙ), and bₙ = 1/aₙ, then Sₙ = b₁ + b₂ + … + bₙ =",
    stemZh: "已知 {aₙ} 满足 a₁ = 1/2，aₙ₊₁ = aₙ/(1 + 2aₙ)，令 bₙ = 1/aₙ，则 Sₙ = b₁ + b₂ + … + bₙ =",
    options: ["n(n + 1)", "n(n − 1)", "n²/2", "n²"],
    optionsZh: ["n(n + 1)", "n(n − 1)", "n²/2", "n²"],
    correct: 0,
    explanation:
      "bₙ₊₁ = 1/aₙ₊₁ = (1 + 2aₙ)/aₙ = 1/aₙ + 2 = bₙ + 2, so {bₙ} is arithmetic with d = 2. Since b₁ = 2, bₙ = 2n. Then Sₙ = 2(1 + 2 + … + n) = n(n + 1).",
    explanationZh:
      "bₙ₊₁ = 1/aₙ₊₁ = (1 + 2aₙ)/aₙ = 1/aₙ + 2 = bₙ + 2，故 {bₙ} 是公差为 2 的等差数列。又 b₁ = 2，故 bₙ = 2n，Sₙ = 2(1 + 2 + … + n) = n(n + 1)。",
    tags: ["sequences", "recurrence", "sum"],
  },
  {
    topic: "M4.1",
    difficulty: "HARD",
    stem: "There are n white balls with distinct labels and n red balls with distinct labels. n balls are randomly selected. Let P(n) be the probability that the colours alternate (white, red, white, … or red, white, red, …). Which relation is correct?",
    stemZh:
      "已知有 n 个编号互不相同的白球和 n 个编号互不相同的红球。现从中随机取出 n 个球，设取出球的颜色交替出现的概率为 P(n)，颜色交替指取出的 n 个球按第 1 个白、第 2 个红、第 3 个白、第 4 个红……或第 1 个红、第 2 个白、第 3 个红、第 4 个白……排列。则下列关系正确的是",
    options: ["P(2) > P(4) > P(6)", "P(2) > P(6) > P(4)", "P(6) > P(4) > P(2)", "P(4) > P(2) > P(6)"],
    optionsZh: ["P(2) > P(4) > P(6)", "P(2) > P(6) > P(4)", "P(6) > P(4) > P(2)", "P(4) > P(2) > P(6)"],
    correct: 0,
    explanation:
      "An alternating selection of n balls needs exactly n/2 white and n/2 red when n is even (or counts differing by one when n is odd). The probability is C(n, n/2)²/C(2n, n) for even n. It is 2/3 for n = 2, 18/35 ≈ 0.514 for n = 4 and 400/924 ≈ 0.433 for n = 6, so P(2) > P(4) > P(6).",
    explanationZh:
      "颜色交替要求取出的白、红球数量尽量相等：n 为偶数时各取 n/2 个，概率为 C(n, n/2)²/C(2n, n)。n = 2 时为 2/3，n = 4 时为 18/35 ≈ 0.514，n = 6 时为 400/924 ≈ 0.433，故 P(2) > P(4) > P(6)。",
    tags: ["probability", "counting"],
  },
];
