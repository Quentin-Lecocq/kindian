'use client';

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
        <div className="flex flex-col">
          <p className="text-sm font-regular">Upload your kindle notes</p>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop your kindle notes or click to upload
          </p>
        </div>
      </div>
      <Button className="w-fit text-sm mx-auto" onClick={open}>
        <div className="flex items-center gap-2">
          <Upload />
          Upload
        </div>
      </Button>
    </div>
  );
};

export default FileDropzone;
