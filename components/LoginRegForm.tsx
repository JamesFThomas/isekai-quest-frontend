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

  const [alertData, setAlertData] = useState<ErrorData>({ message: '' });
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const handleRegistrationError = () => {
    reset();
    setIsAlertShowing(true);
    setAlertData({ message: 'Registration failed try again later' });
  };

  const handleLoginError = () => {
    reset();
    setIsAlertShowing(true);
    setAlertData({ message: 'Login failed please register your user data' });
  };

  const handleLogin = async (data: LoginRegFormData) => {
    const response = await fetch(`https://localhost:5001/Users/${data.Email}`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    if (!response.ok) {
      handleLoginError();
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result) {
      handleLoginError();
      return;
    }

    router.push(
      `/formstable?username=${result.Username}&email=${result.Email}`
    );
  };

  const handleRegister = async (data: LoginRegFormData) => {
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
      handleRegistrationError();
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
      <StatusAlert
        status='error'
        message={alertData.message || 'Registration failed'}
        isShowing={isAlertShowing}
        setIsAlertShowing={setIsAlertShowing}
      />
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
            rules={{
              required: 'A Username is required',
              pattern: {
                value: /^.{8,}$/,
                message: 'The username must be at least 8 characters long',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Username'
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name='Email'
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please match pattern: email@address.com',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Email'
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
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
