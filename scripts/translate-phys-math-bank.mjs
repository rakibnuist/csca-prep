/**
 * Extends prisma/seeds/legacy-zh.json with PHYS and MATH drill explanations.
 * The generated drills are templated, so the common shapes are translated by
 * rule; a bespoke map covers the one-off explanations.
 */
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("prisma/seeds/legacy-zh.json", "utf8"));
const BY_ID = JSON.parse(fs.readFileSync("prisma/seeds/legacy-zh-bespoke.json", "utf8"));

const fullPhys = JSON.parse(fs.readFileSync("prisma/seeds/full_physics_quiz.json", "utf8"));
const genPhys = JSON.parse(fs.readFileSync("prisma/seeds/generated_physics_questions.json", "utf8"));
const fullMath = JSON.parse(fs.readFileSync("prisma/seeds/full_math_quiz.json", "utf8"));
const genMath = JSON.parse(fs.readFileSync("prisma/seeds/generated_math_questions.json", "utf8"));

const BESPOKE = {
  // PHYS
  "Acceleration is defined as dv/dt.": "加速度定义为 dv/dt。",
  "Neutrons are neutral particles in the nucleus.": "中子是原子核中的中性粒子。",
  "Power is measured in Watts (Joules per second).": "功率的单位是瓦特（焦耳/秒）。",
  "Law of Reflection: Angle of incidence equals angle of reflection.": "反射定律：入射角等于反射角。",
  "Photon energy E = hf, so it depends on frequency.": "光子能量 E = hf，因此取决于频率。",
  // MATH
  "The expression under the radical must be non-negative.": "根号内的表达式必须非负。",
  "Add the real parts and imaginary parts separately.": "分别相加实部与虚部。",
  "Use the standard trigonometric values.": "使用标准三角函数值。",
  "The mean is the sum divided by the count.": "平均数等于总和除以个数。",
  "The sign changes at the roots of the numerator and denominator.": "符号在分子与分母的根处发生变化。",
  "Use the power rule: $$ \\frac{d}{dx} ax^n = anx^{n-1} $$.":
    "使用幂法则：$$ \\frac{d}{dx} ax^n = anx^{n-1} $$。",
  "The standard form of a circle at the origin is $$ x^2 + y^2 = r^2 $$.":
    "以原点为中心的圆的标准方程是 $$ x^2 + y^2 = r^2 $$。",
};

