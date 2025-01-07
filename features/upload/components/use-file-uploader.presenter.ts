import { useReducer } from 'react';

import {
  fileUploaderReducer,
  initialState,
} from '../reducers/file-uploader.reducer';
import { exportSelectedBooks } from '../server/actions/export-selected-books';
import { handleExtractBooks } from '../server/actions/extract-books';
import { Book } from '../type';

type UseFileUploaderPresenterReturn = {
  books: Book[];
  error: string | null;
  downloadUrl: string[];
  handleFileChange: (acceptedFiles: File[]) => Promise<void>;
  handleDownload: () => void;
  handleExport: () => Promise<void>;
  handleSelectBook: (index: number) => void;
  handleResetUploader: () => void;
};

const useFileUploaderPresenter = (): UseFileUploaderPresenterReturn => {
  const [fileUploaderState, dispatch] = useReducer(
    fileUploaderReducer,
    initialState
  );

  const handleResetUploader = () => {
    // TODO: surely there is a better way to do this
    dispatch({ type: 'SET_BOOKS', payload: [] });
    dispatch({ type: 'SET_FILE_CONTENT', payload: '' });
    dispatch({ type: 'SET_DOWNLOAD_URL', payload: [] });
    dispatch({ type: 'SET_ERROR', payload: null });
  };

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
    if (
      !fileUploaderState.downloadUrl ||
      fileUploaderState.downloadUrl.length === 0
    ) {
      return;
    }

    fileUploaderState.downloadUrl.forEach((url) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = url.split('/').pop() || 'download.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleExport = async () => {
    const selectedBooks = fileUploaderState.books.filter(
      ({ selected }) => selected
    );
    if (selectedBooks.length === 0) {
      dispatch({ type: 'SET_ERROR', payload: 'No books selected.' });
      return;
    }

    dispatch({ type: 'SET_UPLOADING', payload: true });

    try {
      const selectedBookTitles = selectedBooks.map(({ title }) => title);
      const fileUrls = await exportSelectedBooks(
        fileUploaderState.fileContent || '',
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

  // TODO: work with id instead of index
  const handleSelectBook = (index: number) => {
    const updatedBooks = [...fileUploaderState.books];
    updatedBooks[index].selected = !updatedBooks[index].selected;
    dispatch({ type: 'SET_BOOKS', payload: updatedBooks });
  };

  return {
    books: fileUploaderState.books,
    error: fileUploaderState.error,
    downloadUrl: fileUploaderState.downloadUrl,
    handleFileChange,
    handleDownload,
    handleExport,
    handleSelectBook,
    handleResetUploader,
  };
};

export default useFileUploaderPresenter;
