'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import Dropzone from 'react-dropzone';
import BookList from './book-list';
import ErrorDisplay from './error-display';
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
    handleResetUploader,
  } = useFileUploaderPresenter();

  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <div className="w-full mt-10 flex h-60 items-center justify-center">
        {!books.length ? (
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
                  'group relative grid h-60 w-96 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
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
              </div>
            )}
          </Dropzone>
        ) : (
          <div className="w-96 flex flex-col gap-4">
            <h4 className="text-lg font-bold">Actions available</h4>
            <p className="text-sm text-muted-foreground">
              All the file content has been upload. You can now select the
              highlights you want to export.
            </p>
            <div className="flex gap-4">
              <Button className="w-full bg-emerald-400" onClick={handleExport}>
                Export selected books
              </Button>
              <Button className="w-full">Export all books</Button>
            </div>
            <Button
              onClick={handleResetUploader}
              variant="link"
              className="p-0 self-start"
            >
              Reset all books
            </Button>
          </div>
        )}
      </div>

      {error && <ErrorDisplay error={error} />}

      <div className="border-t flex-1 w-full flex">
        <div className="w-1/6 border-r">SIDEBAR</div>
        <div className="w-5/6">
          {books.length > 0 && (
            <BookList books={books} onSelect={handleSelectBook} />
          )}
          {/* {books.length > 0 && downloadUrl && (
            <LinksDownloader
              downloadUrl={downloadUrl}
              handleDownloadAllLinks={handleDownload}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
