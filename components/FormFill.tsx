import { Form } from '@/app/formstable/page';
import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

type FormFillProps = {
  formData: Form;
};

const FormFill = ({ formData }: FormFillProps) => {
  const [form, setForm] = useState({
    Id: 0,
    FirstName: '',
    LastName: '',
    Message: '',
    Completed: false,
  });

  useEffect(() => {
    if (formData) {
      setForm(formData);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <Stack direction="column" spacing={3} mt={2}>
        <TextField
          variant="outlined"
          id="Id"
          label="Id"
          value={form.Id}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          id="FirstName"
          label="FirstName"
          value={form.FirstName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          id="LastName"
          label="LastName"
          value={form.LastName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          id="Message"
          label="Message"
          value={form.Message}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          id="Completed"
          label="Completed"
          value={form.Completed.toString()}
          onChange={handleChange}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={'space-between'}
        mt={2}
      >
        <Button variant="contained">Submit</Button>
        <Button variant="contained">Reset</Button>
        <Button variant="contained">Cancel</Button>
      </Stack>
    </form>
  );
};

export default FormFill;
