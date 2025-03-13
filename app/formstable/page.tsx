'use client';

import { useCallback, useEffect, useState } from 'react';

import AllFormsTable from '@/components/AllFormsTable';
import FormsModal from '@/components/FormsModal';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import LogOutButton from '@/components/LogOutButton';
import { UserData } from '../page';
import UserChip from '@/components/UserChip';

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

  const searchParams = useSearchParams();

  const [urlParams, setUrlParams] = useState<UserData>({
    username: null,
    email: null,
  });

  const [formData, setFormData] = useState<Form | undefined>(undefined);

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
    if (searchParams.get('username') && searchParams.get('email')) {
      setUrlParams({
        username: searchParams.get('username'),
        email: searchParams.get('email'),
      });
    }
  }, [fetchReFetchData, forms, searchParams]);

  if (forms === undefined) {
    return <CircularProgress size="3rem" />;
  }

  return (
    <Container
      sx={{
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      maxWidth={false}
    >
      <Box>
        <Stack
          direction="row"
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={1}
        >
          <LogOutButton />
          <UserChip user={urlParams} />
        </Stack>
        {forms && (
          <AllFormsTable
            formsData={forms}
            refreshData={fetchReFetchData}
            setIsModalOpen={setIsModalOpen}
            setFormData={setFormData}
          />
        )}
      </Box>
      {isModalOpen && (
        <FormsModal
          open={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
        />
      )}
    </Container>
  );
}
