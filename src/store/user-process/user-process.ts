import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatuses as Status, NameSpaces, AuthStatuses } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { refreshSessionAction, loginAction, logoutAction, fetchUserAction, postPasswordChangeAction, postUserDataAction } from '../api-actions';
import { UserDto } from '../../types/user/user-dto';

type UserProcessState = {
  authStatus: AuthStatus;
  id?: string;
  lastName?: string;
  firstName?: string;
  patronymic?: string;
  email?: string;
  isStudent?: boolean;
  telegramConnected?: boolean;
  avatarFileName?: string;
  showCheckEmailMessage: boolean;
};

const initialState: UserProcessState = {
  authStatus: AuthStatuses.Unknown,
  id: undefined,
  lastName: undefined,
  firstName: undefined,
  patronymic: undefined,
  email: undefined,
  telegramConnected: undefined,
  isStudent: undefined,
  avatarFileName: undefined,
  showCheckEmailMessage: false,
};

export const userProcess = createSlice({
  name: NameSpaces.User,
  initialState,
  reducers: {
    setShowCheckEmailMessage: (state, action: PayloadAction<boolean>) => {
      state.showCheckEmailMessage = action.payload;
    },
    clearUserData: (state) => {
      state.id = undefined;
      state.lastName = undefined;
      state.firstName = undefined;
      state.patronymic = undefined;
      state.email = undefined;
      state.isStudent = undefined;
      state.telegramConnected = undefined;
      state.avatarFileName = undefined;
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
      })
      .addCase(postPasswordChangeAction.fulfilled, (state) => {
        state.authStatus = Status.NoAuth;
      })
      .addCase(fetchUserAction.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.id = action.payload.id;
        state.lastName = action.payload.last_name;
        state.firstName = action.payload.first_name;
        state.patronymic = action.payload.patronymic;
        state.email = action.payload.email;
        state.isStudent = action.payload.is_student;
        state.telegramConnected = action.payload.is_telegram_logged_in;
        state.avatarFileName = action.payload.avatar_filename;
      })
      .addCase(postUserDataAction.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.lastName = action.payload.last_name;
        state.firstName = action.payload.first_name;
        state.patronymic = action.payload.patronymic;
      });
  }
});

export const { clearUserData } = userProcess.actions;
