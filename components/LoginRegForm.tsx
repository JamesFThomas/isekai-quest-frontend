import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import ArticleIcon from '@mui/icons-material/Article';
import InputIcon from '@mui/icons-material/Input';

const initialFormData = {
  Username: '',
  Email: '',
};

type LoginRegFormProps = {
  currentStep: number;
};

const LoginRegForm = ({ currentStep }: LoginRegFormProps) => {
  const router = useRouter();

  const { control, watch, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const handleLogin = (Username: string, Email: string) => {
    router.push(`/formstable?username=${Username}&email=${Email}`);
  };

  const handleRegister = (Username: string, Email: string) => {
    router.push(`/formstable?username=${Username}&email=${Email}`);
  };

  const onSubmit: SubmitHandler<typeof initialFormData> = (data) => {
    if (currentStep === 1) {
      handleLogin(data.Username, data.Email);
    } else {
      handleRegister(data.Username, data.Email);
    }
  };

  const watchUsername = watch('Username');
  const watchEmail = watch('Email');

  return (
    <Box sx={{ mt: 3 }}>
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
