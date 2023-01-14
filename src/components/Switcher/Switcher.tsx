import Button from '@mui/material/Button';
import clsx from 'clsx';
import React from 'react';
import s from './switcher.module.scss';

interface SwitcherProps {
  activeButton: boolean | string;
  setActiveButton: (value: any) => void;
  firstValue: boolean | string;
  secondValue: boolean | string;
  textOne: string;
  textTwo: string;
}

export const Switcher: React.FC<SwitcherProps> = ({
  activeButton,
  setActiveButton,
  firstValue,
  secondValue,
  textOne,
  textTwo,
}) => {
  return (
    <div className={s.switcher}>
      <Button
        className={clsx(
          s.button,

          activeButton === firstValue && `${s.active}  ${s.disabled}`,
        )}
        onClick={() => setActiveButton(firstValue)}
        variant='outlined'
      >
        {textOne}
      </Button>
      <Button
        className={clsx(
          s.button,
          activeButton === secondValue && `${s.active}  ${s.disabled}`,
        )}
        onClick={() => setActiveButton(secondValue)}
        variant='outlined'
      >
        {textTwo}
      </Button>
    </div>
  );
};
