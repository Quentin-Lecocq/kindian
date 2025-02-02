'use client';

import DownloadButton from './buttons/download-button';
import OpenButtonLink from './buttons/open-button-link';
import ReadPreviewButton from './buttons/read-preview-button';

type BookCardActionsProps = {
  id: string;
  googleBooksLink: string | null;
};

const BookCardActions = ({ googleBooksLink, id }: BookCardActionsProps) => {
  return (
    <div className="flex flex-col w-full gap-2 justify-center">
      <ReadPreviewButton link={googleBooksLink} />
      <div className="flex justify-center w-full items-center">
        {/* TODO: add download action */}
        <DownloadButton onClick={() => {}} />
        <OpenButtonLink id={id} />
      </div>
    </div>
  );
};

export default BookCardActions;
