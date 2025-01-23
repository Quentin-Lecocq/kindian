import { getUser } from '@/queries/user';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const encodedRedirectTo =
    requestUrl.searchParams.get('redirect') || '/dashboard';
  const redirectTo = decodeURIComponent(encodedRedirectTo);

  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    const userData = await getUser();

    if (userData) {
      try {
        await fetch('http://localhost:4000/api/users/create', {
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

  // Successful authentication, redirect to the intended page
  // Ensure we're using the correct origin
}
