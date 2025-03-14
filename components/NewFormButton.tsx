import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Dispatch, SetStateAction } from 'react';
import { Form } from '@/app/formstable/page';

type NewFormButtonProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<Form | undefined>>;
};

const NewFormButton = ({ setIsModalOpen, setFormData }: NewFormButtonProps) => {
  const handleClick = () => {
    setIsModalOpen(true);
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
      variant="contained"
      color="primary"
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
