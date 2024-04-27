import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatuses as Status, NameSpaces } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { refreshSessionAction, loginAction, logoutAction } from '../api-actions';
import { UserData } from '../../types/user-data';

type UserProcessState = {
  authStatus: AuthStatus;
  lastName?: string;
  firstName?: string;
  patronymic?: string;
  email?: string;
  is_student?: boolean;
  avatarUrl?: string;
};

const initialState: UserProcessState = {
  authStatus: 'Unknown',
  lastName: undefined,
  firstName: undefined,
  patronymic: undefined,
  email: undefined,
  avatarUrl: undefined,
};

export const userProcess = createSlice({
  name: NameSpaces.User,
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Omit<UserData, 'token'>>) => {
      state.lastName = action.payload.last_name;
      state.firstName = action.payload.first_name;
      state.patronymic = action.payload.patronymic;
      state.email = action.payload.email;
      // state.avatarUrl = action.payload.avatarUrl;
    },
    clearUserData: (state) => {
      state.lastName = undefined;
      state.firstName = undefined;
      state.patronymic = undefined;
      state.email = undefined;
      // state.avatarUrl = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = Status.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = Status.NoAuth;
      })
      .addCase(refreshSessionAction.fulfilled, (state) => {
        state.authStatus = Status.Auth;
      })
      .addCase(refreshSessionAction.rejected, (state) => {
        state.authStatus = Status.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = Status.NoAuth;
      });
  }
});

export const { setUserData, clearUserData } = userProcess.actions;
