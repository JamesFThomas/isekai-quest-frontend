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

import StatusAlert from '../Alerts/StatusAlert';

import { Form } from '../Tables/FormsTableView';
import { deployedURL } from './LoginRegForm';

const initialFormData = {
  Id: 0,
  FirstName: '',
  LastName: '',
  Message: '',
  Completed: false,
};

type UserFormProps = {
  formData: Form;
  formType: number;
  idNumbers: number[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  fetchReFetchData: () => Promise<void>;
};

const UserForm = ({
  formData,
  formType,
  idNumbers,
  setIsModalOpen,
  fetchReFetchData,
}: UserFormProps) => {
  const [form, setForm] = useState(initialFormData);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      Id: form.Id,
      FirstName: form.FirstName,
      LastName: form.LastName,
      Message: form.Message,
      Completed: form.Completed,
    },
  });

  const formValues = watch();
  const { FirstName: FNvalue, LastName: LNvalue, Message: Mvalue } = formValues;

  const isFormFieldsEmpty = !FNvalue || !LNvalue || !Mvalue;

  useEffect(() => {
    if (formData) {
      setForm(formData);
      reset(formData);
    }
  }, [formData, reset]);

  const handleNoUpdatedData = () => {
    setIsAlertOpen(true);
    setAlertMessage(
      'No changes detected, please make changes before submitting'
    );
  };

  const handleFailedFormSubmission = () => {
    setIsAlertOpen(true);
    setAlertMessage('Failed to submit the form. Please try again.');
  };

  const submitNewForm = useCallback(async (newForm: Form) => {
    try {
      const response = await fetch(`${deployedURL}/Forms`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(newForm),
      });

      if (!response.ok) {
        handleFailedFormSubmission();
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('result', result);

      if (
        result.FirstName === null &&
        result.LastName === null &&
        result.Message === null
      ) {
        handleFailedFormSubmission();
        return;
      }

      // Following successful submission reset the form and close the modal
      if (!isAlertOpen) {
        reset(initialFormData);
        setIsModalOpen(false);
        await fetchReFetchData();
      }
    } catch (error) {
      handleFailedFormSubmission();
      console.error('Fetch Error', error);
    }
  }, []);

  const submitUpdatedForm = useCallback(
    async (updatedForm: Form, formId: number) => {
      try {
        // TODO add logic to compare updated data to original data, do not submit if no changes
        if (
          updatedForm.FirstName === formData.FirstName &&
          updatedForm.LastName === formData.LastName &&
          updatedForm.Message === formData.Message &&
          updatedForm.Completed === formData.Completed
        ) {
          handleNoUpdatedData();
          return;
        }

        const submissionObject: Form = {
          Id: formId, // Id is not updated
          FirstName: updatedForm.FirstName,
          LastName: updatedForm.LastName,
          Message: updatedForm.Message,
          Completed: updatedForm.Completed,
        };

        const response = await fetch(`${deployedURL}/Forms/${formId}`, {
          method: 'PUT',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify(submissionObject),
        });

        if (!response.ok) {
          handleFailedFormSubmission();
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await response.text();

        // Following successful submission reset the form and close the modal
        if (!isAlertOpen) {
          reset(initialFormData);
          setIsModalOpen(false);
          await fetchReFetchData();
        }
      } catch (error) {
        handleFailedFormSubmission();
        console.error('Fetch Error', error);
      }
    },
    []
  );

  const submitForm: SubmitHandler<Form> = async (data) => {
    if (formType === 1) {
      await submitNewForm(data);
    } else {
      // original form Id is disabled in form but not updated so we can pass it here
      await submitUpdatedForm(data, form.Id);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* TODO add status Alert for failed form submission here */}
      <StatusAlert
        isShowing={isAlertOpen}
        setIsAlertShowing={setIsAlertOpen}
        message={alertMessage}
        status='error'
      />
      <Stack direction='column' spacing={3} mt={2}>
        <Controller
          disabled={formType === 2}
          name='Id'
          control={control}
          rules={{
            required: 'An Id is required',
            validate: {
              isNotInUse: (value) =>
                idNumbers.includes(value)
                  ? 'Please choose another Id# this one is already in use'
                  : true,
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
              label='Id'
              id='Id'
              variant='outlined'
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />

        <Stack direction='row' display='flex' spacing={2}>
          <Controller
            name='FirstName'
            control={control}
            rules={{
              required: 'A FirstName is required',
              pattern: {
                value: /^[-\s'A-Za-z]+$/i,
                message:
                  'FirstName can only have letters, spaces, apostrophes or hyphens',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                sx={{ flexGrow: 1 }}
                label='FirstName'
                id='FirstName'
                variant='outlined'
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />

          <Controller
            name='LastName'
            control={control}
            rules={{
              required: 'A LastName is required',
              pattern: {
                value: /^[-\s'A-Za-z]+$/i,
                message:
                  'LastName can only have letters, spaces, apostrophes or hyphens',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                sx={{ flexGrow: 1 }}
                label='LastName'
                id='LastName'
                variant='outlined'
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </Stack>

        <Controller
          name='Message'
          control={control}
          rules={{
            required: 'Please enter a message',
            pattern: {
              value: /^.{2,300}$/i,
              message: 'Message must be between 2 and 300 characters long',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Message'
              id='Message'
              variant='outlined'
              multiline
              rows={4}
              error={!!error}
              helperText={error ? error.message : null}
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
        <Button
          disabled={isAlertOpen || isFormFieldsEmpty}
          variant='contained'
          type='submit'
        >
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
