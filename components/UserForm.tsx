import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from '@mui/material';

import { Form } from '@/app/formstable/page';

type UserFormProps = {
  formData: Form;
  formType: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  fetchReFetchData: () => Promise<void>;
};

const initialFormData = {
  Id: 0,
  FirstName: '',
  LastName: '',
  Message: '',
  Completed: false,
};

const UserForm = ({
  formData,
  formType,
  setIsModalOpen,
  fetchReFetchData,
}: UserFormProps) => {
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

  const submitNewForm = useCallback(async (form: Form) => {
    try {
      const response = await fetch('https://localhost:5001/Forms', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Fetch Error', error);
    }
  }, []);

  const submitUpdatedForm = useCallback(async (form: Form, Id: number) => {
    try {
      const response = await fetch(`https://localhost:5001/Forms/${Id}`, {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Fetch Error', error);
    }
  }, []);

  console.log('form before submit', form);

  const submitForm: SubmitHandler<Form> = async (data) => {
    console.log(formType);
    console.log('formData in submit', data);

    if (formType === 1) {
      await submitNewForm(data);
    } else {
      await submitUpdatedForm(data, data.Id);
    }

    reset(initialFormData);

    setIsModalOpen(false);

    await fetchReFetchData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack direction='column' spacing={3} mt={2}>
        <Controller
          name='Id'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
              label='Id'
              id='Id'
              variant='outlined'
            />
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
            <FormGroup>
              <FormControlLabel
                label='Completed'
                control={
                  <Checkbox
                    {...field}
                    id='Completed'
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
              />
            </FormGroup>
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
