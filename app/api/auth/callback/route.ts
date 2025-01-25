import config from '@/config';
import { createClient } from '@/features/auth/utils/supabase/server';
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
      try {
        await fetch(`${config.apiUrl}/api/users/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email!,
            supabaseId: userData.id,
            name: userData.user_metadata?.full_name || null,
            image: userData.user_metadata?.avatar_url || null,
            createdAt: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API:", error);
      }
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
}
