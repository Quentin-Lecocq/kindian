'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/features/auth/lib/supabase/client';
import { ActionState } from '@/features/auth/middleware';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { signInWithMagicLink } from '../../../app/(login)/actions';
import { AuthMode } from '../type';
import { REDIRECT_TO_AUTH_CALLBACK } from '../utils/constants';

type LoginProps = {
  mode: AuthMode;
};

const Login = ({ mode = 'signin' }: LoginProps) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setLoading(true);

    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: REDIRECT_TO_AUTH_CALLBACK,
      },
    });
  };

  const handleGithubSignIn = () => {
    setLoading(true);

    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: REDIRECT_TO_AUTH_CALLBACK,
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
    <Card className="w-[350px] min-h-[350px]">
      <CardHeader>
        <CardTitle>
          {mode === 'signin' ? 'Sign in to Kindian' : 'Create an account'}
        </CardTitle>
        <CardDescription>
          {mode === 'signin'
            ? 'Sign in to your account'
            : 'Sign up to create an account'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {magicLinkState?.success ? (
          <p className="text-sm text-muted-foreground">
            Check your email for a magic link
          </p>
        ) : (
          <div>
            <form className="flex flex-col gap-2" action={magicLinkAction}>
              <Input type="email" name="email" placeholder="Email" />
              <Button
                className="text-sm"
                disabled={pending || loading}
                size="default"
                type="submit"
              >
                {pending ? 'Sending...' : 'Send Magic Link'}
              </Button>
            </form>
            {magicLinkState.error && (
              <p className="text-md text-destructive mt-2">
                {magicLinkState.error}
              </p>
            )}
            <div className="flex items-center gap-2 my-4">
              <Separator className="my-4 flex-1" />
              <div className="w-fit flex items-center justify-center">
                <span className="text-muted-foreground text-xs">
                  OR CONTINUE WITH
                </span>
              </div>
              <Separator className="my-4 flex-1" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {!magicLinkState.success && (
          <div className="flex flex-row gap-2 w-full">
            <Button
              disabled={loading}
              variant="outline"
              className="flex-1"
              onClick={handleGithubSignIn}
            >
              <FaGithub />
              Github
            </Button>
            <Button
              disabled={loading}
              variant="outline"
              onClick={handleGoogleSignIn}
              className="flex-1"
            >
              <FaGoogle />
              <span>Google</span>
            </Button>
          </div>
        )}

        <div className="text-sm text-muted-foreground mt-4">
          <p>
            {mode === 'signin'
              ? 'New to Kindian?'
              : 'Already have an account? '}
            <Link
              className="ml-2 text-primary underline"
              href={mode === 'signin' ? '/sign-up' : '/sign-in'}
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
