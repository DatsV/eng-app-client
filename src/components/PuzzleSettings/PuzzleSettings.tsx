import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import Settings from '../../assets/icons/settings-puzzle.svg';
import { MouseEType } from '../Puzzles/types';
import s from './puzzleSettings.module.scss';

type PuzzleSettingsType = {
  mode: 'easy' | 'hard';
  changeModeSettings: (val: 'easy' | 'hard') => void;
};

export const PuzzleSettings: React.FC<PuzzleSettingsType> = ({
  mode,
  changeModeSettings,
}) => {
  const settingsRef = React.useRef<HTMLDivElement>(null);
  const [openSettings, setOpenSettings] = React.useState(false);

  const changeMode = (e: MouseEType<HTMLButtonElement>) => {
    e.stopPropagation();
    mode === 'hard' ? changeModeSettings('easy') : changeModeSettings('hard');
    setOpenSettings(false);
  };

  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!settingsRef.current?.contains(e.target as HTMLDivElement)) {
        setOpenSettings(false);
      }
    };

    document.addEventListener('click', close);

    return () => document.removeEventListener('click', close);
  }, [openSettings]);

  return (
    <div
      ref={settingsRef}
      onClick={() => setOpenSettings(true)}
      className={clsx(s.settingsBlock, openSettings && s.active)}
    >
      <img
        src={Settings}
        alt='settings'
        onClick={(e) => {
          e.stopPropagation();
          setOpenSettings(false);
        }}
      />

      <div className={s.settingsButtons}>
        <div className={s.settingsButtons_title}>Mode</div>
        <div className={s.settingsButtons_group}>
          <Button
            onClick={changeMode}
            className={clsx(mode === 'hard' ? s.active : null)}
            disabled={mode === 'hard'}
            variant='text'
          >
            hard
          </Button>
          <Button
            onClick={changeMode}
            className={clsx(mode === 'easy' ? s.active : null)}
            disabled={mode === 'easy'}
            variant='text'
          >
            easy
          </Button>
        </div>
      </div>
    </div>
  );
};
