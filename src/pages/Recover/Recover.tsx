import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RegisterUserDto } from '../../api/types';
import EyeClose from '../../assets/icons/eye_password_close.svg';
import EyeOpen from '../../assets/icons/eye_password_open.svg';
import { FormField } from '../../components/Auth/FormField';
import { RecoverSchema } from '../../schemas/authSchema';

import { useAppDispatch } from '../../redux/hooks';
import { fetchChangeUserPass } from '../../redux/thunk/userThunk';
import s from './recover.module.scss';

export const Recover = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hidePass, setHidePass] = React.useState(true);
  const [hidePassConfirm, setHidePassConfirm] = React.useState(true);
  const [broken, setBroken] = React.useState(false);

  const form = useForm<Omit<RegisterUserDto, 'email'>>({
    mode: 'onSubmit',
    resolver: yupResolver(RecoverSchema),
  });

  const submit: SubmitHandler<Omit<RegisterUserDto, 'email'>> = async (
    data,
  ) => {
    const res = await dispatch(fetchChangeUserPass(data));

    if (res.meta.requestStatus === 'rejected') {
      setBroken(true);
      return;
    }

    navigate('/dictionary');
  };

  const backToLogin = () => {
    navigate('/auth');
  };

  React.useEffect(() => {
    const query = searchParams.get('authtoken');

    if (!query) {
      setBroken(true);
      return;
    }

    localStorage.setItem('engAppToken', query);
  }, []);

  return (
    <div className={s.recover}>
      <div className={s.recoverWrapper}>
        {!broken ? (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(submit)} noValidate>
              <div className={s.recoverForm}>
                <span className={s.title}>CHANGE PASSWORD</span>

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
                </div>

                <LoadingButton
                  loading={form.formState.isSubmitting}
                  disabled={
                    form.formState.isSubmitting ||
                    !!form.formState.errors.password ||
                    !!form.formState.errors.passwordConfirm
                  }
                  fullWidth
                  variant='contained'
                  type='submit'
                >
                  Change
                </LoadingButton>
              </div>
            </form>
          </FormProvider>
        ) : (
          <div className={s.broken}>
            <span className={s.title}>Oops...</span>
            <span className={s.title}>It seems you have a broken URL</span>
            <span className={s.title}>Please try again later</span>

            <Button onClick={backToLogin} variant='contained' type='submit'>
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
