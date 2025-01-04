'use client';

import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isApiError } from '@/lib/utils';
import { useReducer } from 'react';
import { formReducer, initialState } from '../reducers/form-reducer';
import { uploadFile } from '../server/actions/upload';

const UploadForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'SET_UPLOADING', payload: true });

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const urls = await uploadFile(formData);
      // TODO: handle multiple files to download
      dispatch({ type: 'SET_DOWNLOAD_URL', payload: urls[0] });
    } catch (error: unknown) {
      if (isApiError(error)) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'An error occurred.' });
      }
    } finally {
      dispatch({ type: 'SET_UPLOADING', payload: false });
    }
  };

  const handleDownload = () => {
    if (formState.downloadUrl) {
      const link = document.createElement('a');
      link.href = formState.downloadUrl;
      link.download = 'kindle-notes.md';
      link.click();
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <Input type="file" id="file" name="file" accept=".txt" />
        <SubmitButton
          isUploading={formState.isUploading}
          label={formState.isUploading ? 'Uploading...' : 'Upload'}
        />
      </form>
      {formState.error && (
        <p className="text-red-500 text-sm">{formState.error}</p>
      )}
      {formState.downloadUrl && (
        <div>
          <p>File processed successfully! You can download it below.</p>
          <Button onClick={handleDownload}>Download</Button>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
