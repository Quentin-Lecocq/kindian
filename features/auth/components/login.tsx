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
import { ActionState } from '@/features/auth/middleware';
import { createClient } from '@/features/auth/utils/supabase/client';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { Spinner } from '@/components/ui/spinner';
import { useI18n } from '@/locales/clients';
import { signInWithMagicLink } from '../../../app/[locale]/(login)/actions';
import { AuthMode } from '../type';
import { REDIRECT_TO_AUTH_CALLBACK } from '../utils/constants';

type LoginProps = {
  mode: AuthMode;
};

const Login = ({ mode = 'signin' }: LoginProps) => {
  const t = useI18n();
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
          {mode === 'signin'
            ? t('sign_in_page.title')
            : t('sign_up_page.title')}
        </CardTitle>
        <CardDescription>
          {mode === 'signin'
            ? t('sign_in_page.subtitle')
            : t('sign_up_page.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {magicLinkState?.success ? (
          <p className="text-sm text-muted-foreground">
            {t('sign_in_page.check_email')}
          </p>
        ) : (
          <div>
            <form className="flex flex-col gap-2" action={magicLinkAction}>
              <Input
                type="email"
                name="email"
                placeholder={t('sign_in_page.email')}
              />
              <Button
                className="text-sm"
                disabled={pending || loading}
                size="default"
                type="submit"
              >
                {pending
                  ? t('sign_in_page.sending')
                  : t('sign_in_page.magic_link_btn')}
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
                  {t('sign_in_page.or_text')}
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
              <div className="flex items-center gap-2 font-mono">
                {loading ? <Spinner size="small" /> : <FaGithub />}
                Github
              </div>
            </Button>
            <Button
              disabled={loading}
              variant="outline"
              onClick={handleGoogleSignIn}
              className="flex-1"
            >
              <div className="flex items-center gap-2 font-mono">
                {loading ? <Spinner size="small" /> : <FaGoogle />}
                Google
              </div>
            </Button>
          </div>
        )}

        <div className="text-sm text-muted-foreground mt-4">
          <p className="flex items-center gap-2">
            {mode === 'signin'
              ? t('sign_in_page.new_to_kindian')
              : t('sign_up_page.already_have_account')}
            <Link
              className="text-primary underline"
              href={mode === 'signin' ? '/sign-up' : '/sign-in'}
            >
              {mode === 'signin'
                ? t('sign_in_page.sign_up_btn')
                : t('sign_up_page.sign_in_btn')}
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
