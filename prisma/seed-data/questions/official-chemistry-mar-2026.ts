import type { SeedQuestion } from "../types";

/**
 * Official CSCA Chemistry past paper — March 2026 sitting.
 *
 * Transcribed from the official paper and answer/analysis section (bilingual
 * CN/EN). Kept free for study, attributed to the original source.
 */
export const officialChemistryMar2026Questions: SeedQuestion[] = [
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which of the following substances is a weak electrolyte?",
    stemZh: "下列哪种物质是弱电解质？",
    options: ["NaOH (sodium hydroxide)", "HCl (hydrogen chloride)", "HNO₃ (nitric acid)", "CH₃COOH (acetic acid)"],
    optionsZh: ["氢氧化钠 NaOH", "氯化氢 HCl", "硝酸 HNO₃", "乙酸 CH₃COOH"],
    correct: 3,
    explanation:
      "A weak electrolyte only partially ionizes in water. Acetic acid is a weak acid, so it is a weak electrolyte; NaOH, HCl and HNO₃ are strong electrolytes.",
    explanationZh:
      "弱电解质在水溶液中只部分电离。乙酸是弱酸，属于弱电解质；NaOH、HCl、HNO₃ 在水中完全电离，属于强电解质。",
    tags: ["electrolytes", "acids"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "Which of the following carbonates is insoluble in water?",
    stemZh: "下列哪种碳酸盐不溶于水？",
    options: ["(NH₄)₂CO₃ (ammonium carbonate)", "Na₂CO₃ (sodium carbonate)", "CaCO₃ (calcium carbonate)", "K₂CO₃ (potassium carbonate)"],
    optionsZh: ["碳酸铵 (NH₄)₂CO₃", "碳酸钠 Na₂CO₃", "碳酸钙 CaCO₃", "碳酸钾 K₂CO₃"],
    correct: 2,
    explanation:
      "Potassium, sodium and ammonium salts are soluble. Most heavy-metal carbonates, such as calcium carbonate and barium carbonate, are insoluble.",
    explanationZh:
      "钾盐、钠盐、铵盐均可溶；碳酸钙、碳酸钡等大多数重金属碳酸盐难溶于水。",
    tags: ["solubility", "carbonates"],
  },
  {
    topic: "C2.2",
    difficulty: "EASY",
    stem: "What is the English name of CH₃CH₂OH?",
    stemZh: "CH₃CH₂OH 的英文名称是什么？",
    options: ["Acetic acid", "Ethanol", "Acetaldehyde", "Ethyl acetate"],
    optionsZh: ["乙酸", "乙醇", "乙醛", "乙酸乙酯"],
    correct: 1,
    explanation:
      "CH₃CH₂OH is ethanol, an alcohol containing a hydroxyl group.",
    explanationZh:
      "CH₃CH₂OH 是乙醇，含有羟基，属于醇类。",
    tags: ["organic chemistry", "alcohols"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "What is the main component of table salt?",
    stemZh: "食盐的主要成分是什么？",
    options: ["NaOH", "NaCl", "Na₂SO₄", "Na₂CO₃"],
    optionsZh: ["氢氧化钠", "氯化钠", "硫酸钠", "碳酸钠"],
    correct: 1,
    explanation:
      "Edible table salt is mainly sodium chloride, NaCl.",
    explanationZh:
      "食用食盐的主要化学成分是氯化钠 NaCl。",
    tags: ["substances", "salts"],
  },
  {
    topic: "C2.2",
    difficulty: "EASY",
    stem: "Which pair of substances are homologs of each other?",
    stemZh: "下列哪对物质互为同系物？",
    options: [
      "Ethanol and acetaldehyde",
      "Ethane and propane",
      "Ethene and methane",
      "Ethyne and benzene",
    ],
    optionsZh: ["乙醇和乙醛", "乙烷和丙烷", "乙烯和甲烷", "乙炔和苯"],
    correct: 1,
    explanation:
      "Homologs have similar structures and differ by one or more CH₂ groups. Ethane and propane are both alkanes differing by one CH₂.",
    explanationZh:
      "同系物结构相似，分子组成相差一个或若干个 CH₂ 原子团。乙烷和丙烷都是烷烃，相差一个 CH₂，互为同系物。",
    tags: ["organic chemistry", "homologs"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "What is the number of neutrons in the nuclide ¹⁴₆C?",
    stemZh: "核素 ¹⁴₆C 中的中子数是多少？",
    options: ["12", "14", "8", "6"],
    optionsZh: ["12", "14", "8", "6"],
    correct: 2,
    explanation:
      "Neutrons = mass number − proton number = 14 − 6 = 8.",
    explanationZh:
      "中子数 = 质量数 − 质子数 = 14 − 6 = 8。",
    tags: ["atomic structure", "isotopes"],
  },
  {
    topic: "C3.4",
    difficulty: "MEDIUM",
    stem: "Which of the following solutions is acidic because of salt hydrolysis?",
    stemZh: "下列哪种溶液因盐的水解而呈酸性？",
    options: ["Na₂S (sodium sulfide)", "NaHCO₃ (sodium bicarbonate)", "Na₂CO₃ (sodium carbonate)", "AlCl₃ (aluminum chloride)"],
    optionsZh: ["硫化钠 Na₂S", "碳酸氢钠 NaHCO₃", "碳酸钠 Na₂CO₃", "氯化铝 AlCl₃"],
    correct: 3,
    explanation:
      "AlCl₃ is a strong-acid/weak-base salt; Al³⁺ hydrolyzes to produce H⁺, making the solution acidic. The other salts are strong-base/weak-acid salts and hydrolyze to alkaline solutions.",
    explanationZh:
      "AlCl₃ 是强酸弱碱盐，Al³⁺ 水解产生 H⁺，溶液呈酸性；其余均为强碱弱酸盐，水解显碱性。",
    tags: ["salt hydrolysis", "acidity"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following substances is a mixture?",
    stemZh: "下列哪种物质是混合物？",
    options: ["NaOH", "Ammonia solution", "Oxygen", "Sulfuric acid"],
    optionsZh: ["氢氧化钠", "氨水", "氧气", "硫酸"],
    correct: 1,
    explanation:
      "Ammonia solution is ammonia dissolved in water and contains NH₃, NH₃·H₂O and H₂O, so it is a mixture. The others are pure substances.",
    explanationZh:
      "氨水是氨气溶于水形成的溶液，含 NH₃、NH₃·H₂O、H₂O 等多种粒子，属于混合物；其余为纯净物。",
    tags: ["substances", "mixtures"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "When a solution is tested with litmus paper and the paper turns blue, the solution is",
    stemZh: "用石蕊试纸测试某溶液，试纸变蓝，则该溶液",
    options: ["Acidic", "Alkaline", "Cannot be determined", "Neutral"],
    optionsZh: ["呈酸性", "呈碱性", "无法确定", "呈中性"],
    correct: 1,
    explanation:
      "Purple litmus turns red in acid, blue in alkali, and stays purple in neutral solution. Blue means alkaline.",
    explanationZh:
      "紫色石蕊遇酸变红、遇碱变蓝、中性不变色。变蓝说明溶液呈碱性。",
    tags: ["acids and bases", "indicators"],
  },
  {
    topic: "C3.1",
    difficulty: "MEDIUM",
    stem: "Which of the following elements has the smallest atomic radius?",
    stemZh: "下列元素中原子半径最小的是？",
    options: ["Al", "P", "Na", "Mg"],
    optionsZh: ["铝 Al", "磷 P", "钠 Na", "镁 Mg"],
    correct: 1,
    explanation:
      "Across Period 3, atomic radius decreases from left to right: Na > Mg > Al > P. Phosphorus has the smallest radius.",
    explanationZh:
      "第三周期主族元素从左到右原子半径逐渐减小：Na > Mg > Al > P，故磷的原子半径最小。",
    tags: ["periodic table", "atomic radius"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following substances is an oxide?",
    stemZh: "下列哪种物质是氧化物？",
    options: ["H₂O (water)", "CaCO₃ (calcium carbonate)", "O₂ (oxygen)", "NaOH (sodium hydroxide)"],
    optionsZh: ["水 H₂O", "碳酸钙 CaCO₃", "氧气 O₂", "氢氧化钠 NaOH"],
    correct: 0,
    explanation:
      "An oxide is a compound of two elements, one of which is oxygen. Water is an oxide; CaCO₃ is a salt, O₂ is an element and NaOH is a base.",
    explanationZh:
      "氧化物由两种元素组成，其中一种为氧元素。水是氧化物；CaCO₃ 是盐，O₂ 是单质，NaOH 是碱。",
    tags: ["substances", "oxides"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "What is the fundamental reason that Na and K have similar chemical properties?",
    stemZh: "Na 和 K 化学性质相似的根本原因是什么？",
    options: [
      "Both can react with acids",
      "Each of their atoms has 1 electron in the outermost shell",
      "Both can react with water to form alkalis",
      "Both are metals",
    ],
    optionsZh: ["都能与酸反应", "原子最外层都只有 1 个电子", "都能与水反应生成碱", "都是金属"],
    correct: 1,
    explanation:
      "Chemical properties are determined mainly by the outermost electrons. Both Na and K are Group IA elements with one outermost electron.",
    explanationZh:
      "元素化学性质主要由最外层电子数决定。Na、K 均为第 IA 族元素，最外层只有 1 个电子。",
    tags: ["periodic table", "group IA"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which of the following substances is an electrolyte?",
    stemZh: "下列物质属于电解质的是？",
    options: ["Carbon dioxide", "Sucrose", "Metallic aluminum", "Sodium chloride"],
    optionsZh: ["二氧化碳", "蔗糖", "金属铝", "氯化钠"],
    correct: 3,
    explanation:
      "NaCl conducts electricity in aqueous solution or molten state, so it is an electrolyte. CO₂ and sucrose are non-electrolytes; aluminum is an element.",
    explanationZh:
      "NaCl 在水溶液或熔融状态下能导电，属于电解质；CO₂、蔗糖是非电解质；铝是单质。",
    tags: ["electrolytes"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "What is the structure of an atom?",
    stemZh: "原子的构成是什么？",
    options: ["Neutrons and protons", "Protons and electrons", "Atomic nucleus and electrons", "Neutrons and electrons"],
    optionsZh: ["中子和质子", "质子和电子", "原子核和电子", "中子和电子"],
    correct: 2,
    explanation:
      "An atom consists of a central nucleus and electrons moving around it; the nucleus contains protons and neutrons.",
    explanationZh:
      "原子由位于中心的原子核和核外电子构成；原子核由质子和中子构成。",
    tags: ["atomic structure"],
  },
  {
    topic: "C2.2",
    difficulty: "EASY",
    stem: "Which of the following substances can undergo hydrolysis under certain conditions?",
    stemZh: "下列物质在一定条件下能发生水解反应的是？",
    options: ["Benzene", "Methane", "Ethanol", "Ethyl acetate"],
    optionsZh: ["苯", "甲烷", "乙醇", "乙酸乙酯"],
    correct: 3,
    explanation:
      "Esters hydrolyze under acidic or alkaline conditions to an acid and an alcohol. Ethyl acetate hydrolyzes to acetic acid and ethanol.",
    explanationZh:
      "酯在酸性或碱性条件下水解生成酸和醇。乙酸乙酯水解生成乙酸和乙醇。",
    tags: ["organic chemistry", "esters", "hydrolysis"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "Which group of substances are allotropes of the same element?",
    stemZh: "下列哪组物质是同种元素的同素异形体？",
    options: [
      "Diamond and graphite",
      "¹²C and ¹⁴C",
      "CO and CO₂",
      "Methane and propane",
    ],
    optionsZh: ["金刚石和石墨", "¹²C 和 ¹⁴C", "CO 和 CO₂", "甲烷和丙烷"],
    correct: 0,
    explanation:
      "Diamond and graphite are different elementary forms of carbon, so they are allotropes. ¹²C and ¹⁴C are isotopes; CO and CO₂ are different compounds; methane and propane are homologs.",
    explanationZh:
      "金刚石和石墨都是由碳元素组成的不同单质，互为同素异形体。¹²C 和 ¹⁴C 是同位素；CO 和 CO₂ 是不同化合物；甲烷和丙烷是同系物。",
    tags: ["allotropes", "carbon"],
  },
  {
    topic: "C2.2",
    difficulty: "EASY",
    stem: "Under certain lighting conditions, which substance can undergo a substitution reaction with methane?",
    stemZh: "在一定光照条件下，下列哪种物质能与甲烷发生取代反应？",
    options: ["H₂", "HCl", "Cl₂", "O₂"],
    optionsZh: ["氢气", "氯化氢", "氯气", "氧气"],
    correct: 2,
    explanation:
      "Under light, methane undergoes stepwise substitution with chlorine, forming chloromethanes and HCl.",
    explanationZh:
      "光照下甲烷与氯气发生逐步取代反应，生成一氯甲烷、二氯甲烷、三氯甲烷、四氯化碳和氯化氢。",
    tags: ["alkanes", "substitution"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "What is the oxidation state of carbon in K₂CO₃?",
    stemZh: "K₂CO₃ 中碳的化合价是多少？",
    options: ["+2", "−2", "+4", "0"],
    optionsZh: ["+2", "−2", "+4", "0"],
    correct: 2,
    explanation:
      "With K = +1 and O = −2: 2(+1) + x + 3(−2) = 0, so x = +4.",
    explanationZh:
      "K 为 +1，O 为 −2：2(+1) + x + 3(−2) = 0，解得 x = +4。",
    tags: ["oxidation states"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "Which group of gases are all colorless and odorless?",
    stemZh: "下列哪组气体均为无色无味？",
    options: ["CH₄, Cl₂", "NH₃, SO₂", "H₂, O₂", "CO, NO₂"],
    optionsZh: ["甲烷、氯气", "氨气、二氧化硫", "氢气、氧气", "一氧化碳、二氧化氮"],
    correct: 2,
    explanation:
      "H₂ and O₂ are colorless and odorless. Cl₂ is yellow-green, NH₃ and SO₂ have pungent odors, and NO₂ is reddish-brown.",
    explanationZh:
      "H₂ 和 O₂ 均为无色无味气体；Cl₂ 呈黄绿色，NH₃、SO₂ 有刺激性气味，NO₂ 呈红棕色。",
    tags: ["gas properties"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "50 mL is taken from 1 L of 1 mol·L⁻¹ NaOH solution. The molar concentration of the 50 mL portion is",
    stemZh: "从 1 L 1 mol·L⁻¹ NaOH 溶液中取出 50 mL，这 50 mL 溶液的物质的量浓度是",
    options: ["2 mol·L⁻¹", "0.2 mol·L⁻¹", "0.02 mol·L⁻¹", "1 mol·L⁻¹"],
    optionsZh: ["2 mol·L⁻¹", "0.2 mol·L⁻¹", "0.02 mol·L⁻¹", "1 mol·L⁻¹"],
    correct: 3,
    explanation:
      "A solution is homogeneous; taking a portion does not change its concentration. The concentration remains 1 mol·L⁻¹.",
    explanationZh:
      "溶液具有均一性，取出部分后浓度不变，仍为 1 mol·L⁻¹。",
    tags: ["concentration", "solutions"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following substances is a mixture?",
    stemZh: "下列哪种物质是混合物？",
    options: ["CO₂", "Cl₂", "NaOH", "Limewater"],
    optionsZh: ["二氧化碳", "氯气", "氢氧化钠", "石灰水"],
    correct: 3,
    explanation:
      "Limewater is an aqueous solution of calcium hydroxide, so it is a mixture. The others are pure substances.",
    explanationZh:
      "石灰水是氢氧化钙的水溶液，属于混合物；其余为纯净物。",
    tags: ["mixtures", "solutions"],
  },
  {
    topic: "C2.1",
    difficulty: "MEDIUM",
    stem: "The following substances all bleach, but one has a different bleaching principle. It is",
    stemZh: "下列物质都具有漂白性，但其中一种的漂白原理与其他不同，它是",
    options: ["HClO", "SO₂", "H₂O₂", "Na₂O₂"],
    optionsZh: ["次氯酸", "二氧化硫", "过氧化氢", "过氧化钠"],
    correct: 1,
    explanation:
      "HClO, H₂O₂ and Na₂O₂ bleach by strong oxidation, irreversibly. SO₂ combines with colored substances to form unstable colorless compounds; the process is reversible on heating.",
    explanationZh:
      "HClO、H₂O₂、Na₂O₂ 通过强氧化性漂白，不可逆；SO₂ 与有色物质结合生成不稳定的无色物质，加热可恢复原色。",
    tags: ["bleaching", "sulfur dioxide"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "Which reaction produces a large amount of gas at room temperature?",
    stemZh: "下列反应在常温下能产生大量气体的是",
    options: [
      "Iron and concentrated nitric acid",
      "Aluminum and concentrated sulfuric acid",
      "Copper and dilute sulfuric acid",
      "Iron and dilute sulfuric acid",
    ],
    optionsZh: ["铁与浓硝酸", "铝与浓硫酸", "铜与稀硫酸", "铁与稀硫酸"],
    correct: 3,
    explanation:
      "Iron reacts with dilute sulfuric acid to give FeSO₄ and H₂. Iron passivates in concentrated HNO₃, aluminum passivates in concentrated H₂SO₄, and copper does not react with dilute H₂SO₄.",
    explanationZh:
      "铁与稀硫酸反应生成硫酸亚铁和氢气。铁遇浓硝酸、铝遇浓硫酸钝化，铜与稀硫酸不反应。",
    tags: ["metals", "acids"],
  },
  {
    topic: "C3.3",
    difficulty: "EASY",
    stem: "When a reaction reaches equilibrium, which quantity is always equal?",
    stemZh: "反应达到平衡时，下列哪个量总是相等？",
    options: [
      "Concentrations of reactants and products",
      "Forward reaction rate and reverse reaction rate",
      "Masses of reactants and products",
      "Time atoms spend in reactant and product molecules",
    ],
    optionsZh: ["反应物与生成物的浓度", "正反应速率与逆反应速率", "反应物与生成物的质量", "原子在反应物和生成物分子中停留的时间"],
    correct: 1,
    explanation:
      "At equilibrium the forward and reverse rates are equal. Concentrations and masses remain constant but are not necessarily equal.",
    explanationZh:
      "化学平衡的本质是正、逆反应速率相等；各组分浓度、质量保持不变，但不一定相等。",
    tags: ["equilibrium"],
  },
  {
    topic: "C4.2",
    difficulty: "EASY",
    stem: "What catalyst is commonly used when preparing oxygen from KClO₃ in the laboratory?",
    stemZh: "实验室用 KClO₃ 制取氧气时，常用的催化剂是",
    options: ["MnCl₂", "MnO₂", "MnSO₄", "MnO"],
    optionsZh: ["氯化锰", "二氧化锰", "硫酸锰", "氧化锰"],
    correct: 1,
    explanation:
      "Manganese dioxide, MnO₂, catalyzes the decomposition of potassium chlorate; its mass and chemical properties are unchanged.",
    explanationZh:
      "二氧化锰 MnO₂ 催化氯酸钾分解，反应前后其质量和化学性质不变。",
    tags: ["laboratory", "catalysts"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "For N₂ + 3H₂ ⇌ 2NH₃ at constant temperature and volume, which gas will not shift the equilibrium?",
    stemZh: "恒温恒容下，可逆反应 N₂ + 3H₂ ⇌ 2NH₃ 中通入下列哪种气体不会使平衡移动？",
    options: ["N₂", "H₂", "Ar", "NH₃"],
    optionsZh: ["氮气", "氢气", "氩气", "氨气"],
    correct: 2,
    explanation:
      "Adding inert argon at constant volume raises total pressure but does not change the concentrations of reactants or products, so the equilibrium does not shift.",
    explanationZh:
      "恒温恒容下通入惰性气体氩，总压增大，但各反应物、生成物浓度不变，平衡不移动。",
    tags: ["equilibrium", "le chatelier"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "The reaction between hydrochloric acid and sodium hydroxide belongs to",
    stemZh: "盐酸与氢氧化钠的反应属于",
    options: ["Displacement reaction", "Neutralization reaction", "Decomposition reaction", "Combination reaction"],
    optionsZh: ["置换反应", "中和反应", "分解反应", "化合反应"],
    correct: 1,
    explanation:
      "An acid and a base react to form salt and water; this is neutralization, a type of double displacement.",
    explanationZh:
      "酸与碱反应生成盐和水，属于中和反应，是复分解反应的一种。",
    tags: ["reaction types", "neutralization"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "Which of the following contains the largest number of atoms?",
    stemZh: "下列哪种物质所含原子数最多？",
    options: ["1 mol CH₄", "1.5 mol CO₂", "1.5 mol H₂O", "2 mol H₂S"],
    optionsZh: ["1 mol CH₄", "1.5 mol CO₂", "1.5 mol H₂O", "2 mol H₂S"],
    correct: 3,
    explanation:
      "Atoms: CH₄ 1×5 = 5 mol; CO₂ 1.5×3 = 4.5 mol; H₂O 1.5×3 = 4.5 mol; H₂S 2×3 = 6 mol. H₂S has the most.",
    explanationZh:
      "原子总物质的量：CH₄ 为 1×5 = 5 mol；CO₂ 为 1.5×3 = 4.5 mol；H₂O 为 1.5×3 = 4.5 mol；H₂S 为 2×3 = 6 mol。故 H₂S 最多。",
    tags: ["moles", "atom counting"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "What is the pH of a 0.001 mol·L⁻¹ HCl solution at room temperature?",
    stemZh: "常温下 0.001 mol·L⁻¹ 盐酸溶液的 pH 是多少？",
    options: ["12", "2", "3", "11"],
    optionsZh: ["12", "2", "3", "11"],
    correct: 2,
    explanation:
      "HCl is a strong acid and ionizes completely: c(H⁺) = 10⁻³ mol·L⁻¹, so pH = 3.",
    explanationZh:
      "HCl 是强酸，完全电离，c(H⁺) = 10⁻³ mol·L⁻¹，故 pH = 3。",
    tags: ["pH", "strong acids"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "Concentrated H₂SO₄ can be used to dry gases. This uses its",
    stemZh: "浓硫酸可用于干燥气体，这是利用它的",
    options: ["Acidity", "Water-absorbing property", "Dehydrating property", "Oxidizing property"],
    optionsZh: ["酸性", "吸水性", "脱水性", "氧化性"],
    correct: 1,
    explanation:
      "Concentrated sulfuric acid absorbs water vapour, so it is used as a drying agent. Dehydration removes H and O from organic compounds in the ratio of water.",
    explanationZh:
      "浓硫酸具有吸水性，可吸收气体中的水蒸气，故用作干燥剂。脱水性是按水的比例脱去有机物中的 H、O。",
    tags: ["sulfuric acid", "drying agents"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "In the reaction of H₂ with CuO, 22.4 L of H₂ is consumed at STP. How much Cu can be reduced?",
    stemZh: "在 H₂ 与 CuO 的加热反应中，标准状况下消耗 22.4 L H₂，可还原出多少 Cu？",
    options: ["79.6 g", "63.6 g", "47.7 g", "31.8 g"],
    optionsZh: ["79.6 g", "63.6 g", "47.7 g", "31.8 g"],
    correct: 1,
    explanation:
      "22.4 L of H₂ at STP is 1 mol. H₂ + CuO → Cu + H₂O gives 1 mol Cu, whose mass is 63.6 g.",
    explanationZh:
      "标准状况下 22.4 L H₂ 为 1 mol。由 H₂ + CuO → Cu + H₂O 得 1 mol Cu，质量为 63.6 g。",
    tags: ["stoichiometry", "moles"],
  },
  {
    topic: "C4.2",
    difficulty: "EASY",
    stem: "Which method can be used to test for carbon dioxide in the laboratory?",
    stemZh: "实验室中可用哪种方法检验二氧化碳？",
    options: [
      "Place a burning splint at the mouth of the gas bottle; the splint reignites",
      "Pass it into clear limewater; the solution becomes turbid",
      "Add BaCl₂ solution; a white precipitate forms",
      "Pass it through hot black CuO; the powder turns red",
    ],
    optionsZh: [
      "将燃着的木条放在瓶口，木条复燃",
      "通入澄清石灰水，溶液变浑浊",
      "加入 BaCl₂ 溶液，产生白色沉淀",
      "通过灼热的黑色 CuO，粉末变红",
    ],
    correct: 1,
    explanation:
      "CO₂ reacts with Ca(OH)₂ in limewater to form insoluble CaCO₃, making the solution turbid. This is the standard test.",
    explanationZh:
      "CO₂ 与石灰水中的 Ca(OH)₂ 反应生成难溶的 CaCO₃，使溶液变浑浊，这是检验 CO₂ 的常用方法。",
    tags: ["gas tests", "carbon dioxide"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "Which of the following reactions is a decomposition reaction?",
    stemZh: "下列哪个反应是分解反应？",
    options: [
      "2CO + O₂ → 2CO₂",
      "2NaHCO₃ → Na₂CO₃ + CO₂↑ + H₂O",
      "CuCl₂ + 2AgNO₃ → 2AgCl↓ + Cu(NO₃)₂",
      "Zn + H₂SO₄ → ZnSO₄ + H₂↑",
    ],
    optionsZh: [
      "2CO + O₂ → 2CO₂",
      "2NaHCO₃ → Na₂CO₃ + CO₂↑ + H₂O",
      "CuCl₂ + 2AgNO₃ → 2AgCl↓ + Cu(NO₃)₂",
      "Zn + H₂SO₄ → ZnSO₄ + H₂↑",
    ],
    correct: 1,
    explanation:
      "A decomposition reaction has one reactant forming two or more products. Sodium bicarbonate decomposes into sodium carbonate, carbon dioxide and water; the others are combination, double displacement and displacement.",
    explanationZh:
      "分解反应是一种物质生成两种或多种物质。碳酸氢钠分解生成碳酸钠、二氧化碳和水；其余分别为化合、复分解和置换反应。",
    tags: ["reaction types", "decomposition"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "Chlorine is passed into 200 mL of NaI solution, displacing exactly 5.08 g of iodine. What is the molar concentration of the NaI solution? (2NaI + Cl₂ → 2NaCl + I₂)",
    stemZh: "将氯气通入 200 mL NaI 溶液，恰好置换出 5.08 g 碘。NaI 溶液的物质的量浓度是多少？（2NaI + Cl₂ → 2NaCl + I₂）",
    options: ["0.2 mol·L⁻¹", "0.4 mol·L⁻¹", "0.3 mol·L⁻¹", "0.1 mol·L⁻¹"],
    optionsZh: ["0.2 mol·L⁻¹", "0.4 mol·L⁻¹", "0.3 mol·L⁻¹", "0.1 mol·L⁻¹"],
    correct: 0,
    explanation:
      "n(I₂) = 5.08/254 = 0.02 mol. From the equation, 2 mol NaI gives 1 mol I₂, so n(NaI) = 0.04 mol. c = 0.04/0.2 = 0.2 mol·L⁻¹.",
    explanationZh:
      "n(I₂) = 5.08/254 = 0.02 mol。由方程式，生成 1 mol I₂ 消耗 2 mol NaI，故 n(NaI) = 0.04 mol，c = 0.04/0.2 = 0.2 mol·L⁻¹。",
    tags: ["stoichiometry", "solutions"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g) in a closed container, which statement shows that equilibrium has been reached?",
    stemZh: "密闭容器中发生可逆反应 N₂(g) + 3H₂(g) ⇌ 2NH₃(g)，下列哪种说法表明反应已达到平衡？",
    options: [
      "The concentrations of H₂ and N₂ are zero",
      "The reverse reaction rate is zero",
      "The concentration of NH₃ remains unchanged",
      "The ratio of N₂, H₂ and NH₃ is fixed at 1:3:2",
    ],
    optionsZh: [
      "H₂ 和 N₂ 的浓度为零",
      "逆反应速率为零",
      "NH₃ 的浓度保持不变",
      "N₂、H₂、NH₃ 的物质的量之比固定为 1:3:2",
    ],
    correct: 2,
    explanation:
      "At equilibrium both rates are equal and non-zero, and all concentrations remain constant. They are not necessarily in the stoichiometric ratio, and reactants are not zero.",
    explanationZh:
      "平衡时正、逆反应速率相等且不为零，各组分浓度保持不变，但不一定等于化学计量数之比，反应物浓度也不可能为零。",
    tags: ["equilibrium"],
  },
  {
    topic: "C2.4",
    difficulty: "EASY",
    stem: "Which reagent can be used to test for Cl⁻ ions?",
    stemZh: "可用哪种试剂检验 Cl⁻？",
    options: [
      "Ba(NO₃)₂ and dilute nitric acid",
      "BaCl₂ and dilute hydrochloric acid",
      "AgNO₃ and dilute sulfuric acid",
      "AgNO₃ and dilute nitric acid",
    ],
    optionsZh: ["Ba(NO₃)₂ 和稀硝酸", "BaCl₂ 和稀盐酸", "AgNO₃ 和稀硫酸", "AgNO₃ 和稀硝酸"],
    correct: 3,
    explanation:
      "Adding AgNO₃ gives a white AgCl precipitate that does not dissolve in dilute HNO₃. Dilute nitric acid removes interfering ions such as carbonate.",
    explanationZh:
      "加入 AgNO₃ 生成白色 AgCl 沉淀，且不溶于稀硝酸；稀硝酸用于排除碳酸根等干扰离子。",
    tags: ["ion tests", "chloride"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "46 g of a liquid reacts completely with excess sodium to produce 11.2 L of hydrogen at STP. The substance may be",
    stemZh: "标准状况下，46 g 某液体与足量钠完全反应，产生 11.2 L 氢气。该物质可能是",
    options: ["Benzene", "Ethyl acetate", "Water", "Ethanol"],
    optionsZh: ["苯", "乙酸乙酯", "水", "乙醇"],
    correct: 3,
    explanation:
      "11.2 L H₂ at STP is 0.5 mol. Ethanol (46 g·mol⁻¹) reacts: 2C₂H₅OH → H₂, so 1 mol ethanol gives 0.5 mol H₂. Benzene and ethyl acetate do not react with sodium; water would give far more hydrogen.",
    explanationZh:
      "标准状况下 11.2 L H₂ 为 0.5 mol。乙醇摩尔质量 46 g·mol⁻¹，46 g 为 1 mol；2 mol 乙醇生成 1 mol H₂，故 1 mol 乙醇生成 0.5 mol H₂。苯、乙酸乙酯不与钠反应；水生成氢气过多。",
    tags: ["alcohols", "stoichiometry"],
  },
  {
    topic: "C2.4",
    difficulty: "MEDIUM",
    stem: "At room temperature, which group of ions can coexist in large amounts in a solution of pH = 10?",
    stemZh: "常温下，pH = 10 的溶液中下列哪组离子能大量共存？",
    options: [
      "Mg²⁺, NO₃⁻, K⁺, Na⁺",
      "Na⁺, Cu²⁺, Cl⁻, NO₃⁻",
      "NH₄⁺, K⁺, Na⁺, HCO₃⁻",
      "Cl⁻, NO₃⁻, K⁺, Na⁺",
    ],
    optionsZh: [
      "Mg²⁺、NO₃⁻、K⁺、Na⁺",
      "Na⁺、Cu²⁺、Cl⁻、NO₃⁻",
      "NH₄⁺、K⁺、Na⁺、HCO₃⁻",
      "Cl⁻、NO₃⁻、K⁺、Na⁺",
    ],
    correct: 3,
    explanation:
      "pH = 10 is alkaline, so OH⁻ is present. Mg²⁺ and Cu²⁺ precipitate as hydroxides; NH₄⁺ and HCO₃⁻ react with OH⁻. Only the ions in D do not react with OH⁻.",
    explanationZh:
      "pH = 10 呈碱性，含大量 OH⁻。Mg²⁺、Cu²⁺ 生成氢氧化物沉淀；NH₄⁺、HCO₃⁻ 与 OH⁻ 反应。只有 D 组离子与 OH⁻ 不反应。",
    tags: ["ionic coexistence", "pH"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "Which statement about phenol is correct?",
    stemZh: "关于苯酚，下列说法正确的是",
    options: [
      "Phenol is acidic, stronger than carbonic acid but weaker than acetic acid",
      "Phenol can extract Br₂ from bromine water",
      "The functional group of phenol is the carboxyl group",
      "Phenol can be identified with FeCl₃ solution, giving a purple color",
    ],
    optionsZh: [
      "苯酚有酸性，比碳酸强但比乙酸弱",
      "苯酚可从溴水中萃取 Br₂",
      "苯酚的官能团是羧基",
      "苯酚可用 FeCl₃ 溶液鉴别，显紫色",
    ],
    correct: 3,
    explanation:
      "Phenol gives a purple colour with FeCl₃, a characteristic test. Its acidity is weaker than carbonic acid; it reacts with bromine water to form tribromophenol rather than extracting Br₂; its functional group is phenolic hydroxyl.",
    explanationZh:
      "苯酚与 FeCl₃ 溶液显紫色，可用于鉴别。苯酚酸性比碳酸弱；与溴水反应生成三溴苯酚沉淀而非萃取；官能团是酚羟基。",
    tags: ["phenol", "identification"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "Which group of substances can be distinguished by bromine water in carbon tetrachloride?",
    stemZh: "下列哪组物质可用溴的四氯化碳溶液区分？",
    options: ["Methane and ethane", "Ethene and ethane", "n-Hexane and propane", "Toluene and benzene"],
    optionsZh: ["甲烷和乙烷", "乙烯和乙烷", "正己烷和丙烷", "甲苯和苯"],
    correct: 1,
    explanation:
      "Ethene has a C=C bond and decolorizes bromine water by addition; ethane is saturated and does not react. The other pairs are both saturated/unreactive.",
    explanationZh:
      "乙烯含碳碳双键，与溴发生加成反应使溴的四氯化碳溶液褪色；乙烷是饱和烃，不反应。其余各组均不与溴反应。",
    tags: ["alkenes", "bromine test"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "Which substance can oxidize Fe²⁺?",
    stemZh: "下列哪种物质能氧化 Fe²⁺？",
    options: ["HCl", "NH₃·H₂O", "Cl₂", "NaOH"],
    optionsZh: ["盐酸", "氨水", "氯气", "氢氧化钠"],
    correct: 2,
    explanation:
      "Cl₂ is a strong oxidizing agent and oxidizes Fe²⁺ to Fe³⁺. HCl and NaOH are not oxidizing, and ammonia precipitates Fe²⁺.",
    explanationZh:
      "氯气是强氧化剂，可将 Fe²⁺ 氧化为 Fe³⁺；盐酸、氢氧化钠无氧化性，氨水与 Fe²⁺ 生成沉淀。",
    tags: ["redox", "iron"],
  },
  {
    topic: "C2.4",
    difficulty: "MEDIUM",
    stem: "Which ionic equation is correct?",
    stemZh: "下列离子方程式正确的是",
    options: [
      "CuO + 2H⁺ → H₂O (CuO added to dilute H₂SO₄)",
      "Cu + 2H⁺ → Cu²⁺ + H₂↑ (dilute HCl on copper)",
      "SO₄²⁻ + Ba²⁺ → BaSO₄↓ (Na₂SO₄ mixed with BaCl₂)",
      "2H⁺ + CO₃²⁻ → CO₂↑ + H₂O (dilute HCl with CaCO₃)",
    ],
    optionsZh: [
      "CuO + 2H⁺ → H₂O（CuO 加入稀硫酸）",
      "Cu + 2H⁺ → Cu²⁺ + H₂↑（稀盐酸滴在铜上）",
      "SO₄²⁻ + Ba²⁺ → BaSO₄↓（硫酸钠与氯化钡混合）",
      "2H⁺ + CO₃²⁻ → CO₂↑ + H₂O（稀盐酸与碳酸钙）",
    ],
    correct: 2,
    explanation:
      "Insoluble substances, oxides and weak electrolytes must be written in molecular form. CuO (A) and CaCO₃ (D) cannot be split; copper does not react with dilute HCl (B). C is correct.",
    explanationZh:
      "难溶物、氧化物、弱电解质不能拆成离子。CuO（A）、CaCO₃（D）不能拆；铜与稀盐酸不反应（B）。C 正确。",
    tags: ["ionic equations"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "For the endothermic reaction C(s) + H₂O(g) ⇌ CO(g) + H₂(g), which measure shifts the equilibrium in the reverse direction?",
    stemZh: "对于吸热反应 C(s) + H₂O(g) ⇌ CO(g) + H₂(g)，下列哪种措施使平衡向逆反应方向移动？",
    options: [
      "Increase temperature and increase pressure",
      "Increase temperature and decrease pressure",
      "Decrease temperature and increase pressure",
      "Decrease temperature and decrease pressure",
    ],
    optionsZh: [
      "升温、增压",
      "升温、降压",
      "降温、增压",
      "降温、降压",
    ],
    correct: 2,
    explanation:
      "The forward reaction is endothermic and increases gas moles. Decreasing temperature shifts toward the exothermic reverse direction; increasing pressure shifts toward fewer gas moles, also reverse.",
    explanationZh:
      "正反应吸热且气体分子数增多。降温使平衡向放热的逆反应方向移动；增压使平衡向气体分子数减少的逆反应方向移动。",
    tags: ["equilibrium", "le chatelier"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "An alkane burns completely to give 22 g CO₂ and 13.5 g H₂O. The alkane is",
    stemZh: "某烷烃完全燃烧生成 22 g CO₂ 和 13.5 g H₂O，该烷烃是",
    options: ["Ethane", "Butane", "Methane", "Propane"],
    optionsZh: ["乙烷", "丁烷", "甲烷", "丙烷"],
    correct: 0,
    explanation:
      "n(C) = 22/44 = 0.5 mol; n(H) = 2 × 13.5/18 = 1.5 mol. C:H = 1:3, so the alkane is C₂H₆ (ethane).",
    explanationZh:
      "n(C) = 22/44 = 0.5 mol；n(H) = 2×13.5/18 = 1.5 mol。C:H = 1:3，故烷烃为 C₂H₆（乙烷）。",
    tags: ["combustion", "alkanes"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "What is the outermost electron configuration of a phosphorus (P) atom?",
    stemZh: "磷（P）原子的最外层电子排布式是什么？",
    options: ["3s²3p⁴", "3s²3p²", "2s²2p⁴", "3s²3p³"],
    optionsZh: ["3s²3p⁴", "3s²3p²", "2s²2p⁴", "3s²3p³"],
    correct: 3,
    explanation:
      "Phosphorus (Z = 15) has configuration 1s²2s²2p⁶3s²3p³; the outermost shell is 3s²3p³.",
    explanationZh:
      "磷（Z = 15）的电子排布为 1s²2s²2p⁶3s²3p³，最外层为 3s²3p³。",
    tags: ["electron configuration", "phosphorus"],
  },
  {
    topic: "C3.1",
    difficulty: "HARD",
    stem: "X, Y, Z and M are four short-period main-group elements in increasing atomic number, all among the first 20 elements. X is directly above Y; Y is adjacent to Z; the nuclear charge of X is half that of Y; Z and M form the compound MZ. Which statement is correct?",
    stemZh: "X、Y、Z、M 为四种短周期主族元素，原子序数依次增大，均为前 20 号元素。X 在 Y 的正上方，Y 与 Z 相邻，X 的核电荷数是 Y 的一半，Z 与 M 能形成化合物 MZ。下列说法正确的是",
    options: [
      "Atomic radius: M > Z > Y > X",
      "Acidity of hydrides: HX > HY > HZ",
      "Both YX₂ and MZ contain covalent bonds",
      "The oxyacid of the highest oxide of Z is HZO₄",
    ],
    optionsZh: [
      "原子半径：M > Z > Y > X",
      "氢化物酸性：HX > HY > HZ",
      "YX₂ 和 MZ 均含共价键",
      "Z 的最高价氧化物对应的水化物为 HZO₄",
    ],
    correct: 3,
    explanation:
      "The elements are X = O, Y = S, Z = Cl and M = K. KCl is ionic, not covalent; the radius order is K > S > Cl > O; hydride acidity is HCl > H₂S > H₂O. Chlorine's highest oxyacid is HClO₄, matching HZO₄.",
    explanationZh:
      "由条件推得 X = O，Y = S，Z = Cl，M = K。KCl 是离子化合物，不含共价键；半径顺序为 K > S > Cl > O；氢化物酸性为 HCl > H₂S > H₂O。氯的最高价含氧酸为 HClO₄，符合 HZO₄。",
    tags: ["periodic table", "element inference"],
  },
  {
    topic: "C2.1",
    difficulty: "HARD",
    stem: "A white powder contains two substances. (1) It partially dissolves in water; adding excess dilute HCl produces bubbles and the remaining solid disappears. (2) Adding excess dilute H₂SO₄ produces bubbles, and solid remains after shaking. The powder may be",
    stemZh: "某白色粉末由两种物质组成。(1) 取少量样品加足量水，固体部分溶解；再加足量稀盐酸，有气泡产生，剩余固体消失。(2) 取少量样品加足量稀硫酸，有气泡产生，振荡后仍有固体存在。该粉末可能是",
    options: [
      "AgNO₃ and Na₂CO₃",
      "Na₂CO₃ and BaCO₃",
      "NaOH and CuSO₄",
      "CaCO₃ and BaCO₃",
    ],
    optionsZh: [
      "AgNO₃ 和 Na₂CO₃",
      "Na₂CO₃ 和 BaCO₃",
      "NaOH 和 CuSO₄",
      "CaCO₃ 和 BaCO₃",
    ],
    correct: 1,
    explanation:
      "Na₂CO₃ dissolves and BaCO₃ does not, so water partially dissolves the solid. HCl dissolves BaCO₃ with CO₂ evolution (all solid disappears). H₂SO₄ gives CO₂ and insoluble BaSO₄, so solid remains. This matches all observations.",
    explanationZh:
      "Na₂CO₃ 可溶，BaCO₃ 难溶，故加水部分溶解。加盐酸，BaCO₃ 溶解并产生 CO₂，固体全部消失。加硫酸，两者均产生 CO₂，同时生成难溶的 BaSO₄，故仍有固体。B 符合全部现象。",
    tags: ["qualitative analysis", "carbonates"],
  },
  {
    topic: "C2.3",
    difficulty: "HARD",
    stem: "A molten sodium–sulfur battery operates via 2Na + xS ⇌ Na₂Sₓ (x = 3–5). Which statement is incorrect?",
    stemZh: "熔融钠硫电池的反应为 2Na + xS ⇌ Na₂Sₓ（x = 3–5），下列说法错误的是",
    options: [
      "During charging, the cathode reaction is Na₂Sₓ − 2e⁻ = xS + 2Na⁺",
      "During discharge, each mole of electrons transferred corresponds to a 23 g decrease in sodium mass",
      "Na and Na₂Sₓ are the negative and positive electrodes, respectively",
      "The battery is a secondary battery with Na-β-Al₂O₃ as the diaphragm",
    ],
    optionsZh: [
      "充电时，阴极反应为 Na₂Sₓ − 2e⁻ = xS + 2Na⁺",
      "放电时，每转移 1 mol 电子，钠的理论质量减少 23 g",
      "Na 和 Na₂Sₓ 分别为电池的负极和正极",
      "该电池为二次电池，以 Na-β-Al₂O₃ 为隔膜",
    ],
    figure: "/figures/official/chem-mar-q48.png",
    correct: 0,
    explanation:
      "During charging, reduction occurs at the cathode (Na⁺ + e⁻ → Na), while Na₂Sₓ − 2e⁻ → xS + 2Na⁺ is the anode reaction. Option A swaps cathode and anode, so it is incorrect.",
    explanationZh:
      "充电时阴极发生还原反应：Na⁺ + e⁻ → Na；Na₂Sₓ − 2e⁻ → xS + 2Na⁺ 是阳极反应。A 项把阳极反应说成阴极反应，故错误。",
    tags: ["electrochemistry", "batteries"],
  },
];
