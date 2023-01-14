import { userApi } from './userApi';
import { wordsApi } from './wordsApi';
import axios from 'axios';

export const Api = () => {
  const authToken = localStorage.getItem('engAppToken') || '';

  const instance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return {
    words: wordsApi(instance),
    user: userApi(instance),
  };
};
