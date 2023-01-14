import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { PopUpResult } from '../../components/PopUpResult/PopUpResult';
import { PuzzleCollect } from '../../components/Puzzles/PuzzleCollect';
import { PuzzleSettings } from '../../components/PuzzleSettings/PuzzleSettings';
import { WithChooseIndex, CookieIndex } from '../../hoc/WithChooseIndex';
import { WithFetchWords } from '../../hoc/WithFetchWords';
import { WordDataType } from '../../redux/dataTypes';

import s from './puzzle.module.scss';

type PuzzlesType = {
  increase: () => void;
  word: WordDataType;
};

const Puzzles: React.FC<PuzzlesType> = ({ word, increase }) => {
  const [mode, setMode] = React.useState<'easy' | 'hard'>('easy');
  const [disRestart, setDisRestart] = React.useState(false);
  const [disNext, setDisNext] = React.useState(false);
  const [showPopUp, setShowPopUp] = React.useState(false);

  const [deleteComponent, setDeleteComponent] = React.useState(false);

  const [collectedWord, setCollectedWord] = React.useState(false);

  const resetFunc = React.useRef<Function>(null);

  const showRestart = React.useCallback((value: boolean) => {
    setDisRestart(value);
  }, []);

  const showNext = React.useCallback(
    (value: boolean, str?: string[], noChanges?: boolean) => {
      if (!noChanges) {
        str && str.join('') === word['eng'].split(' ').join('').toLowerCase()
          ? setCollectedWord(true)
          : setCollectedWord(false);
      }

      setDisNext(value);
    },
    [word],
  );

  const skip = () => {
    increase();
    setShowPopUp(false);
    setDisRestart(false);
    setDisNext(false);
    setDeleteComponent(true);
  };

  const checkResult = () => {
    setShowPopUp(true);
  };

  const changeModeSettings = (val: typeof mode): void => {
    setMode(val);
    setDisNext(false);
    setDisRestart(false);
    setDeleteComponent(true);
  };

  React.useEffect(() => {
    setDeleteComponent(false);
  }, [deleteComponent]);

  const restartChild = () => {
    setDisNext(false);
    setDisRestart(false);
    resetFunc.current && resetFunc.current();
  };

  return (
    <div className={s.wrapper}>
      <PuzzleSettings mode={mode} changeModeSettings={changeModeSettings} />

      {!deleteComponent && (
        <PuzzleCollect
          word={word}
          mode={mode}
          resetFunc={resetFunc}
          showRestart={showRestart}
          showNext={showNext}
        />
      )}
      {!deleteComponent && (
        <div className={s.buttonContainer}>
          <Button
            variant='contained'
            onClick={restartChild}
            className={clsx(disRestart && s.buttonOpacity)}
          >
            again
          </Button>

          <Button
            variant='contained'
            className={clsx(!disNext && s.buttonOpacity)}
            onClick={skip}
          >
            skip
          </Button>

          <Button
            variant='contained'
            onClick={checkResult}
            className={clsx(disNext && s.buttonOpacity)}
          >
            Check
          </Button>
        </div>
      )}

      <PopUpResult
        open={showPopUp}
        wrong={!collectedWord}
        phrase={word['eng']}
        next={skip}
        word={word}
        mode={'nat'}
      />
    </div>
  );
};

export default WithFetchWords(
  WithChooseIndex(Puzzles, CookieIndex.PUZZLE_LAST_INDEX),
);
