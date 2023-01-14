import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { ErrorPayloadType, LoginUserDto } from '../../api/types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchRecoverPassMail } from '../../redux/thunk/userThunk';
import { RecoverPassSchema } from '../../schemas/authSchema';
import s from './auth.module.scss';
import { FormField } from './FormField';

type ForgotPasswordType = {
  setForgotPass: (val: boolean) => void;
};

export const ForgotPassword: React.FC<ForgotPasswordType> = ({
  setForgotPass,
}) => {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const formPass = useForm<Pick<LoginUserDto, 'email'>>({
    mode: 'onSubmit',
    resolver: yupResolver(RecoverPassSchema),
  });

  const submit: SubmitHandler<Pick<LoginUserDto, 'email'>> = async (data) => {
    const res = await dispatch(fetchRecoverPassMail({ email: data.email }));

    if (res.meta.requestStatus === 'rejected') {
      const payload = res.payload as ErrorPayloadType;

      const message = payload?.message || 'Oops.. something went wrong';

      formPass.setError('email', {
        message,
      });
      return;
    }

    setShowSuccess(true);
  };

  return (
    <FormProvider {...formPass}>
      <form onSubmit={formPass.handleSubmit(submit)} noValidate>
        <div className={s.recover}>
          <span className={s.title}>RECOVER PASSWORD</span>

          <FormField
            name='email'
            label='Email'
            type='email'
            optionClass={s.error}
          />

          <div>
            <div className={clsx(s.recoverSuccess, showSuccess && s.show)}>
              We have sent a recover letter
            </div>

            <div className={s.buttonsGroup}>
              <LoadingButton
                className={s.buttonMargin}
                loading={formPass.formState.isSubmitting}
                disabled={
                  formPass.formState.isSubmitting ||
                  !!formPass.formState.errors.email ||
                  showSuccess
                }
                fullWidth
                variant='contained'
                type='submit'
              >
                Recover
              </LoadingButton>
              <Button
                onClick={() => setForgotPass(false)}
                fullWidth
                variant='contained'
                className={s.buttonMargin}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
