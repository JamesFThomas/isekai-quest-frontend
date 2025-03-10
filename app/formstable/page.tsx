'use client';

import { useEffect, useState } from 'react';

import FormsTable from '@/components/FormsTable';

export type Form = {
  id: number;
  firstName: string;
  lastName: string;
  message: string;
  completed: boolean;
};

export const dynamic = 'force-dynamic';

export default function FormsTableView() {
  const [forms, setForms] = useState<Form[] | undefined>(undefined);

  useEffect(() => {
    if (!forms) {
      const fetchData = async () => {
        const fetchedData = await fetch('https://localhost:5001/Forms', {
          method: 'GET',
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
          },
        })
          .then((response) => response.json())
          .then((data) => data)
          .catch((error) => console.error('Fetch Error', error));

        setForms(fetchedData);
      };
      fetchData();
    }
  }, [forms]);

  if (forms === undefined) {
    return <h1>Loading...</h1>;
  }

  return forms && <FormsTable formsData={forms} />;
}
