import {
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import React, { useContext } from 'react';
import {
  ActiveGroupContext,
  ActiveGroupContextType,
} from '../../pages/Layout/Layout';
import { useAppSelector } from '../../redux/hooks';
import { getUserGroups } from '../../redux/slice/user';

import s from './select.module.scss';

type SelectGroupType = {
  setOpenAddGroup: (v: boolean) => void;
};

export const SelectGroup: React.FC<SelectGroupType> = ({ setOpenAddGroup }) => {
  const { activeGroup, setActiveGroup } = useContext(
    ActiveGroupContext,
  ) as ActiveGroupContextType;

  const userGroups = useAppSelector(getUserGroups);

  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setActiveGroup(event.target.value);
  };

  const close = () => {
    setOpenAddGroup(true);
  };

  return (
    <div>
      <FormControl>
        <Select
          onClick={() => setOpen(!open)}
          value={activeGroup}
          onChange={handleChange}
          displayEmpty
          open={open}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value=''>
            <em>All</em>
          </MenuItem>
          {userGroups?.map((el) => {
            return (
              <MenuItem key={el} value={`${el}`}>
                {el}
              </MenuItem>
            );
          })}

          <div className={s.butContainer}>
            <Button
              className={s.addButton}
              variant='contained'
              style={{ margin: '0 auto' }}
              onClick={close}
            >
              Add
            </Button>
          </div>
        </Select>
      </FormControl>
    </div>
  );
};
