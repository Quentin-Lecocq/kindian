import { cn } from '@/lib/utils';

type TypographyPProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const TypographyP = ({
  children,
  size = 'md',
  className,
}: TypographyPProps) => {
  return (
    <p
      className={cn(
        'leading-7',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-lg',
        className
      )}
    >
      {children}
    </p>
  );
};

export default TypographyP;
