import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { Switcher } from '../../components/Switcher/Switcher';
import { WithBlockWords } from '../../hoc/WithBlockWords';
import { CookieIndex, WithChooseIndex } from '../../hoc/WithChooseIndex';
import { WithFetchWords } from '../../hoc/WithFetchWords';
import { WordDataType } from '../../redux/dataTypes';
import s from './choose.module.scss';

type ChooseType = {
  words: WordDataType[];
  index: number;
  increase: () => void;
};

const Choose: React.FC<ChooseType> = ({ words, increase, index }) => {
  const [disNext, setDisNext] = React.useState(false);

  const [mode, setMode] = React.useState<'eng' | 'nat'>('eng');
  const refs = React.useRef<React.RefObject<HTMLDivElement>[]>(
    new Array(4).fill('').map(() => React.createRef()),
  );

  const { mainWordObj, randomArr } = React.useMemo(() => {
    let randomArr: ChooseType['words'] = [];
    let usedIndex: number[] = [];

    const mainWordObj = words[index];
    usedIndex.push(index);

    const getRandom = () => {
      let num = Math.floor(Math.random() * words.length);
      let obj = words[num];

      if (usedIndex.includes(num)) {
        return;
      }

      usedIndex.push(num);
      return obj;
    };

    while (randomArr.length < 3) {
      let obj = getRandom();
      if (obj) {
        randomArr.push(obj);
      }
    }

    mainWordObj && randomArr.push(mainWordObj);
    randomArr.sort(() => Math.random() - 0.5);

    return {
      mainWordObj,
      randomArr,
    };
  }, [index]);

  const resetStyles = () => {
    for (let i = 0; i < refs.current.length; i++) {
      refs.current[i].current?.classList.remove(`${s.clicked}`);
    }
    setDisNext(false);
  };

  React.useEffect(() => {
    resetStyles();
  }, [mode]);

  const goNext = () => {
    resetStyles();
    increase();
  };

  const choose = (index: number) => {
    const b = refs.current[index];
    if (!disNext && b.current) {
      b.current.classList.add(`${s.clicked}`);
    }
    if (b.current?.classList.contains(`${s.correct}`)) {
      setDisNext(true);
    }
  };
  const activeMode = mode === 'eng' ? 'nat' : 'eng';

  return (
    <div className={s.wrapper}>
      <div className={s.switcher}>
        <Switcher
          activeButton={mode}
          setActiveButton={setMode}
          firstValue={'eng'}
          secondValue={'nat'}
          textOne={'English'}
          textTwo={'Native'}
        />
      </div>
      <div className={s.wordContainer}>
        <div className={s.wordBlock}>
          <span>{mainWordObj[mode]}</span>
        </div>
      </div>

      <div className={s.answerBlock}>
        {randomArr.map((item, index) => {
          return (
            <div key={index} className={clsx(s.variant, disNext && s.disable)}>
              <div
                onClick={() => choose(index)}
                ref={refs.current[index]}
                className={clsx(
                  s.answer,
                  item[mode] === mainWordObj[mode] && s.correct,
                )}
              >
                <span>{item[activeMode]}</span>
              </div>
            </div>
          );
        })}

        <div className={s.buttonBlock}>
          {!disNext && (
            <Button onClick={goNext} variant='contained'>
              Skip
            </Button>
          )}
          {disNext && (
            <Button onClick={goNext} variant='contained'>
              next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithFetchWords(
  WithBlockWords(WithChooseIndex(Choose, CookieIndex.CHOOSE_LAST_INDEX)),
);
