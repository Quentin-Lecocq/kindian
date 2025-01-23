'use client';

import { Button } from '@/components/ui/button';
import config from '@/config';
import { ActionState } from '@/lib/auth/middleware';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { signInWithMagicLink } from './actions';

const Login = ({ mode = 'signin' }: { mode: 'signin' | 'signup' }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    const redirectTo = `${config.domainName}/api/auth/callback`;

    setLoading(true);

    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });
  };

  const [magicLinkState, magicLinkAction, pending] = useActionState<
    ActionState,
    FormData
  >(signInWithMagicLink, {
    error: '',
    success: '',
  });

  return (
    <div>
      <h1>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h1>
      <p>
        {mode === 'signin'
          ? 'Sign in to your account'
          : 'Sign up to create an account'}
      </p>
      <div>
        {magicLinkState?.success ? (
          <p>Check your email for a magic link</p>
        ) : (
          <div>
            <form action={magicLinkAction}>
              <input type="email" name="email" placeholder="Email" />
              <button type="submit">Send Magic Link</button>
            </form>
            <div className="relative">
              <div className="flex absolute inset-0 items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="flex relative justify-center">
                <span className="px-4 text-sm text-gray-500 bg-gradient-to-b from-white to-gray-50">
                  or
                </span>
              </div>
            </div>
            <Button
              onClick={handleGoogleSignIn}
              className="w-full h-12 font-medium text-gray-700 bg-white rounded-lg border border-gray-200 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <div className="flex justify-center items-center">
                  <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </div>
              )}
            </Button>
          </div>
        )}

        <p>
          {mode === 'signin' ? 'New to Kindian' : 'Already have an account? '}
          <Link href={mode === 'signin' ? '/sign-up' : '/sign-in'}>
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
