'use client';

import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';

type FileDropzoneProps = {
  open: () => void;
};

const FileDropzone = ({ open }: FileDropzoneProps) => {
  const t = useTranslations('export-page.upload');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
        <div className="rounded-full border border-dashed p-3">
          <Upload className="size-7 text-muted-foreground" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-px">
          <p className="font-medium text-muted-foreground">
            {t('dropzone.title')}
          </p>
          <p className="text-sm text-muted-foreground/70">
            {t('dropzone.description')}
          </p>
        </div>
      </div>
      <Button className="w-full bg-emerald-400" onClick={open}>
        {t('dropzone.button')}
      </Button>
    </div>
  );
};

export default FileDropzone;
