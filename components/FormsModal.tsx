import { Form } from '@/app/formstable/page';
import { Box, Modal, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import UserForm from './UserForm';

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
  formType: number;
  title?: string | undefined;
  formData: Form | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const FormsModal = ({
  open,
  title,
  formType,
  formData,
  setIsModalOpen,
}: FormsModalProps) => {
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h4' textAlign={'center'}>
          {title ? title : 'Forms Modal'}
        </Typography>
        {formData && (
          <UserForm
            formData={formData}
            formType={formType}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Box>
    </Modal>
  );
};

export default FormsModal;
