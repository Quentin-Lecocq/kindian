'use server';
import config from '@/config';
import { validatedAction } from '@/lib/auth/middleware';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data) => {
  const supabase = await createClient();
  const { email, password } = data;

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: 'Invalid credentials. Please try again.' };
  }
  const { data: userData, error: userDataError } = await supabase
    .from('user_data')
    .select('*')
    .eq('user_id', signInData.user?.id)
    .single();

  if (userDataError && userDataError.code === 'PGRST116') {
    const { error: insertError } = await supabase
      .from('user_data')
      .insert({ user_id: signInData.user?.id });
    if (insertError) {
      console.error('Error creating user_data entry:', insertError);
    }
  }
  redirect('/dashboard');
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional(),
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const supabase = await createClient();
  const { email, password } = data;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) {
    return { error: signUpError.message };
  }
  const { error: insertError } = await supabase
    .from('user_data')
    .insert({ user_id: signUpData?.user?.id });

  if (insertError) {
    console.error('Error creating user_data entry:', insertError);
  }
  redirect('/dashboard');
});

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

export const signInWithGoogle = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const supabase = await createClient();
  try {
    const redirectTo = `${config.domainName}/api/auth/callback`;
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      // options: {
      //   redirectTo: `${redirectTo}&redirect=/test`,
      // },
    });
    if (signInError) {
      return { error: 'Failed to sign in with Google. Please try again.' };
    }
  } catch (error) {
    return { error: 'Failed to sign in with Google. Please try again.' };
  }
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/sign-in');
};
