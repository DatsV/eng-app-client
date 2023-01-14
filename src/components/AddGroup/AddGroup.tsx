import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CreateNewGroup } from '../../api/types';
import { ShowSnackType } from '../../hoc/WithSnackBar';
import {
  ActiveGroupContext,
  ActiveGroupContextType,
} from '../../pages/Layout/Layout';
import gif from '../../assets/512x512.gif';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserAccessRights, getUserGroups } from '../../redux/slice/user';
import { GroupSchema } from '../../schemas/wordGroupSchema';
import s from './addgroup.module.scss';
import { AddRestriction } from '../AddRestriction/AddRestriction';
import { fetchAddGroup } from '../../redux/thunk/userThunk';

type AddGroupTypes = {
  showSnack: ShowSnackType;
  open: boolean;
  setOpenAddGroup: (v: boolean) => void;
};

export const AddGroup: React.FC<AddGroupTypes> = ({
  open,
  setOpenAddGroup,
  showSnack,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState<'add' | 'confirm'>('add');

  const { setActiveGroup } = useContext(
    ActiveGroupContext,
  ) as ActiveGroupContextType;

  const userGroups = useAppSelector(getUserGroups);
  const userAccessRights = useAppSelector(getUserAccessRights);
  const userGroupsCount = userGroups?.length;

  const {
    register,
    handleSubmit,
    watch,
    reset: formReset,
    getValues,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<CreateNewGroup>({
    mode: 'onChange',
    resolver: yupResolver(GroupSchema),
  });

  const addGroup = async () => {
    setLoading(true);
    const obj = {
      group: getValues('group'),
    };

    const { meta } = await dispatch(fetchAddGroup(obj));

    final(meta.requestStatus);
    showSnack(meta.requestStatus, 'addGroup', obj.group, 'add');
  };

  const closeAdd = () => {
    setLoading(false);
    setOpenAddGroup(false);
    setType('add');
  };

  const final = (status: 'fulfilled' | 'rejected') => {
    if (status === 'fulfilled') {
      setActiveGroup(getValues('group'), true);

      formReset();
      closeAdd();
      return;
    }

    status === 'rejected' && closeAdd();
  };

  const onSubmit = () => {
    const val = getValues('group').trim();

    if (!userGroups?.includes(val)) {
      setType('confirm');
      setValue('group', val);
      return;
    }

    setError('group', { message: 'group already exist' });
  };

  if (!userAccessRights && userGroupsCount && userGroupsCount >= 2) {
    return (
      <AddRestriction
        openAdd={open}
        close={() => setOpenAddGroup(false)}
        isGroup
      />
    );
  }

  return (
    <div className={clsx(s.addGroupWrapper, open && s.open)}>
      <form className={s.addGroup} onSubmit={handleSubmit(onSubmit)}>
        {type === 'add' ? (
          <>
            <span className={s.title}>Add a new group</span>

            <div className={s.areaContainers}>
              <span>Name your group</span>
              <TextField
                {...register('group')}
                helperText={errors.group?.message as string}
                error={!!errors.group?.message}
                className={s.textField}
                variant='filled'
                placeholder='Type'
                autoComplete='off'
                inputProps={{ maxLength: 20 }}
                fullWidth
              />
              {!errors.group?.message && (
                <span>{watch('group')?.length}/20</span>
              )}
            </div>

            <div className={s.buttons}>
              <Button
                className={s.backButton}
                onClick={() => setOpenAddGroup(false)}
                variant='contained'
                color='error'
              >
                Cancel
              </Button>
              <Button
                disabled={!isValid}
                type='submit'
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
            <span className={s.title}>Check for mistakes</span>

            <div className={s.areaContainers}>
              <span>Create a new group:</span>
              <span className={s.wordVariant}>{getValues('group')}</span>
            </div>

            <div className={s.buttons}>
              <Button
                className={s.backButton}
                onClick={() => setType('add')}
                variant='contained'
                color='error'
              >
                Back
              </Button>
              <Button
                onClick={addGroup}
                variant='contained'
                color='success'
                className={s.addButton}
              >
                Create
              </Button>
            </div>
          </>
        )}
      </form>

      {loading && <img className={s.preloader} src={gif} alt='loading' />}
    </div>
  );
};
