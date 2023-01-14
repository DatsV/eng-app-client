import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorPayloadType } from '../../api/types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchMakeUserVip } from '../../redux/thunk/userThunk';
import { CodeSchema } from '../../schemas/authSchema';
import { FormField } from '../Auth/FormField';
import s from './codeForm.module.scss';

type CodeFormTypes = {
  goBack?: () => void;
  post?: boolean;
  addCode?: (data: { id: number; code: string }) => void;
  adminpost?: boolean;
  onSuccess?: () => void;
  setFeedBack?: (val: boolean) => void;
  showRes?: (val: 'success' | 'fail') => void;
};

export const CodeForm: React.FC<CodeFormTypes> = ({
  goBack,
  post,
  onSuccess,
  adminpost,
  addCode,
  setFeedBack,
  showRes,
}) => {
  const dispatch = useAppDispatch();
  const form = useForm<{ code: string }>({
    mode: 'onSubmit',
    resolver: yupResolver(CodeSchema),
  });

  const submit: SubmitHandler<{ code: string }> = async (data) => {
    if (post) {
      const res = await dispatch(fetchMakeUserVip(data));

      if (res.meta.requestStatus === 'rejected') {
        const payload = res.payload as ErrorPayloadType;

        const message = payload?.message || 'Oops.. try please later';

        form.setError('code', {
          message,
        });
        return;
      }
      onSuccess && onSuccess();
    }

    if (adminpost) {
      setFeedBack && setFeedBack(true);
      try {
        const res = await axios.post(
          process.env.REACT_APP_URL +
            '/code?secret=' +
            process.env.REACT_APP_SECRET_CODE,
          data,
        );

        if (res.status === 201) {
          form.reset();
          addCode && addCode(res.data);
          showRes && showRes('success');
        }
      } catch (error) {
        showRes && showRes('fail');
      } finally {
        setFeedBack && setFeedBack(false);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)} noValidate>
        <div className={s.recoverForm}>
          <span className={s.title}>
            {adminpost ? 'Add code' : 'Enter Code'}
          </span>

          <FormField
            name='code'
            label='Code'
            type='text'
            optionClass={s.error}
          />

          <LoadingButton
            loading={form.formState.isSubmitting}
            disabled={
              form.formState.isSubmitting || !!form.formState.errors.code
            }
            fullWidth
            variant='contained'
            type='submit'
          >
            {adminpost ? 'Add' : 'Activate'}
          </LoadingButton>

          {goBack && (
            <Button onClick={goBack} variant='contained' fullWidth>
              Back
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
