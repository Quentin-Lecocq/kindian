'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideCircleCheck, Upload } from 'lucide-react';
import Dropzone from 'react-dropzone';
import BookList from './book-list';
import ErrorDisplay from './error-display';
import LinksDownloader from './links-downloader';
import useFileUploaderPresenter from './use-file-uploader.presenter';

const FileUploader = () => {
  const {
    books,
    error,
    downloadUrl,
    handleFileChange,
    handleDownload,
    handleExport,
    handleSelectBook,
  } = useFileUploaderPresenter();

  return (
    <div className="flex flex-col gap-12 items-center mt-10 justify-center h-screen">
      <div className="flex gap-4 flex-col">
        <Dropzone
          accept={{
            'text/plain': ['.txt'],
          }}
          onDrop={handleFileChange}
          maxFiles={1}
        >
          {({ getRootProps, getInputProps, open }) => (
            <div
              {...getRootProps()}
              className={cn(
                'group relative grid h-60 w-full min-w-96 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
                'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <input {...getInputProps()} />
              {!books.length ? (
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
                        Drag {`'n'`} drop files here, or click to select files
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        You can upload a txt file directly from your kindle
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-emerald-400"
                    onClick={() => open()}
                  >
                    Upload File
                  </Button>
                </div>
              ) : (
                <div>
                  <LucideCircleCheck className="text-emerald-400" size={64} />
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      {error && <ErrorDisplay error={error} />}

      <div className="border-t flex-1 border-gray-500 w-full flex">
        <div className="w-1/6 outline outline-1">SIDEBAR</div>
        <div className="w-5/6">
          {books.length > 0 && (
            <BookList
              books={books}
              onSelect={handleSelectBook}
              onExport={handleExport}
            />
          )}
          {books.length > 0 && downloadUrl && (
            <LinksDownloader
              downloadUrl={downloadUrl}
              handleDownloadAllLinks={handleDownload}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
