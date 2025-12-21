import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { email, password, firstName, lastName, whatsapp, major } = await req.json();

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);
        const fullName = `${firstName} ${lastName}`;

        // Create user
        // Using Type Assertion to bypass potentially stale generated types in the IDE/Next.js cache
        const userData: any = {
            email,
            password: hashedPassword,
            name: fullName,
            whatsapp: whatsapp || null,
            major: major || null,
            role: 'STUDENT',
        };

        const user = await (prisma.user as any).create({
            data: userData
        });

        // Create session
        await createSession({
            userId: user.id,
            email: user.email,
            role: (user as any).role,
            name: user.name
        });

        return NextResponse.json({
            success: true,
            role: (user as any).role
        });
    } catch (error: any) {
        console.error('Registration error:', error);
        const errorMessage = error.message?.split('\n')[0] || 'Registration failed';
        return NextResponse.json({
            error: errorMessage
        }, { status: 500 });
    }
}
