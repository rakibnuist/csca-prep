import type { SeedQuestion } from "../types";

export const chemistryQuestions: SeedQuestion[] = [
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following is a pure substance?",
    stemZh: "下列物质中属于纯净物的是？",
    options: ["Air", "Distilled water", "Sea water", "Bronze"],
    optionsZh: ["空气", "蒸馏水", "海水", "青铜"],
    correct: 1,
    explanation:
      "Distilled water contains only H₂O molecules, so it is a pure substance. Air, sea water and bronze each contain two or more substances and are mixtures.",
    explanationZh:
      "蒸馏水只含 H₂O 分子，属于纯净物。空气、海水和青铜都含有两种或两种以上物质，属于混合物。",
    tags: ["pure substance", "mixture", "classification"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Calcium carbonate (CaCO₃) is classified as:",
    stemZh: "碳酸钙（CaCO₃）属于哪一类物质？",
    options: ["An acid", "A base", "A salt", "An oxide"],
    optionsZh: ["酸", "碱", "盐", "氧化物"],
    correct: 2,
    explanation:
      "CaCO₃ is composed of the metal cation Ca²⁺ and the acid radical CO₃²⁻, so it is a salt. It is not an oxide, because it contains three elements (Ca, C, O), not two.",
    explanationZh:
      "CaCO₃ 由金属阳离子 Ca²⁺ 与酸根离子 CO₃²⁻ 构成，因此属于盐。它不是氧化物，因为它含 Ca、C、O 三种元素，而不是两种。",
    tags: ["salt", "classification", "inorganic"],
  },
  {
    topic: "C1.1",
    difficulty: "MEDIUM",
    stem: "Which statement about the classification of matter is correct?",
    stemZh: "下列关于物质分类的说法正确的是？",
    options: [
      "A mixture contains two or more substances, each of which keeps its own properties.",
      "A compound can be separated into its elements by filtration.",
      "An element can be broken down into simpler substances by a chemical reaction.",
      "Every pure substance is an element.",
    ],
    optionsZh: [
      "混合物中含有两种或两种以上物质，各物质都保持各自的化学性质。",
      "化合物可以通过过滤分离成它的组成元素。",
      "单质可以通过化学反应分解成更简单的物质。",
      "所有纯净物都是单质。",
    ],
    correct: 0,
    explanation:
      "In a mixture the components are not chemically combined and keep their own properties. Compounds are broken down only by chemical means, elements cannot be decomposed chemically, and pure substances include both elements and compounds.",
    explanationZh:
      "混合物中各组分没有发生化学反应，各自保持原有的化学性质。化合物只能通过化学方法分解；单质不能用化学方法再分解；纯净物既包括单质也包括化合物。",
    tags: ["mixture", "compound", "element"],
  },
  {
    topic: "C1.2",
    difficulty: "MEDIUM",
    stem: "For the reaction __Fe + __O₂ → __Fe₃O₄, the sum of the lowest whole-number coefficients is:",
    stemZh: "对于反应 __Fe + __O₂ → __Fe₃O₄，最简整数系数之和是？",
    options: ["5", "6", "7", "8"],
    optionsZh: ["5", "6", "7", "8"],
    correct: 1,
    explanation:
      "Balancing gives 3Fe + 2O₂ → Fe₃O₄ (3 Fe and 4 O on each side), so the coefficient sum is 3 + 2 + 1 = 6.",
    explanationZh:
      "配平后为 3Fe + 2O₂ → Fe₃O₄（两边各有 3 个 Fe 和 4 个 O），系数之和为 3 + 2 + 1 = 6。",
    tags: ["balancing equations", "coefficients"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "The chemical formula of aluminium sulfate is:",
    stemZh: "硫酸铝的化学式是？",
    options: ["AlSO₄", "Al₃(SO₄)₂", "Al(SO₄)₃", "Al₂(SO₄)₃"],
    optionsZh: ["AlSO₄", "Al₃(SO₄)₂", "Al(SO₄)₃", "Al₂(SO₄)₃"],
    correct: 3,
    explanation:
      "Al has a valency of +3 and the sulfate ion SO₄²⁻ has a charge of −2. The lowest common multiple is 6, so the formula is Al₂(SO₄)₃.",
    explanationZh:
      "铝的化合价为 +3，硫酸根 SO₄²⁻ 的电荷为 −2。最小公倍数为 6，因此化学式为 Al₂(SO₄)₃。",
    tags: ["chemical formula", "valency"],
  },
  {
    topic: "C1.2",
    difficulty: "HARD",
    stem: "In the balanced equation aKMnO₄ + bHCl → KCl + MnCl₂ + cCl₂↑ + dH₂O, the coefficient b is:",
    stemZh: "在配平后的方程式 aKMnO₄ + bHCl → KCl + MnCl₂ + cCl₂↑ + dH₂O 中，系数 b 是？",
    options: ["5", "8", "10", "16"],
    optionsZh: ["5", "8", "10", "16"],
    correct: 3,
    explanation:
      "The balanced equation is 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O. Mn goes from +7 to +2 (5 e⁻ gained per Mn, 10 e⁻ for 2 Mn), and 2Cl⁻ → Cl₂ loses 2 e⁻, so 5Cl₂ are needed to supply 10 e⁻. Balancing K, H and O then gives b = 16.",
    explanationZh:
      "配平后的方程式为 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O。Mn 由 +7 降到 +2，每个 Mn 得 5 个电子，2 个 Mn 共得 10 个电子；2Cl⁻ → Cl₂ 失去 2 个电子，因此需要 5 个 Cl₂ 提供 10 个电子。再配平 K、H、O 即得 b = 16。",
    tags: ["balancing equations", "redox", "electron transfer"],
  },
  {
    topic: "C1.3",
    difficulty: "MEDIUM",
    stem: "What is the pH of a 0.010 mol/L HCl solution at 25 °C?",
    stemZh: "25 °C 时，0.010 mol/L 盐酸溶液的 pH 是多少？",
    options: ["1", "1.5", "2", "12"],
    optionsZh: ["1", "1.5", "2", "12"],
    correct: 2,
    explanation:
      "HCl is a strong acid and dissociates completely: [H⁺] = 0.010 mol/L = 10⁻² mol/L, so pH = −lg(10⁻²) = 2.",
    explanationZh:
      "HCl 是强酸，完全电离：[H⁺] = 0.010 mol/L = 10⁻² mol/L，所以 pH = −lg(10⁻²) = 2。",
    tags: ["pH", "strong acid"],
  },
  {
    topic: "C1.3",
    difficulty: "MEDIUM",
    stem: "What is the pH of a 0.005 mol/L Ba(OH)₂ solution at 25 °C? (Ba(OH)₂ dissociates completely.)",
    stemZh: "25 °C 时，0.005 mol/L Ba(OH)₂ 溶液的 pH 是多少？（Ba(OH)₂ 完全电离）",
    options: ["11", "12", "12.3", "13"],
    optionsZh: ["11", "12", "12.3", "13"],
    correct: 1,
    explanation:
      "Ba(OH)₂ → Ba²⁺ + 2OH⁻, so [OH⁻] = 2 × 0.005 = 0.010 mol/L. pOH = −lg(10⁻²) = 2, hence pH = 14 − 2 = 12.",
    explanationZh:
      "Ba(OH)₂ → Ba²⁺ + 2OH⁻，所以 [OH⁻] = 2 × 0.005 = 0.010 mol/L。pOH = −lg(10⁻²) = 2，因此 pH = 14 − 2 = 12。",
    tags: ["pH", "strong base", "hydroxide"],
  },
  {
    topic: "C1.3",
    difficulty: "HARD",
    stem: "50.0 mL of 0.20 mol/L HCl is mixed with 50.0 mL of 0.20 mol/L Ba(OH)₂ at 25 °C. What is the pH of the resulting solution?",
    stemZh: "25 °C 时，将 50.0 mL 0.20 mol/L 盐酸与 50.0 mL 0.20 mol/L Ba(OH)₂ 混合，所得溶液的 pH 是多少？",
    options: ["1.0", "7.0", "12.7", "13.0"],
    optionsZh: ["1.0", "7.0", "12.7", "13.0"],
    correct: 3,
    explanation:
      "n(H⁺) = 0.0500 × 0.20 = 0.010 mol; n(OH⁻) = 0.0500 × 0.20 × 2 = 0.020 mol. Excess OH⁻ = 0.020 − 0.010 = 0.010 mol in 0.100 L, so [OH⁻] = 0.10 mol/L, pOH = 1 and pH = 13.0.",
    explanationZh:
      "n(H⁺) = 0.0500 × 0.20 = 0.010 mol；n(OH⁻) = 0.0500 × 0.20 × 2 = 0.020 mol。OH⁻ 过量 0.020 − 0.010 = 0.010 mol，溶液体积为 0.100 L，故 [OH⁻] = 0.10 mol/L，pOH = 1，pH = 13.0。",
    tags: ["pH", "neutralisation", "mixing solutions"],
  },
  {
    topic: "C1.3",
    difficulty: "MEDIUM",
    stem: "What mass of NaOH is needed to prepare 500 mL of a 0.20 mol/L NaOH solution? (Na = 23, O = 16, H = 1)",
    stemZh: "配制 500 mL 0.20 mol/L 的 NaOH 溶液需要 NaOH 多少克？（Na = 23，O = 16，H = 1）",
    options: ["4.0 g", "8.0 g", "2.0 g", "20 g"],
    optionsZh: ["4.0 g", "8.0 g", "2.0 g", "20 g"],
    correct: 0,
    explanation:
      "n = c × V = 0.20 mol/L × 0.500 L = 0.10 mol. M(NaOH) = 40 g/mol, so m = 0.10 × 40 = 4.0 g.",
    explanationZh:
      "n = c × V = 0.20 mol/L × 0.500 L = 0.10 mol。M(NaOH) = 40 g/mol，故 m = 0.10 × 40 = 4.0 g。",
    tags: ["molarity", "mass", "solution preparation"],
  },
  {
    topic: "C1.4",
    difficulty: "EASY",
    stem: "How many moles are in 44 g of CO₂? (C = 12, O = 16)",
    stemZh: "44 g CO₂ 的物质的量是多少？（C = 12，O = 16）",
    options: ["1 mol", "0.5 mol", "2 mol", "44 mol"],
    optionsZh: ["1 mol", "0.5 mol", "2 mol", "44 mol"],
    correct: 0,
    explanation:
      "M(CO₂) = 12 + 2 × 16 = 44 g/mol, so n = m/M = 44/44 = 1 mol.",
    explanationZh:
      "M(CO₂) = 12 + 2 × 16 = 44 g/mol，因此 n = m/M = 44/44 = 1 mol。",
    tags: ["mole concept", "molar mass"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "How many atoms are present in 0.50 mol of H₂SO₄? (Nₐ = 6.02×10²³ mol⁻¹)",
    stemZh: "0.50 mol H₂SO₄ 中含有多少个原子？（Nₐ = 6.02×10²³ mol⁻¹）",
    options: ["3.0×10²³", "4.2×10²³", "2.1×10²⁴", "6.0×10²³"],
    optionsZh: ["3.0×10²³", "4.2×10²³", "2.1×10²⁴", "6.0×10²³"],
    correct: 2,
    explanation:
      "Each H₂SO₄ molecule contains 7 atoms (2 H + 1 S + 4 O). n(atoms) = 0.50 × 7 = 3.5 mol, so N = 3.5 × 6.02×10²³ = 2.1×10²⁴.",
    explanationZh:
      "每个 H₂SO₄ 分子含 7 个原子（2 个 H + 1 个 S + 4 个 O）。n(原子) = 0.50 × 7 = 3.5 mol，故 N = 3.5 × 6.02×10²³ = 2.1×10²⁴。",
    tags: ["Avogadro", "mole concept", "atoms"],
  },
  {
    topic: "C1.4",
    difficulty: "HARD",
    stem: "An organic compound contains 40.0% C, 6.7% H and 53.3% O by mass. Its empirical formula is: (C = 12, H = 1, O = 16)",
    stemZh: "某有机物中 C、H、O 的质量分数分别为 40.0%、6.7% 和 53.3%。它的实验式是？（C = 12，H = 1，O = 16）",
    options: ["CHO", "CH₂O", "C₂H₄O", "C₂H₆O"],
    optionsZh: ["CHO", "CH₂O", "C₂H₄O", "C₂H₆O"],
    correct: 1,
    explanation:
      "Divide by atomic mass: C 40.0/12 = 3.33, H 6.7/1 = 6.7, O 53.3/16 = 3.33. Dividing by 3.33 gives C : H : O = 1 : 2 : 1, so the empirical formula is CH₂O (M = 30 g/mol).",
    explanationZh:
      "用质量分数除以相对原子质量：C 40.0/12 = 3.33，H 6.7/1 = 6.7，O 53.3/16 = 3.33。同除以 3.33 得 C : H : O = 1 : 2 : 1，所以实验式为 CH₂O（M = 30 g/mol）。",
    tags: ["empirical formula", "mass percentage", "mole ratio"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "25.0 mL of 2.0 mol/L H₂SO₄ is diluted with water to a final volume of 500 mL. What is the concentration of the diluted solution?",
    stemZh: "将 25.0 mL 2.0 mol/L 的 H₂SO₄ 加水稀释至 500 mL，稀释后溶液的物质的量浓度是多少？",
    options: ["0.010 mol/L", "0.020 mol/L", "0.050 mol/L", "0.10 mol/L"],
    optionsZh: ["0.010 mol/L", "0.020 mol/L", "0.050 mol/L", "0.10 mol/L"],
    correct: 3,
    explanation:
      "The amount of solute is unchanged: n = 0.0250 L × 2.0 mol/L = 0.050 mol. c = n/V = 0.050 mol / 0.500 L = 0.10 mol/L. (Equivalently c₁V₁ = c₂V₂: 2.0 × 25.0 = c₂ × 500.)",
    explanationZh:
      "稀释前后溶质的物质的量不变：n = 0.0250 L × 2.0 mol/L = 0.050 mol。c = n/V = 0.050 mol / 0.500 L = 0.10 mol/L。（也可用 c₁V₁ = c₂V₂：2.0 × 25.0 = c₂ × 500。）",
    tags: ["dilution", "molarity", "c1v1"],
  },
  {
    topic: "C1.5",
    difficulty: "MEDIUM",
    stem: "2.0 mol of CaCO₃ is completely decomposed by heating: CaCO₃ → CaO + CO₂↑. What volume of CO₂ is produced at STP? (Molar volume = 22.4 L/mol at STP)",
    stemZh: "2.0 mol CaCO₃ 受热完全分解：CaCO₃ → CaO + CO₂↑。标准状况下生成 CO₂ 的体积是多少？（标准状况下摩尔体积 = 22.4 L/mol）",
    options: ["22.4 L", "44.8 L", "11.2 L", "89.6 L"],
    optionsZh: ["22.4 L", "44.8 L", "11.2 L", "89.6 L"],
    correct: 1,
    explanation:
      "From the equation, 1 mol CaCO₃ gives 1 mol CO₂, so n(CO₂) = 2.0 mol. V = n × Vₘ = 2.0 × 22.4 = 44.8 L at STP.",
    explanationZh:
      "由方程式可知 1 mol CaCO₃ 生成 1 mol CO₂，故 n(CO₂) = 2.0 mol。标准状况下 V = n × Vₘ = 2.0 × 22.4 = 44.8 L。",
    tags: ["gas volume", "STP", "decomposition"],
  },
  {
    topic: "C1.5",
    difficulty: "EASY",
    stem: "What volume does 0.25 mol of any ideal gas occupy at STP? (Molar volume = 22.4 L/mol at STP)",
    stemZh: "标准状况下 0.25 mol 任何理想气体所占的体积是多少？（标准状况下摩尔体积 = 22.4 L/mol）",
    options: ["2.24 L", "22.4 L", "5.6 L", "11.2 L"],
    optionsZh: ["2.24 L", "22.4 L", "5.6 L", "11.2 L"],
    correct: 2,
    explanation: "V = n × Vₘ = 0.25 mol × 22.4 L/mol = 5.6 L.",
    explanationZh: "V = n × Vₘ = 0.25 mol × 22.4 L/mol = 5.6 L。",
    tags: ["molar volume", "STP", "gas"],
  },
  {
    topic: "C1.5",
    difficulty: "HARD",
    stem: "At 27 °C and 1.0×10⁵ Pa, 0.30 g of a gas occupies 246 mL. What is its molar mass? (R = 8.31 J mol⁻¹ K⁻¹)",
    stemZh: "27 °C、1.0×10⁵ Pa 时，0.30 g 某气体占有 246 mL。该气体的摩尔质量是多少？（R = 8.31 J mol⁻¹ K⁻¹）",
    options: ["30 g/mol", "44 g/mol", "28 g/mol", "60 g/mol"],
    optionsZh: ["30 g/mol", "44 g/mol", "28 g/mol", "60 g/mol"],
    correct: 0,
    explanation:
      "T = 27 + 273 = 300 K, V = 246 mL = 2.46×10⁻⁴ m³. n = pV/RT = (1.0×10⁵ × 2.46×10⁻⁴)/(8.31 × 300) = 9.87×10⁻³ mol. M = m/n = 0.30/9.87×10⁻³ ≈ 30 g/mol.",
    explanationZh:
      "T = 27 + 273 = 300 K，V = 246 mL = 2.46×10⁻⁴ m³。n = pV/RT = (1.0×10⁵ × 2.46×10⁻⁴)/(8.31 × 300) = 9.87×10⁻³ mol。M = m/n = 0.30/9.87×10⁻³ ≈ 30 g/mol。",
    tags: ["ideal gas law", "molar mass", "pV=nRT"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "Which of the following oxides is amphoteric?",
    stemZh: "下列氧化物中具有两性的是？",
    options: ["Na₂O", "SO₂", "CaO", "Al₂O₃"],
    optionsZh: ["Na₂O", "SO₂", "CaO", "Al₂O₃"],
    correct: 3,
    explanation:
      "Al₂O₃ reacts with both acids and strong bases (Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O; Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O), so it is amphoteric. Na₂O and CaO are basic oxides and SO₂ is an acidic oxide.",
    explanationZh:
      "Al₂O₃ 既能与酸反应又能与强碱反应（Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O；Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O），故为两性氧化物。Na₂O 和 CaO 是碱性氧化物，SO₂ 是酸性氧化物。",
    tags: ["amphoteric oxide", "aluminium oxide", "oxides"],
  },
  {
    topic: "C2.1",
    difficulty: "MEDIUM",
    stem: "2Na₂O₂ + 2H₂O → 4NaOH + O₂↑. When 0.20 mol of Na₂O₂ reacts completely, how many moles of O₂ are produced?",
    stemZh: "2Na₂O₂ + 2H₂O → 4NaOH + O₂↑。当 0.20 mol Na₂O₂ 完全反应时，生成 O₂ 多少摩尔？",
    options: ["0.10 mol", "0.20 mol", "0.40 mol", "0.05 mol"],
    optionsZh: ["0.10 mol", "0.20 mol", "0.40 mol", "0.05 mol"],
    correct: 0,
    explanation:
      "The equation shows 2 mol Na₂O₂ give 1 mol O₂, so n(O₂) = 0.20 × 1/2 = 0.10 mol. Forgetting the coefficient 2 would wrongly give 0.20 mol.",
    explanationZh:
      "方程式中 2 mol Na₂O₂ 生成 1 mol O₂，故 n(O₂) = 0.20 × 1/2 = 0.10 mol。忽略系数 2 会误得 0.20 mol。",
    tags: ["sodium peroxide", "stoichiometry", "coefficients"],
  },
  {
    topic: "C2.1",
    difficulty: "MEDIUM",
    stem: "Which gas is produced when aluminium reacts with excess NaOH solution?",
    stemZh: "铝与过量 NaOH 溶液反应时生成的气体是？",
    options: ["H₂", "O₂", "Cl₂", "NO₂"],
    optionsZh: ["H₂", "O₂", "Cl₂", "NO₂"],
    correct: 0,
    explanation:
      "2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑. Aluminium is amphoteric and dissolves in strong alkali, releasing hydrogen; water supplies the hydrogen atoms.",
    explanationZh:
      "2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑。铝具有两性，能溶于强碱并放出氢气，氢原子来自水。",
    tags: ["aluminium", "amphoteric metal", "hydrogen"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "How many structural isomers does C₅H₁₂ have?",
    stemZh: "C₅H₁₂ 有多少种结构异构体？",
    options: ["1", "2", "3", "4"],
    optionsZh: ["1", "2", "3", "4"],
    correct: 2,
    explanation:
      "C₅H₁₂ has three isomers: n-pentane CH₃CH₂CH₂CH₂CH₃, 2-methylbutane CH₃CH(CH₃)CH₂CH₃ and 2,2-dimethylpropane C(CH₃)₄. A straight chain alone would give only 1.",
    explanationZh:
      "C₅H₁₂ 有三种异构体：正戊烷 CH₃CH₂CH₂CH₂CH₃、2-甲基丁烷 CH₃CH(CH₃)CH₂CH₃ 和 2,2-二甲基丙烷 C(CH₃)₄。只考虑直链会误选 1 种。",
    tags: ["isomerism", "alkane", "structural isomers"],
  },
  {
    topic: "C2.2",
    difficulty: "EASY",
    stem: "The functional group present in CH₃COOH is:",
    stemZh: "CH₃COOH 中含有的官能团是？",
    options: ["–OH (hydroxyl)", "–CHO (aldehyde)", "–COO– (ester)", "–COOH (carboxyl)"],
    optionsZh: ["–OH（羟基）", "–CHO（醛基）", "–COO–（酯基）", "–COOH（羧基）"],
    correct: 3,
    explanation:
      "CH₃COOH is ethanoic (acetic) acid; its functional group is the carboxyl group –COOH, which contains both a carbonyl C=O and an –OH group.",
    explanationZh:
      "CH₃COOH 是乙酸（醋酸），其官能团为羧基 –COOH，该基团同时含有羰基 C=O 和 –OH。",
    tags: ["functional group", "carboxylic acid"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "CH₂=CH₂ + Br₂ → ? The organic product of this reaction is:",
    stemZh: "CH₂=CH₂ + Br₂ → ？该反应的有机产物是？",
    options: ["CH₂Br–CH₂Br", "CH₃–CHBr₂", "CHBr=CHBr", "CH₃–CH₂Br"],
    optionsZh: ["CH₂Br–CH₂Br", "CH₃–CHBr₂", "CHBr=CHBr", "CH₃–CH₂Br"],
    correct: 0,
    explanation:
      "This is an addition reaction: the C=C double bond opens and one Br atom adds to each carbon, giving 1,2-dibromoethane CH₂Br–CH₂Br. The bromine water is decolourised.",
    explanationZh:
      "这是加成反应：C=C 双键断裂，每个碳原子上各加一个 Br 原子，生成 1,2-二溴乙烷 CH₂Br–CH₂Br，溴水因此褪色。",
    tags: ["addition reaction", "alkene", "bromine water"],
  },
  {
    topic: "C2.2",
    difficulty: "HARD",
    stem: "Complete hydrolysis of ethyl ethanoate (CH₃COOC₂H₅) in aqueous NaOH gives:",
    stemZh: "乙酸乙酯（CH₃COOC₂H₅）在 NaOH 水溶液中完全水解的产物是？",
    options: [
      "CH₃COOH + C₂H₅OH",
      "CH₃COONa + C₂H₅ONa",
      "CH₃COONa + C₂H₅OH",
      "CH₃CHO + C₂H₅OH",
    ],
    optionsZh: [
      "CH₃COOH + C₂H₅OH",
      "CH₃COONa + C₂H₅ONa",
      "CH₃COONa + C₂H₅OH",
      "CH₃CHO + C₂H₅OH",
    ],
    correct: 2,
    explanation:
      "In alkaline conditions the ester is hydrolysed irreversibly: CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH. The carboxylic acid produced is immediately neutralised to its sodium salt, so CH₃COOH is not the final product.",
    explanationZh:
      "在碱性条件下酯发生不可逆水解：CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH。生成的羧酸立即被中和成钠盐，因此最终产物不是 CH₃COOH。",
    tags: ["ester hydrolysis", "saponification", "organic reactions"],
  },
  {
    topic: "C2.3",
    difficulty: "MEDIUM",
    stem: "What is the oxidation state of manganese in KMnO₄?",
    stemZh: "KMnO₄ 中锰元素的化合价是多少？",
    options: ["+6", "+7", "+4", "+2"],
    optionsZh: ["+6", "+7", "+4", "+2"],
    correct: 1,
    explanation:
      "K is +1 and each O is −2. With overall neutrality: (+1) + x + 4(−2) = 0, so x = +7.",
    explanationZh:
      "K 为 +1 价，每个 O 为 −2 价。由整体电中性：(+1) + x + 4(−2) = 0，解得 x = +7。",
    tags: ["oxidation state", "permanganate"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "In the reaction ZnO + C → Zn + CO, the reducing agent is:",
    stemZh: "在反应 ZnO + C → Zn + CO 中，还原剂是？",
    options: ["ZnO", "Zn", "CO", "C"],
    optionsZh: ["ZnO", "Zn", "CO", "C"],
    correct: 3,
    explanation:
      "Carbon is oxidised from 0 to +2 in CO and therefore loses electrons, so C is the reducing agent. Zn is reduced from +2 to 0, so ZnO is the oxidising agent.",
    explanationZh:
      "碳由 0 价升高到 CO 中的 +2 价，失去电子，因此 C 是还原剂。Zn 由 +2 价降低到 0 价，故 ZnO 是氧化剂。",
    tags: ["redox", "reducing agent", "oxidation state"],
  },
  {
    topic: "C2.3",
    difficulty: "HARD",
    stem: "In 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O, how many moles of electrons are transferred per mole of KMnO₄ consumed?",
    stemZh: "在 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O 中，每消耗 1 mol KMnO₄ 转移多少摩尔电子？",
    options: ["5 mol", "2 mol", "10 mol", "16 mol"],
    optionsZh: ["5 mol", "2 mol", "10 mol", "16 mol"],
    correct: 0,
    explanation:
      "Mn is reduced from +7 in MnO₄⁻ to +2 in Mn²⁺, a change of 5 electrons per Mn. For 2 mol KMnO₄, 10 mol e⁻ are transferred in total, i.e. 5 mol e⁻ per mole of KMnO₄.",
    explanationZh:
      "Mn 从 MnO₄⁻ 中的 +7 价降到 Mn²⁺ 中的 +2 价，每个 Mn 得到 5 个电子。2 mol KMnO₄ 共转移 10 mol 电子，即每摩尔 KMnO₄ 转移 5 mol 电子。",
    tags: ["electron transfer", "redox", "permanganate"],
  },
  {
    topic: "C2.4",
    difficulty: "MEDIUM",
    stem: "Which solution gives a white precipitate with BaCl₂ solution that is insoluble in dilute hydrochloric acid?",
    stemZh: "下列溶液与 BaCl₂ 溶液反应生成白色沉淀，且该沉淀不溶于稀盐酸的是？",
    options: ["NaCl", "NaNO₃", "Na₂SO₄", "Na₂CO₃"],
    optionsZh: ["NaCl", "NaNO₃", "Na₂SO₄", "Na₂CO₃"],
    correct: 2,
    explanation:
      "Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl. BaSO₄ is a white precipitate that does not dissolve in dilute HCl, which is the standard test for SO₄²⁻. BaCO₃ also precipitates but dissolves in acid with CO₂ evolution.",
    explanationZh:
      "Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl。BaSO₄ 是白色沉淀且不溶于稀盐酸，这是检验 SO₄²⁻ 的常用方法。BaCO₃ 也会沉淀，但溶于酸并放出 CO₂。",
    tags: ["sulfate test", "precipitation", "ion identification"],
  },
  {
    topic: "C2.4",
    difficulty: "EASY",
    stem: "The net ionic equation for HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) is:",
    stemZh: "反应 HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) 的离子方程式是？",
    options: [
      "Na⁺ + Cl⁻ → NaCl",
      "H⁺ + Cl⁻ → HCl",
      "Na⁺ + OH⁻ → NaOH",
      "H⁺ + OH⁻ → H₂O",
    ],
    optionsZh: [
      "Na⁺ + Cl⁻ → NaCl",
      "H⁺ + Cl⁻ → HCl",
      "Na⁺ + OH⁻ → NaOH",
      "H⁺ + OH⁻ → H₂O",
    ],
    correct: 3,
    explanation:
      "Na⁺ and Cl⁻ are spectator ions and are omitted; the only species that actually react are H⁺ from the acid and OH⁻ from the base, giving H⁺ + OH⁻ → H₂O. This is the net ionic equation for any strong acid–strong base neutralisation.",
    explanationZh:
      "Na⁺ 和 Cl⁻ 是旁观离子，应删去；真正参加反应的只有酸中的 H⁺ 和碱中的 OH⁻，即 H⁺ + OH⁻ → H₂O。这是所有强酸与强碱中和反应的离子方程式。",
    tags: ["ionic equation", "neutralisation", "spectator ions"],
  },
  {
    topic: "C2.4",
    difficulty: "MEDIUM",
    stem: "Which pair of ions can coexist in large amounts in the same solution?",
    stemZh: "下列哪一组离子可以在同一溶液中大量共存？",
    options: ["Na⁺ and SO₄²⁻", "Ba²⁺ and SO₄²⁻", "Ag⁺ and Cl⁻", "H⁺ and CO₃²⁻"],
    optionsZh: ["Na⁺ 和 SO₄²⁻", "Ba²⁺ 和 SO₄²⁻", "Ag⁺ 和 Cl⁻", "H⁺ 和 CO₃²⁻"],
    correct: 0,
    explanation:
      "Na₂SO₄ is soluble, so Na⁺ and SO₄²⁻ coexist. Ba²⁺ + SO₄²⁻ → BaSO₄↓, Ag⁺ + Cl⁻ → AgCl↓, and 2H⁺ + CO₃²⁻ → H₂O + CO₂↑, so the other three pairs react.",
    explanationZh:
      "Na₂SO₄ 可溶，故 Na⁺ 与 SO₄²⁻ 能大量共存。Ba²⁺ + SO₄²⁻ → BaSO₄↓，Ag⁺ + Cl⁻ → AgCl↓，2H⁺ + CO₃²⁻ → H₂O + CO₂↑，因此其余三组都会反应。",
    tags: ["ion coexistence", "precipitation", "solubility"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "What is the ground-state electron configuration of chlorine (Z = 17)?",
    stemZh: "氯原子（Z = 17）的基态电子排布式是？",
    options: [
      "1s²2s²2p⁶3s¹3p⁶",
      "1s²2s²2p⁶3s²3p⁵",
      "1s²2s²2p⁵3s²3p⁶",
      "1s²2s²2p⁶3s²3p⁴",
    ],
    optionsZh: [
      "1s²2s²2p⁶3s¹3p⁶",
      "1s²2s²2p⁶3s²3p⁵",
      "1s²2s²2p⁵3s²3p⁶",
      "1s²2s²2p⁶3s²3p⁴",
    ],
    correct: 1,
    explanation:
      "17 electrons fill in the order 1s²2s²2p⁶3s², leaving 5 electrons for 3p: 1s²2s²2p⁶3s²3p⁵. The 3s must be full before 3p begins.",
    explanationZh:
      "17 个电子按 1s²2s²2p⁶3s² 的顺序填充后还剩 5 个电子进入 3p，故为 1s²2s²2p⁶3s²3p⁵。3s 必须先填满才填 3p。",
    tags: ["electron configuration", "chlorine", "atomic structure"],
  },
  {
    topic: "C3.1",
    difficulty: "MEDIUM",
    stem: "Which of the following atoms has the largest atomic radius?",
    stemZh: "下列原子中原子半径最大的是？",
    options: ["Na", "Mg", "Al", "K"],
    optionsZh: ["Na", "Mg", "Al", "K"],
    correct: 3,
    explanation:
      "Radius increases down a group and decreases across a period. K is in period 4, one shell beyond Na, Mg and Al, so it has the largest radius; among Na, Mg and Al the radius decreases in that order.",
    explanationZh:
      "同主族从上到下原子半径增大，同周期从左到右原子半径减小。K 位于第四周期，比 Na、Mg、Al 多一个电子层，故半径最大；Na、Mg、Al 半径依次减小。",
    tags: ["atomic radius", "periodic trend"],
  },
  {
    topic: "C3.1",
    difficulty: "HARD",
    stem: "Which of the following elements has the highest first ionisation energy?",
    stemZh: "下列元素中第一电离能最大的是？",
    options: ["Na", "Mg", "Al", "Si"],
    optionsZh: ["Na", "Mg", "Al", "Si"],
    correct: 3,
    explanation:
      "First ionisation energy generally increases across a period, so Si is highest. The order is Na < Al < Mg < Si: Mg is higher than Al because Al loses a 3p electron that is shielded by the filled 3s² subshell, while Mg loses a 3s electron from a more stable configuration.",
    explanationZh:
      "同周期从左到右第一电离能总体增大，故 Si 最大。顺序为 Na < Al < Mg < Si：Mg 高于 Al，因为 Al 失去的是被 3s² 屏蔽的 3p 电子，而 Mg 失去 3s 电子，其基态更稳定。",
    tags: ["ionisation energy", "periodic trend", "subshell"],
  },
  {
    topic: "C3.1",
    difficulty: "MEDIUM",
    stem: "An element X has the electron configuration 1s²2s²2p⁶3s²3p⁴. In which period and group is X?",
    stemZh: "某元素 X 的电子排布式为 1s²2s²2p⁶3s²3p⁴，它位于第几周期第几族？",
    options: ["Period 3, Group 14", "Period 3, Group 16", "Period 2, Group 16", "Period 3, Group 18"],
    optionsZh: ["第三周期第 14 族", "第三周期第 16 族", "第二周期第 16 族", "第三周期第 18 族"],
    correct: 1,
    explanation:
      "The highest occupied shell is n = 3, so X is in period 3. The valence configuration is 3s²3p⁴, giving 2 + 4 = 6 valence electrons, so X is in Group 16 (VIA); the element is sulfur.",
    explanationZh:
      "最外层为第 3 层，故 X 位于第三周期。价电子排布为 3s²3p⁴，价电子数为 2 + 4 = 6，因此属于第 16 族（第ⅥA 族），该元素为硫。",
    tags: ["periodic table", "electron configuration", "group"],
  },
  {
    topic: "C3.2",
    difficulty: "MEDIUM",
    stem: "The bonding in solid sodium chloride is best described as:",
    stemZh: "固态氯化钠中的化学键属于？",
    options: ["Non-polar covalent", "Ionic", "Metallic", "Hydrogen bonding"],
    optionsZh: ["非极性共价键", "离子键", "金属键", "氢键"],
    correct: 1,
    explanation:
      "Na (electronegativity 0.9) transfers its 3s electron to Cl (3.0), forming Na⁺ and Cl⁻ ions held in a lattice by electrostatic attraction — an ionic bond. Hydrogen bonding is an intermolecular force, not a bond within NaCl.",
    explanationZh:
      "Na（电负性 0.9）把 3s 电子转移给 Cl（3.0），生成 Na⁺ 和 Cl⁻，二者通过静电引力在晶格中结合，形成离子键。氢键是分子间作用力，不是 NaCl 内部的化学键。",
    tags: ["ionic bond", "sodium chloride", "lattice"],
  },
  {
    topic: "C3.2",
    difficulty: "EASY",
    stem: "Which substance forms hydrogen bonds between its molecules?",
    stemZh: "下列哪种物质的分子之间存在氢键？",
    options: ["CH₄", "H₂S", "NH₃", "CO₂"],
    optionsZh: ["CH₄", "H₂S", "NH₃", "CO₂"],
    correct: 2,
    explanation:
      "Hydrogen bonds form when H is directly bonded to a very electronegative N, O or F atom. In NH₃ the N–H bond provides both the polar H and the lone pair on N needed for hydrogen bonding; C, S and the C in CO₂ are not sufficiently electronegative.",
    explanationZh:
      "当 H 直接与电负性很强的 N、O、F 相连时可形成氢键。NH₃ 中 N–H 键既提供极性氢，N 上又有孤对电子，故能形成氢键；C、S 以及 CO₂ 中的 C 电负性不够大。",
    tags: ["hydrogen bond", "intermolecular forces", "ammonia"],
  },
  {
    topic: "C3.2",
    difficulty: "HARD",
    stem: "HF boils at 19.5 °C but HCl boils at −85 °C, although HF has a smaller molar mass. The main reason is:",
    stemZh: "HF 的沸点为 19.5 °C，而 HCl 的沸点为 −85 °C，尽管 HF 的摩尔质量更小。主要原因是？",
    options: [
      "HF has stronger London dispersion forces because fluorine is more electronegative.",
      "HF molecules form hydrogen bonds, so extra energy is needed to separate them.",
      "HCl is a stronger acid than HF, so it vaporises more easily.",
      "The H–Cl bond is longer, so it is harder to break.",
    ],
    optionsZh: [
      "氟的电负性更大，使 HF 的色散力更强。",
      "HF 分子之间能形成氢键，汽化时需要额外的能量。",
      "HCl 的酸性比 HF 强，因此更容易汽化。",
      "H–Cl 键更长，因此更难断裂。",
    ],
    correct: 1,
    explanation:
      "Fluorine is small and very electronegative, so HF forms strong intermolecular hydrogen bonds. Boiling requires breaking these attractions, which needs much more energy than overcoming the dipole–dipole and dispersion forces in HCl. Boiling does not break the H–Cl covalent bond, and acid strength is irrelevant here.",
    explanationZh:
      "氟原子半径小、电负性大，HF 分子间能形成较强的氢键。沸腾需要克服这些分子间作用力，所需能量远大于克服 HCl 中的偶极–偶极作用和色散力。沸腾并不破坏 H–Cl 共价键，酸性与沸点也无关。",
    tags: ["hydrogen bond", "boiling point", "hydrogen halides"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0. If the total pressure is increased at constant temperature, the equilibrium:",
    stemZh: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)，ΔH < 0。在恒温下增大总压强，平衡将？",
    options: [
      "shifts to the left",
      "does not shift",
      "shifts to the right",
      "is destroyed, so K changes",
    ],
    optionsZh: [
      "向左移动",
      "不移动",
      "向右移动",
      "被破坏，K 发生变化",
    ],
    correct: 2,
    explanation:
      "There are 4 mol of gas on the left and 2 mol on the right. Increasing pressure favours the direction that produces fewer gas molecules, i.e. the forward direction, so the equilibrium shifts to the right. The equilibrium constant K itself is unchanged at constant temperature.",
    explanationZh:
      "反应物一侧共有 4 mol 气体，生成物一侧有 2 mol 气体。增大压强使平衡向气体分子数减少的方向移动，即向正反应方向（右）移动。恒温下平衡常数 K 本身不变。",
    tags: ["Le Chatelier", "pressure", "ammonia equilibrium"],
  },
  {
    topic: "C3.3",
    difficulty: "HARD",
    stem: "At 700 K, Kc = 54 for H₂(g) + I₂(g) ⇌ 2HI(g). A mixture has [H₂] = [I₂] = 0.10 mol/L and [HI] = 0.50 mol/L. What is the reaction quotient Q and which way does the reaction proceed?",
    stemZh: "700 K 时，H₂(g) + I₂(g) ⇌ 2HI(g) 的 Kc = 54。某混合物的浓度分别为 [H₂] = [I₂] = 0.10 mol/L、[HI] = 0.50 mol/L。反应商 Q 是多少，反应向哪个方向进行？",
    options: [
      "Q = 25; the reaction proceeds to the right",
      "Q = 25; the reaction proceeds to the left",
      "Q = 54; the system is already at equilibrium",
      "Q = 2.5; the reaction proceeds to the right",
    ],
    optionsZh: [
      "Q = 25，反应向右进行",
      "Q = 25，反应向左进行",
      "Q = 54，体系已达平衡",
      "Q = 2.5，反应向右进行",
    ],
    correct: 0,
    explanation:
      "Q = [HI]²/([H₂][I₂]) = (0.50)²/(0.10 × 0.10) = 0.25/0.010 = 25. Since Q < Kc (25 < 54), the reaction has too little product, so it proceeds to the right until Q reaches 54.",
    explanationZh:
      "Q = [HI]²/([H₂][I₂]) = (0.50)²/(0.10 × 0.10) = 0.25/0.010 = 25。因为 Q < Kc（25 < 54），生成物偏少，反应向右进行直至 Q = 54。",
    tags: ["reaction quotient", "equilibrium constant", "direction of reaction"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "A catalyst increases the rate of a reversible reaction mainly by:",
    stemZh: "催化剂加快可逆反应速率，其主要作用是？",
    options: [
      "providing an alternative pathway with a lower activation energy",
      "increasing the activation energy of the forward reaction",
      "changing the value of the equilibrium constant",
      "increasing the concentrations of the reactants",
    ],
    optionsZh: [
      "提供一条活化能较低的替代反应途径",
      "提高正反应的活化能",
      "改变平衡常数的数值",
      "增大反应物的浓度",
    ],
    correct: 0,
    explanation:
      "A catalyst lowers the activation energy by providing a different pathway, so a larger fraction of collisions is effective and both forward and reverse rates increase. It does not change the equilibrium constant or the equilibrium position, and it does not alter concentrations.",
    explanationZh:
      "催化剂通过提供另一条反应途径降低活化能，使有效碰撞的比例增大，正、逆反应速率同时加快。它不改变平衡常数，也不移动平衡位置，更不会改变反应物浓度。",
    tags: ["catalyst", "activation energy", "rate"],
  },
  {
    topic: "C3.3",
    difficulty: "EASY",
    stem: "Which change increases the rate of the reaction between zinc granules and dilute H₂SO₄?",
    stemZh: "下列哪种改变能加快锌粒与稀硫酸反应的速率？",
    options: ["Adding water", "Cooling the mixture", "Using larger pieces of zinc", "Raising the temperature"],
    optionsZh: ["加水", "降低温度", "改用更大的锌块", "升高温度"],
    correct: 3,
    explanation:
      "Raising the temperature increases the average kinetic energy, so more particles have energy above the activation energy and there are more effective collisions. Adding water dilutes the acid, cooling slows the reaction, and larger pieces reduce the surface area.",
    explanationZh:
      "升高温度使粒子平均动能增大，更多粒子能量超过活化能，有效碰撞增多，反应加快。加水稀释了酸，降温使反应变慢，改用大块锌则减小了接触面积。",
    tags: ["reaction rate", "temperature", "surface area"],
  },
  {
    topic: "C3.4",
    difficulty: "MEDIUM",
    stem: "0.10 mol/L HCl and 0.10 mol/L CH₃COOH are compared. Which statement is correct?",
    stemZh: "比较 0.10 mol/L 盐酸和 0.10 mol/L 乙酸。下列说法正确的是？",
    options: [
      "Both solutions have the same pH.",
      "The CH₃COOH solution has the lower pH.",
      "The HCl solution has the lower pH, and equal volumes of the two neutralise the same amount of NaOH.",
      "HCl is a weak electrolyte and CH₃COOH is a strong electrolyte.",
    ],
    optionsZh: [
      "两溶液的 pH 相同。",
      "CH₃COOH 溶液的 pH 更低。",
      "盐酸的 pH 更低，且等体积的两种溶液能中和相同量的 NaOH。",
      "HCl 是弱电解质，CH₃COOH 是强电解质。",
    ],
    correct: 2,
    explanation:
      "HCl is a strong electrolyte and is fully ionised, so [H⁺] = 0.10 mol/L and pH = 1. CH₃COOH is a weak electrolyte, only partly ionised, so [H⁺] < 0.10 mol/L and its pH is higher (about 2.9). Since both solutions have the same total acid concentration, equal volumes contain equal moles of acidic hydrogen and neutralise the same amount of NaOH.",
    explanationZh:
      "HCl 是强电解质，完全电离，[H⁺] = 0.10 mol/L，pH = 1。CH₃COOH 是弱电解质，只部分电离，[H⁺] < 0.10 mol/L，pH 更高（约 2.9）。由于两者总酸的浓度相同，等体积溶液中所含可电离的氢的物质的量相同，故中和的 NaOH 量也相同。",
    tags: ["strong acid", "weak acid", "pH", "neutralisation"],
  },
  {
    topic: "C3.4",
    difficulty: "HARD",
    stem: "The acid-dissociation constant of CH₃COOH is Ka = 1.8×10⁻⁵. What is the pH of a 0.10 mol/L CH₃COOH solution at 25 °C? (Assume dissociation is small.)",
    stemZh: "CH₃COOH 的电离常数 Ka = 1.8×10⁻⁵。25 °C 时 0.10 mol/L CH₃COOH 溶液的 pH 是多少？（按电离度很小的近似处理）",
    options: ["2.9", "1.0", "4.7", "5.7"],
    optionsZh: ["2.9", "1.0", "4.7", "5.7"],
    correct: 0,
    explanation:
      "$K_a = \\frac{[H^+][CH_3COO^-]}{[CH_3COOH]}$. Let [H⁺] = [CH₃COO⁻] = x and 0.10 − x ≈ 0.10, then x² = 1.8×10⁻⁵ × 0.10 = 1.8×10⁻⁶, so x = 1.3×10⁻³ mol/L. pH = −lg(1.3×10⁻³) = 2.9.",
    explanationZh:
      "$K_a = \\frac{[H^+][CH_3COO^-]}{[CH_3COOH]}$。设 [H⁺] = [CH₃COO⁻] = x，且 0.10 − x ≈ 0.10，则 x² = 1.8×10⁻⁵ × 0.10 = 1.8×10⁻⁶，得 x = 1.3×10⁻³ mol/L。pH = −lg(1.3×10⁻³) = 2.9。",
    tags: ["weak acid", "Ka", "pH calculation"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which of the following is a weak electrolyte?",
    stemZh: "下列物质中属于弱电解质的是？",
    options: ["NaCl", "CH₃COOH", "HCl", "NaOH"],
    optionsZh: ["NaCl", "CH₃COOH", "HCl", "NaOH"],
    correct: 1,
    explanation:
      "CH₃COOH only partly ionises in water (Ka = 1.8×10⁻⁵), so it is a weak electrolyte. NaCl, HCl and NaOH are strong electrolytes that ionise completely.",
    explanationZh:
      "CH₃COOH 在水中只部分电离（Ka = 1.8×10⁻⁵），属于弱电解质。NaCl、HCl 和 NaOH 都是完全电离的强电解质。",
    tags: ["electrolyte", "weak acid"],
  },
  {
    topic: "C4.1",
    difficulty: "EASY",
    stem: "When diluting concentrated sulfuric acid, the correct procedure is to:",
    stemZh: "稀释浓硫酸时，正确的操作是？",
    options: [
      "add water to the concentrated acid quickly",
      "pour the acid and water into a flask together and heat",
      "pour the concentrated acid slowly into water while stirring",
      "heat the acid first, then add water",
    ],
    optionsZh: [
      "把水迅速加入浓硫酸中",
      "把酸和水一起倒入烧瓶并加热",
      "把浓硫酸沿器壁缓慢加入水中并不断搅拌",
      "先把浓硫酸加热，再加水",
    ],
    correct: 2,
    explanation:
      "Dilution of H₂SO₄ is strongly exothermic. Acid must be added slowly to water with stirring so the heat is absorbed by the large amount of water and the acid does not spatter. Never add water to concentrated acid.",
    explanationZh:
      "浓硫酸稀释时放出大量热，必须把酸沿器壁缓慢加入水中并不断搅拌，使热量被大量水吸收，避免酸液飞溅。绝不可把水加入浓硫酸中。",
    tags: ["safety", "dilution", "concentrated sulfuric acid"],
  },
  {
    topic: "C4.1",
    difficulty: "EASY",
    stem: "Which instrument should be used to measure exactly 25.00 mL of a solution?",
    stemZh: "准确量取 25.00 mL 溶液应选用哪种仪器？",
    options: ["A 100 mL measuring cylinder", "A beaker", "A 25.00 mL pipette", "A conical flask"],
    optionsZh: ["100 mL 量筒", "烧杯", "25.00 mL 移液管", "锥形瓶"],
    correct: 2,
    explanation:
      "A pipette has a single graduation and can deliver 25.00 mL with four significant figures. A 100 mL measuring cylinder is accurate only to about 1 mL, and a beaker or conical flask has no fine graduation.",
    explanationZh:
      "移液管只有一个刻度线，可准确移取 25.00 mL（四位有效数字）。100 mL 量筒的精度只有约 1 mL，烧杯和锥形瓶则没有精细刻度。",
    tags: ["pipette", "measurement", "apparatus"],
  },
  {
    topic: "C4.1",
    difficulty: "MEDIUM",
    stem: "When heating a liquid in a test tube, the SAFE practice is to:",
    stemZh: "给试管中的液体加热时，安全的操作是？",
    options: [
      "Fill the tube more than half full",
      "Point the mouth of the tube towards yourself to watch closely",
      "Heat the bottom of the tube where the liquid collects",
      "Hold the tube with a tube holder, heat it gently and evenly, and point the mouth away from people",
    ],
    optionsZh: [
      "液体超过试管容积的一半",
      "把试管口对准自己以便观察",
      "加热试管底部液体聚集处",
      "用试管夹夹住试管，先均匀预热再集中加热，试管口不对着人",
    ],
    correct: 3,
    explanation:
      "A test tube should be no more than about one third full, must be held with a holder, preheated evenly and then heated at the part containing the liquid, with the mouth pointing away from people to avoid scalding from bumping or ejection.",
    explanationZh:
      "试管内液体不应超过容积的 1/3，须用试管夹夹持，先均匀预热再加热液体部位，且试管口不能对着人，以免暴沸时液体喷出烫伤。",
    tags: ["safety", "heating", "test tube"],
  },
  {
    topic: "C4.2",
    difficulty: "EASY",
    stem: "A colourless gas turns clear limewater milky. The gas is:",
    stemZh: "某无色气体能使澄清石灰水变浑浊，该气体是？",
    options: ["H₂", "CO₂", "O₂", "NH₃"],
    optionsZh: ["H₂", "CO₂", "O₂", "NH₃"],
    correct: 1,
    explanation:
      "CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O. The insoluble CaCO₃ makes the limewater milky, which is the standard test for CO₂. Excess CO₂ later dissolves the precipitate to give soluble Ca(HCO₃)₂.",
    explanationZh:
      "CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O。难溶的 CaCO₃ 使石灰水变浑浊，这是检验 CO₂ 的常用方法。若通入过量 CO₂，沉淀又会溶解生成可溶的 Ca(HCO₃)₂。",
    tags: ["carbon dioxide", "limewater", "gas test"],
  },
  {
    topic: "C4.2",
    difficulty: "HARD",
    stem: "Chlorine is prepared by MnO₂ + 4HCl(conc) → MnCl₂ + Cl₂↑ + 2H₂O and must be collected dry. The correct procedure is to pass the gas through:",
    stemZh: "实验室用 MnO₂ + 4HCl(浓) → MnCl₂ + Cl₂↑ + 2H₂O 制取氯气，需收集干燥的氯气。正确的操作是让气体依次通过？",
    options: [
      "water, then collect over water",
      "NaOH solution, then upward displacement of air",
      "saturated NaCl solution, then concentrated H₂SO₄, then upward displacement of air",
      "concentrated H₂SO₄ only, then collect over water",
    ],
    optionsZh: [
      "水，然后用排水法收集",
      "NaOH 溶液，然后用向上排空气法收集",
      "饱和食盐水，然后浓硫酸，最后用向上排空气法收集",
      "只用浓硫酸，然后用排水法收集",
    ],
    correct: 2,
    explanation:
      "The gas carries HCl vapour and water vapour. Saturated NaCl solution removes HCl without dissolving much Cl₂, concentrated H₂SO₄ dries the gas, and because Cl₂ is denser than air (M = 71) it is collected by upward displacement of air. Water or NaOH would dissolve the Cl₂, and Cl₂ is fairly soluble in water so collection over water loses product.",
    explanationZh:
      "气体中混有 HCl 和水蒸气。饱和食盐水可除去 HCl 而几乎不溶解 Cl₂，浓硫酸用于干燥，Cl₂ 密度比空气大（M = 71），故用向上排空气法收集。水和 NaOH 都会吸收 Cl₂，且 Cl₂ 在水中溶解度较大，排水法会损失产物。",
    tags: ["chlorine", "gas purification", "drying agent"],
  },
  {
    topic: "C4.2",
    difficulty: "EASY",
    stem: "A glowing splint relights when placed in a gas. The gas is:",
    stemZh: "将带火星的木条伸入某气体中，木条复燃。该气体是？",
    options: ["O₂", "CO₂", "N₂", "H₂"],
    optionsZh: ["O₂", "CO₂", "N₂", "H₂"],
    correct: 0,
    explanation:
      "O₂ supports combustion, so a glowing splint bursts into flame. CO₂ and N₂ extinguish a flame, and H₂ burns itself with a 'pop' rather than relighting the splint.",
    explanationZh:
      "O₂ 支持燃烧，能使带火星的木条复燃。CO₂ 和 N₂ 会熄灭火焰；H₂ 本身可燃，点燃时发出爆鸣声，而不能使木条复燃。",
    tags: ["oxygen test", "gas identification", "combustion"],
  },
  {
    topic: "C4.3",
    difficulty: "MEDIUM",
    stem: "A mixture of sand and salt water is best separated by:",
    stemZh: "分离沙子和食盐水混合物的最佳方法是？",
    options: [
      "evaporating the mixture to dryness, then filtering",
      "using a separating funnel",
      "using paper chromatography",
      "filtering the mixture, then evaporating the filtrate",
    ],
    optionsZh: [
      "先蒸发至干，再过滤",
      "使用分液漏斗",
      "使用纸层析",
      "先过滤，再蒸发滤液",
    ],
    correct: 3,
    explanation:
      "Sand is insoluble, so filtration removes it as the residue; the salt stays in the filtrate, which is then evaporated to recover solid NaCl. Evaporating first traps the sand in the salt, a separating funnel works only for immiscible liquids, and chromatography is for separating dissolved substances in small amounts.",
    explanationZh:
      "沙子不溶，先过滤将其作为滤渣除去；食盐留在滤液中，再蒸发滤液即可得到 NaCl 固体。先蒸干会把沙子混入盐中；分液漏斗只适用于互不相溶的液体；纸层析用于分离少量溶解性物质。",
    tags: ["filtration", "evaporation", "separation"],
  },
  {
    topic: "C4.3",
    difficulty: "EASY",
    stem: "A mixture of ethanol (b.p. 78 °C) and water (b.p. 100 °C) is best separated by:",
    stemZh: "分离乙醇（沸点 78 °C）和水（沸点 100 °C）的混合物，最佳方法是？",
    options: ["Filtration", "Fractional distillation", "Evaporation to dryness", "Using a separating funnel"],
    optionsZh: ["过滤", "分馏", "蒸发至干", "使用分液漏斗"],
    correct: 1,
    explanation:
      "The two liquids are miscible and have different boiling points, so fractional distillation separates them: ethanol vaporises first and is condensed. Filtration and separating funnels work only for insoluble or immiscible phases.",
    explanationZh:
      "两种液体互溶但沸点不同，可用分馏分离：乙醇先汽化再冷凝收集。过滤只适用于不溶物，分液漏斗只适用于互不相溶的液体。",
    tags: ["distillation", "boiling point", "miscible liquids"],
  },
  {
    topic: "C4.3",
    difficulty: "MEDIUM",
    stem: "Which drying agent CANNOT be used to dry ammonia gas?",
    stemZh: "下列干燥剂中不能用来干燥氨气的是？",
    options: ["Soda lime (NaOH + CaO)", "Anhydrous CaCl₂", "Concentrated H₂SO₄", "Silica gel"],
    optionsZh: ["碱石灰（NaOH + CaO）", "无水 CaCl₂", "浓硫酸", "硅胶"],
    correct: 2,
    explanation:
      "Concentrated H₂SO₄ is an acid and reacts with the basic gas NH₃ to form (NH₄)₂SO₄, so it destroys the gas instead of drying it. Alkaline soda lime is the standard drying agent for NH₃. (Anhydrous CaCl₂ also absorbs NH₃, forming CaCl₂·8NH₃, but the classic destructive reaction is with H₂SO₄.)",
    explanationZh:
      "浓硫酸是酸，会与碱性气体 NH₃ 反应生成 (NH₄)₂SO₄，从而消耗氨气而不能干燥。碱石灰是干燥 NH₃ 的常用干燥剂。（无水 CaCl₂ 也会与 NH₃ 生成 CaCl₂·8NH₃，但最典型的完全反应是 NH₃ 与 H₂SO₄ 反应。）",
    tags: ["ammonia", "drying agent", "acid-base reaction"],
  },
  {
    topic: "C4.4",
    difficulty: "MEDIUM",
    stem: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0. Which conditions are used in the industrial Haber process?",
    stemZh: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)，ΔH < 0。工业合成氨采用的条件是？",
    options: [
      "About 400–500 °C, 10–30 MPa, iron catalyst",
      "About 100 °C, 1 atm, platinum catalyst",
      "About 1000 °C, 1 atm, V₂O₅ catalyst",
      "About 25 °C, 1 atm, no catalyst",
    ],
    optionsZh: [
      "约 400–500 °C、10–30 MPa、铁触媒",
      "约 100 °C、1 atm、铂催化剂",
      "约 1000 °C、1 atm、V₂O₅ 催化剂",
      "约 25 °C、1 atm、无催化剂",
    ],
    correct: 0,
    explanation:
      "High pressure favours NH₃ (4 mol → 2 mol gas), so 10–30 MPa is used. Low temperature favours the exothermic forward reaction, but the rate would be far too slow, so a compromise of 400–500 °C with an iron catalyst is chosen; the catalyst also lets the plant reach equilibrium faster.",
    explanationZh:
      "高压有利于生成 NH₃（气体由 4 mol 变为 2 mol），故采用 10–30 MPa。低温有利于放热反应，但速率过慢，因此折中选用 400–500 °C 并加铁触媒；催化剂还能使体系更快达到平衡。",
    tags: ["Haber process", "compromise conditions", "industrial chemistry"],
  },
  {
    topic: "C4.4",
    difficulty: "HARD",
    stem: "Which sequence correctly describes the contact process for manufacturing sulfuric acid?",
    stemZh: "下列哪一流程正确描述了接触法制硫酸的步骤？",
    options: [
      "SO₂ is absorbed in water to give concentrated H₂SO₄ directly",
      "SO₃ is absorbed in water to give H₂SO₄ directly",
      "Sulfur is burned to SO₃, which is then reduced to H₂SO₄",
      "Sulfur is burned to SO₂, SO₂ is oxidised to SO₃ over V₂O₅ at about 450 °C, and SO₃ is absorbed in concentrated H₂SO₄",
    ],
    optionsZh: [
      "SO₂ 直接被水吸收即得浓硫酸",
      "SO₃ 直接用水吸收即得硫酸",
      "硫燃烧生成 SO₃，再还原得到 H₂SO₄",
      "硫燃烧生成 SO₂，SO₂ 在约 450 °C 下经 V₂O₅ 催化氧化为 SO₃，SO₃ 用浓硫酸吸收",
    ],
    correct: 3,
    explanation:
      "The contact process is: S + O₂ → SO₂; 2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅, about 450 °C, 1 atm); SO₃ + H₂SO₄ → H₂S₂O₇ (oleum), which is then diluted with water to give H₂SO₄. SO₃ is NOT absorbed in water directly, because the reaction is violently exothermic and produces an acid mist that is hard to condense.",
    explanationZh:
      "接触法的流程为：S + O₂ → SO₂；2SO₂ + O₂ ⇌ 2SO₃（V₂O₅ 催化，约 450 °C、1 atm）；SO₃ + H₂SO₄ → H₂S₂O₇（发烟硫酸），再用水稀释得到 H₂SO₄。SO₃ 不能直接用水吸收，因为反应剧烈放热并形成难以冷凝的酸雾。",
    tags: ["contact process", "sulfuric acid", "industrial chemistry"],
  },
  {
    topic: "C4.4",
    difficulty: "MEDIUM",
    stem: "In the blast furnace, iron(III) oxide is mainly reduced by:",
    stemZh: "在高炉炼铁中，氧化铁主要被什么物质还原？",
    options: ["Carbon (coke)", "Carbon monoxide", "Calcium carbonate", "Silicon dioxide"],
    optionsZh: ["碳（焦炭）", "一氧化碳", "碳酸钙", "二氧化硅"],
    correct: 1,
    explanation:
      "Coke burns near the bottom to give CO₂, which is then reduced by more coke to CO: C + CO₂ → 2CO. The CO rising through the furnace reduces the ore: Fe₂O₃ + 3CO → 2Fe + 3CO₂. CaCO₃ is the flux (removes SiO₂ as slag) and SiO₂ is the impurity removed.",
    explanationZh:
      "焦炭在炉底燃烧生成 CO₂，CO₂ 再与焦炭反应生成 CO：C + CO₂ → 2CO。上升的 CO 还原铁矿石：Fe₂O₃ + 3CO → 2Fe + 3CO₂。CaCO₃ 是造渣剂（把 SiO₂ 变成炉渣除去），SiO₂ 则是被除去的杂质。",
    tags: ["blast furnace", "reduction", "iron extraction"],
  },
];
