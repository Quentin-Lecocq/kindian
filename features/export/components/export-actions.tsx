import { Button } from '@/components/ui/button';
import { DownloadIcon, FileDownIcon } from 'lucide-react';

type ExportActionsProps = {
  handleExport: ({ onlySelectedBooks }: { onlySelectedBooks: boolean }) => void;
};

const ExportActions = ({ handleExport }: ExportActionsProps) => {
  return (
    <div className="flex flex-col gap-4 w-96 mx-auto my-10">
      <h4 className="text-2xl font-bold">Export</h4>
      <p className="text-sm text-muted-foreground">Upload successful</p>
      <div className="flex gap-4">
        <Button
          className="w-full bg-emerald-400"
          onClick={() => handleExport({ onlySelectedBooks: true })}
        >
          <FileDownIcon />
          Export selected books
        </Button>
        <Button
          className="w-full"
          onClick={() => handleExport({ onlySelectedBooks: false })}
        >
          <DownloadIcon />
          Export all books
        </Button>
      </div>
      <Button variant="link" className="p-0 self-start text-muted-foreground">
        Reset uploader
      </Button>
    </div>
  );
};

export default ExportActions;
