import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware } from "@clerk/nextjs/server";

export default function middleware(req: NextRequest) {
  console.log('Request URL:', req.url);

  // Avoid redirect loop by skipping middleware for specific paths
  if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/api')) {
    console.log('Skipping middleware for:', req.nextUrl.pathname);
    return NextResponse.next();
  }

  try {
    return clerkMiddleware(req, {} as NextFetchEvent);
  } catch (error) {
    console.error('Error in clerkMiddleware:', error);
    return NextResponse.redirect(new URL('/error', req.url));
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};