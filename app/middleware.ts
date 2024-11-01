import { NextResponse } from 'next/server';

export default function middleware() {
    return NextResponse.next();
}

export const config = {
  matcher: [
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

