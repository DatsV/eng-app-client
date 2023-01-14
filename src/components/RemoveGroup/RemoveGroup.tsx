import { Button } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import {
  ActiveGroupContext,
  ActiveGroupContextType,
} from '../../pages/Layout/Layout';
import gif from '../../assets/512x512.gif';
import s from './removeGroup.module.scss';
import { ShowSnackType } from '../../hoc/WithSnackBar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserGroups } from '../../redux/slice/user';
import { fetchRemoveGroup } from '../../redux/thunk/userThunk';

type RemoveGroupType = {
  openRemoveGroup: boolean;
  setRemoveGroup: (val: boolean) => void;
  showSnack: ShowSnackType;
};

export const RemoveGroup: React.FC<RemoveGroupType> = ({
  openRemoveGroup,
  setRemoveGroup,
  showSnack,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const userGroups = useAppSelector(getUserGroups);
  const { activeGroup, setActiveGroup } = useContext(
    ActiveGroupContext,
  ) as ActiveGroupContextType;

  const deleteGroup = async () => {
    setLoading(true);
    const { meta } = await dispatch(fetchRemoveGroup(activeGroup));
    setRemoveGroup(false);
    setLoading(false);

    if (userGroups) {
      const index = userGroups?.indexOf(activeGroup);
      const length = userGroups?.length;

      showSnack(meta.requestStatus, 'addGroup', activeGroup, 'remove');

      if (index === 0 && length > 1) {
        setActiveGroup(userGroups[index + 1]);
        return;
      }

      if (index === 0 && length === 1) {
        setActiveGroup('');
        return;
      }

      setActiveGroup(userGroups[index - 1]);
    }
  };

  return (
    <div className={clsx(s.removeGroup, openRemoveGroup && s.open)}>
      <div className={s.removeGroupWrapper}>
        <span className={s.title}>Warning</span>

        <span>When you delete a group the words will be deleted too</span>

        <span>
          Delete group: <span className={s.group}>{activeGroup}</span> ?
        </span>

        <div className={s.buttons}>
          <Button
            onClick={() => setRemoveGroup(false)}
            variant='contained'
            color='error'
          >
            Cancel
          </Button>
          <Button
            onClick={deleteGroup}
            variant='contained'
            color='success'
            className={s.addButton}
          >
            Confirm
          </Button>
        </div>
        {loading && <img className={s.preloader} src={gif} alt='loading' />}
      </div>
    </div>
  );
};
