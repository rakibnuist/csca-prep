import type { SeedQuestion } from "../types";

/**
 * Official CSCA Chemistry — April 2026 pre-exam sprint review, Module 1
 * (Basic Chemical Concepts and Calculations). 20 questions, bilingual.
 *
 * This is a module review sheet rather than a full 48-question sitting; it is
 * labelled accordingly in the Official Q&A list.
 */
export const officialChemistryAprReviewQuestions: SeedQuestion[] = [
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following is a chemical change?",
    stemZh: "下列变化属于化学变化的是",
    options: ["Ice melting", "Alcohol volatilization", "Paper burning", "Glass breaking"],
    optionsZh: ["冰雪融化", "酒精挥发", "纸张燃烧", "玻璃破碎"],
    correct: 2,
    explanation:
      "Burning paper produces new substances (CO₂, H₂O, ash), so it is a chemical change. Melting, evaporation and breaking are physical changes.",
    explanationZh:
      "纸张燃烧生成 CO₂、H₂O 和灰烬等新物质，属于化学变化；融化、挥发、破碎均为物理变化。",
    tags: ["physical and chemical changes"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following is a pure substance?",
    stemZh: "下列物质属于纯净物的是",
    options: ["Air", "Ice-water mixture", "Seawater", "Clear limewater"],
    optionsZh: ["空气", "冰水混合物", "海水", "澄清石灰水"],
    correct: 1,
    explanation:
      "An ice-water mixture contains only H₂O, so it is a pure substance. Air, seawater and limewater are mixtures.",
    explanationZh:
      "冰水混合物只含 H₂O，属于纯净物；空气、海水、澄清石灰水均为混合物。",
    tags: ["pure substances", "mixtures"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "Which chemical notation is correct?",
    stemZh: "化学用语书写正确的是",
    options: [
      "2 hydrogen atoms: H₂",
      "3 iron ions: 3Fe²⁺",
      "Magnesium oxide: MgO₂",
      "4 water molecules: 4H₂O",
    ],
    optionsZh: [
      "2 个氢原子：H₂",
      "3 个铁离子：3Fe²⁺",
      "氧化镁：MgO₂",
      "4 个水分子：4H₂O",
    ],
    correct: 3,
    explanation:
      "4H₂O correctly denotes four water molecules. Two hydrogen atoms should be 2H, iron(III) ions are Fe³⁺, and magnesium oxide is MgO.",
    explanationZh:
      "4H₂O 正确表示 4 个水分子。2 个氢原子应写为 2H，铁离子为 Fe³⁺，氧化镁为 MgO。",
    tags: ["chemical notation"],
  },
  {
    topic: "C2.3",
    difficulty: "MEDIUM",
    stem: "The oxidation states of nitrogen in NH₄NO₃ are",
    stemZh: "NH₄NO₃ 中氮元素的化合价分别为",
    options: ["−3, +5", "+3, +5", "−3, −3", "+5, −3"],
    optionsZh: ["−3、+5", "+3、+5", "−3、−3", "+5、−3"],
    correct: 0,
    explanation:
      "In NH₄⁺, N is −3; in NO₃⁻, N is +5. The two nitrogen atoms therefore have oxidation states −3 and +5.",
    explanationZh:
      "NH₄⁺ 中 N 为 −3，NO₃⁻ 中 N 为 +5，故两个氮原子的化合价分别为 −3 和 +5。",
    tags: ["oxidation states", "nitrogen"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "50 mL is taken from 1 L of 0.5 mol·L⁻¹ NaCl solution. Its concentration is",
    stemZh: "从 1 L 0.5 mol·L⁻¹ NaCl 溶液中取出 50 mL，其浓度为",
    options: ["0.05 mol·L⁻¹", "0.5 mol·L⁻¹", "5 mol·L⁻¹", "1 mol·L⁻¹"],
    optionsZh: ["0.05 mol·L⁻¹", "0.5 mol·L⁻¹", "5 mol·L⁻¹", "1 mol·L⁻¹"],
    correct: 1,
    explanation:
      "A solution is homogeneous, so taking a portion does not change the concentration. It remains 0.5 mol·L⁻¹.",
    explanationZh:
      "溶液具有均一性，取出部分后浓度不变，仍为 0.5 mol·L⁻¹。",
    tags: ["concentration"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which substance is an oxide?",
    stemZh: "下列物质属于氧化物的是",
    options: ["O₂", "KMnO₄", "H₂O", "NaOH"],
    optionsZh: ["O₂", "KMnO₄", "H₂O", "NaOH"],
    correct: 2,
    explanation:
      "An oxide is a compound of two elements, one of which is oxygen. H₂O is an oxide; O₂ is an element, KMnO₄ is a salt and NaOH is a base.",
    explanationZh:
      "氧化物由两种元素组成，其中一种为氧。H₂O 是氧化物；O₂ 是单质，KMnO₄ 是盐，NaOH 是碱。",
    tags: ["oxides"],
  },
  {
    topic: "C3.3",
    difficulty: "EASY",
    stem: "Before and after a chemical reaction, a catalyst's",
    stemZh: "催化剂在化学反应前后",
    options: [
      "Mass decreases, chemical properties change",
      "Mass is unchanged, chemical properties are unchanged",
      "Mass increases, chemical properties change",
      "Mass is unchanged, chemical properties change",
    ],
    optionsZh: [
      "质量减少，化学性质改变",
      "质量不变，化学性质不变",
      "质量增加，化学性质改变",
      "质量不变，化学性质改变",
    ],
    correct: 1,
    explanation:
      "A catalyst changes the reaction rate but its mass and chemical properties are unchanged before and after the reaction.",
    explanationZh:
      "催化剂改变反应速率，但反应前后其质量和化学性质均不变。",
    tags: ["catalysts"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "At 25°C, the pH of 0.1 mol·L⁻¹ hydrochloric acid is",
    stemZh: "25°C 时，0.1 mol·L⁻¹ 盐酸的 pH 为",
    options: ["1", "2", "7", "13"],
    optionsZh: ["1", "2", "7", "13"],
    correct: 0,
    explanation:
      "HCl is a strong acid and ionizes completely: c(H⁺) = 0.1 mol·L⁻¹, so pH = 1.",
    explanationZh:
      "盐酸是强酸，完全电离，c(H⁺) = 0.1 mol·L⁻¹，故 pH = 1。",
    tags: ["pH", "strong acids"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which substance is a non-electrolyte?",
    stemZh: "下列属于非电解质的是",
    options: ["Sucrose", "NaCl", "Sulfuric acid", "NaOH"],
    optionsZh: ["蔗糖", "氯化钠", "硫酸", "氢氧化钠"],
    correct: 0,
    explanation:
      "Sucrose does not ionize in water, so it is a non-electrolyte. NaCl, H₂SO₄ and NaOH are electrolytes.",
    explanationZh:
      "蔗糖在水中不电离，属于非电解质；NaCl、H₂SO₄、NaOH 均为电解质。",
    tags: ["electrolytes"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "Which pair are allotropes?",
    stemZh: "下列属于同素异形体的是",
    options: ["Water and hydrogen peroxide", "Oxygen and ozone", "CO and CO₂", "Ice and dry ice"],
    optionsZh: ["水和过氧化氢", "氧气和臭氧", "一氧化碳和二氧化碳", "冰和干冰"],
    correct: 1,
    explanation:
      "O₂ and O₃ are different elementary forms of oxygen, so they are allotropes. The other pairs are different compounds or the same compound in different states.",
    explanationZh:
      "O₂ 和 O₃ 是由氧元素组成的不同单质，互为同素异形体；其余为不同化合物或同种物质的不同状态。",
    tags: ["allotropes"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "What remains unchanged before and after a chemical reaction?",
    stemZh: "化学反应前后一定不变的是",
    options: ["Molecular type", "Substance type", "Atomic type and number", "Molecular number"],
    optionsZh: ["分子种类", "物质种类", "原子种类与数目", "分子数目"],
    correct: 2,
    explanation:
      "Atoms are neither created nor destroyed in a chemical reaction, so the types and numbers of atoms are conserved.",
    explanationZh:
      "化学反应中原子既不会凭空产生也不会消失，故原子的种类和数目不变。",
    tags: ["conservation of mass", "atoms"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which solution is neutral?",
    stemZh: "下列溶液呈中性的是",
    options: ["NaCl solution", "Na₂CO₃ solution", "NH₄Cl solution", "NaOH solution"],
    optionsZh: ["NaCl 溶液", "Na₂CO₃ 溶液", "NH₄Cl 溶液", "NaOH 溶液"],
    correct: 0,
    explanation:
      "NaCl is a salt of a strong acid and strong base; it does not hydrolyze, so its solution is neutral. Na₂CO₃ is alkaline, NH₄Cl is acidic and NaOH is strongly alkaline.",
    explanationZh:
      "NaCl 是强酸强碱盐，不水解，溶液呈中性；Na₂CO₃ 显碱性，NH₄Cl 显酸性，NaOH 显强碱性。",
    tags: ["salt solutions", "neutrality"],
  },
  {
    topic: "C1.4",
    difficulty: "EASY",
    stem: "At STP, the amount of substance of 11.2 L H₂ is",
    stemZh: "标准状况下，11.2 L H₂ 的物质的量为",
    options: ["0.5 mol", "1 mol", "2 mol", "0.25 mol"],
    optionsZh: ["0.5 mol", "1 mol", "2 mol", "0.25 mol"],
    correct: 0,
    explanation:
      "At STP, 1 mol of gas occupies 22.4 L, so n = 11.2/22.4 = 0.5 mol.",
    explanationZh:
      "标准状况下气体摩尔体积为 22.4 L·mol⁻¹，故 n = 11.2/22.4 = 0.5 mol。",
    tags: ["moles", "gas volume"],
  },
  {
    topic: "C1.4",
    difficulty: "EASY",
    stem: "To prepare 100 mL of 1 mol·L⁻¹ NaOH solution, the mass of NaOH needed is",
    stemZh: "配制 100 mL 1 mol·L⁻¹ NaOH 溶液，所需 NaOH 固体的质量为",
    options: ["4 g", "40 g", "0.4 g", "400 g"],
    optionsZh: ["4 g", "40 g", "0.4 g", "400 g"],
    correct: 0,
    explanation:
      "n = cV = 1 × 0.1 = 0.1 mol; m = nM = 0.1 × 40 = 4 g.",
    explanationZh:
      "n = cV = 1×0.1 = 0.1 mol，m = nM = 0.1×40 = 4 g。",
    tags: ["moles", "solutions"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "Which reaction is a redox reaction?",
    stemZh: "下列反应属于氧化还原反应的是",
    options: [
      "HCl + NaOH = NaCl + H₂O",
      "CaCO₃ → CaO + CO₂↑",
      "Zn + 2HCl = ZnCl₂ + H₂↑",
      "CO₂ + H₂O = H₂CO₃",
    ],
    optionsZh: [
      "HCl + NaOH = NaCl + H₂O",
      "CaCO₃ → CaO + CO₂↑",
      "Zn + 2HCl = ZnCl₂ + H₂↑",
      "CO₂ + H₂O = H₂CO₃",
    ],
    correct: 2,
    explanation:
      "In Zn + 2HCl, zinc is oxidized from 0 to +2 and hydrogen is reduced from +1 to 0. The other reactions involve no oxidation-state changes.",
    explanationZh:
      "Zn + 2HCl 中，Zn 由 0 价升到 +2 价，H 由 +1 价降到 0 价，属于氧化还原反应；其余反应没有化合价变化。",
    tags: ["redox"],
  },
  {
    topic: "C1.3",
    difficulty: "MEDIUM",
    stem: "100 mL of 0.02 mol·L⁻¹ H₂SO₄ is diluted to 200 mL. c(H⁺) is",
    stemZh: "将 100 mL 0.02 mol·L⁻¹ H₂SO₄ 稀释至 200 mL，c(H⁺) 为",
    options: ["0.02 mol·L⁻¹", "0.01 mol·L⁻¹", "0.04 mol·L⁻¹", "0.005 mol·L⁻¹"],
    optionsZh: ["0.02 mol·L⁻¹", "0.01 mol·L⁻¹", "0.04 mol·L⁻¹", "0.005 mol·L⁻¹"],
    correct: 0,
    explanation:
      "H₂SO₄ gives 2H⁺, so before dilution c(H⁺) = 0.04 mol·L⁻¹. Doubling the volume halves it to 0.02 mol·L⁻¹.",
    explanationZh:
      "H₂SO₄ 提供 2 个 H⁺，稀释前 c(H⁺) = 0.04 mol·L⁻¹；体积扩大一倍，浓度减半为 0.02 mol·L⁻¹。",
    tags: ["dilution", "pH"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "In which substance is the oxidation state of sulfur the highest?",
    stemZh: "下列物质中，硫元素化合价最高的是",
    options: ["H₂S", "S", "SO₂", "H₂SO₄"],
    optionsZh: ["H₂S", "S", "SO₂", "H₂SO₄"],
    correct: 3,
    explanation:
      "S oxidation states: H₂S −2, S 0, SO₂ +4, H₂SO₄ +6. H₂SO₄ has the highest.",
    explanationZh:
      "硫的化合价：H₂S 为 −2，S 为 0，SO₂ 为 +4，H₂SO₄ 为 +6，故 H₂SO₄ 最高。",
    tags: ["oxidation states", "sulfur"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which substance is an electrolyte?",
    stemZh: "下列属于电解质的是",
    options: ["Copper", "Ethanol", "KNO₃", "Glucose"],
    optionsZh: ["铜", "乙醇", "硝酸钾", "葡萄糖"],
    correct: 2,
    explanation:
      "KNO₃ is an ionic compound that conducts electricity in solution or molten state, so it is an electrolyte. Copper is an element; ethanol and glucose are non-electrolytes.",
    explanationZh:
      "KNO₃ 在水溶液或熔融状态下能导电，属于电解质；铜是单质，乙醇、葡萄糖是非电解质。",
    tags: ["electrolytes"],
  },
  {
    topic: "C3.3",
    difficulty: "EASY",
    stem: "For 2SO₂ + O₂ ⇌ 2SO₃, which is the sign that equilibrium has been reached?",
    stemZh: "反应 2SO₂ + O₂ ⇌ 2SO₃ 达到平衡的标志是",
    options: [
      "v(forward) = v(reverse) ≠ 0",
      "c(SO₂) = c(O₂)",
      "The reaction stops",
      "c(SO₃) = 0",
    ],
    optionsZh: [
      "v(正) = v(逆) ≠ 0",
      "c(SO₂) = c(O₂)",
      "反应停止",
      "c(SO₃) = 0",
    ],
    correct: 0,
    explanation:
      "At equilibrium the forward and reverse rates are equal and non-zero. Concentrations remain constant, but are not necessarily equal, and the reaction does not stop.",
    explanationZh:
      "平衡时正、逆反应速率相等且不为零；各组分浓度保持不变，但不一定相等，反应也未停止。",
    tags: ["equilibrium"],
  },
  {
    topic: "C3.1",
    difficulty: "MEDIUM",
    stem: "The atomic structure diagram shows +16 with shells 2, 8, 6. The element's position is",
    stemZh: "某原子结构示意图为 +16，各层电子数为 2、8、6，该元素在周期表中的位置是",
    options: [
      "Period 2, Group VIA",
      "Period 3, Group VIA",
      "Period 2, Group VIIA",
      "Period 3, Group VIIA",
    ],
    optionsZh: [
      "第二周期第 VIA 族",
      "第三周期第 VIA 族",
      "第二周期第 VIIA 族",
      "第三周期第 VIIA 族",
    ],
    figure: "/figures/official/chem-apr-review-q20.png",
    correct: 1,
    explanation:
      "The atom has 16 protons (Z = 16, sulfur) and three electron shells, so it is in Period 3. Its outermost shell has 6 electrons, so it is in Group VIA.",
    explanationZh:
      "该原子核电荷数为 16（硫），有 3 个电子层，故位于第三周期；最外层 6 个电子，故位于第 VIA 族。",
    tags: ["periodic table", "atomic structure"],
  },
];
