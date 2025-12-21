// Simple seed without adapter - using prisma from lib
import { prisma } from '../src/lib/prisma.js';

async function main() {
    console.log('🌱 Seeding database...')

    // Create a simple test
    const test = await prisma.test.create({
        data: {
            title: "CSCA Mathematics Mock Test 1",
            subject: "Mathematics",
            duration: 60,
            totalMarks: 100,
            questionCount: 5,
            questions: {
                create: [
                    {
                        content: "If $$ f(x) = 2x + 3 $$, what is $$ f(5) $$?",
                        options: ["10", "13", "8", "15"],
                        correctIdx: 1,
                        marks: 2,
                        explanation: "$$ f(5) = 2(5) + 3 = 10 + 3 = 13 $$",
                        difficulty: "Easy"
                    },
                    {
                        content: "Solve for x: $$ 3x - 7 = 14 $$",
                        options: ["5", "7", "21", "4"],
                        correctIdx: 1,
                        marks: 2,
                        explanation: "$$ 3x = 21 $$, so $$ x = 7 $$",
                        difficulty: "Easy"
                    },
                    {
                        content: "What is the value of $$ \\sqrt{144} $$?",
                        options: ["10", "11", "12", "13"],
                        correctIdx: 2,
                        marks: 2,
                        explanation: "$$ \\sqrt{144} = 12 $$",
                        difficulty: "Easy"
                    }
                ]
            }
        }
    })

    console.log('✅ Seeding complete! Created test:', test.title)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
