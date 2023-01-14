import { TextField } from '@mui/material';
import { clsx } from 'clsx';
import React, { useContext } from 'react';
import s from './dictionarySearch.module.scss';

import SearchIco from '../../assets/icons/search.svg';
import {
  ActiveGroupContext,
  ActiveGroupContextType,
  SearchInputValueContext,
  SearchInputValueContextType,
} from '../../pages/Layout/Layout';
import { useAppDispatch } from '../../redux/hooks';
import { fetchSearchWords } from '../../redux/thunk/wordThunk';
type EventType = MouseEvent | TouchEvent;

export const DictionarySearch = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [debouncedValue, setDebouncedValue] = React.useState('');
  const { activeGroup } = useContext(
    ActiveGroupContext,
  ) as ActiveGroupContextType;

  const { inputValue, setInputValue } = useContext(
    SearchInputValueContext,
  ) as SearchInputValueContextType;

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 800);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    localStorage.setItem('engAppSearchVal', inputValue);
    dispatch(
      fetchSearchWords({
        group: activeGroup,
        value: inputValue,
      }),
    );
  }, [debouncedValue]);

  React.useEffect(() => {
    const openHandler = (e: EventType) => {
      if (!ref.current?.contains(e.target as HTMLDivElement)) {
        setOpen(false);
      }
    };
    open && document.body.addEventListener('click', openHandler);
    return () => document.body.removeEventListener('click', openHandler);
  }, [open]);

  return (
    <div
      ref={ref}
      className={clsx(s.search, (open || inputValue) && s.open)}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(true);
      }}
    >
      <div className={s.icon}>
        <img src={SearchIco} alt='search' width={22} />
      </div>
      <div className={s.searchInput}>
        <TextField
          className={s.field}
          placeholder='search'
          variant='filled'
          autoComplete='off'
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          fullWidth
        />
      </div>
    </div>
  );
};
