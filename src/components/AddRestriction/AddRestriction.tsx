import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import s from './addRestriction.module.scss';

type AddRestrictionType = {
  openAdd: boolean;
  close: () => void;
  isGroup?: boolean;
  isLimit?: boolean;
};

export const AddRestriction: React.FC<AddRestrictionType> = ({
  openAdd,
  close,
  isGroup,
  isLimit,
}) => {
  return (
    <div className={clsx(s.restrictionContainer, openAdd && s.open)}>
      <div className={s.restriction}>
        <span className={s.restrictionTitle}>
          {isLimit
            ? ' You can add only'
            : 'Вы на пробной версии. Если хотите добавить больше чем'}

          <span className={s.attention}>
            {isLimit ? ' 1000 words' : isGroup ? ' 2 группы' : ' 20 слов'}
          </span>
          {isLimit ? (
            <span>, please remove some words</span>
          ) : (
            <span>
              , приобретите любой из продуктов <br />
              <b>petya english</b>
            </span>
          )}
        </span>

        <div className={s.restrictionButtons}>
          {!isLimit && (
            <a href='https://petya-english.com/about-me' target='_blank'>
              <Button variant='contained'>Check our products</Button>
            </a>
          )}

          <Button onClick={close} variant='contained' color='error'>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
