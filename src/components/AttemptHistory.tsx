import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowUpRight, Calendar, Target, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

export default async function AttemptHistory() {
    const session = await getSession();
    let userId = session?.userId as string;

    if (!userId) {
        const firstUser = await prisma.user.findFirst();
        userId = firstUser?.id || "";
    }

    const attempts = await prisma.attempt.findMany({
        where: { userId },
        include: { test: true },
        orderBy: { completedAt: 'desc' },
        take: 10
    });

    if (attempts.length === 0) {
        return (
            <Card className="p-12 text-center border-dashed border-2 bg-slate-50/50">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No Exam History</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm mt-1">
                    Your detailed performance reports will appear here after your first mock exam.
                </p>
                <Link href="/tests">
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">Start First Test</Button>
                </Link>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
                    <Target className="w-5 h-5 text-blue-600" /> Recent Submissions
                </h2>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing last {attempts.length} sets</span>
            </div>

            <div className="grid gap-3">
                {attempts.map((attempt) => {
                    const percentage = Math.round((attempt.score / attempt.test.totalMarks) * 100);
                    const isPassed = percentage >= 60;

                    return (
                        <Link key={attempt.id} href={`/results/${attempt.id}`}>
                            <Card className="p-4 hover:shadow-md transition-all hover:border-blue-200 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-black ${isPassed ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                            <span className="text-lg">{percentage}</span>
                                            <span className="text-[8px] uppercase tracking-tighter">%</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{attempt.test.title}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase tracking-widest">{attempt.test.subject}</span>
                                                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                                                    <Calendar className="w-3 h-3" /> {new Date(attempt.completedAt).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium border-l pl-3">
                                                    <Clock className="w-3 h-3" /> {Math.floor(((attempt as any).timeTaken || 0) / 60)}m {((attempt as any).timeTaken || 0) % 60}s
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className={`font-bold text-[10px] border-none ${isPassed ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-50'}`}>
                                            {isPassed ? 'PASSED' : 'COMPLETED'}
                                        </Badge>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
