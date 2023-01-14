/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { WordDataType } from '../redux/dataTypes';
import { useAppSelector } from '../redux/hooks';
import { getWords, getDictionaryStatus } from '../redux/slice/words';
import s from './styles/withFetchWords.module.scss';

type S = {
  words: WordDataType[];
};

export const WithFetchWords = (Component: React.FC<S>) => () => {
  const navigate = useNavigate();
  const words = useAppSelector(getWords);
  const wordsData = !!words?.length;

  const status = useAppSelector(getDictionaryStatus);
  const isLoaded = status === 'success';
  const error = status === 'error';

  const backToDictionary = () => {
    navigate('/dictionary');
  };

  return (
    <>
      {!words && !isLoaded && !error && <Loader normal />}
      {(error || !wordsData) && (
        <div className={s.errorBlock}>
          <div className={s.errorBlockContainer}>
            <span>Something went wrong</span>
            <span>You did not choose the words</span>

            <Button onClick={backToDictionary} variant='contained'>
              Dictionary
            </Button>
          </div>
        </div>
      )}
      {words && isLoaded && wordsData && <Component words={words} />}
    </>
  );
};
