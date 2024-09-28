// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token'); // Adjust this based on how you store your token

  // List of protected routes
  const protectedRoutes = ['/dashboard', '/watchlist'];

  // Check if the request is for a protected route
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ['/dashboard/:path*', '/watchlist/:path*'], // Apply middleware to these paths
};
