import { Button } from '@/components/ui/button';
import { DownloadIcon, FileDownIcon, RefreshCcwIcon } from 'lucide-react';

type ExportActionsProps = {
  handleExport: ({ onlySelectedBooks }: { onlySelectedBooks: boolean }) => void;
};

const ExportActions = ({ handleExport }: ExportActionsProps) => {
  return (
    <div className="flex flex-col gap-4 my-10">
      <p className="text-sm font-regular self-start">Upload successful</p>
      <div className="flex gap-4 items-center">
        <Button
          variant="outline"
          onClick={() => handleExport({ onlySelectedBooks: true })}
        >
          <div className="flex items-center gap-2 text-sm">
            <FileDownIcon />
            Export selected books
          </div>
        </Button>
        <Button
          variant="outline"
          onClick={() => handleExport({ onlySelectedBooks: false })}
        >
          <div className="flex items-center gap-2 text-sm">
            <DownloadIcon />
            Export all books
          </div>
        </Button>
        {/* TODO: Add logic to reset uploader */}
        <Button onClick={() => {}} variant="outline">
          <div className="flex items-center gap-2 text-sm">
            <RefreshCcwIcon />
            Reset uploader
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ExportActions;
