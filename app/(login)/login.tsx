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
import config from '@/config';
import { ActionState } from '@/lib/auth/middleware';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

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
                disabled={pending}
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
            <Button variant="outline" className="flex-1">
              <FaGithub />
              Github
            </Button>
            <Button
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
