import type { TaughtTrack } from "@/lib/tracks";

/**
 * Bilingual app copy.
 *
 * The product has two monolingual sections: English-taught pages render only
 * English, Chinese-taught pages render only Chinese. `t()` takes the English
 * source string as its key so an untranslated string falls back visibly and
 * can be found by grepping the English copy.
 */

export type Lang = "en" | "zh";

export function langFromTrack(track: TaughtTrack): Lang {
  return track === "CN" ? "zh" : "en";
}

const ZH: Record<string, string> = {
  /* ── chrome ─────────────────────────────────────────────────── */
  Overview: "总览",
  Dashboard: "学习面板",
  "Daily quiz": "每日十题",
  "Your progress": "学习进度",
  Progress: "学习进度",
  "Study plan": "学习计划",
  Results: "成绩",
  Leaderboard: "排行榜",
  "Exam strategy": "考试策略",
  Account: "账户",
  "Billing & plan": "订阅与方案",
  Settings: "设置",
  "Sign out": "退出登录",
  "Admin console": "管理后台",
  Operations: "运营",
  "Change language": "切换语言",
  "Switch section": "切换分区",
  "English-taught": "英文授课",
  "Chinese-taught": "中文授课",
  "Chinese-taught · 中文授课": "中文授课",
  "Section overview": "分区总览",
  "English practice": "英文练习",
  "English mocks": "英文模拟",
  "English papers": "英文真题",
  "English concepts": "英文概念",
  "中文总览": "中文总览",
  "中文练习": "中文练习",
  "中文模拟": "中文模拟",
  "中文真题": "中文真题",
  "中文概念课": "中文概念课",
  "Default": "默认",
  Free: "免费",
  Pro: "专业版",
  Lifetime: "终身版",
  Home: "首页",
  Learn: "概念课",
  Mocks: "模拟",
  Practice: "练习",

  /* ── common ─────────────────────────────────────────────────── */
  Back: "返回",
  Next: "下一题",
  Previous: "上一题",
  Finish: "完成",
  Start: "开始",
  Resume: "继续",
  Retake: "重做",
  Review: "复习",
  Open: "打开",
  All: "全部",
  "In progress": "进行中",
  "Not answered": "未作答",
  Answered: "已作答",
  Flagged: "已标记",
  "Flag for review": "标记待看",
  Explanation: "解析",
  Analysis: "解析",
  Correct: "正确",
  "Not quite": "答错了",
  "Answer": "答案",
  "Questions": "题目",
  "questions": "道题",
  "topics": "个知识点",
  "mocks": "套模拟卷",
  "papers": "套试卷",
  "subjects": "个科目",
  "minutes": "分钟",
  "min": "分钟",
  "Easy": "简单",
  "Medium": "中等",
  "Hard": "困难",
  "Difficulty": "难度",
  "Subject": "科目",
  "Track": "分区",
  "Sitting": "考试场次",
  "All subjects": "全部科目",
  "All years": "全部年份",
  "Full length": "完整卷",
  "Short paper": "短卷",
  "Official": "官方",
  "Reconstructed": "重整",
  "Original": "原创",
  "Practice set": "练习卷",
  "Official paper": "官方真题",
  "Review set": "复习卷",

  /* ── section hubs ───────────────────────────────────────────── */
  "What this section contains": "本区内容",
  "This section at a glance": "本区一览",
  "paper language": "试卷语言",
  "Today's quiz in this track": "今日十题（本区）",
  "Change your default in": "可在设置中更改默认分区：",
  settings: "设置",
  "Not in this section:": "本区不包含：",
  "Practice this subject": "练习这个科目",
  "Mock tests": "模拟考试",
  "Official papers": "官方真题",
  concepts: "个概念",

  /* ── practice ───────────────────────────────────────────────── */
  "Quick 10": "快速 10 题",
  "Smart review": "智能复习",
  "Drill one topic until it stops being a problem.":
    "一个知识点一个知识点地练，直到它不再是问题。",
  "Drill": "练习",
  "mastery": "掌握度",
  "not measured": "尚未测出",
  "of paper": "试卷占比",
  "Exit practice": "退出练习",
  "Choose an answer to see the explanation": "选择答案后查看解析",
  "Answer recorded": "已记录",
  "Session complete": "本组完成",
  "correct": "正确",
  "Worth revisiting": "需要复习",
  "Another set": "再来一组",
  "Back to practice": "返回练习",
  "How to use this:": "使用方法：",
  "New to the exam?": "第一次接触考试？",
  "Every question and explanation here is in English. Chinese items live in the Chinese-taught section.":
    "本区所有题目与解析均为中文。英文题库位于英文授课区。",

  /* ── mocks / official ──────────────────────────────────────── */
  "All mock tests": "全部模拟卷",
  "All English mock tests": "全部英文模拟卷",
  "Open the official archive": "打开官方真题库",
  "Redeem Pro": "兑换专业版",
  "Study": "学习",
  "Sit timed": "计时作答",
  "Study this paper free": "免费学习本卷",
  "Have a Pro code? Sit it on the clock": "有专业版兑换码？可计时作答",
  "Answer key and step-by-step analysis for every question. Hide the answers to self-test, or sit the timed version when you are ready.":
    "每道题都有答案与逐步解析。可先隐藏答案自测，准备好后再计时作答。",
  "Where these come from.": "题目来源。",
  "Study or sit.": "学习或作答。",
  "Hide answers": "隐藏答案",
  "Show answers": "显示答案",
  "Take a timed mock": "做一套计时模拟",
  "Study tip": "学习建议",
  "Question index": "题目索引",

  /* ── daily ─────────────────────────────────────────────────── */
  "Daily habit": "每日习惯",
  "Daily quiz done": "今日十题已完成",
  "Submit quiz": "提交",
  "Checking…": "批改中…",
  "Today's quiz complete": "今日十题完成",
  "Daily quiz logged — come back tomorrow to keep your streak alive.":
    "今日十题已记录，明天继续打卡。",
  "Questions today": "今日题量",
  "Daily quiz streak": "连续打卡",
  "Today's score": "今日得分",
  "Not done yet": "尚未完成",
  "Start a streak: answer one question today.": "今天先答一道题，开始打卡。",

  /* ── exam ──────────────────────────────────────────────────── */
  "Submit paper": "交卷",
  "Submit": "交卷",
  "Exit": "退出",
  "Return to paper": "返回试卷",
  "Time remaining": "剩余时间",
  "Question palette": "答题卡",
  "Unanswered": "未答",
  "Flagged questions": "标记题",
  "Autosaved": "已自动保存",
  "Saved": "已保存",
  "Practice conditions": "练习模式",
  "Official conditions": "官方模式",
  "I have read the commitment and I accept it.":
    "我已阅读并接受上述承诺。",
  "Start the test": "开始考试",
  "Test language": "试卷语言",
  "Conditions": "考试模式",
  "English": "英语",
  "Chinese only, as the official paper.": "仅中文，与官方试卷一致。",
  "English paper · fixed by your English-taught section.":
    "英文试卷 · 由英文授课分区固定。",
  "中文试卷 · fixed by your Chinese-taught section.":
    "中文试卷 · 由中文授课分区固定。",
  "This simulation cannot enforce or verify any of the above. It exists so the rules are read before they matter, and so the timing and interface feel familiar on the day.":
    "本模拟无法执行或核验以上任何条款。它的存在是为了让你在真正考试前读过规则，并熟悉计时与界面。",
  "I confirm that I will:": "我确认我将：",

  /* ── settings / billing ────────────────────────────────────── */
  "Teaching language · 授课语言": "授课语言",
  "English-taught — Mathematics, Physics, Chemistry":
    "英文授课 — 数学、物理、化学",
  "中文授课 — 数学、物理、化学 + 专业中文": "中文授课 — 数学、物理、化学 + 专业中文",
  "Save changes": "保存更改",
  "Saving…": "保存中…",
  "Profile updated.": "资料已更新。",
  "Get Pro with a code.": "使用兑换码开通专业版。",
  "Your Pro access is active.": "专业版已开通。",
  "Sit a mock": "做一套模拟卷",
  "Redeem": "兑换",
  "Redeeming…": "兑换中…",
  "Code applied — Pro is active.": "兑换成功，专业版已开通。",

  /* ── results ────────────────────────────────────────────────── */
  "Every paper you have sat.": "你做过的每一套试卷。",
  "Paper": "试卷",
  "Score": "得分",
  "Date": "日期",
  "Best score": "最高分",
  "Papers sat": "已做试卷",
  "Estimated percentile": "预估百分位",
  "Topic breakdown": "知识点分布",
  "Drill these next": "接下来练这些",
  "Open practice": "打开练习",
  "Retake this paper": "重做这套卷",
  "Try another subject": "换一个科目",
  "Next step": "下一步",
  "No results yet": "还没有成绩",
  "Choose a paper": "选择一套试卷",
  "Correct answer": "正确答案",
  "Your answer": "你的答案",
  "Print report": "打印报告",
  "Back to results": "返回成绩",

  /* ── dashboard ──────────────────────────────────────────────── */
  "Your section": "你的分区",
  "change default": "更改默认",
  "Next best action": "下一步建议",
  "Score trend": "分数趋势",
  "Topic mastery": "知识点掌握",
  "Where the marks leak": "失分点",
  "Papers to sit next": "接下来做",
  "Readiness": "备考准备度",
  "Study streak": "连续学习",
  "Daily goal": "每日目标",
  "Reviews due": "待复习",
  "Review cards": "复习卡片",
  "Continue": "继续",
  "Welcome back": "欢迎回来",
  "Target intake": "目标入学",
  "papers completed": "套试卷已完成",
  "topics measured": "个知识点已测",
  "Latest": "最新",
  "Best": "最高",
  "Avg": "平均",
  "No paper yet": "还没有试卷",
  "Start your first mock": "开始第一套模拟",
  "Pick your first paper": "选择第一套试卷",
  "All papers": "全部试卷",
};

/** Translate an English UI string into the section language. */
export function t(lang: Lang, english: string): string {
  if (lang === "en") return english;
  return ZH[english] ?? english;
}

export function tf(lang: Lang, english: string, values: Record<string, string | number>): string {
  let out = t(lang, english);
  for (const [key, value] of Object.entries(values)) {
    out = out.replaceAll(`{${key}}`, String(value));
  }
  return out;
}
