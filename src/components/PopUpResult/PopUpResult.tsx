import Button from '@mui/material/Button';
import React from 'react';
import s from './popupResult.module.scss';

import CheckMark from '../../assets/icons/check-mark.svg';
import WrongMark from '../../assets/icons/wrong_mark.svg';
import clsx from 'clsx';
import { WordDataType } from '../../redux/dataTypes';

interface PopUpProps {
  word: WordDataType;
  mode: 'eng' | 'nat';
  open: boolean;
  wrong: boolean;
  phrase: string;
  next: () => void;
  isTranslate?: boolean;
}

export const PopUpResult: React.FC<PopUpProps> = ({
  word,
  mode,
  open,
  wrong,
  phrase,
  next,
  isTranslate,
}) => {
  const [activeMode, setActiveMode] = React.useState(mode);

  React.useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  const newMode = activeMode === 'eng' ? 'nat' : 'eng';

  const handleSubmit = () => {
    next();
    setActiveMode(mode);
  };

  return (
    <div className={clsx(s.popWrapper, open && s.open)}>
      <div className={s.popUp}>
        <div className={s.popUpHeader}>
          {wrong ? (
            <>
              <img src={WrongMark} alt='wrong_mark' />
              <span className={s.wrong}>You Are Wrong</span>
            </>
          ) : (
            <>
              <img src={CheckMark} alt='check_mark' />
              <span className={s.correct}>You Are Right</span>
            </>
          )}
        </div>

        <div className={s.popUpPhrase}>
          {wrong && isTranslate ? (
            <>
              <span className={s.helper}>You entered</span>
              <span className={s.longPhrase}>{phrase}</span>
              <span className={s.helperSec}>
                {mode === activeMode ? 'But it is' : 'It is a translation'}
              </span>
              <span
                onClick={() => setActiveMode(newMode)}
                className={s.longPhrase}
              >
                {word[newMode]}
              </span>
            </>
          ) : (
            <>
              <span className={s.helper}>It is</span>
              <span
                onClick={() => setActiveMode(newMode)}
                className={s.longPhrase}
              >
                {word[newMode]}
              </span>
            </>
          )}

          <span className={s.tap}>Tap To Translate</span>
        </div>

        <div className={s.popUpButtons}>
          <Button onClick={handleSubmit} variant='contained'>
            next
          </Button>
        </div>
      </div>
    </div>
  );
};
