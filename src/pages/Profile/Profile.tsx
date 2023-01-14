import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeForm } from '../../components/CodeForm/CodeForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserAccessRights, getUserAll } from '../../redux/slice/user';
import { fetchResendMail } from '../../redux/thunk/userThunk';
import s from './profile.module.scss';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getUserAll);
  const userAccessRights = useAppSelector(getUserAccessRights);

  const [variant, setVariant] = React.useState<'profile' | 'code'>('profile');
  const [popUp, setPopUp] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);
  const [showEmailError, setShowEmailError] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const onSuccess = () => {
    setVariant('profile');
    setPopUp(true);
  };

  const onClose = () => {
    setVariant('code');
    setPopUp(false);
    navigate('/dictionary');
    setShowEmail(false);
    setShowEmailError(false);
  };

  const resendMail = async () => {
    setPending(true);
    const res = await dispatch(fetchResendMail());
    setPending(false);

    if (res.meta.requestStatus === 'rejected') {
      setShowEmailError(true);
    }
    setShowEmail(true);
    setPopUp(true);
  };

  return (
    <div className={clsx(s.profile)}>
      <div className={s.profileContainer}>
        {variant === 'profile' ? (
          <>
            <div className={s.item}>
              <span className={s.email}>{user?.email.split('@')[0]}</span>
            </div>

            <div className={s.item}>
              <span className={s.category}>Status: </span>
              <span className={s.value}>
                {userAccessRights ? 'VIP' : 'TRIAL'}
              </span>
            </div>

            <div className={s.item}>
              <span className={s.category}>Groups: </span>
              <span className={s.value}>{user?.groups.length || 0}</span>
            </div>

            <div className={s.item}>
              <span className={s.category}>Words: </span>
              <span className={s.value}>{user?.words || 0}</span>
            </div>

            <div className={clsx(s.buttons, s.item)}>
              {!user?.isVip && (
                <Button onClick={() => setVariant('code')} variant='contained'>
                  Update the Status
                </Button>
              )}

              {!user?.isConfirm && user?.isVip && (
                <LoadingButton
                  loading={pending}
                  onClick={resendMail}
                  variant='contained'
                >
                  Send a Confirmation
                </LoadingButton>
              )}

              <Button
                onClick={() => navigate('/dictionary')}
                variant='contained'
              >
                Dictionary
              </Button>
            </div>
          </>
        ) : (
          <CodeForm
            goBack={() => setVariant('profile')}
            post
            onSuccess={onSuccess}
          />
        )}
      </div>

      <div className={clsx(s.popUp, popUp && s.open)}>
        <div>
          {!showEmail ? (
            <>
              Code is successfully verified. We have sent a confirmation email,
              after the verification your status will be updated
            </>
          ) : (
            <>
              {showEmailError ? (
                <>Something went wrong, please try later</>
              ) : (
                <>We have sent a confirmation letter, check your email</>
              )}
            </>
          )}
          <Button onClick={onClose} variant='contained'>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
