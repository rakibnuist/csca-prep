import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BrainCircuit, GraduationCap, Target, Clock, Filter, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getTestsData() {
    const session = await getSession();
    let userId = session?.userId as string;

    if (!userId) {
        const firstUser = await prisma.user.findFirst({ where: { email: 'student@cscamaster.com' } });
        userId = firstUser?.id || "";
    }

    const [testsRaw, userAttempts] = await Promise.all([
        prisma.test.findMany({
            include: { _count: { select: { questions: true } } },
        }),
        userId ? prisma.attempt.findMany({
            where: { userId },
            select: { id: true, testId: true, score: true },
            orderBy: { completedAt: 'desc' }
        }) : Promise.resolve([])
    ]);

    // Sort naturally: 1, 2, 3 ... 10, 11
    const tests = testsRaw.sort((a, b) => {
        const aNum = parseInt(a.title.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.title.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
    });

    const attemptMap = new Map();
    userAttempts.forEach(a => { if (!attemptMap.has(a.testId)) attemptMap.set(a.testId, { score: a.score, id: a.id }); });

    return tests.map((test, index) => {
        const attempt = attemptMap.get(test.id);
        const totalMarks = test.totalMarks || 100;
        return {
            id: test.id,
            attemptId: attempt?.id,
            index: index + 1,
            title: test.title,
            subject: test.subject,
            duration: test.duration,
            totalMarks: totalMarks,
            status: attempt !== undefined ? "Completed" : "Available",
            score: attempt !== undefined ? Math.round((attempt.score / totalMarks) * 100) : null
        };
    });
}

export default async function TestsPage() {
    const tests = await getTestsData();

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Header Area */}
            <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 border-b">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                            Practice Arena
                        </h1>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">Select a mock set to begin your timed examination.</p>
                    </div>
                    <div className="flex gap-3 sm:gap-4 text-xs font-bold uppercase tracking-tighter text-slate-400">
                        <div className="flex items-center gap-1"><Target className="w-3 h-3 text-blue-500" /> {tests.length} Total</div>
                        <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> {tests.filter(t => t.status === 'Completed').length} Done</div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                <Tabs defaultValue="all" className="space-y-6">
                    <TabsList className="bg-slate-100/50 p-1 rounded-lg flex-wrap h-auto">
                        <TabsTrigger value="all" className="font-semibold px-4 py-2">All</TabsTrigger>
                        <TabsTrigger value="Mathematics" className="font-semibold px-4 py-2">Math</TabsTrigger>
                        <TabsTrigger value="Physics" className="font-semibold px-4 py-2">Physics</TabsTrigger>
                        <TabsTrigger value="Chemistry" className="font-semibold px-4 py-2">Chemistry</TabsTrigger>
                        <TabsTrigger value="Professional Chinese (Humanities)" className="font-semibold px-4 py-2">Chinese (Arts)</TabsTrigger>
                        <TabsTrigger value="Professional Chinese (Science)" className="font-semibold px-4 py-2">Chinese (Sci)</TabsTrigger>
                    </TabsList>

                    {["all", "Mathematics", "Physics", "Chemistry", "Professional Chinese (Humanities)", "Professional Chinese (Science)"].map((subjectTab) => (
                        <TabsContent key={subjectTab} value={subjectTab} className="mt-0 outline-none">
                            {/* Desktop Table View */}
                            <div className="hidden md:block border rounded-xl overflow-hidden bg-white shadow-sm">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    <div className="col-span-1">#</div>
                                    <div className="col-span-5">Mock Examination Set</div>
                                    <div className="col-span-1 text-center">Dur</div>
                                    <div className="col-span-2 text-center">Performance</div>
                                    <div className="col-span-3 text-right">Action</div>
                                </div>

                                {/* List Body */}
                                <div className="divide-y">
                                    {tests
                                        .filter(t => subjectTab === 'all' || t.subject === subjectTab)
                                        .map((test) => (
                                            <div key={test.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group">
                                                <div className="col-span-1 font-mono text-slate-300 group-hover:text-blue-500 transition-colors">
                                                    {test.index < 10 ? `0${test.index}` : test.index}
                                                </div>
                                                <div className="col-span-5">
                                                    <p className="font-bold text-slate-800 text-sm">{test.title}</p>
                                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{test.subject}</span>
                                                </div>
                                                <div className="col-span-1 text-center">
                                                    <div className="flex items-center justify-center gap-1 text-slate-500 text-xs">
                                                        {test.duration}m
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-center">
                                                    {test.score !== null ? (
                                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                                                            <CheckCircle2 className="w-3 h-3" /> {test.score}%
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-300 text-xs">—</span>
                                                    )}
                                                </div>
                                                <div className="col-span-3 text-right">
                                                    <Link href={`/exam/${test.id}`}>
                                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 h-7 rounded-md">
                                                            {test.status === 'Completed' ? 'Retake' : 'Start'}
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-3">
                                {tests
                                    .filter(t => subjectTab === 'all' || t.subject === subjectTab)
                                    .map((test) => (
                                        <div key={test.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-mono text-xs text-slate-400">
                                                            {test.index < 10 ? `0${test.index}` : test.index}
                                                        </span>
                                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">
                                                            {test.subject}
                                                        </span>
                                                    </div>
                                                    <p className="font-bold text-slate-800 text-sm">{test.title}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-3 text-xs text-slate-500">
                                                    <span>{test.duration}m</span>
                                                    {test.score !== null && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                                                            <CheckCircle2 className="w-3 h-3" /> {test.score}%
                                                        </span>
                                                    )}
                                                </div>
                                                <Link href={`/exam/${test.id}`}>
                                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1.5 h-auto rounded-md">
                                                        {test.status === 'Completed' ? 'Retake' : 'Start'}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}
