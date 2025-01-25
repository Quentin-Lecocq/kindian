import FileUpload from '@/features/export/components/file-upload';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const ExportPage: NextPage = async () => {
  const t = await getScopedI18n('export_page');

  return (
    <div>
      <h1 className="text-2xl">{t('title')}</h1>
      <FileUpload />
    </div>
  );
};

export default ExportPage;
