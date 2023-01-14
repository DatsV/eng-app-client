import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from '../../components/Menu/Menu';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserGroups } from '../../redux/slice/user';
import { fetchDictionary } from '../../redux/thunk/wordThunk';
import s from './layout.module.scss';

export type ActiveGroupContextType = {
  activeGroup: string;
  setActiveGroup: (val: string, withOutReq?: boolean) => void;
};

export type SearchInputValueContextType = {
  inputValue: string;
  setInputValue: (val: string) => void;
};

export const ActiveGroupContext =
  React.createContext<ActiveGroupContextType | null>(null);

export const SearchInputValueContext =
  React.createContext<SearchInputValueContextType | null>(null);

export const Layout: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [activeGroup, setActiveGroup] = React.useState<string>('');
  const dispatch = useAppDispatch();

  const userGroups = useAppSelector(getUserGroups);

  const save = (val: string) => {
    localStorage.setItem('engActiveGroup', val);
  };

  const setGroup = (val: string, withOutReq?: boolean) => {
    setActiveGroup(val);
    save(val);
    !withOutReq && dispatch(fetchDictionary(val));
    localStorage.setItem('engAppSearchVal', '');
    setInputValue('');
  };

  React.useEffect(() => {
    localStorage.setItem('engAppSearchVal', '');
    let group = localStorage.getItem('engActiveGroup') || '';

    if (userGroups && !userGroups.includes(group) && userGroups?.length > 0) {
      group = userGroups[userGroups.length - 1];
      save(group);
    }

    if (userGroups && !userGroups.includes(group) && userGroups?.length <= 0) {
      group = '';
      save(group);
    }
    setActiveGroup(group);
    dispatch(fetchDictionary(group));
  }, []);

  return (
    <>
      <Menu />
      <div className={s.appContainer}>
        <ActiveGroupContext.Provider
          value={{ activeGroup, setActiveGroup: setGroup }}
        >
          <SearchInputValueContext.Provider
            value={{ inputValue, setInputValue }}
          >
            <Outlet />
          </SearchInputValueContext.Provider>
        </ActiveGroupContext.Provider>
      </div>
    </>
  );
};
