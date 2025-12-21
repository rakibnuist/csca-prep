import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// Enable caching for this route - revalidate every 60 seconds
export const revalidate = 60;

export async function GET() {
    try {
        const session = await getSession();

        // Strict Auth Check - No Fallbacks
        if (!session || !session.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.userId as string; // Explicit cast after check

        const userProfile = await prisma.user.findUnique({ where: { id: userId } });
        if (!userProfile) {
            return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
        }

        // 1. Fetch performance history
        const attempts = await prisma.attempt.findMany({
            where: { userId },
            include: {
                test: {
                    select: {
                        subject: true,
                        totalMarks: true,
                        title: true
                    }
                }
            },
            orderBy: { completedAt: 'asc' }
        });

        // 2. Process data for Performance Trend Chart
        const performanceData = attempts.map((a, i) => ({
            name: `Test ${i + 1}`,
            score: Math.round((a.score / a.test.totalMarks) * 100)
        }));

        // 3. Calculate Subject Mastery
        const subjectConfigs = [
            { title: "Mathematics", color: "bg-blue-600" },
            { title: "Physics", color: "bg-indigo-600" },
            { title: "Chemistry", color: "bg-emerald-600" },
            { title: "Professional Chinese (Humanities)", color: "bg-amber-600" },
            { title: "Professional Chinese (Science)", color: "bg-red-600" }
        ];

        const subjectMastery = subjectConfigs.map(config => {
            const subjectAttempts = attempts.filter(a => a.test.subject === config.title);

            if (subjectAttempts.length === 0) {
                return { title: config.title, score: 0, color: config.color };
            }

            const totalScore = subjectAttempts.reduce((acc: number, curr: any) => acc + curr.score, 0);
            const totalMax = subjectAttempts.reduce((acc: number, curr: any) => acc + curr.test.totalMarks, 0);
            const percentage = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

            return {
                title: config.title,
                score: percentage,
                color: config.color
            };
        });

        // 4. Overall Stats
        const attemptsCount = attempts.length;
        const overallTotalScore = attempts.reduce((acc: number, a: any) => acc + a.score, 0);
        const overallTotalMax = attempts.reduce((acc: number, a: any) => acc + a.test.totalMarks, 0);
        const avgScore = overallTotalMax > 0 ? Math.round((overallTotalScore / overallTotalMax) * 100) : 0;

        return NextResponse.json({
            user: { name: userProfile.name, email: userProfile.email },
            performanceData,
            subjectMastery,
            testsCompleted: attemptsCount,
            avgScore
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
