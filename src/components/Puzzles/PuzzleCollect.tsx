import { clsx } from 'clsx';
import React from 'react';
import { WordDataType } from '../../redux/dataTypes';
import { FlyingBlocks } from './FlyingBlocks';

import s from './puzzles.module.scss';
import { CoordinatesType, MouseEType, PuzRefType } from './types';

type PuzzleCollectProps = {
  word: WordDataType;
  mode: string;
  resetFunc: any;
  showRestart: (value: boolean) => void;
  showNext: (value: boolean, str?: string[], noChanges?: boolean) => void;
};

type ChangeType = (
  event: MouseEType<HTMLDivElement>,
  coordinates: CoordinatesType,
) => void;

export const PuzzleCollect: React.FC<PuzzleCollectProps> = React.memo(
  ({ word, mode, resetFunc, showRestart, showNext }) => {
    const [refs, setRefs] = React.useState(false);

    const [resetComponent, setResetComponent] = React.useState(false);
    const [initialMain, setInitialMain] = React.useState<string[] | null>(null);
    const [initialBack, setInitialBack] = React.useState<string[] | null>(null);

    let changePuzSizePhone = '';
    let refIndex = 0;
    let rowsLength = 0;
    let backArr: string[] = [];

    let { mainArr, randomArr, row } = React.useMemo(() => {
      let mainArr = word['eng'].trim().toLowerCase().split('');

      const randomArr: string[] = [];

      const getRandom = () => {
        const num = Math.floor(Math.random() * mainArr.length);
        const letter = mainArr[num];
        if (!letter || letter === ' ' || letter === '.') {
          return;
        }

        mainArr[num] = '.';
        return letter;
      };

      let complexity = mode === 'easy' ? 3 : 2;

      if (mainArr.length < 4) {
        complexity = 2;
      }

      while (randomArr.length < mainArr.length / complexity) {
        let letter = getRandom();
        if (letter) {
          randomArr.push(letter);
        }
      }

      const row = [...mainArr.join('').split(' ')];

      mainArr = [...mainArr.filter((el) => el !== ' ')];

      randomArr.sort();

      return {
        mainArr,
        randomArr,
        row,
      };
    }, [word, mode]);

    let currentWordArr = [...mainArr];

    const wordRef = React.useRef<PuzRefType>(
      mainArr.map(() => React.createRef()),
    );
    const answerRef = React.useRef<PuzRefType>(
      randomArr.map(() => React.createRef()),
    );

    const reset = () => {
      showNext(false, undefined, true);
      showRestart(false);
      setResetComponent(true);

      if (initialMain && initialBack) {
        mainArr = [...initialMain];
        currentWordArr = [...mainArr];
        backArr = [...initialBack];
      }
    };

    resetFunc.current = reset;

    React.useEffect(() => {
      if (!refs) {
        setInitialMain([...mainArr]);
        setInitialBack([...backArr]);

        setRefs(true);
        return;
      }

      reset();
      setResetComponent(false);
    }, [answerRef, resetComponent]);

    const rows = row.reduce((acc, row) => {
      if (row.length > rowsLength) {
        rowsLength = row.length;
      }
      const letters = row.split('');

      while (letters.includes('.')) {
        const index = letters.indexOf('.');
        letters[index] = '';
      }
      acc.push(letters);
      return acc;
    }, [] as string[][]);

    (function () {
      const classes: { [key: number]: string } = {
        7: '',
        8: s.small,
        9: s.smallOne,
        10: s.smallTwo,
        11: s.smallThree,
        12: s.smallFour,
        13: s.smallFive,
        14: s.smallSix,
      };

      if (rowsLength < 8) {
        changePuzSizePhone = classes[7];
        return;
      }
      if (rowsLength >= 14) {
        changePuzSizePhone = classes[14];
        return;
      }
      if (row.length >= 5 && (rowsLength === 8 || rowsLength === 9)) {
        changePuzSizePhone = classes[10];
        return;
      }

      changePuzSizePhone = classes[rowsLength] || '';
      return;
    })();

    const getPosition = (element: HTMLElement) => {
      const { offsetTop, offsetLeft } = element;
      return { top: offsetTop, left: offsetLeft };
    };

    const changeStyle: ChangeType = (event, coordinates) => {
      event.currentTarget.style.top = coordinates.top + 'px';
      event.currentTarget.style.left = coordinates.left + 'px';
    };

    const movePuzzle = (e: MouseEType<HTMLDivElement>) => {
      const target = e.currentTarget;

      if (mainArr.includes(target.id)) {
        showNext(false);

        const i = backArr.indexOf('');
        const f = mainArr.indexOf(target.id);

        const mainPos = getPosition(
          answerRef.current[i].current as HTMLDivElement,
        );

        changeStyle(e, mainPos);
        backArr[i] = target.id;
        mainArr[f] = '.';
        currentWordArr[f] = '';

        !backArr.includes('') && showRestart(false);
        return;
      }

      const i = mainArr.indexOf('.');
      mainArr[i] = target.id;

      currentWordArr[i] = target.textContent as string;
      const l = backArr.indexOf(target.id);

      backArr[l] = '';

      const puzzlePos = getPosition(target);
      changeStyle(e, puzzlePos);

      const mainPos = getPosition(wordRef.current[i].current as HTMLDivElement);
      changeStyle(e, mainPos);

      showRestart(true);

      if (!mainArr.includes('.')) {
        showNext(true, currentWordArr);

        return;
      }
    };

    return (
      <>
        <div className={clsx(s.container, changePuzSizePhone)}>
          <div className={s.containerWords}>
            {rows.map((word, index) => (
              <div key={index} className={s.wordsBlock}>
                {word.map((el, n) => {
                  let num = refIndex;

                  refIndex++;

                  return (
                    <div
                      key={n}
                      className={clsx(s.box, el === '' && s.dashed)}
                      ref={wordRef.current[num]}
                    >
                      <span className={s.text}>{el}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className={s.containerAnswers}>
            {randomArr.map((el, i) => {
              backArr.push(`${i}@fs`);
              return (
                <div
                  key={i}
                  ref={answerRef.current[i]}
                  className={clsx(s.dashed, s.box)}
                ></div>
              );
            })}
          </div>

          {refs && !resetComponent && (
            <FlyingBlocks
              answerRef={answerRef}
              randomArr={randomArr}
              movePuzzle={movePuzzle}
              getPosition={getPosition}
              reset={reset}
            />
          )}
        </div>
      </>
    );
  },
);
