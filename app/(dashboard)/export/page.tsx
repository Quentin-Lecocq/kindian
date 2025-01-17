import FileUpload from '@/features/export/components/file-upload';
import { NextPage } from 'next';

const ExportPage: NextPage = () => {
  return (
    <div>
      <h1>Export</h1>
      <FileUpload />
    </div>
  );
};

export default ExportPage;
