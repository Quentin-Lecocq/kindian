export type FormState = {
  error: string | null;
  downloadUrl: string[];
  isUploading: boolean;
};

export type FormAction =
  | { type: 'SET_UPLOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DOWNLOAD_URL'; payload: string[] };
