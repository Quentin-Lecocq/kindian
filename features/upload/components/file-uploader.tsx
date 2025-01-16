'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DownloadIcon, FileDownIcon, Upload } from 'lucide-react';
import Dropzone from 'react-dropzone';
import ErrorDisplay from './error-display';
import TableBooks from './table-books';
import useFileUploaderPresenter from './use-file-uploader.presenter';

const MAX_FILE_UPLOAD = 1;

const FileUploader = () => {
  const {
    books,
    error,
    handleFileChange,
    handleSelectBook,
    handleToggleSelectAllBooks,
    handleResetUploader,
    handleExportAndDownload,
  } = useFileUploaderPresenter();

  return (
    <div className="flex flex-col gap-12 p-10 items-center justify-center h-screen">
      <div className="w-full mt-10 flex h-60 items-center justify-center">
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
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <Upload
                        className="size-7 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col gap-px">
                      <p className="font-medium text-muted-foreground">
                        {/* {t('upload.file.first-instruction')} */}
                        Upload your file
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        Select the books you want to export
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-emerald-400"
                    onClick={() => open()}
                  >
                    {/* {t('upload.file')} */}
                    Upload
                  </Button>
                </div>
              </div>
            )}
          </Dropzone>
        ) : (
          <div className="w-96 flex flex-col gap-4">
            <h4 className="text-2xl font-bold">
              {/* {t('actions.available')} */}
              Actions available
            </h4>
            <p className="text-sm text-muted-foreground">
              {/* {t('upload.success')} */}
              Upload successful
            </p>
            <div className="flex gap-4">
              <Button
                className="w-full bg-emerald-400"
                onClick={() => handleExportAndDownload(false)}
              >
                <FileDownIcon />
                {/* {t('export.selected.books')} */}
                Export selected books
              </Button>
              <Button
                className="w-full"
                onClick={async () => handleExportAndDownload(true)}
              >
                <DownloadIcon />
                {/* {t('export.all.books')} */}
                Export all books
              </Button>
            </div>
            <Button
              onClick={handleResetUploader}
              variant="link"
              className="p-0 self-start text-muted-foreground"
            >
              {/* {t('reset.uploader')} */}
              Reset
            </Button>
          </div>
        )}
      </div>

      {error && <ErrorDisplay error={error} />}

      <div className="border-t flex-1 w-full flex">
        <div className="w-full">
          {books.length > 0 && (
            <TableBooks
              books={books}
              onSelect={handleSelectBook}
              onToggleSelectAll={handleToggleSelectAllBooks}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
