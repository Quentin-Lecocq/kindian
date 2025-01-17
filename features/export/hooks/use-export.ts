import JSZip from 'jszip';
import { saveBooksToDb } from '../api/books';
import { exportToMarkdown } from '../api/export';
import { Book } from '../types';

export const useExport = () => {
  const handleExport = async (books: Book[]) => {
    try {
      await saveBooksToDb(books);

      const files = await exportToMarkdown(books);
      const zip = new JSZip();

      files.forEach((file) => {
        zip.file(file.filename, file.content);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'kindle-notes.zip';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting books:', error);
    }
  };

  return { handleExport };
};
