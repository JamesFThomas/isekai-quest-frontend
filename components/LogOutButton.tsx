import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LogOutButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleBack}
      variant="contained"
      color="secondary"
      sx={{
        mt: 2,
        mb: 2,
      }}
      startIcon={<ArrowBackIcon />}
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;
