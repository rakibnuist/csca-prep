import type { SeedQuestion } from "../types";

/**
 * Official CSCA Physics past paper — March 2026 sitting.
 *
 * Transcribed from the official paper and answer key (bilingual CN/EN).
 * Diagrams are the published figures, kept under public/figures/official.
 * Provided free for study, attributed to the original source.
 */
export const officialPhysicsMar2026Questions: SeedQuestion[] = [
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "In the International System of Units (SI), the unit of force is",
    stemZh: "在国际单位制（SI）中，力的单位是",
    options: ["Ohm (Ω)", "Newton (N)", "Watt (W)", "Joule (J)"],
    optionsZh: ["欧姆（Ω）", "牛顿（N）", "瓦特（W）", "焦耳（J）"],
    correct: 1,
    explanation:
      "Force is measured in newtons; 1 N = 1 kg·m/s². The ohm is the unit of resistance, the watt of power and the joule of energy.",
    explanationZh:
      "力的单位是牛顿，1 N = 1 kg·m/s²。欧姆是电阻的单位，瓦特是功率的单位，焦耳是能量的单位。",
    tags: ["units", "SI"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "Among the kinematic quantities velocity, time, acceleration and speed, the number of vector quantities is",
    stemZh: "在运动学量速度、时间、加速度、速率中，矢量的个数为",
    options: ["1", "4", "3", "2"],
    optionsZh: ["1", "4", "3", "2"],
    correct: 3,
    explanation:
      "Velocity and acceleration have direction, so they are vectors. Time and speed have magnitude only, so they are scalars. The number of vectors is 2.",
    explanationZh:
      "速度、加速度既有大小又有方向，是矢量；时间、速率只有大小，是标量。矢量共有 2 个。",
    tags: ["kinematics", "vectors"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "An object has weight G = 60 N. Its mass is (g = 10 m/s²)",
    stemZh: "物体重力 G = 60 N，质量为（g = 10 m/s²）",
    options: ["60 kg", "600 kg", "6 kg", "0.6 kg"],
    optionsZh: ["60 kg", "600 kg", "6 kg", "0.6 kg"],
    correct: 2,
    explanation:
      "G = mg, so m = G/g = 60/10 = 6 kg.",
    explanationZh:
      "由 G = mg，得 m = G/g = 60/10 = 6 kg。",
    tags: ["gravity", "mass"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "The minimum resultant force of two forces 7 N and 8 N is",
    stemZh: "7 N 和 8 N 两个力的最小合力为",
    options: ["3 N", "15 N", "7 N", "1 N"],
    optionsZh: ["3 N", "15 N", "7 N", "1 N"],
    correct: 3,
    explanation:
      "The resultant is smallest when the forces point in opposite directions: |8 − 7| = 1 N.",
    explanationZh:
      "两力方向相反时合力最小，大小为 |8 − 7| = 1 N。",
    tags: ["forces", "resultant"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "An object starts from rest and undergoes uniformly accelerated linear motion. If its displacement during the first second is 2 m, its displacement during the second second is",
    stemZh: "物体由静止开始做匀加速直线运动，第 1 秒内位移为 2 m，则第 2 秒内位移为",
    options: ["3 m", "8 m", "6 m", "4 m"],
    optionsZh: ["3 m", "8 m", "6 m", "4 m"],
    correct: 2,
    explanation:
      "For motion from rest, s = ½at². In the first second, 2 = ½a(1)² gives a = 4 m/s². In the second second, s₂ = ½a(2² − 1²) = ½ × 4 × 3 = 6 m.",
    explanationZh:
      "由静止开始，s = ½at²。第 1 秒内 2 = ½a×1²，得 a = 4 m/s²。第 2 秒内 s₂ = ½a(2² − 1²) = ½×4×3 = 6 m。",
    tags: ["kinematics", "uniform acceleration"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "An object falls freely from a certain height and covers half the total distance in the first second. The additional time needed to reach the ground is",
    stemZh: "物体从某高度自由落下，第 1 秒内经过总路程的一半，还需多少时间落地？",
    options: ["(√2 − 1) s", "1 s", "√2 s", "1.5 s"],
    optionsZh: ["(√2 − 1) s", "1 s", "√2 s", "1.5 s"],
    correct: 0,
    explanation:
      "In the first second the object falls ½g(1)² = 5 m, which is half the height, so H = 10 m. The total time is T = √(2H/g) = √2 s, so the additional time is (√2 − 1) s.",
    explanationZh:
      "第 1 秒内下落 ½g×1² = 5 m，为总高度的一半，故 H = 10 m。总时间 T = √(2H/g) = √2 s，还需 (√2 − 1) s。",
    tags: ["kinematics", "free fall"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "An outdoor fitness device has points A and B on a rotating wheel. The relation of their linear velocities is",
    stemZh: "健身器材中，旋转轮上 A 和 B 两点的线速度关系为",
    options: ["Unable to determine", "vB < vA", "vB > vA", "vB = vA"],
    optionsZh: ["无法确定", "vB < vA", "vB > vA", "vB = vA"],
    figure: "/figures/official/phy-mar-q7.png",
    correct: 2,
    explanation:
      "Both points turn with the same angular velocity ω because they are on the same wheel. Since v = ωr and B is farther from the axis than A, vB > vA.",
    explanationZh:
      "两点在同一旋转轮上，角速度 ω 相同。由 v = ωr，B 点到轴的距离大于 A 点，故 vB > vA。",
    tags: ["circular motion", "linear velocity"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "A 4 kg object on a smooth horizontal surface is subject to a 20 N pulling force. Its acceleration is",
    stemZh: "4 kg 的物体在光滑水平面上受到 20 N 的拉力，加速度为",
    options: ["20 m/s²", "10 m/s²", "2 m/s²", "5 m/s²"],
    optionsZh: ["20 m/s²", "10 m/s²", "2 m/s²", "5 m/s²"],
    correct: 3,
    explanation:
      "By Newton's second law, a = F/m = 20/4 = 5 m/s².",
    explanationZh:
      "由牛顿第二定律，a = F/m = 20/4 = 5 m/s²。",
    tags: ["newton's second law", "acceleration"],
  },
  {
    topic: "P1.3",
    difficulty: "MEDIUM",
    stem: "A 0.4 kg object rests on a 30° inclined plane. The impulse of the frictional force over 5 s is (g = 10 m/s²)",
    stemZh: "0.4 kg 的物体静止在 30° 斜面上，5 s 内摩擦力的冲量为（g = 10 m/s²）",
    options: ["10√3 N·s", "20 N·s", "0", "10 N·s"],
    optionsZh: ["10√3 N·s", "20 N·s", "0", "10 N·s"],
    correct: 3,
    explanation:
      "The object is at rest, so static friction balances the component of weight along the slope: f = mg sin 30° = 0.4 × 10 × 0.5 = 2 N. Impulse = ft = 2 × 5 = 10 N·s.",
    explanationZh:
      "物体静止，静摩擦力与重力沿斜面的分力平衡：f = mg sin 30° = 0.4×10×0.5 = 2 N。冲量 = ft = 2×5 = 10 N·s。",
    tags: ["impulse", "friction", "inclined plane"],
  },
  {
    topic: "P2.3",
    difficulty: "EASY",
    stem: "In a uniform magnetic field, a 0.5 m wire perpendicular to the field carries 10 A and experiences an Ampere force of 2 N. The magnetic flux density is",
    stemZh: "在匀强磁场中，0.5 m 的直导线垂直于磁场，通过 10 A 电流时受到 2 N 的安培力。磁通量密度为",
    options: ["0.4 T", "0.3 T", "0.1 T", "0.2 T"],
    optionsZh: ["0.4 T", "0.3 T", "0.1 T", "0.2 T"],
    correct: 0,
    explanation:
      "F = BIL when the wire is perpendicular to the field, so B = F/(IL) = 2/(10 × 0.5) = 0.4 T.",
    explanationZh:
      "导线垂直于磁场时 F = BIL，故 B = F/(IL) = 2/(10×0.5) = 0.4 T。",
    tags: ["magnetic field", "ampere force"],
  },
  {
    topic: "P1.6",
    difficulty: "MEDIUM",
    stem: "In the displacement–time graph of simple harmonic motion, the relation of the speeds at points A and B is",
    stemZh: "简谐振动的位移—时间图中，A 和 B 两点的速度关系为",
    options: ["vA = vB", "Cannot be compared", "vA > vB", "vA < vB"],
    optionsZh: ["vA = vB", "无法比较", "vA > vB", "vA < vB"],
    figure: "/figures/official/phy-mar-q11.png",
    correct: 3,
    explanation:
      "In SHM the speed is v = ω√(A² − x²). Point A is at a larger displacement than B, so its speed is smaller: vA < vB.",
    explanationZh:
      "简谐振动中速度 v = ω√(A² − x²)。A 点的位移大于 B 点，故 A 点的速度较小：vA < vB。",
    tags: ["SHM", "speed"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "The displacement–time graph of a toy car is shown. Which statement is correct?",
    stemZh: "玩具汽车的位移—时间图如图所示。下列说法正确的是",
    options: [
      "Within 0–4 s, the speed is 1.0 m/s",
      "Within 0–5 s, the speed is 0.8 m/s",
      "Within 0–4 s, the displacement is 8 m",
      "Within 0–5 s, the average speed is 0.8 m/s",
    ],
    optionsZh: [
      "0~4 s 内速度为 1.0 m/s",
      "0~5 s 内速度为 0.8 m/s",
      "0~4 s 内位移为 8 m",
      "0~5 s 内平均速度为 0.8 m/s",
    ],
    figure: "/figures/official/phy-mar-q12.png",
    correct: 3,
    explanation:
      "From the graph, the displacement over 0–5 s is 4 m, so the average speed is 4/5 = 0.8 m/s. The slope is not constant, so its speed is not a single constant value.",
    explanationZh:
      "由图象，0~5 s 内位移为 4 m，故平均速度为 4/5 = 0.8 m/s。图线斜率不恒定，速度不是某一恒定值。",
    tags: ["kinematics", "graphs"],
  },
  {
    topic: "P1.3",
    difficulty: "EASY",
    stem: "A 4 kg cart moving at 3 m/s collides and couples with a stationary 3 kg cart. The total momentum after the collision is",
    stemZh: "4 kg 小车以 3 m/s 运动，与静止的 3 kg 小车碰撞后合并。碰后总动量为",
    options: ["9 kg·m/s", "12 kg·m/s", "3 kg·m/s", "21 kg·m/s"],
    optionsZh: ["9 kg·m/s", "12 kg·m/s", "3 kg·m/s", "21 kg·m/s"],
    correct: 1,
    explanation:
      "Momentum is conserved in the collision. Before the collision, p = 4 × 3 + 3 × 0 = 12 kg·m/s, so the total momentum afterwards is also 12 kg·m/s.",
    explanationZh:
      "碰撞过程中动量守恒。碰前 p = 4×3 + 3×0 = 12 kg·m/s，故碰后总动量仍为 12 kg·m/s。",
    tags: ["momentum", "collision"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "The displacement–time graph shows two objects A and B. During 0–30 s, their average speeds vA and vB satisfy",
    stemZh: "位移—时间图显示物体 A 和 B 的运动。0~30 s 内它们的平均速度 vA 和 vB 满足",
    options: ["vA = vB", "vA < vB", "vA > vB", "Cannot be compared"],
    optionsZh: ["vA = vB", "vA < vB", "vA > vB", "无法比较"],
    figure: "/figures/official/phy-mar-q14.png",
    correct: 2,
    explanation:
      "Over the same time interval, object A covers a larger displacement than B, so its average velocity is greater: vA > vB.",
    explanationZh:
      "在相同时间内，A 的位移大于 B 的位移，故 A 的平均速度较大：vA > vB。",
    tags: ["kinematics", "average velocity"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "The v–t graph of a 5 kg block under a vertical force is given. The kinetic energy change from t = 0 to t = 6 s is",
    stemZh: "5 kg 物体在竖直力作用下的 v-t 图如图所示。t = 0 至 t = 6 s 内动能变化为",
    options: ["40 J", "30 J", "0 J", "10 J"],
    optionsZh: ["40 J", "30 J", "0 J", "10 J"],
    figure: "/figures/official/phy-mar-q15.png",
    correct: 0,
    explanation:
      "From the graph, v₀ = 0 and v = 4 m/s at t = 6 s. ΔEk = ½mv² − ½mv₀² = ½ × 5 × 4² = 40 J.",
    explanationZh:
      "由图象，v₀ = 0，t = 6 s 时 v = 4 m/s。ΔEk = ½mv² − ½mv₀² = ½×5×4² = 40 J。",
    tags: ["kinetic energy", "graphs"],
  },
  {
    topic: "P4.1",
    difficulty: "MEDIUM",
    stem: "Light enters a medium from air with i = 60° and r = 30°. The refractive index of the medium is",
    stemZh: "光从空气射入介质，入射角 i = 60°，折射角 r = 30°。介质折射率为",
    options: ["1.5", "√2", "√5", "√3"],
    optionsZh: ["1.5", "√2", "√5", "√3"],
    correct: 3,
    explanation:
      "By Snell's law, n = sin i / sin r = sin 60° / sin 30° = (√3/2)/(1/2) = √3.",
    explanationZh:
      "由折射定律，n = sin i / sin r = sin 60°/sin 30° = (√3/2)/(1/2) = √3。",
    tags: ["optics", "refraction"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "Which of the following graphs does not represent uniform linear motion?",
    stemZh: "下列哪个图象不代表匀速直线运动？",
    options: ["Graph A", "Graph B", "Graph C", "Graph D"],
    optionsZh: ["图 A", "图 B", "图 C", "图 D"],
    figure: "/figures/official/phy-mar-q17.png",
    correct: 0,
    explanation:
      "Graph A shows a constant position over time — the object is at rest, not moving uniformly. Graphs B, C and D are straight lines with non-zero slope, so they represent uniform motion (with different starting positions or directions).",
    explanationZh:
      "图 A 中位置不随时间变化，物体静止，不是匀速直线运动。图 B、C、D 均为斜率不为零的直线，表示匀速运动（初位置或方向不同）。",
    tags: ["kinematics", "graphs"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "A particle completes one revolution along a circular path of radius r and returns to the starting point. Its displacement and distance are",
    stemZh: "粒子沿半径为 r 的圆形路径转一圈回到起点，位移和路程分别为",
    options: ["0, 0", "2πr, 0", "0, 2πr", "2πr, 2πr"],
    optionsZh: ["0, 0", "2πr, 0", "0, 2πr", "2πr, 2πr"],
    correct: 2,
    explanation:
      "The distance travelled is the circumference, 2πr. The displacement is the straight-line change in position, which is zero because the particle returns to its starting point.",
    explanationZh:
      "路程为圆周长 2πr；位移是位置的变化量，回到起点时位移为 0。",
    tags: ["kinematics", "displacement", "distance"],
  },
  {
    topic: "P1.6",
    difficulty: "EASY",
    stem: "A mechanical wave with frequency 40 Hz propagates at 280 m/s. Its wavelength is",
    stemZh: "频率 40 Hz 的机械波以 280 m/s 传播，波长为",
    options: ["7 m", "40 m", "240 m", "1/7 m"],
    optionsZh: ["7 m", "40 m", "240 m", "1/7 m"],
    correct: 0,
    explanation:
      "For a wave, v = fλ, so λ = v/f = 280/40 = 7 m.",
    explanationZh:
      "由波速公式 v = fλ，得 λ = v/f = 280/40 = 7 m。",
    tags: ["waves", "wavelength"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "A water droplet falls from a 5 m eave with zero initial velocity (ignore air resistance). Its speed when hitting the ground is (g = 10 m/s²)",
    stemZh: "水滴从 5 m 高的屋檐以零初速下落（忽略空气阻力），落地速度为（g = 10 m/s²）",
    options: ["10 m/s", "20 m/s", "5 m/s", "2 m/s"],
    optionsZh: ["10 m/s", "20 m/s", "5 m/s", "2 m/s"],
    correct: 0,
    explanation:
      "Using v² = 2gh: v = √(2 × 10 × 5) = √100 = 10 m/s.",
    explanationZh:
      "由 v² = 2gh，得 v = √(2×10×5) = √100 = 10 m/s。",
    tags: ["free fall", "speed"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "When an object is in equilibrium, it must be",
    stemZh: "当物体处于平衡状态时，必然",
    options: [
      "Moving in a straight line at constant velocity",
      "At rest",
      "With zero velocity",
      "With zero resultant force from concurrent forces",
    ],
    optionsZh: [
      "做匀速直线运动",
      "静止",
      "速度为零",
      "所受合力为零",
    ],
    correct: 3,
    explanation:
      "Equilibrium means the resultant force is zero. The object may be at rest or moving with constant velocity, so only the zero-resultant statement is necessarily true.",
    explanationZh:
      "平衡状态的本质是合力为零。物体可以静止，也可以做匀速直线运动，故只有“合力为零”必然成立。",
    tags: ["equilibrium", "forces"],
  },
  {
    topic: "P1.4",
    difficulty: "EASY",
    stem: "A block moves horizontally a distance x₀ under a force F at angle α to the horizontal. The work done by F is",
    stemZh: "物体在与水平方向成 α 角的力 F 的作用下水平移动 x₀，力 F 做的功为",
    options: ["Fx₀ cos α", "Fx₀/sin α", "Fx₀ sin α", "Fx₀/cos α"],
    optionsZh: ["Fx₀ cos α", "Fx₀/sin α", "Fx₀ sin α", "Fx₀/cos α"],
    figure: "/figures/official/phy-mar-q22.png",
    correct: 0,
    explanation:
      "Work is the product of the force component along the displacement and the displacement: W = Fx₀ cos α.",
    explanationZh:
      "功等于力沿位移方向的分量与位移的乘积：W = Fx₀ cos α。",
    tags: ["work", "force components"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "Which diagram correctly shows the velocity and acceleration directions of a projectile?",
    stemZh: "下列哪个图正确表示了抛体的速度和加速度方向？",
    options: ["Diagram A", "Diagram B", "Diagram C", "Diagram D"],
    optionsZh: ["图 A", "图 B", "图 C", "图 D"],
    figure: "/figures/official/phy-mar-q23.svg",
    correct: 1,
    explanation:
      "For projectile motion, the velocity is tangent to the trajectory, while the acceleration is always vertically downward (gravity). Diagram B shows this correctly.",
    explanationZh:
      "抛体运动中，速度沿轨迹切线方向，加速度始终竖直向下（重力加速度）。图 B 正确表示了这两个方向。",
    tags: ["projectile motion", "acceleration"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "A light spring produces 8.0 N at 4.0 cm extension. When compressed 1.0 cm, its force is",
    stemZh: "轻弹簧在弹性限度内，伸长 4.0 cm 时弹力为 8.0 N。压缩 1.0 cm 时弹力为",
    options: ["4.0 N", "2.0 N", "8.0 N", "6.0 N"],
    optionsZh: ["4.0 N", "2.0 N", "8.0 N", "6.0 N"],
    correct: 1,
    explanation:
      "The spring constant is k = F/x = 8.0/0.04 = 200 N/m. For a 1.0 cm compression, F = kx = 200 × 0.01 = 2.0 N.",
    explanationZh:
      "劲度系数 k = F/x = 8.0/0.04 = 200 N/m。压缩 1.0 cm 时，F = kx = 200×0.01 = 2.0 N。",
    tags: ["hooke's law", "spring"],
  },
  {
    topic: "P3.2",
    difficulty: "EASY",
    stem: "An ideal gas at constant temperature has its pressure reduced. Its volume would",
    stemZh: "一定量理想气体温度不变，压强减小，体积将",
    options: ["Decrease", "Remain unchanged", "Increase", "All options are possible"],
    optionsZh: ["减小", "不变", "增大", "以上均有可能"],
    correct: 2,
    explanation:
      "Boyle's law: at constant temperature, pV = constant. If the pressure decreases, the volume must increase.",
    explanationZh:
      "由玻意耳定律，温度不变时 pV = 常量。压强减小，体积必然增大。",
    tags: ["ideal gas", "boyle's law"],
  },
  {
    topic: "P2.2",
    difficulty: "MEDIUM",
    stem: "A resistor R has voltage U. The slope of the charge versus time graph represents",
    stemZh: "电阻 R 两端电压为 U，电荷量 q 随时间变化图的斜率表示",
    options: ["R", "U/R", "1/R", "U"],
    optionsZh: ["R", "U/R", "1/R", "U"],
    figure: "/figures/official/phy-mar-q26.png",
    correct: 1,
    explanation:
      "The slope of q–t is dq/dt, which is the current I. By Ohm's law, I = U/R, so the slope represents U/R.",
    explanationZh:
      "q-t 图象的斜率为 dq/dt，即电流 I。由欧姆定律 I = U/R，故斜率表示 U/R。",
    tags: ["current", "ohm's law"],
  },
  {
    topic: "P2.4",
    difficulty: "MEDIUM",
    stem: "For a single-turn coil with magnetic flux decreasing uniformly by 2 Wb/s, which statement is correct?",
    stemZh: "单匝线圈每秒磁通量均匀减少 2 Wb，下列说法正确的是",
    options: [
      "No EMF is induced",
      "Induced EMF increases by 2 V each second",
      "Induced EMF decreases by 2 V each second",
      "Induced EMF remains constant at 2 V",
    ],
    optionsZh: [
      "无感应电动势",
      "感应电动势每秒增加 2 V",
      "感应电动势每秒减少 2 V",
      "感应电动势恒定为 2 V",
    ],
    correct: 3,
    explanation:
      "Faraday's law gives EMF = N|ΔΦ/Δt| = 1 × 2 = 2 V. A uniform rate of change means the EMF is constant at 2 V, not increasing or decreasing.",
    explanationZh:
      "由法拉第电磁感应定律，E = N|ΔΦ/Δt| = 1×2 = 2 V。磁通量均匀变化，故感应电动势恒定为 2 V，不随时间增减。",
    tags: ["electromagnetic induction", "faraday's law"],
  },
  {
    topic: "P4.1",
    difficulty: "EASY",
    stem: "A light ray strikes a mirror at 30° to the mirror surface. The angle of reflection is",
    stemZh: "光线以与镜面成 30° 角射到平面镜上，反射角为",
    options: ["0°", "60°", "45°", "30°"],
    optionsZh: ["0°", "60°", "45°", "30°"],
    figure: "/figures/official/phy-mar-q28.png",
    correct: 1,
    explanation:
      "The angle of incidence is measured from the normal. If the ray makes 30° with the mirror, it makes 90° − 30° = 60° with the normal. The angle of reflection equals the angle of incidence, so it is 60°.",
    explanationZh:
      "入射角是入射光线与法线的夹角。光线与镜面成 30°，则与法线成 90° − 30° = 60°。反射角等于入射角，故为 60°。",
    tags: ["optics", "reflection"],
  },
  {
    topic: "P2.1",
    difficulty: "EASY",
    stem: "In vacuum, points A and B are at distances r and 3r from charge Q. The ratio of field strengths EA : EB is",
    stemZh: "真空中，A 和 B 分别距电荷 Q 为 r 和 3r。场强比 EA:EB 为",
    options: ["1:9", "3:1", "9:1", "1:3"],
    optionsZh: ["1:9", "3:1", "9:1", "1:3"],
    correct: 2,
    explanation:
      "The electric field of a point charge follows E ∝ 1/r². Thus EA/EB = (3r)²/r² = 9, so EA : EB = 9 : 1.",
    explanationZh:
      "点电荷场强 E ∝ 1/r²。故 EA/EB = (3r)²/r² = 9，即 EA : EB = 9 : 1。",
    tags: ["electrostatics", "field strength"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "In a uniform field E, a rod ab of length L makes angle θ with the field. The potential difference between a and b is",
    stemZh: "在匀强电场 E 中，长为 L 的导体 ab 与电场方向成 θ 角。a、b 间电势差为",
    options: ["EL sin θ", "0", "EL cos θ", "EL"],
    optionsZh: ["EL sin θ", "0", "EL cos θ", "EL"],
    figure: "/figures/official/phy-mar-q30.png",
    correct: 2,
    explanation:
      "The potential difference equals E times the projection of the rod onto the field direction: U = EL cos θ.",
    explanationZh:
      "电势差等于场强乘以导体沿电场方向的投影长度：U = EL cos θ。",
    tags: ["electrostatics", "potential difference"],
  },
  {
    topic: "P4.1",
    difficulty: "MEDIUM",
    stem: "A glass surface has refractive index n = √2. Total internal reflection occurs when the angle of incidence i exceeds",
    stemZh: "玻璃折射率 n = √2，当入射角 i 超过多少时发生全反射？",
    options: ["45°", "30°", "Total internal reflection would not occur", "60°"],
    optionsZh: ["45°", "30°", "不会发生全反射", "60°"],
    figure: "/figures/official/phy-mar-q31.png",
    correct: 0,
    explanation:
      "The critical angle satisfies sin θc = 1/n = 1/√2, so θc = 45°. Total internal reflection occurs for i > 45°.",
    explanationZh:
      "临界角满足 sin θc = 1/n = 1/√2，故 θc = 45°。当 i > 45° 时发生全反射。",
    tags: ["optics", "total internal reflection"],
  },
  {
    topic: "P3.2",
    difficulty: "MEDIUM",
    stem: "The p–T graph of a gas is given. From the graph, the volume of the gas",
    stemZh: "某气体的 p-T 图如图所示。由图可知气体体积",
    options: [
      "First constant then decreasing",
      "First decreasing then constant",
      "First constant then increasing",
      "First increasing then constant",
    ],
    optionsZh: [
      "先不变后减小",
      "先减小后不变",
      "先不变后增大",
      "先增大后不变",
    ],
    figure: "/figures/official/phy-mar-q32.png",
    correct: 2,
    explanation:
      "For an ideal gas, pV/T = constant. In the first part the p–T line passes through the origin, so p/T is constant and V is constant. In the second part the pressure rises faster than the temperature, so V increases.",
    explanationZh:
      "理想气体 pV/T = 常量。第一阶段 p-T 图线过原点，p/T 不变，故体积不变；第二阶段压强增长快于温度，故体积增大。",
    tags: ["ideal gas", "p-t graph"],
  },
  {
    topic: "P2.3",
    difficulty: "MEDIUM",
    stem: "A 0.20 m wire carrying 2.0 A is in a 0.50 T field. A force that the wire cannot experience is",
    stemZh: "在 0.50 T 磁场中，0.20 m 长的导线通 2.0 A 电流，导线不可能受到的安培力为",
    options: ["0.10 N", "0 N", "0.40 N", "0.20 N"],
    optionsZh: ["0.10 N", "0 N", "0.40 N", "0.20 N"],
    correct: 2,
    explanation:
      "The maximum Ampere force is BIL = 0.50 × 2.0 × 0.20 = 0.20 N. The force can range from 0 to 0.20 N depending on the angle, so 0.40 N is impossible.",
    explanationZh:
      "最大安培力为 BIL = 0.50×2.0×0.20 = 0.20 N。安培力可在 0 到 0.20 N 之间变化，故 0.40 N 不可能。",
    tags: ["magnetic field", "ampere force"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "In a space with two points a and b in an electric field, which statement is correct?",
    stemZh: "空间中电场内有两点 a 和 b，下列说法正确的是",
    options: [
      "Field strength at a is greater than at b",
      "Field strength at a equals that at b",
      "This is a uniform field",
      "Field strength at b is greater than at a",
    ],
    optionsZh: [
      "a 点场强大于 b 点",
      "a、b 两点场强相等",
      "这是匀强电场",
      "b 点场强大于 a 点",
    ],
    figure: "/figures/official/phy-mar-q34.png",
    correct: 3,
    explanation:
      "Field lines are denser where the field is stronger. The lines are closer together near b, so the field strength at b is greater than at a.",
    explanationZh:
      "电场线越密，场强越大。b 点附近电场线更密，故 b 点场强大于 a 点。",
    tags: ["electrostatics", "field lines"],
  },
  {
    topic: "P2.4",
    difficulty: "EASY",
    stem: "In Faraday's electromagnetic induction experiment, which situation does not cause the ammeter pointer to deflect?",
    stemZh: "在法拉第电磁感应实验中，下列哪种情况不会引起电流计指针偏转？",
    options: [
      "When opening the switch",
      "Keeping the switch closed",
      "When closing the switch",
      "When adjusting the rheostat",
    ],
    optionsZh: ["断开开关时", "保持开关闭合", "闭合开关时", "调节变阻器时"],
    figure: "/figures/official/phy-mar-q35.png",
    correct: 1,
    explanation:
      "With the switch held closed, the current is steady, so the magnetic field is steady and the flux through the secondary coil does not change. No EMF is induced. Opening/closing the switch or changing the rheostat changes the current and induces an EMF.",
    explanationZh:
      "保持开关闭合时，原线圈电流恒定，磁场恒定，副线圈磁通量不变，不产生感应电动势。断开、闭合开关或调节变阻器都会改变电流，从而产生感应电动势。",
    tags: ["electromagnetic induction", "faraday's experiment"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "In free fall, Ep is gravitational potential energy and h is the distance fallen (zero potential at the ground). Which graph correctly shows Ep versus h?",
    stemZh: "自由落体中，Ep 为重力势能，h 为下落距离（以地面为零势面）。哪个图正确反映 Ep 与 h 的关系？",
    options: ["Graph A", "Graph B", "Graph C", "Graph D"],
    optionsZh: ["图 A", "图 B", "图 C", "图 D"],
    figure: "/figures/official/phy-mar-q36.png",
    correct: 1,
    explanation:
      "As the object falls, h increases and its height above the ground decreases. Since Ep = mgh′ (h′ = height above ground), Ep decreases linearly with h.",
    explanationZh:
      "物体下落时 h 增大，离地高度减小。由 Ep = mgh′（h′ 为离地高度），Ep 随 h 线性减小。",
    tags: ["potential energy", "graphs"],
  },
  {
    topic: "P1.2",
    difficulty: "HARD",
    stem: "A 10 kg object on a rough horizontal surface is acted on by F₁ = 18 N and F₂ = 10 N in opposite directions. The coefficient of friction is μ = 0.2 (g = 10 m/s²). The friction force on the object is",
    stemZh: "质量 10 kg 的物体在粗糙水平面上，受到 F₁ = 18 N 和 F₂ = 10 N 的反向水平力（μ = 0.2，g = 10 m/s²），摩擦力为",
    options: ["10 N, to the right", "8 N, to the left", "20 N, to the left", "18 N, to the left"],
    optionsZh: ["10 N，向右", "8 N，向左", "20 N，向左", "18 N，向左"],
    figure: "/figures/official/phy-mar-q37.png",
    correct: 1,
    explanation:
      "The net applied force is 18 − 10 = 8 N to the right. The maximum static friction is μmg = 0.2 × 10 × 10 = 20 N, which exceeds 8 N, so the object stays at rest. Static friction therefore balances the applied force: 8 N to the left.",
    explanationZh:
      "两拉力的合力为 18 − 10 = 8 N，方向向右。最大静摩擦力 μmg = 0.2×10×10 = 20 N，大于 8 N，物体保持静止。故静摩擦力与拉力平衡，大小为 8 N，方向向左。",
    tags: ["friction", "equilibrium"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "An object of mass m falls from rest with constant air resistance, achieving acceleration 4g/5. After falling a height h, the mechanical energy loss is",
    stemZh: "质量 m 的物体由静止下落，空气阻力恒定，加速度为 4g/5。下落高度 h 后，机械能损失为",
    options: ["mgh/5", "4mgh/5", "0", "mgh"],
    optionsZh: ["mgh/5", "4mgh/5", "0", "mgh"],
    correct: 0,
    explanation:
      "Newton's second law gives mg − f = m(4g/5), so the air resistance is f = mg/5. The mechanical energy lost equals the work done against friction: fh = mgh/5.",
    explanationZh:
      "由牛顿第二定律 mg − f = m(4g/5)，得空气阻力 f = mg/5。机械能损失等于克服阻力做的功：fh = mgh/5。",
    tags: ["mechanical energy", "air resistance"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "In diagrams A–D showing electric field lines, which statement is correct?",
    stemZh: "A–D 图均为电场线分布图，下列说法正确的是",
    options: [
      "Diagram B shows the field of two equal but opposite point charges",
      "Diagram A shows the field of a negative point charge",
      "Diagram C shows the field of two equal negative point charges",
      "Diagram D shows the field between two plates of a capacitor",
    ],
    optionsZh: [
      "图 B 显示两个等量异种点电荷的电场",
      "图 A 显示负点电荷的电场",
      "图 C 显示两个等量负点电荷的电场",
      "图 D 显示电容器两板间的电场",
    ],
    figure: "/figures/official/phy-mar-q39.png",
    correct: 1,
    explanation:
      "In diagram A the field lines point inward toward the centre, which is the field of a negative point charge. Diagram B shows two equal positive charges (lines repel), diagram C two equal negative charges, and diagram D a uniform field between plates.",
    explanationZh:
      "图 A 中电场线指向中心，是负点电荷的电场。图 B 为两个等量正电荷（电场线相互排斥），图 C 为两个等量负电荷，图 D 为两板间的匀强电场。",
    tags: ["electrostatics", "field lines"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "Objects A and B of equal mass on a uniformly rotating horizontal disk remain stationary. Then",
    stemZh: "质量相等的 A 和 B 在匀速转动的水平圆盘上静止，则",
    options: [
      "Angular velocity of A equals that of B",
      "Angular velocity of A is less than that of B",
      "Linear velocity of A equals that of B",
      "Angular velocity of A is greater than that of B",
    ],
    optionsZh: [
      "A 的角速度等于 B",
      "A 的角速度小于 B",
      "A 的线速度等于 B",
      "A 的角速度大于 B",
    ],
    figure: "/figures/official/phy-mar-q40.png",
    correct: 0,
    explanation:
      "Both objects rotate with the disk, so they complete the same angle in the same time: their angular velocities are equal. Their linear velocities differ if their radii differ.",
    explanationZh:
      "两物体随圆盘一起转动，相同时间内转过相同角度，故角速度相等。若半径不同，线速度不同。",
    tags: ["circular motion", "angular velocity"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "Two identical metal spheres carry −Q and +3Q. The Coulomb force at distance r is F. After contact and separation to r/2, the new Coulomb force is",
    stemZh: "两个相同金属球分别带 −Q 和 +3Q，相距 r 时库仑力为 F。接触后分开到 r/2，新的库仑力为",
    options: ["12F", "4F/3", "3F/4", "F/12"],
    optionsZh: ["12F", "4F/3", "3F/4", "F/12"],
    correct: 1,
    explanation:
      "Initially F = k(3Q²)/r². After contact the total charge +2Q is shared equally, so each sphere has +Q. At separation r/2, F′ = kQ²/(r/2)² = 4kQ²/r². Thus F′/F = 4/3.",
    explanationZh:
      "初始 F = k(3Q²)/r²。接触后总电荷 +2Q 均分，每个球带 +Q。分开到 r/2 时，F′ = kQ²/(r/2)² = 4kQ²/r²。故 F′/F = 4/3。",
    tags: ["coulomb's law", "charge sharing"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "In the field of a positive charge Q, the potential difference between A and B is U. When a positive charge q moves from B to A",
    stemZh: "正点电荷 Q 产生的电场中，A 和 B 间电势差为 U。正电荷 q 从 B 移到 A 时",
    options: [
      "The external force does work qU overcoming the field, and the potential energy increases by qU",
      "The external force does work QU overcoming the field, and the potential energy decreases by QU",
      "The external force does work qU overcoming the field, and the potential energy increases by QU",
      "The external force does work QU overcoming the field, and the potential energy increases by qU",
    ],
    optionsZh: [
      "外力克服电场力做功 qU，电势能增加 qU",
      "外力克服电场力做功 QU，电势能减少 QU",
      "外力克服电场力做功 qU，电势能增加 QU",
      "外力克服电场力做功 QU，电势能增加 qU",
    ],
    figure: "/figures/official/phy-mar-q42.png",
    correct: 0,
    explanation:
      "A is closer to the positive charge Q than B, so A is at a higher potential. Moving positive charge q from B to A requires external work qU against the field, and the potential energy increases by qU.",
    explanationZh:
      "A 点比 B 点更靠近正电荷 Q，故 A 点电势更高。将正电荷 q 从 B 移到 A，外力需克服电场力做功 qU，电势能增加 qU。",
    tags: ["electrostatics", "potential energy"],
  },
  {
    topic: "P2.2",
    difficulty: "MEDIUM",
    stem: "Three identical resistors are connected in series or in parallel. The minimum combined resistance is 9 Ω. The resistance of a single resistor is",
    stemZh: "三个相同的电阻串联或并联。最小组合电阻为 9 Ω。单个电阻的阻值为",
    options: ["18 Ω", "27 Ω", "3 Ω", "9 Ω"],
    optionsZh: ["18 Ω", "27 Ω", "3 Ω", "9 Ω"],
    correct: 1,
    explanation:
      "For identical resistors, the parallel combination has the smallest resistance: R/3 = 9 Ω, so R = 27 Ω.",
    explanationZh:
      "三个相同电阻并联时总电阻最小：R/3 = 9 Ω，故 R = 27 Ω。",
    tags: ["circuits", "resistance"],
  },
  {
    topic: "P1.2",
    difficulty: "HARD",
    stem: "A smooth wedge M with a horizontal top surface rests on a fixed smooth incline. A ball m rests on the wedge. When the wedge is released from rest, before the ball hits the slope, the ball's trajectory is",
    stemZh: "光滑斜面上有水平顶面的光滑楔形块 M，小球 m 放在楔形块上。楔形块由静止释放，在球碰到斜面之前，球的轨迹为",
    options: ["An irregular curve", "A straight line along the slope", "A parabola", "A straight line vertically downward"],
    optionsZh: ["不规则曲线", "沿斜面的直线", "抛物线", "竖直向下的直线"],
    figure: "/figures/official/phy-mar-q44.png",
    correct: 3,
    explanation:
      "The ball is acted on only by gravity downward and the normal force from the horizontal top surface upward. These are vertical and balance, so there is no horizontal force or acceleration. The ball falls straight down.",
    explanationZh:
      "小球只受竖直向下的重力和水平顶面竖直向上的支持力，二力平衡，水平方向不受力，故小球竖直向下运动。",
    tags: ["newton's laws", "relative motion"],
  },
  {
    topic: "P2.4",
    difficulty: "HARD",
    stem: "When a bar magnet passes through a fixed coil from top to bottom, which statement is correct?",
    stemZh: "条形磁铁从上往下穿过固定线圈时，下列说法正确的是",
    options: [
      "Current direction: b→G→a first, then a→G→b",
      "Current direction: a→G→b first, then b→G→a",
      "When the S pole moves away from the bottom of the coil, the coil repels it",
      "When the N pole approaches the top of the coil, the coil attracts it",
    ],
    optionsZh: [
      "电流方向先 b→G→a，后 a→G→b",
      "电流方向先 a→G→b，后 b→G→a",
      "S 极从下方离开线圈时，线圈对其产生排斥力",
      "N 极从上方靠近线圈时，线圈对其产生吸引力",
    ],
    figure: "/figures/official/phy-mar-q45.png",
    correct: 1,
    explanation:
      "As the N pole enters from above, the upward flux through the coil increases. Lenz's law makes the coil repel the magnet, and the induced current flows a→G→b. As the magnet leaves below, the flux decreases and the current reverses to b→G→a. The coil always opposes the relative motion, so C and D are wrong.",
    explanationZh:
      "N 极从上方进入时，穿过线圈的磁通量增加，由楞次定律线圈排斥磁铁，感应电流方向为 a→G→b；磁铁从下方离开时磁通量减小，电流反向为 b→G→a。线圈总是阻碍相对运动，故 C、D 错误。",
    tags: ["electromagnetic induction", "lenz's law"],
  },
  {
    topic: "P1.2",
    difficulty: "HARD",
    stem: "An object moves uniformly up a 30° inclined plane under a rope parallel to the slope. The coefficient of kinetic friction is μ = √3/3 and g = 10 m/s². The maximum rope tension is 1500 N. The maximum mass of the object is",
    stemZh: "物体在绳的拉力下匀速沿 30° 斜面向上运动，绳平行于斜面，μ = √3/3，g = 10 m/s²。绳子最大张力为 1500 N，物体最大质量为",
    options: ["200√3 kg", "100√3 kg", "200 kg", "150 kg"],
    optionsZh: ["200√3 kg", "100√3 kg", "200 kg", "150 kg"],
    correct: 3,
    explanation:
      "Uniform motion means the forces along the slope balance: T = mg sin 30° + μmg cos 30°. With μ = √3/3, μ cos 30° = (√3/3)(√3/2) = 1/2, so T = mg(1/2 + 1/2) = mg. Hence m = T/g = 1500/10 = 150 kg.",
    explanationZh:
      "匀速运动时沿斜面方向受力平衡：T = mg sin 30° + μmg cos 30°。μ = √3/3 时，μcos 30° = (√3/3)(√3/2) = 1/2，故 T = mg(1/2 + 1/2) = mg。因此 m = T/g = 1500/10 = 150 kg。",
    tags: ["forces", "inclined plane", "friction"],
  },
  {
    topic: "P2.4",
    difficulty: "HARD",
    stem: "The two ends of horizontal parallel rails are connected to a resistor R. A wire ab can slide freely in a magnetic field perpendicular to the rail plane. When ab moves to the right at constant speed, which statement is correct?",
    stemZh: "水平导轨两端连接电阻 R，导线 ab 可在垂直导轨平面的磁场中自由滑动。ab 匀速向右运动时，下列说法正确的是",
    options: [
      "The higher ab's speed, the smaller the pulling force needed",
      "If the force is removed at a certain speed, ab maintains uniform motion",
      "Wire ab is subject to both the pulling force and the Ampere force",
      "With ab at constant speed, increasing R increases the pulling force",
    ],
    optionsZh: [
      "ab 速度越大所需拉力越小",
      "达某速度撤去外力 ab 可维持匀速",
      "ab 不仅受拉力还受安培力",
      "ab 匀速时增大 R 拉力增大",
    ],
    figure: "/figures/official/phy-mar-q47.png",
    correct: 2,
    explanation:
      "The moving wire cuts field lines and experiences an Ampere force opposing its motion, in addition to the external pulling force. At constant speed these balance. A higher speed gives a larger EMF, current and Ampere force, so a larger pulling force is needed; increasing R reduces the current and the required force. Removing the force lets the Ampere force decelerate the wire.",
    explanationZh:
      "运动的导线切割磁感线，除拉力外还受阻碍运动的安培力。匀速时二力平衡。速度越大，感应电动势、电流和安培力越大，所需拉力越大；增大 R 会减小电流和所需拉力；撤去拉力后安培力使导线减速。",
    tags: ["electromagnetic induction", "ampere force"],
  },
  {
    topic: "P2.4",
    difficulty: "HARD",
    stem: "A rectangular wire frame fixed under a high-speed train enters a uniform upward magnetic field B. Sides ab and cd each have length L, the total resistance is R, the train mass is m and the body length is s. When ab enters the field at speed v₀, the combined rail and air resistance is f. Which statement is correct?",
    stemZh: "高铁进站场景：列车底部固定矩形线框进入竖直向上的匀强磁场 B。ab 和 cd 长均为 L，总电阻 R，列车质量 m，车身长 s。当 ab 以速度 v₀ 进入磁场时，轨道和空气阻力合力为 f，则",
    options: [
      "During entry to stop, the charge q ≥ BLs/R",
      "During entry to stop, the relation between q and BLs/R cannot be determined",
      "As ab enters the field, the acceleration a = (4B²L²v₀ − fR)/(mR)",
      "As ab enters the field, the acceleration a = (B²L²v₀ + fR)/(mR)",
    ],
    optionsZh: [
      "进站到停止，通过电路的电荷量 q ≥ BLs/R",
      "进站到停止，q 与 BLs/R 的关系无法确定",
      "ab 进入磁场瞬间，加速度 a = (4B²L²v₀ − fR)/(mR)",
      "ab 进入磁场瞬间，加速度 a = (B²L²v₀ + fR)/(mR)",
    ],
    figure: "/figures/official/phy-mar-q48.png",
    correct: 3,
    explanation:
      "As ab enters, the induced EMF is BLv₀ and the current is BLv₀/R. The Ampere force is B²L²v₀/R, opposing the motion. Together with resistance f, the total retarding force is f + B²L²v₀/R, so the deceleration magnitude is (fR + B²L²v₀)/(mR), which matches option D.",
    explanationZh:
      "ab 进入磁场时，感应电动势 BLv₀，电流 BLv₀/R，安培力 B²L²v₀/R，方向阻碍运动。与阻力 f 共同作用，总阻力为 f + B²L²v₀/R，故加速度大小为 (fR + B²L²v₀)/(mR)，即选项 D。",
    tags: ["electromagnetic induction", "ampere force", "acceleration"],
  },
];
