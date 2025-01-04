type FormState = {
  error: string | null;
  downloadUrl: string | null;
  isUploading: boolean;
};

type FormAction =
  | { type: 'SET_UPLOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DOWNLOAD_URL'; payload: string };

export const initialState: FormState = {
  error: null,
  downloadUrl: null,
  isUploading: false,
};

export const formReducer = (
  state: FormState,
  action: FormAction
): FormState => {
  switch (action.type) {
    case 'SET_UPLOADING':
      return { ...state, isUploading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DOWNLOAD_URL':
      return { ...state, downloadUrl: action.payload };
    default:
      throw new Error('Unknown action state');
  }
};
