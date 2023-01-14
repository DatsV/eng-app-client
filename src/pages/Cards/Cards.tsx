import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { CookieIndex, WithChooseIndex } from '../../hoc/WithChooseIndex';
import { WithFetchWords } from '../../hoc/WithFetchWords';
import { Switcher } from '../../components/Switcher/Switcher';
import s from './cards.module.scss';
import { WordDataType } from '../../redux/dataTypes';

type CardType = {
  word: WordDataType;
  index: number;
  increase: () => void;
  decrease: () => void;
};

const Cards: React.FC<CardType> = ({ word, increase, decrease, index }) => {
  const mainCard = React.useRef<HTMLDivElement>(null);
  const repCard = React.useRef<HTMLDivElement>(null);
  const backCard = React.useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = React.useState(false);
  const [activeMode, setActiveMode] = React.useState<'eng' | 'nat'>('eng');
  const [isTap, setIsTap] = React.useState(false);

  const backMode = activeMode === 'eng' ? 'nat' : 'eng';

  const removeAnim = () => {
    backCard.current?.classList.remove(`${s.sec_card_prev}`);
    mainCard.current?.classList.remove(`${s.card_prev}`);
    mainCard.current?.classList.remove(`${s.card_next}`);
    repCard.current?.classList.remove(`${s.fir_card_next}`);
  };

  const nextCard = () => {
    removeAnim();
    setIsTap(false);
    setDisabled(true);

    setTimeout(() => {
      mainCard.current?.classList.add(`${s.card_next}`);
      repCard.current?.classList.add(`${s.fir_card_next}`);
      increase();
      disButton();
    }, 0);
  };

  const prevCard = () => {
    removeAnim();
    setIsTap(false);
    setDisabled(true);

    setTimeout(() => {
      mainCard.current?.classList.add(`${s.card_prev}`);
      backCard.current?.classList.add(`${s.sec_card_prev}`);
      decrease();
      disButton();
    }, 0);
  };

  const disButton = () => {
    setTimeout(() => {
      setDisabled(false);
    }, 700);
  };

  const tap = () => {
    setIsTap(!isTap);
  };

  return (
    <>
      <div className={s.content}>
        <div className={s.mode}>
          <Switcher
            activeButton={activeMode}
            setActiveButton={setActiveMode}
            firstValue={'eng'}
            secondValue={'nat'}
            textOne={'English'}
            textTwo={'Native'}
          />
        </div>
        <div className={s.cards}>
          <div onClick={tap} ref={mainCard} className={s.card}>
            <div className={clsx(s.inner, isTap && s.inner_tap)}>
              <div className={s.inner_front}>
                <p>{word[activeMode]}</p>
              </div>
              <div className={s.inner_back}>
                <p>{word[backMode]}</p>
              </div>
            </div>
            <div className={s.translate}>
              <p>Tap to Translate</p>
            </div>
          </div>

          <div ref={repCard} className={s.fir_card}></div>

          <div ref={backCard} className={s.sec_card}>
            <div className={s.inner}>
              <div className={s.inner_front}>
                <p>{word[activeMode]}</p>
              </div>
              <div className={s.inner_back}>
                <p>{word[backMode]}</p>
              </div>
            </div>
            <div className={s.translate}>
              <p>Tap to Translate</p>
            </div>
          </div>

          <div className={s.thi_card}></div>

          <div className={s.fou_card}></div>
        </div>

        <div className={s.butBox}>
          <Button
            disabled={disabled || index === 0}
            onClick={prevCard}
            variant='contained'
          >
            Back
          </Button>
          <Button disabled={disabled} onClick={nextCard} variant='contained'>
            NEXT
          </Button>
        </div>
      </div>
    </>
  );
};

export default WithFetchWords(
  WithChooseIndex(Cards, CookieIndex.CARD_LAST_INDEX),
);
