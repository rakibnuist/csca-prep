import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Trophy,
    Target,
    Clock,
    ArrowRight,
    BookOpen,
    AlertCircle,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { TopicAnalysis } from '@/components/dashboard/TopicAnalysis';


// Enable page caching with revalidation every 60 seconds
export const revalidate = 60;

async function getDashboardStats() {
    const session = await getSession();

    if (!session || !session.userId) {
        redirect('/sign-in');
    }

    const userId = session.userId as string;

    const [userProfile, totalTestsCount] = await Promise.all([
        prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true }
        }),
        prisma.test.count() // Get actual total tests from database
    ]);

    if (!userProfile) {
        redirect('/sign-in');
    }

    // Fetch performance history with optimized query including questions for topic analysis
    const attempts = await prisma.attempt.findMany({
        where: { userId },
        include: {
            test: {
                select: {
                    subject: true,
                    totalMarks: true,
                    title: true,
                    questions: {
                        select: {
                            id: true,
                            topic: true,
                            marks: true,
                            correctIdx: true
                        }
                    }
                }
            }
        },
        orderBy: { completedAt: 'asc' }
    });

    // Process data for Performance Trend Chart (limit to last 10 for readability)
    const recentAttempts = attempts.slice(-10);
    const performanceData = recentAttempts.map((a, i) => ({
        name: `Test ${attempts.length - recentAttempts.length + i + 1}`,
        score: Math.round((a.score / a.test.totalMarks) * 100)
    }));

    // Calculate Subject Mastery
    const subjectConfigs = [
        { title: "Mathematics", color: "bg-blue-600" },
        { title: "Physics", color: "bg-indigo-600" },
        { title: "Chemistry", color: "bg-emerald-600" }
    ];

    const subjectMastery = subjectConfigs.map(config => {
        const subjectAttempts = attempts.filter(a => a.test.subject === config.title);

        if (subjectAttempts.length === 0) {
            return { title: config.title, score: 0, color: config.color, attempts: 0 };
        }

        const totalScore = subjectAttempts.reduce((acc: number, curr: any) => acc + curr.score, 0);
        const totalMax = subjectAttempts.reduce((acc: number, curr: any) => acc + curr.test.totalMarks, 0);
        const percentage = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

        return {
            title: config.title,
            score: percentage,
            color: config.color,
            attempts: subjectAttempts.length
        };
    });

    // Calculate Topic-wise Analysis grouped by subject
    const topicBySubjectMap: Record<string, Record<string, { correct: number; total: number; attempted: number }>> = {};

    attempts.forEach(attempt => {
        const userAnswers = attempt.answers as Record<string, number>;
        const subject = attempt.test.subject;

        if (!topicBySubjectMap[subject]) {
            topicBySubjectMap[subject] = {};
        }

        attempt.test.questions.forEach(q => {
            const topic = q.topic || "General";
            if (!topicBySubjectMap[subject][topic]) {
                topicBySubjectMap[subject][topic] = { correct: 0, total: 0, attempted: 0 };
            }

            topicBySubjectMap[subject][topic].total += q.marks;

            const userAnswer = userAnswers[q.id];
            if (userAnswer !== undefined && userAnswer !== null) {
                topicBySubjectMap[subject][topic].attempted += 1;
                if (userAnswer === q.correctIdx) {
                    topicBySubjectMap[subject][topic].correct += q.marks;
                }
            }
        });
    });

    // Convert to structured format
    const topicAnalysisBySubject = Object.entries(topicBySubjectMap).map(([subject, topics]) => ({
        subject,
        topics: Object.entries(topics)
            .map(([topic, data]) => ({
                topic,
                score: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
                correct: data.correct,
                total: data.total,
                attempted: data.attempted
            }))
            .sort((a, b) => b.score - a.score)
    }));

    // Overall Stats
    const attemptsCount = attempts.length;
    const overallTotalScore = attempts.reduce((acc: number, a: any) => acc + a.score, 0);
    const overallTotalMax = attempts.reduce((acc: number, a: any) => acc + a.test.totalMarks, 0);
    const avgScore = overallTotalMax > 0 ? Math.round((overallTotalScore / overallTotalMax) * 100) : 0;

    // Calculate days until exam (assuming exam is in April 2026)
    const examDate = new Date('2026-04-15');
    const today = new Date();
    const daysRemaining = Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    return {
        user: { name: userProfile.name, email: userProfile.email },
        performanceData,
        subjectMastery,
        topicAnalysisBySubject,
        testsCompleted: attemptsCount,
        totalTests: totalTestsCount,
        avgScore,
        daysRemaining
    };
}


