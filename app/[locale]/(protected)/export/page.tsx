import TypographyH4 from '@/components/typography/typography-h4';
import FileUpload from '@/features/export/components/file-upload';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const ExportPage: NextPage = async () => {
  const t = await getScopedI18n('export_page');

  return (
    <div>
      <TypographyH4>{t('title')}</TypographyH4>
      <FileUpload />
    </div>
  );
};

export default ExportPage;
