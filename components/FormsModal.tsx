import { Form } from '@/app/formstable/page';
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
  formData: Form | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const FormsModal = ({ open, formData, setIsModalOpen }: FormsModalProps) => {
  return (
    <Modal open={open} onClose={() => setIsModalOpen(false)}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Forms Modal
        </Typography>
        {formData && (
          <Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ID#: {formData.Id}
            </Typography>
            <Typography variant="body1">
              FirstName: {formData.FirstName}
            </Typography>
            <Typography variant="body1">
              LastName: {formData.LastName}
            </Typography>
            <Typography variant="body1">Message: {formData.Message}</Typography>
            <Typography variant="body1">
              Completed: {formData.Completed ? 'Yes' : 'No'}
            </Typography>
            {/* Add more fields as necessary */}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default FormsModal;
