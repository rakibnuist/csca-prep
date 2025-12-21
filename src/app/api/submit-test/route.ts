import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        const sessionUserId = session?.userId as string;

        const body = await request.json();
        console.log('Submission Body:', JSON.stringify(body, null, 2));

        const { testId, answers } = body;
        let { userId, timeTaken } = body;

        // Prioritize session user ID
        if (sessionUserId) {
            userId = sessionUserId;
        }

        // Ensure timeTaken is a safe integer
        if (typeof timeTaken !== 'number' || isNaN(timeTaken)) {
            timeTaken = 0;
        } else {
            timeTaken = Math.round(timeTaken);
        }

        if (!testId || !answers) {
            return NextResponse.json({ error: 'Missing testId or answers' }, { status: 400 });
        }

        // 1. Fetch real test data
        const test = await prisma.test.findUnique({
            where: { id: testId },
            include: { questions: true }
        });

        if (!test) {
            console.error(`Test not found: ${testId}`);
            return NextResponse.json({ error: 'Test not found. It might have been deleted or reset.' }, { status: 404 });
        }

        // 2. Real Grading Logic
        let score = 0;
        test.questions.forEach(q => {
            const userChoiceIdx = answers[q.id];
            // Only score if the user selected an option
            if (userChoiceIdx !== undefined && userChoiceIdx !== null) {
                const isCorrect = Number(userChoiceIdx) === q.correctIdx;
                if (isCorrect) {
                    score += q.marks;
                }
            }
        });

        // 3. Handle User Context
        if (!userId) {
            let defaultUser = await prisma.user.findFirst({
                where: { email: 'student@csca-prep.com' }
            });

            if (!defaultUser) {
                try {
                    defaultUser = await prisma.user.create({
                        data: {
                            email: 'student@csca-prep.com',
                            name: 'Default Student',
                            whatsapp: '+8801700000000',
                            major: 'Engineering'
                        }
                    });
                } catch (userErr) {
                    console.error('Failed to create default user:', userErr);
                    // If creation fails due to race condition, try to find it again
                    defaultUser = await prisma.user.findFirst({
                        where: { email: 'student@csca-prep.com' }
                    });
                }
            }

            if (!defaultUser) {
                throw new Error('User context could not be established');
            }
            userId = defaultUser.id;
        }

        // 4. Save Attempt to DB
        // Use a more resilient create call
        const attemptData: any = {
            userId: userId,
            testId: testId,
            score: score,
            answers: answers,
        };

        // Only add timeTaken if it exists in the schema to prevent 500s on out-of-sync clients
        // (Though we want it to work, if the client is really old it might fail here)
        attemptData.timeTaken = timeTaken;

        const attempt = await prisma.attempt.create({
            data: attemptData
        });

        return NextResponse.json({
            success: true,
            score,
            totalMarks: test.totalMarks || 100,
            percentage: test.totalMarks > 0 ? (score / test.totalMarks) * 100 : 0,
            attemptId: attempt?.id
        });

    } catch (error: any) {
        console.error('Detailed Submission Error:', {
            message: error.message,
            stack: error.stack,
            code: error.code // Prisma error codes
        });

        // Return more helpful error in non-production or for debugging
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}
