'use client';

import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useReducer, useState } from 'react';
import { formReducer, initialState } from '../reducers/form-reducer';
import { exportSelectedBooks } from '../server/actions/exportBook';
import { handleExtractBooks } from '../server/actions/extractBook';
import { Book } from '../type';

const UploadForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [books, setBooks] = useState<Book[]>([]);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
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

  return (
    <div>
      <form className="flex flex-col gap-4">
        <Input type="file" accept=".txt" onChange={handleFileChange} />
        <SubmitButton isUploading={formState.isUploading} label="Upload" />
      </form>
      {books.length > 0 && (
        <div className="mt-4">
          <h2>Select books to export:</h2>
          {books.map((book, index) => (
            <div key={book.title} className="flex items-center gap-2">
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
      {formState.downloadUrl && (
        <div>
          <p>File(s) processed successfully! You can download them below:</p>
          <div>
            {formState.downloadUrl.map((url) => (
              <div key={url}>
                <a href={url} download={url.split('/').pop()}>
                  {url.split('/').pop()}
                </a>
              </div>
            ))}
            {/* // TODO: add condition to download all files */}
            <Button
              onClick={handleDownload}
              disabled={
                !formState.downloadUrl || formState.downloadUrl.length === 0
              }
            >
              Download All Files
            </Button>
          </div>
          {/* {Array.isArray(formState.downloadUrl) ? (
            formState.downloadUrl.map((url) => (
              <div key={url}>
                <a href={url} download>
                  {url.split('/').pop()}
                </a>
              </div>
            ))
          ) : (
            <Button
              onClick={handleDownload}
              disabled={
                !formState.downloadUrl || formState.downloadUrl.length === 0
              }
            >
              Download All Files
            </Button>
          )} */}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
