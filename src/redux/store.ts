import { configureStore } from '@reduxjs/toolkit';
import words from './slice/words';
import user from './slice/user';

export const makeStore = configureStore({
  reducer: {
    words,
    user,
  },
});

export type RootState = ReturnType<typeof makeStore.getState>;

export type AppDispatch = typeof makeStore.dispatch;
