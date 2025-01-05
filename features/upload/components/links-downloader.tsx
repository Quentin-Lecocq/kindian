import { Button } from '@/components/ui/button';
import { FC } from 'react';

type LinksDownloaderProps = {
  downloadUrl: string[];
  handleDownloadAllLinks: () => void;
};

const LinksDownloader: FC<LinksDownloaderProps> = ({
  downloadUrl,
  handleDownloadAllLinks,
}) => {
  return (
    <div>
      <div>
        {downloadUrl.map((url) => (
          <div key={url}>
            <a href={url} download={url.split('/').pop()}>
              {url.split('/').pop()}
            </a>
          </div>
        ))}
      </div>
      <Button onClick={handleDownloadAllLinks}>Download All Files</Button>
    </div>
  );
};

export default LinksDownloader;
