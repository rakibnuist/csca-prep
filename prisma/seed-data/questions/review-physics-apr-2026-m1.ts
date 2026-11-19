import type { SeedQuestion } from "../types";

/**
 * April 2026 Physics sprint review — Module 1: Mechanics.
 *
 * Review sheet, not an official sitting. Three source items (Q4, Q9, Q17) have
 * multiple correct statements and are omitted; the remaining 17 are verified.
 */
export const officialPhysicsAprReviewM1Questions: SeedQuestion[] = [
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "Which group contains only vectors?",
    options: [
      "Displacement, time, speed",
      "Velocity, speed, acceleration",
      "Acceleration, change in velocity, force",
      "Distance, time, speed",
    ],
    correct: 2,
    explanation:
      "Acceleration, change in velocity and force all have magnitude and direction. Time and speed are scalars, so the other groups contain scalars.",
    explanationZh:
      "加速度、速度变化量和力都既有大小又有方向。时间和速率是标量，所以其余各组都含有标量。",
    tags: ["vectors", "mechanics", "review"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "An object moves with initial velocity 2 m/s and acceleration 1 m/s². Its velocity after 3 s is",
    options: ["2 m/s", "3 m/s", "5 m/s", "6 m/s"],
    correct: 2,
    explanation: "v = v₀ + at = 2 + 1 × 3 = 5 m/s.",
    explanationZh: "v = v₀ + at = 2 + 1 × 3 = 5 m/s。",
    tags: ["kinematics", "review"],
  },
  {
    topic: "P1.1",
    difficulty: "MEDIUM",
    stem: "An object falls from rest with g = 10 m/s². Its displacement during the second second is",
    options: ["5 m", "15 m", "20 m", "25 m"],
    correct: 1,
    explanation:
      "Displacement in the first 2 s is ½g(2²) = 20 m; in the first 1 s it is 5 m. The second second is 20 − 5 = 15 m.",
    explanationZh: "前 2 s 的位移为 ½g(2²) = 20 m；前 1 s 为 5 m。第 2 s 内为 20 − 5 = 15 m。",
    tags: ["free fall", "review"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "A spring with k = 200 N/m is compressed by 5 cm. The elastic force is",
    options: ["10 N", "1000 N", "40 N", "4000 N"],
    correct: 0,
    explanation: "F = kx = 200 × 0.05 = 10 N.",
    explanationZh: "F = kx = 200 × 0.05 = 10 N。",
    tags: ["Hooke's law", "review"],
  },
  {
    topic: "P1.2",
    difficulty: "MEDIUM",
    stem: "A 2 kg object at rest is pulled by 3 N on ground with μ = 0.2. The friction force is",
    options: ["4 N", "3 N", "2 N", "0 N"],
    correct: 1,
    explanation:
      "The maximum static friction is about μmg = 0.2 × 2 × 10 = 4 N. The applied force is only 3 N, so static friction balances it at 3 N.",
    explanationZh:
      "最大静摩擦力约为 μmg = 0.2 × 2 × 10 = 4 N。所加拉力仅为 3 N，故静摩擦力为 3 N 与之平衡。",
    tags: ["friction", "review"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "Forces F₁ = 3 N and F₂ = 8 N act on one object. Their resultant cannot be",
    options: ["5 N", "8 N", "11 N", "12 N"],
    correct: 3,
    explanation:
      "The resultant lies between |8 − 3| = 5 N and 8 + 3 = 11 N, so 12 N is impossible.",
    explanationZh: "合力介于 |8 − 3| = 5 N 与 8 + 3 = 11 N 之间，故 12 N 不可能。",
    tags: ["forces", "resultant", "review"],
  },
  {
    topic: "P1.2",
    difficulty: "EASY",
    stem: "A 5 kg object on a smooth horizontal surface is pulled by 10 N. Its acceleration is",
    options: ["0.5 m/s²", "2 m/s²", "5 m/s²", "50 m/s²"],
    correct: 1,
    explanation: "a = F/m = 10/5 = 2 m/s².",
    explanationZh: "a = F/m = 10/5 = 2 m/s²。",
    tags: ["Newton's second law", "review"],
  },
  {
    topic: "P1.1",
    difficulty: "EASY",
    stem: "A ball is thrown horizontally from height 5 m with v₀ = 10 m/s. Its time of flight is",
    options: ["1 s", "2 s", "√2 s", "0.5 s"],
    figure: "/figures/official/phy-review-m1-q10.png",
    correct: 0,
    explanation: "Vertical motion: h = ½gt², so 5 = 5t² and t = 1 s.",
    explanationZh: "竖直方向：h = ½gt²，故 5 = 5t²，t = 1 s。",
    tags: ["projectile motion", "review"],
  },
  {
    topic: "P1.5",
    difficulty: "EASY",
    stem: "A particle moves in a circle of radius 2 m with angular velocity 3 rad/s. Its linear speed is",
    options: ["1.5 m/s", "5 m/s", "6 m/s", "18 m/s"],
    correct: 2,
    explanation: "v = ωR = 3 × 2 = 6 m/s.",
    explanationZh: "v = ωR = 3 × 2 = 6 m/s。",
    tags: ["circular motion", "review"],
  },
  {
    topic: "P1.5",
    difficulty: "MEDIUM",
    stem: "A and B are fixed on a uniformly rotating disk, with r_A < r_B. Which statement is correct?",
    options: [
      "A has greater angular velocity than B",
      "B's linear speed equals A's",
      "A's centripetal acceleration is less than B's",
      "The centripetal force on A is greater than on B",
    ],
    figure: "/figures/official/phy-review-m1-q12.png",
    correct: 2,
    explanation:
      "Both have the same ω. Since a = ω²r and r_A < r_B, A's centripetal acceleration is smaller. Linear speed and force also scale with r.",
    explanationZh:
      "两者角速度 ω 相同。由 a = ω²r 且 r_A < r_B，A 的向心加速度更小。线速度和力也随 r 变化。",
    tags: ["circular motion", "review"],
  },
  {
    topic: "P1.4",
    difficulty: "EASY",
    stem: "A 10 N horizontal force moves an object 5 m in the direction of the force. The work done is",
    options: ["2 J", "15 J", "50 J", "0.5 J"],
    correct: 2,
    explanation: "W = Fs cos θ = 10 × 5 = 50 J.",
    explanationZh: "W = Fs cos θ = 10 × 5 = 50 J。",
    tags: ["work", "review"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "A 2 kg object on a smooth horizontal surface speeds up from 1 m/s to 3 m/s. The work done by the resultant force is",
    options: ["4 J", "8 J", "16 J", "32 J"],
    correct: 1,
    explanation:
      "By the work–energy theorem, W = ΔK = ½ × 2 × (3² − 1²) = 8 J.",
    explanationZh: "由动能定理，W = ΔK = ½ × 2 × (3² − 1²) = 8 J。",
    tags: ["work-energy theorem", "review"],
  },
  {
    topic: "P1.3",
    difficulty: "EASY",
    stem: "A 0.5 kg object moves at 4 m/s. The magnitude of its momentum is",
    options: ["1 kg·m/s", "2 kg·m/s", "4 kg·m/s", "8 kg·m/s"],
    correct: 1,
    explanation: "p = mv = 0.5 × 4 = 2 kg·m/s.",
    explanationZh: "p = mv = 0.5 × 4 = 2 kg·m/s。",
    tags: ["momentum", "review"],
  },
  {
    topic: "P1.3",
    difficulty: "MEDIUM",
    stem: "A 3 kg ball moving at 4 m/s collides head-on with a stationary 1 kg ball and they stick together. Their common velocity is",
    options: ["1 m/s", "2 m/s", "3 m/s", "4 m/s"],
    figure: "/figures/official/phy-review-m1-q16.png",
    correct: 2,
    explanation:
      "Momentum is conserved: 3 × 4 = (3 + 1)v, so v = 12/4 = 3 m/s.",
    explanationZh: "动量守恒：3 × 4 = (3 + 1)v，故 v = 12/4 = 3 m/s。",
    tags: ["momentum", "collisions", "review"],
  },
  {
    topic: "P1.6",
    difficulty: "EASY",
    stem: "A sound wave travels at 340 m/s with wavelength 1.7 m. Its frequency is",
    options: ["200 Hz", "100 Hz", "578 Hz", "0.005 Hz"],
    correct: 0,
    explanation: "f = v/λ = 340/1.7 = 200 Hz.",
    explanationZh: "f = v/λ = 340/1.7 = 200 Hz。",
    tags: ["waves", "review"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "A 1 kg object slides from rest down a smooth 30° incline of height 10 m. Its speed at the bottom is",
    options: ["10 m/s", "10√2 m/s", "20 m/s", "5√2 m/s"],
    figure: "/figures/official/phy-review-m1-q19.png",
    correct: 1,
    explanation:
      "Mechanical energy is conserved: ½mv² = mgh, so v = √(2gh) = √200 = 10√2 m/s.",
    explanationZh: "机械能守恒：½mv² = mgh，故 v = √(2gh) = √200 = 10√2 m/s。",
    tags: ["energy", "inclined plane", "review"],
  },
  {
    topic: "P1.4",
    difficulty: "MEDIUM",
    stem: "A small ball is released from rest from a 60° angle on a string of length L. Its speed at the lowest point is",
    options: ["√(gL)", "√(2gL)", "2√(gL)", "√(3gL)"],
    figure: "/figures/official/phy-review-m1-q20.png",
    correct: 0,
    explanation:
      "The height fallen is L(1 − cos 60°) = L/2. Then ½mv² = mg(L/2), so v = √(gL).",
    explanationZh: "下落高度为 L(1 − cos 60°) = L/2。于是 ½mv² = mg(L/2)，故 v = √(gL)。",
    tags: ["energy", "pendulum", "review"],
  },
];
