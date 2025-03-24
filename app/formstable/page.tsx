'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';

import FormsTable from '@/components/FormsTable';
import FormsDialog from '@/components/FormsDialog';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import LogOutButton from '@/components/LogOutButton';
import { UserData } from '../page';
import UserChip from '@/components/UserChip';
import NewFormButton from '@/components/NewFormButton';
import { deployedURL } from '@/components/LoginRegForm';

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

  const [idNumbers, setIdNumbers] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // formType 1 = new , 2 = edit form
  const [formType, setFormType] = useState(1);

  const [modalTitle, setModalTitle] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const [urlParams, setUrlParams] = useState<UserData>({
    username: null,
    email: null,
  });

  const [formData, setFormData] = useState<Form | undefined>(undefined);

  const fetchReFetchData = useCallback(async () => {
    try {
      const fetchedData = await fetch(`${deployedURL}/Forms`, {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
      });

      const data = await fetchedData.json();
      const formIds = data.map((form: Form) => form.Id);
      setIdNumbers([0, ...formIds]);
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
    return <CircularProgress size='3rem' />;
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
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={1}
        >
          <LogOutButton />
          <Suspense fallback={<CircularProgress size='2rem' />}>
            <UserChip user={urlParams} />
          </Suspense>
          <NewFormButton
            setIsModalOpen={setIsModalOpen}
            setModalTitle={setModalTitle}
            setFormData={setFormData}
            setFormType={setFormType}
          />
        </Stack>
        {forms && (
          <FormsTable
            formsData={forms}
            refreshData={fetchReFetchData}
            setIsModalOpen={setIsModalOpen}
            setModalTitle={setModalTitle}
            setFormData={setFormData}
            setFormType={setFormType}
          />
        )}
      </Box>
      {isModalOpen && (
        <FormsDialog
          open={isModalOpen}
          formType={formType}
          title={modalTitle}
          formData={formData}
          idNumbers={idNumbers}
          setIsModalOpen={setIsModalOpen}
          fetchReFetchData={fetchReFetchData}
        />
      )}
    </Container>
  );
}
