import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Api } from '../../api/axios';
import { CreateNewGroup, LoginUserDto, RegisterUserDto } from '../../api/types';

export const fetchUser = createAsyncThunk(
  '/user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Api().user.getMe();
      return data.user;
    } catch (error) {
      console.warn('fetchUser ERROR');
      return rejectWithValue('');
    }
  },
);

export const fetchLoginUser = createAsyncThunk(
  '/user/fetchLoginUser',
  async (dto: LoginUserDto, { rejectWithValue }) => {
    try {
      const data = await Api().user.login(dto);
      localStorage.setItem('engAppToken', data.engAppToken);
      return data.user;
    } catch (error: unknown) {
      let err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchRegisterUser = createAsyncThunk(
  '/user/fetchRegisterUser',
  async (dto: RegisterUserDto, { rejectWithValue }) => {
    try {
      const data = await Api().user.register(dto);

      localStorage.setItem('engAppToken', data.engAppToken);

      return data.user;
    } catch (error: unknown) {
      let err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchResendMail = createAsyncThunk(
  '/user/fetchResendMail',
  async () => {
    await Api().user.resendConfirmMail();
  },
);

export const fetchAddGroup = createAsyncThunk(
  '/user/fetchAddGroup',
  async (dto: CreateNewGroup) => {
    const data = await Api().user.addUserGroup(dto);

    return data;
  },
);

export const fetchRemoveGroup = createAsyncThunk(
  '/user/fetchRemoveGroup',
  async (dto: string) => {
    const data = await Api().user.removeUserGroup(dto);

    return data;
  },
);

export const fetchMakeUserVip = createAsyncThunk(
  '/user/fetchMakeUserVip',
  async (dto: { code: string }, { rejectWithValue }) => {
    try {
      await Api().user.makeUserVip(dto);
    } catch (error: unknown) {
      let err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchRecoverPassMail = createAsyncThunk(
  '/user/fetchRecoverPassMail',
  async (dto: Pick<LoginUserDto, 'email'>, { rejectWithValue }) => {
    try {
      const data = await Api().user.recoverPasswordMail(dto);
      return data;
    } catch (error: unknown) {
      let err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchChangeUserPass = createAsyncThunk(
  '/user/fetchChangeUserPass',
  async (dto: Omit<RegisterUserDto, 'email'>, { rejectWithValue }) => {
    try {
      const data = await Api().user.changePassword(dto);

      localStorage.setItem('engAppToken', data.engAppToken);
      return data.user;
    } catch (error: unknown) {
      let err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchActivateUser = createAsyncThunk(
  '/user/fetchActivateUser',
  async () => {
    const data = await Api().user.activateUser();

    return data.user;
  },
);
