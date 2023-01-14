import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAddWords } from '../../redux/thunk/wordThunk';
import { AddWordSchema } from '../../schemas/wordGroupSchema';
import s from './addWord.module.scss';

import gif from '../../assets/512x512.gif';
import { ShowSnackType } from '../../hoc/WithSnackBar';
import {
  ActiveGroupContext,
  ActiveGroupContextType,
} from '../../pages/Layout/Layout';
import { getUserAccessRights, getUserWordsCount } from '../../redux/slice/user';
import { AddRestriction } from '../AddRestriction/AddRestriction';

type AddWordType = {
  showSnack: ShowSnackType;
  openAdd: boolean;
  setOpenAdd: (val: boolean) => void;
};

export const AddWord: React.FC<AddWordType> = ({
  showSnack,
  openAdd,
  setOpenAdd,
}) => {
  const { activeGroup } = useContext(
    ActiveGroupContext,
  ) as ActiveGroupContextType;
  const [parts, setParts] = React.useState<'add' | 'confirm'>('add');
  const [loading, setLoading] = React.useState(false);

  const userAccessRights = useAppSelector(getUserAccessRights);
  const userWordsCount = useAppSelector(getUserWordsCount);

  const {
    register,
    handleSubmit,
    watch,
    reset: formReset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AddWordSchema),
  });

  const dispatch = useAppDispatch();

  const closeAdd = () => {
    setLoading(false);
    setOpenAdd(false);
    setParts('add');
  };

  const checkForEmpty = (value: string) => {
    const array = value.split(' ');

    while (array.includes('')) {
      let index = array.indexOf('');
      array.splice(index, 1);
    }

    return array.join(' ');
  };

  const addWord = async () => {
    const obj = {
      eng: `${getValues('english')}`,
      nat: `${getValues('translate')}`,
      group: activeGroup,
    };
    setLoading(true);
    const { meta } = await dispatch(fetchAddWords(obj));
    final(meta.requestStatus);
    showSnack(meta.requestStatus, 'addWord', obj.eng, 'add');
  };

  const onSubmit = () => {
    setValue('english', checkForEmpty(getValues('english')));
    setValue('translate', checkForEmpty(getValues('translate')));
    setParts('confirm');
  };

  const final = (status: 'fulfilled' | 'rejected') => {
    if (status === 'fulfilled') {
      closeAdd();
      formReset();
      return;
    }
    status === 'rejected' && closeAdd();
  };

  if (!userAccessRights && userWordsCount && userWordsCount >= 20) {
    return <AddRestriction openAdd={openAdd} close={closeAdd} />;
  }

  if (userAccessRights && userWordsCount && userWordsCount >= 1000) {
    return <AddRestriction openAdd={openAdd} close={closeAdd} isLimit />;
  }

  return (
    <>
      <div className={clsx(s.addFormContainer, openAdd && s.open)}>
        <form className={s.addForm} onSubmit={handleSubmit(onSubmit)}>
          {parts === 'add' ? (
            <>
              <div className={s.titleContainer}>
                <span className={s.title}>Add a new word or a phrase</span>
                <span>
                  to group: <span className={s.group}>{activeGroup}</span>
                </span>
              </div>

              <div className={s.areaContainers}>
                <span>English</span>
                <TextField
                  {...register('english')}
                  helperText={errors.english?.message as string}
                  error={!!errors.english?.message}
                  className={s.textField}
                  variant='filled'
                  placeholder='Type'
                  minRows={2}
                  maxRows={5}
                  inputProps={{ maxLength: 40 }}
                  multiline
                  fullWidth
                />
                {!errors.english?.message && (
                  <span>{watch('english')?.length}/40</span>
                )}
              </div>
              <div className={s.areaContainers}>
                <span>Translate</span>
                <TextField
                  {...register('translate')}
                  helperText={errors.translate?.message as string}
                  error={!!errors.translate?.message}
                  className={s.textField}
                  variant='filled'
                  placeholder='Type'
                  minRows={2}
                  maxRows={5}
                  inputProps={{ maxLength: 40 }}
                  multiline
                  fullWidth
                />
                {!errors.translate?.message && (
                  <span>{watch('translate')?.length}/40</span>
                )}
              </div>

              <div className={s.buttons}>
                <Button onClick={closeAdd} variant='contained' color='error'>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={!isValid}
                  variant='contained'
                  color='success'
                  className={s.addButton}
                >
                  Confirm
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className={s.titleContainer}>
                <span className={s.title}>Check for mistakes</span>
                <span>
                  Group: <span className={s.group}>{activeGroup}</span>
                </span>
              </div>

              <div className={s.areaContainers}>
                <span>English:</span>
                <span className={s.wordVariant}>{getValues('english')}</span>
              </div>
              <div className={s.areaContainers}>
                <span>Translation:</span>
                <span className={s.wordVariant}>{getValues('translate')}</span>
              </div>

              <div className={s.buttons}>
                <Button
                  onClick={() => setParts('add')}
                  variant='contained'
                  color='error'
                  disabled={loading}
                  className={s.backButton}
                >
                  Back
                </Button>
                <Button
                  onClick={addWord}
                  variant='contained'
                  color='success'
                  disabled={loading}
                  className={s.addButton}
                >
                  Add
                </Button>
              </div>
            </>
          )}
        </form>

        {loading && <img className={s.preloader} src={gif} alt='loading' />}
      </div>
    </>
  );
};
