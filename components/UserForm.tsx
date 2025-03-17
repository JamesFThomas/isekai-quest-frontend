import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { Button, Stack, TextField } from '@mui/material';

import { Form } from '@/app/formstable/page';

type UserFormProps = {
  formData: Form;
  formType: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const initialFormData = {
  Id: 0,
  FirstName: '',
  LastName: '',
  Message: '',
  Completed: false,
};

const UserForm = ({ formData, formType, setIsModalOpen }: UserFormProps) => {
  const [form, setForm] = useState(initialFormData);

  // TODO create form using React Hook Form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      Id: form.Id,
      FirstName: form.FirstName,
      LastName: form.LastName,
      Message: form.Message,
      Completed: form.Completed,
    },
  });

  useEffect(() => {
    if (formData) {
      setForm(formData);
      reset(formData);
    }
  }, [formData, reset]);

  const handleSubmitMine: SubmitHandler<typeof form> = () => {
    console.log(formType);
    console.log('form', form);
    reset(initialFormData);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitMine)}>
      <Stack direction='column' spacing={3} mt={2}>
        <Controller
          name='Id'
          control={control}
          render={({ field }) => (
            <TextField {...field} label='Id' id='Id' variant='outlined' />
          )}
        />

        <Controller
          name='FirstName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='FirstName'
              id='FirstName'
              variant='outlined'
            />
          )}
        />

        <Controller
          name='LastName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='LastName'
              id='LastName'
              variant='outlined'
            />
          )}
        />

        <Controller
          name='Message'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Message'
              id='Message'
              variant='outlined'
              multiline
            />
          )}
        />

        <Controller
          name='Completed'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Completed'
              id='Completed'
              variant='outlined'
            />
          )}
        />
      </Stack>
      <Stack direction='row' spacing={2} justifyContent={'center'} mt={2}>
        <Button variant='contained' type='submit'>
          Submit
        </Button>
        <Button variant='contained' onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
