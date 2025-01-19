import TypographyH4 from '@/components/typography/typography-h4';
import FileUpload from '@/features/export/components/file-upload';
import { NextPage } from 'next';

const ExportPage: NextPage = () => {
  return (
    <div>
      <TypographyH4>Export</TypographyH4>
      <FileUpload />
    </div>
  );
};

export default ExportPage;
