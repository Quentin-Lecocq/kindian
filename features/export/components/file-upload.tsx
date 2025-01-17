'use client';

import { cn } from '@/lib/utils';
import Dropzone from 'react-dropzone';
import { useFileUpload } from '../hooks/use-file-upload';
import { MAX_FILE_UPLOAD } from '../utils/constants';
import ExportContainer from './export-container';
import FileDropzone from './file-dropzone';

const FileUpload = () => {
  const { books, handleFileChange } = useFileUpload();

  return (
    <>
      {!books.length ? (
        <Dropzone
          accept={{
            'text/plain': ['.txt'],
          }}
          onDrop={handleFileChange}
          maxFiles={MAX_FILE_UPLOAD}
        >
          {({ getRootProps, getInputProps, open }) => (
            <div
              {...getRootProps()}
              className={cn(
                'group relative grid h-60 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
                'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <input {...getInputProps()} />
              <FileDropzone open={open} />
            </div>
          )}
        </Dropzone>
      ) : (
        <ExportContainer books={books} />
      )}
    </>
  );
};

export default FileUpload;
