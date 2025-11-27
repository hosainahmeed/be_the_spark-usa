import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const orgUserPath = ['/browse-events', '/list-events-organizer', '/contact-us'];

    const token = request.cookies.get('accessTokenForPlayFinder');

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/browse-events',
        '/list-events-organizer'
    ],
};
