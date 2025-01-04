import { FormAction, FormState } from './type';

export const initialState: FormState = {
  error: null,
  downloadUrl: [],
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
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
