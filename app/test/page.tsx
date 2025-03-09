'use client';

import { useEffect, useState } from 'react';

type Form = {
  Id: number;
  FirstName: string;
  LastName: string;
  Message: string;
  Completed: boolean;
};

export const dynamic = 'force-dynamic';

export default function Test() {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://localhost:5001/Forms', {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
        },
      })
        .then((response) => response.json())
        .then((data) => setForms(data))
        .catch((error) => console.error('Fetch Error', error));
    };
    fetchData();
  }, []);

  console.log(forms);

  if (!forms) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}
