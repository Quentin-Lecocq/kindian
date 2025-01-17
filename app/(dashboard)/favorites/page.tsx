import FileUploader from '@/features/upload/components/file-uploader';
import { NextPage } from 'next';

const FavoritesPage: NextPage = () => {
  return (
    <>
      <h1>Favorites</h1>
      <FileUploader />
    </>
  );
};

export default FavoritesPage;
