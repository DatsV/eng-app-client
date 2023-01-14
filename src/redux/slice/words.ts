import { WordDataType } from './../dataTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchAddGroup } from '../thunk/userThunk';
import {
  fetchDictionary,
  fetchAddWords,
  fetchRemoveWords,
  fetchSearchWords,
} from '../thunk/wordThunk';

interface WordState {
  data: WordDataType[] | null;
  status: 'loading' | 'success' | 'error' | 'initial';
}

const initialState: WordState = {
  data: null,
  status: 'initial',
};

const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDictionary.pending, (state) => {
      return {
        ...state,
        status: 'loading',
      };
    });
    builder.addCase(fetchDictionary.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
        status: 'success',
      };
    });
    builder.addCase(fetchDictionary.rejected, (state) => {
      return {
        ...state,
        data: state.data,
        status: 'error',
      };
    });
    builder.addCase(fetchAddWords.fulfilled, (state, action) => {
      if (!state.data) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    });

    builder.addCase(fetchRemoveWords.fulfilled, (state, action) => {
      if (!state.data) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        data: [...state.data.filter((obj) => obj.id != action.meta.arg)],
      };
    });
    builder.addCase(fetchAddGroup.fulfilled, (state) => {
      return {
        ...state,
        data: [],
      };
    });
    builder.addCase(fetchSearchWords.pending, (state) => {
      return {
        ...state,
        status: 'loading',
      };
    });
    builder.addCase(fetchSearchWords.rejected, (state) => {
      return {
        ...state,
        status: 'error',
      };
    });
    builder.addCase(fetchSearchWords.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
        status: 'success',
      };
    });
  },
});

export const {} = wordSlice.actions;

export const getWords = (state: RootState) => state.words.data;
export const getDictionaryStatus = (state: RootState) => state.words.status;

export default wordSlice.reducer;
