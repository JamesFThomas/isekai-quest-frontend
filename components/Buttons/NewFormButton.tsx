import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Dispatch, SetStateAction } from 'react';
import { Form } from '../Tables/FormsTableView';

type NewFormButtonProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<Form | undefined>>;
  setFormType: Dispatch<SetStateAction<number>>;
  setModalTitle: Dispatch<SetStateAction<string | undefined>>;
};

const NewFormButton = ({
  setIsModalOpen,
  setFormData,
  setFormType,
  setModalTitle,
}: NewFormButtonProps) => {
  const handleClick = () => {
    setIsModalOpen(true);
    setFormType(1);
    setModalTitle('New Form');
    setFormData({
      Id: 0,
      FirstName: '',
      LastName: '',
      Message: '',
      Completed: false,
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant='contained'
      color='primary'
      sx={{
        mt: 2,
        mb: 2,
      }}
      startIcon={<AddCircleOutlineIcon />}
    >
      New Form
    </Button>
  );
};

export default NewFormButton;
