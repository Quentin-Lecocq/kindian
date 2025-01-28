import { useI18n } from '@/locales/clients';
import Link from 'next/link';

type LoginFooterProps = {
  mode: 'signin' | 'signup';
};

const LoginFooter = ({ mode }: LoginFooterProps) => {
  const t = useI18n();

  return (
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
  );
};

export default LoginFooter;
