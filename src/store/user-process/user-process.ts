import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatuses as Status, NameSpaces, FetchingStatuses } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { refreshSessionAction, loginAction, logoutAction, fetchUserAction, postPasswordChangeAction, postUserDataAction, postPasswordRecoveryAction } from '../api-actions';
import { UserDto } from '../../types/user/user-dto';
import { UserData } from '../../types/user/user-data';
import { FetchingStatus } from '../../types/fetching-status';

type UserProcessState = {
  registerFetchingStatus: FetchingStatus;
  loginFetchingStatus: FetchingStatus;
  refreshFetchingStatus: FetchingStatus;
  passwordChangeFetchingStatus: FetchingStatus;
  userDataFetchingStatus: FetchingStatus;
  userDataChangeFetchingStatus: FetchingStatus;
  authStatus: AuthStatus;
  userData?: UserData;
  // showCheckEmailMessage: boolean;
};

export type UserFetchingField = keyof Omit<UserProcessState, 'authStatus' | 'userData'>;

const initialState: UserProcessState = {
  registerFetchingStatus: FetchingStatuses.None,
  loginFetchingStatus: FetchingStatuses.None,
  refreshFetchingStatus: FetchingStatuses.None,
  passwordChangeFetchingStatus: FetchingStatuses.None,
  userDataFetchingStatus: FetchingStatuses.None,
  userDataChangeFetchingStatus: FetchingStatuses.None,
  authStatus: Status.Unknown,
  userData: undefined,
  // showCheckEmailMessage: false,
};

export const userProcess = createSlice({
  name: NameSpaces.User,
  initialState,
  reducers: {
    resetUserFetchingStatus: (state, action: PayloadAction<UserFetchingField>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore:
      state[action] = FetchingStatuses.None;
    },
    clearUserData: (state) => {
      state.userData = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loginFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.loginFetchingStatus = FetchingStatuses.Fulfilled;
        state.authStatus = Status.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.loginFetchingStatus = FetchingStatuses.Rejected;
        state.authStatus = Status.NoAuth;
      })

      .addCase(refreshSessionAction.pending, (state) => {
        state.refreshFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(refreshSessionAction.fulfilled, (state) => {
        state.refreshFetchingStatus = FetchingStatuses.Fulfilled;
        state.authStatus = Status.Auth;
      })
      .addCase(refreshSessionAction.rejected, (state) => {
        state.refreshFetchingStatus = FetchingStatuses.Rejected;
        state.authStatus = Status.NoAuth;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = Status.NoAuth;
      })

      .addCase(postPasswordChangeAction.pending, (state) => {
        state.passwordChangeFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postPasswordChangeAction.fulfilled, (state) => {
        state.passwordChangeFetchingStatus = FetchingStatuses.Fulfilled;
        state.authStatus = Status.NoAuth;
      })
      .addCase(postPasswordChangeAction.rejected, (state) => {
        state.passwordChangeFetchingStatus = FetchingStatuses.Rejected;
      })

      .addCase(postPasswordRecoveryAction.pending, (state) => {
        state.passwordChangeFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postPasswordRecoveryAction.fulfilled, (state) => {
        state.passwordChangeFetchingStatus = FetchingStatuses.Fulfilled;
      })
      .addCase(postPasswordRecoveryAction.rejected, (state) => {
        state.passwordChangeFetchingStatus = FetchingStatuses.Rejected;
      })

      .addCase(fetchUserAction.pending, (state) => {
        state.userDataFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(fetchUserAction.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.userDataFetchingStatus = FetchingStatuses.Fulfilled;
        state.userData = {} as UserData;
        state.userData.id = action.payload.id;
        state.userData.lastName = action.payload.last_name;
        state.userData.firstName = action.payload.first_name;
        state.userData.patronymic = action.payload.patronymic;
        state.userData.email = action.payload.email;
        state.userData.isStudent = action.payload.is_student;
        state.userData.telegramConnected = action.payload.is_telegram_logged_in;
        state.userData.avatarFileName = action.payload.avatar_filename;
      })
      .addCase(fetchUserAction.rejected, (state) => {
        state.userDataFetchingStatus = FetchingStatuses.Rejected;
      })

      .addCase(postUserDataAction.pending, (state) => {
        state.userDataChangeFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postUserDataAction.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.userDataChangeFetchingStatus = FetchingStatuses.Fulfilled;
        if (!state.userData) {
          return;
        }
        state.userData.lastName = action.payload.last_name;
        state.userData.firstName = action.payload.first_name;
        state.userData.patronymic = action.payload.patronymic;
      })
      .addCase(postUserDataAction.rejected, (state) => {
        state.userDataChangeFetchingStatus = FetchingStatuses.Rejected;
      });
  }
});

export const { clearUserData, resetUserFetchingStatus } = userProcess.actions;
