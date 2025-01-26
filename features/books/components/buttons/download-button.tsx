import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';

type DownloadButtonProps = {
  onClick: () => void;
};

const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <Button className="flex-1" variant="outline" onClick={onClick}>
      <DownloadIcon />
      Download
    </Button>
  );
};

export default DownloadButton;
