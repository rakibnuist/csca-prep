import type { SeedQuestion } from "../types";

/**
 * Official CSCA Chemistry past paper — December 2025 sitting.
 *
 * Questions, answer key and explanations transcribed from the official paper
 * and the published answer/solution archive. Seven image-based items are not
 * included in that archive; the remaining 41 are complete.
 */
export const officialChemistryDec2025Questions: SeedQuestion[] = [
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following changes is a chemical change? ( )",
    stemZh: "下列变化属于化学变化的是()",
    options: ["Iron rusting", "Activated carbon adsorbing pigment", "Concentrated hydrochloric acid volatilizing", "Ice melting into water"],
    optionsZh: ["铁生锈", "活性炭吸附色素", "浓盐酸挥发", "冰融化成水"],
    correct: 0,
    explanation:
      "The defining feature of a chemical change is that a new substance is formed. Rusting turns iron into new substances (iron oxides/hydroxides). Adsorption by activated carbon, volatilization of concentrated hydrochloric acid and melting of ice only change the physical state or dispersion; no new substance is formed.",
    explanationZh:
      "化学变化的关键特征是“生成新物质”。铁生锈会生成铁的氧化物/氢氧化物等新物质；吸附、挥发、融化都只是状态或分散状态变化，没有生成新物质。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "Which of the following compound names is correct? ( )",
    stemZh: "下列化合物命名正确的是()",
    options: ["CO - carbon dioxide", "FeCO₃ - iron(II) carbonate", "Na₂CO₃ - baking soda", "CuCl - copper chloride"],
    optionsZh: ["CO 二氧化碳", "FeCO₃碳酸亚铁", "Na₂CO₃小苏打", "CuCl 氯化铜"],
    correct: 1,
    explanation:
      "FeCO₃ is made of Fe²⁺ and CO₃²⁻ ions, so it is iron(II) carbonate. The other names are wrong: CO is carbon monoxide, not carbon dioxide; Na₂CO₃ is soda ash, not baking soda (baking soda is NaHCO₃); CuCl is copper(I) chloride, not copper chloride.",
    explanationZh:
      "【勘误/注意】本题其余选项有明显错误（属试卷勘误点）。 FeCO₃由 Fe²⁺ 与 CO₃²⁻构成，命名为“碳酸亚铁”。其余选项存在明显命名错误或不严谨： CO 不是二氧化碳；Na₂CO₃不是小苏打（小苏打是 NaHCO₃）；CuCl 应写“氯化亚铜/ 氯化铜(I)”。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "Which chemical notation is written correctly? ( )",
    stemZh: "下列化学术语表示正确的是()",
    options: ["2 hydrogen molecules: 2H", "4 water molecules: 4H₂O₂", "5 sodium ions: 5Na", "3 oxygen atoms: 3O"],
    optionsZh: ["2 个氢分子:2H", "4 个水分子:4H₂O₂", "5 个钠离子:5Na", "3 个氧原子:3O"],
    correct: 3,
    explanation:
      "Atoms, molecules and ions are written differently: - Atoms: the element symbol, so 3 oxygen atoms is 3O. - Molecules: the formula with subscripts, so 2 hydrogen molecules is 2H₂ and 4 water molecules is 4H₂O (H₂O₂ is hydrogen peroxide). - Ions: the charge must be shown, so 5 sodium ions is 5Na⁺. Only \"3 oxygen atoms: 3O\" is correct.",
    explanationZh:
      "【勘误/注意】A/B/C 均是常见书写错误：把分子写成原子、把水写成双氧水、或漏写电荷。 注意“原子/分子/离子”的表示： - 原子：用元素符号 O 表示；3 个氧原子写 3O。 - 分子：要写成 H₂、H₂O 等带下标。 - 离子：要写 Na⁺、Cl⁻等带电荷。 因此只有“3 个氧原子：3O”正确。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following substances is a pure substance? ( )",
    stemZh: "下列物质属于纯净物的是()",
    options: ["Hydrochloric acid solution", "A mixture of ice and water", "Air", "Saturated sodium chloride solution"],
    optionsZh: ["盐酸", "冰水混合物", "空气", "饱和食盐水"],
    correct: 1,
    explanation:
      "A pure substance contains only one substance. A mixture of ice and water has a solid and a liquid phase, but both are H₂O, so it is a pure substance. Hydrochloric acid, air and saturated salt solution all contain several components and are mixtures.",
    explanationZh:
      "纯净物看“是否只有一种物质”。冰水混合物虽有固液两相，但成分都为 H₂O，所以是纯净物。盐酸、空气、饱和食盐水都是多种成分的混合物。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "Which pair of substances are allotropes of each other? ( )",
    stemZh: "互为同素异形体的一组物质是()",
    options: ["White phosphorus and red phosphorus", "Ice and dry ice", "Water and hydrogen peroxide", "Oxygen gas and liquid oxygen"],
    optionsZh: ["白磷和红磷", "冰和干冰", "水和双氧水", "氧气和液氧"],
    correct: 0,
    explanation:
      "Allotropes are different structural forms of the same element. White phosphorus and red phosphorus are both made only of P with different structures. Ice and dry ice are different compounds (H₂O and CO₂), water and hydrogen peroxide are different compounds, and oxygen gas and liquid oxygen are the same substance in different states.",
    explanationZh:
      "同素异形体：同一种元素（原子种类相同），结构不同。白磷与红磷都由 P 元素构成， 结构不同。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "In NH₄NO₃, the oxidation numbers of N are ( )",
    stemZh: "NH_4NO_3 中 N 的氧化数是()",
    options: ["-3, +3", "-3, +5", "+1, +5", "+1, -1"],
    optionsZh: ["-3,+3", "-3,+5", "+1,+5", "+1,-1"],
    correct: 1,
    explanation:
      "NH₄NO₃ contains two different N atoms: - In NH₄⁺, H is +1, so 4 H give +4; the ion's charge is +1: N + 4 = +1, N = −3. - In NO₃⁻, O is −2, so 3 O give −6; the ion's charge is −1: N − 6 = −1, N = +5. The oxidation numbers are −3 and +5.",
    explanationZh:
      "分别计算两种 N： NH₄⁺中 H 通常+1，4 个 H 总+4，离子总电荷+1：N+4=+1→N=-3。 NO₃⁻中 O 通常-2，3 个 O 总-6，离子总电荷-1：N-6=-1→N=+5。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following is a solution? ( )",
    stemZh: "下列物质属于溶液的是()",
    options: ["Distilled water", "Normal saline (physiological saline)", "Peanut oil", "Cement slurry"],
    optionsZh: ["蒸馏水", "生理盐水", "花生油", "水泥浆"],
    correct: 1,
    explanation:
      "A solution is a homogeneous, stable mixture. Normal saline is an aqueous solution of NaCl. Distilled water is a pure substance, peanut oil is not a solution of a solute in a solvent, and cement slurry is a suspension, not homogeneous.",
    explanationZh:
      "溶液：均一、稳定的混合物。生理盐水是 NaCl 的水溶液（均一）。泥水/烟/泡沫均为非均一分散体系。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "In the flame test with sodium chloride, the flame color is ( )",
    stemZh: "用氯化钠进行焰色反应,火焰呈()",
    options: ["Pale white", "Yellow", "Light blue", "Green"],
    optionsZh: ["苍白色", "黄色", "淡蓝色", "绿色"],
    correct: 1,
    explanation:
      "Na⁺ gives a bright yellow flame in the flame test (a standard fact to memorize).",
    explanationZh:
      "Na⁺的焰色反应呈亮黄色（典型记忆点）。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which of the following is a non-electrolyte? ( )",
    stemZh: "下列属于非电解质的是()",
    options: ["Sodium acetate", "Sucrose", "Sodium hydroxide", "Sulfuric acid"],
    optionsZh: ["醋酸钠", "蔗糖", "氢氧化钠", "硫酸"],
    correct: 1,
    explanation:
      "A non-electrolyte does not ionize in water and does not conduct electricity. Sucrose dissolves as molecules and produces no ions. Sodium acetate, sodium hydroxide and sulfuric acid are all electrolytes.",
    explanationZh:
      "非电解质在水中不电离，不能导电。蔗糖溶于水仍以分子存在，不产生离子。KOH、HCl、 NaCl 均为电解质。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Among the following substances, which is an electrolyte? ( )",
    stemZh: "下列物质中,属于电解质的是()",
    options: ["NaCl", "Metallic aluminum", "Sucrose", "Carbon dioxide"],
    optionsZh: ["NaCl", "金属铝", "蔗糖", "二氧化碳"],
    correct: 0,
    explanation:
      "An electrolyte is a compound that ionizes and conducts when dissolved in water or molten: NaCl → Na⁺ + Cl⁻. Aluminum conducts but is an element, not a compound; sucrose does not ionize; CO₂ is molecular (the small amount of H₂CO₃ it forms in water is what ionizes, so CO₂ itself is not counted as an electrolyte).",
    explanationZh:
      "电解质：溶于水或熔融时能电离导电。NaCl→Na⁺+Cl⁻。蔗糖不电离；酒精为分子；CO₂ 是分子（在水中少量生成 H₂CO₃，但中学题通常不作为电解质选项）。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "Which of the following reactions is a redox reaction? ( )",
    stemZh: "下列反应是氧化还原反应的是()",
    options: ["CaCO₃ △ CaO + CO₂↑", "HCl + NaOH = NaCl + H₂O", "Fe + CuSO₄ = FeSO₄ + Cu", "CO₂ + H₂O = H₂CO₃"],
    optionsZh: ["CaCO₃△CaO+CO₂↑", "HCl+NaOH=NaCl+H₂O", "Fe+CuSO₄=FeSO₄+Cu", "CO₂+H₂O=H₂CO₃"],
    correct: 2,
    explanation:
      "In Fe + CuSO₄ = FeSO₄ + Cu, Fe(0) → Fe²⁺ loses electrons and is oxidized, and Cu²⁺ → Cu(0) gains electrons and is reduced. A reaction in which oxidation states change is a redox reaction. In the other three reactions no element changes its oxidation state.",
    explanationZh:
      "Fe + CuSO₄ → FeSO₄ + Cu：Fe(0)→Fe²⁺（失电子，被氧化）；Cu²⁺→Cu(0)（得电子，被还原）。有化合价变化即为氧化还原反应。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.3",
    difficulty: "EASY",
    stem: "Which of the following is commonly used as an oxidizing agent? ( )",
    stemZh: "下列物质中,常用作氧化剂的是()",
    options: ["Iron", "Carbon monoxide", "Potassium permanganate", "Hydrogen gas"],
    optionsZh: ["铁", "一氧化碳", "高锰酸钾", "氢气"],
    correct: 2,
    explanation:
      "In KMnO₄, Mn is in the +7 oxidation state and is very easily reduced, so potassium permanganate is a common strong oxidizing agent. Iron, carbon monoxide and hydrogen are reducing agents.",
    explanationZh:
      "KMnO₄中 Mn 为+7 价，极易被还原，常用作强氧化剂。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "Which of the following pairs are allotropes of each other? ( )",
    stemZh: "下列各组中,互为同素异形体的是()",
    options: ["diamond and graphite", "CH₄ and C₄H₈", "12C and 14C", "CO and CO₂"],
    optionsZh: ["金刚石与石墨", "CH₄与 C₄H₈", "12C 与14C", "CO 与 CO₂"],
    correct: 0,
    explanation:
      "Diamond and graphite are the classic allotropes: both are pure carbon with different structures. ¹²C and ¹⁴C are isotopes, not allotropes; CH₄ and C₄H₈, and CO and CO₂, are different compounds.",
    explanationZh:
      "【勘误/注意】A 选项在原卷出现乱码，按常见考点应为“金刚石与石墨”。 同素异形体典型：金刚石与石墨（都是 C，结构不同）。注意：¹²C 与¹⁴C 是同位素，不是同素异形体。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.4",
    difficulty: "EASY",
    stem: "Which aqueous solution of the following compounds is acidic? ( )",
    stemZh: "下列化合物的水溶液呈酸性的是()",
    options: ["NaCl", "NaOH", "Na₂CO₃", "NH₄Cl"],
    optionsZh: ["NaCl", "NaOH", "Na₂CO₃", "NH₄Cl"],
    correct: 3,
    explanation:
      "In water, NH₄⁺ (the conjugate acid of the weak base NH₃) hydrolyzes and releases H⁺, so NH₄Cl solution is acidic. NaCl solution is neutral; NaOH and Na₂CO₃ solutions are basic.",
    explanationZh:
      "NH₄Cl 溶于水：NH₄⁺为弱碱 NH₃的共轭酸，会水解产生 H⁺，使溶液呈酸性。Na₂CO₃、 NaCl、CH₃COONa 一般呈碱性或中性。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "When phenolphthalein is added to a solution, it turns red. The solution is ( )",
    stemZh: "向溶液中滴加酚酞试液,溶液变红色,则该溶液呈()",
    options: ["Basic", "Neutral", "Acidic", "Cannot be determined"],
    optionsZh: ["碱性", "中性", "酸性", "无法确定"],
    correct: 0,
    explanation:
      "Phenolphthalein is colorless in acidic and neutral solutions and turns red in basic solutions. A red color means the solution is basic.",
    explanationZh:
      "酚酞：酸性/中性无色，碱性显红色。出现红色说明溶液呈碱性。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.3",
    difficulty: "EASY",
    stem: "From 1 L of 1 mol·L-1 NaOH solution, 50 mL is taken out. The molar concentration of the 50 mL NaOH solution is ( )",
    stemZh: "从 1L1mol·L-1的 NaOH 溶液中,取出 50mL 的 NaOH 溶液,该 50mLNaOH 溶液 的物质 的量浓度为()",
    options: ["0.02 mol·L-1", "1 mol·L-1", "0.2 mol·L-1", "2 mol·L-1"],
    optionsZh: ["0.02mol·L-1", "1mol·L-1", "0.2mol·L-1", "2mol·L-1"],
    correct: 1,
    explanation:
      "The solution is uniform, so removing part of it removes solute and solvent in the same proportion and the concentration does not change. The 50 mL portion is still 1 mol·L⁻¹.",
    explanationZh:
      "同一瓶均匀溶液，取走一部分，溶质与溶剂等比例减少，浓度不变。1 mol·L⁻¹仍为 1 mol·L⁻¹。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "Which statement about the uses of substances is incorrect? ( )",
    stemZh: "下列关于物质的用途说法不正确的是()",
    options: ["O₂ supports combustion", "CO can be used to extinguish fires", "Carbon can be used as a fuel", "75% ethanol can be used for disinfection"],
    optionsZh: ["O₂可助燃", "CO 可用来灭火", "碳可以作燃料", "75%的酒精可用来消毒"],
    correct: 1,
    explanation:
      "CO is flammable and toxic, so it cannot be used to extinguish fires; CO₂ is the gas used for that (it does not burn and is denser than air). The other statements are correct.",
    explanationZh:
      "CO 可燃且有毒，不用于灭火；CO₂常用于灭火（不燃、密度大）。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.1",
    difficulty: "EASY",
    stem: "The position of 16S in the periodic table is ( )",
    stemZh: "16S 在元素周期表中的位置()",
    options: ["Period 3, Group IVA", "Period 3, Group VIA", "Period 2, Group IVA", "Period 2, Group VA"],
    optionsZh: ["第 3 周期,第 IVA 族", "第 3 周期,第 VIA 族", "第 2 周期,第 IVA 族", "第 2 周期,第 VA 族"],
    correct: 1,
    explanation:
      "Atomic number 16 is sulfur (electron configuration 2, 8, 6): 3 electron shells means Period 3, and 6 valence electrons means Group VIA (Group 16).",
    explanationZh:
      "原子序数 16 对应元素 S（硫），位于第 3 周期、第 16 族（旧记法 VIA 族）。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.1",
    difficulty: "EASY",
    stem: "A beaker of concentrated sulfuric acid is left in air. After some time, what change occurs? ( )",
    stemZh: "一杯浓硫酸放置在空气中,一段时间后,发生的变化是()",
    options: ["The mass of the solvent decreases", "The mass of the solution increases", "The mass of the solute increases", "The mass of the solution decreases"],
    optionsZh: ["溶剂的质量减小", "溶液的质量增大", "溶质的质量增大", "溶液的质量减小"],
    correct: 1,
    explanation:
      "Concentrated sulfuric acid is strongly hygroscopic: left in air, it absorbs water vapor. The solvent mass and therefore the solution mass increase (and the concentration decreases); the solute mass does not change.",
    explanationZh:
      "浓硫酸具有强吸水性，放置在空气中会吸收水蒸气，使溶液质量增大（同时浓度降低）。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.2",
    difficulty: "EASY",
    stem: "Which of the following pairs of substances are homologues? ( )",
    stemZh: "下列各组中,互为同系物的是()",
    options: ["CH₃CH₃ and HC≡CH", "CH₃CH=CH₂ and CH₃CH₃", "CH₃CH=CHCH₃ and CH₃C=CCH₃", "CH₃CH₃ and CH₃CH₂CH₃"],
    optionsZh: ["CH₃CH₃和 HC≡CH", "CH₃CH=CH₂和 CH₃CH₃", "CH₃CH=CHCH₃和 CH₃C=CCH₃", "CH₃CH₃和 CH₃CH₂CH₃"],
    correct: 3,
    explanation:
      ". Ethane and propane are both alkanes and differ by one CH₂ group, so they are homologues.",
    explanationZh:
      "【勘误/注意】原卷 C 选项排版疑似缺少符号，但不影响 D 为标准同系物。 同系物：同一类别有机物，分子式相差若干个-CH₂-。 CH₃CH₃（乙烷）与 CH₃CH₂CH₃（丙烷）同属烷烃，差一个-CH₂-，互为同系物。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "Which statement about reaction types is correct? ( )",
    stemZh: "下列反应类型叙述正确的是()",
    options: ["MnO₂ + 4HCl(conc.) = MnCl₂ + Cl₂↑ + 2H₂O is a combination reaction", "Fe₂O₃ + 3CO = 2Fe + 3CO₂ is a single-displacement reaction", "3Fe + 2O₂ = Fe₃O₄ is a decomposition reaction", "HClO + NaOH = NaClO + H₂O is a double-displacement reaction"],
    optionsZh: ["MnO₂+4HCl(浓)=MnCl₂+Cl₂↑+2H₂O 化合反应", "Fe₂O₃+3CO=2Fe+3CO₂置换反应", "3Fe+2O₂=Fe₃O₄分解反应", "HClO+NaOH=NaClO+H₂O 复分解反应"],
    correct: 3,
    explanation:
      "HClO + NaOH = NaClO + H₂O is an acid–base neutralization, which is a double-displacement reaction. The others are mislabeled: MnO₂ + concentrated HCl is a redox reaction, not a combination; Fe₂O₃ reduced by CO is a redox reaction but not a single displacement (CO is a compound); 3Fe + 2O₂ = Fe₃O₄ is a combination reaction, not a decomposition.",
    explanationZh:
      "HClO + NaOH → NaClO + H₂O 为酸碱中和（本质属复分解）。 其余：MnO₂+浓盐酸为氧化还原；Fe₂O₃被 CO 还原为氧化还原；3Fe+2O₂为化合反应。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.3",
    difficulty: "EASY",
    stem: "When a reaction reaches equilibrium, which of the following must be equal in the reaction system? ( )",
    stemZh: "反应达到平衡时,反应体系中一定相等的是()",
    options: ["The time atoms spend in reactant molecules equals the time in product molecules", "Reactant concentrations equal product concentrations", "Forward reaction rate equals reverse reaction rate", "The mass of reactants equals the mass of products"],
    optionsZh: ["原子存在于反应物分子和产物分子中的时间", "反应物浓度和生成物浓度", "正反应速率和逆反应速率", "反应物质量和生成物质量"],
    correct: 2,
    explanation:
      "Chemical equilibrium is dynamic: the forward rate equals the reverse rate, so macroscopic properties stay constant while the reaction continues. Reactant and product concentrations (or masses) are constant at equilibrium but need not be equal.",
    explanationZh:
      "化学平衡为动态平衡：正反应速率=逆反应速率，所以宏观性质不变，但反应并未停止。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.1",
    difficulty: "EASY",
    stem: "Which of the following substances is an oxide? ( )",
    stemZh: "下列物质中,属于氧化物的是()。",
    options: ["H₂O", "NaOH", "O₂", "KClO₃"],
    optionsZh: ["H₂O", "NaOH", "O₂", "KClO₃"],
    correct: 0,
    explanation:
      "An oxide is a compound of two elements, one of which is oxygen. H₂O fits. NaOH is a base, O₂ is an element, and KClO₃ is a salt of an oxyacid (three elements).",
    explanationZh:
      "氧化物（中学定义）：由两种元素组成且其中一种为氧。H₂O 符合；NaOH 为碱；O₂为 单质；KClO₃为含氧酸盐。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.3",
    difficulty: "EASY",
    stem: "Which statement about catalysts is incorrect? ( )",
    stemZh: "下列关于催化剂说法不正确的是()",
    options: ["Before and after the reaction, the catalyst’s chemical nature does not change", "Before and after the reaction, the catalyst’s mass changes", "Some reactions may use different catalysts", "A catalyst can change the reaction rate"],
    optionsZh: ["反应前后,催化剂的化学性质不发生改变", "反应前后,催化剂的质量发生了改变", "某些反应可使用不同的催化剂", "催化剂可改变反应速率"],
    correct: 1,
    explanation:
      "A catalyst only changes the reaction rate; its mass and chemical properties are the same before and after the reaction. Saying that its mass changes is incorrect.",
    explanationZh:
      "催化剂只改变反应速率（通常加快），反应前后质量和化学性质不变。说“质量发生改变” 错误。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.2",
    difficulty: "EASY",
    stem: "Which group of substances contains the same type of chemical bond(s) throughout? ( )",
    stemZh: "下列各组物质所含化学键均相同的是()",
    options: ["NaCl and HCl", "O₂ and H₂", "HNO₃ and NH₄NO₃", "NaOH and KCl"],
    optionsZh: ["NaCl 与 HCl", "O₂和 H₂", "HNO₃和 NH₄NO₃", "NaOH 和 KCl"],
    correct: 1,
    explanation:
      "O₂ and H₂ are both nonmetal molecules held together only by covalent bonds. NaCl is ionic while HCl is covalent; HNO₃ is covalent while NH₄NO₃ has ionic and covalent bonds; NaOH has ionic and covalent bonds while KCl is only ionic.",
    explanationZh:
      "O₂ 与 H₂ 都是非金属单质分子，只含共价键，化学键类型相同。 A 项：NaCl 含离子键，HCl 含共价键，不相同。 C 项：HNO₃ 只含共价键，NH₄NO₃ 含离子键和共价键，不相同。 D 项：NaOH 含离子键和共价键，KCl 只含离子键，不相同。 故选 B。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.4",
    difficulty: "EASY",
    stem: "To a certain solution, BaCl₂ solution is added and a white precipitate forms. After adding nitric acid, the precipitate does not dissolve. Which statement is correct? ( )",
    stemZh: "向某溶液中加入 BaCl₂溶液,产生白色沉淀,加入硝酸后沉淀不溶解。下列说法正确的是 ().",
    options: ["The solution must contain \nS\nO\n4\n2\n−\nSO\n4\n2−\n\t​", "The solution may contain \nC\nO\n3\n2\n−\nCO\n3\n2−\n\t​", "The solution must contain Ag+", "The solution may contain \nS\nO\n4\n2\n−\nSO\n4\n2−\n\t​\n\n or Ag+"],
    optionsZh: ["该溶液一定含 \nS\nO\n4\n2\n−\nSO\n4\n2−\n\t​", "该溶液可能含 \nC\nO\n3\n2\n−\nCO\n3\n2−\n\t​", "该溶液一定含 Ag+", "该溶液可能含 \nS\nO\n4\n2\n−\nSO\n4\n2−\n\t​\n\n或 Ag+"],
    correct: 3,
    explanation:
      "BaCl₂ solution brings in both Ba²⁺ and Cl⁻, so a white precipitate that does not dissolve in dilute nitric acid has two possible sources: - SO₄²⁻ in the solution: Ba²⁺ + SO₄²⁻ → BaSO₄↓; - Ag⁺ in the solution: Ag⁺ + Cl⁻ → AgCl↓. Both BaSO₄ and AgCl are insoluble in dilute nitric acid, so we can only say the solution may contain SO₄²⁻ or Ag⁺. A and C are wrong: either ion could cause what is observed, so neither \"must\" be present. B is wrong: BaCO₃ would dissolve in nitric acid and give off CO₂, which contradicts \"the precipitate does not dissolve\". So the answer is D.",
    explanationZh:
      "BaCl₂ 溶液同时带入 Ba²⁺ 和 Cl⁻，不溶于稀硝酸的白色沉淀有两种可能： - 原溶液含 SO₄²⁻：Ba²⁺ + SO₄²⁻ → BaSO₄↓； - 原溶液含 Ag⁺：Ag⁺ + Cl⁻ → AgCl↓。 BaSO₄ 和 AgCl 都不溶于稀硝酸，所以只能说溶液可能含 SO₄²⁻ 或 Ag⁺。 A、C 错：两种离子都可能产生这一现象，不能断定“一定”含其中哪一种。 B 错：若沉淀是 BaCO₃，加硝酸会溶解并放出 CO₂，与“沉淀不溶解”矛盾。 故选 D。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.2",
    difficulty: "EASY",
    stem: "The reaction between hydrochloric acid and sodium hydroxide is a ( )",
    stemZh: "盐酸和氢氧化钠的反应属于()",
    options: ["Decomposition reaction", "Neutralization reaction", "Combination reaction", "Displacement reaction"],
    optionsZh: ["分解反应", "中和反应", "化合反应", "置换反应"],
    correct: 1,
    explanation:
      "Hydrochloric acid and sodium hydroxide react as H⁺ + OH⁻ → H₂O, an acid–base neutralization reaction (also a double-displacement reaction).",
    explanationZh:
      "盐酸与 NaOH 反应：H⁺+OH⁻→H₂O，属于中和反应（也可视作复分解）。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.1",
    difficulty: "MEDIUM",
    stem: "Which group of elements belongs to the same main group? ( )",
    stemZh: "下列各组元素属于同一主族的是()",
    options: ["Hydrogen, lithium, sodium", "Carbon, oxygen, sulfur", "Hydrogen, carbon, nitrogen", "Sodium, magnesium, aluminum"],
    optionsZh: ["氢、锂、钠", "碳、氧、硫", "氢、碳、氮", "钠、镁、铝"],
    correct: 0,
    explanation:
      "Lithium and sodium are in Group 1 (IA), and hydrogen is placed at the top of Group IA, so hydrogen, lithium and sodium belong to the same main group. The other sets span several groups.",
    explanationZh:
      "锂、钠在第 1 族；中学题常把氢也放在第 1 族顶部，因此“氢、锂、钠”视作同一主族。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.1",
    difficulty: "MEDIUM",
    stem: "Which trend in atomic radii is correct? ( )",
    stemZh: "下列元素的原子半径递变规律正确的是()",
    options: ["B < Al < Mg < Na", "Al < B < Mg < Na", "Al < B < Na < Mg", "B < Al < Na < Mg"],
    optionsZh: ["B<Al<Mg<Na", "Al<B<Mg<Na", "Al<B<Na<Mg", "B<Al<Na<Mg"],
    correct: 0,
    explanation:
      "Atomic radius trends: - Across a period from left to right the radius decreases: Na > Mg > Al. - Down a group the radius increases: B (Period 2) < Al (Period 3). Together: B < Al < Mg < Na.",
    explanationZh:
      "原子半径大小规律： - 同周期从左到右逐渐减小：Na > Mg > Al。 - 同族向下增大：B（2 周期） < Al（3 周期）。 合并：B < Al < Mg < Na。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.3",
    difficulty: "MEDIUM",
    stem: "At 25°C, 100 mL of 0.05 mol·L-1 H₂SO₄ solution is concentrated by evaporating water to 10 mL. The pH of the solution is ( ).",
    stemZh: "25∘C 时,0.05 mol⋅L-1H₂SO₄ 溶液 100 mL 蒸发水分浓缩到 10 mL 后,溶液的 pH 是().",
    options: ["1", "2", "14", "0"],
    optionsZh: ["1", "2", "14", "0"],
    correct: 3,
    explanation:
      "Evaporating from 100 mL to 10 mL reduces the volume 10-fold, so the concentration rises 10-fold: 0.05 mol·L⁻¹ → 0.5 mol·L⁻¹. Treating H₂SO₄ as a fully ionized diprotic strong acid, [H⁺] = 2 × 0.5 = 1.0 mol·L⁻¹ and pH = 0. (Strictly, the second ionization is incomplete, but the pH is still very close to 0; among the choices the answer is 0.)",
    explanationZh:
      "浓缩：体积缩小 10 倍→浓度增大 10 倍：0.05M→0.5M。 若按强二元酸完全电离，[H⁺]≈2×0.5=1.0M，pH=0。 更严谨考虑第二步电离不完全，pH 仍非常接近 0；在给定选项中应选 0。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "In a 2 L closed container, the reaction 2SO₂(g) + O₂(g) → 2SO₃(g) occurs. In 10 s, the amount of SO₂ decreases from 1 mol to 0.6 mol. The reaction rate v(O₂) is ( )",
    stemZh: "在 2L 密闭容器中进行的反应 2SO₂(g)+O₂(g)→2SO₃(g),在 10s 内反应物 SO₂的物质 的量由 1mol 降到 0.6mol,则反应速率 v(O₂)为()",
    options: ["0.02 mol·L-1·s-1", "0.01 mol·L-1·s-1", "0.2 mol·L-1·s-1", "0.04 mol·L-1·s-1"],
    optionsZh: ["0.02mol·L-1·s-1", "0.01mol·L-1·s-1", "0.2mol·L-1·s-1", "0.04mol·L-1·s-1"],
    correct: 1,
    explanation:
      "In 10 s, SO₂ falls from 1.0 mol to 0.6 mol, a decrease of 0.4 mol; in a 2 L vessel Δc(SO₂) = 0.4 / 2 = 0.2 mol·L⁻¹. v(SO₂) = 0.2 / 10 = 0.02 mol·L⁻¹·s⁻¹. From the coefficients 2SO₂ : 1O₂, v(O₂) = v(SO₂) / 2 = 0.01 mol·L⁻¹·s⁻¹, option B.",
    explanationZh:
      "10 s 内 SO₂由 1.0 mol 降到 0.6 mol，减少 0.4 mol；容积 2 L→Δc(SO₂)=0.4/2=0.2 mol·L⁻¹。 v(SO₂)=0.2/10=0.02 mol·L⁻¹·s⁻¹。 反应 2SO₂ : 1O₂ → v(O₂)=v(SO₂)/2=0.01 mol·L⁻¹·s⁻¹，对应 B。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "After the following reactions reach equilibrium, in which case will BOTH decreasing pressure OR increasing temperature shift the equilibrium toward the forward direction? ( )",
    stemZh: "下列各反应达到平衡后,减小压强或升高温度都能使化学平衡向正反应方向移动的是()",
    options: ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (forward reaction is exothermic)", "2NO₂(g) ⇌ N₂O₄(g) (forward reaction is exothermic)", "3O₂(g) ⇌ 2O₃(g) (forward reaction is endothermic)", "C(s) + CO₂(g) ⇌ 2CO(g) (forward reaction is endothermic)"],
    optionsZh: ["N₂(g)+3H₂(g)⇌2NH₃(g)(正反应为放热反应)", "2NO₂(g)⇌N₂O₄(g)(正反应为放热反应)", "3O₂(g)⇌2O₃(g)(正反应为吸热反应)", "C(s)+CO₂(g)⇌2CO(g)(正反应为吸热反应)"],
    correct: 3,
    explanation:
      "Both changes must shift the equilibrium forward: - Lowering the pressure shifts it toward the side with more moles of gas. - Raising the temperature shifts it in the endothermic direction. C(s) + CO₂(g) ⇌ 2CO(g) is endothermic in the forward direction and has 2 mol of gas on the right versus 1 mol on the left, so both changes favor the forward reaction.",
    explanationZh:
      "要让“减小压强、升高温度”都使平衡向正反应： - 减压→向气体物质的量更多一侧； - 升温→向吸热方向。 C(s)+CO₂(g)⇌2CO(g)正向吸热且右侧气体 2 mol>左侧 1 mol，二者都推动正向。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "Which of the following reactions is a substitution reaction? ( )",
    stemZh: "下列化学反应,属于取代反应的是()",
    options: ["Ethene reacting with hydrogen chloride", "Benzene reacting with hydrogen", "Methane reacting with chlorine", "Ethene reacting with water"],
    optionsZh: ["乙烯与氯化氢反应", "苯与氢气反应", "甲烷与氯气反应", "乙烯与水反应"],
    correct: 2,
    explanation:
      "The typical substitution reaction is an alkane with a halogen under light: CH₄ and Cl₂ give CH₃Cl and HCl (and further substitution products). Ethene with HCl or water, and benzene with hydrogen, are addition reactions.",
    explanationZh:
      "取代反应典型：烷烃+卤素（光照）发生取代。CH₄与 Cl₂在光照下生成 CH₃Cl 和 HCl （可继续多步取代）。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "Atomic masses: H:1, O:16, Na:23, Cu:64 Which statement about organic compounds is correct? ( )",
    stemZh: "原子是 H:1O:16Na:23Cu:64 下列对有机化合物的叙述正确的是()",
    options: ["Organic compounds contain only carbon and oxygen", "Organic substances cannot be synthesized artificially", "All organic compounds exhibit isomerism", "Carbon-containing compounds can be inorganic or organic"],
    optionsZh: ["有机化合物只含有碳、氧元素", "有机物不能通过人工的方法合成", "有机化合物都具有同分异构现象", "含碳元素的化合物可以是无机物也可以是有机物"],
    correct: 3,
    explanation:
      "Carbon-containing compounds include both organic and inorganic substances (e.g. CO₂ and carbonates are inorganic). The other statements are wrong: organic compounds can be synthesized artificially, not all organic compounds have isomers, and organic compounds contain other elements besides C and O (such as H and N).",
    explanationZh:
      "含碳化合物既包括有机物也包括无机物（如 CO₂、碳酸盐等）。 有机物可人工合成；并非所有有机物都有同分异构；有机物元素组成也不只含 C、O。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "Hydrogen is produced by splitting water using solar energy. If 0.02 mol of water is decomposed, which statement is correct? ( )",
    stemZh: "利用太阳能分解水制氢,若分解 0.02mol 水。下列说法正确的是().",
    options: ["The volume of H₂ produced is 0.224 L (at STP)", "The amount of H₂ produced is 0.01 mol", "The amount of H₂ produced is 0.02 mol", "The mass of H₂ produced is 0.02 g"],
    optionsZh: ["可生成 H₂ 的体积为 0.224L(标准状况下)", "生成 H₂ 的物质的量为 0.01mol", "生成 H₂ 的物质的量为 0.02mol", "可生成 H₂ 的质量为 0.02g"],
    correct: 2,
    explanation:
      "2H₂O → 2H₂ + O₂. The coefficients show that 2 mol of water gives 2 mol of hydrogen, so decomposing 0.02 mol of water gives 0.02 mol of H₂ (0.448 L at STP, 0.04 g).",
    explanationZh:
      "2H₂O → 2H₂ + O₂。 系数显示：2 mol 水生成 2 mol 氢气，因此分解 0.02 mol 水生成 0.02 mol 氢气。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C3.3",
    difficulty: "MEDIUM",
    stem: "For the reaction C(s)+H₂O(g)⇌CO(g)+H₂(g), the equilibrium shifts in the reverse direction under which condition? ( )",
    stemZh: "对于反应 C(s)+H₂O(g)⇌CO(g)+H₂(g),反应平衡逆向移动的是()",
    options: ["Increase temperature, decrease pressure", "Increase temperature, increase pressure", "Decrease temperature, decrease pressure", "Decrease temperature, increase pressure"],
    optionsZh: ["升温降压", "升温增压", "降温降压", "降温增压"],
    correct: 3,
    explanation:
      "C(s) + H₂O(g) ⇌ CO(g) + H₂(g) is endothermic in the forward direction and has 2 mol of gas on the right versus 1 mol on the left. To shift it in reverse: lowering the temperature favors the exothermic (reverse) direction, and raising the pressure favors the side with fewer gas molecules (the left). So \"decrease temperature, increase pressure\" is correct.",
    explanationZh:
      "C(s)+H₂O(g)⇌CO(g)+H₂(g)正向吸热且右侧气体 2 mol>左侧 1 mol。 要使平衡向逆反应：降温→向放热方向（逆向）；增压→向气体少的一侧（左）。因此 “降温增压”最符合。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.2",
    difficulty: "MEDIUM",
    stem: "Which liquid can react with freshly prepared Cu(OH)₂ to form a red Cu₂O precipitate? ( )",
    stemZh: "可与新制的 Cu(OH)₂生成红色 Cu₂O 沉淀的液体是()",
    options: ["CH₃COOH", "CH₃COOCH₂CH₃", "CH₃CHO", "CH₃CH₂OH"],
    optionsZh: ["CH₃COOH", "CH₃COOCH₂CH₃", "CH₃CHO", "CH₃CH₂OH"],
    correct: 2,
    explanation:
      "When heated, freshly prepared Cu(OH)₂ is reduced by an aldehyde to a brick-red Cu₂O precipitate. CH₃CHO is an aldehyde; the carboxylic acid, ester and alcohol do not give this reaction.",
    explanationZh:
      "新制 Cu(OH)₂在加热条件下可被醛还原生成砖红色 Cu₂O 沉淀。CH₃CHO 为醛；羧酸、 酯、醇通常不呈该现象。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C1.4",
    difficulty: "MEDIUM",
    stem: "Using CO to reduce a mixture of CuO and Cu powder, 23.4 g of the mixture reacts completely to yield 20.2 g of pure copper powder. The mass of CuO in the original mixture is ( )",
    stemZh: "用 CO 还原混有 Cu 粉的 CuO23.4g,完全反应后得到纯净的铜粉 20.2g,由此可知原 混合物 中含 CuO 的质量是()",
    options: ["20 g", "32 g", "40 g", "16 g"],
    optionsZh: ["20g", "32g", "40g", "16g"],
    correct: 3,
    explanation:
      "CuO + CO → Cu + CO₂. The mass fraction of Cu in CuO is 64 / 80 = 0.8. Let the mass of CuO be x: the original Cu is 23.4 − x and the Cu produced is 0.8x. (23.4 − x) + 0.8x = 20.2 → x = 16 g.",
    explanationZh:
      "CuO+CO→Cu+CO₂。 CuO 中 Cu 质量分数=64/80=0.8。 设 CuO 质量 x：原有 Cu=23.4-x，生成 Cu=0.8x。 (23.4-x)+0.8x=20.2 → x=16 g。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C4.2",
    difficulty: "MEDIUM",
    stem: "In a chemistry lab, students perform the following operations. Which operation can achieve the stated purpose? Operation - Purpose 1 Add excess concentrated NaOH solution to ZnCl₂ solution to prepare Zn(OH)₂ precipitate 2 Heat AlCl₃ solution to dryness to obtain anhydrous AlCl₃ 3 Add dilute nitric acid solution, then filter, wash, and dry to remove CuO mixed in Cu powder 4 Bubble CO₂ into C₆H₅ONa solution; the solution turns cloudy to compare the acidity of carbonic acid and phenol",
    stemZh: "在化学实验课上,同学们进行下列操作,能达到目的是() 实验操作 实验目的 1.将 ZnCl₂溶液中加入过量 NaOH 浓溶液制备 Zn(OH)₂沉淀 2.将 AlCl₃溶液加热蒸干 由 AlCl₃溶液制备无水 AlCl₃ 3.加入稀硝酸溶液,过滤、洗涤、干燥 除去 Cu 粉中混有的 CuO 4.向 C₆H₅ONa 溶液中通入 CO₂,溶液变浑浊比较碳酸与苯酚的酸性",
    options: ["Operation 4 and its purpose", "Operation 1 and its purpose", "Operation 3 and its purpose", "Operation 2 and its purpose"],
    optionsZh: ["4实验操作和实验目的", "1实验操作和实验目的", "3实验操作和实验目的", "2实验操作和实验目的"],
    correct: 0,
    explanation:
      "Only operation ④ achieves its purpose: CO₂ dissolves to form H₂CO₃, which turns phenoxide into sparingly soluble phenol (the solution turns cloudy), showing that carbonic acid is stronger than phenol. ① Excess NaOH dissolves Zn(OH)₂; ② evaporating AlCl₃ solution to dryness hydrolyzes it; ③ dilute nitric acid also dissolves Cu, so it cannot remove only the CuO.",
    explanationZh:
      "只有④能达成：CO₂溶于水生成 H₂CO₃，使苯氧根生成微溶的苯酚而浑浊，可比较酸性强弱。 ①过量 NaOH 会使 Zn(OH)₂溶解；②AlCl₃蒸干会水解；③稀硝酸会溶解 Cu 无法只除 CuO。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.1",
    difficulty: "MEDIUM",
    stem: "A white powder is composed of two substances. To identify them, the following experiments are performed: 1 Add a small amount of the sample to excess water: the solid partially dissolves. Then add excess dilute HCl: bubbles form and the solid dissolves completely. 2 Add a small amount of the sample to excess dilute H₂SO₄: bubbles form; after shaking, some solid remains. The white powder could be ( ).",
    stemZh: "某白色粉末由两种物质组成,为鉴别其成分进行如下实验:1取少量样品加入足量水,固 体部分溶解;再加入足量稀盐酸,有气泡产生,固体全部溶解;2取少量样品加入足量稀 硫酸有气泡产生,振荡后仍有固体存在。该白色粉末可能是().",
    options: ["AgNO₃ and Na₂CO₃", "NaOH and CuSO₄", "CaCO₃ and BaCO₃", "Na₂CO₃ and BaCO₃"],
    optionsZh: ["AgNO₃、Na₂CO₃", "NaOH、CuSO₄", "CaCO₃、BaCO₃", "Na₂CO₃、BaCO₃"],
    correct: 3,
    explanation:
      "The sample only partly dissolves in water, so it contains one soluble substance (Na₂CO₃) and one insoluble one (BaCO₃). With dilute hydrochloric acid it bubbles and dissolves completely: carbonates release CO₂ with acid, and BaCO₃ dissolves in hydrochloric acid. With dilute sulfuric acid a solid remains, because insoluble BaSO₄ forms.",
    explanationZh:
      "加水部分溶解→一种可溶（Na₂CO₃）+一种难溶（BaCO₃）。加稀盐酸有气泡且全溶→ 碳酸盐遇酸放 CO₂且 BaCO₃可溶于盐酸。 加稀硫酸仍有固体→生成难溶 BaSO₄沉淀。",
    tags: ["chemistry", "official"],
  },
  {
    topic: "C2.3",
    difficulty: "MEDIUM",
    stem: "Scientists developed a room-temperature Na-O₂ rechargeable battery. NaClO₄ is dissolved in an organic solvent as the electrolyte. Metallic sodium and Pt/C-loaded carbon cloth are used as electrode materials. The overall cell reaction is: O₂ + 2Na = Na₂O₂. Which statement is correct? ( )",
    stemZh: "科学家研发了一种室温下的 Na-O₂ 二次电池,将 NaClO₄ 溶于有机溶剂作为电解液。 金属 钠和负载 Pt/C 的碳布分别作为电极材料,电池的总反应为:O₂+2Na=Na₂O₂。下列 说法正 确()",
    options: ["During discharge, ClO₄- moves toward the positive electrode", "During discharge, O₂ is released; during charge, O₂ is absorbed", "During discharge, the negative electrode reaction is: Na+ + e- → Na", "During charge, the positive electrode reaction is: Na₂O₂ - 2e- → 2Na+ + O₂"],
    optionsZh: ["放电时,ClO₄-向正极移动", "放电时释放 O₂,充电时吸收 O₂", "放电时,负极反应为:Na++e-→Na", "充电时,正极反应为:Na₂O₂-2e-→2Na++O₂"],
    correct: 3,
    explanation:
      "Discharge: Na is oxidized at the negative electrode, Na − e⁻ → Na⁺, and O₂ is reduced to form Na₂O₂. Charging reverses this: Na₂O₂ loses electrons at the positive electrode and releases O₂, so the positive electrode reaction is Na₂O₂ − 2e⁻ → 2Na⁺ + O₂.",
    explanationZh:
      "放电：Na 被氧化（负极）Na→Na⁺+e⁻；O₂被还原生成 Na₂O₂。 充电反向：Na₂O₂在正极失电子生成 Na⁺并放出 O₂，因此正极：Na₂O₂−2e⁻→2Na⁺+O₂。",
    tags: ["chemistry", "official"],
  },
];
