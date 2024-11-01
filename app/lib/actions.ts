// lib/actions.ts
'use server';

import { z } from 'zod';
import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

const NewsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export async function subscribeToNewsletter(
  prevState: {
    error: string | null;
    success: boolean;
  },
  formData: FormData
) {
  try {
    const validatedFields = NewsletterSchema.safeParse({
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.issues[0].message,
        success: false,
      };
    }

    const { email } = validatedFields.data;

    await prisma.newsletterSubscriber.create({
      data: { email },
    });

    revalidatePath('/');
    
    return {
      error: null,
      success: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
      return {
        error: 'This email is already subscribed',
        success: false,
      };
    }

    return {
      error: 'Something went wrong. Please try again.',
      success: false,
    };
  }
}