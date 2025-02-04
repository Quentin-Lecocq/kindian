'use client';

import ErrorDisplay from '@/components/error-display';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ActionState } from '@/features/auth/middlewares/middleware';
import { useI18n } from '@/locales/clients';
import { createClient } from '@/supabase/client';
import { getAuthRedirectUrl } from '@/utils/url';
import { useActionState, useState } from 'react';
import { signInWithMagicLink } from '../actions/auth';
import { AuthMode } from '../types/type';
import LoginFooter from './login-footer';
import LoginForm from './login-form';
import LoginProviderButtons from './login-provider-buttons';
import LoginSeparator from './login-separator';

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
        redirectTo: getAuthRedirectUrl(),
      },
    });
  };

  const handleGithubSignIn = () => {
    setLoading(true);

    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: getAuthRedirectUrl(),
      },
    });
  };

  const [magicLinkState, magicLinkAction, isPending] = useActionState<
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
          <p className="text-xs text-muted-foreground">
            {t('sign_in_page.check_email')}
          </p>
        ) : (
          <div>
            <LoginForm
              isLoading={loading}
              action={magicLinkAction}
              isPending={isPending}
            />
            {magicLinkState.error && (
              <ErrorDisplay error={magicLinkState.error} />
            )}
            <LoginSeparator />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {!magicLinkState.success && (
          <LoginProviderButtons
            loading={loading}
            onGithubSignIn={handleGithubSignIn}
            onGoogleSignIn={handleGoogleSignIn}
          />
        )}

        <LoginFooter mode={mode} />
      </CardFooter>
    </Card>
  );
};

export default Login;
