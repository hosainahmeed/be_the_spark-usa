import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const orgUserPath = ['/browse-events', '/list-events-organizer', '/contact-us'];

    const token = request.cookies.get('user');
    const user = token ? JSON.parse(token.value) : null;
    const role = user?.role;
    console.log('Cookies:', request.cookies.getAll());

    if (!token || token === undefined) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    };

    if (token && role === 'org') {
        if (!orgUserPath.includes(pathname)) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
        return NextResponse.next();
    }


    if (role === 'login') {
        if (pathname.startsWith('/organizer') || pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }


    if (role === 'org') {
        return NextResponse.next();
    }


    if (token && pathname === '/sign-in') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/browse-events',
        '/list-events-organizer'
    ],
};
