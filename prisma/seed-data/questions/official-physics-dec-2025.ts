import type { SeedQuestion } from "../types";

/**
 * Official CSCA Physics past paper — December 2025 sitting.
 *
 * 41 of the 48 questions are included. Five figure-based items whose diagrams
 * are not published in the free answer archive are omitted rather than shown
 * without their figures; the diagrams for Q13, Q17 and Q25 are included.
 */
export const officialPhysicsDec2025Questions: SeedQuestion[] = [
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "Which of the following physical quantities is not a vector? ()",
    stemZh: "下列物理量中，哪个不是矢量（ ）。",
    options: ["Magnetic flux density", "Momentum", "Electric field strength", "Potential energy"],
    optionsZh: ["磁感应强度", "动量", "电场强度", "势能"],
    correct: 3,
    explanation:
      "1 A vector has magnitude and direction; potential energy is a scalar quantity.",
    explanationZh:
      "矢量是既有大小又有方向的物理量，如磁感应强度、动量、电场强度都是矢量；势能只有大小没有方向，是标量。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "The gravitational force acting on an object on Mars is $1 / 3$ of the gravitational force acting on it on Earth. Therefore, the gravitational force acting on an object of mass $\\mathrm { m } = 4.8 \\mathrm {~kg}$ on Mars is ( ), ( $\\mathrm { g } = 10 \\mathrm { m } / \\mathrm { s } ^ { 2 }$ )",
    stemZh: "一个物体在火星上所受到的重力为它在地球上所受到重力的 $1/3$，则一个质量为 $m = 4.8 \\mathrm{~kg}$ 的物体在火星上所受到的重力为（），（$g = 10 \\mathrm{~m/s^2}$）",
    options: ["144 N", "24 N", "48 N", "16 N"],
    optionsZh: ["144 N", "24 N", "48 N", "16 N"],
    correct: 3,
    explanation:
      "1 Mars weight is one-third of Earth weight: $\\mathrm { W } = ( 1 / 3 ) \\mathrm { mg }$.\n2 Compute: $\\mathrm { W } = ( 1 / 3 ) \\times 4.8 \\mathrm {~kg} \\times 10 \\mathrm {~m} / \\mathrm { s } ^ { 2 } = 16 \\mathrm {~N}$.",
    explanationZh:
      "火星重力为地球重力的 $1/3$：$W = \\frac{1}{3}mg = \\frac{1}{3} \\times 4.8 \\times 10 = 16 \\mathrm{~N}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "A spring with elasticity constant $\\mathrm { k } = 100 \\mathrm {~N} / \\mathrm { m }$ is stretched from its original length of 10 cm to 15 cm under a force $F$. The magnitude of the force $F$ is ().",
    stemZh: "一根弹性系数 $\\mathrm { k } = 100 \\mathrm {~N} / \\mathrm { m }$ 的弹簧，在拉力 F 的作用下，长度由原来的 10 cm 伸长为 15 cm ，则拉力 F 的大小为（）。",
    options: ["5 N", "25 N", "10 N", "15 N"],
    optionsZh: ["5 N", "25 N", "10 N", "15 N"],
    correct: 0,
    explanation:
      "1 Use Hooke's law: F=k x.\n2 Extension $\\mathrm { x } = 15 \\mathrm {~cm} - 10 \\mathrm {~cm} = 5 \\mathrm {~cm} = 0.05 \\mathrm {~m}$.\n3 $F = 100 \\mathrm {~N} / \\mathrm { m } \\times 0.05 \\mathrm {~m} = 5 \\mathrm {~N}$.",
    explanationZh:
      "根据胡克定律 $F = k\\Delta x$，其中 $k=100\\,\\mathrm{N/m}$，伸长量 $\\Delta x = 15\\,\\mathrm{cm} - 10\\,\\mathrm{cm} = 5\\,\\mathrm{cm} = 0.05\\,\\mathrm{m}$，所以 $F = 100 \\times 0.05 = 5\\,\\mathrm{N}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "[Editorial revision] An object of mass $m = 4\\,\\mathrm{kg}$ rests on a horizontal surface. The coefficient of kinetic friction is $\\mu = 0.1$. After a horizontal pulling force of 2 N is applied, the object remains at rest. What is the magnitude of the frictional force on the object?",
    stemZh: "【编辑修订】质量为 $m = 4\\,\\mathrm{kg}$ 的物体静止在水平地面上，物体与地面之间的动摩擦因数为 $\\mu = 0.1$。对物体施加大小为 2 N 的水平拉力后，物体仍保持静止，则物体所受摩擦力的大小为（ ）。",
    options: ["2 N", "3 N", "4 N", "6 N"],
    optionsZh: ["$2 \\mathrm{~N}$", "$3 \\mathrm{~N}$", "$4 \\mathrm{~N}$", "$6 \\mathrm{~N}$"],
    correct: 0,
    explanation:
      "The object remains at rest, so the net horizontal force is zero. Static friction balances the 2 N pull and acts in the opposite direction. Its magnitude is 2 N, so A is correct. The kinetic friction coefficient does not determine the actual static friction. Editorial note: the original resting-object description conflicted with its kinetic-friction solution; this revision explicitly states that the object remains at rest after the force is applied.",
    explanationZh:
      "施力后物体仍静止，水平方向合力为零，因此静摩擦力与拉力等大反向，大小为 2 N，选 A。物体没有滑动，不能用动摩擦因数计算实际静摩擦力。编辑说明：原题的静止情境与所附滑动摩擦解析矛盾，本版明确“施力后仍静止”，并据此修订答案。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "An object is acted upon by three forces with magnitudes $F _ { 1 } = 2 N , F _ { 2 } = 4 N , F _ { 3 } = 6 N$. The maximum magnitude of the resultant force acting on the object is ( ).",
    stemZh: "一个物体，受到大小分别为 $F _ { 1 } = 2 N , F _ { 2 } = 4 N , F _ { 3 } = 6 N$ 的三个力的作用。则该物体所受合力的最大值为（）。",
    options: ["12 N", "0 N", "10 N", "24 N"],
    optionsZh: ["12 N", "0 N", "10 N", "24 N"],
    correct: 0,
    explanation:
      "1 The maximum resultant occurs when all forces act in the same direction.\n2 $F_{\\mathrm{max}} = 2 \\mathrm {~N} + 4 \\mathrm {~N} + 6 \\mathrm {~N} = 12 \\mathrm {~N}$.",
    explanationZh:
      "当三个力方向相同时，合力最大，最大值为 $2+4+6=12\\,\\mathrm{N}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "On a smooth horizontal surface, an object of mass $\\mathrm { m } = 2 \\mathrm {~kg}$ undergoes uniformly accelerated linear motion from rest under the action of a horizontal pulling force $F$. If its displacement within 2 seconds is 8 m , then the magnitude of the horizontal pulling force $F$ is ().",
    stemZh: "在光滑水平面上，有一个质量 $\\mathrm { m } = 2 \\mathrm {~kg}$ 的物体，它在水平拉力 F 的作用下，从静止开始做匀加速直线运动。若它在 2 s 内的位移是 8 m ，则水平拉力 F 的大小是 ( ) 。",
    options: ["10 N", "6 N", "8 N", "2 N"],
    optionsZh: ["10 N", "6 N", "8 N", "2 N"],
    correct: 2,
    explanation:
      "1 From rest with constant acceleration: $\\mathrm { s } = ( 1 / 2 )$ a $\\mathrm { t } ^ { 2 }$.\n2 $8 \\mathrm {~m} = 0.5 \\times \\mathrm { a } \\times ( 2 \\mathrm {~s} ) ^ { 2 } = 2 \\mathrm { a } = > \\mathrm { a } = 4 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$.\n3 $\\mathrm {~F} = \\mathrm { ma } = 2 \\mathrm {~kg} \\times 4 \\mathrm {~m} / \\mathrm { s } ^ { 2 } = 8 \\mathrm {~N}$.",
    explanationZh:
      "由运动学公式 $s = \\frac{1}{2}at^2$ 得 $a = \\frac{2s}{t^2} = \\frac{2\\times8}{2^2}=4\\,\\mathrm{m/s^2}$；再由牛顿第二定律 $F=ma=2\\times4=8\\,\\mathrm{N}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "An object on a smooth horizontal surface begins uniform accelerated linear motion from rest. If its acceleration is $a = 2 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$, then its velocity at the end of 4 seconds is ().",
    stemZh: "一个物体，在光滑水平面上，从静止开始做匀加速直线运动，若它的加速度是 $\\mathrm { a } = 2 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$ ，则它在 4 s 末的速度是（ ）。",
    options: ["$4 \\mathrm {~m} / \\mathrm { s }$", "$16 \\mathrm {~m} / \\mathrm { s }$", "$8 \\mathrm {~m} / \\mathrm { s }$", "$2 \\mathrm {~m} / \\mathrm { s }$"],
    optionsZh: ["$4 \\mathrm {~m} / \\mathrm { s }$", "$16 \\mathrm {~m} / \\mathrm { s }$", "$8 \\mathrm {~m} / \\mathrm { s }$", "$2 \\mathrm {~m} / \\mathrm { s }$"],
    correct: 2,
    explanation:
      "1 Uniform acceleration from rest: $\\mathrm { v } = \\mathrm { a } \\mathrm { t }$.\n2 $\\mathrm { v } = 2 \\mathrm {~m} / \\mathrm { s } ^ { 2 } \\times 4 \\mathrm {~s} = 8 \\mathrm {~m} / \\mathrm { s }$.",
    explanationZh:
      "由匀加速直线运动速度公式 $v = at$，代入 $a=2\\,\\mathrm{m/s^2}$，$t=4\\,\\mathrm{s}$，得 $v=2\\times4=8\\,\\mathrm{m/s}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "An object falls freely from a height of 100 m above the ground. At the end of 4 s, its height above the ground is ( ). ($g = 10\\,\\mathrm{m/s^2}$)",
    stemZh: "一个物体从离地面 100 m 的高空中自由落下，则 4 s 末它距离地面的高度为（）．（g＝ $10 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$ ）",
    options: ["45 m", "10 m", "80 m", "20 m"],
    optionsZh: ["45 m", "10 m", "80 m", "20 m"],
    correct: 3,
    explanation:
      "1 Free fall distance: $\\mathrm { s } = ( 1 / 2 ) \\mathrm { g } \\mathrm { t } ^ { 2 } = 0.5 \\times 10 \\times 4 ^ { 2 } = 80 \\mathrm {~m}$.\n2 Height remaining $= 100 \\mathrm {~m} - 80 \\mathrm {~m} = 20 \\mathrm {~m}$.",
    explanationZh:
      "自由落体位移 $h=\\frac{1}{2}gt^2=0.5\\times10\\times4^2=80$ m，距地高度 $100-80=20$ m。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "An object of mass $m = 5\\,\\mathrm{kg}$ is placed on a long, smooth inclined plane with an inclination angle $\\theta = 30^\\circ$. Starting from rest, the object slides down the plane. The distance traveled in 2 s is ( ). ($g = 10\\,\\mathrm{m/s^2}$)",
    stemZh: "一个质量 $\\mathrm { m } = 5 \\mathrm {~kg}$ 的物体放在倾角 $\\theta = 30 ^ { \\circ }$ 的长光滑斜面上，由静止开始下滑，则物体在 2 s 内通过的距离是（）。（ $\\mathrm { g } = 10 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$ ）",
    options: ["5 m", "1 m", "10 m", "2 m"],
    optionsZh: ["5 m", "1 m", "10 m", "2 m"],
    correct: 2,
    explanation:
      "1 Along a smooth incline: $\\mathrm { a } = \\mathrm { g } \\sin \\theta = 10 \\times \\sin 30 ^ { \\circ } = 5 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$.\n2 Distance in 2 s from rest: $\\mathrm { s } = 0.5 \\times 5 \\times 2 ^ { 2 } = 10 \\mathrm {~m}$.",
    explanationZh:
      "沿斜面方向加速度 $a = g \\sin\\theta = 10 \\times 0.5 = 5\\,\\mathrm{m/s^2}$，由 $s = \\frac{1}{2}at^2$ 得 $s = \\frac{1}{2} \\times 5 \\times 4 = 10\\,\\mathrm{m}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "Two forces acting on an object with a mass of 2 kg have magnitudes of 6 N and 8 N , respectively. The maximum acceleration of this object is ( ).",
    stemZh: "作用在一个质量为 2 kg 的物体上的两个力，大小分别为 6 N 和 8 N ，则这个物体的最大加速度是 。",
    options: ["$4 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$", "$7 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$", "$3 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$", "$5 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$"],
    optionsZh: ["$4 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$", "$7 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$", "$3 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$", "$5 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$"],
    correct: 1,
    explanation:
      "1 Maximum net force occurs when the two forces are in the same direction: $\\mathrm { F } _ { \\max } = 6 + 8 = 14 \\mathrm {~N}$.\n2 $a_{\\mathrm{max}} = \\mathrm { F } _ { \\max } / \\mathrm { m } = 14 / 2 = 7 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$.",
    explanationZh:
      "根据牛顿第二定律，加速度由合力决定。当两个力同向时合力最大为14N，因此最大加速度为14N/2kg=7m/s²。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.3",
    difficulty: "EASY",
    stem: "A straight conductor 0.5 m long is placed perpendicular to a uniform magnetic field. When a current of 10 A flows through it, the force exerted on the conductor is 1.5 N . The magnitude of the magnetic field's magnetic induction is ( )",
    stemZh: "匀强磁场中一根长 0.5 m 的直导线垂直于磁场方向放置，当通过 10 A 电流时，受到安培力的大小为 1.5 N ，则该磁场磁感应强度的大小为（）",
    options: ["0.3 T", "0.2 T", "0.1 T", "0.4 T"],
    optionsZh: ["0.3 T", "0.2 T", "0.1 T", "0.4 T"],
    correct: 0,
    explanation:
      "1 Magnetic force on a straight conductor: $\\mathrm { F } = \\mathrm { BIL } \\left( \\sin 90 ^ { \\circ } = 1 \\right)$.\n2 $\\mathrm {~B} = \\mathrm { F } / ( \\mathrm { IL } ) = 1.5 / \\left( 10 \\times 0.5 \\right) = 0.3 \\mathrm {~T}$.",
    explanationZh:
      "安培力公式 $F=BIL$，代入 $F=1.5\\,\\mathrm{N}$, $I=10\\,\\mathrm{A}$, $L=0.5\\,\\mathrm{m}$，得 $B=\\frac{F}{IL}=\\frac{1.5}{10\\times0.5}=0.3\\,\\mathrm{T}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "A point moves in uniform circular motion with a speed of $\\mathrm { v } = 6 \\mathrm {~m} \\cdot \\mathrm {~s} ^ { - 1 }$. The radius of the circular path is $R = 3 \\mathrm {~m}$. The angular velocity of the point is ().",
    stemZh: "一个点以速度 $\\mathrm { v } = 6 \\mathrm {~m} \\cdot \\mathrm {~s} ^ { - 1 }$ 做匀速圆周运动，圆周运动的半径 $\\mathrm { R } = 3 \\mathrm {~m}$ ，则它做圆周运动的角速度为（）。",
    options: ["$2 \\pi \\mathrm { rad } / \\mathrm { s }$", "$3 \\pi \\mathrm { rad } / \\mathrm { s }$", "$2 \\mathrm { rad } / \\mathrm { s }$", "$3 \\mathrm { rad } / \\mathrm { s }$"],
    optionsZh: ["$2 \\pi \\mathrm { rad } / \\mathrm { s }$", "$3 \\pi \\mathrm { rad } / \\mathrm { s }$", "$2 \\mathrm { rad } / \\mathrm { s }$", "$3 \\mathrm { rad } / \\mathrm { s }$"],
    correct: 2,
    explanation:
      "1 For uniform circular motion: $\\omega = v / R = 6 / 3 = 2 \\mathrm { rad } / \\mathrm { s }$.",
    explanationZh:
      "由角速度公式 ω = v / R，代入 v = 6 m/s，R = 3 m，得 ω = 2 rad/s。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "As shown in the figure, an object moves from point $A$ through point $B$ to point $C$ along two semicircles with radius $R = 6 \\mathrm {~m}$, taking a time of $t = 4 \\mathrm {~s}$. The magnitude of its average velocity is ().",
    stemZh: "如图所示，一个物体沿着半径为 $\\mathrm { R } = 6 \\mathrm {~m}$ 的两个半圆由 A 经过 B 运动到 C ，所用时间是 $\\mathrm { t } = 4 \\mathrm {~s}$ ，则它的平均速度的大小是（ ）。",
    options: ["$6 \\mathrm {~m} / \\mathrm { s }$", "$12 \\mathrm {~m} / \\mathrm { s }$", "$6 \\pi \\mathrm {~m} / \\mathrm { s }$", "$3 \\pi \\mathrm {~m} / \\mathrm { s }$"],
    optionsZh: ["$6 \\mathrm {~m} / \\mathrm { s }$", "$12 \\mathrm {~m} / \\mathrm { s }$", "$6 \\pi \\mathrm {~m} / \\mathrm { s }$", "$3 \\pi \\mathrm {~m} / \\mathrm { s }$"],
    figure: "/figures/official/phy-dec-q13.png",
    correct: 0,
    explanation:
      "1 Displacement is the straight line from A to C. The two semicircles each have diameter $2 R = 12 \\mathrm {~m}$, so the displacement is $x = 4 R = 24 \\mathrm {~m}$.\n2 Average velocity $= x / t = 24 \\mathrm {~m} / 4 \\mathrm {~s} = 6 \\mathrm {~m} / \\mathrm { s }$, option A.\n3 Note: the path length is $2 \\pi R = 12 \\pi \\mathrm {~m}$, so $3 \\pi \\mathrm {~m} / \\mathrm { s }$ (option D) is the average speed, not the average velocity.",
    explanationZh:
      "物体沿两个半径 $R = 6 \\mathrm {~m}$ 的半圆由 A 经 B 到 C，位移为从 A 指向 C 的有向线段，大小为两个直径之和：$x = 4 R = 24 \\mathrm {~m}$。平均速度大小为位移除以时间：$\\bar { v } = \\dfrac { x } { t } = \\dfrac { 24 \\mathrm {~m} } { 4 \\mathrm {~s} } = 6 \\mathrm {~m} / \\mathrm { s }$，选 A。（路程为 $2 \\pi R = 12 \\pi \\mathrm {~m}$，$12 \\pi / 4 = 3 \\pi \\mathrm {~m} / \\mathrm { s }$ 是平均速率，即选项 D 的干扰项。）",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "Which of the following statements about distance and displacement is correct?",
    stemZh: "下列关于路程和位移的说法中，正确的是（）。",
    options: ["Distance is a vector, displacement is a scalar.", "The magnitude of displacement is not necessarily equal to the magnitude of path length", "Both path and displacement are vectors", "The magnitude of displacement is always equal to the distance traveled."],
    optionsZh: ["路程是矢量，位移是标量", "位移大小与路程不一定相等", "路程和位移都是矢量", "位移大小与路程一定相等"],
    correct: 1,
    explanation:
      "Distance is a scalar and displacement is a vector, so A and C are false. Displacement magnitude is no greater than distance traveled. They are equal for motion along a straight line without reversal, but can differ otherwise. Therefore B is correct and D is false.",
    explanationZh:
      "路程是标量，位移是矢量，A、C 错误。位移大小不大于路程，在单向直线运动中两者相等，存在往返或曲线运动时两者可以不相等。因此 B 正确，D 错误。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.3",
    difficulty: "EASY",
    stem: "An object with mass $\\mathrm { m } = 0.2 \\mathrm {~kg}$ moves with constant velocity $\\mathrm { v } = 20 \\mathrm {~m} / \\mathrm { s }$ on a smooth horizontal surface. The magnitude of its momentum is ().",
    stemZh: "一个物体质量 $\\mathrm { m } = 0.2 \\mathrm {~kg}$ ，在光滑水平面上以速度 $\\mathrm { v } = 20 \\mathrm {~m} / \\mathrm { s }$ 做匀速直线运动，则它的动量大小是（）。",
    options: ["$0.8 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$", "$4 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$", "$0.4 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$", "$8 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$"],
    optionsZh: ["$0.8 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$", "$4 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$", "$0.4 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$", "$8 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$"],
    correct: 1,
    explanation:
      "1 Momentum $\\mathrm { p } = \\mathrm { m } \\mathrm { v } = 0.2 \\mathrm {~kg} \\times 20 \\mathrm {~m} / \\mathrm { s } = 4 \\mathrm {~kg} \\cdot \\mathrm {~m} / \\mathrm { s }$.",
    explanationZh:
      "动量定义为质量与速度的乘积，即 $p=mv=0.2\\times20=4\\,\\mathrm{kg\\cdot m/s}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.3",
    difficulty: "EASY",
    stem: "An object of mass $m = 5 \\mathrm {~kg}$ is placed on a smooth inclined plane with an angle $\\theta = 30 ^ { \\circ }$ and height 20 m . Starting from rest, the object slides down. The magnitude of the gravitational impulse experienced by the object within 2 s is ( ) . ( $\\mathrm { g } = 10 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$ )",
    stemZh: "一个质量 $\\mathrm { m } = 5 \\mathrm {~kg}$ 的物体放在倾角 $\\theta = 30 ^ { \\circ }$ ，高 20 m 的光滑斜面上，由静止开始下滑，则物体在 2 s 内受到的重力冲量大小是 ( ) 。 $\\left( \\mathrm { g } = 10 \\mathrm {~m} / \\mathrm { s } ^ { 2 } \\right)$",
    options: ["$50 \\mathrm {~N} \\cdot \\mathrm {~s}$", "$25 \\mathrm {~N} \\cdot \\mathrm {~s}$", "$200 \\mathrm {~N} \\cdot \\mathrm {~s}$", "$100 \\mathrm {~N} \\cdot \\mathrm {~s}$"],
    optionsZh: ["$50 \\mathrm {~N} \\cdot \\mathrm {~s}$", "$25 \\mathrm {~N} \\cdot \\mathrm {~s}$", "$200 \\mathrm {~N} \\cdot \\mathrm {~s}$", "$100 \\mathrm {~N} \\cdot \\mathrm {~s}$"],
    correct: 3,
    explanation:
      "1 Gravitational force is constant: $F_g = \\mathrm { mg } = 5 \\times 10 = 50 \\mathrm {~N}$.\n2 Impulse from gravity over $2 \\mathrm {~s} : \\mathrm { J } = \\mathrm { F } _ { \\mathrm { g } } \\Delta \\mathrm { t } = 50 \\times 2 = 100 \\mathrm {~N} \\cdot \\mathrm {~s}$.",
    explanationZh:
      "重力冲量等于重力乘以时间，与斜面无关。重力 $mg=50\\,\\text{N}$，时间 $2\\,\\text{s}$，冲量 $50 \\times 2 = 100\\,\\text{N}\\cdot\\text{s}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "The displacement x of a toy car moving along a straight line is plotted against time t in the figure. Which statement is correct?",
    stemZh: "玩具车沿直线运动的位移（ x ）随时间（ t ）变化的图像如图所示，下列说法正确的是 （）。",
    options: ["Between 0 and 4 s , the displacement of the toy car is 8 m", "From 4 s to 5 s , the magnitude of the toy car's velocity is $0.8 \\mathrm {~m} / \\mathrm { s }$", "From 0 s to 4 s , the magnitude of the toy car's velocity is $1.0 \\mathrm {~m} / \\mathrm { s }$", "From 0 to 5 seconds, the average velocity of the toy car is $0.8 \\mathrm {~m} / \\mathrm { s }$"],
    optionsZh: ["$0 \\sim 4 \\mathrm {~s}$ 内，玩具车运动的位移大小为 8 m", "$4 \\mathrm {~s} \\sim 5 \\mathrm {~s}$ 内，玩具车的速度大小为 $0.8 \\mathrm {~m} / \\mathrm { s }$", "$0 \\sim 4 \\mathrm {~s}$ 内，玩具车的速度大小为 $1.0 \\mathrm {~m} / \\mathrm { s }$", "$0 \\sim 5 \\mathrm{~s}$ 内,玩具车的平均速度大小为 $0.8 \\mathrm{~m/s}$"],
    figure: "/figures/official/phy-dec-q17.png",
    correct: 2,
    explanation:
      "From the x-t graph, displacement increases from 0 to 4 m over $0 - 4 \\mathrm {~s}$, so speed is slope $= 4 / 4 = 1.0 \\mathrm {~m} / \\mathrm { s }$. Other statements conflict with the graph (wrong displacement, wrong slope, or wrong average velocity).",
    explanationZh:
      "由位移—时间图像，0～4 s 内位移从 0 增至 4 m，速度为 4/4 = 1.0 m/s；4～5 s 内位移从 4 m 回到 0，速度为 (0−4)/(5−4) = −4 m/s，速度大小为 4 m/s。0～5 s 的总位移为 0，平均速度为 0。因此只有 C 正确。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "A horizontal pulling force F of 20 N is applied to an object of mass 10 kg . The object moves 5 m on a rough horizontal surface with a friction force $f = 5 \\mathrm {~N}$. The work done by the pulling force $F$ is ( ).",
    stemZh: "用 20 N 的水平拉力 F 拉着一个质量为 10 kg 的物体，在摩擦力 $\\mathrm { f } = 5 \\mathrm {~N}$ 的粗糙水平面上前进了 5 m ，则拉力 F 做的功为（）。",
    options: ["100 J", "75 J", "- 25 J", "25 J"],
    optionsZh: ["100 J", "75 J", "- 25 J", "25 J"],
    correct: 0,
    explanation:
      "1 Work by the pulling force: $W = F s \\cos 0 = 20 \\mathrm {~N} \\times 5 \\mathrm {~m} = 100 \\mathrm {~J}$.",
    explanationZh:
      "拉力F沿水平方向，与位移同向，故做功为 $W = Fs = 20 \\times 5 = 100 \\mathrm{~J}$。摩擦力做功不影响拉力做功的计算。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "A ball of mass $m = 3\\,\\mathrm{kg}$ moves on a smooth horizontal surface. An external force changes its speed from $v_0 = 2\\,\\mathrm{m/s}$ to $v = 6\\,\\mathrm{m/s}$. The work done by the external force is ( ).",
    stemZh: "在光滑水平面上有一个质量为 $m = 3 \\mathrm{~kg}$ 的小球，在外力的作用下，其速度从 $v_0 = 2 \\mathrm{~m/s}$ 变为 $v = 6 \\mathrm{~m/s}$，则外力做功为（  ）。",
    options: ["54 J", "60 J", "48 J", "6 J"],
    optionsZh: ["54 J", "60 J", "48 J", "6 J"],
    correct: 2,
    explanation:
      "1 Work-energy theorem: $\\mathrm { W } = \\Delta \\mathrm { K } = ( 1 / 2 ) \\mathrm { m } \\left( \\mathrm { v } 2 ^ { 2 } - \\mathrm { v } 1 ^ { 2 } \\right)$.\n2 $\\mathrm {~m} = 3 \\mathrm {~kg} , \\mathrm { v } 1 = 2 \\mathrm {~m} / \\mathrm { s } , \\mathrm { v } 2 = 6 \\mathrm {~m} / \\mathrm { s }$.\n3 $W = 0.5 \\times 3 \\times ( 36 - 4 ) = 1.5 \\times 32 = 48 \\mathrm {~J}$.",
    explanationZh:
      "由动能定理，外力做功等于动能变化：$W = \\Delta E_k = \\frac{1}{2}m(v^2 - v_0^2) = \\frac{1}{2} \\times 3 \\times (6^2 - 2^2) = \\frac{1}{2} \\times 3 \\times 32 = 48 \\mathrm{~J}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P4.1",
    difficulty: "MEDIUM",
    stem: "When light enters a medium from air, the angle of incidence $\\mathrm { i } = 60 ^ { \\circ }$ and the angle of refraction $\\mathrm { r } = 30 ^ { \\circ }$. If the refractive index of air is $n = 1$, then the refractive index of the medium is ( ).",
    stemZh: "光线从空气射入介质中时，入射角 $\\mathrm { i } = 60 ^ { \\circ }$ ，折射角 $\\mathrm { r } = 30 ^ { \\circ }$ ，若空气折射率 $\\mathrm { n } = 1$ ，则介质的折射率为（）。",
    options: ["$\\sqrt { 2 }$", "$\\sqrt { 3 }$", "$\\sqrt { 5 }$", "1.5"],
    optionsZh: ["$\\sqrt { 2 }$", "$\\sqrt { 3 }$", "$\\sqrt { 5 }$", "1.5"],
    correct: 1,
    explanation:
      "1 Snell's law: $n_1 \\sin i = n_2 \\sin r$.\n2 $1 \\times \\sin 60 ^ { \\circ } = \\mathrm { n } _ { 2 } \\times \\sin 30 ^ { \\circ } = > ( \\sqrt { 3 } / 2 ) = \\mathrm { n } _ { 2 } \\times ( 1 / 2 ) = > \\mathrm { n } _ { 2 } = \\sqrt { 3 }$.",
    explanationZh:
      "根据折射定律 $n_1 \\sin i = n_2 \\sin r$，代入 $n_1=1$，$i=60^\\circ$，$r=30^\\circ$，得 $1 \\cdot \\sin 60^\\circ = n_2 \\cdot \\sin 30^\\circ$，即 $\\frac{\\sqrt{3}}{2} = n_2 \\cdot \\frac{1}{2}$，解得 $n_2 = \\sqrt{3}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.6",
    difficulty: "MEDIUM",
    stem: "A spring-mass system undergoes simple harmonic motion. The time taken for one complete oscillation is 2 seconds. The frequency of this spring-mass system is ( ).",
    stemZh: "一个弹簧振子做简谐振动，它完成一次全振动的时间是 2 s ，那么这个弹簧振子的振动频率是（）。",
    options: ["2 Hz", "0.5 Hz", "0.2 Hz", "5 Hz"],
    optionsZh: ["2 Hz", "0.5 Hz", "0.2 Hz", "5 Hz"],
    correct: 1,
    explanation:
      "1 Frequency $\\mathrm { f } = 1 / \\mathrm { T } = 1 / 2 \\mathrm {~s} = 0.5 \\mathrm {~Hz}$.",
    explanationZh:
      "频率是周期的倒数，所以 $f = 1/T = 1/2 = 0.5$ Hz。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.6",
    difficulty: "MEDIUM",
    stem: "A sound wave with frequency $f = 200 \\mathrm {~Hz}$ propagates through air at a speed $\\mathrm { v } = 340 \\mathrm {~m} / \\mathrm { s }$. The wavelength of this sound wave is ( ).",
    stemZh: "一列频率 $\\mathrm { f } = 200 \\mathrm {~Hz}$ 的声波，以 $\\mathrm { v } = 340 \\mathrm {~m} / \\mathrm { s }$ 的速度在空气中传播，则这列声波的波长为（）．",
    options: ["1.7 m", "3.4 m", "6.8 m", "680 m"],
    optionsZh: ["1.7 m", "3.4 m", "6.8 m", "680 m"],
    correct: 0,
    explanation:
      "1 Wavelength $\\lambda = \\mathrm { v } / \\mathrm { f } = 340 / 200 = 1.7 \\mathrm {~m}$.",
    explanationZh:
      "波长λ与波速v和频率f的关系为v = λ f，因此λ = v / f = 340 / 200 = 1.7 m。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "In a vacuum, two point charges separated by a distance $d$ exert a mutual force of magnitude $F$. If the distance between the two point charges remains unchanged but the charge on one of them is doubled, the Coulomb force between them becomes approximately ( ) times the original force.",
    stemZh: "真空中，两个点电荷相距为 d ，相互作用力大小为 F 。若保持两个点电荷之间的距离不变，而只把其中一个电荷的带电量增大为原来的 2 倍，则它们之间的库仑力变为原来约（）。",
    options: ["2 times", "4 times", "$1 / 4$", "$1 / 2$"],
    optionsZh: ["2 倍", "4 倍", "$1 / 4$ 倍", "$1 / 2$ 倍"],
    correct: 0,
    explanation:
      "1 Coulomb force $\\mathrm { F } \\propto \\mathrm { q } 1 \\mathrm { q } 2 / \\mathrm { d } ^ { 2 }$. Doubling one charge doubles F.",
    explanationZh:
      "根据库仑定律 $F = k \\frac{q_1 q_2}{d^2}$，当其中一个电荷量增加为2倍时，其他条件不变，力变为原来的2倍。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "The magnitude of the velocity of a water droplet falling from a height of 5 m to the ground with an initial velocity of zero is ( $g = 10 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$ ) ( )",
    stemZh: "初速度为零的水滴从 5 m 高处落到地面的速度大小为 $\\left( g = 10 \\mathrm {~m} / \\mathrm { s } ^ { 2 } \\right) ( )$",
    options: ["$10 \\mathrm {~m} / \\mathrm { s }$", "$5 \\mathrm {~m} / \\mathrm { s }$", "$2 \\mathrm {~m} / \\mathrm { s }$", "$20 \\mathrm {~m} / \\mathrm { s }$"],
    optionsZh: ["$10 \\mathrm {~m} / \\mathrm { s }$", "$5 \\mathrm {~m} / \\mathrm { s }$", "$2 \\mathrm {~m} / \\mathrm { s }$", "$20 \\mathrm {~m} / \\mathrm { s }$"],
    correct: 0,
    explanation:
      "1 From rest: $\\mathrm { v } ^ { 2 } = 2 \\mathrm {~g} \\mathrm {~h} = 2 \\times 10 \\times 5 = 100 = > \\mathrm { v } = 10 \\mathrm {~m} / \\mathrm { s }$.",
    explanationZh:
      "使用自由落体公式 $v^2 = 2gh$，代入 $g=10\\,\\text{m/s}^2$ 和 $h=5\\,\\text{m}$，得 $v = \\sqrt{2 \\times 10 \\times 5} = 10\\,\\text{m/s}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "The electric field lines of an electric field are distributed as shown in the figure. If point charges $a$ and $b$ of equal charge are placed at points a and b in the field, the relationship between the electric forces exerted on the two point charges is ( ),",
    stemZh: "有一电场的电场线分布，如图所示。若在电场中 $\\mathrm { a } 、 \\mathrm {~b}$ 两点放置电量相等的点电荷 $\\mathrm { a } 、 \\mathrm {~b}$ ，则两点电荷所受到的电场力 $F _ { a } 、 F _ { b }$ 之间的关系为（），",
    options: ["$F _ { a } \\geq F _ { b }$", "$F _ { a } = F _ { b }$", "$F _ { a } < F _ { b }$", "$F _ { a } > F _ { b }$"],
    optionsZh: ["$F _ { a } \\geq F _ { b }$", "$F _ { a } = F _ { b }$", "$F _ { a } < F _ { b }$", "$F _ { a } > F _ { b }$"],
    figure: "/figures/official/phy-dec-q25.png",
    correct: 2,
    explanation:
      "1 Electric force on a test charge: $F = q E$.\n2 Field strength is larger where field lines are denser; point $b$ is in the denser region than point a (from the diagram).\n3 So $F_b$ > $F_a$, i.e., $F_a$<$F_b$.",
    explanationZh:
      "电场线密集的地方电场强度大，由图可知b点电场线密，故$E_b > E_a$。由F=Eq可知，电量相等时，$F_a < F_b$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.2",
    difficulty: "MEDIUM",
    stem: "The total resistance when two resistors of $200 \\Omega$ and $300 \\Omega$ are connected in parallel is ( ).",
    stemZh: "$200 \\Omega$ 和 $300 \\Omega$ 的两个电阻，并联后的总阻值为（ ）。",
    options: ["$500 \\Omega$", "$600 \\Omega$", "$100 \\Omega$", "$120 \\Omega$"],
    optionsZh: ["$500 \\Omega$", "$600 \\Omega$", "$100 \\Omega$", "$120 \\Omega$"],
    correct: 3,
    explanation:
      "1 Parallel resistors: $1 / \\mathrm { R } = 1 / 200 + 1 / 300 = ( 3 + 2 ) / 600 = 5 / 600$.\n2 $\\mathrm { R } = 600 / 5 = 120 \\Omega$.",
    explanationZh:
      "并联总电阻的倒数等于各电阻倒数之和：$\\frac{1}{R}=\\frac{1}{200}+\\frac{1}{300}=\\frac{5}{600}$，所以$R=120\\ \\Omega$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.2",
    difficulty: "MEDIUM",
    stem: "Two resistors, $R_1 = 40\\,\\Omega$ and $R_2 = 30\\,\\Omega$, are connected in parallel across a voltage $U = 12\\,\\mathrm{V}$. The ratio of the currents through them, $I_1:I_2$, is ( ).",
    stemZh: "有阻值分别为 $R _ { 1 } = 40 \\Omega$ 和 $R _ { 2 } = 30 \\Omega$ 的两个电阻，若把它们并联后，接入电压为 $U = 12 \\mathrm {~V}$ 的电路中，则通过 $R _ { 1 }$ 和 $R _ { 2 }$ 两电阻的电流比 $I _ { 1 } : I _ { 2 }$ 为（）",
    options: ["$1 : 1$", "$1 : 2$", "$4 : 3$", "$3 : 4$"],
    optionsZh: ["$1 : 1$", "$1 : 2$", "$4 : 3$", "$3 : 4$"],
    correct: 3,
    explanation:
      "1 In parallel, each resistor has the same voltage ( 12 V ).\n2 $\\mathrm { I } _ { 40 } = 12 / 40 = 0.3 \\mathrm {~A} , \\mathrm { I } _ { 30 } = 12 / 30 = 0.4 \\mathrm {~A}$.\n3 Ratio $\\mathrm { I } _ { 40 } : \\mathrm { I } _ { 30 } = 3 : 4$.",
    explanationZh:
      "并联电路中电压相同，电流与电阻成反比，因此 $I_1:I_2 = R_2:R_1 = 30:40 = 3:4$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P3.2",
    difficulty: "MEDIUM",
    stem: "For an ideal gas of constant mass, when the temperature remains unchanged and the pressure decreases, its volume ( )",
    stemZh: "一定质量的理想气体，温度不变，压强变小，那么它的体积（）",
    options: ["remains unchanged", "decrease", "All of the above are possible", "Increase"],
    optionsZh: ["不变", "变小", "以上答案都有可能", "变大"],
    correct: 3,
    explanation:
      "1 For an ideal gas at constant temperature (isothermal): $\\mathrm { PV } =$ constant.\n2 If pressure decreases, volume must increase.",
    explanationZh:
      "根据理想气体状态方程 $pV = nRT$，当温度 $T$ 不变且质量一定（即 $n$ 不变）时，压强 $p$ 与体积 $V$ 成反比。因此压强变小，体积变大。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.1",
    difficulty: "MEDIUM",
    stem: "A point charge $q = 3.0\\times10^{-9}\\,\\mathrm{C}$ is placed in an electric field of strength $E = 6.0\\times10^4\\,\\mathrm{N/C}$. The magnitude of the electric force on the charge is ( ).",
    stemZh: "一个电荷量为 $3.0 \\times 10^{-9} \\mathrm{C}$ 的点电荷置于场强为 $6.0 \\times 10^{4} \\mathrm{N/C}$ 的电场中，该点电荷所受电场力的大小为（ ）。",
    options: ["$1.8 \\times 10^{-4} \\mathrm{~N}$", "$2.0 \\times 10^{-4} \\mathrm{~N}$", "$1.8 \\times 10^{4} \\mathrm{~N}$", "$1.8 \\times 10^{-5} \\mathrm{~N}$"],
    optionsZh: ["$1.8 \\times 10^{-4} \\mathrm{~N}$", "$2.0 \\times 10^{-4} \\mathrm{~N}$", "$1.8 \\times 10^{4} \\mathrm{~N}$", "$1.8 \\times 10^{-5} \\mathrm{~N}$"],
    correct: 0,
    explanation:
      "1 Electric force: $F = q E$.\n2 $F = \\left( 3.0 \\times 10 ^ { - 9 } \\mathrm { C } \\right) \\left( 6.0 \\times 10 ^ { 4 } \\mathrm {~N} / \\mathrm { C } \\right) = 1.8 \\times 10 ^ { - 4 } \\mathrm {~N}$.",
    explanationZh:
      "1 电场力：$F = q E$。\n$2 F = \\left( 3.0 \\times 10^{-9} \\mathrm{C} \\right) \\left( 6.0 \\times 10^{4} \\mathrm{~N} / \\mathrm{C} \\right) = 1.8 \\times 10^{-4} \\mathrm{~N}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.3",
    difficulty: "MEDIUM",
    stem: "The international units for magnetic flux density $B$ and magnetic flux are respectively ( ).",
    stemZh: "磁感应强度 B 与磁通量的国际单位分别是（）。",
    options: ["Tesla, Weber", "Ampere, Volt", "Pascal, Hertz", "Joule, Watt"],
    optionsZh: ["特斯拉、韦伯", "安培、伏特", "帕斯卡、赫兹", "焦耳、瓦特"],
    correct: 0,
    explanation:
      "1 Magnetic flux density B has unit Tesla (T). Magnetic flux $\\Phi$ has unit Weber (Wb).",
    explanationZh:
      "磁感应强度B的国际单位是特斯拉（T），磁通量的国际单位是韦伯（Wb），因此选A。",
    tags: ["physics", "official"],
  },
  {
    topic: "P4.1",
    difficulty: "MEDIUM",
    stem: "[Editorial revision] A ray of light enters the interface between glass and air from air at an angle of incidence of $30 ^ { \\circ }$. The angle between the reflected ray and the incident ray is ( ).",
    stemZh: "【编辑修订】一束光线从空气中入射到玻璃与空气的分界面上，若入射角为 $30 ^ { \\circ }$ ，则反射光线与入射光线的夹角为（ ）。",
    options: ["$30 ^ { \\circ }$", "$45 ^ { \\circ }$", "$60 ^ { \\circ }$", "$90^\\circ$"],
    optionsZh: ["$30 ^ { \\circ }$", "$45 ^ { \\circ }$", "$60 ^ { \\circ }$", "$90^\\circ$"],
    correct: 2,
    explanation:
      "The angle of reflection equals the angle of incidence, 30 degrees. The incident and reflected rays lie on opposite sides of the normal, so the angle between them is 60 degrees. C is correct. Editorial note: the source had 60 degrees for both C and D. Option D has been rewritten as 90 degrees to provide a unique answer; it is an editorial distractor, not a recovered original option.",
    explanationZh:
      "反射角等于入射角，均为 30°，入射光线与反射光线分居法线两侧，夹角为 30°+30°=60°，选 C。编辑说明：原题 C、D 均为 60°，本版将 D 改为 90°，使题目具有唯一正确选项；90° 为编辑重写的干扰项，并非原稿恢复。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.3",
    difficulty: "MEDIUM",
    stem: "A wire of length $L = 0.2\\,\\mathrm{m}$ carries a steady current I in a uniform magnetic field $B = 0.8\\,\\mathrm{T}$. If the maximum magnetic force on the wire is $F = 0.08\\,\\mathrm{N}$, the current I is ( ).",
    stemZh: "一根导线长 $L = 0.2 \\mathrm {~m}$ ，通以恒定的电流 $I$ ，放在磁感应强度 $B = 0.8 \\mathrm {~T}$ 的匀强磁场中，若该导线在磁场中受到的最大安培力 $F = 0.08 \\mathrm {~N}$ ，则可知，通过导线的电流 $I$ 大小是 （）。",
    options: ["0.5 A", "5 A", "0.2 A", "2A"],
    optionsZh: ["0.5 A", "5A", "0.2 A", "2 A"],
    correct: 0,
    explanation:
      "1 Maximum magnetic force on a wire: $\\mathrm { F } = \\mathrm { B } \\mathrm { IL }$.\n2 $\\mathrm { I } = \\mathrm { F } / ( \\mathrm { B } \\mathrm { L } ) = 0.08 / ( 0.8 \\times 0.2 ) = 0.5 \\mathrm {~A}$.",
    explanationZh:
      "最大安培力由公式 $F = BIL$ 给出，代入 $B=0.8\\,\\mathrm{T}$, $L=0.2\\,\\mathrm{m}$, $F=0.08\\,\\mathrm{N}$，得 $I = \\frac{F}{BL} = \\frac{0.08}{0.8 \\times 0.2} = 0.5\\,\\mathrm{A}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P3.2",
    difficulty: "MEDIUM",
    stem: "An ideal gas of a certain mass undergoes an isobaric process (constant pressure) from state A to state B. Given that the volume of state A is $V _ { 1 } = 1.5 \\mathrm {~m} ^ { 3 }$ and its temperature is $T _ { 1 } = 300 \\mathrm {~K}$, while the temperature of state B is $T _ { 2 } = 400 \\mathrm {~K}$, the volume of state B is ( ).",
    stemZh: "一定质量的理想气体由状态 A 变为状态 $\\mathrm { B } , \\mathrm { A } \\rightarrow \\mathrm { B }$ 是等压过程（压强不变），已知状态 A 的体积 $V _ { 1 } = 1.5 \\mathrm {~m} ^ { 3 }$ ，温度 $T _ { 1 } = 300 \\mathrm {~K}$ ，状态 B 的温度 $T _ { 2 } = 400 \\mathrm {~K}$ ，则状态 B 的体积为",
    options: ["$1.5 \\mathrm {~m} ^ { 3 }$", "$4.5 m ^ { 3 }$", "$2 m ^ { 3 }$", "$6 m ^ { 3 }$"],
    optionsZh: ["$1.5 \\mathrm {~m} ^ { 3 }$", "$4.5 m ^ { 3 }$", "$2 m ^ { 3 }$", "$6 m ^ { 3 }$"],
    correct: 2,
    explanation:
      "For a fixed mass of ideal gas at constant pressure, $V_1/T_1 = V_2/T_2$. Thus $V_2 = 1.5\\times(400/300) = 2\\,\\mathrm{m^3}$ exactly. Option C is correct.",
    explanationZh:
      "等压过程遵循盖-吕萨克定律：V₁/T₁ = V₂/T₂，代入得 V₂ = V₁·T₂/T₁ = 1.5 × 400/300 = 2 m³。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.3",
    difficulty: "MEDIUM",
    stem: "A small ball with a mass of 20 kg collides with a stationary cart on a smooth horizontal surface at a speed of $6 \\mathrm {~m} / \\mathrm { s }$. Given that the cart has a mass of 40 kg , the combined speed of the ball and cart after the collision is ( ).",
    stemZh: "一个质量 $m = 20 \\mathrm {~kg}$ 的小球以 $v = 6 \\mathrm {~m} / \\mathrm { s }$ 的速度，撞上一辆静止在光滑水平面上的小车。已知小车的质量 $M = 40 \\mathrm {~kg}$ ，则小球撞上车后，小球和车的共同速度是（）。",
    options: ["$2 \\mathrm {~m} / \\mathrm { s }$", "$3 \\mathrm {~m} / \\mathrm { s }$", "$4 \\mathrm {~m} / \\mathrm { s }$", "$6 \\mathrm {~m} / \\mathrm { s }$"],
    optionsZh: ["$2 \\mathrm {~m} / \\mathrm { s }$", "$3 \\mathrm {~m} / \\mathrm { s }$", "$4 \\mathrm {~m} / \\mathrm { s }$", "$6 \\mathrm {~m} / \\mathrm { s }$"],
    correct: 0,
    explanation:
      "1 Perfectly inelastic collision (stick together): conserve momentum.\n2 $\\mathrm { v } = ( \\mathrm { m } 1 \\mathrm { v } 1 + \\mathrm { m } 2 \\mathrm { v } 2 ) / ( \\mathrm { m } 1 + \\mathrm { m } 2 ) = \\left( 20 \\times 6 + 40 \\times 0 \\right) / 60 = 2 \\mathrm {~m} / \\mathrm { s }$.",
    explanationZh:
      "根据动量守恒定律，初始动量 $p_i = m v = 20 \\times 6 = 120\\,\\mathrm{kg\\,m/s}$，最终共同速度 $v' = \\frac{m v}{m+M} = \\frac{120}{20+40} = 2\\,\\mathrm{m/s}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "Question: A basketball with mass $\\mathrm { m } = 0.5 \\mathrm {~kg}$ bounces from the ground to a height $\\mathrm { h } = 1 \\mathrm {~m}$ before falling back to the ground. The change in gravitational potential energy during this entire process is ( ). $\\left( \\mathrm { g } = 10 \\mathrm {~m} / \\mathrm { s } ^ { 2 } \\right)$",
    stemZh: "题目：质量为 $\\mathrm { m } = 0.5 \\mathrm {~kg}$ 的篮球，从地面弹起到 $\\mathrm { h } = 1 \\mathrm {~m}$ 高度后，又落到地面，在整个过程中，重力势能的变化为（）。（g＝ $10 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$ ）",
    options: ["10 J", "0.5 J", "5 J", "0 J"],
    optionsZh: ["10 J", "0.5 J", "5 J", "0 J"],
    correct: 3,
    explanation:
      "1 Initial and final positions are both on the ground, so gravitational potential energy change over the whole bounce cycle is $\\Delta \\mathrm { U } = 0$.\n2 Therefore the net change in gravitational potential energy is 0 J .",
    explanationZh:
      "重力势能的变化只与初末位置的高度差有关。篮球从地面弹起再落回地面，初末位置高度相同，因此重力势能变化为零。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.2",
    difficulty: "HARD",
    stem: "A thin rope is fixed at point O and supports a ball A of mass $m = 6\\,\\mathrm{kg}$. A horizontal pulling force holds the ball at rest with the rope at $30^\\circ$ to the vertical. The horizontal pulling force is ( ). ($g = 10\\,\\mathrm{m/s^2}$)",
    stemZh: "一根细绳一端固定在 O 点，另一端悬质量为 $\\mathrm { m } = 6 \\mathrm {~kg}$ 的小球 A ，若细绳与竖直方向成 $30 ^ { \\circ }$ 角，且小球 A 处于静止状态，则对小球 A 施加的水平拉力应为（ ） （ $\\mathrm { g } = 10 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$ ）",
    options: ["$10 \\sqrt { 3 } \\mathrm {~N}$", "12 N", "$20 \\sqrt { 3 } \\mathrm {~N}$", "20 N"],
    optionsZh: ["$10 \\sqrt { 3 } \\mathrm {~N}$", "12 N", "$20 \\sqrt { 3 } \\mathrm {~N}$", "20 N"],
    correct: 2,
    explanation:
      "1 At equilibrium: vertical component of tension balances weight: $\\mathrm { T } \\cos 30 ^ { \\circ } = \\mathrm { mg } = 6 \\times 10 = 60 \\mathrm {~N}$.\n2 $\\mathrm {~T} = 60 / \\cos 30 ^ { \\circ } = 60 / ( \\sqrt { 3 } / 2 ) = 40 \\sqrt { 3 } \\mathrm {~N}$.\n3 Horizontal pulling force equals $\\mathrm { T } \\sin 30 ^ { \\circ } = ( 40 \\sqrt { 3 } ) ( 1 / 2 ) = 20 \\sqrt { 3 } \\mathrm {~N}$.",
    explanationZh:
      "小球受三力平衡：重力 $mg$ 竖直向下，绳张力 $T$ 沿绳方向，水平拉力 $F$。将张力分解：$T\\cos 30° = mg$，$T\\sin 30° = F$，即 $F = mg \\tan 30° = 6 \\times 10 \\times \\frac{\\sqrt{3}}{3} = 20\\sqrt{3} \\mathrm{~N}$。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.1",
    difficulty: "HARD",
    stem: "[Editorial revision] Two fixed point charges in vacuum carry $+3.0\\times10^{-9}\\,\\mathrm{C}$ and $-3.0\\times10^{-9}\\,\\mathrm{C}$ and are separated by $r = 6\\,\\mathrm{cm}$. Given $k = 9.0\\times10^9\\,\\mathrm{N\\cdot m^2/C^2}$, what is the magnitude of the electric field at the midpoint of the line joining the charges?",
    stemZh: "【编辑修订】真空中两个固定点电荷的电荷量分别为 $+3.0\\times10^{-9}\\,\\mathrm{C}$ 和 $-3.0\\times10^{-9}\\,\\mathrm{C}$，两点电荷相距 $r = 6\\,\\mathrm{cm}$。已知静电力常量 $k = 9.0\\times10^9\\,\\mathrm{N\\cdot m^2/C^2}$，两点电荷连线中点处的电场强度大小为（ ）。",
    options: ["$1.5 \\times 10^{4} \\mathrm{~N/C}$", "$0 \\mathrm{~N/C}$", "$6.0 \\times 10^{4} \\mathrm{~N/C}$", "$3.0 \\times 10^{4} \\mathrm{~N/C}$"],
    optionsZh: ["$1.5 \\times 10 ^ { 4 } \\mathrm {~N} / \\mathrm { C }$", "$0 \\mathrm {~N} / \\mathrm { C }$", "$6.0 \\times 10 ^ { 4 } \\mathrm {~N} / \\mathrm { C }$", "$3.0 \\times 10 ^ { 4 } \\mathrm {~N} / \\mathrm { C }$"],
    correct: 2,
    explanation:
      "The midpoint is $d = r/2 = 0.03\\,\\mathrm{m}$ from each charge. Both fields point from the positive charge toward the negative charge, so their magnitudes add: $E = 2k|Q|/d^2 = 2\\times9.0\\times10^9\\times3.0\\times10^{-9}/0.03^2 = 6.0\\times10^4\\,\\mathrm{N/C}$. C is correct. Editorial note: the source stem was incomplete and its charge magnitude conflicted with the solution. This version reconstructs the point-charge model, charge magnitude and midpoint question used in the solution; it is not a recovery of the original wording.",
    explanationZh:
      "中点到每个点电荷的距离为 $d = r/2 = 0.03\\,\\mathrm{m}$。两电荷在中点产生的电场均沿正电荷指向负电荷，大小相加：$E = 2k|Q|/d^2 = 2\\times9.0\\times10^9\\times3.0\\times10^{-9}/0.03^2 = 6.0\\times10^4\\,\\mathrm{N/C}$，选 C。编辑说明：原题题干残损，源题目与解答的电荷量不一致；本版按解答所用模型明确点电荷、电荷量及中点所求量，属于编辑重构，并非原题原文恢复。",
    tags: ["physics", "official"],
  },
  {
    topic: "P1.5",
    difficulty: "HARD",
    stem: "As shown in the figure, two objects A and B of equal mass are placed on a horizontal disk rotating uniformly about a vertical axis. Both objects remain stationary relative to the disk. Then, the two objects ( ).",
    stemZh: "如图所示，质量相等的 $\\mathrm { A } 、 \\mathrm {~B}$ 两个物体，放在绕竖直轴匀速转动的水平圆盘上，两个物体始终相对于圆盘静止，则两个物体（）。",
    options: ["have the same angular velocity", "Object A has a greater angular velocity than object B", "A's angular velocity is less than B's angular velocity", "The same linear velocity"],
    optionsZh: ["角速度相同", "A 的角速度大于 B 的角速度", "A 的角速度小于 B 的角速度", "线速度相同"],
    correct: 0,
    explanation:
      "1 Objects fixed on the same rotating disk share the same angular velocity $\\omega$.\n2 Linear (tangential) speed $\\mathrm { v } = \\omega r$ differs if r differs, so only $\\omega$ must be the same.",
    explanationZh:
      "由于两个物体相对于圆盘静止，它们随圆盘一起转动，因此具有相同的角速度。线速度大小与半径有关，A、B半径不同，线速度不同。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.1",
    difficulty: "HARD",
    stem: "A point charge with a charge of $+ 4 \\times 10 ^ { - 6 } \\mathrm { C }$ is moved from point A to point B in an electric field. The electric force does negative work of $8 \\times 10 ^ { - 4 } \\mathrm {~J}$. The potential difference between points $A$ and $B$ is ( ).",
    stemZh: "有一带电荷量为 $+ 4 \\times 10 ^ { - 6 } \\mathrm { C }$ 的点电荷，将该点电荷从电场中的 A 点移到 B 点，电场力做负功为 $8 \\times 10 ^ { - 4 } \\mathrm {~J}$ ，则 AB 之间的电势差是（）。",
    options: ["- 200 V", "200 V", "- 2000 V", "2000 V"],
    optionsZh: ["- 200 V", "200 V", "- 2000 V", "2000 V"],
    correct: 0,
    explanation:
      "1 Work done by electric force: $W = q ( V A - V B )$.\n2 $\\mathrm { VA } - \\mathrm { VB } = \\mathrm { W } / \\mathrm { q } = \\left( - 8 \\times 10 ^ { - 4 } \\right) / \\left( 4 \\times 10 ^ { - 6 } \\right) = - 200 \\mathrm {~V}$.",
    explanationZh:
      "由电场力做功与电势差的关系 $W_{AB}=qU_{AB}$，得 $U_{AB}=\\frac{W_{AB}}{q}=\\frac{-8\\times10^{-4}}{4\\times10^{-6}}=-200\\,\\mathrm{V}$。负号表示A点电势低于B点。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.1",
    difficulty: "HARD",
    stem: "Identical conductors A and B, treated as point charges, carry charges $+8q$ and $-4q$ and are separated by a distance $r$. They are brought into contact and then returned to their original positions. The magnitude of the Coulomb force becomes what multiple of its original magnitude?",
    stemZh: "可以看成点电荷的导体 A 带 8 q 的正电荷，距离 A 为 r 的位置，有另一个完全相同的导体 B 带－ 4 q 的负电荷，若将 A 、 B 两导体接触后，再放回原来位置，则两个导体之间的库仑力变为原来的（）。",
    options: ["$\\frac{1}{4}$ times", "4 times", "8 times", "$\\frac{1}{8}$ times"],
    optionsZh: ["$\\frac { 1 } { 4 }$ 倍", "4 倍", "8 倍", "$\\frac { 1 } { 8 }$ 倍"],
    correct: 3,
    explanation:
      "1 Initial $\\mid F$ O $| = k | ( 8 q ) ( - 4 q ) \\mid / r ^ { 2 } = 32 k q ^ { 2 } / r ^ { 2 }$.\n2 After contact, total charge $= 8 q - 4 q = 4 q$; identical conductors share equally $= >$ each has $+ 2 q$.\n3 $| F 1 | = k ( 2 q ) ( 2 q ) / r ^ { 2 } = 4 k q ^ { 2 } / r ^ { 2 }$.\n4 Ratio $\\mathrm { F } 1 / \\mathrm { F } 0 = 4 / 32 = 1 / 8$.",
    explanationZh:
      "接触后电荷平均分配：A和B各带(8q + (-4q))/2 = 2q。库仑力与电荷乘积成正比，原乘积为8q*(-4q) = -32q²，新乘积为2q*2q = 4q²，所以新力大小为原来的4/32 = 1/8倍。",
    tags: ["physics", "official"],
  },
  {
    topic: "P2.1",
    difficulty: "HARD",
    stem: "As shown in the figure, a uniform electric field in the horizontal direction exists on a horizontal tabletop. A small object of mass $\\mathrm { m } = 0.1 \\mathrm {~kg}$ and charge $\\mathrm { Q } = - 2.0 \\times 10^{-5}\\,\\mathrm{C}$ is placed at point O on the tabletop and released from rest. Given that the sliding friction force between the object and the tabletop is $f = 0.2 \\mathrm {~N}$, and the electric force acting on the object is $F = 0.4 \\mathrm {~N}$ directed to the right.Then, the work done by the net external forces on the object within 2 seconds after release from rest is ( ).",
    stemZh: "如图所示，在水平桌面上有一个水平方向的匀强电场。将一个质量 $\\mathrm { m } = 0.1 \\mathrm {~kg}$ 带电量 $\\mathrm { Q } = - 2.0 \\times 10 ^ { - 5 } \\mathrm { C }$ 的小物体放在桌面 O 点，由静止释放，已知小物体与桌面之间的滑动摩擦力 $\\mathrm { f } = 0.2 \\mathrm {~N}$ ，所受的电场力为 $\\mathrm { F } = 0.4 \\mathrm {~N}$ 且方向向右。则小物体由静止释放后， 2 s 内合外力对小物体做的功是 。",
    options: ["3.2 J", "0.8 J", "2.4 J", "1.6 J"],
    optionsZh: ["3.2 J", "0.8 J", "2.4 J", "1.6 J"],
    correct: 1,
    explanation:
      "1 Net force: $F_{\\mathrm{net}} = 0.4 \\mathrm {~N} - 0.2 \\mathrm {~N} = 0.2 \\mathrm {~N}$ (to the right).\n2 Acceleration: $\\mathrm { a } = \\mathrm { F } _ { \\mathrm { net } } / \\mathrm { m } = 0.2 / 0.1 = 2 \\mathrm {~m} / \\mathrm { s } ^ { 2 }$.\n3 $\\Delta \\mathrm {~K}$ after $2 \\mathrm {~s} : \\mathrm { v } = \\mathrm { at } = 4 \\mathrm {~m} / \\mathrm { s } = > \\Delta \\mathrm { K } = ( 1 / 2 ) \\mathrm { m } \\mathrm { v } ^ { 2 } = 0.8 \\mathrm {~J}$.\n4 Work by net external force equals $\\Delta \\mathrm { K } = 0.8 \\mathrm {~J}$.",
    explanationZh:
      "合外力 $F_{\\text{net}} = F - f = 0.4\\,\\text{N} - 0.2\\,\\text{N} = 0.2\\,\\text{N}$，加速度 $a = F_{\\text{net}}/m = 0.2/0.1 = 2\\,\\text{m/s}^2$，2s内位移 $s = \\frac12 at^2 = \\frac12 \\cdot 2 \\cdot 4 = 4\\,\\text{m}$，功 $W = F_{\\text{net}} s = 0.2 \\times 4 = 0.8\\,\\text{J}$。",
    tags: ["physics", "official"],
  },
];
