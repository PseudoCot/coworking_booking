import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { ApiMethods } from '../consts';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AppRoutes } from '../routes';
import { clearUserData } from './user-process/user-process';
import { JsonRpcResponce as JsonRpcResponse } from '../types/api/json-rpc-response';
import { RegisterResponseData } from '../types/api/register-response-data';
import { RegisterData } from '../types/register-data';
import { AuthData } from '../types/auth-data';
import { AuthResponseData } from '../types/api/auth-response-data';


export const registerAction = createAsyncThunk<void, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async (registerData, { dispatch, extra: api }) => {
    await api.post<JsonRpcResponse<RegisterResponseData>>(ApiMethods.Register, registerData);

    dispatch(redirectToRoute(AppRoutes.Auth.FullPath));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (authData, { dispatch, extra: api }) => {
    // добавить в authData вычисленный fingerprint

    const { data } = await api.post<JsonRpcResponse<AuthResponseData>>(ApiMethods.Login, authData);

    saveToken(data.result?.access_token);

    dispatch(redirectToRoute(AppRoutes.Main.FullPath)); // определить, куда перенаправлять
  },
);

export const refreshSessionAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/refreshSession',
  async (_, { extra: api }) => {
    // добавить вычисление fingerprint и отправить в запросе

    const { data } = await api.post<JsonRpcResponse<AuthResponseData>>(ApiMethods.RefreshSession);

    saveToken(data.result?.access_token);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_, { dispatch, extra: api }) => {
    await api.post<JsonRpcResponse<null>>(ApiMethods.Logout);

    dropToken();
    dispatch(clearUserData);

    // определить, нужно ли перенаправлять пользователя
  },
);

// добавить запрос на данные пользователя
