import { Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserStatus } from '../../redux/slice/user';
import { fetchActivateUser } from '../../redux/thunk/userThunk';

import s from './Activate.module.scss';

export const Activate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [broken, setBroken] = React.useState(false);
  const userStatus = useAppSelector(getUserStatus);

  const isLoading = userStatus === 'loading';

  const activate = async () => {
    const res = await dispatch(fetchActivateUser());

    if (res.meta.requestStatus === 'rejected') {
      setBroken(true);
      return;
    }
  };

  React.useEffect(() => {
    const query = searchParams.get('authtoken');

    if (!query) {
      setBroken(true);
      return;
    }

    localStorage.setItem('engAppToken', query);
    activate();
  }, []);

  const backToLogin = () => {
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <div className={s.container}>
        <span className={s.loader}></span>
      </div>
    );
  }

  return (
    <div className={s.activate}>
      <div className={s.activateWrapper}>
        {!broken ? (
          <div className={s.successBlock}>
            <span>Your Email is confirm successfully</span>
            <Button
              onClick={() => navigate('/dictionary')}
              variant='contained'
              type='submit'
            >
              Go to app
            </Button>
          </div>
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
