require('dotenv').config();
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedSubject(filePath, subjectName, testTitlePrefix, defaultTopic) {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
        console.warn(`${filePath} not found! Skipping ${subjectName}.`);
        return;
    }
    const quizData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

    // Group by set_id
    const setsMap = new Map();
    quizData.forEach(q => {
        // Fallback for set_id if missing (e.g. simple 15 question list)
        const setId = q.set_id || 'default_set';
        const setName = q.set_name || 'Standard Set';

        if (!setsMap.has(setId)) {
            setsMap.set(setId, { name: setName, questions: [] });
        }
        setsMap.get(setId).questions.push(q);
    });

    for (const [setId, setData] of setsMap.entries()) {
        console.log(`Creating ${subjectName} Test: ${setData.name}... (${setData.questions.length} questions)`);
        await prisma.test.create({
            data: {
                title: `${testTitlePrefix} ${setData.name}`,
                subject: subjectName,
                duration: subjectName.includes('Chinese') ? 90 : 60, // 90 mins for Chinese, 60 for others
                totalMarks: 100,
                questionCount: setData.questions.length,
                questions: {
                    create: setData.questions.map(q => {
                        // Determine correct index
                        let correctIdx = 0;
                        if (q.options && q.correct_answer) {
                            correctIdx = q.options.indexOf(q.correct_answer);
                            if (correctIdx === -1) correctIdx = 0; // Fallback
                        }

                        return {
                            content: q.question,
                            options: q.options || [],
                            correctIdx: correctIdx,
                            marks: 2, // Default marks
                            explanation: q.explanation || '',
                            difficulty: q.difficulty || 'Medium',
                            topic: q.topic || defaultTopic
                        };
                    })
                }
            }
        });
    }
}

async function main() {
    console.log('🌱 Starting Seeding of Questions and Users...');

    // 0. Seed Users
    console.log('Seeding demo users...');
    const hashedPassword = await bcrypt.hash("password123", 10);

    await prisma.user.upsert({
        where: { email: 'student@cscamaster.com' },
        update: { password: hashedPassword, role: 'STUDENT' },
        create: {
            email: 'student@cscamaster.com',
            password: hashedPassword,
            name: 'Default Student',
            role: 'STUDENT',
            whatsapp: '+8801700000000',
            major: 'Engineering'
        }
    });

    await prisma.user.upsert({
        where: { email: 'admin@cscamaster.com' },
        update: { password: hashedPassword, role: 'ADMIN' },
        create: {
            email: 'admin@cscamaster.com',
            password: hashedPassword,
            name: 'System Admin',
            role: 'ADMIN'
        }
    });
    console.log('✅ Users seeded.');

    // Clear existing data
    console.log('Clearing existing data (Attempts, Questions, Tests)...');
    await prisma.attempt.deleteMany({});
    await prisma.question.deleteMany({});
    await prisma.test.deleteMany({});

    // 1. Seed Original Subjects
    await seedSubject('./seeds/full_math_quiz.json', 'Mathematics', 'CSCA Mathematics Mock', 'Algebra & Calculus');
    await seedSubject('./seeds/full_physics_quiz.json', 'Physics', 'CSCA Physics Mock', 'General Physics');
    await seedSubject('./seeds/full_chemistry_quiz.json', 'Chemistry', 'CSCA Chemistry Mock', 'General Chemistry');

    // 2. Seed NEW Generated Subjects
    await seedSubject('./seeds/generated_math_questions.json', 'Mathematics', 'CSCA Extra Math', 'General Math');
    await seedSubject('./seeds/generated_physics_questions.json', 'Physics', 'CSCA Extra Physics', 'General Physics');
    await seedSubject('./seeds/generated_chemistry_questions.json', 'Chemistry', 'CSCA Extra Chemistry', 'General Chemistry');
    await seedSubject('./seeds/generated_chinese_humanities_15_sets.json', 'Professional Chinese (Humanities)', 'CSCA Prof. Chinese (Arts)', 'General Humanities');
    await seedSubject('./seeds/generated_chinese_science_questions.json', 'Professional Chinese (Science)', 'CSCA Prof. Chinese (Sci/Eng)', 'General Science Chinese');







    console.log('✅ Seeding complete!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error('Seed failed:', e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
