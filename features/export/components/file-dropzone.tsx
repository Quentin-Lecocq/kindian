'use client';

import TypographyP from '@/components/typography/typography-p';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

type FileDropzoneProps = {
  open: () => void;
};

const FileDropzone = ({ open }: FileDropzoneProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
        <div className="rounded-full border border-dashed border-muted-foreground/25 p-3">
          <Upload className="size-7 text-foreground" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-px">
          <TypographyP className="text-foreground font-medium">
            Upload your kindle notes
          </TypographyP>
          <TypographyP size="sm" className="text-muted-foreground/70">
            Drag and drop your kindle notes or click to upload
          </TypographyP>
        </div>
      </div>
      <Button className="bg-emerald-400 mt-6" onClick={open}>
        Upload
      </Button>
    </div>
  );
};

export default FileDropzone;
