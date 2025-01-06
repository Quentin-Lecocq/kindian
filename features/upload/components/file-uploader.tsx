'use client';

import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
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
    <div>
      {!books.length && (
        <Dropzone
          accept={{
            'text/plain': ['.txt'],
          }}
          onDrop={handleFileChange}
          maxFiles={1}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={cn(
                'group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
                'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <input {...getInputProps()} />
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
                    You can upload a txt file from your kindle notes
                  </p>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      )}
      {books.length > 0 && (
        <BookList
          books={books}
          onSelect={handleSelectBook}
          onExport={handleExport}
        />
      )}
      {error && <ErrorDisplay error={error} />}
      {books.length > 0 && downloadUrl && (
        <LinksDownloader
          downloadUrl={downloadUrl}
          handleDownloadAllLinks={handleDownload}
        />
      )}
    </div>
  );
};

export default FileUploader;
