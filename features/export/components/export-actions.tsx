import { Button } from '@/components/ui/button';
import { Book } from '@/features/upload/type';
import { DownloadIcon, FileDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useExport } from '../hooks/use-export';

const ExportActions = ({ books }: { books: Book[] }) => {
  const t = useTranslations('export-page.upload');
  const { handleExport } = useExport();

  return (
    <div className="flex flex-col gap-4 w-96 mx-auto my-10">
      <h4 className="text-2xl font-bold">{t('results.title')}</h4>
      <p className="text-sm text-muted-foreground">
        {t('results.description')}
      </p>
      <div className="flex gap-4">
        <Button
          className="w-full bg-emerald-400"
          onClick={() => handleExport(books)}
        >
          <FileDownIcon />
          {t('results.export-selected-books')}
        </Button>
        <Button className="w-full">
          <DownloadIcon />
          {t('results.export-all-books')}
        </Button>
      </div>
      <Button
        variant="link"
        className="p-0 self-start text-muted-foreground"
        onClick={() => handleExport(books)}
      >
        {t('results.reset')}
      </Button>
    </div>
  );
};

export default ExportActions;
