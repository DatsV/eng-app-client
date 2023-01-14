import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api/axios';
import { CreateNewWord } from '../../api/types';

export const fetchDictionary = createAsyncThunk(
  '/words/fetchDictionary',
  async (group: string, { rejectWithValue }) => {
    try {
      const data = await Api().words.getData(group);
      return data;
    } catch (error) {
      console.warn('fetchDictionary ERROR');
      return rejectWithValue('');
    }
  },
);

export const fetchAddWords = createAsyncThunk(
  '/words/fetchAddWords',
  async (dto: CreateNewWord, { rejectWithValue }) => {
    try {
      const data = await Api().words.addWord(dto);

      return data;
    } catch (error) {
      console.warn('fetchAddWords ERROR');
      return rejectWithValue('');
    }
  },
);

export const fetchRemoveWords = createAsyncThunk(
  '/words/fetchRemoveWords',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await Api().words.removeWord(id);

      return data;
    } catch (error) {
      console.warn('fetchRemoveWords ERROR');
      return rejectWithValue('');
    }
  },
);

export const fetchSearchWords = createAsyncThunk(
  '/words/fetchSearchWords',
  async ({ group, value }: { group: string; value: string }) => {
    const data = await Api().words.searchWord(group, value);

    return data;
  },
);
