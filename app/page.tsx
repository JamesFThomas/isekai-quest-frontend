'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  CardActions,
  CardHeader,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import LoginRegForm from '@/components/LoginRegForm';
import RegisterModal from '@/components/RegisterModal';
import { useState } from 'react';

export type UserData = {
  username: string | null;
  email: string | null;
};

const Home = () => {
  // 1 = login, 2 = register
  const [currentStep, setCurrentStep] = useState(1);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleRegisterOpen = () => {
    setCurrentStep(2);
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setCurrentStep(1);
    setIsRegisterOpen(false);
  };

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
              {' Source code download here: '}
              <Link
                href={'https://github.com/JamesFThomas/Web-Form-API'}
                target='_blank'
                rel='noopener noreferrer'
              >
                {' Web Forms API '}
              </Link>
            </Typography>
          </Stack>
          <LoginRegForm currentStep={currentStep} />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'end',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              color: 'grey',
            }}
            variant='body2'
          >
            {"Don't have an account? "}
            <Link onClick={handleRegisterOpen}>Register</Link>
          </Typography>
        </CardActions>
      </Card>
      <RegisterModal
        open={isRegisterOpen}
        currentStep={currentStep}
        closeDialog={handleRegisterClose}
      />
    </Container>
  );
};

export default Home;
