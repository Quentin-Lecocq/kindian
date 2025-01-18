import { cn } from '@/lib/utils';

type TypographySmallProps = {
  children: React.ReactNode;
  className?: string;
};

const TypographySmall = ({ children, className }: TypographySmallProps) => {
  return (
    <small className={cn('text-sm font-medium leading-none', className)}>
      {children}
    </small>
  );
};

export default TypographySmall;
