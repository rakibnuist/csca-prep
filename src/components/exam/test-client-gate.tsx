"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Globe2,
  Loader2,
  Maximize2,
  Monitor,
  ShieldCheck,
  Ticket,
  Wifi,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reproduction of the official CSCA Test Client start sequence.
 *
 * The real client, per CSCA's Device & Environment document, does this in
 * order: launch and system check → language choice → ticket number + password
 * login → facial recognition (identity) → secondary-device QR → proctor
 * inspection → read and accept the Integrity Commitment Form → countdown →
 * full-screen test with the timer running.
 *
 * We cannot verify an identity or watch a second camera, so the checks here
 * are real where the browser allows it (network, screen size, fullscreen,
 * microphone permission) and honestly labelled simulations where it does not.
 */

export type ExamMode = "official" | "practice";

type Check = {
  id: string;
  label: string;
  detail: string;
  state: "pending" | "running" | "pass" | "warn" | "fail";
};

const TICKET_PREFIX = "CSCA-2026-";

function ticketNumber(attemptId: string) {
  let hash = 0;
  for (let i = 0; i < attemptId.length; i++) hash = (hash * 31 + attemptId.charCodeAt(i)) >>> 0;
  return `${TICKET_PREFIX}${String(hash % 1_000_000).padStart(6, "0")}`;
}

