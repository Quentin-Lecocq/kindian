import FileUpload from '@/features/export/components/file-upload';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const ExportPage: NextPage = async () => {
  const t = await getScopedI18n('export_page');

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <FileUpload />
    </>
  );
};

export default ExportPage;
