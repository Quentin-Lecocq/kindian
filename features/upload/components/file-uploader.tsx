'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import { useReducer, useState } from 'react';
import Dropzone from 'react-dropzone';
import { formReducer, initialState } from '../reducers/form-reducer';
import { exportSelectedBooks } from '../server/actions/exportBook';
import { handleExtractBooks } from '../server/actions/extractBook';
import { Book } from '../type';

const FileUploader = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [books, setBooks] = useState<Book[]>([]);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileChange = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) return;

    dispatch({ type: 'SET_UPLOADING', payload: true });

    try {
      const content = await file.text();
      setFileContent(content);
      const extractedBooks = await handleExtractBooks(content);
      setBooks(extractedBooks.map((book) => ({ ...book, selected: false })));
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to extract books.' });
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
    const selectedBooks = books.filter((book) => book.selected);
    if (selectedBooks.length === 0) {
      dispatch({ type: 'SET_ERROR', payload: 'No books selected.' });
      return;
    }

    dispatch({ type: 'SET_UPLOADING', payload: true });

    try {
      const selectedBookTitles = selectedBooks.map((book) => book.title);
      const fileUrls = await exportSelectedBooks(
        fileContent || '',
        'kindle-notes',
        selectedBookTitles
      );

      dispatch({ type: 'SET_DOWNLOAD_URL', payload: fileUrls });
      console.log('Exported files:', fileUrls);
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to export selected books.',
      });
    } finally {
      dispatch({ type: 'SET_UPLOADING', payload: false });
    }
  };

  const [isDragActive, setIsDragActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [className, setClassName] = useState('');

  return (
    <div>
      {!books.length && (
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
      {books.length > 0 && (
        <div className="mt-4">
          <h2>Select books to export:</h2>
          {books.map((book, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={book.selected}
                onChange={() => {
                  const updatedBooks = [...books];
                  updatedBooks[index].selected = !updatedBooks[index].selected;
                  setBooks(updatedBooks);
                }}
              />
              <span>
                {book.title} ({book.highlights.length} highlights)
              </span>
            </div>
          ))}
          <Button onClick={handleExport}>Export Selected Books</Button>
        </div>
      )}
      {formState.error && (
        <p className="text-red-500 text-sm">{formState.error}</p>
      )}
      {books.length > 0 && formState.downloadUrl && (
        <div>
          <div>
            {formState.downloadUrl.map((url) => (
              <div key={url}>
                <a href={url} download={url.split('/').pop()}>
                  {url.split('/').pop()}
                </a>
              </div>
            ))}
          </div>
          <Button
            onClick={handleDownload}
            disabled={
              !formState.downloadUrl || formState.downloadUrl.length === 0
            }
          >
            Download All Files
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
