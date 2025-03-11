'use client';

import { useRouter } from 'next/navigation';

import styles from './page.module.css';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import ArticleIcon from '@mui/icons-material/Article';
import InputIcon from '@mui/icons-material/Input';

//TODO - Add login functionality
//TODO - Add login form
// TODO - Update Page format to only use MUI components and styles

const Home = () => {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <Card sx={{ minWidth: 275, backgroundColor: '#81c784' }}>
            <CardHeader
              sx={{
                textAlign: 'center',
              }}
              title="Welcome to the Web Forms App"
            />
            <CardContent>
              <Stack
                spacing={2}
                justifyContent={'center'}
                alignContent={'center'}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                  }}
                  variant="subtitle1"
                >
                  This is a simple web application that must be coupled with the
                  Web Forms API application to work.
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'center',
                  }}
                  variant="subtitle1"
                >
                  The Web Forms API application is a .NET Core Web API
                  application that provides the backend services for this
                  application.
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'center',
                  }}
                  variant="body1"
                >
                  Please log in to access the forms.
                </Typography>
              </Stack>
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
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
              </Stack>
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
                onClick={() => router.push('/formstable')}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<InputIcon />}
              >
                Register
              </Button>
            </CardActions>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
