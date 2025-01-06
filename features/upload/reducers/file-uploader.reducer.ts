import { FileUploaderAction, FileUploaderState } from './type';

export const initialState: FileUploaderState = {
  error: null,
  downloadUrl: [],
  isUploading: false,
  books: [],
  fileContent: null,
};

export const fileUploaderReducer = (
  state: FileUploaderState,
  action: FileUploaderAction
): FileUploaderState => {
  switch (action.type) {
    case 'SET_UPLOADING':
      return { ...state, isUploading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DOWNLOAD_URL':
      return { ...state, downloadUrl: action.payload };
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'SET_FILE_CONTENT':
      return { ...state, fileContent: action.payload };
    default:
      throw new Error('Unhandled action type');
  }
};
