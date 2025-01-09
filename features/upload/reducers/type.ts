import { Book } from '../type';

export type FileUploaderState = {
  error: string | null;
  isUploading: boolean;
  books: Book[];
  fileContent: string | null;
};

export type FileUploaderAction =
  | { type: 'SET_UPLOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'SET_FILE_CONTENT'; payload: string };
