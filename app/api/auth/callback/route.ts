import { prisma } from '@/lib/prisma';
import { createClient } from '@/supabase/server';
import { getUser } from '@/utils/user';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const encodedRedirectTo = requestUrl.searchParams.get('redirect') || '/home';
  const redirectTo = decodeURIComponent(encodedRedirectTo);

  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    const userData = await getUser();

    if (userData) {
      await prisma.user.create({
        data: {
          email: userData.email!,
          id: userData.id,
          supabaseId: userData.id,
          name: userData.user_metadata?.full_name || null,
          image: userData.user_metadata?.avatar_url || null,
          createdAt: new Date().toISOString(),
        },
      });
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
}
