'use server';

import { createClient } from '@/utils/supabase/server';
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
