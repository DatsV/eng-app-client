import { UserDataType } from './../dataTypes';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchMakeUserVip,
  fetchAddGroup,
  fetchRemoveGroup,
  fetchUser,
  fetchLoginUser,
  fetchRegisterUser,
  fetchChangeUserPass,
  fetchActivateUser,
} from '../thunk/userThunk';
import { RootState } from './../store';

import { fetchAddWords, fetchRemoveWords } from '../thunk/wordThunk';

interface UserType {
  data: UserDataType | null;
  status: 'loading' | 'success' | 'error' | 'initial';
}

const initialState: UserType = {
  data: null,
  status: 'initial',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogOut: (state) => {
      localStorage.removeItem('engAppToken');
      localStorage.removeItem('engActiveGroup');
      return {
        ...state,
        data: null,
        status: 'initial',
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMakeUserVip.fulfilled, (state) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            isVip: true,
          },
        };
      }
    });
    builder.addCase(fetchAddGroup.fulfilled, (state, action) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            groups: [...state.data?.groups, action.payload.group],
          },
        };
      }
    });
    builder.addCase(fetchRemoveGroup.fulfilled, (state, action) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            groups: [
              ...state.data?.groups.filter((el) => el !== action.payload.group),
            ],
            words: state.data.words - action.payload.wordsCount,
          },
        };
      }
    });
    builder.addCase(fetchAddWords.fulfilled, (state) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            words: state.data.words + 1,
          },
        };
      }
    });
    builder.addCase(fetchRemoveWords.fulfilled, (state) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            words: state.data.words - 1,
          },
        };
      }
    });
    builder.addMatcher(
      isAnyOf(
        fetchUser.pending,
        fetchLoginUser.pending,
        fetchRegisterUser.pending,
        fetchChangeUserPass.pending,
        fetchActivateUser.pending,
      ),
      (state) => {
        return {
          ...state,
          status: 'loading',
        };
      },
    );
    builder.addMatcher(
      isAnyOf(
        fetchUser.rejected,
        fetchLoginUser.rejected,
        fetchRegisterUser.rejected,
        fetchChangeUserPass.rejected,
        fetchActivateUser.rejected,
      ),
      (state) => {
        return {
          ...state,
          data: null,
          status: 'error',
        };
      },
    );
    builder.addMatcher(
      isAnyOf(
        fetchUser.fulfilled,
        fetchLoginUser.fulfilled,
        fetchRegisterUser.fulfilled,
        fetchChangeUserPass.fulfilled,
        fetchActivateUser.fulfilled,
      ),
      (state, action) => {
        return {
          ...state,
          data: action.payload,
          status: 'success',
        };
      },
    );
  },
});

export const { userLogOut } = userSlice.actions;

export const getUser = (state: RootState) => !!state.user.data;
export const getUserAll = (state: RootState) => state.user.data;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserGroups = (state: RootState) => state.user.data?.groups;
export const getUserWordsCount = (state: RootState) => state.user.data?.words;
export const getUserAccessRights = (state: RootState) =>
  !!state.user.data?.isVip && !!state.user.data?.isConfirm;

export default userSlice.reducer;
