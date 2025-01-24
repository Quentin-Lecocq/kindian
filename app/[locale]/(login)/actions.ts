'use server';
import config from '@/config';
import { createClient } from '@/features/auth/lib/supabase/server';
import { validatedAction } from '@/features/auth/middleware';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const signInWithMagicLink = validatedAction(
  z.object({
    email: z.string().email(),
    redirect: z.string().optional(),
  }),
  async (data) => {
    const supabase = await createClient();
    const { email } = data;
    const redirectTo = `${config.domainName}/api/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
    if (error) {
      console.error('Error sending magic link:', error);
      return { error: error.message };
    }

    return { success: 'Magic link sent to your email.' };
  }
);

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/sign-in');
};
