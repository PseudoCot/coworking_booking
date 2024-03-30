import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatus as Status, NameSpace } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { UserData } from '../../types/user-data';

type UserProcessState = {
  authStatus: AuthStatus;
  name: string | undefined;
  avatarUrl: string | undefined;
  email: string | undefined;
};

const initialState: UserProcessState = {
  authStatus: 'Unknown',
  name: undefined,
  avatarUrl: undefined,
  email: undefined,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Omit<UserData, 'token'>>) => {
      state.name = action.payload.name;
      state.avatarUrl = action.payload.avatarUrl;
      state.email = action.payload.email;
    },
    clearUserData: (state) => {
      state.name = undefined;
      state.avatarUrl = undefined;
      state.email = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = Status.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = Status.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = Status.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = Status.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = Status.NoAuth;
      });
  }
});

export const {setUserData, clearUserData} = userProcess.actions;
