'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  CardHeader,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import LoginForm from '@/components/LoginForm';

//TODO - Add login functionality

export type UserData = {
  username: string | null;
  email: string | null;
};

const Home = () => {
  return (
    <Container
      sx={{
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      maxWidth={false}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardHeader
          sx={{
            textAlign: 'center',
          }}
          title={
            <Typography variant='h4' component='div'>
              Web Forms Application
            </Typography>
          }
        />
        <CardContent>
          <Stack spacing={2} justifyContent={'center'} alignContent={'center'}>
            <Typography
              sx={{
                textAlign: 'center',
              }}
              variant='subtitle1'
            >
              The Web Forms API provides the backend services for this
              application to work.
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
              }}
              variant='subtitle1'
            >
              Source code download here :{' '}
              <Link
                href={'https://github.com/JamesFThomas/Web-Form-API'}
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                Web Forms API{' '}
              </Link>
            </Typography>
          </Stack>
          <LoginForm />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
