import { Alert } from '@mui/material';

type StatusAlertProps = {
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
};

const StatusAlert = ({ status, message }: StatusAlertProps) => {
  return (
    <Alert severity={status} sx={{ mt: 3 }}>
      {message}
    </Alert>
  );
};

export default StatusAlert;
