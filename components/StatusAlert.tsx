import { Alert, Box, Collapse, IconButton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type StatusAlertProps = {
  isShowing: boolean;
  setIsAlertShowing: Dispatch<SetStateAction<boolean>>;
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
};

const StatusAlert = ({
  status,
  message,
  isShowing,
  setIsAlertShowing,
}: StatusAlertProps) => {
  return (
    <Box>
      <Collapse in={isShowing}>
        <Alert
          severity={status}
          sx={{ m: 3 }}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setIsAlertShowing(false);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default StatusAlert;
