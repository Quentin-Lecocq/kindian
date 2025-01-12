import { Book } from '../type';
import { fileUploaderReducer } from './file-uploader.reducer';
import { FileUploaderAction, FileUploaderState } from './type';

const initialState: FileUploaderState = {
  error: null,
  isUploading: false,
  books: [],
  fileContent: null,
};

describe('fileUploaderReducer', () => {
  it('should handle SET_UPLOADING', () => {
    const action: FileUploaderAction = { type: 'SET_UPLOADING', payload: true };
    const newState = fileUploaderReducer(initialState, action);
    expect(newState.isUploading).toBe(true);
  });

  it('should handle SET_ERROR', () => {
    const action: FileUploaderAction = { type: 'SET_ERROR', payload: 'error' };
    const newState = fileUploaderReducer(initialState, action);
    expect(newState.error).toBe('error');
  });

  it('should handle SET_BOOKS', () => {
    const action: FileUploaderAction = { type: 'SET_BOOKS', payload: [] };
    const newState = fileUploaderReducer(initialState, action);
    expect(newState.books).toEqual([]);
  });

  it('should add books to the state', () => {
    const book: Book = {
      id: '1',
      title: 'Test Book',
      author: 'author',
      highlights: [],
    };

    const action: FileUploaderAction = { type: 'SET_BOOKS', payload: [book] };
    const newState = fileUploaderReducer(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('should handle SET_FILE_CONTENT', () => {
    const action: FileUploaderAction = {
      type: 'SET_FILE_CONTENT',
      payload: 'fileContent',
    };
    const newState = fileUploaderReducer(initialState, action);
    expect(newState.fileContent).toBe('fileContent');
  });

  it('should throw an error for an unhandled action type', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 'payload',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    expect(() => fileUploaderReducer(initialState, action)).toThrow(
      'Unhandled action type'
    );
  });

  it('should not mutate the initial state', () => {
    const action: FileUploaderAction = { type: 'SET_UPLOADING', payload: true };
    const newState = fileUploaderReducer(initialState, action);
    expect(newState).not.toBe(initialState);
    expect(initialState.isUploading).toBe(false);
  });
});
