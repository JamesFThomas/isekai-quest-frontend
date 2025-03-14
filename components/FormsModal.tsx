import { Form } from '@/app/formstable/page';
import { Box, Modal, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import FormFill from './FormFill';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type FormsModalProps = {
  open: boolean;
  formData: Form | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const FormsModal = ({ open, formData, setIsModalOpen }: FormsModalProps) => {
  return (
    <Modal open={open} onClose={() => setIsModalOpen(false)}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" textAlign={'center'}>
          Forms Modal
        </Typography>
        {formData && <FormFill formData={formData} />}
      </Box>
    </Modal>
  );
};

export default FormsModal;
