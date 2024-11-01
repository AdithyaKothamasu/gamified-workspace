// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
      },
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error: unknown) {
    // Handle unique constraint violation
    if (error instanceof Error && 'code' in error && (error as Record<string, unknown>).code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}