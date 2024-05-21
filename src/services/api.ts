import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'; //AxiosRequestConfig
import { getToken } from './token';
import { DetailMessageType } from '../types/detail-message';
import { store } from '../store';
import { AuthStatuses, NameSpaces } from '../consts';
import { logoutAction } from '../store/api-actions';
import { StatusCodes } from 'http-status-codes';
import { setErrorCode } from '../store/error-process/error-process';

const BACKEND_URL = 'http://130.193.50.180';
const TOKEN_HEADER = 'Authorization';
const REQUEST_TIMEOUT = 5000;


const useToken = (config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token && config.headers) {
    config.headers[TOKEN_HEADER] = token;
  }

  return config;
};

const setError = (error: AxiosError<DetailMessageType>) => {
  if (error.response && error.response.status !== StatusCodes.UNAUTHORIZED) {
    store.dispatch(setErrorCode(error.response.status));
  }

  throw error;
};

const redirectToLoginOnExpiredToken = (error: AxiosError<DetailMessageType>) => {
  if (error.response?.status === StatusCodes.UNAUTHORIZED && getToken() !== ''
    && store.getState()[NameSpaces.User].authStatus === AuthStatuses.Auth) {
    store.dispatch(logoutAction);
  }

  throw error;
};


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(useToken);

  api.interceptors.response.use( // проверить, что ошибки перехватываются (все ответы от сервера с кодом 200)
    (response) => response,
    setError
  );

  api.interceptors.response.use(
    (response) => response,
    redirectToLoginOnExpiredToken
  );

  return api;
};
