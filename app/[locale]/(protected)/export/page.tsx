import FileUpload from '@/features/export/components/file-upload';
import { getScopedI18n } from '@/locales/server';

const ExportPage = async () => {
  const t = await getScopedI18n('export_page');

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <FileUpload />
    </>
  );
};

export default ExportPage;