export function TestClientGate({
  attemptId,
  subjectName,
  questionCount,
  durationMin,
  bilingual,
  language,
  onLanguage,
  lockedLanguage,
  onStart,
}: {
  attemptId: string;
  subjectName: string;
  questionCount: number;
  durationMin: number;
  bilingual: boolean;
  /** The teaching track fixes the paper language; no switcher is shown. */
  lockedLanguage?: boolean;
  language: "en" | "zh";
  onLanguage: (lang: "en" | "zh") => void;
  onStart: (mode: ExamMode) => void;
}) {
  const zh = language === "zh";
  const L = (en: string, cn: string) => (zh ? cn : en);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [checks, setChecks] = useState<Check[]>(() => [
    {
      id: "network",
      label: L("Network to the testing platform", "考试平台网络"),
      detail: L("Checking connection…", "正在检查网络连接…"),
      state: "pending",
    },
    {
      id: "screen",
      label: L("Screen resolution", "屏幕分辨率"),
      detail: L("Checking viewport…", "正在检查显示区域…"),
      state: "pending",
    },
    {
      id: "display",
      label: L("Full-screen capability", "全屏能力"),
      detail: L("Checking display…", "正在检查显示设置…"),
      state: "pending",
    },
    {
      id: "mic",
      label: L("Microphone and camera", "麦克风与摄像头"),
      detail: L("Checking permissions…", "正在检查权限…"),
      state: "pending",
    },
    {
      id: "client",
      label: L("Test client integrity", "考试客户端完整性"),
      detail: L("Verifying session…", "正在验证会话…"),
      state: "pending",
    },
  ]);
  const [accepted, setAccepted] = useState(false);
  const [mode, setMode] = useState<ExamMode>("official");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [ticketOpen, setTicketOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ticket = useMemo(() => ticketNumber(attemptId), [attemptId]);

  /* Run the simulated self-test once, in order, like the real client. */
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const update = (id: string, patch: Partial<Check>) =>
        setChecks((all) => all.map((c) => (c.id === id ? { ...c, ...patch } : c)));

      update("network", { state: "running" });
      let rtt = 0;
      let online = navigator.onLine;
      try {
        const started = performance.now();
        const probe = await fetch("/api/me", { cache: "no-store" });
        rtt = Math.round(performance.now() - started);
        online = online && probe.ok;
      } catch {
        online = false;
      }
      if (cancelled) return;
      update("network", {
        state: online ? "pass" : "fail",
        detail: online
          ? L(
              `Online · ${rtt} ms round-trip to the platform`,
              `在线 · 到考试平台往返 ${rtt} ms`,
            )
          : L(
              "No connection to the platform — the real client blocks the paper here",
              "无法连接考试平台——真实客户端会在此阻止打开试卷",
            ),
      });

      update("screen", { state: "running" });
      await new Promise((r) => setTimeout(r, 320));
      if (cancelled) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const wide = w >= 1024;
      const meetsSpec = w >= 1366 && h >= 768;
      update("screen", {
        state: wide ? "pass" : "warn",
        detail: meetsSpec
          ? L(
              `${w}×${h} — matches the 1366×768 minimum`,
              `${w}×${h} — 达到 1366×768 最低要求`,
            )
          : wide
            ? L(
                `${w}×${h} — fits this simulation (real client requires ≥1366×768)`,
                `${w}×${h} — 当前模拟可用（真实客户端要求 ≥1366×768）`,
              )
            : L(
                `${w}×${h} — the real client needs ≥1366×768`,
                `${w}×${h} — 真实客户端要求 ≥1366×768`,
              ),
      });

      update("display", { state: "running" });
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;
      const fullscreenCapable = typeof document.documentElement.requestFullscreen === "function";
      update("display", {
        state: fullscreenCapable ? "pass" : "warn",
        detail: fullscreenCapable
          ? L("Full-screen mode available", "支持全屏模式")
          : L(
              "Browser cannot lock full screen — stay on this tab",
              "浏览器无法锁定全屏——请留在本标签页",
            ),
      });

      update("mic", { state: "running" });
      /**
       * This site sends `Permissions-Policy: camera=(), microphone=()`, so we
       * must not call getUserMedia: it would be blocked and log a policy
       * violation in the console. The Permissions API reports the state without
       * requesting access, which is all the check needs.
       */
      let micDetail = L(
        "Device permissions cannot be read in this browser",
        "此浏览器无法读取设备权限",
      );
      let micState: Check["state"] = "warn";
      // Read the page's own feature policy first: querying a feature that the
      // site's Permissions-Policy blocks logs a violation in the console.
      const policy = (
        document as Document & {
          featurePolicy?: { allowsFeature: (feature: string) => boolean };
          permissionsPolicy?: { allowsFeature: (feature: string) => boolean };
        }
      ).featurePolicy ?? (
        document as Document & { permissionsPolicy?: { allowsFeature: (feature: string) => boolean } }
      ).permissionsPolicy;
      const micAllowedHere = policy?.allowsFeature ? policy.allowsFeature("microphone") : true;

      if (!micAllowedHere) {
        micState = "warn";
        micDetail = L(
          "Microphone and camera are blocked by this site's security headers — the real client requires both before it opens the paper",
          "麦克风与摄像头被本站安全策略阻止——真实客户端在打开试卷前要求两者可用",
        );
      } else {
        try {
          const status = await navigator.permissions.query({ name: "microphone" as PermissionName });
          if (status.state === "granted") {
            micState = "pass";
            micDetail = L("Microphone permission granted", "麦克风权限已授予");
          } else if (status.state === "denied") {
            micState = "warn";
            micDetail = L(
              "Microphone blocked in the browser — the real client requires a working mic and camera",
              "麦克风被浏览器阻止——真实客户端要求麦克风与摄像头可用",
            );
          } else {
            micState = "warn";
            micDetail = L(
              "Microphone permission not granted yet — the real client asks before it opens the paper",
              "尚未授予麦克风权限——真实客户端会在打开试卷前询问",
            );
          }
        } catch {
          micState = "warn";
        }
      }
      if (cancelled) return;
      update("mic", { state: micState, detail: micDetail });

      update("client", { state: "running" });
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;
      update("client", {
        state: "pass",
        detail: L(
          "Attempt locked to this session · answers save continuously",
          "本次作答已锁定当前会话 · 答案持续自动保存",
        ),
      });
    };
    void run();
    return () => {
      cancelled = true;
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // The checks run once per mounted test client; `L` only selects the copy.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blocking = checks.some((c) => c.state === "fail");

  const startCountdown = () => {
    if (countdown !== null) return;
    if (document.documentElement.requestFullscreen) {
      void document.documentElement.requestFullscreen().catch(() => undefined);
    }
    onLanguage(language);
    setCountdown(3);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((value) => {
        if (value === null) return null;
        if (value <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          onStart(mode);
          return null;
        }
        return value - 1;
      });
    }, 1000);
  };

  /* ── countdown overlay ─────────────────────────────────────────────── */
  if (countdown !== null) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-[#14110f] text-paper">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.28em] text-paper/50 uppercase">
            {L("Test begins in", "考试即将开始")}
          </p>
          <p className="mt-4 font-display text-[120px] leading-none tabular text-paper">{countdown}</p>
          <p className="mt-4 text-[12.5px] text-paper/60">
            {mode === "official"
              ? L(
                  "Timer starts now. Early submission is disabled.",
                  "计时立即开始，无法提前交卷。",
                )
              : L(
                  "Practice conditions. You may end the paper whenever you like.",
                  "练习模式：你可以随时结束试卷。",
                )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-ink">
      {/* client chrome */}
      <header className="relative overflow-hidden border-b border-white/8 bg-[#14110f] text-paper">
        <div aria-hidden className="grid-mesh pointer-events-none absolute inset-0 opacity-[0.14]" />
        <div className="relative mx-auto flex min-h-[60px] max-w-[1000px] flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 sm:py-0">
          <div className="flex items-center gap-2.5">
            <Monitor className="h-4 w-4 text-paper/60" />
            <p className="text-[12.5px] font-medium">
              {L("CSCA Test Client", "CSCA 考试客户端")}
            </p>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] tracking-wide text-paper/70 uppercase">
              {L("simulation", "模拟")}
            </span>
          </div>
          <p className="text-[11px] text-paper/50">
            {subjectName} · {questionCount} {L("questions", "题")} · {durationMin} {L("min", "分钟")}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 sm:py-10">
        {/* steps */}
        <div className="mb-6 flex items-center gap-4">
          <GateClock step={step} />
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">
              {L(`Check-in · step ${step + 1} of 3`, `入场检查 · 第 ${step + 1}/3 步`)}
            </p>
            <p className="mt-1 text-[12.5px] leading-snug text-ink-soft">
              {step === 0 &&
                L(
                  "System check. The real client will not open the paper until this passes.",
                  "系统检查。真实客户端只有通过检查才会打开试卷。",
                )}
              {step === 1 &&
                L(
                  "Integrity commitment. Read it once — the paper is the shorter part of the day.",
                  "诚信承诺。请认真阅读一次——真正考试中它比试卷本身更短。",
                )}
              {step === 2 &&
                L(
                  "Start. Full screen, timer running, no early submission.",
                  "开始。全屏、计时、不可提前交卷。",
                )}
            </p>
          </div>
        </div>

        <ol className="mb-7 flex flex-wrap items-center gap-2 text-[11px] text-ink-faint">
          {[
            L("System check", "系统检查"),
            L("Integrity commitment", "诚信承诺"),
            L("Start", "开始"),
          ].map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold transition-all duration-300",
                  step > i && "bg-jade text-white",
                  step === i && "bg-ink text-paper pulse-dot",
                  step < i && "border border-line-strong text-ink-faint",
                )}
              >
                {step > i ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
              </span>
              <span className={cn(step === i && "font-medium text-ink")}>{label}</span>
              {i < 2 && <ChevronRight className="h-3 w-3 text-ink-faint/60" />}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <section key="check" className="panel animate-in p-5 duration-500 fade-in slide-in-from-bottom-2 sm:p-6">
            <h1 className="font-display text-xl text-ink">
              {L("Pre-test system check", "考前系统检查")}
            </h1>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              {L(
                "The real client will not open the paper until this passes. Run it here to see the same things go wrong before they cost you a sitting.",
                "真实客户端只有通过检查才会打开试卷。先在这里跑一遍，避免在真正考试时才发现问题。",
              )}
            </p>

            <ul className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line">
              {checks.map((check) => (
                <li key={check.id} className="flex items-start gap-3 bg-card px-4 py-3">
                  <span className="mt-0.5">
                    {check.state === "pass" && <CheckCircle2 className="h-4 w-4 text-jade" />}
                    {check.state === "warn" && <AlertTriangle className="h-4 w-4 text-gold" />}
                    {check.state === "fail" && <XCircle className="h-4 w-4 text-vermillion" />}
                    {(check.state === "running" || check.state === "pending") && (
                      <Loader2 className={cn("h-4 w-4 text-ink-faint", check.state === "running" && "animate-spin")} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-ink">{check.label}</p>
                    <p className="mt-0.5 text-[11.5px] text-ink-soft">{check.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { icon: Wifi, text: L("Real client: ≥20 Mbps symmetric", "真实客户端：上下行 ≥20 Mbps") },
                { icon: Monitor, text: L("Windows only — no macOS", "仅支持 Windows，不支持 macOS") },
                { icon: Camera, text: L("Second camera at 45° behind you", "侧后方 45° 第二摄像头") },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-2 rounded-lg border border-line bg-paper-deep/40 px-3 py-2">
                  <item.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" />
                  <p className="text-[11px] leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={blocking}
              className={cn(
                "mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-[13px] font-medium transition sm:w-auto",
                blocking
                  ? "cursor-not-allowed border border-line-strong bg-paper-deep text-ink-soft"
                  : "btn-sheen bg-ink text-paper hover:-translate-y-0.5 hover:bg-ink/85",
              )}
            >
              {L("Continue", "继续")} <ChevronRight className="h-4 w-4" />
            </button>
          </section>
        )}

        {step === 1 && (
          <section key="commit" className="panel animate-in p-5 duration-500 fade-in slide-in-from-bottom-2 sm:p-6">
            <h1 className="flex items-center gap-2 font-display text-xl text-ink">
              <ShieldCheck className="h-5 w-5 text-vermillion" />{" "}
              {L("Integrity commitment", "诚信承诺")}
            </h1>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              {L(
                "Every candidate accepts this form on camera before the timer starts. Read it once — the rules it describes are what CSCA cancels scores over.",
                "每位考生在计时开始前都要在镜头前接受本承诺。请读一遍——CSCA 取消成绩的依据正是这些规则。",
              )}
            </p>

            <div className="mt-4 max-h-[280px] overflow-y-auto rounded-xl border border-line bg-paper-deep/40 p-4 text-[12px] leading-relaxed text-ink-soft">
              <p className="font-medium text-ink">
                {L("I confirm that I will:", "我确认我将：")}
              </p>
              <ul className="mt-2 space-y-1.5">
                {(zh
                  ? [
                      "独自在封闭房间的书桌前考试——不在床上、沙发上或公共场所；",
                      "全程保持两个摄像头和麦克风开启且不被遮挡；",
                      "只使用允许的草稿工具：小白板，或装有可擦写笔和纸张的透明文件袋；",
                      "不使用纸张、笔记、手机、书籍、第二显示器、远程控制或屏幕共享；",
                      "不录制、拍摄、复制或分享任何试题、答案或考试内容；",
                      "不离开座位、不与任何人交谈，也不寻求或提供任何形式的帮助；",
                      "接受：经确认的违规行为将取消成绩，可能撤销已授予的资格，并禁止参加未来的 CSCA 考试。",
                    ]
                  : [
                      "sit the test alone, in an enclosed room, at a desk — not on a bed, sofa or in a public space;",
                      "keep both cameras and microphones on, uncovered, for the whole test;",
                      "use only the approved scratch tool: a small whiteboard or a sheet inside a transparent file bag with an erasable marker;",
                      "not use paper, notes, phones, books, a second monitor, remote access or screen sharing;",
                      "not record, photograph, copy or share any question, answer or part of the test;",
                      "not leave my seat, speak to anyone, or seek or give any form of assistance;",
                      "accept that confirmed misconduct cancels my score, can revoke previously granted qualifications, and can bar me from future CSCA sittings.",
                    ]
                ).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-3">
                {L(
                  "This simulation cannot enforce or verify any of the above. It exists so the rules are read before they matter, and so the timing and interface feel familiar on the day.",
                  "本模拟无法执行或核验以上任何条款。它的存在是为了让你在真正考试前读过规则，并熟悉计时与界面。",
                )}
              </p>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-card px-3.5 py-3">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#14110f]"
              />
              <span className="text-[12.5px] leading-relaxed text-ink">
                {L(
                  "I have read the commitment and I accept it.",
                  "我已阅读并接受上述承诺。",
                )}
              </span>
            </label>

            {/* language + mode */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-card p-3.5">
                <p className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                  <Globe2 className="h-3 w-3" /> {L("Test language", "试卷语言")}
                </p>
                {bilingual && !lockedLanguage ? (
                  <div className="mt-2 flex gap-1.5">
                    {(["en", "zh"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => onLanguage(option)}
                        className={cn(
                          "flex-1 rounded-lg border px-2 py-1.5 text-[12px] font-medium transition",
                          language === option
                            ? "border-ink bg-ink text-paper"
                            : "border-line bg-card text-ink-soft hover:border-line-strong",
                        )}
                      >
                        {option === "en" ? L("English", "英文") : "中文"}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-[12px] text-ink-soft">
                    {!bilingual
                      ? L("Chinese only, as the official paper.", "仅中文，与官方试卷一致。")
                      : language === "zh"
                        ? "中文试卷 · 由中文授课分区固定。"
                        : L(
                            "English paper · fixed by your English-taught section.",
                            "英文试卷 · 由英文授课分区固定。",
                          )}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-line bg-card p-3.5">
                <p className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                  <Clock3 className="h-3 w-3" /> {L("Conditions", "考试模式")}
                </p>
                <div className="mt-2 flex gap-1.5">
                  {(["official", "practice"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setMode(option)}
                      className={cn(
                        "flex-1 rounded-lg border px-2 py-1.5 text-[12px] font-medium capitalize transition",
                        mode === option
                          ? "border-ink bg-ink text-paper"
                          : "border-line bg-card text-ink-soft hover:border-line-strong",
                      )}
                    >
                      {option === "official" ? L("Official", "官方") : L("Practice", "练习")}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">
                  {mode === "official"
                    ? L(
                        "Full screen, timer cannot be paused, no early submission.",
                        "全屏，计时不可暂停，不可提前交卷。",
                      )
                    : L(
                        "Timer still runs, but you can end the paper early.",
                        "计时照常进行，但可以提前结束。",
                      )}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={startCountdown}
                disabled={!accepted}
                className={cn(
                  "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-[13px] font-medium transition",
                  accepted
                    ? "btn-sheen bg-vermillion text-paper shadow-[0_10px_30px_-12px_rgba(168,16,48,0.55)] hover:-translate-y-0.5 hover:bg-vermillion-deep"
                    : "cursor-not-allowed border border-line-strong bg-paper-deep text-ink-soft",
                )}
              >
                <Maximize2 className="h-4 w-4" /> {L("Start the test", "开始考试")}
              </button>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-card px-4 text-[12.5px] font-medium text-ink-soft"
              >
                {L("Back to system check", "返回系统检查")}
              </button>
            </div>
          </section>
        )}

        {/* ticket strip — the real client shows this above the login fields */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Ticket className="h-4 w-4 text-ink-faint" />
            <div>
              <p className="text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                {L("Admission ticket", "准考证")}
              </p>
              <p className="font-mono text-[12.5px] text-ink">
                {ticketOpen ? ticket : `${TICKET_PREFIX}••••••`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTicketOpen((value) => !value)}
            className="rounded-lg border border-line px-2.5 py-1 text-[11px] text-ink-soft hover:border-line-strong"
          >
            {ticketOpen ? L("Hide", "隐藏") : L("Show", "显示")}{" "}
            {L("ticket number", "准考证号")}
          </button>
        </div>
        <p className="mt-3 text-center text-[10.5px] leading-relaxed text-ink-faint">
          {L(
            "Simulation of the CSCA Test Client. It does not proctor, verify identity or connect to CSCA. Your ticket number here is generated locally for realism.",
            "这是 CSCA 考试客户端的模拟，不进行监考、不核验身份，也不连接 CSCA。准考证号仅为模拟效果在本地生成。",
          )}
        </p>
      </main>
    </div>
  );
}


/**
 * Gate clock.
 *
 * The gate is a countdown: system check, integrity commitment, then start. The
 * same clock language as the check-in illustration carries through to the paper
 * itself, and the hand advances with the step the candidate is on.
 */
function GateClock({ step, compact = false }: { step: 0 | 1 | 2; compact?: boolean }) {
  const size = compact ? 64 : 84;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;

  const segments = [
    { from: 0, to: 120, tone: "stroke-ink/30" },
    { from: 120, to: 240, tone: "stroke-indigo" },
    { from: 240, to: 360, tone: "stroke-vermillion" },
  ];

  const point = (degrees: number, radius = r) => {
    const angle = ((degrees - 90) * Math.PI) / 180;
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  };

  const arc = (from: number, to: number) => {
    const start = point(from);
    const end = point(to);
    return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${r} ${r} 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth="3" className="stroke-line" />
      {segments.map((segment, index) => (
        <path
          key={segment.from}
          d={arc(segment.from, segment.to)}
          fill="none"
          strokeWidth={step === index ? 4 : 3}
          strokeLinecap="round"
          className={cn(segment.tone, step > index && "opacity-45", step < index && "opacity-25")}
        />
      ))}
      <circle cx={cx} cy={cy} r="2.5" className="fill-ink/50" />
      <line
        x1={cx}
        y1={cy}
        x2={point(step * 120 + 60).x}
        y2={point(step * 120 + 60).y}
        strokeWidth="1.6"
        className="stroke-ink/70 transition-all duration-500"
      />
    </svg>
  );
}
