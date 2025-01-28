import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/locales/clients';

type LoginFormProps = {
  isLoading: boolean;
  action: (data: FormData) => void;
  isPending: boolean;
};

const LoginForm = ({ isLoading, action, isPending }: LoginFormProps) => {
  const t = useI18n();

  return (
    <form className="flex flex-col gap-2 mb-2" action={action}>
      <Input
        disabled={isPending || isLoading}
        type="email"
        name="email"
        placeholder={t('sign_in_page.email')}
      />
      <Button
        className="text-sm"
        disabled={isPending || isLoading}
        size="default"
        type="submit"
      >
        {isPending
          ? t('sign_in_page.sending')
          : t('sign_in_page.magic_link_btn')}
      </Button>
    </form>
  );
};

export default LoginForm;
