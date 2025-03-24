import { Form } from './FormsTableView';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import UserForm from './UserForm';

type FormsDialogProps = {
  open: boolean;
  formType: number;
  title?: string | undefined;
  idNumbers: number[];
  formData: Form | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  fetchReFetchData: () => Promise<void>;
};

const FormsDialog = ({
  open,
  title,
  formType,
  formData,
  idNumbers,
  setIsModalOpen,
  fetchReFetchData,
}: FormsDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        <Typography id='modal-modal-title' variant='h4' textAlign={'center'}>
          {title ? title : 'Forms Modal'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {formData && (
          <UserForm
            formData={formData}
            formType={formType}
            idNumbers={idNumbers}
            setIsModalOpen={setIsModalOpen}
            fetchReFetchData={fetchReFetchData}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FormsDialog;
