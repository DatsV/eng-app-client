/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import {
  ActiveGroupContext,
  ActiveGroupContextType,
} from '../pages/Layout/Layout';
import { WordDataType } from '../redux/dataTypes';
import s from './styles/withChooseIndex.module.scss';

type Ty = {
  increase: () => void;
  decrease: () => void;
  word: WordDataType;
  index: number;
  words: WordDataType[];
};

export enum CookieIndex {
  TRANSLATE_LAST_INDEX = 'TRANSLATE_LAST_INDEX',
  PUZZLE_LAST_INDEX = 'PUZZLE_LAST_INDEX',
  CARD_LAST_INDEX = 'CARD_LAST_INDEX',
  CHOOSE_LAST_INDEX = 'CHOOSE_LAST_INDEX',
}

export const WithChooseIndex =
  (Component: React.ComponentType<Ty>, componentName: CookieIndex) =>
  ({ words }: { words: Ty['words'] }) => {
    const [index, setIndex] = React.useState<number>(0);
    const [showLastPop, setShowLastPop] = React.useState(false);
    const [showAskPop, setShowAskPop] = React.useState(true);
    const lastSavedIndex = React.useRef<number | null>(null);
    const [askVariant, setAskVariant] = React.useState(0);
    const [randomMode, setRandomMode] = React.useState(false);

    const { activeGroup } = useContext(
      ActiveGroupContext,
    ) as ActiveGroupContextType;

    const blockForCards = componentName === CookieIndex.CARD_LAST_INDEX;

    const nameMode = componentName.split('_')[0];

    const randomIndex = () => {
      let newNumb;
      const a = () => {
        const num = Math.floor(Math.random() * words.length);
        if (num === index) {
          return;
        }
        return num;
      };

      while (!newNumb) {
        const l = a();
        if (l) {
          newNumb = l;
        }
      }

      return newNumb;
    };

    React.useEffect(() => {
      setShowAskPop(true);
      let lastIndex = window.localStorage.getItem(
        componentName + `_${activeGroup || 'All'}`,
      );

      if (lastIndex && +lastIndex > 0) {
        if (+lastIndex > words.length - 1) {
          lastSavedIndex.current = words.length - 1;
          setIndex(words.length - 1);
          return;
        }
        lastSavedIndex.current = +lastIndex;
        setIndex(+lastIndex);
      }
    }, []);

    React.useEffect(() => {
      if (randomMode) {
        return;
      }

      window.localStorage.setItem(
        componentName + `_${activeGroup || 'All'}`,
        `${index}`,
      );
    }, [index]);

    const increase = () => {
      if (randomMode) {
        setIndex(randomIndex());
        return;
      }

      if (index === words.length - 1 && !randomMode) {
        setShowLastPop(true);
        setIndex(0);
        return;
      }

      setIndex(index + 1);
    };

    const decrease = () => {
      if (index === 0) {
        return;
      }
      setIndex(index - 1);
    };

    React.useEffect(() => {
      showLastPop &&
        setTimeout(() => {
          setShowLastPop(false);
        }, 2500);
    }, [showLastPop]);

    const chooseVariant = () => {
      let num = askVariant;

      switch (num) {
        case 1:
          setIndex(0);
          setShowAskPop(false);
          break;
        case 2:
          lastSavedIndex.current && setIndex(lastSavedIndex.current);
          setShowAskPop(false);
          break;
        case 3:
          setRandomMode(true);
          setIndex(randomIndex());
          setShowAskPop(false);
          break;

        default:
          break;
      }
    };

    return (
      <>
        {showLastPop && (
          <div className={s.lastPop}>
            <div className={s.lastPopContainer}>
              <span>
                It was the last word in your list, now you will start again
                automatically
              </span>
            </div>
          </div>
        )}
        {showAskPop && (
          <div className={s.askPop}>
            <div className={s.askPopContainer}>
              <div className={s.modeTitle}>{nameMode}</div>
              <div className={s.groupInfo}>
                <span>
                  group: <span className={s.group}>{activeGroup || 'All'}</span>
                </span>
              </div>

              <div className={s.title}>
                Where do we start?
                <span> Choose one</span>
              </div>

              <div
                className={clsx(s.variant, askVariant === 1 && s.active)}
                onClick={() => setAskVariant(1)}
              >
                From the beginning
              </div>
              <div
                className={clsx(
                  s.variant,
                  !lastSavedIndex.current && s.disabled,
                  askVariant === 2 && s.active,
                )}
                onClick={() => setAskVariant(2)}
              >
                Where you stopped
              </div>
              {!blockForCards && (
                <div className={s.randomContainer}>
                  <div
                    className={clsx(
                      s.variant,
                      words.length <= 30 && s.disabled,
                      askVariant === 3 && s.active,
                    )}
                    onClick={() => setAskVariant(3)}
                  >
                    Random selection
                  </div>
                  <div className={clsx(s.helper, words.length >= 30 && s.hide)}>
                    Dictionary must have more than 30 words
                  </div>
                </div>
              )}

              <div className={s.button}>
                <Button
                  disabled={askVariant === 0}
                  variant='contained'
                  onClick={chooseVariant}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        )}
        {!showAskPop && (
          <Component
            increase={increase}
            word={words[index]}
            words={words}
            decrease={decrease}
            index={index}
          />
        )}
      </>
    );
  };
