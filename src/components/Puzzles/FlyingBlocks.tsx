import { clsx } from 'clsx';
import React from 'react';

import s from './puzzles.module.scss';
import { CoordinatesType, MouseEType, PuzRefType } from './types';

type FlyingBlocksProps = {
  randomArr: string[];
  answerRef: React.MutableRefObject<PuzRefType>;
  getPosition: (event: HTMLElement) => CoordinatesType;
  movePuzzle: (event: MouseEType<HTMLDivElement>) => void;
  reset: () => void;
};

export const FlyingBlocks: React.FC<FlyingBlocksProps> = ({
  randomArr,
  getPosition,
  movePuzzle,
  answerRef,
  reset,
}) => {
  const [resize, setResize] = React.useState(false);

  React.useEffect(() => {
    let time: NodeJS.Timeout;

    const resize = () => {
      setResize(true);
      clearTimeout(time);
      time = setTimeout(() => {
        reset();
        setResize(false);
      }, 300);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    };
  }, []);

  return (
    <>
      {!resize &&
        randomArr.map((el, i) => {
          const { top, left } = getPosition(
            answerRef.current[i].current as HTMLDivElement,
          );

          return (
            <div
              key={i}
              style={{ top: top, left: left }}
              id={`${i}@fs`}
              onClick={movePuzzle}
              className={clsx(s.box, s.answersBlock)}
            >
              <span className={s.text}>{randomArr[i]}</span>
            </div>
          );
        })}
    </>
  );
};
