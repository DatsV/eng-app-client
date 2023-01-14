import React from 'react';
import s from './menu.module.scss';
import UserIco from '../../assets/icons/user-svgrepo-com.svg';
import CardIco from '../../assets/icons/cards_icon.svg';
import ChooseIco from '../../assets/icons/choose-icon.svg';
import PuzzleIco from '../../assets/icons/puzzle-svgrepo-com.svg';
import TransIco from '../../assets/icons/translate.svg';
import DictIco from '../../assets/icons/open-book-book-svgrepo-com.svg';
import LogOutIco from '../../assets/icons/log_out_icon.svg';
import clsx from 'clsx';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { MouseEType } from '../Puzzles/types';
import { useAppDispatch } from '../../redux/hooks';
import { userLogOut } from '../../redux/slice/user';
import { Button } from '@mui/material';

export const Menu = () => {
  const dispatch = useAppDispatch();
  const ref = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [askLogOut, setAskLogOut] = React.useState(false);

  const handleCloseOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
      setMenuOpen(false);
    }
  };

  const handleCloseLink = (
    e: MouseEType<HTMLAnchorElement | HTMLDivElement>,
  ) => {
    e.stopPropagation();
    setMenuOpen(false);
  };

  React.useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleCloseOutside);
    }
    return () => document.removeEventListener('click', handleCloseOutside);
  }, [menuOpen]);

  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${s.active}` : '';

  const logOut = () => {
    setAskLogOut(false);
    dispatch(userLogOut());
    navigate('/auth');
  };

  return (
    <>
      <div
        className={clsx(s.wrapper, menuOpen && s.active)}
        ref={ref}
        onClick={() => setMenuOpen(true)}
      >
        <div className={s.backLight}></div>
        <div className={s.menu}>
          <div className={s.userBar}>
            <NavLink
              to='/profile'
              className={setActive}
              onClick={handleCloseLink}
            >
              <img src={UserIco} alt='user_ico' />
            </NavLink>

            <div className={s.title}>
              <span>Smart Dictionary</span>
              <span>By Petya English</span>
            </div>
            <div
              onClick={(e) => {
                handleCloseLink(e);
                setAskLogOut(true);
              }}
            >
              <div className={s.userBar_item}>
                <img src={LogOutIco} alt='user_ico' />
              </div>
            </div>
          </div>
          <nav className={s.navigate}>
            <ul>
              <li>
                <NavLink
                  to='/cards'
                  className={setActive}
                  onClick={handleCloseLink}
                >
                  <div className={s.navigate_item}>
                    <div>
                      <img src={CardIco} alt='user_ico' />
                    </div>
                    <span>Cards</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/puzzles'
                  className={setActive}
                  onClick={handleCloseLink}
                >
                  <div className={s.navigate_item}>
                    <div>
                      <img
                        className={s.fixPos}
                        src={PuzzleIco}
                        alt='user_ico'
                      />
                    </div>

                    <span>Puzzle</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/choose'
                  className={setActive}
                  onClick={handleCloseLink}
                >
                  <div className={s.navigate_item}>
                    <div>
                      <img src={ChooseIco} alt='user_ico' />
                    </div>
                    <span>Choose</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/translate'
                  className={setActive}
                  onClick={handleCloseLink}
                >
                  <div className={s.navigate_item}>
                    <div>
                      <img src={TransIco} alt='user_ico' />
                    </div>
                    <span>Translate</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/dictionary'
                  className={setActive}
                  onClick={handleCloseLink}
                >
                  <div className={s.navigate_item}>
                    <div className={s.dictionary}>
                      <img src={DictIco} alt='user_ico' />
                    </div>
                    <span>Dictionary</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={s.footer}>
            <div onClick={handleCloseLink} className={s.helper}></div>
            MENU
          </div>
        </div>
      </div>
      <div className={clsx(s.logOut, askLogOut && s.open)}>
        <div className={s.logOutContainer}>
          <span>LOG OUT</span>
          <span>Are you sure?</span>

          <div className={s.buttons}>
            <Button
              onClick={() => setAskLogOut(false)}
              variant='contained'
              color='error'
            >
              Back
            </Button>
            <Button
              onClick={logOut}
              variant='contained'
              color='success'
              className={s.addButton}
            >
              LogOut
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
