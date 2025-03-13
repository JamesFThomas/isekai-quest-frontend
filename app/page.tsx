'use client';

import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {
  Box,
  CardHeader,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';

import ArticleIcon from '@mui/icons-material/Article';
import InputIcon from '@mui/icons-material/Input';
import { useState } from 'react';

//TODO - Add login functionality
//TODO - Add login form

export type UserData = {
  username: string | null;
  email: string | null;
};

const Home = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    username: null,
    email: null,
  });
  const handleSubmit = () => {
    router.push(
      `/formstable?username=${userData.username}&email=${userData.email}`,
    );
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
            <Typography variant="h4" component="div">
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
              variant="subtitle1"
            >
              The Web Forms API provides the backend services for this
              application to work.
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
              }}
              variant="subtitle1"
            >
              Source code download here :{' '}
              <Link
                href={'https://github.com/JamesFThomas/Web-Form-API'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Web Forms API{' '}
              </Link>
            </Typography>
          </Stack>
          {/* ################## Login /Registration Form ################## */}
          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                textAlign: 'center',
              }}
              variant="h5"
            >
              Log in to access the forms.
            </Typography>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent={'center'}
              mt={3}
            >
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Stack>
          </Box>
          {/* ################## Login /Registration Form  ################## */}
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArticleIcon />}
            onClick={handleSubmit}
            disabled={!userData.username || !userData.email}
          >
            Log In
          </Button>
          <Button
            disabled
            variant="contained"
            color="secondary"
            startIcon={<InputIcon />}
          >
            Register
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Home;
