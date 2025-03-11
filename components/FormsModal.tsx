import { Box, Modal, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

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
  formId: number | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const FormsModal = ({ open, formId, setIsModalOpen }: FormsModalProps) => {
  return (
    <Modal open={open} onClose={() => setIsModalOpen(false)}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Forms Modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Edit icon was clicked for Form with id#: {formId}
        </Typography>
      </Box>
    </Modal>
  );
};

export default FormsModal;
