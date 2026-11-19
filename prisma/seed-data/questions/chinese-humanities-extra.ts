import type { SeedQuestion } from "../types";

/**
 * Professional Chinese — Humanities (文科中文), items for the three official
 * item types the original bank did not cover: 识解汉字 (H4), 辨析词语 (H5)
 * and 补全语句 (H6). See `chinese-stem-extra.ts` for the STEM counterpart.
 */
export const chineseHumanitiesExtraQuestions: SeedQuestion[] = [
  /* ── H4 识解汉字（12 题）────────────────────────────────────── */
  {
    topic: "H4",
    difficulty: "EASY",
    stem: "「编纂」一词中「纂」的读音是____。",
    options: ["zuǎn", "zuàn", "cuàn", "zhuàn"],
    correct: 0,
    explanation: "「纂」读 zuǎn，意为编辑、汇集，如「编纂」「纂修」。",
    tags: ["pronunciation", "literature"],
  },
  {
    topic: "H4",
    difficulty: "MEDIUM",
    stem: "「脍炙人口」中「脍」的原意是____。",
    options: ["细切的肉", "精美的器皿", "美好的言辞", "广为人知"],
    correct: 0,
    explanation:
      "「脍」指细切的肉，「炙」指烤肉；「脍炙人口」原指人人爱吃的美食，后比喻作品广为传诵。",
    tags: ["meaning", "idiom"],
  },
  {
    topic: "H4",
    difficulty: "MEDIUM",
    stem: "下列词语中，书写完全正确的一组是____。",
    options: [
      "辨证法、提纲挈领、名副其实现",
      "辩证法、提纲挈领、名副其实",
      "辨证法、题纲挈领、名符其实",
      "辩证法、题纲挈领、名副其实",
    ],
    correct: 1,
    explanation:
      "规范写法为「辩证法」（辨明的方法论，区别于中医「辨证」）、「提纲挈领」、「名副其实」。",
    tags: ["characters", "philosophy"],
  },
  {
    topic: "H4",
    difficulty: "EASY",
    stem: "「法槌」中「槌」的读音是____。",
    options: ["chuí", "zhuī", "chuái", "tuí"],
    correct: 0,
    explanation: "「槌」读 chuí，指敲击用的器具，如「法槌」「鼓槌」。",
    tags: ["pronunciation", "law"],
  },
  {
    topic: "H4",
    difficulty: "MEDIUM",
    stem: "下列成语中，没有错别字的一项是____。",
    options: ["一愁莫展", "一如既往", "一如继往", "一愁不展"],
    correct: 1,
    explanation: "「一如既往」写作「既」，表示已经、曾经；「愁」应为「筹」。",
    tags: ["characters", "idiom"],
  },
  {
    topic: "H4",
    difficulty: "MEDIUM",
    stem: "「溯本求源」中「溯」的意思是____。",
    options: ["逆流而上，追寻", "溯源，指河流", "肃清", "塑造"],
    correct: 0,
    explanation: "「溯」本义为逆流而上，引申为追溯，如「溯源」「追溯往事」。",
    tags: ["meaning", "history"],
  },
  {
    topic: "H4",
    difficulty: "MEDIUM",
    stem: "下列词语中，书写有误的一项是____。",
    options: ["潜移默化", "耳濡目染", "融会贯通", "融汇贯通"],
    correct: 3,
    explanation:
      "规范写法是「融会贯通」，「会」表示领会聚合；「融汇」多用于水流汇合，此成语不作「汇」。",
    tags: ["characters", "education"],
  },
  {
    topic: "H4",
    difficulty: "MEDIUM",
    stem: "「肖像」中「肖」的读音是____。",
    options: ["xiào", "xiāo", "xiáo", "xiǎo"],
    correct: 0,
    explanation: "「肖像」读 xiào xiàng；「肖」作姓氏时读 Xiāo。",
    tags: ["pronunciation", "art"],
  },
  {
    topic: "H4",
    difficulty: "HARD",
    stem: "「赋比兴」中的「赋」在《诗经》里指的是____。",
    options: ["铺陈直叙", "比喻", "起兴联想", "押韵格律"],
    correct: 0,
    explanation:
      "《诗经》六义中，「赋」是铺陈直叙，「比」是比喻，「兴」是先言他物以引起所咏之辞。",
    tags: ["meaning", "literature"],
  },
  {
    topic: "H4",
    difficulty: "MEDIUM",
    stem: "下列词语中，书写正确的一项是____。",
    options: ["法制社会", "法治社会", "发治社会", "法冶社会"],
    correct: 1,
    explanation:
      "「法治」指依法治理，与「法制」（法律制度）分工不同；现代治理语境用「法治社会」。",
    tags: ["characters", "law"],
  },
  {
    topic: "H4",
    difficulty: "MEDIUM",
    stem: "「提纲」与「题纲」中，正确的一项是____，含义为____。",
    options: [
      "提纲；内容要点",
      "题纲；题目范围",
      "提纲；举起的网",
      "题纲；考试范围",
    ],
    correct: 0,
    explanation:
      "「提纲」写作「提」，本义为提着网的总绳，引申为内容要点；「题纲」不是规范词形。",
    tags: ["characters", "writing"],
  },
  {
    topic: "H4",
    difficulty: "HARD",
    stem: "「安土重迁」中「重」的读音和意思是____。",
    options: ["zhòng，看重、不轻易", "chóng，重复", "zhòng，沉重", "chóng，再次"],
    correct: 0,
    explanation:
      "「重迁」意为把迁移看得很重、不轻易迁徙，故「重」读 zhòng，表示重视。",
    tags: ["pronunciation", "idiom"],
  },

  /* ── H5 辨析词语（12 题）────────────────────────────────────── */
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "这部著作对后世的思想产生了深远的____。",
    options: ["影响", "反映", "反应", "映像"],
    correct: 0,
    explanation:
      "「影响」指对人或事物起作用；「反映」是呈现、汇报；「反应」是被刺激后的回应；「映像」是光学或心理形象。",
    tags: ["word-choice", "philosophy"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "研究者依据出土文献，____了该事件的确切年代。",
    options: ["考证", "考察", "考核", "考虑"],
    correct: 0,
    explanation:
      "「考证」指根据资料考核证实，是史学研究术语；「考察」是实地观察，「考核」是评定，「考虑」是一般思考。",
    tags: ["word-choice", "history"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "该条款对双方的权利义务作出了明确____。",
    options: ["界定", "限制", "约束", "规范"],
    correct: 0,
    explanation:
      "「界定」指划定范围、明确界限，与「权利义务」搭配最准确；其余三项侧重限制或规则本身。",
    tags: ["word-choice", "law"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "他的论证逻辑严密，结论令人____。",
    options: ["信服", "佩服", "服从", "顺从"],
    correct: 0,
    explanation:
      "「信服」指相信并佩服，用于论点、道理；「佩服」用于人的才能，「服从」「顺从」用于命令与意愿。",
    tags: ["word-choice", "argument"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "教育的目的不只是传授知识，更在于____学生的独立思考能力。",
    options: ["培养", "培育", "抚养", "教养"],
    correct: 0,
    explanation:
      "「培养」用于能力、人才；「培育」多用于植物与幼苗；「抚养」是长辈对子女的养育，「教养」是名词。",
    tags: ["word-choice", "education"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "两派学者的观点____，争论持续了数十年。",
    options: ["针锋相对", "相辅相成", "并行不悖", "不谋而合"],
    correct: 0,
    explanation:
      "「针锋相对」指观点尖锐对立，与「争论」相合；其余三项都表示一致或相容。",
    tags: ["idiom", "philosophy"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "这部小说以细腻的笔触____了普通人的日常生活。",
    options: ["描绘", "描摹", "描写", "描述"],
    correct: 0,
    explanation:
      "文学评论中「描绘」最常用，强调生动再现；「描摹」偏于临摹形貌，「描述」偏于客观陈述。",
    tags: ["word-choice", "literature"],
  },
  {
    topic: "H5",
    difficulty: "HARD",
    stem: "该判决在法理上____，但在社会效果上仍有争议。",
    options: ["成立", "建立", "成立起来", "确立"],
    correct: 0,
    explanation:
      "「在法理上成立」是固定表达，指论证或判决站得住脚；「建立」「确立」需带宾语。",
    tags: ["word-choice", "law"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "研究者应____原始材料，避免转引造成失真。",
    options: ["核对", "核查", "校对", "查对"],
    correct: 0,
    explanation:
      "「核对」指对照原物检查是否相符，适用于材料与数据；「校对」用于文字校样，「核查」侧重调查。",
    tags: ["word-choice", "research"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "这部作品被认为是现代文学的____之作。",
    options: ["奠基", "奠定", "基础", "基石"],
    correct: 0,
    explanation:
      "「奠基之作」是固定搭配，比喻为某领域打下基础的开创性作品；「奠定」是动词，不能直接修饰「之作」。",
    tags: ["word-choice", "literature"],
  },
  {
    topic: "H5",
    difficulty: "MEDIUM",
    stem: "面对复杂的史料，研究者必须保持____的态度。",
    options: ["审慎", "慎重", "谨慎", "小心"],
    correct: 0,
    explanation:
      "「审慎」侧重周密而慎重，多修饰判断、态度；「小心」口语化，「慎重」「谨慎」虽近义，但与「态度」搭配以「审慎」最合学术语境。",
    tags: ["word-choice", "history"],
  },
  {
    topic: "H5",
    difficulty: "HARD",
    stem: "该理论虽有创见，但其前提假设尚待进一步____。",
    options: ["商榷", "商量", "商讨", "商议"],
    correct: 0,
    explanation:
      "学术语境用「商榷」，表示值得讨论、可质疑；其余三项多用于日常事务的协商。",
    tags: ["word-choice", "philosophy"],
  },

  /* ── H6 补全语句（12 题）────────────────────────────────────── */
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "____，文学作品才能真实反映时代的精神面貌。",
    options: [
      "只有深入生活",
      "只要深入生活",
      "因为深入生活",
      "虽然深入生活",
    ],
    correct: 0,
    explanation:
      "后句「才能」要求前句用「只有」构成必要条件；「只要」须与「就」呼应。",
    tags: ["cohesion", "literature"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "史料本身并不等于历史事实，____需要研究者加以辨析。",
    options: ["因此", "然而", "尽管", "除非"],
    correct: 0,
    explanation: "前后为因果推论，用「因此」；「然而」表转折，与句意相反。",
    tags: ["cohesion", "history"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "____法律的权威，必须依靠严格的执行与普遍的遵守。",
    options: ["要维护", "因为维护", "虽然维护", "除了维护"],
    correct: 0,
    explanation: "「要……必须……」表目的与必要条件；其余关联词不能与「必须」构成目的关系。",
    tags: ["cohesion", "law"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "教育的价值不仅在于传授知识，____在于塑造人格。",
    options: ["更", "就", "才", "又"],
    correct: 0,
    explanation: "「不仅……更……」表递进，语气较「还」更强；「就」「才」表条件或强调。",
    tags: ["cohesion", "education"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "____作品的技巧并不复杂，其情感力量却格外动人。",
    options: ["尽管", "因为", "只要", "因此"],
    correct: 0,
    explanation: "后句「却」表转折，前句用「尽管」构成让步；「因为」表原因，「因此」表结果。",
    tags: ["cohesion", "literature"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "历史研究必须以史料为依据，____陷入主观臆断。",
    options: ["否则就会", "因此就会", "并且不会", "从而不会"],
    correct: 0,
    explanation: "「否则」引出相反假设的后果，与「必须」形成正反呼应；其余三项逻辑不通。",
    tags: ["cohesion", "history"],
  },
  {
    topic: "H6",
    difficulty: "HARD",
    stem: "____个体自由与社会秩序之间的张力，是法哲学的核心问题之一。",
    options: ["如何平衡", "因为平衡", "虽然平衡", "既然平衡"],
    correct: 0,
    explanation: "「如何……是……问题」是学术表述的常见结构；其余连词无法引出议题。",
    tags: ["cohesion", "philosophy"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "教师不仅要传授结论，____要引导学生理解结论的由来。",
    options: ["更", "才", "即", "则"],
    correct: 0,
    explanation: "「不仅……更……」递进，强调后者更重要，符合教育语境的论证顺序。",
    tags: ["cohesion", "education"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "____证据充分，再严谨的推理也难以成立。",
    options: ["除非", "只要", "因为", "尽管"],
    correct: 0,
    explanation: "「除非……否则……」表唯一条件，句中隐含否定结果，用「除非」最贴切。",
    tags: ["cohesion", "argument"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "文艺复兴时期的艺术成就，____改变了此后的审美传统。",
    options: ["在相当程度上", "在相当程度", "相当程度上", "相当的程度"],
    correct: 0,
    explanation:
      "「在……程度上」是固定介词结构，须有「在」与「上」；其余选项成分残缺或搭配不当。",
    tags: ["cohesion", "art"],
  },
  {
    topic: "H6",
    difficulty: "HARD",
    stem: "____，其价值判断仍不免受到时代条件的制约。",
    options: [
      "无论思想家的视野多么开阔",
      "因为思想家的视野开阔",
      "只要思想家的视野开阔",
      "既然思想家的视野开阔",
    ],
    correct: 0,
    explanation:
      "后句「仍」表示让步下的持续，前句须用「无论……多么……」构成让步条件。",
    tags: ["cohesion", "philosophy"],
  },
  {
    topic: "H6",
    difficulty: "MEDIUM",
    stem: "经典之所以为经典，____它不断被重新解读而始终保有生命力。",
    options: ["在于", "关于", "对于", "由于"],
    correct: 0,
    explanation: "「之所以……在于……」是解释原因的固定搭配；其余介词不能引出原因分句。",
    tags: ["cohesion", "literature"],
  },
];
