import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/locales/clients';

const LoginSeparator = () => {
  const t = useI18n();

  return (
    <div className="flex items-center gap-2 my-4">
      <Separator className="my-4 flex-1" />
      <div className="w-fit flex items-center justify-center">
        <span className="text-muted-foreground text-xs">
          {t('sign_in_page.or_text')}
        </span>
      </div>
      <Separator className="my-4 flex-1" />
    </div>
  );
};

export default LoginSeparator;
