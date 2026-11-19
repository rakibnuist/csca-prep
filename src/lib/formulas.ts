import type { SubjectCode } from "@/lib/exam";

export type FormulaCard = {
  code: string;
  subjectCode: SubjectCode;
  topicCode: string;
  unitEn: string;
  unitZh: string;
  titleEn: string;
  titleZh: string;
  formula: string;
  summaryEn: string;
  summaryZh: string;
  trapEn: string;
  trapZh: string;
};

export const FORMULAS: FormulaCard[] = [
  /* ── Mathematics ─────────────────────────────────────────────── */
  {
    code: "F-M1",
    subjectCode: "MATH",
    topicCode: "M1.1",
    unitEn: "Sets and Inequalities",
    unitZh: "集合与不等式",
    titleEn: "Subset Count & Empty Set",
    titleZh: "子集个数与空集讨论",
    formula: "$\\text{Subsets of an } n\\text{-element set} = 2^n, \\quad \\text{Proper subsets} = 2^n - 1$",
    summaryEn:
      "Every finite set $A$ with $|A|=n$ has $2^n$ subsets and $2^n - 1$ non-empty subsets or proper subsets.",
    summaryZh: "含 $n$ 个元素的有限集合共有 $2^n$ 个子集，$2^n - 1$ 个真子集（或非空子集）。",
    trapEn:
      "When solving $B \\subseteq A$ with a parameter $m$, always test the case $B = \\varnothing$ first — missing the empty set drops points on 1 in 3 set problems.",
    trapZh: "含参数求解 $B \\subseteq A$ 时务必优先讨论 $B = \\varnothing$，漏掉空集是最高频失分点。",
  },
  {
    code: "F-M2",
    subjectCode: "MATH",
    topicCode: "M1.2",
    unitEn: "Sets and Inequalities",
    unitZh: "集合与不等式",
    titleEn: "AM–GM Inequality & Equality Condition",
    titleZh: "基本不等式与取等条件",
    formula: "$\\frac{a+b}{2} \\ge \\sqrt{ab} \\quad (a>0,\\; b>0), \\quad \\text{equality iff } a=b$",
    summaryEn:
      "Used to bound $x + \\frac{k}{x}$ or maximize products when sum is constant and factors are strictly positive.",
    summaryZh: "求 $x + \\frac{k}{x}$ 最小值或“和定积最大”时使用，要求各项严格为正。",
    trapEn:
      "Verify all three conditions: positive terms, constant product/sum, and whether $a=b$ lies inside the allowed domain.",
    trapZh: "严格检查“一正、二定、三相等”，尤其确认等号成立时自变量是否在定义域内。",
  },
  {
    code: "F-M3",
    subjectCode: "MATH",
    topicCode: "M2.1",
    unitEn: "Functions",
    unitZh: "函数",
    titleEn: "Function Symmetry & Periodicity",
    titleZh: "函数的奇偶性与周期性",
    formula: "$f(-x)=-f(x) \\;(\\text{odd}), \\quad f(a+x)=f(a-x) \\implies x=a, \\quad f(x+T)=f(x)$",
    summaryEn:
      "If $f(x)$ is odd and defined at $x=0$, then $f(0)=0$. Combining two symmetries yields a period $T$.",
    summaryZh: "奇函数在 $x=0$ 有定义时必有 $f(0)=0$；双重对称性通常能推出周期 $T$。",
    trapEn:
      "Always check whether the domain is symmetric about the origin before calling $f(x)$ even or odd.",
    trapZh: "判断奇偶性前必须先验证定义域是否关于原点对称，定义域不对称直接非奇非偶。",
  },
  {
    code: "F-M4",
    subjectCode: "MATH",
    topicCode: "M2.2",
    unitEn: "Functions",
    unitZh: "函数",
    titleEn: "Logarithm Base Change & Domain",
    titleZh: "对数换底公式与真数范围",
    formula: "$\\log_a b = \\frac{\\ln b}{\\ln a}, \\quad a^{\\log_a N} = N \\quad (a>0, a\\ne 1, N>0)$",
    summaryEn:
      "Converts arbitrary log bases to natural or base-10 logs and simplifies exponential-logarithmic equations.",
    summaryZh: "将任意底对数转为常用对数或自然对数，常用于解对数方程与比较大小。",
    trapEn:
      "Reject extraneous roots where the log argument $\\le 0$ or base $=1$ after squaring or combining logs.",
    trapZh: "合并或去对数符号求出的解必须回代检验真数 $>0$ 且底数 $>0,\\ne 1$。",
  },
  {
    code: "F-M5",
    subjectCode: "MATH",
    topicCode: "M2.3",
    unitEn: "Functions",
    unitZh: "函数",
    titleEn: "Arithmetic & Geometric Sums",
    titleZh: "等差与等比数列前 n 项和",
    formula: "$S_n^{\\text{AP}} = \\frac{n(a_1+a_n)}{2}, \\qquad S_n^{\\text{GP}} = \\frac{a_1(1-q^n)}{1-q} \\; (q\\ne 1)$",
    summaryEn:
      "Links term ratios, mid-term properties ($a_m + a_p = a_r + a_s$), and partial sum sequences.",
    summaryZh: "用于求解通项与前 $n$ 项和，配合角标和性质 $m+p=r+s$ 可大幅提速。",
    trapEn:
      "In a geometric sequence with unknown common ratio $q$, always check $q=1$ separately before applying $\\frac{a_1(1-q^n)}{1-q}$.",
    trapZh: "等比数列求和若公比 $q$ 含参数，必须先单独验证 $q=1$（此时 $S_n=n a_1$）。",
  },
  {
    code: "F-M6",
    subjectCode: "MATH",
    topicCode: "M2.4",
    unitEn: "Functions",
    unitZh: "函数",
    titleEn: "Tangent Line & Extrema via Derivative",
    titleZh: "导数切线方程与极值判别",
    formula: "$y - f(x_0) = f'(x_0)(x - x_0), \\qquad f'(x_0)=0 \\text{ with sign change} \\implies \\text{extremum}$",
    summaryEn:
      "First derivative gives tangent slope and monotonicity intervals; sign change across $f'(x_0)=0$ confirms a local maximum or minimum.",
    summaryZh: "一阶导数确定切线斜率与单调区间，且导数在零点两侧变号才是极值点。",
    trapEn:
      "Distinguish 'tangent AT point $(x_0, y_0)$' (on the curve) from 'tangent THROUGH point $P$' (solve for tangency point $x_0$).",
    trapZh: "区分“在点处切线”（该点即切点）与“过点引切线”（需设切点坐标 $x_0$ 列方程）。",
  },
  {
    code: "F-M7",
    subjectCode: "MATH",
    topicCode: "M3.1",
    unitEn: "Geometry and Algebra",
    unitZh: "几何与代数",
    titleEn: "Point-to-Line Distance & Conic Eccentricity",
    titleZh: "点到直线距离与圆锥曲线离心率",
    formula: "$d = \\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}, \\qquad e = \\frac{c}{a} \\; (0<e<1 \\text{ ellipse},\\; e>1 \\text{ hyperbola})$",
    summaryEn:
      "Core tool for circle–line tangency ($d=r$) and focal triangle properties of ellipses ($a^2=b^2+c^2$) vs hyperbolas ($c^2=a^2+b^2$).",
    summaryZh: "圆与直线相切判定核心公式，以及椭圆 $a^2=b^2+c^2$、双曲线 $c^2=a^2+b^2$ 离心率关系。",
    trapEn:
      "Check which coordinate term carries $a^2$ in an ellipse before deciding whether foci lie on the $x$-axis or $y$-axis.",
    trapZh: "写椭圆标准方程前先比较 $x^2, y^2$ 分母大小，再判断焦点落在哪条坐标轴。",
  },
  {
    code: "F-M8",
    subjectCode: "MATH",
    topicCode: "M3.2",
    unitEn: "Geometry and Algebra",
    unitZh: "几何与代数",
    titleEn: "Dot Product, Parallel & Orthogonal Vectors",
    titleZh: "平面向量的共线与垂直条件",
    formula: "$\\vec{a}\\cdot\\vec{b} = x_1x_2+y_1y_2 = |\\vec{a}||\\vec{b}|\\cos\\theta; \\quad \\perp \\iff x_1x_2+y_1y_2=0$",
    summaryEn:
      "Finds vector projections, angles between vectors, and orthogonality conditions immediately in coordinates.",
    summaryZh: "快速求向量夹角、模长、投影及正交垂直关系。",
    trapEn:
      "Parallel is $x_1y_2 - x_2y_1 = 0$, whereas perpendicular is $x_1x_2 + y_1y_2 = 0$; never mix the two cross-terms.",
    trapZh: "共线条件是交叉相乘差为零 $x_1y_2-x_2y_1=0$，垂直才是对应相乘和为零，切勿混用。",
  },
  {
    code: "F-M9",
    subjectCode: "MATH",
    topicCode: "M4.1",
    unitEn: "Probability and Statistics",
    unitZh: "概率与统计",
    titleEn: "Conditional & Complementary Probability",
    titleZh: "条件概率与对立事件",
    formula: "$P(B\\mid A) = \\frac{P(AB)}{P(A)}, \\qquad P(\\text{at least one}) = 1 - P(\\text{none})$",
    summaryEn:
      "Reduces sample space to event $A$, or replaces complex multi-case counting with the single complement event.",
    summaryZh: "“至少一个”优先用正难则反 $1 - P(\\text{全不})$，条件概率直接缩小样本空间。",
    trapEn:
      "For 'with replacement' vs 'without replacement', check whether trials stay independent before multiplying probabilities.",
    trapZh: "先确认题干是“放回抽样”还是“不放回抽样”，再决定事件是否独立。",
  },

  /* ── Physics ─────────────────────────────────────────────────── */
  {
    code: "F-P1",
    subjectCode: "PHYS",
    topicCode: "P1.1",
    unitEn: "Mechanics",
    unitZh: "力学",
    titleEn: "Constant-Acceleration Kinematics",
    titleZh: "匀变速直线运动核心公式",
    formula: "$v = v_0 + at, \\quad x = v_0t + \\frac{1}{2}at^2, \\quad v^2 - v_0^2 = 2ax$",
    summaryEn:
      "Relates initial velocity, acceleration, displacement, and time; pick $v^2-v_0^2=2ax$ whenever time $t$ is absent.",
    summaryZh: "描述初速度、加速度、位移与时间的关系；题中不涉及时间 $t$ 时优先选 $v^2-v_0^2=2ax$。",
    trapEn:
      "In braking problems, compute stopping time $t_{\\text{stop}} = v_0/|a|$ first so you do not substitute $t > t_{\\text{stop}}$ and get backward motion.",
    trapZh: "汽车刹车问题务必先算停车时间 $t_0=v_0/|a|$，避免代错时间算出车辆倒车。",
  },
  {
    code: "F-P2",
    subjectCode: "PHYS",
    topicCode: "P1.2",
    unitEn: "Mechanics",
    unitZh: "力学",
    titleEn: "Newton's Second Law & Static Friction",
    titleZh: "牛顿第二定律与静摩擦力上限",
    formula: "$F_{\\text{net}} = ma, \\qquad f_{\\text{kinetic}} = \\mu N, \\qquad 0 \\le f_{\\text{static}} \\le f_{\\max}$",
    summaryEn:
      "Always decompose forces along the direction of acceleration and normal to it after drawing a clean free-body diagram.",
    summaryZh: "正交分解应沿加速度方向建轴，并区分静摩擦力（平衡求）与滑动摩擦力（公式求）。",
    trapEn:
      "Do not plug $f = \\mu N$ if the block is still at rest under static equilibrium — static friction equals the driving component up to $\\mu_s N$.",
    trapZh: "物体静止时摩擦力是静摩擦，不能直接套用 $f=\\mu N$，需由受力平衡求出。",
  },
  {
    code: "F-P3",
    subjectCode: "PHYS",
    topicCode: "P1.3",
    unitEn: "Mechanics",
    unitZh: "力学",
    titleEn: "Impulse–Momentum & Collisions",
    titleZh: "动量定理与碰撞守恒",
    formula: "$\\vec{F}\\Delta t = m\\vec{v}_2 - m\\vec{v}_1, \\qquad m_1v_1 + m_2v_2 = m_1v_1' + m_2v_2'$",
    summaryEn:
      "Momentum is conserved whenever net external force along that axis is zero, even during inelastic collisions that lose kinetic energy.",
    summaryZh: "系统合外力为零（或某方向合外力为零）时动量守恒，即使是非弹性碰撞也成立。",
    trapEn:
      "Momentum is a vector: choose a positive direction and include negative signs for rebound velocities before subtracting.",
    trapZh: "动量是矢量，反弹后速度必须带负号代入 $\\Delta p = m(v_2 - v_1)$。",
  },
  {
    code: "F-P4",
    subjectCode: "PHYS",
    topicCode: "P1.4",
    unitEn: "Mechanics",
    unitZh: "力学",
    titleEn: "Work–Energy Theorem",
    titleZh: "动能定理",
    formula: "$W_{\\text{total}} = \\Delta E_k = \\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2$",
    summaryEn:
      "Works equally well for curved paths, variable forces, and friction where mechanical energy is not conserved.",
    summaryZh: "适用于曲线运动、变力做功及含摩擦力过程，重点只关注初末动能与总功。",
    trapEn:
      "Include gravity's work $-mgh$ OR potential energy change $\\Delta E_p$, never double-count both.",
    trapZh: "应用功能关系时，重力做功与重力势能变化只能计入一次，切忌重复计算。",
  },
  {
    code: "F-P5",
    subjectCode: "PHYS",
    topicCode: "P1.5",
    unitEn: "Mechanics",
    unitZh: "力学",
    titleEn: "Centripetal Force & Orbital Speed",
    titleZh: "向心力与卫星环绕公式",
    formula: "$F_c = m\\frac{v^2}{r} = m\\omega^2 r, \\qquad G\\frac{Mm}{r^2} = m\\frac{v^2}{r} \\implies v = \\sqrt{\\frac{GM}{r}}$",
    summaryEn:
      "Higher orbits mean larger period $T \\propto r^{3/2}$ and lower orbital speed $v \\propto r^{-1/2}$ and angular speed $\\omega \\propto r^{-3/2}$.",
    summaryZh: "“高轨低速大周期”：轨道半径 $r$ 越大，线速度、角速度、向心加速度越小，周期越大。",
    trapEn:
      "Use the total orbital radius $r = R_{\\text{Earth}} + h$, not altitude $h$ alone.",
    trapZh: "卫星半径 $r$ 是地心距离 $R+h$，题目只给离地高度 $h$ 时切记加上地球半径 $R$。",
  },
  {
    code: "F-P6",
    subjectCode: "PHYS",
    topicCode: "P2.2",
    unitEn: "Electromagnetism",
    unitZh: "电磁学",
    titleEn: "Closed-Circuit Ohm's Law & Max Power",
    titleZh: "闭合电路欧姆定律与最大输出功率",
    formula: "$I = \\frac{E}{R+r}, \\qquad U = E - Ir, \\qquad P_{\\text{out,max}} = \\frac{E^2}{4r} \\text{ when } R=r$",
    summaryEn:
      "Tracks terminal voltage drop as external resistance changes and finds maximum power transferred to the load.",
    summaryZh: "描述端电压随外电阻变化规律；外电阻等于电源内阻 $R=r$ 时电源输出功率最大。",
    trapEn:
      "Terminal voltage $U$ drops when external resistance $R$ decreases because more current flows across internal resistance $r$.",
    trapZh: "外电阻变小时总电流增大、内压 $Ir$ 升高，故路端电压 $U=E-Ir$ 反而减小。",
  },
  {
    code: "F-P7",
    subjectCode: "PHYS",
    topicCode: "P2.3",
    unitEn: "Electromagnetism",
    unitZh: "电磁学",
    titleEn: "Charged Particle in Magnetic Field",
    titleZh: "带电粒子在匀强磁场中的圆周运动",
    formula: "$qvB = m\\frac{v^2}{r} \\implies r = \\frac{mv}{qB}, \\qquad T = \\frac{2\\pi m}{qB}$",
    summaryEn:
      "Notice the cyclotron period $T$ is independent of both speed $v$ and radius $r$, and magnetic force does zero work.",
    summaryZh: "周期 $T$ 与速率 $v$ 和半径 $r$ 无关；洛伦兹力始终与速度垂直，永不做功。",
    trapEn:
      "Apply the left-hand rule for a positive charge, and flip the force direction for electrons ($q < 0$).",
    trapZh: "左手定则四指指向正电荷运动方向；若是电子或负离子，运动方向相反或受力反向。",
  },
  {
    code: "F-P8",
    subjectCode: "PHYS",
    topicCode: "P3.2",
    unitEn: "Thermodynamics",
    unitZh: "热学",
    titleEn: "Ideal Gas State & First Law",
    titleZh: "理想气体状态方程与热力学第一定律",
    formula: "$\\frac{pV}{T} = nR, \\qquad \\Delta U = Q + W \\quad (T \\text{ in Kelvin})$",
    summaryEn:
      "For an ideal gas, internal energy $U$ depends solely on absolute temperature $T$; isothermal implies $\\Delta U = 0$.",
    summaryZh: "理想气体内能只由温度 $T$ 决定（等温过程 $\\Delta U=0$），外界做功为正。",
    trapEn:
      "Always convert Celsius to Kelvin ($T = t + 273.15\\,\\text{K}$) before taking gas pressure or volume ratios.",
    trapZh: "所有气体压强体积比值计算必须先把摄氏温度换算为开尔文 $T=t+273.15$。",
  },

  /* ── Chemistry ───────────────────────────────────────────────── */
  {
    code: "F-C1",
    subjectCode: "CHEM",
    topicCode: "C1.4",
    unitEn: "Basic Concepts and Calculations",
    unitZh: "基本概念与计算",
    titleEn: "Mole Conversions & Molar Volume",
    titleZh: "物质的量与气体摩尔体积",
    formula: "$n = \\frac{m}{M} = \\frac{N}{N_A} = \\frac{V_{\\text{gas}}}{V_m} \\quad (V_m = 22.4\\,\\text{L/mol at STP})$",
    summaryEn:
      "Central bridge between mass, particle count, solution volume ($n=cV$), and gas volume under standard temperature and pressure ($0^\\circ\\text{C}, 101\\,\\text{kPa}$).",
    summaryZh: "连接质量、微粒数、溶液体积（$n=cV$）与标况气体体积的换算核心。",
    trapEn:
      "$22.4\\,\\text{L/mol}$ holds ONLY for gases at $0^\\circ\\text{C}, 101\\,\\text{kPa}$ (STP) — never for water, ethanol, or $\\text{SO}_3$ at $0^\\circ\\text{C}$ (liquids/solids) or at $25^\\circ\\text{C}$.",
    trapZh: "$22.4\\,\\text{L/mol}$ 仅适用于标况（$0^\\circ\\text{C},101\\,\\text{kPa}$）下的气体；水、乙醇、标况下的 $\\text{SO}_3$ 均为非气态！",
  },
  {
    code: "F-C2",
    subjectCode: "CHEM",
    topicCode: "C1.3",
    unitEn: "Basic Concepts and Calculations",
    unitZh: "基本概念与计算",
    titleEn: "Molarity, Mass Fraction & pH",
    titleZh: "溶液浓度换算与 pH 计算",
    formula: "$c = \\frac{1000\\rho\\omega}{M}, \\qquad c_1V_1 = c_2V_2, \\qquad \\text{pH} = -\\lg c(\\text{H}^+)$",
    summaryEn:
      "Converts density $\\rho\\,(\\text{g/mL})$ and mass fraction $\\omega$ directly to molarity $c\\,(\\text{mol/L})$.",
    summaryZh: "由密度 $\\rho\\,(\\text{g/cm}^3)$ 与质量分数 $\\omega$ 直接换算物质的量浓度。",
    trapEn:
      "When diluting a strong acid or base, remember the final total solution volume is not always $V_1+V_2$ if densities differ, and pH cannot cross $7$ on water dilution.",
    trapZh: "强酸无限稀释后 pH 无限趋近 $7$ 而不能大于 $7$，且不同密度溶液混合后体积不可直接相加。",
  },
  {
    code: "F-C3",
    subjectCode: "CHEM",
    topicCode: "C2.3",
    unitEn: "Substance Properties and Reactions",
    unitZh: "物质性质与反应",
    titleEn: "Redox Electron Conservation",
    titleZh: "氧化还原电子得失守恒",
    formula: "$\\sum n_{\\text{lost}}(e^-) = \\sum n_{\\text{gained}}(e^-)$",
    summaryEn:
      "Lets you calculate oxidant/reductant stoichiometry directly from oxidation state changes without balancing every spectator ion.",
    summaryZh: "只要追踪化合价升降总数，即可跳过繁琐配平直接求解氧化剂与还原剂比例。",
    trapEn:
      "Count electrons PER FORMULA UNIT carefully (e.g., $\\text{Na}_2\\text{O}_2$ reacting with water transfers $1e^-$ per $\\text{Na}_2\\text{O}_2$, not $2e^-$).",
    trapZh: "格外注意过氧化钠等歧化反应（每 $1\\,\\text{mol}\\;\\text{Na}_2\\text{O}_2$ 与水反应仅转移 $1\\,\\text{mol}\\;e^-$）。",
  },
  {
    code: "F-C4",
    subjectCode: "CHEM",
    topicCode: "C3.3",
    unitEn: "Chemical Theories and Laws",
    unitZh: "化学理论与规律",
    titleEn: "Reaction Rate & Equilibrium Constant $K$",
    titleZh: "反应速率与化学平衡常数 K",
    formula: "$v = \\frac{\\Delta c}{\\Delta t}, \\qquad K = \\frac{[\\text{C}]^p[\\text{D}]^q}{[\\text{A}]^m[\\text{B}]^n} \\; (\\text{depends only on } T)$",
    summaryEn:
      "Solids and pure liquids are omitted from $K$; changing pressure or adding catalyst never changes $K$ at fixed temperature $T$.",
    summaryZh: "纯固体与纯液体浓度视为常数不写入 $K$；恒温下改变压强、浓度或加催化剂均不改变 $K$。",
    trapEn:
      "For an inert gas injected at constant volume, partial pressures of reactants stay fixed so equilibrium does not shift.",
    trapZh: "恒容充入惰性气体时反应物浓度不变，平衡不移动；恒压充入惰性气体等效于减压。",
  },
  {
    code: "F-C5",
    subjectCode: "CHEM",
    topicCode: "C3.4",
    unitEn: "Chemical Theories and Laws",
    unitZh: "化学理论与规律",
    titleEn: "Ionic Charge Balance & Water $K_w$",
    titleZh: "溶液电荷守恒与水的离子积",
    formula: "$K_w = c(\\text{H}^+)c(\\text{OH}^-) = 10^{-14} \\; (25^\\circ\\text{C}), \\qquad \\sum z_+ c_+ = \\sum z_- c_-$",
    summaryEn:
      "Charge balance holds universally for every aqueous mixture; remember to multiply multivalent ion concentrations by their charge magnitude $z$.",
    summaryZh: "任意电解质溶液均严格满足电荷守恒，二价离子如 $\\text{SO}_4^{2-}$、$\\text{CO}_3^{2-}$ 前必须乘系数 2。",
    trapEn:
      "Heating pure water increases $K_w$, so neutral water at $100^\\circ\\text{C}$ has $\\text{pH} < 7$ even though $c(\\text{H}^+) = c(\\text{OH}^-)$.",
    trapZh: "升温促进水电离使 $K_w$ 增大，故 $100^\\circ\\text{C}$ 纯水中性时 $\\text{pH} < 7$，绝非“中性即 pH=7”。",
  },

  /* ── Professional Chinese — Humanities & STEM ─────────────────── */
  {
    code: "F-H1",
    subjectCode: "CH_HUM",
    topicCode: "H5",
    unitEn: "Language Items",
    unitZh: "语言题",
    titleEn: "Collocation & Register Discrimination",
    titleZh: "近义词搭配与语体轻重",
    formula: "$\\text{固定搭配 (Collocation)} \\times \\text{感情色彩 (Tone)} \\times \\text{语体等级 (Register)}$",
    summaryEn:
      "Academic Chinese humanities questions frequently test formal written verbs against conversational synonyms (e.g., 颁布 vs 发布, 承载 vs 承担).",
    summaryZh: "文科中文高频考查书面语与口语区分、褒贬色彩以及固定动宾/主谓搭配（如“承载文化”“颁布法令”）。",
    trapEn:
      "Eliminate options that sound conversational or mismatch the object's semantic category even if the general meaning seems right.",
    trapZh: "即使词义相近，若与后方宾语搭配生硬或过于口语化，应优先排除。",
  },
  {
    code: "F-H2",
    subjectCode: "CH_HUM",
    topicCode: "H6",
    unitEn: "Language Items",
    unitZh: "语言题",
    titleEn: "Paired Conjunctions & Discourse Flow",
    titleZh: "关联词与学术段落逻辑衔接",
    formula: "$\\text{转折 (虽然…但是 / 然而)} \\;|\\; \\text{递进 (不仅…而且)} \\;|\\; \\text{因果 (鉴于…因此)}$",
    summaryEn:
      "Match logical direction before and after the blank: contrast pivots focus on the second clause, whereas progressive clauses add a stronger claim.",
    summaryZh: "先判读分句间是因果、递进、条件还是转折，尤其注意“虽然…但是…”转折后才是作者核心立场。",
    trapEn:
      "Never pair '即使' (concessive hypothetical) with '既然' logic or put a topic subject mismatch across paired conjunctions.",
    trapZh: "关联词前后主语一致时，第一个主语应放在关联词前；主语不同时，关联词各自置于主语前。",
  },
  {
    code: "F-H3",
    subjectCode: "CH_HUM",
    topicCode: "H4",
    unitEn: "Language Items",
    unitZh: "语言题",
    titleEn: "Polyphonic Characters & Confusable Radicals",
    titleZh: "多音字与形近字辨析",
    formula: "$\\text{语境定音 (Context Dictates Tone)} \\;+\\; \\text{形旁表义 (Semantic Radical)}$",
    summaryEn:
      "Use the semantic radical (e.g., 讠 speech, 氵 water, 忄 mind, 阝 place/hill) to rule out wrong homophone substitutions in 4-character idioms.",
    summaryZh: "结合偏旁表义识别易混形近字（如“再接再厉”非“励”，“墨守成规”非“陈”），按词性定多音字读音。",
    trapEn:
      "Watch classic multi-pronunciation verbs vs nouns (such as 处, 载, 着, 供) where academic compounds take the formal reading.",
    trapZh: "高度警惕学术复合词中的多音字定音（如“记载 zǎi / 满载 zài”、“处分 chǔ / 住处 chù”）。",
  },
  {
    code: "F-S1",
    subjectCode: "CH_SCI",
    topicCode: "S1",
    unitEn: "Language Items",
    unitZh: "语言题",
    titleEn: "Mathematical & Scientific Expression in Chinese",
    titleZh: "数理化术语与量词规范表达",
    formula: "$\\text{呈正比/反比} \\;|\\; \\text{导数/极限/收敛} \\;|\\; \\text{溶于/析出/催化}$",
    summaryEn:
      "Master fixed STEM verb pairs: 呈现…趋势, 呈正相关, 抑制反应, 析出晶体, 与…成反比.",
    summaryZh: "掌握理工科高频固定搭配：“与…成正比”、“随温度升高而增大”、“析出沉淀”、“降低活化能”。",
    trapEn:
      "Do not confuse 溶质 (solute), 溶剂 (solvent), and 溶液 (solution), or mix up 升高温度 vs 提高效率.",
    trapZh: "区分高频近义科技术语：溶质/溶剂/溶液、升高(温度)/提高(效率/产率)/增大(压强)。",
  },
  {
    code: "F-S2",
    subjectCode: "CH_SCI",
    topicCode: "S5",
    unitEn: "Language Items",
    unitZh: "语言题",
    titleEn: "Experimental Method & Data Verbs",
    titleZh: "实验操作与数据描述用词辨析",
    formula: "$\\text{测定 / 测量 / 监测} \\;|\\; \\text{振荡 / 过滤 / 萃取} \\;|\\; \\text{显著高于 / 趋于稳定}$",
    summaryEn:
      "Distinguishes precision measurement verbs: 测定 (determine exact value), 观察 (qualitative observation), 验证 (verify hypothesis).",
    summaryZh: "区分实验室动词精度：“测定”侧重定量求值，“检验”侧重定性确认，“验证”侧重检验假说或定律。",
    trapEn:
      "In data passages, match upward/downward trend words accurately with axis descriptions (递增 vs 递减, 峰值 vs 谷值).",
    trapZh: "科技阅读中务必核对坐标轴趋势词，“上升趋势/下降速率/达到峰值/趋于平缓”切勿看反。",
  },
];

export function formulasForSubject(subjectCode: string): FormulaCard[] {
  return FORMULAS.filter((f) => f.subjectCode === subjectCode);
}
