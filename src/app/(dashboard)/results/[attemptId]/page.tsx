import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, History } from "lucide-react";
import Link from "next/link";
import { MathRender } from "@/components/MathRender";
import { ReportActions } from "@/components/ReportActions";
import { TopicAnalysis } from "@/components/TopicAnalysis";

interface PageProps {
    params: Promise<{ attemptId: string }>;
}

export default async function ResultDetailPage({ params }: PageProps) {
    const { attemptId } = await params;
    const session = await getSession();
    let userId = session?.userId as string;

    // Fallback logic for testing
    if (!userId) {
        const firstUser = await prisma.user.findFirst();
        userId = firstUser?.id || "";
    }

    const attempt = await prisma.attempt.findUnique({
        where: { id: attemptId },
        include: {
            test: {
                include: {
                    questions: {
                        orderBy: { id: 'asc' }
                    }
                }
            }
        }
    });

    if (!attempt || attempt.userId !== userId) {
        notFound();
    }

    const { test, score, answers, completedAt } = attempt;
    const userAnswers = answers as Record<string, number>;
    const percentage = Math.round((score / test.totalMarks) * 100);
    const isPassed = percentage >= 60;

    // Type-safe retrieval of timeTaken
    const timeTaken = (attempt as any).timeTaken || 0;

    // Format timeTaken
    const formatDuration = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}m ${s}s`;
    };

    // Performance Calculations
    let correctCount = 0;
    const topicMap: Record<string, { correct: number; total: number; score: number }> = {};

    test.questions.forEach(q => {
        const isCorrect = userAnswers[q.id] === q.correctIdx;
        if (isCorrect) correctCount++;

        const topic = (q as any).topic || "Algebra & Calculus";
        if (!topicMap[topic]) topicMap[topic] = { correct: 0, total: 0, score: 0 };

        topicMap[topic].total += q.marks;
        if (isCorrect) {
            topicMap[topic].correct += 1; // Count of correct questions
            topicMap[topic].score += q.marks; // Marks obtained
        }
    });

    const topicPerformance = Object.entries(topicMap).map(([topic, data]) => ({
        topic,
        correct: data.correct,
        total: data.total, // This is total possible marks for this topic in this test
        score: data.score
    }));

    const incorrectCount = test.questions.length - correctCount;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* 1. HEADER / STATUS BAR */}
            <header className={`py-12 ${isPassed ? 'bg-blue-600' : 'bg-slate-900'} text-white text-center px-4 relative overflow-hidden print:bg-white print:text-slate-900 print:py-6 print:border-b-2 print:border-slate-100`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 print:hidden"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/results" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors print:hidden">
                        <History className="w-4 h-4 mr-2" /> Back to History
                    </Link>
                    <div className="mb-4">
                        <Badge variant="outline" className="border-white/30 text-white bg-white/10 px-4 py-1 print:border-slate-200 print:text-blue-600 print:bg-blue-50">
                            {test.title} • {test.subject}
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white print:text-slate-900">
                        {isPassed ? "Examination Passed" : "Attempt Completed"}
                    </h1>
                    <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto print:text-slate-500">
                        Your performance report generated on {new Date(completedAt).toLocaleDateString()}.
                        Review your mistakes below to improve your CSCA track accuracy.
                    </p>

                    <div className="flex justify-center gap-6">
                        <div className="bg-white p-6 rounded-2xl min-w-[140px] shadow-xl text-slate-900 border border-slate-100">
                            <div className="text-4xl font-black">{percentage}%</div>
                            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Final Score</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl min-w-[140px] border border-white/20 print:border-slate-100 print:text-slate-900">
                            <div className="text-4xl font-black">{formatDuration(timeTaken)}</div>
                            <div className="text-[10px] uppercase font-bold text-white/50 tracking-widest mt-1 print:text-slate-400">Time Spent</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COL: Question Review & Analysis */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Summary Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex justify-around items-center print:border-slate-100">
                            <div className="text-center px-4">
                                <div className="text-emerald-600 font-black text-3xl">{correctCount}</div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Correct
                                </div>
                            </div>
                            <div className="h-10 w-[1px] bg-slate-100"></div>
                            <div className="text-center px-4">
                                <div className="text-rose-500 font-black text-3xl">{incorrectCount}</div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
                                    <XCircle className="w-3 h-3" /> Errors
                                </div>
                            </div>
                            <div className="h-10 w-[1px] bg-slate-100"></div>
                            <div className="text-center px-4">
                                <div className="text-blue-600 font-black text-3xl">{formatDuration(timeTaken)}</div>
                                <div className="text-[10px] uppercase font-bold text-slate-400">Duration</div>
                            </div>
                        </div>

                        {/* TOPIC ANALYSIS SYSTEM */}
                        <section className="print:mt-8">
                            <TopicAnalysis performance={topicPerformance} />
                        </section>

                        {/* Question Review List */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Technical Review</h2>
                            {test.questions.map((q, idx) => {
                                const userChoice = userAnswers[q.id];
                                const isCorrect = userChoice === q.correctIdx;

                                return (
                                    <Card key={q.id} className={`overflow-hidden border-2 transition-all ${isCorrect ? 'border-transparent shadow-sm' : 'border-rose-100 bg-rose-50/10 shadow-md'} print:shadow-none print:border-slate-100 print:mb-8`}>
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question {idx + 1}</span>
                                                    <Badge variant="outline" className="text-[9px] uppercase font-bold text-slate-400 border-slate-200">{(q as any).topic || "Algebra"}</Badge>
                                                </div>
                                                {isCorrect ? (
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold">ACCURATE</Badge>
                                                ) : (
                                                    <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none font-bold">INCORRECT</Badge>
                                                )}
                                            </div>
                                            <div className="text-slate-800 text-lg leading-relaxed">
                                                <MathRender content={q.content} />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {/* Options Grid */}
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {q.options.map((opt, oIdx) => {
                                                    const isUserPick = userChoice === oIdx;
                                                    const isCorrectAns = q.correctIdx === oIdx;

                                                    let statusClass = "border-slate-100 bg-slate-50";
                                                    if (isCorrectAns) statusClass = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500 font-semibold";
                                                    if (isUserPick && !isCorrectAns) statusClass = "border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500 font-semibold";

                                                    return (
                                                        <div key={oIdx} className={`p-4 rounded-xl border flex items-start gap-3 text-sm transition-all ${statusClass}`}>
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold ${isCorrectAns ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                                                {String.fromCharCode(65 + oIdx)}
                                                            </div>
                                                            <MathRender content={opt} />
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Explanation */}
                                            <div className="mt-6 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                                                <div className="text-slate-700 text-sm leading-relaxed">
                                                    <MathRender content={q.explanation || "No advanced explanation available for this question yet."} />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COL: Actions & Resources */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-900 to-blue-900 text-white relative overflow-hidden group print:hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
                            <CardHeader>
                                <h3 className="text-xl font-bold">Admission Help</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-blue-100 text-sm leading-relaxed">
                                    {isPassed
                                        ? "Excellent score! You are eligible for CSC scholarship tracks. Connect with our counselors to start your university application."
                                        : "If you don't pass the CSCA Exam, don't worry! We have universities who accept students without CSCA Test. Contact us to explore your options."}
                                </p>
                                <Link href="https://wa.me/8801700000000" className="block w-full">
                                    <button className="w-full py-3 bg-white text-indigo-900 font-black rounded-xl hover:bg-white/90 transition-all uppercase text-xs tracking-widest shadow-lg">
                                        WhatsApp Counselor
                                    </button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm print:hidden sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Report Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ReportActions testId={test.id} />
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
