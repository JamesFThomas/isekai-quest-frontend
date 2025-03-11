'use client';

import { useCallback, useEffect, useState } from 'react';

import AllFormsTable from '@/components/AllFormsTable';

import CircularProgress from '@mui/material/CircularProgress';
import FormsModal from '@/components/FormsModal';

export type Form = {
  Id: number;
  FirstName: string;
  LastName: string;
  Message: string;
  Completed: boolean;
};

export const dynamic = 'force-dynamic';

export default function FormsTableView() {
  const [forms, setForms] = useState<Form[] | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formId, setFormId] = useState<number | undefined>(undefined);

  const fetchReFetchData = useCallback(async () => {
    try {
      const fetchedData = await fetch('https://localhost:5001/Forms', {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
        },
      });

      const data = await fetchedData.json();
      setForms(data);
    } catch (error) {
      console.error('Fetch Error', error);
    }
  }, []);

  useEffect(() => {
    if (!forms) {
      fetchReFetchData();
    }
  }, [fetchReFetchData, forms]);

  if (forms === undefined) {
    return <CircularProgress size="3rem" />;
  }

  return (
    <>
      {forms && (
        <AllFormsTable
          formsData={forms}
          refreshData={fetchReFetchData}
          setIsModalOpen={setIsModalOpen}
          setFormId={setFormId}
        />
      )}
      {isModalOpen && (
        <FormsModal
          open={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formId={formId}
        />
      )}
    </>
  );
}
