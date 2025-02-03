'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/supabase/server';
import { User } from '@supabase/supabase-js';

export const getUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  }

  return user;
};

export const getAccessToken = async (): Promise<string | null> => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
};

export const getUserBySupabaseId = async () => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (!authUser || error) return null;

  const user = await prisma.user.findUnique({
    where: {
      supabaseId: authUser.id,
    },
  });

  if (!user) return null;

  return user;
};
