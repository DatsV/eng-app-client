import React, { useContext } from 'react';
import s from './dictionary.module.scss';

import { Button } from '@mui/material';
import clsx from 'clsx';
import OpenIco from '../../assets/icons/open-book.svg';
import { AddGroup } from '../../components/AddGroup/AddGroup';
import { AddWord } from '../../components/AddWord/AddWord';
import { DictionarySearch } from '../../components/DictionarySearch/DictionarySearch';
import { Loader } from '../../components/Loader/Loader';
import { SelectGroup } from '../../components/SelectGroup/SelectGroup';
import Lock from '../../assets/icons/lock.svg';
import {
  WordListItem,
  WordLoader,
} from '../../components/WordListItem/WordListItem';
import { ShowSnackType, WithSnackBar } from '../../hoc/WithSnackBar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getDictionaryStatus, getWords } from '../../redux/slice/words';
import {
  ActiveGroupContext,
  ActiveGroupContextType,
  SearchInputValueContext,
  SearchInputValueContextType,
} from '../Layout/Layout';
import { RemoveGroup } from '../../components/RemoveGroup/RemoveGroup';
import { getUserAccessRights, getUserGroups } from '../../redux/slice/user';
import { fetchDictionary, fetchSearchWords } from '../../redux/thunk/wordThunk';

export type DictionaryType = {
  showSnack: ShowSnackType;
};

const Dictionary: React.FC<DictionaryType> = ({ showSnack }) => {
  const dispatch = useAppDispatch();
  const { activeGroup } = useContext(
    ActiveGroupContext,
  ) as ActiveGroupContextType;

  const { inputValue } = useContext(
    SearchInputValueContext,
  ) as SearchInputValueContextType;

  const userGroupsCount = useAppSelector(getUserGroups)?.length;
  const userAccessRights = useAppSelector(getUserAccessRights);

  const words = useAppSelector(getWords);
  const [openAddWord, setOpenAddWord] = React.useState(false);
  const [openAddGroup, setOpenAddGroup] = React.useState(false);
  const [openRemoveGroup, setRemoveGroup] = React.useState(false);
  const dictionaryStatus = useAppSelector(getDictionaryStatus);

  const showAddGroupButton =
    !userAccessRights && userGroupsCount && userGroupsCount >= 2;

  const refreshDictionary = () => {
    inputValue &&
      dispatch(fetchSearchWords({ group: activeGroup, value: inputValue }));
    !inputValue && dispatch(fetchDictionary(activeGroup));
  };

  const replacementArr = new Array(40).fill('');
  return (
    <div className={s.wrapper}>
      <div className={s.headerContainer}>
        <div className={s.titleBlock}>
          <img src={OpenIco} alt='book' width={40} />
          <div>Dictionary</div>
          <img src={OpenIco} alt='book' width={40} />
        </div>
        <div className={s.mainButtons}>
          <DictionarySearch />

          {
            <div
              className={clsx(s.addWordButtonContainer, !activeGroup && s.hide)}
            >
              <div className={s.blockAddWordButton}>
                <img src={Lock} alt='lock' />
              </div>
              <Button
                onClick={() => setOpenAddWord(true)}
                className={s.addWordButton}
                variant='outlined'
              >
                Add a word
              </Button>
            </div>
          }
        </div>

        <div className={s.groupSelect}>
          <SelectGroup setOpenAddGroup={setOpenAddGroup} />
          <span className={s.helper}>Tap a word to translate</span>
        </div>
      </div>

      <div className={s.container}>
        {dictionaryStatus === 'success' && words && (
          <div className={s.box}>
            {words.length ? (
              words.map((el) => {
                return (
                  <WordListItem key={el.id} obj={el} showSnack={showSnack} />
                );
              })
            ) : (
              <div className={s.boxSearchFeed}>No words found</div>
            )}

            <div className={s.lastWord}>
              {activeGroup ? (
                <div className={s.lastWordButGroup}>
                  <Button
                    onClick={() => setOpenAddWord(true)}
                    variant='contained'
                  >
                    Add a Word
                  </Button>

                  <Button
                    onClick={() => setRemoveGroup(true)}
                    variant='contained'
                    color='error'
                  >
                    Delete this group
                  </Button>
                </div>
              ) : (
                <>
                  {!showAddGroupButton && (
                    <Button
                      onClick={() => setOpenAddGroup(true)}
                      variant='contained'
                    >
                      Create a new Group
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {dictionaryStatus === 'loading' && (
          <div className={clsx(s.box, s.skeletonBox)}>
            {replacementArr.map((_, i) => {
              return <WordLoader key={i} />;
            })}
            <Loader />
          </div>
        )}

        {dictionaryStatus === 'error' && (
          <div className={s.errorBlock}>
            <span>Oops...</span>
            <span>Something went wrong</span>
            <span>Try to reload the page again later</span>
            <Button onClick={refreshDictionary} variant='contained'>
              Reload
            </Button>
          </div>
        )}
      </div>

      <AddWord
        showSnack={showSnack}
        openAdd={openAddWord}
        setOpenAdd={setOpenAddWord}
      />

      <AddGroup
        open={openAddGroup}
        setOpenAddGroup={setOpenAddGroup}
        showSnack={showSnack}
      />

      <RemoveGroup
        showSnack={showSnack}
        openRemoveGroup={openRemoveGroup}
        setRemoveGroup={setRemoveGroup}
      />
    </div>
  );
};

export default WithSnackBar(Dictionary);
