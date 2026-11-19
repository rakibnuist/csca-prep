import type { SeedQuestion } from "../types";

/**
 * Official CSCA Physics past paper — April 2026 sitting.
 *
 * Transcribed from the official paper and answer key (bilingual CN/EN).
 * Diagrams are the published figures, kept under public/figures/official.
 * Provided free for study, attributed to the original source.
 */
export const officialPhysicsApr2026Questions: SeedQuestion[] = [
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "Which of the following physical quantities is a scalar?",
    stemZh: "下列物理量中属于标量的是",
    options: ["Displacement", "Acceleration", "Force", "Work"],
    optionsZh: ["位移", "加速度", "力", "功"],
    correct: 3,
    explanation:
      "A scalar has magnitude only, with no direction. Work W = Fs cos θ is a scalar, while displacement, acceleration and force are vectors.",
    explanationZh:
      "标量只有大小、没有方向。功 W = Fs cos θ 是标量，而位移、加速度和力都是矢量。",
    tags: ["scalars", "vectors"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "An object's weight on the Moon is about 1/6 of its weight on Earth. If the object has mass m = 6 kg and g = 10 m/s² on Earth, its weight on the Moon is",
    stemZh: "一个物体在月球上的重力约为地球上的 1/6。若物体质量 m = 6 kg，地球上的重力加速度 g = 10 m/s²，则它在月球上的重力为",
    options: ["36 N", "10 N", "60 N", "6 N"],
    optionsZh: ["36 N", "10 N", "60 N", "6 N"],
    correct: 1,
    explanation:
      "On Earth, G = mg = 6 × 10 = 60 N. On the Moon the weight is one sixth: 60/6 = 10 N.",
    explanationZh:
      "在地球上 G = mg = 6×10 = 60 N；在月球上重力为地球上的 1/6，即 60/6 = 10 N。",
    tags: ["gravity", "weight"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "A spring has a spring constant k = 50 N/m and an original length of 10 cm. If it is stretched to 14 cm, the magnitude of the pulling force is",
    stemZh: "一根弹簧的劲度系数 k = 50 N/m，原长 10 cm。若将其拉长至 14 cm，拉力大小为",
    options: ["6 N", "4 N", "2 N", "8 N"],
    optionsZh: ["6 N", "4 N", "2 N", "8 N"],
    correct: 2,
    explanation:
      "The extension is Δx = 14 − 10 = 4 cm = 0.04 m. By Hooke's law, F = kΔx = 50 × 0.04 = 2 N.",
    explanationZh:
      "伸长量 Δx = 14 − 10 = 4 cm = 0.04 m。由胡克定律，F = kΔx = 50×0.04 = 2 N。",
    tags: ["hooke's law", "spring"],
  },
  {
    topic: "P1.2",
    difficulty: "MEDIUM",
    stem: "An object of mass m = 5 kg is placed on a horizontal surface. The coefficient of kinetic friction is μ = 0.2. A horizontal force F = 8 N pulls the object. The magnitude of the frictional force is (g = 10 m/s²)",
    stemZh: "质量 m = 5 kg 的物体放在水平面上，动摩擦因数 μ = 0.2。用 F = 8 N 的水平拉力拉动物体，摩擦力大小为（g = 10 m/s²）",
    options: ["8 N", "4 N", "0 N", "10 N"],
    optionsZh: ["8 N", "4 N", "0 N", "10 N"],
    correct: 0,
    explanation:
      "The maximum static friction is μmg = 0.2 × 5 × 10 = 10 N. Since F = 8 N is less than 10 N, the object remains at rest and static friction balances the pull: f = 8 N.",
    explanationZh:
      "最大静摩擦力 μmg = 0.2×5×10 = 10 N。F = 8 N 小于最大静摩擦力，物体保持静止，静摩擦力与拉力平衡，故 f = 8 N。",
    tags: ["friction", "equilibrium"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "Three forces with magnitudes 3 N, 4 N and 5 N act on the same object. The maximum magnitude of their resultant is",
    stemZh: "三个力大小分别为 3 N、4 N、5 N，作用于同一物体，它们的合力最大值为",
    options: ["6 N", "12 N", "10 N", "0 N"],
    optionsZh: ["6 N", "12 N", "10 N", "0 N"],
    correct: 1,
    explanation:
      "The resultant is maximal when all three forces point in the same direction: 3 + 4 + 5 = 12 N.",
    explanationZh:
      "三个力方向相同时合力最大：3 + 4 + 5 = 12 N。",
    tags: ["forces", "resultant"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "Two forces of magnitudes 15 N and 5 N act in opposite directions. The magnitude of their resultant is",
    stemZh: "大小为 15 N 和 5 N 的两个力方向相反，它们的合力大小为",
    options: ["15 N", "10 N", "5 N", "20 N"],
    optionsZh: ["15 N", "10 N", "5 N", "20 N"],
    correct: 1,
    explanation:
      "For opposite directions, subtract the magnitudes: R = 15 − 5 = 10 N.",
    explanationZh:
      "两力方向相反时，合力大小等于两力大小之差：R = 15 − 5 = 10 N。",
    tags: ["forces", "resultant"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "The three elements of a force are magnitude, direction and",
    stemZh: "力的三要素是大小、方向和",
    options: ["Nature", "Point of application", "Object of action", "Effect"],
    optionsZh: ["性质", "作用点", "受力对象", "作用效果"],
    correct: 1,
    explanation:
      "The three elements that fully determine a force are magnitude, direction and point of application.",
    explanationZh:
      "力的三要素是大小、方向和作用点，三者共同决定力对物体的作用效果。",
    tags: ["forces", "representation"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "An object starts from rest and moves with uniformly accelerated linear motion at a = 3 m/s². Its velocity at the end of 5 s is",
    stemZh: "物体由静止开始做匀加速直线运动，加速度 a = 3 m/s²，5 s 末的速度为",
    options: ["10 m/s", "5 m/s", "20 m/s", "15 m/s"],
    optionsZh: ["10 m/s", "5 m/s", "20 m/s", "15 m/s"],
    correct: 3,
    explanation:
      "v = v₀ + at = 0 + 3 × 5 = 15 m/s.",
    explanationZh:
      "由 v = v₀ + at = 0 + 3×5 = 15 m/s。",
    tags: ["kinematics", "uniform acceleration"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "An object of mass 2 kg is pulled by a 10 N force on a horizontal surface. If the coefficient of kinetic friction is 0.2, its acceleration is (g = 10 m/s²)",
    stemZh: "质量 2 kg 的物体在水平面上受 10 N 的拉力，动摩擦因数为 0.2，物体的加速度为（g = 10 m/s²）",
    options: ["6 m/s²", "3 m/s²", "4 m/s²", "5 m/s²"],
    optionsZh: ["6 m/s²", "3 m/s²", "4 m/s²", "5 m/s²"],
    correct: 1,
    explanation:
      "Friction is f = μmg = 0.2 × 2 × 10 = 4 N. The net force is 10 − 4 = 6 N, so a = F/m = 6/2 = 3 m/s².",
    explanationZh:
      "摩擦力 f = μmg = 0.2×2×10 = 4 N，合力为 10 − 4 = 6 N，故 a = F/m = 6/2 = 3 m/s²。",
    tags: ["newton's second law", "friction"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "An object slides from rest from the top of a smooth 30° inclined plane. Its displacement in 2 s is (g = 10 m/s²)",
    stemZh: "物体从倾角 30° 的光滑斜面顶端由静止滑下，2 s 内的位移为（g = 10 m/s²）",
    options: ["10 m", "20 m", "5 m", "15 m"],
    optionsZh: ["10 m", "20 m", "5 m", "15 m"],
    correct: 0,
    explanation:
      "The acceleration along the incline is a = g sin 30° = 10 × 0.5 = 5 m/s². Displacement s = ½at² = ½ × 5 × 4 = 10 m.",
    explanationZh:
      "沿斜面的加速度 a = g sin 30° = 10×0.5 = 5 m/s²。位移 s = ½at² = ½×5×4 = 10 m。",
    tags: ["kinematics", "inclined plane"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "Two forces of 9 N and 12 N act on a 3 kg object. The maximum possible acceleration of the object is",
    stemZh: "9 N 和 12 N 的两个力作用在 3 kg 的物体上，物体的最大可能加速度为",
    options: ["4 m/s²", "5 m/s²", "6 m/s²", "7 m/s²"],
    optionsZh: ["4 m/s²", "5 m/s²", "6 m/s²", "7 m/s²"],
    correct: 3,
    explanation:
      "The resultant is maximal when the forces are in the same direction: 9 + 12 = 21 N. Thus a = 21/3 = 7 m/s².",
    explanationZh:
      "两力同向时合力最大：9 + 12 = 21 N，故 a = 21/3 = 7 m/s²。",
    tags: ["forces", "acceleration"],
  },
  {
    topic: "P2.1",
    difficulty: "EASY",
    stem: "During the process of two objects being charged by friction, the total amount of charge they possess",
    stemZh: "两个物体摩擦起电的过程中，它们的总电荷量",
    options: ["Remains constant", "Increases", "Cannot be determined due to insufficient conditions", "Decreases"],
    optionsZh: ["保持不变", "增加", "条件不足无法确定", "减少"],
    correct: 0,
    explanation:
      "Triboelectric charging only transfers electrons from one body to the other. Charge is conserved, so the total charge of the two-body system is unchanged.",
    explanationZh:
      "摩擦起电只是电子从一个物体转移到另一个物体，电荷守恒，故两物体系统的总电荷量保持不变。",
    tags: ["electrostatics", "charge conservation"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "A particle undergoes uniform circular motion with linear velocity v = 4 m/s and radius R = 2 m. Its angular velocity is",
    stemZh: "质点做匀速圆周运动，线速度 v = 4 m/s，半径 R = 2 m，角速度为",
    options: ["2 rad/s", "8 rad/s", "4 rad/s", "1 rad/s"],
    optionsZh: ["2 rad/s", "8 rad/s", "4 rad/s", "1 rad/s"],
    correct: 0,
    explanation:
      "For circular motion, v = ωR, so ω = v/R = 4/2 = 2 rad/s.",
    explanationZh:
      "圆周运动中 v = ωR，故 ω = v/R = 4/2 = 2 rad/s。",
    tags: ["circular motion", "angular velocity"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "An object moves from point A to point C along a semicircle of radius 4 m in 2 s. The magnitude of its average velocity is",
    stemZh: "物体沿半径 4 m 的半圆从 A 点运动到 C 点，用时 2 s，平均速度大小为",
    options: ["4 m/s", "0 m/s", "2 m/s", "8 m/s"],
    optionsZh: ["4 m/s", "0 m/s", "2 m/s", "8 m/s"],
    figure: "/figures/official/phy-apr-q14.png",
    correct: 0,
    explanation:
      "Average velocity uses displacement, not path length. A and C are ends of a diameter, so the displacement is 2R = 8 m. Thus v̄ = 8/2 = 4 m/s.",
    explanationZh:
      "平均速度用位移计算，而不是路程。A、C 为直径两端，位移大小为 2R = 8 m，故 v̄ = 8/2 = 4 m/s。",
    tags: ["kinematics", "average velocity"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "An object moves with uniform linear motion on a horizontal surface. If the frictional force on it is 10 N, the magnitude of the pulling force is",
    stemZh: "物体在水平面上做匀速直线运动，若所受摩擦力为 10 N，拉力大小为",
    options: ["0 N", "20 N", "10 N", "5 N"],
    optionsZh: ["0 N", "20 N", "10 N", "5 N"],
    correct: 2,
    explanation:
      "Uniform motion means the net force is zero, so the pulling force balances friction: F = f = 10 N.",
    explanationZh:
      "匀速直线运动时合力为零，拉力与摩擦力平衡，故 F = f = 10 N。",
    tags: ["equilibrium", "friction"],
  },
  {
    topic: "P1.2",
    difficulty: "MEDIUM",
    stem: "A spring has length 12 cm under a 10 N pull and 14 cm under a 20 N pull. Its original length is",
    stemZh: "弹簧受 10 N 拉力时长 12 cm，受 20 N 拉力时长 14 cm，弹簧原长为",
    options: ["8 cm", "11 cm", "9 cm", "10 cm"],
    optionsZh: ["8 cm", "11 cm", "9 cm", "10 cm"],
    correct: 3,
    explanation:
      "For an extra 10 N the spring extends 2 cm, so k = 10/0.02 = 500 N/m. At 10 N the extension is 10/500 = 0.02 m = 2 cm, so the natural length is 12 − 2 = 10 cm.",
    explanationZh:
      "拉力增加 10 N，伸长增加 2 cm，故 k = 10/0.02 = 500 N/m。10 N 时伸长 10/500 = 0.02 m = 2 cm，原长 = 12 − 2 = 10 cm。",
    tags: ["hooke's law", "spring"],
  },
  {
    topic: "P1.2",
    difficulty: "MEDIUM",
    stem: "Which of the following statements about force is incorrect?",
    stemZh: "下列关于力的说法错误的是",
    options: [
      "Force is the cause of a change in an object's state of motion.",
      "Force is a vector, having both magnitude and direction.",
      "A force can have an exerting object but no receiving object.",
      "Force is an interaction between two objects.",
    ],
    optionsZh: [
      "力是物体运动状态改变的原因。",
      "力是矢量，既有大小又有方向。",
      "力可以只有施力物体，没有受力物体。",
      "力是物体对物体的作用。",
    ],
    correct: 2,
    explanation:
      "Force is an interaction, so every force has both a source body and a body it acts on. Statement C is therefore wrong; A, B and D are correct.",
    explanationZh:
      "力是物体间的相互作用，既有施力物体也有受力物体，故 C 错误；A、B、D 均正确。",
    tags: ["forces", "concepts"],
  },
  {
    topic: "P1.3",
    difficulty: "MEDIUM",
    stem: "An object of mass 4 kg slides from rest down a 30° incline. The magnitude of the impulse due to gravity in 3 s is (g = 10 m/s²)",
    stemZh: "质量 4 kg 的物体从倾角 30° 的斜面顶端由静止滑下，3 s 内重力的冲量大小为（g = 10 m/s²）",
    options: ["60 N·s", "40 N·s", "80 N·s", "120 N·s"],
    optionsZh: ["60 N·s", "40 N·s", "80 N·s", "120 N·s"],
    correct: 3,
    explanation:
      "Impulse is force × time. Gravity is G = mg = 4 × 10 = 40 N, directed vertically downward. Thus J = 40 × 3 = 120 N·s.",
    explanationZh:
      "冲量等于力与时间的乘积。重力 G = mg = 4×10 = 40 N，方向竖直向下，故 J = 40×3 = 120 N·s。",
    tags: ["impulse", "gravity"],
  },
  {
    topic: "P1.4",
    difficulty: "EASY",
    stem: "A horizontal pulling force of 15 N moves an object 3 m on a rough surface. If friction is 5 N, the work done by the pulling force is",
    stemZh: "15 N 的水平拉力使物体在粗糙水平面上移动 3 m，若摩擦力为 5 N，拉力做的功为",
    options: ["45 J", "60 J", "30 J", "15 J"],
    optionsZh: ["45 J", "60 J", "30 J", "15 J"],
    correct: 0,
    explanation:
      "The work of the pulling force is W = Fd = 15 × 3 = 45 J. Friction affects the net work, not the work done by the pull itself.",
    explanationZh:
      "拉力做功 W = Fd = 15×3 = 45 J。摩擦力影响合力做功，但不影响拉力本身做的功。",
    tags: ["work", "friction"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "When sitting in a train moving at constant speed, the trees outside appear to move backward. The chosen frame of reference is",
    stemZh: "坐在匀速行驶的火车中，窗外树木向后退，所选参考系是",
    options: ["The Sun", "The trees", "The ground", "The train"],
    optionsZh: ["太阳", "树木", "地面", "火车"],
    correct: 3,
    explanation:
      "Relative to the train, the trees move backward. Relative to the ground they are stationary. Motion is always described relative to a chosen frame.",
    explanationZh:
      "以火车为参考系，树木向后退；以地面为参考系，树木静止。运动总是相对于所选参考系而言。",
    tags: ["reference frames", "kinematics"],
  },
  {
    topic: "P1.6",
    difficulty: "EASY",
    stem: "A spring-mass system completes one full oscillation in 0.5 s. Its frequency is",
    stemZh: "弹簧振子完成一次全振动用时 0.5 s，振动频率为",
    options: ["0.5 Hz", "1 Hz", "4 Hz", "2 Hz"],
    optionsZh: ["0.5 Hz", "1 Hz", "4 Hz", "2 Hz"],
    correct: 3,
    explanation:
      "Frequency is the reciprocal of the period: f = 1/T = 1/0.5 = 2 Hz.",
    explanationZh:
      "频率是周期的倒数：f = 1/T = 1/0.5 = 2 Hz。",
    tags: ["oscillations", "frequency"],
  },
  {
    topic: "P1.6",
    difficulty: "EASY",
    stem: "A sound wave has frequency f = 400 Hz and speed v = 340 m/s. Its wavelength is",
    stemZh: "声波频率 f = 400 Hz，波速 v = 340 m/s，波长为",
    options: ["1.7 m", "3.4 m", "0.85 m", "0.425 m"],
    optionsZh: ["1.7 m", "3.4 m", "0.85 m", "0.425 m"],
    correct: 2,
    explanation:
      "For a wave, v = fλ, so λ = v/f = 340/400 = 0.85 m.",
    explanationZh:
      "由 v = fλ，得 λ = v/f = 340/400 = 0.85 m。",
    tags: ["waves", "wavelength"],
  },
  {
    topic: "P2.1",
    difficulty: "EASY",
    stem: "Two identical metal spheres carry charges +4 C and −6 C. After contact and separation, the charge on each sphere is",
    stemZh: "两个相同金属球分别带 +4 C 和 −6 C 的电荷，接触后分开，每个球的电荷量为",
    options: ["+2 C", "−2 C", "+1 C", "−1 C"],
    optionsZh: ["+2 C", "−2 C", "+1 C", "−1 C"],
    correct: 3,
    explanation:
      "The total charge is +4 + (−6) = −2 C. Identical spheres share it equally, so each carries −2/2 = −1 C.",
    explanationZh:
      "总电荷量为 +4 + (−6) = −2 C。相同金属球均分电荷，每个球带 −2/2 = −1 C。",
    tags: ["electrostatics", "charge sharing"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "An object has mass m = 11 kg. Its weight is (g = 10 m/s²)",
    stemZh: "物体质量 m = 11 kg，重力为（g = 10 m/s²）",
    options: ["110 N", "11 N", "0.11 N", "1.1 N"],
    optionsZh: ["110 N", "11 N", "0.11 N", "1.1 N"],
    correct: 0,
    explanation:
      "G = mg = 11 × 10 = 110 N.",
    explanationZh:
      "G = mg = 11×10 = 110 N。",
    tags: ["gravity", "weight"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "The electric field lines are distributed as shown. Equal positive charges are placed at points a and b. The relationship between the electric forces Fa and Fb is",
    stemZh: "电场线分布如图所示，a、b 两点放等量正电荷，电场力 Fa 与 Fb 的关系是",
    options: ["Cannot be determined", "Fa = Fb", "Fa < Fb", "Fa > Fb"],
    optionsZh: ["无法确定", "Fa = Fb", "Fa < Fb", "Fa > Fb"],
    figure: "/figures/official/phy-apr-q25.png",
    correct: 3,
    explanation:
      "Field lines are denser at a, so Ea > Eb. For equal charges, F = qE, so Fa > Fb.",
    explanationZh:
      "a 点电场线更密，故 Ea > Eb。等量电荷所受电场力 F = qE，故 Fa > Fb。",
    tags: ["electrostatics", "field strength"],
  },
  {
    topic: "P2.2",
    difficulty: "EASY",
    stem: "Resistors of 100 Ω and 200 Ω are connected in parallel. The total resistance is",
    stemZh: "100 Ω 和 200 Ω 的电阻并联，总电阻为",
    options: ["150 Ω", "50 Ω", "300 Ω", "66.7 Ω"],
    optionsZh: ["150 Ω", "50 Ω", "300 Ω", "66.7 Ω"],
    correct: 3,
    explanation:
      "1/R = 1/100 + 1/200 = 3/200, so R = 200/3 ≈ 66.7 Ω. A parallel combination is always less than the smallest resistor.",
    explanationZh:
      "1/R = 1/100 + 1/200 = 3/200，故 R = 200/3 ≈ 66.7 Ω。并联总电阻小于其中最小的电阻。",
    tags: ["circuits", "parallel resistance"],
  },
  {
    topic: "P2.2",
    difficulty: "MEDIUM",
    stem: "Resistors R₁ = 6 Ω and R₂ = 4 Ω are connected in parallel across a 12 V supply. The ratio of their currents I₁ : I₂ is",
    stemZh: "R₁ = 6 Ω，R₂ = 4 Ω 的两个电阻并联在 12 V 电源两端，电流之比 I₁ : I₂ 为",
    options: ["4 : 6", "2 : 3", "3 : 2", "1 : 1"],
    optionsZh: ["4 : 6", "2 : 3", "3 : 2", "1 : 1"],
    correct: 1,
    explanation:
      "In parallel the voltage is the same. I₁ = 12/6 = 2 A and I₂ = 12/4 = 3 A, so I₁ : I₂ = 2 : 3.",
    explanationZh:
      "并联时电压相同。I₁ = 12/6 = 2 A，I₂ = 12/4 = 3 A，故 I₁ : I₂ = 2 : 3。",
    tags: ["circuits", "ohm's law"],
  },
  {
    topic: "P2.1",
    difficulty: "EASY",
    stem: "A point charge Q produces an electric field strength E at point A. If the distance from the charge to A doubles, the field strength becomes",
    stemZh: "点电荷 Q 在 A 点产生的电场强度为 E，若点电荷到 A 点的距离变为原来的 2 倍，电场强度变为",
    options: ["E/2", "2E", "E/4", "4E"],
    optionsZh: ["E/2", "2E", "E/4", "4E"],
    correct: 2,
    explanation:
      "For a point charge E = kQ/r². Doubling r gives E′ = kQ/(2r)² = E/4.",
    explanationZh:
      "点电荷场强 E = kQ/r²。距离变为 2r 时，E′ = kQ/(2r)² = E/4。",
    tags: ["electrostatics", "inverse square law"],
  },
  {
    topic: "P2.3",
    difficulty: "EASY",
    stem: "The SI units of magnetic flux density and magnetic flux are respectively",
    stemZh: "磁感应强度和磁通量的国际单位分别是",
    options: ["Ampere, Coulomb", "Tesla, Weber", "Newton, Joule", "Volt, Ohm"],
    optionsZh: ["安培、库仑", "特斯拉、韦伯", "牛顿、焦耳", "伏特、欧姆"],
    correct: 1,
    explanation:
      "Magnetic flux density is measured in tesla (T) and magnetic flux in weber (Wb). Since Φ = BA, 1 Wb = 1 T·m².",
    explanationZh:
      "磁感应强度的单位是特斯拉（T），磁通量的单位是韦伯（Wb）。由 Φ = BA，1 Wb = 1 T·m²。",
    tags: ["magnetic field", "units"],
  },
  {
    topic: "P4.1",
    difficulty: "EASY",
    stem: "Light travels from air into glass. If the angle of incidence is 45°, the angle of reflection is",
    stemZh: "光从空气射入玻璃，入射角 45°，反射角为",
    options: ["90°", "60°", "45°", "30°"],
    optionsZh: ["90°", "60°", "45°", "30°"],
    correct: 2,
    explanation:
      "By the law of reflection, the angle of reflection equals the angle of incidence: 45°. The angle of refraction would be different and is governed by Snell's law.",
    explanationZh:
      "由反射定律，反射角等于入射角，故为 45°。折射角由折射定律决定，与反射角不同。",
    tags: ["optics", "reflection"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "A and B are two points on a ceiling fan. When the fan rotates at constant speed, the correct relationship between their linear velocities v and angular velocities ω is",
    stemZh: "A、B 为吊扇上两点，风扇匀速转动，两点线速度 v、角速度 ω 的关系正确的是",
    options: [
      "vA < vB, ωA < ωB",
      "vA = vB, ωA = ωB",
      "vA < vB, ωA = ωB",
      "vA > vB, ωA > ωB",
    ],
    optionsZh: [
      "vA < vB, ωA < ωB",
      "vA = vB, ωA = ωB",
      "vA < vB, ωA = ωB",
      "vA > vB, ωA > ωB",
    ],
    figure: "/figures/official/phy-apr-q31.png",
    correct: 2,
    explanation:
      "A and B are on the same rigid fan blade, so they have the same angular velocity. Since v = ωR and B is farther from the axis, vB > vA.",
    explanationZh:
      "A、B 在同一刚性扇叶上，角速度相同。由 v = ωR，B 离轴更远，故 vB > vA。",
    tags: ["circular motion", "angular velocity"],
  },
  {
    topic: "P2.3",
    difficulty: "MEDIUM",
    stem: "A wire of length 0.5 m is placed in a magnetic field B = 0.4 T and experiences a maximum magnetic force of 0.2 N. The current in the wire is",
    stemZh: "长 0.5 m 的导线放在 B = 0.4 T 的磁场中，所受最大安培力为 0.2 N，导线中电流大小为",
    options: ["2 A", "0.5 A", "1 A", "4 A"],
    optionsZh: ["2 A", "0.5 A", "1 A", "4 A"],
    correct: 2,
    explanation:
      "The maximum force occurs when the wire is perpendicular to the field: F = BIL. Thus I = F/(BL) = 0.2/(0.4 × 0.5) = 1 A.",
    explanationZh:
      "导线垂直于磁场时安培力最大：F = BIL，故 I = F/(BL) = 0.2/(0.4×0.5) = 1 A。",
    tags: ["magnetic field", "ampere force"],
  },
  {
    topic: "P3.2",
    difficulty: "MEDIUM",
    stem: "A fixed amount of gas undergoes an isochoric change. Its temperature rises from 27°C to 54°C. The pressure becomes",
    stemZh: "一定质量的气体等容变化，温度从 27°C 升至 54°C，压强变为原来的",
    options: ["1.09 times", "1 time", "2 times", "1.5 times"],
    optionsZh: ["1.09 倍", "1 倍", "2 倍", "1.5 倍"],
    correct: 0,
    explanation:
      "At constant volume, P/T = constant. Convert to kelvin: T₁ = 300 K and T₂ = 327 K. Thus P₂/P₁ = 327/300 = 1.09.",
    explanationZh:
      "等容变化时 P/T = 常量。热力学温度 T₁ = 300 K，T₂ = 327 K，故 P₂/P₁ = 327/300 = 1.09。",
    tags: ["ideal gas", "isochoric process"],
  },
  {
    topic: "P2.4",
    difficulty: "MEDIUM",
    stem: "A coil has 50 turns. The magnetic flux through it increases uniformly from 0.2 Wb to 0.6 Wb in 0.1 s. The induced EMF is",
    stemZh: "50 匝的线圈，磁通量在 0.1 s 内从 0.2 Wb 均匀增至 0.6 Wb，感应电动势为",
    options: ["200 V", "20 V", "100 V", "50 V"],
    optionsZh: ["200 V", "20 V", "100 V", "50 V"],
    correct: 0,
    explanation:
      "By Faraday's law, ε = N|ΔΦ/Δt| = 50 × (0.6 − 0.2)/0.1 = 50 × 4 = 200 V.",
    explanationZh:
      "由法拉第电磁感应定律，ε = N|ΔΦ/Δt| = 50×(0.6−0.2)/0.1 = 50×4 = 200 V。",
    tags: ["electromagnetic induction", "faraday's law"],
  },
  {
    topic: "P1.4",
    difficulty: "EASY",
    stem: "A 0.2 kg ball falls freely from a height of 2 m to the ground. The change in its gravitational potential energy is (g = 10 m/s²)",
    stemZh: "质量 0.2 kg 的小球从 2 m 高处自由下落至地面，重力势能变化量为（g = 10 m/s²）",
    options: ["0 J", "−4 J", "4 J", "2 J"],
    optionsZh: ["0 J", "−4 J", "4 J", "2 J"],
    correct: 1,
    explanation:
      "ΔEp = −mgh = −0.2 × 10 × 2 = −4 J. The minus sign shows the potential energy decreases as the ball falls.",
    explanationZh:
      "ΔEp = −mgh = −0.2×10×2 = −4 J。负号表示小球下落时重力势能减少。",
    tags: ["potential energy", "free fall"],
  },
  {
    topic: "P2.2",
    difficulty: "MEDIUM",
    stem: "The resistance of an electric motor is 2 Ω and its rated voltage is 100 V. When it operates normally, the current is 3 A. The heating power loss is",
    stemZh: "电动机电阻 2 Ω，额定电压 100 V，正常工作电流 3 A，电动机发热功率损耗为",
    options: ["300 W", "18 W", "200 W", "900 W"],
    optionsZh: ["300 W", "18 W", "200 W", "900 W"],
    correct: 1,
    explanation:
      "The heating power is determined by the coil resistance: Pheat = I²R = 3² × 2 = 18 W. The total input power is UI = 300 W; the rest becomes mechanical work.",
    explanationZh:
      "发热功率由线圈电阻决定：P热 = I²R = 3²×2 = 18 W。总输入功率 UI = 300 W，其余转化为机械功。",
    tags: ["circuits", "power"],
  },
  {
    topic: "P4.1",
    difficulty: "EASY",
    stem: "When light travels from an optically denser medium to an optically rarer medium and the angle of incidence exceeds the critical angle, what occurs?",
    stemZh: "光从光密介质射入光疏介质，入射角大于临界角时，发生",
    options: ["Total internal reflection", "Refraction", "Reflection", "Scattering"],
    optionsZh: ["全反射", "折射", "反射", "散射"],
    correct: 0,
    explanation:
      "Beyond the critical angle no refracted ray emerges; all the light is reflected back into the denser medium. This is total internal reflection.",
    explanationZh:
      "入射角大于临界角时，折射光消失，光全部反射回光密介质，这就是全反射。",
    tags: ["optics", "total internal reflection"],
  },
  {
    topic: "P2.1",
    difficulty: "HARD",
    stem: "Two point charges QA = +2×10⁻⁹ C and QB = −2×10⁻⁹ C in vacuum are 4 cm apart. The magnitude of the electric field at the midpoint of the line joining them is (k = 9.0×10⁹ N·m²/C²)",
    stemZh: "真空中两个点电荷 QA = +2×10⁻⁹ C、QB = −2×10⁻⁹ C 相距 4 cm，连线中点的电场强度大小为（k = 9.0×10⁹ N·m²/C²）",
    options: ["0", "9.0×10⁴ N/C", "1.8×10⁵ N/C", "4.5×10⁴ N/C"],
    optionsZh: ["0", "9.0×10⁴ N/C", "1.8×10⁵ N/C", "4.5×10⁴ N/C"],
    correct: 1,
    explanation:
      "Each charge is 0.02 m from the midpoint. The field of each is kQ/r² = 9×10⁹ × 2×10⁻⁹ / 0.02² = 4.5×10⁴ N/C. Both fields point from the positive charge toward the negative one, so they add: 9.0×10⁴ N/C.",
    explanationZh:
      "每个电荷到中点距离 0.02 m，各自场强 kQ/r² = 9×10⁹×2×10⁻⁹/0.02² = 4.5×10⁴ N/C。两场强方向均由正电荷指向负电荷，故叠加为 9.0×10⁴ N/C。",
    tags: ["electrostatics", "field superposition"],
  },
  {
    topic: "P1.6",
    difficulty: "EASY",
    stem: "For a particle in simple harmonic motion, which quantity is maximal when it passes through the equilibrium position?",
    stemZh: "质点做简谐运动，经过平衡位置时，下列物理量最大的是",
    options: ["Acceleration", "Restoring force", "Velocity", "Displacement"],
    optionsZh: ["加速度", "回复力", "速度", "位移"],
    correct: 2,
    explanation:
      "At equilibrium the displacement is zero, so the restoring force and acceleration are zero. All the energy is kinetic, so the velocity is maximal.",
    explanationZh:
      "经过平衡位置时位移为零，回复力和加速度均为零；势能全部转化为动能，故速度最大。",
    tags: ["SHM", "equilibrium"],
  },
  {
    topic: "P1.4",
    difficulty: "HARD",
    stem: "A 5 kg object starts from rest and slides down a 30° incline from B to A. The friction is 5 N and BA = 2 m. Its speed at A is (g = 10 m/s²)",
    stemZh: "质量 5 kg 的物体从静止开始沿倾角 30° 的斜面从 B 点滑至 A 点，摩擦力 5 N，BA 间距 2 m，物体在 A 点的速度为（g = 10 m/s²）",
    options: ["4 m/s", "2√5 m/s", "8 m/s", "5 m/s"],
    optionsZh: ["4 m/s", "2√5 m/s", "8 m/s", "5 m/s"],
    figure: "/figures/official/phy-apr-q40.png",
    correct: 0,
    explanation:
      "Work–energy theorem: mgL sin 30° − fL = ½mv². That is 5×10×2×0.5 − 5×2 = 50 − 10 = 40 J. Thus v = √(2×40/5) = 4 m/s.",
    explanationZh:
      "由动能定理：mgL sin 30° − fL = ½mv²，即 5×10×2×0.5 − 5×2 = 50 − 10 = 40 J，故 v = √(2×40/5) = 4 m/s。",
    tags: ["work-energy theorem", "inclined plane"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "A charge of +5×10⁻⁶ C is moved from A to B, and the electric force does 1×10⁻³ J of positive work. The potential difference UAB is",
    stemZh: "+5×10⁻⁶ C 的电荷从 A 点移到 B 点，电场力做正功 1×10⁻³ J，电势差 UAB 为",
    options: ["−200 V", "200 V", "−0.2 V", "0.2 V"],
    optionsZh: ["−200 V", "200 V", "−0.2 V", "0.2 V"],
    correct: 1,
    explanation:
      "UAB = WAB/q = (1×10⁻³)/(5×10⁻⁶) = 200 V. Positive work on a positive charge means it moves from higher to lower potential, so UAB > 0.",
    explanationZh:
      "UAB = WAB/q = (1×10⁻³)/(5×10⁻⁶) = 200 V。正电荷受电场力做正功，说明从高电势移向低电势，故 UAB > 0。",
    tags: ["electrostatics", "potential difference"],
  },
  {
    topic: "P1.4",
    difficulty: "EASY",
    stem: "A 20 N horizontal force moves an object 10 m. The friction is 5 N. The increase in kinetic energy is",
    stemZh: "20 N 的水平力使物体移动 10 m，摩擦力 5 N，此过程中物体动能增加量为",
    options: ["50 J", "200 J", "100 J", "150 J"],
    optionsZh: ["50 J", "200 J", "100 J", "150 J"],
    correct: 3,
    explanation:
      "By the work–energy theorem, ΔEk = (F − f)s = (20 − 5) × 10 = 150 J.",
    explanationZh:
      "由动能定理，ΔEk = (F − f)s = (20−5)×10 = 150 J。",
    tags: ["work-energy theorem", "kinetic energy"],
  },
  {
    topic: "P1.4",
    difficulty: "HARD",
    stem: "A bullet at 600 m/s penetrates a wooden plank and emerges at 400 m/s. If it enters a second identical plank, its final speed is",
    stemZh: "子弹初速度 600 m/s，穿透第一块木板后速度为 400 m/s，再射入第二块相同木板，子弹末速度为",
    options: ["0", "100 m/s", "50 m/s", "200 m/s"],
    optionsZh: ["0", "100 m/s", "50 m/s", "200 m/s"],
    correct: 0,
    explanation:
      "The first plank removes ½m(600² − 400²) = ½m × 200000 of kinetic energy. The second plank would need the same removal, but ½m × 400² = ½m × 160000 is less than 200000, so the bullet stops inside the second plank.",
    explanationZh:
      "第一块木板消耗的动能为 ½m(600² − 400²) = ½m×200000。第二块木板若消耗同样多能量，所需能量 ½m×200000 大于子弹进入时的动能 ½m×400² = ½m×160000，故子弹在第二块木板内停止。",
    tags: ["work-energy theorem", "kinetic energy"],
  },
  {
    topic: "P1.2",
    difficulty: "HARD",
    stem: "A small ball falls freely and contacts a light vertical spring below until its velocity becomes zero. Which statement about the ball's motion is correct?",
    stemZh: "小球从空中自由下落，与正下方轻质竖直弹簧接触直至速度为零，关于小球运动的说法正确的是",
    options: [
      "After contact, the ball decelerates, with increasing acceleration and decreasing velocity until zero.",
      "After contact, the position with zero velocity and zero acceleration is where the spring is most compressed.",
      "After contact, the ball first accelerates then decelerates; velocity increases first then decreases to zero.",
      "The position of maximum velocity is where the spring is most compressed.",
    ],
    optionsZh: [
      "接触后小球做减速运动，加速度增大、速度减小至零",
      "接触后速度为零、加速度为零的位置是弹簧压缩量最大处",
      "接触后小球先加速后减速，速度先增大后减小至零",
      "接触后小球速度最大的位置是弹簧压缩量最大处",
    ],
    figure: "/figures/official/phy-apr-q44.png",
    correct: 2,
    explanation:
      "Just after contact the spring force is smaller than gravity, so the net force is downward and the ball accelerates. At the equilibrium position the spring force equals gravity and the speed is maximal. Beyond that the spring force exceeds gravity, so the ball decelerates to rest.",
    explanationZh:
      "刚接触时弹力小于重力，合力向下，小球加速；到达平衡位置时弹力等于重力，速度最大；之后弹力大于重力，合力向上，小球减速至零。故小球先加速后减速。",
    tags: ["newton's laws", "spring", "motion analysis"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "A tower crane lifts a building material of mass m vertically upward by height h with a steel cable; the acceleration is a and gravity is g. Which statement about the process is correct?",
    stemZh: "塔吊用钢缆将质量为 m 的建筑材料竖直向上提升高度 h，加速度为 a，重力加速度为 g，关于该过程说法正确的是",
    options: [
      "Work done by the cable tension is m(g + a)h",
      "Work done by gravity is mgh",
      "Work done by the net force is mgh",
      "Gravitational potential energy decreases by mgh",
    ],
    optionsZh: [
      "钢缆拉力做功为 m(g + a)h",
      "重力对建材做功为 mgh",
      "合外力对建材做功为 mgh",
      "建材重力势能减少 mgh",
    ],
    figure: "/figures/official/phy-apr-q45.png",
    correct: 0,
    explanation:
      "Newton's second law gives T − mg = ma, so T = m(g + a). The cable does work Th = m(g + a)h. Gravity does −mgh, the net work is mah, and the potential energy increases by mgh.",
    explanationZh:
      "由牛顿第二定律 T − mg = ma，得 T = m(g + a)，钢缆做功 Th = m(g + a)h。重力做功为 −mgh，合外力做功为 mah，重力势能增加 mgh。",
    tags: ["work", "power", "newton's laws"],
  },
  {
    topic: "P1.5",
    difficulty: "MEDIUM",
    stem: "A bicycle has a front chainwheel, rear sprocket and rear wheel of different radii. Which statement about points A, B and C on their edges is correct?",
    stemZh: "自行车有前牙盘、后飞轮、后轮，半径不同，边缘上 A、B、C 三点说法正确的是",
    options: [
      "Points B and C have the same linear speed.",
      "Points A and B have the same linear speed.",
      "Points A and C have the same linear speed.",
      "Points A and B have the same angular speed.",
    ],
    optionsZh: [
      "B、C 线速度相同",
      "A、B 线速度相同",
      "A、C 线速度相同",
      "A、B 角速度相同",
    ],
    figure: "/figures/official/phy-apr-q46.png",
    correct: 2,
    explanation:
      "The chain links the front chainwheel (A) and the rear sprocket (C), so their rim speeds are equal: vA = vC. The rear wheel (B) shares the axle with C, so ωB = ωC, but vB > vC because B is farther from the axle.",
    explanationZh:
      "链条连接前牙盘（A）和后飞轮（C），两者边缘线速度相等：vA = vC。后轮（B）与 C 同轴，角速度相同，但 B 半径更大，故 vB > vC。",
    tags: ["circular motion", "linear velocity"],
  },
  {
    topic: "P1.4",
    difficulty: "HARD",
    stem: "A car accelerates from initial speed v₀ on a straight road. After time t its displacement is s and it reaches maximum speed vm. The engine power is constant and resistance is constant f. The work done by the engine is",
    stemZh: "汽车在平直公路上从初速度 v₀ 开始加速，经时间 t 位移为 s，达到最大速度 vm。此过程发动机功率恒定，阻力恒为 f，发动机做功为",
    options: ["fvmt", "½ft(v₀ + vm)", "fs", "½mvm² − ½mv₀²"],
    optionsZh: ["fvmt", "½ft(v₀ + vm)", "fs", "½mvm² − ½mv₀²"],
    correct: 0,
    explanation:
      "At maximum speed the driving force equals resistance, so P = f·vm. With constant power, the work over time t is W = Pt = fvmt.",
    explanationZh:
      "达到最大速度时驱动力等于阻力，故 P = f·vm。功率恒定时，时间 t 内做功 W = Pt = fvmt。",
    tags: ["power", "work"],
  },
  {
    topic: "P1.1",
    difficulty: "HARD",
    stem: "A wind tunnel uses smoke particles to visualize airflow. A smoke particle follows a curved trajectory. Which statement is correct?",
    stemZh: "风洞实验室用烟雾颗粒显示气流，某烟雾颗粒轨迹为曲线，下列说法正确的是",
    options: [
      "The particle's velocity is constant.",
      "The particle must move with uniformly accelerated curvilinear motion.",
      "The acceleration at point P may be horizontally leftward.",
      "The net force at point Q may be vertically downward.",
    ],
    optionsZh: [
      "烟雾颗粒速度恒定",
      "烟雾颗粒一定做匀变速曲线运动",
      "P 点加速度方向可能水平向左",
      "Q 点合外力方向可能竖直向下",
    ],
    figure: "/figures/official/phy-apr-q48.png",
    correct: 3,
    explanation:
      "Curved motion means the velocity direction changes, so the velocity is not constant. The acceleration need not be constant. At Q the trajectory is nearly horizontal, and the centre of curvature can lie directly below Q, so the net force can point vertically downward (as under gravity).",
    explanationZh:
      "曲线运动中速度方向改变，速度不恒定；加速度也不一定恒定。Q 点轨迹接近水平，曲率中心可在 Q 的正下方，故合外力可能竖直向下（如仅受重力）。",
    tags: ["curvilinear motion", "acceleration"],
  },
];
