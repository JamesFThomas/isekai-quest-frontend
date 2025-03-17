import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import ArticleIcon from '@mui/icons-material/Article';
import InputIcon from '@mui/icons-material/Input';

const initialFormData = {
  Username: '',
  Email: '',
};

const LoginForm = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit: SubmitHandler<typeof initialFormData> = (data) => {
    console.log(data);
    router.push(`/formstable?username=${data.Username}&email=${data.Email}`);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{
            textAlign: 'center',
          }}
          variant='h5'
        >
          Log in to access the forms.
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
          <Button
            variant='contained'
            color='primary'
            type='submit'
            startIcon={<ArticleIcon />}
          >
            Login
          </Button>
          <Button
            disabled
            variant='contained'
            color='secondary'
            startIcon={<InputIcon />}
          >
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
