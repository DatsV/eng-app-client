import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorPayloadType, RegisterUserDto } from '../../api/types';
import EyeClose from '../../assets/icons/eye_password_close.svg';
import EyeOpen from '../../assets/icons/eye_password_open.svg';
import { useAppDispatch } from '../../redux/hooks';
import { fetchRegisterUser } from '../../redux/thunk/userThunk';
import { RegisterSchema } from '../../schemas/authSchema';
import s from './auth.module.scss';
import { FormField } from './FormField';

type RegisterProps = {
  change: () => void;
  changeForm: 'login' | 'register';
};

export const Register: React.FC<RegisterProps> = ({ change, changeForm }) => {
  const dispatch = useAppDispatch();
  const [hidePass, setHidePass] = React.useState(true);
  const [hidePassConfirm, setHidePassConfirm] = React.useState(true);
  const form = useForm<RegisterUserDto>({
    mode: 'onSubmit',
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterUserDto> = async (data) => {
    const res = await dispatch(fetchRegisterUser(data));

    if (res.meta.requestStatus === 'rejected') {
      const payload = res.payload as ErrorPayloadType;
      const message = payload?.message || 'Oops.. something went wrong';
      form.setError('email', {
        message,
      });
    }
  };

  return (
    <div className={clsx(s.authFormRegister, changeForm === 'login' && s.hide)}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className={s.register}>
            <span className={s.title}>SIGN UP</span>

            <FormField
              name='email'
              label='Email'
              type='email'
              optionClass={s.error}
            />

            <div className={s.passwordInput}>
              <div
                onClick={() => setHidePass(!hidePass)}
                className={s.eyeBlock}
              >
                {hidePass ? (
                  <img className={s.eye} src={EyeClose} alt='hide' />
                ) : (
                  <img className={s.eye} src={EyeOpen} alt='show' />
                )}
              </div>

              <FormField
                name='password'
                label='Password'
                type={hidePass ? 'password' : 'text'}
                className={s.inp}
                optionClass={s.error}
              />
            </div>
            <div className={s.passwordInput}>
              <div
                onClick={() => setHidePassConfirm(!hidePassConfirm)}
                className={s.eyeBlock}
              >
                {hidePassConfirm ? (
                  <img className={s.eye} src={EyeClose} alt='hide' />
                ) : (
                  <img className={s.eye} src={EyeOpen} alt='show' />
                )}
              </div>
              <FormField
                name='passwordConfirm'
                label='Password'
                type={hidePassConfirm ? 'password' : 'text'}
                className={s.inp}
                optionClass={s.error}
              />

              <div className={s.buttonsGroup}>
                <LoadingButton
                  loading={form.formState.isSubmitting}
                  disabled={
                    form.formState.isSubmitting ||
                    !!form.formState.errors.password ||
                    !!form.formState.errors.email ||
                    !!form.formState.errors.passwordConfirm
                  }
                  fullWidth
                  variant='contained'
                  type='submit'
                >
                  SignUp
                </LoadingButton>
                <Button onClick={change} fullWidth variant='contained'>
                  Login
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
