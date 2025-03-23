import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import LoginRegForm from './LoginRegForm';

type RegisterDialogProps = {
  open: boolean;
  currentStep: number;
  closeDialog: () => void;
};

const RegisterDialog = ({
  open,
  currentStep,
  closeDialog,
}: RegisterDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <LoginRegForm currentStep={currentStep} />
      </DialogContent>
      <DialogActions>
        <Button variant='text' onClick={closeDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
