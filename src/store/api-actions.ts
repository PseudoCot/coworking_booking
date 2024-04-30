/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
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
import { coworkingShortDataMock } from '../mocks/coworking-short-data-mock';
import { coworkingDataMock } from '../mocks/coworking-data-mock';
import { ThunkExtraArgument } from '../types/thunk-extra-argument';
import { createJsonRpcRequest } from '../shared/create-json-rpc-request';
import { RegisterRequestParams } from '../types/api/register-request-params';
import { AuthRequestParams } from '../types/api/auth-request-params';
import { RefreshRequestParams } from '../types/api/refresh-request-params';
import { CoworkingsSearchingData } from '../types/coworkings-searching-data';


export const registerAction = createAsyncThunk<void, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/register',
  async (registerData, { dispatch, extra: { api } }) => {
    await api.post<JsonRpcResponse<RegisterResponseData>>('', createJsonRpcRequest<RegisterRequestParams>(
      ApiMethods.Register,
      {
        data: {
          last_name: registerData.lastName,
          first_name: registerData.firstName,
          patronymic: registerData.patronymic,
          email: registerData.email,
          password: registerData.password,
        }
      }
    ));

    dispatch(redirectToRoute(AppRoutes.Auth.FullPath));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/login',
  async (authData, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.createFingerprintId();
    const { data } = await api.post<JsonRpcResponse<AuthResponseData>>('', createJsonRpcRequest<AuthRequestParams>(
      ApiMethods.Login,
      {
        data: {
          ...authData,
          fingerprint: fingerprintId,
        }
      }
    ));

    if (!data.result) {
      throw new Error(data.error?.message);
    }

    saveToken(data.result.access_token);
    dispatch(redirectToRoute(AppRoutes.Main.FullPath)); // определить, куда перенаправлять
  },
);

export const refreshSessionAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/refreshSession',
  async (_, { extra: { fpService, api } }) => {
    const fingerprintId = await fpService.createFingerprintId();
    const { data } = await api.post<JsonRpcResponse<AuthResponseData>>('', createJsonRpcRequest<RefreshRequestParams>(
      ApiMethods.RefreshSession,
      {
        fingerprint: fingerprintId,
      }
    ));

    if (!data.result) {
      throw new Error(data.error?.message);
    }

    saveToken(data.result.access_token);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/logout',
  async (_, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.createFingerprintId();
    await api.post<JsonRpcResponse<null>>('', createJsonRpcRequest<RefreshRequestParams>(
      ApiMethods.Logout,
      {
        fingerprint: fingerprintId
      }
    ));

    dropToken();
    dispatch(clearUserData);

    // определить, нужно ли перенаправлять пользователя
  },
);

// export const fetchUserAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: ThunkExtraArgument;
// }>(
//   'user/logout',
//   async (_, { dispatch, extra: { api } }) => {
//     const { data } = await api.post<JsonRpcResponse<null>>('', createJsonRpcRequest<>(
//       ApiMethods.ChangePassword
//     ));
//     return data.result.;
//   },
// );

export const changeUserDataAction = createAsyncThunk<void, UserData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/logout',
  async (newUserData, { dispatch, extra: { api } }) => {
    // await api.post<JsonRpcResponse<null>>('', createJsonRpcRequest<>(
    //   ApiMethods.ChangePassword,
    //   {
    //     data: {
    //       ...newUserData
    //     }
    //   }
    // ));
  },
);

export const requestChangePasswordAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/logout',
  async (_, { extra: { api } }) => {
    await api.post<JsonRpcResponse<null>>('', createJsonRpcRequest(ApiMethods.RequestChangePassword));
  },
);

export const changePasswordAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/logout',
  async (newPassword, { dispatch, extra: { api } }) => {
    await api.post<JsonRpcResponse<null>>('', createJsonRpcRequest(
      ApiMethods.ChangePassword,
      {
        data: {
          newPassword
        }
      }
    ));

    // определить, нужно ли авторизовывать пользователя
    dispatch(redirectToRoute(AppRoutes.Auth.FullPath));
  },
);

export const cancelBookingAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/logout',
  async (coworkingId, { _, extra: { api } }) => {
    await api.post<JsonRpcResponse<null>>('', createJsonRpcRequest(
      ApiMethods.CancelBooking,
      {
        data: {
          coworkingId
        }
      }
    ));

    // обновить список брони?
  },
);

// добавить запрос загрузки аватарки пользователя


export const fetchCoworkingsAction = createAsyncThunk<CoworkingShortData[], CoworkingsSearchingData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/fetchCoworkings',
  async (coworkingsSearchingData, { extra: { api } }) => {
    // закомментированно до момета получения api
    // const { data } = await api.post<JsonRpcResponse<CoworkingShortData[]>>('', createJsonRpcRequest(
    //   ApiMethods.FetchCoworkings
    // ));
    // return data.result.;
    return coworkingShortDataMock;
  },
);

export const fetchCoworkingAction = createAsyncThunk<CoworkingData, string, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/fetchCoworking',
  async (coworkingId, { extra: { api } }) => {
    // закомментированно до момета получения api
    // const { data } = await api.post<JsonRpcResponse<CoworkingData>>('', createJsonRpcRequest<>(
    //   ApiMethods.FetchCoworking,
    //   {
    //     data: {
    //       id: coworkingId
    //     }
    //   }
    // ));
    // return data.result.;
    return await coworkingDataMock[coworkingId];
  },
);
