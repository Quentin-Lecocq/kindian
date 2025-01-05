import { Book } from '../type';

export type FormState = {
  error: string | null;
  downloadUrl: string[];
  isUploading: boolean;
  books: Book[];
  fileContent: string | null;
};

export type FormAction =
  | { type: 'SET_UPLOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DOWNLOAD_URL'; payload: string[] }
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'SET_FILE_CONTENT'; payload: string };
