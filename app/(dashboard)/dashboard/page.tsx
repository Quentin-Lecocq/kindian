'use client';

import { createNewBook } from '@/features/upload/utils/api';
import { NextPage } from 'next';

const DashboardPage: NextPage = () => {
  const createFakeBook = async () => {
    await createNewBook({
      title: 'test',
      author: 'test',
    });
  };

  return (
    <>
      <h1>dashboard</h1>
      <button onClick={createFakeBook}>create fake book</button>
    </>
  );
};

export default DashboardPage;
