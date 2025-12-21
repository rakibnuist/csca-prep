import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key-change-this';
const key = new TextEncoder().encode(SECRET_KEY);

const PROTECTED_ROUTES = ['/dashboard', '/exam', '/results', '/tests', '/admin'];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if the current route should be protected
    const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    if (isProtected) {
        const session = req.cookies.get('session')?.value;

        if (!session) {
            // Store the attempted URL to redirect back after login? 
            // For now, just redirect to sign-in
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }

        try {
            await jwtVerify(session, key);
            return NextResponse.next();
        } catch (error) {
            // If token is invalid or expired
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/exam/:path*',
        '/results/:path*',
        '/tests/:path*',
        '/admin/:path*'
    ],
};
