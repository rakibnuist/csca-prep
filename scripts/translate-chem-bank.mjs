/**
 * Generates prisma/seeds/legacy-zh.json: stem -> Chinese explanation for the
 * legacy drill bank. The generated drills are templated, so most explanations
 * are translated with a handful of rules; the ~20 bespoke ones are listed.
 */
import fs from "node:fs";

const full = JSON.parse(fs.readFileSync("prisma/seeds/full_chemistry_quiz.json", "utf8"));
const gen = JSON.parse(fs.readFileSync("prisma/seeds/generated_chemistry_questions.json", "utf8"));

const BESPOKE = {
  "Oxidation Is Loss (OIL) of electrons.": "氧化是失去电子（OIL）。",
  "Always add Acid to Water (AAW) to prevent splashing from exothermic heat.":
    "应始终把酸加入水中（AAW），以防放热飞溅。",
  "Electrons carry a negative charge.": "电子带负电荷。",
  "The system adjusts to minimize the effect of the change.":
    "系统会自动调整以减弱这种改变的影响。",
  "Reduction Is Gain (RIG) of electrons.": "还原是得到电子（RIG）。",
  "Molar mass of $$ CO_2 = 12 + 2(16) = 44 \\, \\text{g/mol} $$. Moles = Mass / Molar Mass = 44/44 = 1.":
    "CO₂ 的摩尔质量 = 12 + 2(16) = 44 g/mol。物质的量 = 质量 / 摩尔质量 = 44/44 = 1。",
  "$$ pH = -\\log[H^+] $$. $$ [H^+] = 10^{-2} $$, so $$ pH = -(-2) = 2 $$.":
    "pH = -log[H⁺]。[H⁺] = 10⁻²，故 pH = -(-2) = 2。",
  "$$ V \\propto T $$ when P and n are constant. If T doubles, V doubles.":
    "当 P、n 不变时 V ∝ T。T 加倍，V 也加倍。",
  "Alkanes are saturated hydrocarbons with single bonds only, following $$ C_nH_{2n+2} $$.":
    "烷烃是只含单键的饱和烃，通式为 CₙH₂ₙ₊₂。",
  "Zinc loses electrons ($$ Zn^0 \\to Zn^{2+} $$), so it is oxidized. Copper is reduced.":
    "锌失去电子（Zn⁰ → Zn²⁺），被氧化；铜被还原。",
  "Electronegativity increases across a period and decreases down a group. Fluorine is the most electronegative element.":
    "电负性同周期从左到右增大，同主族从上到下减小。氟是电负性最强的元素。",
  "Covalent bonding involves the sharing of electrons. Ionic involves transfer.":
    "共价键涉及电子共享；离子键涉及电子转移。",
  "Increasing pressure favors the side with fewer gas moles (Right: 2 moles, Left: 4 moles). Exothermic reactions favor lower temperatures.":
    "增大压强有利于气体物质的量少的一侧（右侧 2 mol，左侧 4 mol）。放热反应有利于低温。",
  "Total 8 electrons. Shell 1 takes 2. Shell 2 takes remaining 6 ($$ 2s^2, 2p^4 $$).":
    "共 8 个电子。第 1 层 2 个，第 2 层剩余 6 个（2s², 2p⁴）。",
  "$$ CO_2 $$ reacts with calcium hydroxide (limewater) to form insoluble calcium carbonate (white precipitate).":
    "CO₂ 与氢氧化钙（石灰水）反应生成难溶的碳酸钙（白色沉淀）。",
  "Oil and water are immiscible liquids with different densities; a separating funnel is used.":
    "油和水是不互溶、密度不同的液体，可用分液漏斗分离。",
  "Finely divided Iron is used as a catalyst in the Haber process.":
    "哈伯法使用细碎的铁作催化剂。",
  "Iron is in the d-block and is a transition metal. Na and Ca are s-block; Al is p-block.":
    "铁位于 d 区，是过渡金属。Na、Ca 属 s 区；Al 属 p 区。",
  "Strong electrolytes (like NaCl, HCl) dissociate almost 100% into ions in aqueous solution.":
    "强电解质（如 NaCl、HCl）在水溶液中几乎 100% 电离成离子。",
  "Neutralization reaction: Acid + Base $$ \\rightarrow $$ Salt + Water.":
    "中和反应：酸 + 碱 → 盐 + 水。",
};

const GROUP = {
  Halogen: "卤素",
  "Alkali Metal": "碱金属",
  "Noble Gas": "稀有气体",
  Chalcogen: "氧族元素",
};

function translate(raw) {
  const e = String(raw).trim();
  const m = (re) => e.match(re);
  let x;
  if ((x = m(/^Moles = Mass \/ Molar Mass = ([\d.]+) \/ ([\d.]+) = ([\d.]+) mol\.$/)))
    return `物质的量 = 质量 / 摩尔质量 = ${x[1]} / ${x[2]} = ${x[3]} mol。`;
  if ((x = m(/^pH \+ pOH = 14\. Thus, pOH = 14 - ([\d.]+) = ([\d.]+)\.$/)))
    return `pH + pOH = 14，故 pOH = 14 - ${x[1]} = ${x[2]}。`;
  if ((x = m(/^pH = -log\[H\+\]\. -log\(10⁻([\d]+)\) = ([\d]+)\.$/)))
    return `pH = -log[H⁺]。-log(10⁻${x[1]}) = ${x[2]}。`;
  if ((x = m(/^Molarity \(M\) = moles \/ Volume\(L\) = ([\d.]+) \/ ([\d.]+) = ([\d.]+) M\.$/)))
    return `摩尔浓度 (M) = 物质的量 / 体积(L) = ${x[1]} / ${x[2]} = ${x[3]} M。`;
  if ((x = m(/^PV = nRT implies V = nRT\/P = \((.*?)\) \/ ([\d.]+) ≈ ([\d.]+) L\.$/)))
    return `由 PV = nRT 得 V = nRT/P = (${x[1]}) / ${x[2]} ≈ ${x[3]} L。`;
  if ((x = m(/^The general formula for alkanes is CnH\(2n\+2\)\. For n=([\d]+), H = 2\(([\d]+)\)\+2 = ([\d]+)\.$/)))
    return `烷烃的通式为 CnH(2n+2)。当 n=${x[1]} 时，H = 2(${x[2]})+2 = ${x[3]}。`;
  if (e === "The general formula for alkenes is CnH(2n).") return "烯烃的通式为 CnH(2n)。";
  if ((x = m(/^Mass number = Protons \+ Neutrons = ([\d]+) \+ ([\d]+) = ([\d]+)\.$/)))
    return `质量数 = 质子数 + 中子数 = ${x[1]} + ${x[2]} = ${x[3]}。`;
  if ((x = m(/^(\w+) is a classic example of a ([A-Za-z ]+)\.$/)))
    return `${x[1]} 是${GROUP[x[2].trim()] ?? x[2].trim()}的典型例子。`;
  return BESPOKE[e] ?? null;
}

const out = {};
let miss = 0;
for (const q of [...full, ...gen]) {
  const stem = String(q.question).trim();
  const t = translate(q.explanation);
  if (t) out[stem] = t;
  else {
    miss++;
    console.log("MISS:", String(q.explanation).slice(0, 90));
  }
}
fs.writeFileSync("prisma/seeds/legacy-zh.json", JSON.stringify(out, null, 1));
console.log(`wrote ${Object.keys(out).length} entries; miss ${miss}`);
