'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const StatisticsPage: NextPage = () => {
  // const t = await getI18n();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // D'abord, on récupère le token
    fetch('/api/auth/token')
      .then((res) => res.json())
      .then((data) => {
        // Ensuite, on fait la requête avec le token
        return fetch('http://localhost:4000/api/books/test-token', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        // Maintenant data a la structure { status: number, data: { userId, supabaseId } }
        console.log('User ID:', data.data.userId);
        console.log('Supabase ID:', data.data.supabaseId);
        setMessage(`User ID: ${data.data.userId}`); // ou ce que vous voulez afficher
      })
      .catch((error) => {
        console.error(error);
        setMessage('Erreur lors de la récupération des données');
      });
  }, []);

  return <>{message}</>;
};

export default StatisticsPage;
