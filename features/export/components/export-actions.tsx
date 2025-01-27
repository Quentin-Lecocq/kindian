import UIButton from '@/components/buttons/ui-button';
import { DownloadIcon, FileDownIcon, RefreshCcwIcon } from 'lucide-react';

type ExportActionsProps = {
  handleExport: ({ onlySelectedBooks }: { onlySelectedBooks: boolean }) => void;
};

const ExportActions = ({ handleExport }: ExportActionsProps) => {
  return (
    <div className="flex flex-col gap-4 my-10">
      <p className="text-sm font-regular self-start">Upload successful</p>
      <div className="flex gap-4 items-center">
        <UIButton
          type="secondary"
          onClick={() => handleExport({ onlySelectedBooks: true })}
          text="Export selected books"
          icon={<FileDownIcon />}
        />
        <UIButton
          type="secondary"
          onClick={() => handleExport({ onlySelectedBooks: false })}
          text="Export all books"
          icon={<DownloadIcon />}
        />
        <UIButton
          type="secondary"
          onClick={() => {}}
          text="Reset uploader"
          icon={<RefreshCcwIcon />}
        />
      </div>
    </div>
  );
};

export default ExportActions;
