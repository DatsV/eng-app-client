import { Button, Input } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { CodeForm } from '../../components/CodeForm/CodeForm';
import s from './adminPage.module.scss';

type CodesType = {
  id: number;
  code: string;
};

export const AdminPage = () => {
  const [passwordVal, setPasswordVal] = React.useState('');
  const [codes, setCodes] = React.useState<CodesType[]>([]);
  const [access, setAccess] = React.useState(false);
  const [feedBack, setFeedBack] = React.useState(false);
  const [requestRes, setRequestRes] = React.useState(false);
  const [result, setResult] = React.useState('');

  const check = () => {
    if (passwordVal === process.env.REACT_APP_ADMINPASS) {
      setAccess(true);
    }
  };

  const addCode = (data: CodesType) => {
    setCodes((codes) => [...codes, data]);
  };

  const deleteCode = async (id: number) => {
    setFeedBack(true);
    try {
      const res = await axios.delete(
        process.env.REACT_APP_URL +
          '/code/' +
          id +
          '?secret=' +
          process.env.REACT_APP_SECRET_CODE,
      );

      showRes('success');
      setCodes(codes.filter((el) => el.id !== id));
      return;
    } catch (error) {
      showRes('fail');
    } finally {
      setFeedBack(false);
    }
  };

  const showRes = (val: 'success' | 'fail') => {
    setResult(val);
    setRequestRes(true);
  };

  React.useEffect(() => {
    const time = setTimeout(() => {
      setRequestRes(false);
    }, 4000);

    return () => clearTimeout(time);
  }, [requestRes]);

  const getAllCodes = async () => {
    setFeedBack(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL +
          '/code?secret=' +
          process.env.REACT_APP_SECRET_CODE,
      );

      showRes('success');
      setCodes(res.data);
      return;
    } catch (error) {
      showRes('fail');
    } finally {
      setFeedBack(false);
    }
  };

  return (
    <div className={s.wrapper}>
      {!access ? (
        <div className={s.auth}>
          <span>Admin Password</span>
          <Input
            placeholder='password'
            type='password'
            value={passwordVal}
            onChange={(e) => setPasswordVal(e.currentTarget.value)}
          />
          <Button onClick={check} variant='contained'>
            Log in
          </Button>
        </div>
      ) : (
        <div className={s.editWrapper}>
          {feedBack && <div className={s.feedBack}>Loading</div>}
          {requestRes && <div className={s.feedBack}>{result}</div>}
          <div className={s.editItem}>
            <div className={s.codeContainer}>
              {codes &&
                codes.map((el) => {
                  return (
                    <div className={s.codeItem} key={el.id}>
                      <div>{el.code}</div>
                      <div
                        onClick={() => deleteCode(el.id)}
                        className={s.remove}
                      >
                        del
                      </div>
                    </div>
                  );
                })}
            </div>
            <Button
              onClick={getAllCodes}
              variant='contained'
              className={s.button}
            >
              get all codes
            </Button>
          </div>

          <div className={s.editItem}>
            <CodeForm
              adminpost
              addCode={addCode}
              setFeedBack={setFeedBack}
              showRes={showRes}
            />
          </div>
        </div>
      )}
    </div>
  );
};
