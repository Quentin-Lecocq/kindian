import { Button } from '../ui/button';

type SecondaryButtonProps = {
  onClick: () => void;
  text: string;
  icon?: React.ReactNode;
};

const SecondaryButton = ({ onClick, text, icon }: SecondaryButtonProps) => {
  return (
    <Button variant="outline" onClick={onClick}>
      <div className="flex items-center gap-2 text-sm">
        {icon}
        {text}
      </div>
    </Button>
  );
};

export default SecondaryButton;
