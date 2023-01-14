import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { fetchRemoveWords } from '../../redux/thunk/wordThunk';
import { DictionaryType } from '../../pages/Dictionary/Dictionary';
import TrashIco from '../../assets/icons/trash_bin.svg';
import DictIco from '../../assets/icons/text-book-svgrepo-com.svg';

import s from './wordListItem.module.scss';
import { WordDataType } from '../../redux/dataTypes';

type WType = {
  obj: WordDataType;
} & DictionaryType;

export const WordListItem: React.FC<WType> = ({ obj, showSnack }) => {
  const dispatch = useAppDispatch();

  const [translate, setTranslate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [confirm, setConfirm] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    (translate || confirm) &&
      document.body.addEventListener('click', handleOut);
    (translate || confirm) &&
      document.body.addEventListener('touchmove', handleOut);

    return () => {
      document.body.removeEventListener('click', handleOut);
      document.body.removeEventListener('touchmove', handleOut);
    };
  }, [translate, confirm]);

  type EventType = MouseEvent | TouchEvent;

  const handleOut = (e: EventType) => {
    if (!ref.current?.contains(e.target as HTMLDivElement)) {
      setTranslate(false);

      setConfirm(false);
    }
  };

  const remove = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setLoading(true);

    const { meta } = await dispatch(fetchRemoveWords(obj.id as string));

    showSnack(meta.requestStatus, 'addWord', obj.eng, 'remove');

    setLoading(false);
  };

  return (
    <>
      <div
        ref={ref}
        className={clsx(
          s.item,
          translate && s.translate,
          loading && s.removing,
        )}
      >
        <div className={s.words} onClick={() => setTranslate(!translate)}>
          <img src={DictIco} alt='book' width={20} />

          <div className={s.english}>{obj.eng}</div>
          <div className={s.native}>{obj.nat}</div>
        </div>
        {
          <Button
            className={clsx(
              s.removeButton,
              (confirm || loading) && s.removeButtonHide,
            )}
            variant='outlined'
            onClick={(e) => {
              setConfirm(true);
            }}
          >
            <img src={TrashIco} alt='rubbish bin' width={18} />
          </Button>
        }
        {confirm && !loading && (
          <Button
            size='small'
            className={s.confirmButton}
            onClick={remove}
            color='success'
            variant='contained'
          >
            Confirm
          </Button>
        )}

        {loading && (
          <div className={s.loaderContainer}>
            <div className={s.loaderBall}></div>
          </div>
        )}
      </div>
    </>
  );
};

export const WordLoader = () => {
  return <div className={clsx(s.item, s.skeletonLoad)}></div>;
};
