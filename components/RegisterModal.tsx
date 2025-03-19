import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import LoginRegForm from './LoginRegForm';

type RegisterModalProps = {
  open: boolean;
  currentStep: number;
  closeDialog: () => void;
};

const RegisterModal = ({
  open,
  currentStep,
  closeDialog,
}: RegisterModalProps) => {
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

export default RegisterModal;
