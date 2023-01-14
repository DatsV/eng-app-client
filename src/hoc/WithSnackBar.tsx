/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';

import { useSnackbar, VariantType } from 'notistack';
import { DictionaryType } from '../pages/Dictionary/Dictionary';
import s from './styles/withSnackBar.module.scss';

export type ShowSnackType = (
  requestStatus: 'fulfilled' | 'rejected',
  name: 'addWord' | 'addGroup',
  word: string,
  identify: 'add' | 'remove',
) => void;

export const WithSnackBar = (Component: React.FC<DictionaryType>) => () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const feedBack = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      action: (key) => (
        <>
          <div className={s.close} onClick={() => closeSnackbar(key)}></div>
        </>
      ),
      autoHideDuration: 2500,
      className: s.snack,
    });
  };

  const showSnack: ShowSnackType = (requestStatus, name, word, identify) => {
    const newWord = word.length <= 6 ? word : word.slice(0, 7) + '...';

    const variant = requestStatus === 'fulfilled' ? true : false;

    const massage = name === 'addWord' ? `"${newWord}"` : `group ${newWord}`;
    if (identify === 'remove') {
      variant && feedBack(`${massage} deleted`, 'success');
      !variant && feedBack(`Delete ${massage} is fail`, 'error');
      return;
    }

    if (identify === 'add') {
      variant && feedBack(`${massage} added`, 'success');
      !variant && feedBack(`Add ${massage} is fail`, 'error');
      return;
    }
  };

  return <Component showSnack={showSnack} />;
};
