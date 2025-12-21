import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ExamInterface from "@/components/ExamInterface";

interface ExamPageProps {
    params: Promise<{ id: string }>;
}

export default async function ExamPage({ params }: ExamPageProps) {
    const { id } = await params;

    const test = await prisma.test.findUnique({
        where: { id },
        include: {
            questions: {
                orderBy: {
                    id: 'asc'
                }
            }
        }
    });

    if (!test) {
        notFound();
    }

    return (
        <ExamInterface
            testId={test.id}
            title={test.title}
            durationMin={test.duration}
            questions={test.questions.map(q => ({
                id: q.id,
                content: q.content,
                options: q.options
            }))}
        />
    );
}
