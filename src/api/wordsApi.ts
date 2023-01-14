import { WordDataType } from './../redux/dataTypes';
import { AxiosInstance } from 'axios';
import { CreateNewWord } from './types';

export const wordsApi = (instance: AxiosInstance) => ({
  async getData(group: string) {
    const { data } = await instance.get<null, { data: WordDataType[] }>(
      'word?group=' + `${group}`,
    );
    return data;
  },

  async addWord(dto: CreateNewWord) {
    const { data } = await instance.post<CreateNewWord, { data: WordDataType }>(
      'word',
      dto,
    );
    return data;
  },

  async searchWord(group: string, value: string) {
    const { data } = await instance.get<null, { data: WordDataType[] }>(
      `word/search?group=${group}&text=${value}`,
    );
    return data;
  },

  async removeWord(id: string) {
    const { data } = await instance.delete(`word/${id}`);
    return data;
  },
});
