import { Button } from '../ui/button';

type UIButtonProps = {
  type?: 'primary' | 'secondary';
  onClick: () => void;
  text: string;
  icon?: React.ReactNode;
};

const UIButton = ({ type = 'primary', onClick, text, icon }: UIButtonProps) => {
  return (
    <Button
      variant={type === 'primary' ? 'default' : 'outline'}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-sm">
        {icon}
        {text}
      </div>
    </Button>
  );
};

export default UIButton;
