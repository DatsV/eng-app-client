import clsx from 'clsx';
import React from 'react';
import s from './loader.module.scss';

export const Loader = ({ normal }: { normal?: boolean }) => {
  return (
    <div className={clsx(s.container, normal && s.fix)}>
      <div className={s.book}>
        <div className={s.inner}>
          <div className={s.left}></div>
          <div className={s.middle}></div>
          <div className={s.right}></div>
        </div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className={s.loading}>Loading</div>
    </div>
  );
};
