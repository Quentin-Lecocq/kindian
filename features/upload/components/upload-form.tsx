'use client';

import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isApiError } from '@/lib/utils';
import { useState } from 'react';
import { uploadFile } from '../server/actions/upload';

const UploadForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const url = await uploadFile(formData);
      setDownloadUrl(url);
    } catch (error: unknown) {
      if (isApiError(error)) {
        setError(error.message);
      } else {
        setError('An error occurred.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
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
          isUploading={isUploading}
          label={isUploading ? 'Uploading...' : 'Upload'}
        />
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {downloadUrl && (
        <div>
          <p>File processed successfully! You can download it below.</p>
          <Button onClick={handleDownload}>Download</Button>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
