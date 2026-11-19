import { EXTRA_CONCEPTS } from "./concepts-extra";

export type ConceptSection = { heading: string; body: string };

export type Concept = {
  topicCode: string;
  subjectCode: "MATH" | "PHYS" | "CHEM" | "CH_HUM" | "CH_SCI";
  unitEn: string;
  titleEn: string;
  titleZh: string;
  summary: string;
  sections: ConceptSection[];
  formulas: string[];
  traps: string[];
  figureKey?: string;
};

/**
 * "Concept Clear" lessons — the teaching layer that sits before practice.
 * Content is version-controlled here (like the guides) so it can be reviewed
 * and edited without a database migration. Mathematics is authored first.
 */
export const CONCEPTS: Concept[] = [
  {
    topicCode: "M1.1",
    subjectCode: "MATH",
    unitEn: "Sets and Inequalities",
    titleEn: "Sets and their operations",
    titleZh: "集合的定义、运算与表示",
    summary:
      "A set is a collection of distinct objects. The exam tests notation, the three basic operations (union, intersection, complement) and counting with finite integer sets.",
    sections: [
      {
        heading: "Core idea",
        body: "Write sets with roster notation {1, 2, 3} or set-builder notation {x | x > 0}. A is a subset of B when every element of A is in B. The union A ∪ B keeps everything in either set; the intersection A ∩ B keeps only what is in both; the complement of A (written ∁A or A′) is everything in the universal set U that is not in A.",
      },
      {
        heading: "How to solve it fast",
        body: "For finite sets, draw a Venn diagram and label the counts in each region before answering. When asked for the number of elements, use |A ∪ B| = |A| + |B| − |A ∩ B|. For three sets, fill the innermost region first, then work outward.",
      },
    ],
    formulas: [
      "A ∪ B = {x : x ∈ A or x ∈ B}",
      "A ∩ B = {x : x ∈ A and x ∈ B}",
      "|A ∪ B| = |A| + |B| − |A ∩ B|",
      "∁A = {x ∈ U : x ∉ A}",
    ],
    traps: [
      "Empty set ∅ is a subset of every set, including itself.",
      "Do not double-count the overlap when adding sizes.",
      "The complement depends on the universal set U stated in the question.",
    ],
    figureKey: "venn",
  },
  {
    topicCode: "M1.2",
    subjectCode: "MATH",
    unitEn: "Sets and Inequalities",
    titleEn: "Inequalities and their solution sets",
    titleZh: "不等式及其解集",
    summary:
      "Solving an inequality is like solving an equation, except multiplying or dividing by a negative number flips the direction of the sign.",
    sections: [
      {
        heading: "Core idea",
        body: "Keep the variable isolated by doing the same operation to both sides. The solution is an interval: open brackets ( ) exclude the endpoint, square brackets [ ] include it. For a system, the answer is the overlap of the individual solution sets.",
      },
      {
        heading: "Quadratics and sign charts",
        body: "For ax² + bx + c > 0, find the roots, then test the sign of the parabola between and outside the roots. A positive leading coefficient gives a ∪-shape, so the expression is positive outside the roots and negative between them.",
      },
    ],
    formulas: [
      "If a < b then a + c < b + c",
      "If a < b and c > 0 then ac < bc",
      "If a < b and c < 0 then ac > bc",
      "|x| < a ⇔ −a < x < a",
    ],
    traps: [
      "Forgetting to flip the sign when multiplying/dividing by a negative.",
      "Turning a strict inequality into a non-strict one (or vice versa).",
      "Ignoring endpoints from a denominator that cannot be zero.",
    ],
    figureKey: "numberline",
  },
  {
    topicCode: "M2.1",
    subjectCode: "MATH",
    unitEn: "Functions",
    titleEn: "Concept and properties of functions",
    titleZh: "函数的概念与性质",
    summary:
      "A function maps each input in its domain to exactly one output. The exam tests domain, range, monotonicity, parity (even/odd), periodicity and inverses.",
    sections: [
      {
        heading: "Core idea",
        body: "The domain is the set of allowed inputs; the range is the set of outputs actually produced. A function is increasing where its slope is positive and decreasing where it is negative. Even functions satisfy f(−x) = f(x) (symmetric about the y-axis); odd functions satisfy f(−x) = −f(x) (symmetric about the origin).",
      },
      {
        heading: "Finding a domain",
        body: "Exclude values that make a denominator zero or put a negative number under an even root. For an inverse, swap x and y, then solve for y — the inverse exists only if the function is one-to-one on its domain.",
      },
    ],
    formulas: [
      "Even: f(−x) = f(x)",
      "Odd: f(−x) = −f(x)",
      "Increasing: f(x₁) < f(x₂) when x₁ < x₂",
      "Inverse: y = f(x) ⇒ x = f⁻¹(y)",
    ],
    traps: [
      "Assuming every function has an inverse — check it is one-to-one.",
      "Forgetting that the range of f is the domain of f⁻¹.",
      "Treating a vertical line as part of a function graph (it fails the vertical-line test).",
    ],
    figureKey: "parabola",
  },
  {
    topicCode: "M2.2",
    subjectCode: "MATH",
    unitEn: "Functions",
    titleEn: "Elementary functions",
    titleZh: "基本初等函数",
    summary:
      "The standard family: linear, quadratic, exponential, logarithmic and trigonometric functions. Know their shapes, domains and how transformations move them.",
    sections: [
      {
        heading: "Core idea",
        body: "Learn each graph by shape. y = x² is a parabola; y = aˣ grows (a > 1) or decays (0 < a < 1); y = logₐx is the inverse of the exponential and exists only for x > 0. For any base function y = f(x), the form y = f(x − h) + k shifts it right by h and up by k.",
      },
      {
        heading: "Working with exponentials and logs",
        body: "Convert between forms: aˣ = N ⇔ x = logₐN. Use log(ab) = log a + log b and log(aⁿ) = n log a to simplify. Exponential growth and decay problems usually reduce to solving aˣ = b by taking logs.",
      },
    ],
    formulas: [
      "aˣ = N ⇔ x = logₐ N",
      "log(ab) = log a + log b",
      "log(aⁿ) = n log a",
      "logₐ a = 1, logₐ 1 = 0",
    ],
    traps: [
      "Taking the log of a non-positive number.",
      "Mixing bases in the same equation without converting.",
      "Shifting the graph in the wrong direction for f(x − h).",
    ],
    figureKey: "graph",
  },
  {
    topicCode: "M2.3",
    subjectCode: "MATH",
    unitEn: "Functions",
    titleEn: "Sequences",
    titleZh: "数列",
    summary:
      "A sequence is an ordered list of numbers. Arithmetic sequences add a constant difference; geometric sequences multiply by a constant ratio. The exam frequently asks for a term or a sum.",
    sections: [
      {
        heading: "Core idea",
        body: "For an arithmetic sequence, each term adds d: aₙ = a₁ + (n − 1)d. For a geometric sequence, each term multiplies by r: aₙ = a₁·rⁿ⁻¹. Identify which type you have by comparing consecutive differences vs. ratios.",
      },
      {
        heading: "Sums and convergence",
        body: "The arithmetic sum is n/2·(a₁ + aₙ). The geometric sum is a₁(1 − rⁿ)/(1 − r) for r ≠ 1. An infinite geometric series converges to a₁/(1 − r) only when |r| < 1.",
      },
    ],
    formulas: [
      "aₙ = a₁ + (n − 1)d",
      "Sₙ = n/2 · (a₁ + aₙ)",
      "aₙ = a₁ · rⁿ⁻¹",
      "S∞ = a₁ / (1 − r), |r| < 1",
    ],
    traps: [
      "Miscounting the number of terms: from a₁ to aₙ there are n terms, not n − 1.",
      "Using the arithmetic formula on a geometric sequence.",
      "Applying the infinite-sum formula when |r| ≥ 1.",
    ],
    figureKey: "sequence",
  },
  {
    topicCode: "M2.4",
    subjectCode: "MATH",
    unitEn: "Functions",
    titleEn: "Derivatives and calculus basics",
    titleZh: "导数与微积分基础",
    summary:
      "The derivative measures the instantaneous rate of change — the slope of the tangent line. The exam tests the power, product, quotient and chain rules, and using f′ to find turning points.",
    sections: [
      {
        heading: "Core idea",
        body: "For powers, d/dx (xⁿ) = n·xⁿ⁻¹. The derivative is positive where a function rises and negative where it falls; setting f′(x) = 0 locates maxima, minima and stationary points. The second derivative tells you whether a stationary point is a maximum (f″ < 0) or minimum (f″ > 0).",
      },
      {
        heading: "Combining rules",
        body: "Product rule: (uv)′ = u′v + uv′. Quotient rule: (u/v)′ = (u′v − uv′)/v². Chain rule: d/dx f(g(x)) = f′(g(x))·g′(x) — differentiate the outside, keep the inside, multiply by the inside's derivative.",
      },
    ],
    formulas: [
      "d/dx (xⁿ) = n·xⁿ⁻¹",
      "(uv)′ = u′v + uv′",
      "(u/v)′ = (u′v − uv′)/v²",
      "d/dx f(g(x)) = f′(g(x))·g′(x)",
    ],
    traps: [
      "Dropping the inner derivative in the chain rule.",
      "Treating a constant as if it had a variable derivative.",
      "Confusing a stationary point with an inflection point.",
    ],
    figureKey: "tangent",
  },
  {
    topicCode: "M3.1",
    subjectCode: "MATH",
    unitEn: "Geometry and Algebra",
    titleEn: "Analytic geometry of the plane",
    titleZh: "平面解析几何",
    summary:
      "Coordinates turn geometry into algebra: lines, distances, midpoints, circles and conic sections. Most questions reduce to substituting coordinates into a formula.",
    sections: [
      {
        heading: "Lines and distance",
        body: "The slope between two points is (y₂ − y₁)/(x₂ − x₁). Parallel lines share a slope; perpendicular slopes multiply to −1. The distance formula is √((x₂ − x₁)² + (y₂ − y₁)²) and the midpoint is the average of the coordinates.",
      },
      {
        heading: "Circles and conics",
        body: "A circle with centre (h, k) and radius r is (x − h)² + (y − k)² = r². Recognise parabolas (y = ax²), ellipses (x²/a² + y²/b² = 1) and hyperbolas (x²/a² − y²/b² = 1) by their standard forms and key points.",
      },
    ],
    formulas: [
      "m = (y₂ − y₁)/(x₂ − x₁)",
      "d = √((x₂ − x₁)² + (y₂ − y₁)²)",
      "Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2)",
      "(x − h)² + (y − k)² = r²",
    ],
    traps: [
      "Forgetting the minus signs inside the circle brackets.",
      "Using the slope formula upside down.",
      "Assuming a line is perpendicular without checking m₁·m₂ = −1.",
    ],
    figureKey: "plane",
  },
  {
    topicCode: "M3.2",
    subjectCode: "MATH",
    unitEn: "Geometry and Algebra",
    titleEn: "Vectors",
    titleZh: "向量",
    summary:
      "A vector has magnitude and direction. The exam tests addition, scalar multiplication, the dot product and the angle between vectors.",
    sections: [
      {
        heading: "Core idea",
        body: "A vector in the plane is written (a, b) or ai + bj. Add vectors component by component. The magnitude is √(a² + b²) in 2D and √(a² + b² + c²) in 3D. Multiplying by a scalar changes length but not direction (a negative scalar reverses it).",
      },
      {
        heading: "Dot product and angle",
        body: "The dot product a·b = |a||b|cosθ measures alignment. In components, a·b = a₁b₁ + a₂b₂ (+ a₃b₃ in 3D). If a·b = 0 the vectors are perpendicular. Rearrange to find the angle: cosθ = (a·b)/(|a||b|).",
      },
    ],
    formulas: [
      "a·b = |a||b| cosθ",
      "a·b = a₁b₁ + a₂b₂",
      "|a| = √(a₁² + a₂²)",
      "a ⊥ b ⇔ a·b = 0",
    ],
    traps: [
      "Confusing the dot product (a number) with the cross product (a vector).",
      "Dropping the square root when computing magnitude.",
      "Using degrees vs. radians inconsistently in cosθ.",
    ],
    figureKey: "vector",
  },
  {
    topicCode: "M3.3",
    subjectCode: "MATH",
    unitEn: "Geometry and Algebra",
    titleEn: "Complex numbers",
    titleZh: "复数",
    summary:
      "Complex numbers extend the real line with i, where i² = −1. The exam tests arithmetic, conjugates, modulus and the Argand plane.",
    sections: [
      {
        heading: "Core idea",
        body: "Write a complex number as a + bi. Add and subtract component by component. Multiply using the distributive law and replace i² with −1. The conjugate of a + bi is a − bi, and multiplying by the conjugate removes i from a denominator.",
      },
      {
        heading: "Modulus and geometry",
        body: "The modulus |a + bi| = √(a² + b²) is the distance from the origin on the Argand plane. Division uses the conjugate: (a + bi)/(c + di) = (a + bi)(c − di)/(c² + d²). Powers of i repeat every four: i, −1, −i, 1.",
      },
    ],
    formulas: [
      "i² = −1",
      "z = a + bi, z̄ = a − bi",
      "|z| = √(a² + b²)",
      "z·z̄ = a² + b²",
    ],
    traps: [
      "Leaving i in the denominator instead of rationalising.",
      "Forgetting i² = −1 when expanding products.",
      "Confusing modulus (magnitude) with the conjugate.",
    ],
    figureKey: "complex",
  },
  {
    topicCode: "M3.4",
    subjectCode: "MATH",
    unitEn: "Geometry and Algebra",
    titleEn: "Spatial geometry",
    titleZh: "立体几何",
    summary:
      "Three-dimensional geometry: lines and planes in space, volumes and surface areas, and angles between lines and planes.",
    sections: [
      {
        heading: "Core idea",
        body: "Know the standard solids: cube, cuboid, prism, pyramid, cylinder, cone and sphere. Volume is a base area times a height (or a third of it for pyramids and cones); surface area is the sum of the faces. In coordinate space, use 3D vectors to find distances and angles.",
      },
      {
        heading: "Angles in space",
        body: "The angle between a line and a plane is measured between the line and its projection on the plane. The angle between two planes is the angle between their normal vectors. Volume of a sphere is 4/3·πr³; surface area is 4πr².",
      },
    ],
    formulas: [
      "Cylinder V = πr²h",
      "Cone V = ⅓πr²h",
      "Sphere V = 4/3 πr³, S = 4πr²",
      "Pyramid V = ⅓ × base area × height",
    ],
    traps: [
      "Forgetting the ⅓ for cones and pyramids.",
      "Mixing up radius and diameter.",
      "Measuring a line-plane angle with the wrong projection.",
    ],
    figureKey: "solid",
  },
  {
    topicCode: "M4.1",
    subjectCode: "MATH",
    unitEn: "Probability and Statistics",
    titleEn: "Classical probability",
    titleZh: "古典概率",
    summary:
      "Classical probability is favourable outcomes divided by total equally likely outcomes. The exam tests independent events, conditional probability and combinations.",
    sections: [
      {
        heading: "Core idea",
        body: "P(A) = (number of favourable outcomes)/(total equally likely outcomes). For independent events, multiply: P(A and B) = P(A)·P(B). For either event, P(A or B) = P(A) + P(B) − P(A and B). The complement rule: P(not A) = 1 − P(A).",
      },
      {
        heading: "Counting",
        body: "If order matters, use permutations; if it does not, use combinations C(n, k) = n!/(k!(n − k)!). Conditional probability P(A|B) = P(A and B)/P(B). Many 'at least one' problems are easiest via the complement.",
      },
    ],
    formulas: [
      "P(A) = favourable / total",
      "P(A and B) = P(A)P(B) if independent",
      "P(A or B) = P(A) + P(B) − P(A and B)",
      "P(A|B) = P(A and B)/P(B)",
    ],
    traps: [
      "Adding probabilities for independent events instead of multiplying.",
      "Forgetting to subtract the overlap in P(A or B).",
      "Treating dependent events as independent.",
    ],
    figureKey: "dice",
  },
  {
    topicCode: "M4.2",
    subjectCode: "MATH",
    unitEn: "Probability and Statistics",
    titleEn: "Numerical characteristics of data",
    titleZh: "数据的数字特征",
    summary:
      "Summarise a data set with central tendency (mean, median, mode) and spread (range, variance, standard deviation).",
    sections: [
      {
        heading: "Core idea",
        body: "The mean is the sum divided by the count; the median is the middle value when sorted; the mode is the most frequent value. The median is more robust when the data contain outliers. Range is max − min.",
      },
      {
        heading: "Variance and standard deviation",
        body: "Variance measures average squared distance from the mean: σ² = Σ(x − μ)²/n (population) or divided by n − 1 (sample). Standard deviation is the square root of variance and is in the same units as the data.",
      },
    ],
    formulas: [
      "Mean μ = Σx / n",
      "Variance σ² = Σ(x − μ)² / n",
      "Standard deviation σ = √σ²",
      "Range = max − min",
    ],
    traps: [
      "Forgetting to square the deviations before averaging.",
      "Using the mean when an outlier makes the median more appropriate.",
      "Confusing population (n) and sample (n − 1) denominators.",
    ],
    figureKey: "histogram",
  },
  {
    topicCode: "M4.3",
    subjectCode: "MATH",
    unitEn: "Probability and Statistics",
    titleEn: "Normal distribution basics",
    titleZh: "正态分布基础",
    summary:
      "The normal distribution is a symmetric bell curve described by its mean μ and standard deviation σ. The exam tests the 68–95–99.7 rule and standardisation.",
    sections: [
      {
        heading: "Core idea",
        body: "A normal distribution is centred on the mean and symmetric about it. About 68% of values lie within one standard deviation of the mean, 95% within two, and 99.7% within three. The total area under the curve is 1.",
      },
      {
        heading: "Standardising",
        body: "Convert any normal value to a z-score: z = (x − μ)/σ. A z-score tells you how many standard deviations the value is from the mean, so you can compare across different distributions.",
      },
    ],
    formulas: [
      "68% within μ ± σ",
      "95% within μ ± 2σ",
      "99.7% within μ ± 3σ",
      "z = (x − μ)/σ",
    ],
    traps: [
      "Assuming a distribution is normal without being told.",
      "Using σ instead of σ² (variance) in the wrong formula.",
      "Misreading 'within one standard deviation' as one unit.",
    ],
    figureKey: "bell",
  },
  ...EXTRA_CONCEPTS,
];

export const CONCEPT_MAP = new Map(CONCEPTS.map((concept) => [concept.topicCode, concept]));

export function conceptsForSubject(subjectCode: string) {
  return CONCEPTS.filter((concept) => concept.subjectCode === subjectCode);
}
