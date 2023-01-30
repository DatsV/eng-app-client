import React from 'react';
import Gear from '../../assets/icons/gear-technical-work.svg';
import s from './technicalWork.module.scss';

export const TechnicalWork = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <span>Smart Dictionary</span>
        <span className={s.helper}>By Petya English</span>
      </div>
      <span>Technical work</span>
      <img src={Gear} alt='gear' />
      <span className={s.helper}>The access will be provided soon</span>
    </div>
  );
};
