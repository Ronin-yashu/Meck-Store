import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected routes
const protectedRoutes = ['/account', '/checkout', '/orders'];
const adminRoutes = ['/admin'];
const authRoutes = ['/login', '/register'];

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Get the token (user session)
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Check if trying to access protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Redirect to login if accessing protected route without token
    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
    }

    // Redirect to home if accessing auth routes while logged in
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Check admin access
    if (isAdminRoute && (!token || token.role !== 'admin')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        '/account/:path*',
        '/checkout/:path*',
        '/orders/:path*',
        '/admin/:path*',
        '/login',
        '/register',
    ],
};