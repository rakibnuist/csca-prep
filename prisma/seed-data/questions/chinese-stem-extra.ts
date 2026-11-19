import type { SeedQuestion } from "../types";

/**
 * Professional Chinese — STEM (理科中文), items for the three official item
 * types the original bank did not cover.
 *
 * The 2025 CSCA syllabus lists six item types for both Professional Chinese
 * papers: 识解汉字, 选词填空, 辨析词语, 选词成段, 补全语句, 阅读理解.
 * `chinese-stem.ts` covers 选词填空 (S1), 选词成段 (S2) and 阅读理解 (S3); this
 * file adds 识解汉字 (S4), 辨析词语 (S5) and 补全语句 (S6) so a full
 * 80-question paper can be assembled in the official proportions.
 */
export const chineseStemExtraQuestions: SeedQuestion[] = [
  /* ── S4 识解汉字（18 题）────────────────────────────────────── */
  {
    topic: "S4",
    difficulty: "EASY",
    stem: "「粗糙」一词中「糙」的读音是____。",
    options: ["cāo", "zào", "cào", "sāo"],
    correct: 0,
    explanation: "「糙」只有一个读音 cāo，如「粗糙」「糙米」，不读 zào。",
    tags: ["pronunciation", "mathematics"],
  },
  {
    topic: "S4",
    difficulty: "EASY",
    stem: "「沉淀」一词中「淀」的读音是____。",
    options: ["dìng", "diàn", "zhàn", "tíng"],
    correct: 1,
    explanation: "「淀」读 diàn，如「沉淀」「淀粉」；不读 dìng。",
    tags: ["pronunciation", "chemistry"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "「蒸馏」一词中「馏」的读音是____。",
    options: ["liú", "liù", "liǔ", "lù"],
    correct: 0,
    explanation: "「馏」在「蒸馏」中读 liú；「馏馒头」的「馏」读 liù，属另一义项。",
    tags: ["pronunciation", "chemistry"],
  },
  {
    topic: "S4",
    difficulty: "EASY",
    stem: "「凝固」一词中「凝」的读音是____。",
    options: ["níng", "nìng", "yí", "nǐng"],
    correct: 0,
    explanation: "「凝」读 níng，如「凝固」「凝聚」「凝视」。",
    tags: ["pronunciation", "physics"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "「磁感应强度」中「应」的读音是____。",
    options: ["yīng", "yìng", "yíng", "yǐng"],
    correct: 1,
    explanation: "此处「应」表示「响应、感应」，读 yìng；「应该」的「应」才读 yīng。",
    tags: ["pronunciation", "physics"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "下列词语中，书写完全正确的一组是____。",
    options: [
      "溶液、熔解、蒸流",
      "溶液、溶解、蒸馏",
      "熔液、熔解、蒸馏",
      "溶液、溶解、蒸溜",
    ],
    correct: 1,
    explanation:
      "正确写法为「溶液、溶解、蒸馏」。错项分别误写了「蒸流」「熔液」「蒸溜」。",
    tags: ["characters", "chemistry"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "下列词语中，没有错别字的一项是____。",
    options: ["磨擦力", "摩擦力", "磨擦利", "摩察力"],
    correct: 1,
    explanation: "规范写法是「摩擦力」，「摩」表示接触与摩擦，「擦」不能写作「察」。",
    tags: ["characters", "physics"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "下列词语中，书写有误的一项是____。",
    options: ["电容器", "电磁感应", "电阻率", "电阴率"],
    correct: 3,
    explanation: "「电阻率」写作「阻」，表示阻碍；「阴」与电流阻碍无关。",
    tags: ["characters", "physics"],
  },
  {
    topic: "S4",
    difficulty: "HARD",
    stem: "「化学反应中，原子重新组合，元素的种类和质量都不改变」一句中，「素」的意思是____。",
    options: ["平素、平常", "要素、基本成分", "白色", "素养"],
    correct: 1,
    explanation:
      "「元素」指同一类原子的总称，「素」在此表示基本成分、要素，不取「平素」义。",
    tags: ["meaning", "chemistry"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "「函数的定义域是该函数有意义的自变量的取值范围」中，「域」的意思是____。",
    options: ["区域、范围", "国家", "住宅", "界限以外"],
    correct: 0,
    explanation: "「域」在数学术语中表示范围、区域，如「定义域」「值域」。",
    tags: ["meaning", "mathematics"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "「把溶液加热至沸腾，使溶剂不断汽化」中，「汽化」不能写作____。",
    options: ["气化", "汽化", "蒸发", "挥发"],
    correct: 0,
    explanation:
      "物理术语「汽化」指物质由液态变为气态，规范用「汽」；「气化」多指煤气化等工业过程，此处不合规范。",
    tags: ["characters", "physics"],
  },
  {
    topic: "S4",
    difficulty: "EASY",
    stem: "「加速度」中「加」的意思是____。",
    options: ["增加、加快", "施加外力", "参加", "加以"],
    correct: 0,
    explanation: "「加速度」描述速度变化的快慢，「加」表示速度的增加或变化。",
    tags: ["meaning", "physics"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "下列各组词语中，加点字读音相同的一组是____。",
    options: ["重量 / 测量", "沉淀 / 奠定", "电荷 / 荷包", "曲线 / 歌曲"],
    correct: 1,
    explanation:
      "「沉淀」的「淀」与「奠定」的「奠」都读 diàn。其余三组读音不同：重量 liàng / 测量 liáng；电荷 hè / 荷包 hé；曲线 qū / 歌曲 qǔ。",
    tags: ["pronunciation", "science"],
  },
  {
    topic: "S4",
    difficulty: "HARD",
    stem: "「氢氧化钠溶液呈碱性，能使酚酞变红」中，「呈」的意思是____。",
    options: ["呈现、显出", "呈递、送上", "呈报上级", "形状"],
    correct: 0,
    explanation: "「呈碱性」是「显现出碱性」，「呈」表示呈现、显露。",
    tags: ["meaning", "chemistry"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "下列词语中，书写正确的一项是____。",
    options: ["真馏水", "蒸馏水", "蒸溜水", "蒸鎏水"],
    correct: 1,
    explanation: "「蒸馏水」中「馏」从「留」得声，指加热汽化后冷凝所得的水。",
    tags: ["characters", "chemistry"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "「实验装置」中「置」的读音和意思是____。",
    options: ["zhì，安放、设置", "zhǐ，放置", "zhì，购买", "zhǐ，停止"],
    correct: 0,
    explanation: "「装置」的「置」读 zhì，表示安放、设置；「装置」指安装好的设备。",
    tags: ["pronunciation", "laboratory"],
  },
  {
    topic: "S4",
    difficulty: "HARD",
    stem: "「惯性是物体保持原有运动状态的性质」中，「性」表示____。",
    options: ["性别", "性质、属性", "性格", "性命"],
    correct: 1,
    explanation:
      "「惯性」「弹性」「导电性」中的「性」都表示事物固有的性质或属性。",
    tags: ["meaning", "physics"],
  },
  {
    topic: "S4",
    difficulty: "MEDIUM",
    stem: "下列词语中，没有错别字的一项是____。",
    options: ["电解质溶夜", "电解质溶液", "电解质熔液", "电解质溶掖"],
    correct: 1,
    explanation: "「溶液」写作「液」；「熔液」用于熔融状态，「夜」「掖」均为误写。",
    tags: ["characters", "chemistry"],
  },

  /* ── S5 辨析词语（18 题）────────────────────────────────────── */
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "实验中应多次____数据，以减小偶然误差对结果的影响。",
    options: ["测量", "估量", "打量", "计量"],
    correct: 0,
    explanation:
      "「测量」指用仪器确定数值，是实验术语；「估量」侧重估计，「打量」用于观察人，「计量」指统一单位与量值，语境不符。",
    tags: ["word-choice", "laboratory"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "两种方案的实验结果____不同，这提示温度可能是关键变量。",
    options: ["显著", "显然", "显要", "显赫"],
    correct: 0,
    explanation:
      "「显著」修饰差异、变化等可比较的指标；「显然」是副词性判断；「显要」「显赫」用于地位声望。",
    tags: ["word-choice", "data"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "根据已有数据，我们可以____出该反应的活化能。",
    options: ["推算", "推测", "猜测", "料想"],
    correct: 0,
    explanation:
      "「推算」指依据数据与公式进行演算，符合实验语境；「推测」「猜测」主观性强，「料想」多用于预料。",
    tags: ["word-choice", "chemistry"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "研究人员通过显微镜____细胞的形态变化。",
    options: ["观察", "观看", "观赏", "观望"],
    correct: 0,
    explanation:
      "「观察」是科学研究的规范用语；「观看」「观赏」「观望」分别侧重看节目、欣赏与犹豫等待。",
    tags: ["word-choice", "biology"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "该现象可以用能量守恒定律加以____。",
    options: ["解释", "讲解", "解说", "解开"],
    correct: 0,
    explanation:
      "「解释」用于对现象、结果给出科学说明；「讲解」「解说」多用于教学与体育转播，「解开」搭配具体物体或疑问。",
    tags: ["word-choice", "physics"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "误差主要来源于仪器的____度，而非操作失误。",
    options: ["精确", "精密", "精巧", "精致"],
    correct: 1,
    explanation:
      "仪器用「精密」描述加工与分辨能力；「精确」多修饰数值与计算结果，「精巧」「精致」形容工艺外观。",
    tags: ["word-choice", "instrument"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "两种金属的熔点____很大，因此可用分步加热的方法分离。",
    options: ["差异", "差别", "区别", "区分"],
    correct: 0,
    explanation:
      "「差异」用于数值、性质上可测的不同；「区别」「区分」多指辨别行为，「差别」虽近义，但「差异很大」为固定搭配。",
    tags: ["word-choice", "chemistry"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "实验报告应当____记录数据，不得事后追改。",
    options: ["如实", "实在", "诚实", "真实"],
    correct: 0,
    explanation:
      "「如实」是副词，修饰「记录」，表示按照实际情况；「诚实」多形容人的品格，「实在」「真实」不作此用法。",
    tags: ["word-choice", "laboratory"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "该模型能较好地____实验曲线，但在高温区仍有偏差。",
    options: ["拟合", "配合", "结合", "凑合"],
    correct: 0,
    explanation:
      "「拟合」指用函数曲线逼近数据点，是数学与实验数据处理的专门用语。",
    tags: ["word-choice", "mathematics"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "加热时试管口不能对着人，以免液体____伤人。",
    options: ["沸腾", "飞溅", "溢出", "蒸发"],
    correct: 1,
    explanation:
      "「飞溅」强调液体向四周迸射，符合安全提示语境；「沸腾」是状态，「溢出」指流出容器，「蒸发」是缓慢汽化。",
    tags: ["word-choice", "safety"],
  },
  {
    topic: "S5",
    difficulty: "HARD",
    stem: "两种方法测得的数值基本一致，可以相互____。",
    options: ["验证", "检验", "考验", "实验"],
    correct: 0,
    explanation:
      "「验证」指用另一方法加以证实；「检验」侧重检查是否合格，「考验」用于人，「实验」是名词性活动。",
    tags: ["word-choice", "method"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "滴定接近终点时，应____滴加标准溶液，以免过量。",
    options: ["逐滴", "逐渐", "缓缓", "轻轻"],
    correct: 0,
    explanation:
      "「逐滴」是滴定操作的规范用语，指一滴一滴加入；「逐渐」「缓缓」只描述速度，不能说明加液方式。",
    tags: ["word-choice", "chemistry"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "该结论已得到多次实验的____支持。",
    options: ["充分", "充实", "充足", "充满"],
    correct: 0,
    explanation:
      "「充分」修饰抽象的支持、论证、说明；「充足」多用于物资、光线，「充实」形容内容，「充满」是动词。",
    tags: ["word-choice", "research"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "把电流表____在电路中，注意正负接线柱不能接反。",
    options: ["串联", "联接", "连接", "衔接"],
    correct: 0,
    explanation:
      "电流表必须「串联」接入电路，这是电学规范用语；「连接」「联接」只是一般相接，未指出方式。",
    tags: ["word-choice", "physics"],
  },
  {
    topic: "S5",
    difficulty: "HARD",
    stem: "两次实验的结果存在系统性____，需要校正仪器零点。",
    options: ["偏差", "误差", "差错", "差距"],
    correct: 0,
    explanation:
      "「偏差」指相对标准值的单向偏移，正合「系统性」之说；「误差」为一般统称，「差错」指人为失误，「差距」用于比较水平。",
    tags: ["word-choice", "measurement"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "题目要求保留两位小数，计算结果应____处理。",
    options: ["近似", "类似", "相似", "相仿"],
    correct: 0,
    explanation:
      "「近似」指取接近值，是数值处理的规范说法；其余三项表示相似关系，不能修饰「处理」。",
    tags: ["word-choice", "mathematics"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "实验步骤必须严格____操作规范执行。",
    options: ["按照", "依照", "遵照", "根据"],
    correct: 0,
    explanation:
      "「按照……规范执行」是最常见的搭配；「遵照」多用于指示、意愿，「根据」后接依据来源，与「执行」搭配较弱。",
    tags: ["word-choice", "laboratory"],
  },
  {
    topic: "S5",
    difficulty: "MEDIUM",
    stem: "加入絮凝剂可以____细小的悬浮颗粒聚集成较大的颗粒。",
    options: ["使", "让", "令", "叫"],
    correct: 0,
    explanation:
      "科技语体用「使」表示致使关系；「让」「叫」偏口语，「令」多用于情感或抽象结果。",
    tags: ["word-choice", "chemistry"],
  },

  /* ── S6 补全语句（18 题）────────────────────────────────────── */
  {
    topic: "S6",
    difficulty: "EASY",
    stem: "____，所以溶液的导电能力随离子浓度升高而增强。",
    options: [
      "由于溶液中存在自由移动的离子",
      "虽然溶液中存在自由移动的离子",
      "只要溶液中存在自由移动的离子",
      "即使溶液中存在自由移动的离子",
    ],
    correct: 0,
    explanation:
      "后句「所以」表因果，前句须用「由于」引导原因；其余三项分别表让步或条件，逻辑不通。",
    tags: ["cohesion", "chemistry"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "实验数据表明，温度升高，反应速率加快；____，催化剂也能显著提高反应速率。",
    options: ["此外", "因此", "然而", "否则"],
    correct: 0,
    explanation:
      "两句是并列补充关系，用「此外」承接；「因此」表结果，「然而」表转折，「否则」表相反假设。",
    tags: ["cohesion", "kinetics"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "____，物体所受合力为零，物体保持静止或匀速直线运动。",
    options: [
      "根据牛顿第一定律",
      "由于牛顿第一定律",
      "尽管牛顿第一定律",
      "除了牛顿第一定律",
    ],
    correct: 0,
    explanation:
      "引用定律作依据用「根据」；「由于」需接原因分句，「尽管」「除了」与后文逻辑不符。",
    tags: ["cohesion", "physics"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "只有当控制变量保持相同，____。",
    options: [
      "实验结果才具有可比性",
      "实验结果就具有可比性",
      "实验结果具有可比性",
      "实验结果已经具有可比性",
    ],
    correct: 0,
    explanation:
      "「只有……才……」是固定关联结构，前句用「只有」，后句必须用「才」呼应。",
    tags: ["cohesion", "method"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "该公式适用于理想气体，____实际气体在低压高温下也可近似使用。",
    options: ["因此", "但是", "并且", "既然"],
    correct: 1,
    explanation:
      "前后是限制与让步的转折关系，用「但是」；「因此」表因果，「并且」表并列，「既然」表推论前提。",
    tags: ["cohesion", "thermodynamics"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "____，才能准确判断该反应是否达到平衡。",
    options: [
      "只有同时测定正反应速率与逆反应速率",
      "只要测定正反应速率",
      "因为测定了正反应速率",
      "虽然测定了正反应速率",
    ],
    correct: 0,
    explanation:
      "后句「才能」呼应「只有」，且判断平衡须比较正逆反应速率，语义与结构都吻合。",
    tags: ["cohesion", "chemistry"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "函数在某点连续，____该点一定有导数。",
    options: ["并不意味", "因此", "所以", "从而"],
    correct: 0,
    explanation:
      "连续是可导的必要条件而非充分条件（如 y=|x| 在 0 点），故用「并不意味」表述否定推断。",
    tags: ["cohesion", "mathematics"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "____实验现象与理论预测一致，我们可以初步接受该假设。",
    options: ["由于", "尽管", "除非", "以免"],
    correct: 0,
    explanation:
      "前后构成因果，用「由于」引导原因；「尽管」表让步，「除非」表条件，「以免」表目的。",
    tags: ["cohesion", "research"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "测量时读数应估读到最小刻度的下一位，____提高结果的精度。",
    options: ["以", "又", "则", "即"],
    correct: 0,
    explanation:
      "「以」表示目的，相当于「以便」，连接做法与目的；其余三项不能引出目的。",
    tags: ["cohesion", "measurement"],
  },
  {
    topic: "S6",
    difficulty: "HARD",
    stem: "____，其电阻值也会随温度变化，因此精密测量需恒温进行。",
    options: [
      "不仅导体的长度和横截面积影响电阻",
      "虽然导体的长度和横截面积影响电阻",
      "只要导体的长度和横截面积影响电阻",
      "除非导体的长度和横截面积影响电阻",
    ],
    correct: 0,
    explanation:
      "「不仅……也……」表递进，后句「也会」与之呼应；其余关联词与「也」不搭配。",
    tags: ["cohesion", "physics"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "实验结束后应清洗仪器、整理台面，____下次实验顺利进行。",
    options: ["以保证", "以免", "除了", "至于"],
    correct: 0,
    explanation: "「以保证」引出目的与结果；「以免」表避免负面结果，「除了」「至于」不合语境。",
    tags: ["cohesion", "laboratory"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "____溶液中溶质的质量分数，需要知道溶质与溶液的总质量。",
    options: ["要计算", "由于计算", "虽然计算", "除了计算"],
    correct: 0,
    explanation: "「要……需要……」构成目的—条件结构；其余关联词无法与「需要」衔接。",
    tags: ["cohesion", "chemistry"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "该实验的样本量偏小，____结论的可靠性仍需进一步验证。",
    options: ["因此", "然而", "况且", "可见"],
    correct: 0,
    explanation: "前后为因果关系：样本小，故结论需验证，用「因此」；「然而」表转折，不符。",
    tags: ["cohesion", "statistics"],
  },
  {
    topic: "S6",
    difficulty: "HARD",
    stem: "____，那么物体的加速度与所受合力成正比。",
    options: [
      "如果物体的质量保持不变",
      "虽然物体的质量保持不变",
      "即使物体的质量保持不变",
      "无论物体的质量是否保持不变",
    ],
    correct: 0,
    explanation:
      "后句「那么」与「如果」搭配构成假设；「虽然」「即使」「无论」均不能与「那么」组成假设句。",
    tags: ["cohesion", "physics"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "在数据处理中，异常值应____，再计算平均值。",
    options: ["先剔除", "先排除", "先消除", "先免除"],
    correct: 0,
    explanation:
      "统计上剔除异常值是规范说法；「排除」多用于可能性，「消除」指使不存在，「免除」用于责任义务。",
    tags: ["cohesion", "statistics"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "化学方程式必须配平，____遵循质量守恒定律。",
    options: ["从而", "然而", "否则", "至于"],
    correct: 0,
    explanation: "「从而」引出结果或目的，表示由此实现守恒；「否则」表相反假设，逻辑相反。",
    tags: ["cohesion", "chemistry"],
  },
  {
    topic: "S6",
    difficulty: "MEDIUM",
    stem: "____观察到的现象是否可重复，是判断实验可靠性的重要标准。",
    options: ["能否", "是否", "可否", "是否能够"],
    correct: 0,
    explanation:
      "「能否……是……」结构前后呼应，且与「可重复」搭配自然；其余三项或与前句重复或用词冗余。",
    tags: ["cohesion", "method"],
  },
  {
    topic: "S6",
    difficulty: "HARD",
    stem: "____把实验条件记录完整，后来的研究者才有复现的可能。",
    options: ["只有", "只要", "因为", "虽然"],
    correct: 0,
    explanation:
      "后句「才」要求前句用「只有」构成必要条件；「只要」须与「就」搭配，其余表原因或让步。",
    tags: ["cohesion", "research"],
  },
];
