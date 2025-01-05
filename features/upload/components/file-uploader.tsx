'use client';

import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import { useReducer, useState } from 'react';
import Dropzone from 'react-dropzone';
import { formReducer, initialState } from '../reducers/form-reducer';
import { exportSelectedBooks } from '../server/actions/exportBook';
import { handleExtractBooks } from '../server/actions/extractBook';
import BookList from './book-list';
import ErrorDisplay from './error-display';
import LinksDownloader from './links-downloader';

const FileUploader = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleFileChange = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) return;

    dispatch({ type: 'SET_UPLOADING', payload: true });

    try {
      const content = await file.text();
      dispatch({ type: 'SET_FILE_CONTENT', payload: content });
      const extractedBooks = await handleExtractBooks(content);
      dispatch({
        type: 'SET_BOOKS',
        payload: extractedBooks.map((book) => ({
          ...book,
          selected: false,
        })),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to extract books.' });
      }
    } finally {
      dispatch({ type: 'SET_UPLOADING', payload: false });
    }
  };

  const handleDownload = () => {
    if (!formState.downloadUrl || formState.downloadUrl.length === 0) {
      return;
    }

    formState.downloadUrl.forEach((url) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = url.split('/').pop() || 'download.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleExport = async () => {
    const selectedBooks = formState.books.filter((book) => book.selected);
    if (selectedBooks.length === 0) {
      dispatch({ type: 'SET_ERROR', payload: 'No books selected.' });
      return;
    }

    dispatch({ type: 'SET_UPLOADING', payload: true });

    try {
      const selectedBookTitles = selectedBooks.map((book) => book.title);
      const fileUrls = await exportSelectedBooks(
        formState.fileContent || '',
        'kindle-notes',
        selectedBookTitles
      );

      dispatch({ type: 'SET_DOWNLOAD_URL', payload: fileUrls });
      console.log('Exported files:', fileUrls);
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to export selected books.',
        });
      }
    } finally {
      dispatch({ type: 'SET_UPLOADING', payload: false });
    }
  };

  const [isDragActive, setIsDragActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [className, setClassName] = useState('');

  const handleSelectBook = (index: number) => {
    const updatedBooks = [...formState.books];
    updatedBooks[index].selected = !updatedBooks[index].selected;
    dispatch({ type: 'SET_BOOKS', payload: updatedBooks });
  };

  return (
    <div>
      {!formState.books.length && (
        <form>
          <Dropzone
            accept={{
              'text/plain': ['.txt'],
            }}
            onDrop={handleFileChange}
            maxFiles={1}
            onDragEnter={() => setIsDragActive(true)}
            onDragLeave={() => setIsDragActive(false)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className={cn(
                  'group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
                  'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isDragActive && 'border-muted-foreground/50',
                  isDisabled && 'pointer-events-none opacity-60',
                  className
                )}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <Upload
                        className="size-7 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-medium text-muted-foreground">
                      Drop the files here
                    </p>
                  </div>
                ) : (
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
                )}
              </div>
            )}
          </Dropzone>
        </form>
      )}
      {formState.books.length > 0 && (
        <BookList
          books={formState.books}
          onSelectBook={handleSelectBook}
          onExport={handleExport}
        />
      )}
      {formState.error && <ErrorDisplay error={formState.error} />}
      {formState.books.length > 0 && formState.downloadUrl && (
        <LinksDownloader
          downloadUrl={formState.downloadUrl}
          handleDownloadAllLinks={handleDownload}
        />
      )}
    </div>
  );
};

export default FileUploader;
