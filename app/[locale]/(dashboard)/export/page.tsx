import TypographyH4 from '@/components/typography/typography-h4';
import FileUpload from '@/features/export/components/file-upload';
import { getI18n } from '@/locales/server';
import { NextPage } from 'next';

const ExportPage: NextPage = async () => {
  const t = await getI18n();

  return (
    <div>
      <TypographyH4>{t('export_page.title')}</TypographyH4>
      <FileUpload />
    </div>
  );
};

export default ExportPage;
