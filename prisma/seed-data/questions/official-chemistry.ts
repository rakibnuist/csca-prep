import type { SeedQuestion } from "../types";

/**
 * Official CSCA Chemistry past paper — January 2026 sitting.
 * Transcribed from the official paper and answer key (bilingual CN/EN).
 * Provided free for study, attributed to the original source.
 */
export const officialChemistryQuestions: SeedQuestion[] = [
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following is a chemical property of a substance?",
    stemZh: "下列哪项是物质的化学性质？",
    options: [
      "Iron nails easily rust in a humid environment",
      "The density of copper is 8.9 g·cm⁻³",
      "Platinum wire turns red when heated",
      "Aluminium is a silver-white metal",
    ],
    optionsZh: ["铁钉在潮湿环境中易生锈", "铜的密度为 8.9 g·cm⁻³", "铂丝加热后变红", "铝是银白色金属"],
    correct: 0,
    explanation:
      "A chemical property is shown during a chemical change. Rusting is iron reacting with oxygen and water. Density, colour and glowing-when-heated are physical properties.",
    explanationZh:
      "化学性质是物质在化学变化中表现出来的性质，生锈是铁与氧气、水发生化学反应的过程。密度、受热变红、颜色均属于物理性质。",
    tags: ["matter", "chemical properties"],
  },
  {
    topic: "C4.1",
    difficulty: "EASY",
    stem: "Which instrument is used to measure a liquid volume accurately?",
    stemZh: "下列哪种仪器用于准确测量液体体积？",
    options: ["Measuring cylinder", "Beaker", "Balance", "Gas collection bottle"],
    optionsZh: ["量筒", "烧杯", "天平", "集气瓶"],
    correct: 0,
    explanation:
      "A measuring cylinder is made for accurate liquid-volume measurement. A beaker is a reaction/dissolving vessel (inaccurate), a balance measures mass, and a gas bottle collects gases.",
    explanationZh:
      "量筒是专门用于准确测量液体体积的仪器。烧杯主要作溶解或反应容器（测体积不准确），天平测质量，集气瓶收集气体。",
    tags: ["lab", "instruments"],
  },
  {
    topic: "C4.2",
    difficulty: "EASY",
    stem: "In the laboratory, hydrogen is prepared using:",
    stemZh: "实验室制取氢气的试剂是：",
    options: [
      "Iron and concentrated sulfuric acid",
      "Magnesium and concentrated nitric acid",
      "Copper and dilute sulfuric acid",
      "Zinc and dilute sulfuric acid",
    ],
    optionsZh: ["铁和浓硫酸", "镁和浓硝酸", "铜和稀硫酸", "锌和稀硫酸"],
    correct: 3,
    explanation:
      "Zinc + dilute H₂SO₄ → ZnSO₄ + H₂↑, at a moderate rate. Concentrated acids are strong oxidisers (passivate iron, give no H₂ from nitric acid), and copper sits below hydrogen in the activity series.",
    explanationZh:
      "锌与稀硫酸反应生成硫酸锌和氢气，反应速率适中，适合实验室制取：Zn + H₂SO₄(稀) = ZnSO₄ + H₂↑。浓硫酸使铁钝化，浓硝酸与镁不生成氢气，铜在金属活动性顺序中位于氢之后。",
    tags: ["lab", "gas preparation", "hydrogen"],
  },
  {
    topic: "C2.2",
    difficulty: "EASY",
    stem: "The structural formula of acetic acid is:",
    stemZh: "乙酸的结构简式是：",
    options: ["CH₃CH₂OH (ethanol)", "CH₃OCH₃ (dimethyl ether)", "CH₃COOH (acetic acid)", "CH₃CHO (acetaldehyde)"],
    optionsZh: ["CH₃CH₂OH（乙醇）", "CH₃OCH₃（二甲醚）", "CH₃COOH（乙酸）", "CH₃CHO（乙醛）"],
    correct: 2,
    explanation:
      "Acetic acid has the carboxyl group (−COOH), so its structural formula is CH₃COOH. The others are ethanol, dimethyl ether and acetaldehyde.",
    explanationZh:
      "乙酸的官能团是羧基 (−COOH)，结构简式为 CH₃COOH。其余分别为乙醇、二甲醚、乙醛。",
    tags: ["organic", "functional groups"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "Which statement about ¹³C is incorrect?",
    stemZh: "关于 ¹³C 的下列说法错误的是：",
    options: [
      "¹³C and ¹²C have the same number of electrons",
      "¹³C and ¹²C have the same number of protons",
      "¹³C and ¹²C have the same number of neutrons",
      "¹³C is an isotope of ¹²C",
    ],
    optionsZh: [
      "¹³C 和 ¹²C 的电子数相同",
      "¹³C 和 ¹²C 的质子数相同",
      "¹³C 和 ¹²C 的中子数相同",
      "¹³C 是 ¹²C 的同位素",
    ],
    correct: 2,
    explanation:
      "Isotopes share protons (6 for carbon) but differ in neutrons: ¹³C has 13−6=7 neutrons, ¹²C has 12−6=6. Electrons equal protons, so they are equal.",
    explanationZh:
      "同位素质子数相同、中子数不同。¹³C 与 ¹²C 均为碳的同位素，质子数均为 6，电子数相同；中子数 = 质量数 − 质子数，分别为 7 和 6，故中子数不同。",
    tags: ["atomic structure", "isotopes"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "At 25 °C, which solution has a pH of 1?",
    stemZh: "25 °C 时，下列哪种溶液的 pH = 1？",
    options: [
      "0.1 mol·L⁻¹ hydrochloric acid",
      "0.1 mol·L⁻¹ sulfuric acid",
      "0.1 mol·L⁻¹ sodium hydroxide",
      "0.1 mol·L⁻¹ acetic acid",
    ],
    optionsZh: ["0.1 mol·L⁻¹ 盐酸溶液", "0.1 mol·L⁻¹ 硫酸溶液", "0.1 mol·L⁻¹ 氢氧化钠溶液", "0.1 mol·L⁻¹ 乙酸溶液"],
    correct: 0,
    explanation:
      "pH = 1 means [H⁺] = 0.1 mol·L⁻¹. HCl is a monoprotic strong acid (0.1 M → [H⁺]=0.1 M, pH=1). H₂SO₄ is diprotic (0.2 M H⁺, pH<1); NaOH is basic; acetic acid is a weak acid (pH>1).",
    explanationZh:
      "pH=1 表示 c(H⁺)=0.1 mol·L⁻¹。盐酸是一元强酸，完全电离，0.1 mol·L⁻¹ 时 pH=1。硫酸是二元强酸（pH<1），氢氧化钠呈碱性，乙酸是弱酸（pH>1）。",
    tags: ["pH", "acids"],
  },
  {
    topic: "C2.4",
    difficulty: "EASY",
    stem: "When observing the flame test for potassium, blue cobalt glass is used to:",
    stemZh: "观察钾的焰色反应时，使用蓝色钴玻璃的目的是：",
    options: [
      "Filter out the yellow light of sodium",
      "Protect the eyes from burns",
      "Enhance the purple light of potassium",
      "Increase the observation temperature",
    ],
    optionsZh: ["滤去钠的黄光", "保护眼睛免受灼伤", "增强钾的紫光", "提高观察温度"],
    correct: 0,
    explanation:
      "Potassium burns purple, but trace sodium (bright yellow) masks it. Cobalt glass absorbs the yellow sodium light so the potassium purple is clearly visible.",
    explanationZh:
      "钾的焰色呈紫色，但钾盐常混有微量钠盐，钠的明亮黄光会掩盖钾的紫色。蓝色钴玻璃可滤去钠的黄光，使钾的紫色清晰可见。",
    tags: ["flame test", "ion identification"],
  },
  {
    topic: "C2.2",
    difficulty: "EASY",
    stem: "Which substance can form a solution with water?",
    stemZh: "下列哪种物质能与水形成溶液？",
    options: ["Ethyl acetate", "Ethanol", "Benzene", "Calcium carbonate"],
    optionsZh: ["乙酸乙酯", "乙醇", "苯", "碳酸钙"],
    correct: 1,
    explanation:
      "Ethanol (CH₃CH₂OH) hydrogen-bonds with water and is fully miscible. Ethyl acetate and benzene are insoluble (form layers); calcium carbonate forms a suspension.",
    explanationZh:
      "乙醇与水之间能形成氢键，可与水以任意比例互溶形成溶液。乙酸乙酯、苯均难溶于水会分层；碳酸钙是难溶性盐，与水混合形成悬浊液。",
    tags: ["solutions", "solubility"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which substance is a pure substance?",
    stemZh: "下列哪种物质是纯净物？",
    options: ["Medical alcohol", "Concrete", "Copper", "Saline solution"],
    optionsZh: ["医用酒精", "混凝土", "铜", "生理盐水"],
    correct: 2,
    explanation:
      "A pure substance is one substance. Copper is a single element. Medical alcohol (75% ethanol), concrete and saline (0.9% NaCl) are mixtures.",
    explanationZh:
      "纯净物由一种物质组成。铜是由铜元素组成的单质。医用酒精是 75% 乙醇溶液，混凝土、生理盐水均为混合物。",
    tags: ["matter", "classification"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "Which substance is a homolog of C₄H₆?",
    stemZh: "下列哪种物质是 C₄H₆ 的同系物？",
    options: ["C₄H₈ (butene/cyclobutane)", "C₄H₁₀ (butane)", "C₅H₈ (pentyne/pentadiene)", "C₈H₁₀ (ethylbenzene/xylene)"],
    optionsZh: ["C₄H₈（丁烯/环丁烷）", "C₄H₁₀（丁烷）", "C₅H₈（戊炔/戊二烯）", "C₈H₁₀（乙苯/二甲苯）"],
    correct: 2,
    explanation:
      "C₄H₆ fits the CₙH₂ₙ₋₂ general formula of alkynes/dienes. C₅H₈ also fits CₙH₂ₙ₋₂, so it is a homolog. C₄H₈ is CₙH₂ₙ, C₄H₁₀ is CₙH₂ₙ₊₂, and C₈H₁₀ is aromatic.",
    explanationZh:
      "C₄H₆ 符合 CₙH₂ₙ₋₂ 通式，属于炔烃或二烯烃。C₅H₈ 也符合该通式，结构相似，属同系物。C₄H₈（CₙH₂ₙ）、C₄H₁₀（CₙH₂ₙ₊₂）、C₈H₁₀（芳香烃）通式不同。",
    tags: ["organic", "homologs"],
  },
  {
    topic: "C2.3",
    difficulty: "MEDIUM",
    stem: "In which reaction does sulfuric acid act as an oxidising agent?",
    stemZh: "下列反应中硫酸作氧化剂的是：",
    options: [
      "2NaCl + H₂SO₄(conc) → Na₂SO₄ + 2HCl↑",
      "H₂SO₄ + Ba(NO₃)₂ → 2HNO₃ + BaSO₄↓",
      "S + 2H₂SO₄(conc) → 3SO₂↑ + 2H₂O",
      "2KOH + H₂SO₄ → K₂SO₄ + 2H₂O",
    ],
    optionsZh: [
      "2NaCl + H₂SO₄(浓) → Na₂SO₄ + 2HCl↑",
      "H₂SO₄ + Ba(NO₃)₂ → 2HNO₃ + BaSO₄↓",
      "S + 2H₂SO₄(浓) → 3SO₂↑ + 2H₂O",
      "2KOH + H₂SO₄ → K₂SO₄ + 2H₂O",
    ],
    correct: 2,
    explanation:
      "An oxidising agent gains electrons (its oxidation state falls). In C, S in H₂SO₄ goes from +6 to +4 in SO₂. A, B and D are double-displacement/neutralisation with no oxidation-state change.",
    explanationZh:
      "氧化剂在反应中化合价降低、得到电子。C 选项中浓硫酸的 S 由 +6 降为 +4。A、B、D 均为复分解或中和反应，无元素化合价变化。",
    tags: ["redox", "oxidising agent"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which substance is an electrolyte?",
    stemZh: "下列哪种物质属于电解质？",
    options: ["Sucrose", "Carbon dioxide", "Metal aluminium", "Sodium chloride"],
    optionsZh: ["蔗糖", "二氧化碳", "金属铝", "氯化钠"],
    correct: 3,
    explanation:
      "An electrolyte conducts in aqueous solution or molten state. NaCl ionises to Na⁺ and Cl⁻. Sucrose does not conduct; CO₂ only conducts via the carbonic acid it forms; aluminium is an element, not an electrolyte.",
    explanationZh:
      "电解质是在水溶液中或熔融状态下能导电的化合物。氯化钠电离出 Na⁺ 和 Cl⁻，导电。蔗糖不导电；二氧化碳溶于水后因生成碳酸才导电；金属铝是单质。",
    tags: ["electrolytes"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "When 1 mole of hydrogen burns completely in oxygen, the mass of water produced is:",
    stemZh: "1 摩尔氢气在氧气中完全燃烧，生成水的质量是：",
    options: ["45 g", "9 g", "27 g", "18 g"],
    optionsZh: ["45 g", "9 g", "27 g", "18 g"],
    correct: 3,
    explanation:
      "2H₂ + O₂ → 2H₂O, so 1 mol H₂ gives 1 mol H₂O. M(H₂O) = 18 g·mol⁻¹, so m = 1 × 18 = 18 g.",
    explanationZh:
      "2H₂ + O₂ → 2H₂O，1 mol H₂ 完全燃烧生成 1 mol H₂O。水的摩尔质量为 18 g·mol⁻¹，故 m = 1 × 18 = 18 g。",
    tags: ["amount of substance", "stoichiometry"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which substance is an electrolyte?",
    stemZh: "下列哪种物质是电解质？",
    options: ["Magnesium", "Sodium chloride", "Toluene", "Helium"],
    optionsZh: ["镁", "氯化钠", "甲苯", "氦气"],
    correct: 1,
    explanation:
      "NaCl is an ionic compound that ionises in water or when molten. Magnesium and helium are elements; toluene is non-polar and does not conduct.",
    explanationZh:
      "氯化钠是离子化合物，在水溶液中或熔融状态下电离出 Na⁺ 和 Cl⁻，能导电。镁、氦气是单质，甲苯是非极性分子不导电。",
    tags: ["electrolytes"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "Which atom is most likely to lose electrons and form a cation?",
    stemZh: "下列哪种原子最易失去电子形成阳离子？",
    options: ["Sodium (Na)", "Magnesium (Mg)", "Chlorine (Cl)", "Fluorine (F)"],
    optionsZh: ["钠 (Na)", "镁 (Mg)", "氯 (Cl)", "氟 (F)"],
    correct: 0,
    explanation:
      "Metals lose electrons. Na and Mg are metals; Na has 1 outer electron, Mg has 2 — fewer outer electrons means easier loss, so Na loses most readily.",
    explanationZh:
      "金属原子易失电子，非金属易得电子。钠最外层电子数为 1，镁为 2；最外层电子越少越易失去，故钠最易形成阳离子。",
    tags: ["atomic structure", "periodicity"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which group consists of allotropes of the same element?",
    stemZh: "下列哪组物质是同种元素的同素异形体？",
    options: [
      "CH₄ (methane) and C₃H₈ (propane)",
      "¹²C and ¹⁴C",
      "CO (carbon monoxide) and CO₂ (carbon dioxide)",
      "Diamond and graphite",
    ],
    optionsZh: ["CH₄（甲烷）和 C₃H₈（丙烷）", "¹²C 和 ¹⁴C", "CO（一氧化碳）和 CO₂（二氧化碳）", "金刚石和石墨"],
    correct: 3,
    explanation:
      "Allotropes are different forms of the same element. Diamond and graphite are both carbon. A is homologs, B is isotopes, C is two compounds.",
    explanationZh:
      "同素异形体是同种元素组成的不同单质。金刚石和石墨均由碳元素组成、结构不同。A 是烷烃同系物，B 是同位素，C 是碳的两种氧化物。",
    tags: ["allotropes", "classification"],
  },
  {
    topic: "C2.3",
    difficulty: "MEDIUM",
    stem: "In which substance is the oxidation number of chlorine +5?",
    stemZh: "下列物质中氯元素的化合价为 +5 的是：",
    options: ["NaClO₃ (sodium chlorate)", "NaClO₄ (sodium perchlorate)", "CaCl₂ (calcium chloride)", "NaClO (sodium hypochlorite)"],
    optionsZh: ["NaClO₃（氯酸钠）", "NaClO₄（高氯酸钠）", "CaCl₂（氯化钙）", "NaClO（次氯酸钠）"],
    correct: 0,
    explanation:
      "In NaClO₃: Na is +1, O is −2, so (+1) + x + 3(−2) = 0 → x = +5. NaClO₄ gives +7, CaCl₂ gives −1, NaClO gives +1.",
    explanationZh:
      "NaClO₃ 中 Na 为 +1，O 为 −2，则 (+1) + x + 3×(−2) = 0，解得 x = +5。NaClO₄ 为 +7，CaCl₂ 为 −1，NaClO 为 +1。",
    tags: ["redox", "oxidation state"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "Which diagram represents the electron configuration of an argon atom?",
    stemZh: "下列哪项表示氩原子的电子排布图？",
    options: ["2, 8, 6", "2, 8, 8", "2, 8, 18", "2, 8, 2"],
    optionsZh: ["2, 8, 6", "2, 8, 8", "2, 8, 18", "2, 8, 2"],
    correct: 1,
    explanation:
      "Argon has 18 electrons. They fill K (2), L (8), M (8) by the minimum-energy rule, giving 2, 8, 8.",
    explanationZh:
      "氩原子的核电荷数为 18，核外电子数 = 质子数 = 18。电子依能量最低原理依次填充 K(2)、L(8)、M(8)，故为 2, 8, 8。",
    tags: ["atomic structure", "electron configuration"],
  },
  {
    topic: "C4.2",
    difficulty: "MEDIUM",
    stem: "Which gas can be collected using both downward displacement of air and water displacement?",
    stemZh: "下列哪种气体既能用向下排空气法又能用排水法收集？",
    options: ["CO₂ (carbon dioxide)", "N₂ (nitrogen)", "H₂ (hydrogen)", "NH₃ (ammonia)"],
    optionsZh: ["CO₂（二氧化碳）", "N₂（氮气）", "H₂（氢气）", "NH₃（氨气）"],
    correct: 2,
    explanation:
      "Downward air displacement suits gases lighter than air that don't react with it; water displacement suits gases poorly soluble in water. H₂ (density 0.0899 g/L < air) is insoluble in water. CO₂ is denser and soluble; N₂ density ≈ air; NH₃ is very soluble.",
    explanationZh:
      "向下排空气法适用于密度比空气小且不与空气反应的气体；排水法适用于难溶于水的气体。氢气密度小于空气且难溶于水。CO₂ 密度大且溶于水，N₂ 密度接近空气，NH₃ 极易溶于水。",
    tags: ["gas preparation", "collection"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "Take 50 mL from 1 L of 1 mol·L⁻¹ NaOH solution. The molar concentration of this 50 mL is:",
    stemZh: "从 1 L 1 mol·L⁻¹ 的氢氧化钠溶液中取出 50 mL，该 50 mL 溶液的摩尔浓度是：",
    options: ["0.02 mol·L⁻¹", "1 mol·L⁻¹", "2 mol·L⁻¹", "0.2 mol·L⁻¹"],
    optionsZh: ["0.02 mol·L⁻¹", "1 mol·L⁻¹", "2 mol·L⁻¹", "0.2 mol·L⁻¹"],
    correct: 1,
    explanation:
      "Solutions are homogeneous: any portion has the same concentration as the original, so it remains 1 mol·L⁻¹ regardless of the volume taken.",
    explanationZh:
      "溶液具有均一性，取出任意体积的溶液其摩尔浓度都与原溶液相同，仍为 1 mol·L⁻¹，与取出的体积无关。",
    tags: ["concentration", "homogeneity"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "Which substance can oxidise Fe²⁺ to Fe³⁺?",
    stemZh: "下列哪种物质能将 Fe²⁺ 氧化为 Fe³⁺？",
    options: ["Cl₂ (chlorine)", "Fe (iron)", "Zn (zinc)", "NaOH (sodium hydroxide)"],
    optionsZh: ["Cl₂（氯气）", "Fe（铁）", "Zn（锌）", "NaOH（氢氧化钠）"],
    correct: 0,
    explanation:
      "Oxidising Fe²⁺→Fe³⁺ needs an oxidiser. Cl₂ is strongly oxidising: 2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻. Fe and Zn are reductants; NaOH only precipitates Fe(OH)₂.",
    explanationZh:
      "Fe²⁺→Fe³⁺ 化合价升高，需氧化剂。Cl₂ 具有强氧化性：2Fe²⁺ + Cl₂ = 2Fe³⁺ + 2Cl⁻。Fe、Zn 具有还原性，NaOH 只生成 Fe(OH)₂ 沉淀。",
    tags: ["redox"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "At 25 °C, which substance reacts with both HCl and NaOH?",
    stemZh: "25 °C 时，下列哪种物质既能与盐酸反应又能与氢氧化钠反应？",
    options: ["NaHCO₃ (sodium bicarbonate)", "Ca(OH)₂ (calcium hydroxide)", "CH₃COOH (acetic acid)", "NaCl (sodium chloride)"],
    optionsZh: ["NaHCO₃（碳酸氢钠）", "Ca(OH)₂（氢氧化钙）", "CH₃COOH（乙酸）", "NaCl（氯化钠）"],
    correct: 0,
    explanation:
      "NaHCO₃ is an acid salt of a weak acid: NaHCO₃ + HCl → NaCl + CO₂↑ + H₂O, and NaHCO₃ + NaOH → Na₂CO₃ + H₂O.",
    explanationZh:
      "碳酸氢钠是弱酸的酸式盐，既能与强酸反应：NaHCO₃ + HCl = NaCl + CO₂↑ + H₂O；又能与强碱反应：NaHCO₃ + NaOH = Na₂CO₃ + H₂O。",
    tags: ["inorganic", "acid salt"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "Which element has the smallest atomic radius?",
    stemZh: "下列哪种元素的原子半径最小？",
    options: ["O (oxygen)", "C (carbon)", "Na (sodium)", "F (fluorine)"],
    optionsZh: ["O（氧）", "C（碳）", "Na（钠）", "F（氟）"],
    correct: 3,
    explanation:
      "Radius decreases across a period and increases down a group. C, O, F are in period 2 (decreasing left to right), Na is in period 3 (larger). F is smallest.",
    explanationZh:
      "同周期从左到右原子半径逐渐减小，同主族从上到下逐渐增大。C、O、F 位于第二周期，Na 位于第三周期；第二周期中 C→O→F 半径减小，故 F 最小。",
    tags: ["atomic structure", "periodicity"],
  },
  {
    topic: "C3.3",
    difficulty: "EASY",
    stem: "When a reaction reaches equilibrium, which is always equal?",
    stemZh: "反应达到平衡时，反应体系中始终相等的是：",
    options: [
      "Forward and reverse reaction rates",
      "Concentrations of reactants and products",
      "The time atoms exist in reactant and product molecules",
      "Masses of reactants and products",
    ],
    optionsZh: ["正反应速率和逆反应速率", "反应物和生成物的浓度", "原子在反应物和生成物分子中的存在时间", "反应物和生成物的质量"],
    correct: 0,
    explanation:
      "The essence of equilibrium is v(forward) = v(reverse) ≠ 0. Concentrations and masses stay constant but are not necessarily equal.",
    explanationZh:
      "化学平衡的本质是正反应速率等于逆反应速率（v正 = v逆 ≠ 0）。浓度、质量保持不変但不一定相等。",
    tags: ["equilibrium"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "If 4.0 g of copper(II) oxide is completely reduced by H₂, the volume of H₂ consumed under standard conditions is:",
    stemZh: "若 4.0 g 氧化铜被氢气完全还原，标准状况下消耗氢气的体积是：",
    options: ["11.2 L", "2.24 L", "22.4 L", "1.12 L"],
    optionsZh: ["11.2 L", "2.24 L", "22.4 L", "1.12 L"],
    correct: 3,
    explanation:
      "CuO + H₂ → Cu + H₂O. n(CuO) = 4.0/80 = 0.05 mol = n(H₂). V(H₂) = 0.05 × 22.4 = 1.12 L.",
    explanationZh:
      "CuO + H₂ → Cu + H₂O。n(CuO) = 4.0/80 = 0.05 mol = n(H₂)，V(H₂) = 0.05 × 22.4 = 1.12 L。",
    tags: ["amount of substance", "gas volume"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "The English name for NaNO₂ is:",
    stemZh: "NaNO₂ 的英文名称是：",
    options: ["Ammonium nitrate", "Sodium nitride", "Sodium nitrite", "Sodium nitrate"],
    optionsZh: ["硝酸铵", "氮化钠", "亚硝酸钠", "硝酸钠"],
    correct: 2,
    explanation:
      "\"nitrite\" is NO₂⁻ and \"nitrate\" is NO₃⁻; \"sodium\" is Na. So NaNO₂ is sodium nitrite. (NH₄NO₃ is ammonium nitrate, Na₃N is sodium nitride, NaNO₃ is sodium nitrate.)",
    explanationZh:
      "“nitrite” 表示亚硝酸盐 (NO₂⁻)，“nitrate” 表示硝酸盐 (NO₃⁻)。NaNO₂ 为 sodium nitrite（亚硝酸钠）。NH₄NO₃ 为硝酸铵，Na₃N 为氮化钠，NaNO₃ 为硝酸钠。",
    tags: ["nomenclature"],
  },
  {
    topic: "C3.4",
    difficulty: "MEDIUM",
    stem: "Which substance, when dissolved in water, gives the solution with the highest pH?",
    stemZh: "下列物质溶于水后，所得溶液 pH 最大的是：",
    options: ["NaCl (sodium chloride)", "HNO₃ (nitric acid)", "H₂S (hydrogen sulfide)", "NH₃ (ammonia)"],
    optionsZh: ["NaCl（氯化钠）", "HNO₃（硝酸）", "H₂S（硫化氢）", "NH₃（氨气）"],
    correct: 3,
    explanation:
      "NH₃ dissolves to give ammonia water (NH₃·H₂O), a weak base, so pH > 7. NaCl is neutral, HNO₃ is a strong acid, H₂S is a weak acid.",
    explanationZh:
      "NH₃ 溶于水生成氨水 (NH₃·H₂O)，是弱碱，部分电离出 OH⁻，pH > 7。NaCl 中性，HNO₃ 强酸，H₂S 弱酸。",
    tags: ["pH", "electrolytes"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "The reaction between hydrochloric acid and sodium hydroxide belongs to:",
    stemZh: "盐酸与氢氧化钠的反应属于：",
    options: ["Decomposition reaction", "Displacement reaction", "Combination reaction", "Neutralization reaction"],
    optionsZh: ["分解反应", "置换反应", "化合反应", "中和反应"],
    correct: 3,
    explanation:
      "HCl + NaOH → NaCl + H₂O is an acid–base reaction producing a salt and water, i.e. neutralization.",
    explanationZh:
      "HCl + NaOH = NaCl + H₂O 是酸与碱反应生成盐和水，属于中和反应。",
    tags: ["reaction types", "neutralization"],
  },
  {
    topic: "C3.2",
    difficulty: "EASY",
    stem: "Which substance contains both ionic and covalent bonds?",
    stemZh: "下列物质中既含离子键又含共价键的是：",
    options: ["Na₂O₂ (sodium peroxide)", "CO₂ (carbon dioxide)", "H₂O (water)", "KCl (potassium chloride)"],
    optionsZh: ["Na₂O₂（过氧化钠）", "CO₂（二氧化碳）", "H₂O（水）", "KCl（氯化钾）"],
    correct: 0,
    explanation:
      "Na₂O₂ has Na⁺…O₂²⁻ ionic bonds and an O–O covalent bond within the peroxide ion. CO₂ and H₂O have only covalent bonds; KCl only an ionic bond.",
    explanationZh:
      "Na₂O₂ 由 Na⁺ 与 O₂²⁻ 构成，Na⁺ 与 O₂²⁻ 之间是离子键，O₂²⁻ 中两个 O 之间是共价键。CO₂、H₂O 只有共价键，KCl 只有离子键。",
    tags: ["chemical bonds"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "Which is a displacement reaction?",
    stemZh: "下列反应属于置换反应的是：",
    options: [
      "2NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑",
      "Fe + CuSO₄ → FeSO₄ + Cu",
      "2H₂ + O₂ → 2H₂O",
      "CH₄ + 2O₂ → CO₂ + 2H₂O",
    ],
    optionsZh: [
      "2NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑",
      "Fe + CuSO₄ → FeSO₄ + Cu",
      "2H₂ + O₂ → 2H₂O",
      "CH₄ + 2O₂ → CO₂ + 2H₂O",
    ],
    correct: 1,
    explanation:
      "A displacement reaction is one element + one compound → another element + another compound. Fe + CuSO₄ fits. A is decomposition, C is combination, D is combustion (redox, not displacement).",
    explanationZh:
      "置换反应的特征是“一种单质 + 一种化合物 → 另一种单质 + 另一种化合物”。Fe + CuSO₄ 符合。A 为分解，C 为化合，D 为氧化还原（燃烧）。",
    tags: ["reaction types", "displacement"],
  },
  {
    topic: "C4.2",
    difficulty: "EASY",
    stem: "In preparing oxygen from H₂O₂ in the laboratory, the commonly used catalyst is:",
    stemZh: "实验室用过氧化氢制取氧气时，常用的催化剂是：",
    options: ["Manganese dioxide (MnO₂)", "Potassium chloride (KCl)", "Sodium hydroxide (NaOH)", "Potassium chlorate (KClO₃)"],
    optionsZh: ["二氧化锰 (MnO₂)", "氯化钾 (KCl)", "氢氧化钠 (NaOH)", "氯酸钾 (KClO₃)"],
    correct: 0,
    explanation:
      "2H₂O₂ →(MnO₂)→ 2H₂O + O₂↑. MnO₂ speeds the decomposition without being consumed. KCl has no effect, NaOH reacts with H₂O₂, and KClO₃ is a different oxygen source.",
    explanationZh:
      "2H₂O₂ 在 MnO₂ 催化下分解生成 O₂。MnO₂ 能显著加快分解速率且反应前后质量与化学性质不变。KCl 无催化作用，NaOH 会与 H₂O₂ 反应，KClO₃ 是另一种制氧原料。",
    tags: ["lab", "catalyst", "oxygen"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "Which substance has bleaching properties?",
    stemZh: "下列物质具有漂白性的是：",
    options: ["KClO₃ (potassium chlorate)", "Dry Cl₂", "NaCl (sodium chloride)", "HClO (hypochlorous acid)"],
    optionsZh: ["KClO₃（氯酸钾）", "干燥的氯气", "NaCl（氯化钠）", "HClO（次氯酸）"],
    correct: 3,
    explanation:
      "HClO is a strong oxidiser that destroys coloured molecules, so it bleaches. Dry Cl₂ only bleaches after reacting with water to form HClO; KClO₃ and NaCl do not bleach directly.",
    explanationZh:
      "HClO 具有强氧化性，能破坏有色物质分子结构，具有漂白性。干燥的氯气与水反应生成 HClO 后才有漂白性；KClO₃、NaCl 无漂白性。",
    tags: ["inorganic", "bleaching"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "The element in the second period and Group VIIA is:",
    stemZh: "元素周期表中，位于第二周期第 VIIA 族的元素是：",
    options: ["O (oxygen)", "N (nitrogen)", "F (fluorine)", "Cl (chlorine)"],
    optionsZh: ["O（氧）", "N（氮）", "F（氟）", "Cl（氯）"],
    correct: 2,
    explanation:
      "Period = number of electron shells; group = outer electrons. F is period 2, Group VIIA. O is VIA, N is VA, Cl is period 3.",
    explanationZh:
      "周期数 = 电子层数，主族序数 = 最外层电子数。氟 (F) 位于第二周期第 VIIA 族。氧为 VIA 族，氮为 VA 族，氯为第三周期。",
    tags: ["periodic table"],
  },
  {
    topic: "C2.4",
    difficulty: "MEDIUM",
    stem: "Which group of ions can coexist in large quantities in aqueous solution?",
    stemZh: "下列离子组在水溶液中能大量共存的是：",
    options: [
      "Mg²⁺, Cl⁻, NH₄⁺, SO₄²⁻",
      "Ca²⁺, SO₄²⁻, CO₃²⁻, Na⁺",
      "CO₃²⁻, Na⁺, SO₄²⁻, H⁺",
      "OH⁻, Ca²⁺, Mg²⁺, NO₃⁻",
    ],
    optionsZh: [
      "Mg²⁺、Cl⁻、NH₄⁺、SO₄²⁻",
      "Ca²⁺、SO₄²⁻、CO₃²⁻、Na⁺",
      "CO₃²⁻、Na⁺、SO₄²⁻、H⁺",
      "OH⁻、Ca²⁺、Mg²⁺、NO₃⁻",
    ],
    correct: 0,
    explanation:
      "A's four ions don't react. In B, Ca²⁺ precipitates with SO₄²⁻ and CO₃²⁻; in C, CO₃²⁻ + H⁺ → CO₂ + H₂O; in D, OH⁻ precipitates Ca(OH)₂ and Mg(OH)₂.",
    explanationZh:
      "A 组四种离子之间无反应。B 组 Ca²⁺ 与 SO₄²⁻、CO₃²⁻ 生成沉淀；C 组 CO₃²⁻ 与 H⁺ 生成 CO₂ 和 H₂O；D 组 OH⁻ 与 Ca²⁺、Mg²⁺ 生成沉淀。",
    tags: ["ionic reactions", "coexistence"],
  },
  {
    topic: "C1.3",
    difficulty: "MEDIUM",
    stem: "In a beaker of 50 mL saturated KNO₃ solution, the method that changes the solute mass fraction is:",
    stemZh: "在盛有 50 mL 饱和硝酸钾溶液的烧杯中，改变溶质质量分数的方法是：",
    options: [
      "Evaporate some solvent at constant temperature",
      "Increase the solution temperature",
      "Decrease the solution temperature",
      "Add potassium nitrate solid",
    ],
    optionsZh: ["恒温蒸发部分溶剂", "升高溶液温度", "降低溶液温度", "加入硝酸钾固体"],
    correct: 2,
    explanation:
      "Cooling lowers KNO₃ solubility, so solute precipitates while solvent stays — mass fraction decreases. Evaporation and adding solid don't change a saturated fraction; heating only makes it unsaturated (fraction unchanged).",
    explanationZh:
      "硝酸钾溶解度随温度降低而减小，降低温度使溶质析出、溶剂质量不变，质量分数减小。恒温蒸发会等量析出溶质，加固体不再溶解，升温只变为不饱和，质量分数均不变。",
    tags: ["concentration", "solubility"],
  },
  {
    topic: "C2.4",
    difficulty: "EASY",
    stem: "The reagent used to detect Cl⁻ ions is:",
    stemZh: "检验 Cl⁻ 离子的试剂是：",
    options: [
      "Ba(NO₃)₂ solution and dilute nitric acid",
      "AgNO₃ solution and dilute sulfuric acid",
      "BaCl₂ solution and dilute hydrochloric acid",
      "AgNO₃ solution and dilute nitric acid",
    ],
    optionsZh: [
      "Ba(NO₃)₂ 溶液和稀硝酸",
      "AgNO₃ 溶液和稀硫酸",
      "BaCl₂ 溶液和稀盐酸",
      "AgNO₃ 溶液和稀硝酸",
    ],
    correct: 3,
    explanation:
      "Ag⁺ + Cl⁻ → AgCl↓ (insoluble in dilute HNO₃). Nitric acid excludes CO₃²⁻ interference. Sulfuric acid adds SO₄²⁻ (Ag₂SO₄ is slightly soluble) and BaCl₂/HCl add Cl⁻.",
    explanationZh:
      "Ag⁺ + Cl⁻ = AgCl↓（不溶于稀硝酸）。稀硝酸可排除 CO₃²⁻ 的干扰。稀硫酸会引入 SO₄²⁻，BaCl₂ 和稀盐酸会引入 Cl⁻，均干扰检验。",
    tags: ["ion identification", "chloride"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "Which substance contains the largest number of atoms?",
    stemZh: "下列物质中含原子数最多的是：",
    options: [
      "11.2 L of CH₄ at standard conditions",
      "2 g of He",
      "3.01 × 10²³ Al atoms",
      "1 mol of HF",
    ],
    optionsZh: [
      "标准状况下 11.2 L 甲烷 (CH₄)",
      "2 g 氦气 (He)",
      "3.01×10²³ 个铝 (Al) 原子",
      "1 mol 氟化氢 (HF)",
    ],
    correct: 0,
    explanation:
      "A: 0.5 mol CH₄ × 5 atoms = 2.5 Nₐ. B: 1 mol He × 1 = Nₐ. C: 0.5 Nₐ. D: 1 mol × 2 = 2 Nₐ. A is largest.",
    explanationZh:
      "A：0.5 mol CH₄ × 5 = 2.5 Nₐ 个原子。B：1 mol He × 1 = Nₐ。C：0.5 Nₐ。D：1 mol × 2 = 2 Nₐ。故 A 最多。",
    tags: ["amount of substance", "atoms"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "For the endothermic reaction C(s) + H₂O(g) ⇌ CO(g) + H₂(g), what shifts the equilibrium in the reverse direction?",
    stemZh: "对于吸热反应 C(s) + H₂O(g) ⇌ CO(g) + H₂(g)，能使平衡逆向移动的是：",
    options: [
      "Increase temperature, increase pressure",
      "Decrease temperature, decrease pressure",
      "Decrease temperature, increase pressure",
      "Increase temperature, decrease pressure",
    ],
    optionsZh: ["升高温度、增大压强", "降低温度、减小压强", "降低温度、增大压强", "升高温度、减小压强"],
    correct: 2,
    explanation:
      "It's endothermic, so cooling shifts it to the exothermic (reverse) side. Gas molecules increase (1 → 2), so raising pressure shifts it to the fewer-molecules (reverse) side. Decreasing temperature + increasing pressure shifts reverse.",
    explanationZh:
      "该反应吸热，降温向放热（逆向）移动；气体分子数 1 → 2，增大压强向分子数减少（逆向）移动。故“降低温度 + 增大压强”使平衡逆向移动。",
    tags: ["equilibrium", "Le Chatelier"],
  },
  {
    topic: "C4.3",
    difficulty: "MEDIUM",
    stem: "H₂ is mixed with a little CO₂ and NH₃. To purify H₂, pass the mixture through, in sequence:",
    stemZh: "氢气中混有少量二氧化碳和氨气，提纯 H₂ 的方法是将混合气体依次通过：",
    options: [
      "Concentrated H₂SO₄, then NaOH solution",
      "CaO, then NaOH solution",
      "NaOH solution, then CaO",
      "NaOH solution, then concentrated H₂SO₄",
    ],
    optionsZh: [
      "浓硫酸、氢氧化钠溶液",
      "氧化钙、氢氧化钠溶液",
      "氢氧化钠溶液、氧化钙",
      "氢氧化钠溶液、浓硫酸",
    ],
    correct: 3,
    explanation:
      "NaOH solution absorbs CO₂ and NH₃, then concentrated H₂SO₄ dries the gas. Remove impurities before drying (else the aqueous wash re-wets the gas).",
    explanationZh:
      "NaOH 溶液吸收 CO₂ 和 NH₃，再用浓硫酸干燥。应先除杂后干燥，否则通过水溶液会重新带入水分。",
    tags: ["purification", "gas"],
  },
  {
    topic: "C1.4",
    difficulty: "HARD",
    stem: "12 g of carbon powder burns in 0.8 mol of oxygen and all carbon is consumed. The resulting gas contains:",
    stemZh: "12 g 碳粉在 0.8 mol 氧气中燃烧，碳粉完全消耗，生成的气体是：",
    options: [
      "Possibly both CO and CO₂",
      "Only CO",
      "CO₂ and O₂",
      "Only CO₂",
    ],
    optionsZh: ["可能同时含有 CO 和 CO₂", "只有 CO", "CO₂ 和 O₂", "只有 CO₂"],
    correct: 0,
    explanation:
      "n(C) = 1 mol. Full combustion to CO₂ needs 1 mol O₂ (only 0.8 available); full combustion to CO needs 0.5 mol O₂ (excess). So O₂ lies between the two limits — a CO + CO₂ mixture forms.",
    explanationZh:
      "n(C) = 1 mol。完全生成 CO₂ 需 1 mol O₂（不足），完全生成 CO 需 0.5 mol O₂（过量）。O₂ 量介于两者之间，故生成 CO 和 CO₂ 的混合物。",
    tags: ["amount of substance", "limiting reactant"],
  },
  {
    topic: "C4.3",
    difficulty: "EASY",
    stem: "To remove a small amount of NaHCO₃ from solid Na₂CO₃, the method is:",
    stemZh: "除去碳酸钠固体中少量碳酸氢钠的方法是：",
    options: ["Introduce carbon dioxide", "Add sodium hydroxide", "Heat", "Add dilute hydrochloric acid"],
    optionsZh: ["通入二氧化碳", "加入氢氧化钠", "加热", "加入稀盐酸"],
    correct: 2,
    explanation:
      "Heating decomposes NaHCO₃ into Na₂CO₃: 2NaHCO₃ → Na₂CO₃ + CO₂↑ + H₂O, with no new impurity. CO₂ converts Na₂CO₃ back to NaHCO₃; NaOH can be excess; HCl consumes both.",
    explanationZh:
      "加热使 NaHCO₃ 分解为 Na₂CO₃：2NaHCO₃ ≜ Na₂CO₃ + CO₂↑ + H₂O，无新杂质。通 CO₂ 会把 Na₂CO₃ 转为 NaHCO₃，NaOH 可能过量，稀盐酸两者都消耗。",
    tags: ["purification"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "For 2HI(g) ⇌ H₂(g) + I₂(g) (forward reaction exothermic), which shifts the equilibrium to the right?",
    stemZh: "对于反应 2HI(g) ⇌ H₂(g) + I₂(g)（正向反应为放热反应），能使平衡右移的是：",
    options: ["Raise the temperature", "Add a catalyst", "Increase the system pressure", "Remove H₂"],
    optionsZh: ["升高温度", "加入催化剂", "增大体系压强", "移除 H₂"],
    correct: 3,
    explanation:
      "Removing product H₂ lowers its concentration and shifts equilibrium forward. Heating shifts an exothermic equilibrium backward; catalysts don't shift equilibrium; pressure has no effect (equal moles of gas both sides).",
    explanationZh:
      "移除生成物 H₂ 使生成物浓度减小，平衡向正向移动。升温使放热反应平衡逆向移动；催化剂不影响平衡；该反应前后气体分子数不变，压强不影响平衡。",
    tags: ["equilibrium"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "For CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (with concentrated H₂SO₄ added), which statement is incorrect?",
    stemZh: "关于反应 CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O（加入浓硫酸），下列说法错误的是：",
    options: [
      "Concentrated H₂SO₄ absorbs the produced water, facilitating the reaction",
      "Concentrated H₂SO₄ acts as a catalyst",
      "The reaction can be controlled to fully convert reactants into products",
      "This is an esterification reaction",
    ],
    optionsZh: [
      "浓硫酸能吸收生成的水，促进反应进行",
      "浓硫酸在反应中作催化剂",
      "该反应可控制为反应物完全转化为生成物",
      "该反应是酯化反应",
    ],
    correct: 2,
    explanation:
      "Esterification is reversible and cannot go to completion, so C is incorrect. H₂SO₄ dehydrates (absorbs water) and catalyses; acid + alcohol → ester + water is esterification.",
    explanationZh:
      "酯化反应是可逆反应，不能进行到底，C 错误。浓硫酸有吸水性和催化作用；酸与醇生成酯和水的反应属于酯化反应。",
    tags: ["organic", "esterification"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "0.1 mol of Na reacts with 37.8 g of water. The mass fraction of the resulting NaOH solution is:",
    stemZh: "0.1 mol 钠与 37.8 g 水反应，所得氢氧化钠溶液的质量分数是：",
    options: ["15%", "10%", "25%", "20%"],
    optionsZh: ["15%", "10%", "25%", "20%"],
    correct: 1,
    explanation:
      "2Na + 2H₂O → 2NaOH + H₂↑. 0.1 mol Na → 0.1 mol NaOH (4.0 g) and 0.05 mol H₂ (0.1 g). Solution mass = (0.1×23 + 37.8) − 0.1 = 40.0 g. Mass fraction = 4.0/40.0 = 10%.",
    explanationZh:
      "2Na + 2H₂O = 2NaOH + H₂↑。0.1 mol Na 生成 0.1 mol NaOH（4.0 g）和 0.05 mol H₂（0.1 g）。溶液质量 = (2.3 + 37.8) − 0.1 = 40.0 g，质量分数 = 4.0/40.0 = 10%。",
    tags: ["amount of substance", "mass fraction"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "The electron configuration of a ground-state potassium atom is:",
    stemZh: "基态钾原子的电子排布式是：",
    options: [
      "1s²2s²2p⁷3s²3p⁶",
      "1s²2s²2p⁶3s²3p⁶4s¹",
      "1s²2s²2p⁶3s²3p⁶3s²4p¹",
      "1s²2s¹2p⁴3s²3p⁶4s²",
    ],
    optionsZh: [
      "1s²2s²2p⁷3s²3p⁶",
      "1s²2s²2p⁶3s²3p⁶4s¹",
      "1s²2s²2p⁶3s²3p⁶3s²4p¹",
      "1s²2s¹2p⁴3s²3p⁶4s²",
    ],
    correct: 1,
    explanation:
      "K has 19 electrons. Filling in energy order (1s < 2s < 2p < 3s < 3p < 4s): 1s²2s²2p⁶3s²3p⁶4s¹.",
    explanationZh:
      "钾原子有 19 个电子，按能量最低原理（1s < 2s < 2p < 3s < 3p < 4s）填充为 1s²2s²2p⁶3s²3p⁶4s¹。",
    tags: ["electron configuration"],
  },
  {
    topic: "C2.4",
    difficulty: "HARD",
    stem:
      "A white powder of two substances is tested: (1) adding water partly dissolves it, then dilute HCl produces bubbles and the solid fully dissolves; (2) adding dilute H₂SO₄ produces bubbles but a solid residue remains. The powder may be:",
    stemZh:
      "某白色粉末由两种物质组成：加水部分溶解，再加稀盐酸产生气泡且固体完全溶解；加稀硫酸产生气泡但仍有固体残留。该白色粉末可能是：",
    options: [
      "CaCO₃ and BaCO₃",
      "AgNO₃ and Na₂CO₃",
      "NaOH and CuSO₄",
      "Na₂CO₃ and BaCO₃",
    ],
    optionsZh: ["碳酸钙 (CaCO₃)、碳酸钡 (BaCO₃)", "硝酸银 (AgNO₃)、碳酸钠 (Na₂CO₃)", "氢氧化钠 (NaOH)、硫酸铜 (CuSO₄)", "碳酸钠 (Na₂CO₃)、碳酸钡 (BaCO₃)"],
    correct: 3,
    explanation:
      "Na₂CO₃ (soluble) + BaCO₃ (insoluble): water partly dissolves; HCl dissolves both with CO₂; H₂SO₄ gives CO₂ but BaCO₃ → BaSO₄ (insoluble residue). A is all-insoluble; B leaves AgCl; C gives blue Cu(OH)₂.",
    explanationZh:
      "Na₂CO₃（可溶）+ BaCO₃（难溶）：加水部分溶解；加盐酸两者都溶并放出 CO₂；加稀硫酸放出 CO₂ 但生成难溶的 BaSO₄ 残留。A 全难溶，B 生成 AgCl 沉淀，C 生成蓝色 Cu(OH)₂。",
    tags: ["ion identification", "inference"],
  },
  {
    topic: "C3.1",
    difficulty: "HARD",
    stem:
      "A material contains three short-period elements X, Y, Z with increasing nuclear charge. X's outer electrons are twice its sub-outer layer; Y's M-shell electrons are half its L-shell; Z's sub-outer electrons are one more than its outer electrons. Which statement is incorrect?",
    stemZh:
      "某新材料含三种短周期元素 X、Y、Z，核电荷数依次增大。X 的最外层电子数是次外层的 2 倍；Y 的 M 层电子数是 L 层的一半；Z 的次外层电子数比最外层多 1。下列说法错误的是：",
    options: [
      "The compound of X and Z is insoluble in water",
      "All three elements are nonmetals",
      "X and Y belong to the same group",
      "The atomic radius of Y is smaller than that of Z",
    ],
    optionsZh: [
      "X 与 Z 形成的化合物不溶于水",
      "三种元素均为非金属",
      "X 与 Y 属于同一主族",
      "Y 的原子半径小于 Z",
    ],
    correct: 3,
    explanation:
      "X = C (outer 4 = 2×2), Y = Si (M=4 = half of L=8), Z = Cl (sub-outer 8 = outer 7 + 1). CCl₄ is water-insoluble (A ✓), all are nonmetals (B ✓), C and Si are Group IVA (C ✓). Si and Cl are in period 3, so Si has a larger radius than Cl — D is wrong.",
    explanationZh:
      "X 为 C，Y 为 Si，Z 为 Cl。CCl₄ 不溶于水（A 对）；三者均为非金属（B 对）；C、Si 同属第 IVA 族（C 对）。Si 与 Cl 同周期，Si 的原子半径大于 Cl，D 错误。",
    tags: ["periodic table", "inference"],
  },
  {
    topic: "C4.4",
    difficulty: "MEDIUM",
    stem:
      "In the electrolysis of saturated brine (port a = cathode, port b = anode), which statement is correct?",
    stemZh:
      "实验室电解饱和食盐水的装置中（端口 a 接阴极、端口 b 接阳极），下列说法正确的是：",
    options: [
      "Adding phenolphthalein, the solution near port a turns red after a while",
      "The gas at port a turns moist litmus paper red",
      "The gas at port b burns with a blue flame",
      "For every 1 mol of electrons transferred, the gas volume at port b is 22.4 L (STP)",
    ],
    optionsZh: [
      "加入酚酞后，一段时间 a 端口附近溶液变红",
      "a 端口放出的气体能使湿润的石蕊试纸变红",
      "b 端口放出的气体能燃烧，产生蓝色火焰",
      "电路中每转移 1 mol 电子，b 端口放出气体的体积为 22.4 L（标准状况）",
    ],
    correct: 0,
    explanation:
      "Cathode (a): 2H₂O + 2e⁻ → H₂↑ + 2OH⁻, so the solution is alkaline and phenolphthalein turns red. The gas at a is H₂ (not acidic); at b (anode) Cl₂ forms (doesn't burn); 1 mol e⁻ gives 0.5 mol Cl₂ = 11.2 L.",
    explanationZh:
      "阴极 (a)：2H₂O + 2e⁻ = H₂↑ + 2OH⁻，溶液呈碱性，酚酞变红。a 端气体为 H₂（非酸性）；b 端（阳极）生成 Cl₂（不能燃烧）；转移 1 mol 电子生成 0.5 mol Cl₂ = 11.2 L。",
    tags: ["electrolysis", "industrial"],
  },
];
