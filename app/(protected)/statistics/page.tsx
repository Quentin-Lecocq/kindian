'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const StatisticsPage: NextPage = () => {
  // const t = await getI18n();
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/books/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  return <>{message}</>;
};

export default StatisticsPage;
