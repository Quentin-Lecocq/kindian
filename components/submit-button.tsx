import { FC } from 'react';
import { Button } from './ui/button';

interface SubmitButtonProps {
  isUploading: boolean;
  label: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ isUploading, label }) => {
  return (
    <Button type="submit" disabled={isUploading}>
      {label}
    </Button>
  );
};

export default SubmitButton;
