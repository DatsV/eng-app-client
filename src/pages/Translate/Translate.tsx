import { Button, TextField } from '@mui/material';
import React from 'react';
import { PopUpResult } from '../../components/PopUpResult/PopUpResult';
import { Switcher } from '../../components/Switcher/Switcher';
import { CookieIndex, WithChooseIndex } from '../../hoc/WithChooseIndex';
import { WithFetchWords } from '../../hoc/WithFetchWords';
import { WordDataType } from '../../redux/dataTypes';
import s from './translate.module.scss';

type TranslateProps = {
  increase: () => void;
  word: WordDataType;
};

const Translate: React.FC<TranslateProps> = ({ word, increase }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [mode, setMode] = React.useState<'eng' | 'nat'>('eng');
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);
  const [disableCheck, setDisableCheck] = React.useState(true);

  if (inputValue.length < 2 && !disableCheck) {
    setDisableCheck(true);
  }
  if (inputValue.length >= 2 && disableCheck) {
    setDisableCheck(false);
  }

  const usedWord = word;

  const anotherMode = mode === 'eng' ? 'nat' : 'eng';

  React.useEffect(() => {
    setInputValue('');
  }, [mode]);

  const checkAnswer = () => {
    setCorrect(false);
    let sti = usedWord[anotherMode].toLowerCase();
    if (sti === inputValue.trim().toLowerCase()) {
      setCorrect(true);
    }
    setOpenPopUp(true);
  };

  const next = () => {
    increase();
    setOpenPopUp(false);
    setInputValue('');
  };

  return (
    <div className={s.wrapper}>
      <div className={s.mode}>
        <Switcher
          activeButton={mode}
          setActiveButton={setMode}
          firstValue={'eng'}
          secondValue={'nat'}
          textOne={'English'}
          textTwo={'Native'}
        />
      </div>
      <div className={s.container}>
        <div className={s.wordContainer}>
          <div className={s.wordBlock}>
            <span>{usedWord[mode]}</span>
          </div>
        </div>

        <div className={s.answerBlock}>
          <div className={s.field}>
            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              placeholder='Write the translation'
              variant='standard'
              fullWidth
            />
          </div>
        </div>
      </div>

      <div className={s.button}>
        <Button
          disabled={disableCheck}
          onClick={checkAnswer}
          variant='contained'
        >
          Check answer
        </Button>
        <Button onClick={next} variant='contained'>
          Skip
        </Button>
      </div>

      <PopUpResult
        wrong={!correct}
        word={usedWord}
        next={next}
        open={openPopUp}
        mode={mode}
        phrase={inputValue}
        isTranslate
      />
    </div>
  );
};

export default WithFetchWords(
  WithChooseIndex(Translate, CookieIndex.TRANSLATE_LAST_INDEX),
);