function phys(raw) {
  const e = String(raw).trim();
  const m = (re) => e.match(re);
  let x;
  if ((x = m(/^Work W = Fd = ([\d.]+) × ([\d.]+) = ([\d.]+) J\.$/))) return `功 W = Fd = ${x[1]} × ${x[2]} = ${x[3]} J。`;
  if ((x = m(/^Impulse J = FΔt = ([\d.]+) × ([\d.]+) = ([\d.]+) N·s\.$/))) return `冲量 J = FΔt = ${x[1]} × ${x[2]} = ${x[3]} N·s。`;
  if ((x = m(/^Using v = u \+ at: ([\d.]+) \+ \(([\d.]+) × ([\d.]+)\) = ([\d.]+) m\/s\.$/))) return `由 v = u + at 得 ${x[1]} + (${x[2]} × ${x[3]}) = ${x[4]} m/s。`;
  if ((x = m(/^Newton's Second Law: F = ma = ([\d.]+) × ([\d.]+) = ([\d.]+) N\.$/))) return `由牛顿第二定律 F = ma 得 ${x[1]} × ${x[2]} = ${x[3]} N。`;
  if ((x = m(/^Wave speed v = fλ = ([\d.]+) × ([\d.]+) = ([\d.]+) m\/s\.$/))) return `波速 v = fλ = ${x[1]} × ${x[2]} = ${x[3]} m/s。`;
  if ((x = m(/^Work W = qV = ([\d.]+) × ([\d.]+) = ([\d.]+) J\.$/))) return `功 W = qV = ${x[1]} × ${x[2]} = ${x[3]} J。`;
  if ((x = m(/^Work = Efficiency × Heat_in = ([\d.]+) × ([\d.]+) = ([\d.]+) J\.$/))) return `功 = 效率 × 输入热量 = ${x[1]} × ${x[2]} = ${x[3]} J。`;
  if ((x = m(/^Ohm's Law: I = V\/R = ([\d.]+)\/([\d.]+) = ([\d.]+) A\.$/))) return `由欧姆定律 I = V/R = ${x[1]}/${x[2]} = ${x[3]} A。`;
  if ((x = m(/^PE = mgh = ([\d.]+) × ([\d.]+) × ([\d.]+) = ([\d.]+) J\.$/))) return `重力势能 PE = mgh = ${x[1]} × ${x[2]} × ${x[3]} = ${x[4]} J。`;
  if ((x = m(/^Electric Field E = F\/q = ([\d.]+)\/([\d.]+) = ([\d.]+) N\/C\.$/))) return `电场强度 E = F/q = ${x[1]}/${x[2]} = ${x[3]} N/C。`;
  if ((x = m(/^Centripetal acceleration a_c = v²\/r = ([\d.]+)²\/([\d.]+) = ([\d.]+) m\/s²\.$/))) return `向心加速度 a_c = v²/r = ${x[1]}²/${x[2]} = ${x[3]} m/s²。`;
  if ((x = m(/^K = °C \+ ([\d.]+) = ([\d.]+) \+ ([\d.]+) = ([\d.]+) K\.$/))) return `K = °C + 273 = ${x[2]} + ${x[3]} = ${x[4]} K。`;
  if ((x = m(/^KE = ½mv² = ([\d.]+) × ([\d.]+) × ([\d.]+)² = ([\d.]+) J\.$/))) return `动能 KE = ½mv² = ${x[1]} × ${x[2]} × ${x[3]}² = ${x[4]} J。`;
  if ((x = m(/^Power P = I²R = ([\d.]+)² × ([\d.]+) = ([\d.]+) W\.$/))) return `功率 P = I²R = ${x[1]}² × ${x[2]} = ${x[3]} W。`;
  if ((x = m(/^([\d.]+) years is ([\d.]+) half-lives\. Remaining = ([\d.]+)% \/ ([\d.]+)\^([\d.]+) = ([\d.]+)%\.$/))) return `${x[1]} 年相当于 ${x[2]} 个半衰期。剩余 = ${x[3]}% / ${x[4]}^${x[5]} = ${x[6]}%。`;
  if ((x = m(/^Series Resistors: R_eq = R([\d.]+) \+ R([\d.]+) = ([\d.]+) \+ ([\d.]+) = ([\d.]+) Ω\.$/))) return `串联电阻：R_eq = R1 + R2 = ${x[3]} + ${x[4]} = ${x[5]} Ω。`;
  if ((x = m(/^Using s = ut \+ ½at²: ([\d.]+) \+ ([\d.]+) × ([\d.]+) × ([\d.]+)² = ([\d.]+) m\.$/))) return `由 s = ut + ½at² 得 ${x[1]} + ${x[2]} × ${x[3]} × ${x[4]}² = ${x[5]} m。`;
  if ((x = m(/^Using v² = u² \+ ([\d.]+)gh: ([\d.]+)² = ([\d.]+) \+ ([\d.]+)\(([\d.]+)\)h → h = ([\d.]+)\/([\d.]+) = ([\d.]+) m\.$/))) return `由 v² = u² + 2gh 得 ${x[2]}² = ${x[3]} + ${x[4]}(${x[5]})h，故 h = ${x[6]}/${x[7]} = ${x[8]} m。`;
  if ((x = m(/^Weight W = mg = ([\d.]+) × ([\d.]+) = ([\d.]+) N\.$/))) return `重力 W = mg = ${x[1]} × ${x[2]} = ${x[3]} N。`;
  if ((x = m(/^Momentum p = mv = ([\d.]+) × ([\d.]+) = ([\d.]+) kg·m\/s\.$/))) return `动量 p = mv = ${x[1]} × ${x[2]} = ${x[3]} kg·m/s。`;
  if ((x = m(/^Parallel identical resistors: R_eq = R\/n = ([\d.]+)\/([\d.]+) = ([\d.]+) Ω\.$/))) return `并联相同电阻：R_eq = R/n = ${x[1]}/${x[2]} = ${x[3]} Ω。`;
  if ((x = m(/^The speed of light c is approximately ([\d,]+) m\/s\.$/))) return `光速 c 约为 ${x[1]} m/s。`;
  return BESPOKE[e] ?? null;
}

function math(raw) {
  const e = String(raw).trim();
  const m = (re) => e.match(re);
  let x;
  if ((x = m(/^The standard form of a circle at the origin is \$\$ x\^2 \+ y\^2 = r\^2 \$\$\.$/))) return "以原点为中心的圆的标准方程是 $$ x^2 + y^2 = r^2 $$。";
  if ((x = m(/^Use the power rule: \$\$ \\frac\{d\}\{dx\} ax\^n = anx\^\{n-1\} \$\$\.?$/))) return "使用幂法则：$$ \\frac{d}{dx} ax^n = anx^{n-1} $$。";
  if (/^\$\$ /.test(e) && !/[a-zA-Z]{4,}/.test(e)) return e; // pure formula: keep
  if ((x = m(/^Probability = \(Total - White\) \/ Total = ([\d.]+) \/ ([\d.]+)$/))) return `概率 = (总数 - 白球) / 总数 = ${x[1]} / ${x[2]}。`;
  if ((x = m(/^The roots are (-?[\d.]+) and (-?[\d.]+) Since it is less than ([\d.]+), the solution is between the roots\.$/))) return `根为 ${x[1]} 和 ${x[2]}。因为小于 ${x[3]}，解在两个根之间。`;
  if ((x = m(/^The operation (intersection|union|difference) yields \$\\\{ (.*?) \\}\$\.$/))) { const verb = { intersection: "交集", union: "并集", difference: "差集" }[x[1]]; return `${verb}运算得到 $\\{ ${x[2]} \\}$。`; }
  return BESPOKE[e] ?? null;
}

function apply(items, fn, label) {
  let ok = 0;
  const miss = [];
  for (const q of items) {
    const stem = String(q.question).trim();
    const t = BY_ID[String(q.id)] ?? fn(q.explanation);
    if (t) {
      map[stem] = t;
      ok++;
    } else {
      miss.push(String(q.explanation).trim());
    }
  }
  console.log(`${label}: matched ${ok}/${items.length}`);
  for (const e of [...new Set(miss)].slice(0, 40)) console.log("  MISS:", e.slice(0, 500));
}

apply([...fullPhys, ...genPhys], phys, "PHYS");
apply([...fullMath, ...genMath], math, "MATH");

fs.writeFileSync("prisma/seeds/legacy-zh.json", JSON.stringify(map, null, 1));
console.log("map entries:", Object.keys(map).length);
