import { useReducer } from 'react';

import { saveAs } from 'file-saver';
import {
  fileUploaderReducer,
  initialState,
} from '../reducers/file-uploader.reducer';
import { exportSelectedBooks } from '../server/actions/export';
import { extractBooksFromClippings } from '../server/actions/extract';
import { Book } from '../type';

type UseFileUploaderPresenterReturn = {
  books: Book[];
  error: string | null;
  handleFileChange: (acceptedFiles: File[]) => Promise<void>;
  handleSelectBook: (id: string) => void;
  handleToggleSelectAllBooks: () => void;
  handleResetUploader: () => void;
  handleExportAndDownload: (allBooks: boolean) => Promise<void>;
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
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const handleFileChange = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) return;

    dispatch({ type: 'SET_UPLOADING', payload: true });

    try {
      const content = await file.text();
      dispatch({ type: 'SET_FILE_CONTENT', payload: content });
      const extractedBooks = await extractBooksFromClippings(content);
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

  const handleExportAndDownload = async (allBooks: boolean) => {
    let selectedBooks: Book[] = [];

    if (allBooks) {
      selectedBooks = fileUploaderState.books;
    } else {
      selectedBooks = fileUploaderState.books.filter(
        ({ selected }) => selected
      );
    }

    if (selectedBooks.length === 0) {
      dispatch({ type: 'SET_ERROR', payload: 'No books selected.' });
      return;
    }

    dispatch({ type: 'SET_UPLOADING', payload: true });

    try {
      const zipBlob = await exportSelectedBooks(
        fileUploaderState.fileContent || '',
        selectedBooks.map(({ title }) => title)
      );

      saveAs(new Blob([zipBlob]), 'selected-books.zip');
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

  const handleSelectBook = (id: string) => {
    const updatedBooks = fileUploaderState.books.map((book) =>
      book.id === id ? { ...book, selected: !book.selected } : book
    );
    dispatch({ type: 'SET_BOOKS', payload: updatedBooks });
  };

  const handleToggleSelectAllBooks = () => {
    if (fileUploaderState.books.every((book) => book.selected)) {
      dispatch({
        type: 'SET_BOOKS',
        payload: fileUploaderState.books.map((book) => ({
          ...book,
          selected: false,
        })),
      });
    } else {
      dispatch({
        type: 'SET_BOOKS',
        payload: fileUploaderState.books.map((book) => ({
          ...book,
          selected: true,
        })),
      });
    }
  };

  return {
    books: fileUploaderState.books,
    error: fileUploaderState.error,
    handleFileChange,
    handleSelectBook,
    handleToggleSelectAllBooks,
    handleResetUploader,
    handleExportAndDownload,
  };
};

export default useFileUploaderPresenter;