export default async function DashboardPage() {
    const stats = await getDashboardStats();

    // Extract stats with proper defaults
    const avgScore = stats.avgScore;
    const testsCompleted = stats.testsCompleted;
    const totalTests = stats.totalTests;
    const performanceData = stats.performanceData;
    const subjectMastery = stats.subjectMastery;
    const topicAnalysisBySubject = stats.topicAnalysisBySubject;
    const daysRemaining = stats.daysRemaining;
    const hasAttempts = testsCompleted > 0;

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8 pt-20 sm:pt-24">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

                {/* 1. HEADER SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{stats.user.name || "Student"}</h1>
                        <p className="text-sm sm:text-base text-slate-500 mt-1">
                            Exam Countdown: <span className="font-bold text-blue-600">{daysRemaining} Days</span> remaining.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <Link href="/syllabus" className="w-full sm:w-auto">
                            <Button variant="outline" className="bg-white w-full sm:w-auto">
                                <BookOpen className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Review </span>Syllabus
                            </Button>
                        </Link>
                        <Link href="/tests" className="w-full sm:w-auto">
                            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md w-full sm:w-auto">
                                <Clock className="mr-2 h-4 w-4" /> Take New Test
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* 2. STATS OVERVIEW CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs sm:text-sm font-medium text-slate-500">Total Progress</CardTitle>
                            <Target className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl sm:text-2xl font-bold">{testsCompleted} / {totalTests} Tests</div>
                            <Progress value={totalTests > 0 ? (testsCompleted / totalTests) * 100 : 0} className="mt-2 h-2" />
                            <p className="text-xs text-slate-500 mt-2">
                                {totalTests > 0 ? Math.round((testsCompleted / totalTests) * 100) : 0}% of question bank completed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs sm:text-sm font-medium text-slate-500">Average Score</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl sm:text-2xl font-bold">{avgScore}%</div>
                            <p className="text-xs text-slate-500 mt-2">
                                {hasAttempts ? `Based on ${testsCompleted} test${testsCompleted !== 1 ? 's' : ''}` : 'Complete a test to see your score'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className={`border-l-4 ${avgScore > 75 ? 'border-l-green-500' : 'border-l-amber-500'} bg-slate-50`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs sm:text-sm font-bold text-slate-700">Scholarship Probability</CardTitle>
                            <Trophy className={`h-4 w-4 ${avgScore > 75 ? 'text-green-600' : 'text-amber-600'}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg sm:text-2xl font-bold text-slate-900">
                                {!hasAttempts ? 'Not Yet Rated' : avgScore >= 80 ? 'High (Type A)' : avgScore >= 60 ? 'Medium (Type B)' : 'Developing'}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                {!hasAttempts
                                    ? "Complete tests to see your scholarship potential"
                                    : avgScore >= 80
                                        ? "You qualify for Full Tuition Coverage!"
                                        : avgScore >= 60
                                            ? "Good progress! Aim for 80%+ for Type A scholarships."
                                            : "Keep practicing to improve your scholarship chances."}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">Performance Trend</CardTitle>
                            <CardDescription className="text-sm">Your mock test scores tracked over time.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[250px] sm:h-[300px]">
                            <PerformanceChart data={performanceData} />
                        </CardContent>
                    </Card>

                    <div className="space-y-4 sm:space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg">Recommended Focus</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 sm:space-y-4">
                                {!hasAttempts ? (
                                    <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-blue-900 text-xs sm:text-sm">Get Started</h4>
                                            <p className="text-blue-700 text-xs mt-1">Take your first practice test to get personalized recommendations.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {avgScore < 70 && (
                                            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-100">
                                                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-amber-900 text-xs sm:text-sm">Boost Your Score</h4>
                                                    <p className="text-amber-700 text-xs mt-1">
                                                        {subjectMastery.sort((a, b) => a.score - b.score)[0].score < 60
                                                            ? `Focus on ${subjectMastery.sort((a, b) => a.score - b.score)[0].title} - your weakest subject.`
                                                            : 'Review fundamental concepts across all subjects.'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {avgScore >= 70 && avgScore < 80 && (
                                            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-100">
                                                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-green-900 text-xs sm:text-sm">Almost There!</h4>
                                                    <p className="text-green-700 text-xs mt-1">You're close to Type A scholarship level. Push for 80%+!</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
                                            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
                                            <div>
                                                <h4 className="font-semibold text-blue-900 text-xs sm:text-sm">Next Steps</h4>
                                                <p className="text-blue-700 text-xs mt-1">
                                                    {testsCompleted < 5
                                                        ? 'Complete more practice tests to build confidence.'
                                                        : 'Focus on time management and accuracy.'}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>


                    </div>
                </div>

                {/* 4. SUBJECT PROGRESS GRID */}
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Subject Mastery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {subjectMastery.map((subject: any) => (
                            <div key={subject.title} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-sm sm:text-base text-slate-700">{subject.title}</span>
                                    <span className="text-sm font-semibold text-slate-500">{subject.score}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3">
                                    <div className={`${subject.color} h-2.5 rounded-full transition-all`} style={{ width: `${subject.score}%` }}></div>
                                </div>
                                <p className="text-xs text-slate-400 mb-3">
                                    {subject.attempts > 0
                                        ? `${subject.attempts} test${subject.attempts !== 1 ? 's' : ''} completed`
                                        : 'No tests completed yet'}
                                </p>
                                <Link href="/tests">
                                    <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 text-sm h-8">
                                        {subject.attempts > 0 ? 'Continue Practice' : 'Start Practice'} <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. TOPIC-WISE ANALYSIS */}
                {hasAttempts && topicAnalysisBySubject.length > 0 && (
                    <TopicAnalysis data={topicAnalysisBySubject} testsCompleted={testsCompleted} />
                )}


            </div>
        </div>
    );
}
