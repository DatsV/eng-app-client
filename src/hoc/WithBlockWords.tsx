/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import s from '../pages/Choose/choose.module.scss';
import { WordDataType } from '../redux/dataTypes';

type S = {
  words: WordDataType[];
};

export const WithBlockWords =
  (Component: React.ComponentType<S>) =>
  ({ words }: S) => {
    const enough = words && words?.length >= 15;

    return (
      <>
        {enough ? (
          <Component words={words} />
        ) : (
          <div className={s.enoughWrapper}>
            <div className={s.container}>
              <span className={s.title}>
                For use this mode please add more than
                <span> 15 </span>
                words to your
                <Link to='/dictionary'>
                  <Button variant='contained'>dictionary</Button>
                </Link>
              </span>
            </div>
          </div>
        )}
      </>
    );
  };
