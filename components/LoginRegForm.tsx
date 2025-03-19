import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import ArticleIcon from '@mui/icons-material/Article';
import InputIcon from '@mui/icons-material/Input';
import StatusAlert from './StatusAlert';
import { useState } from 'react';

type LoginRegFormData = {
  Username: string;
  Email: string;
};

type LoginRegSubmissionData = {
  Username: string;
  Email: string;
  Id: number;
};

type ErrorData = {
  message: string;
};

const initialFormData = {
  Username: '',
  Email: '',
};

type LoginRegFormProps = {
  currentStep: number;
};

const LoginRegForm = ({ currentStep }: LoginRegFormProps) => {
  const router = useRouter();

  const [errorData, setErrorData] = useState<ErrorData | undefined>(undefined);

  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const handleLogin = async ({ Email, Username }: LoginRegFormData) => {
    // Login the user using GET by email request
    // if successful redirect to forms page
    // if failed open registration modal with error message
    router.push(`/formstable?username=${Username}&email=${Email}`);
  };

  const handleRegister = async (data: LoginRegFormData) => {
    // Register the user using POST request
    // if successful redirect to forms page
    // if failed display error message
    const submissionData: LoginRegSubmissionData = {
      Username: data.Username,
      Email: data.Email,
      Id: 0, // auto incremented in DB so we can just set it to 0
    };

    const response = await fetch('https://localhost:5001/Users', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      reset();
      const errorData = await response.json();
      // TODO trigger the fail Alert with the error message
      setErrorData(errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    router.push(
      `/formstable?username=${result.Username}&email=${result.Email}`
    );
  };

  const onSubmit: SubmitHandler<typeof initialFormData> = (data) => {
    if (currentStep === 1) {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
  };

  const watchUsername = watch('Username');
  const watchEmail = watch('Email');

  return (
    <Box sx={{ mt: 3 }}>
      {errorData && (
        <StatusAlert
          status='error'
          message={errorData.message || 'Registration failed'}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{
            textAlign: 'center',
          }}
          variant='h6'
        >
          {currentStep === 1
            ? 'Log in to access the forms.'
            : 'Enter Your Desired Username & Email'}
        </Typography>
        <Stack direction={'row'} spacing={2} justifyContent={'center'} mt={3}>
          <Controller
            name='Username'
            control={control}
            render={({ field }) => <TextField {...field} label='Username' />}
          />
          <Controller
            name='Email'
            control={control}
            render={({ field }) => <TextField {...field} label='Email' />}
          />
        </Stack>

        <Stack direction={'row'} spacing={2} justifyContent={'center'} mt={3}>
          {currentStep === 1 ? (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              startIcon={<ArticleIcon />}
              disabled={watchUsername === '' || watchEmail === ''}
            >
              Login
            </Button>
          ) : (
            <Button
              disabled={watchUsername === '' || watchEmail === ''}
              variant='contained'
              color='primary'
              type='submit'
              startIcon={<InputIcon />}
            >
              Register
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default LoginRegForm;
