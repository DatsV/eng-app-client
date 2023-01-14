import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import clsx from 'clsx';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorPayloadType, LoginUserDto } from '../../api/types';
import EyeClose from '../../assets/icons/eye_password_close.svg';
import EyeOpen from '../../assets/icons/eye_password_open.svg';
import { useAppDispatch } from '../../redux/hooks';
import { fetchLoginUser } from '../../redux/thunk/userThunk';
import { LoginSchema } from '../../schemas/authSchema';
import s from './auth.module.scss';
import { ForgotPassword } from './ForgotPassword';
import { FormField } from './FormField';

type LoginProps = {
  change: () => void;
  changeForm: 'login' | 'register';
};

export const Login: React.FC<LoginProps> = ({ change, changeForm }) => {
  const dispatch = useAppDispatch();
  const [hidePass, setHidePass] = React.useState(true);
  const [forgotPass, setForgotPass] = React.useState(false);
  const form = useForm<LoginUserDto>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema),
  });

  const submit: SubmitHandler<LoginUserDto> = async (data) => {
    const res = await dispatch(fetchLoginUser(data));
    if (res.meta.requestStatus === 'rejected') {
      const payload = res.payload as ErrorPayloadType;

      const message = payload?.message || 'Oops.. something went wrong';

      form.setError('password', {
        message,
      });
    }
  };

  return (
    <>
      <div
        className={clsx(s.authFormLogin, changeForm === 'register' && s.hide)}
      >
        {!forgotPass ? (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(submit)} noValidate>
              <div className={s.login}>
                <span className={s.title}>LOG IN</span>

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

                  <div className={s.helpLinks}>
                    <span onClick={() => setForgotPass(true)}>
                      Forgot password?
                    </span>
                    <span onClick={change}>Register</span>
                  </div>
                </div>

                <LoadingButton
                  loading={form.formState.isSubmitting}
                  disabled={
                    form.formState.isSubmitting ||
                    !!form.formState.errors.password ||
                    !!form.formState.errors.email
                  }
                  fullWidth
                  type='submit'
                  variant='contained'
                >
                  LogIn
                </LoadingButton>
              </div>
            </form>
          </FormProvider>
        ) : (
          <ForgotPassword setForgotPass={setForgotPass} />
        )}
      </div>
    </>
  );
};
