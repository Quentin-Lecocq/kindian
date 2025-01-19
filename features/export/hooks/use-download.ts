import { MarkdownFile } from '@/types/files';
import JSZip from 'jszip';

export const useDownload = () => {
  const downloadZip = async (files: MarkdownFile[]) => {
    const zip = new JSZip();
    files.forEach((file) => zip.file(file.filename, file.content));

    const content = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kindle-notes.zip';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return {
    downloadZip,
  };
};
