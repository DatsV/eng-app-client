import clsx from 'clsx';
import React from 'react';
import s from './auth.module.scss';
import BackGround from '../../assets/icons/background.jpg';
import Share from '../../assets/icons/share-ios.svg';

import { Login } from './Login';
import { Register } from './Register';

export const Auth = () => {
  const [infoBar, setInfoBar] = React.useState(false);
  const [changeForm, setChangeForm] = React.useState<'login' | 'register'>(
    'login',
  );

  React.useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      setInfoBar(true);
    }
  }, []);

  return (
    <div className={s.wrapper}>
      <img className={s.backGroundImg} src={BackGround} alt='books' />
      <div className={s.mainContainer}>
        <div className={s.header}>
          <span>Smart Dictionary</span>
          <span className={s.helper}>By Petya English</span>
        </div>

        <div className={s.formContainer}>
          <Login
            change={() => setChangeForm('register')}
            changeForm={changeForm}
          />
          <Register
            change={() => setChangeForm('login')}
            changeForm={changeForm}
          />
        </div>

        <div className={s.blockDown}>
          <div className={clsx(s.infoBarContainer, infoBar && s.open)}>
            <div className={s.infoBarText}>
              <span>For better usage add this app to screen, </span>
              <span>
                press <img src={Share} alt='share' /> and "add to home screen"
              </span>
            </div>
            <div
              className={s.infoBarButton}
              onClick={() => setInfoBar(false)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
