'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { uploadFile } from '../server/actions/upload';

const initialState = {
  message: null,
};

const UploadForm = () => {
  const [formState, formAction, isPending] = useActionState(
    uploadFile,
    initialState
  );

  return (
    <div>
      <form action={formAction}>
        <h2>Upload your kindle notes on txt format</h2>
        <Input type="file" id="file" name="file" accept=".txt" />
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
};

export default UploadForm;
