import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'; //AxiosRequestConfig
import { getToken } from './token';
import { DetailMessageType } from '../types/detail-message';
import { store } from '../store';
import { AuthStatuses, BACKEND_URL, NameSpaces } from '../consts';
import { logoutAction } from '../store/api-actions';
import { StatusCodes } from 'http-status-codes';
import { JsonRpcUnverifiedResponce } from '../types/json-rpc/json-rpc-unverified-response';

const TOKEN_HEADER = 'Authorization';
const REQUEST_TIMEOUT = 5000;


const useToken = (config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token && config.headers) {
    config.headers[TOKEN_HEADER] = token;
  }

  return config;
};

// const withCredentials = (config: InternalAxiosRequestConfig) => {
//   config.withCredentials = true;
//   return config;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const interceptError = (value: AxiosResponse<JsonRpcUnverifiedResponce<any>, any>) => {
  if (!value.data.result && value.data.error) {
    throw new Error(value.data.error.message);
  }

  return value;
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
  // api.interceptors.request.use(withCredentials);

  api.interceptors.response.use( // проверить, что ошибки перехватываются (все ответы от сервера с кодом 200)
    interceptError
  );
  api.interceptors.response.use(
    (response) => response,
    redirectToLoginOnExpiredToken
  );

  return api;
};
