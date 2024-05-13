/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { ApiMethods, ApiRoutes } from '../consts';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AppRoutes } from '../routes';
import { clearUserData } from './user-process/user-process';
import { JsonRpcResponce as JsonRpcResponse } from '../types/json-rpc/json-rpc-response';
import { RegisterResponseData } from '../types/register/register-response-data';
import { RegisterData } from '../types/register/register-data';
import { LoginData } from '../types/login/login-data';
import { LoginResponseData } from '../types/login/login-response-data';
import { ThunkExtraArgument } from '../types/thunk-extra-argument';
import { createJsonRpcRequest } from '../shared/create-json-rpc-request';
import { RegisterRequestParams } from '../types/register/register-request-params';
import { RefreshRequestParams } from '../types/refresh-session/refresh-request-params';
import { LoginRequestParams } from '../types/login/login-request-params';
import { CoworkingDto } from '../types/coworking/coworking-dto';
import { CoworkingByTimestampRequestParams } from '../types/coworking/coworking-by-timestamp-request-params';
import { TimestampDto } from '../types/api-shared/timestamp-dto';
import { SearchDto } from '../types/coworking/search-dto';
import { CoworkingBySearchRequestParams } from '../types/coworking/coworking-by-search-request-params';
import { CoworkingResponseDto } from '../types/coworking/coworking-response-dto';
import { CoworkingRequestParams } from '../types/coworking/coworking-request-params';
import { UserDto } from '../types/user/user-dto';
import { UpdateUserRequestParams } from '../types/user/update-user-request-params';
import { UpdateUserResponseData } from '../types/user/update-user-response-data';
import { UpdateUserDto } from '../types/user/update-user-dto';
import { BookingResponseData } from '../types/booking/booking-response-data';
import { BookRequestParams } from '../types/booking/book-request-params';
import { BookingData } from '../types/booking/booking-data';


export const registerAction = createAsyncThunk<void, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/register',
  async (registerData, { dispatch, extra: { api } }) => {
    await api.post<JsonRpcResponse<RegisterResponseData>>(ApiRoutes.Register, createJsonRpcRequest<RegisterRequestParams>(
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

    dispatch(redirectToRoute(AppRoutes.Login.FullPath));
  },
);

export const loginAction = createAsyncThunk<void, LoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/login',
  async (loginData, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.createFingerprintId();
    const { data } = await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.Login, createJsonRpcRequest<LoginRequestParams>(
      ApiMethods.Login,
      {
        data: {
          ...loginData,
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
  'auth/refreshSession',
  async (_, { extra: { fpService, api } }) => {
    const fingerprintId = await fpService.createFingerprintId();
    const { data } = await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.RefreshSession, createJsonRpcRequest<RefreshRequestParams>(
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
  'auth/logout',
  async (_, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.createFingerprintId();
    await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.Logout, createJsonRpcRequest<RefreshRequestParams>(
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


export const fetchCoworkingsByTimestampAction = createAsyncThunk<CoworkingDto[], TimestampDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworkingsByTimestamp',
  async (timestamp, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingDto[]>>(ApiRoutes.FetchCoworkingsByTimestamp,
      createJsonRpcRequest<CoworkingByTimestampRequestParams>(
        ApiMethods.FetchCoworkingsByTimestamp,
        {
          interval: timestamp
        }
      ));
    return data.result ?? [];
    // return coworkingShortDataMock;
  },
);

export const fetchCoworkingsBySearchAction = createAsyncThunk<CoworkingDto[], SearchDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworkingsBySearch',
  async (search, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingDto[]>>(ApiRoutes.FetchCoworkingsBySearch,
      createJsonRpcRequest<CoworkingBySearchRequestParams>(
        ApiMethods.FetchCoworkingsBySearch,
        {
          search: search
        }
      ));
    return data.result ?? [];
    // return coworkingShortDataMock;
  },
);

export const fetchCoworkingAction = createAsyncThunk<CoworkingResponseDto | undefined, string, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworking',
  async (coworkingId, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingResponseDto>>(ApiRoutes.FetchCoworking,
      createJsonRpcRequest<CoworkingRequestParams>(
        ApiMethods.FetchCoworking,
        {
          coworking_id: coworkingId
        }
      ));
    return data.result;
    // return await coworkingDataMock[coworkingId];
  },
);


export const fetchUserAction = createAsyncThunk<UserDto | undefined, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/fetchUser',
  async (_, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<UserDto>>(ApiRoutes.FetchUser, createJsonRpcRequest<null>(
      ApiMethods.FetchUser,
      null
    ));
    return data.result;
  },
);

export const updateUserDataAction = createAsyncThunk<UpdateUserResponseData | undefined, UpdateUserDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/updateUser',
  async (newUserData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<UpdateUserResponseData>>(ApiRoutes.UpdateUser, createJsonRpcRequest<UpdateUserRequestParams>(
      ApiMethods.UpdateUser,
      {
        values_set: {
          ...newUserData
        }
      }
    ));
    return data.result;
  },
);

// временное решение
export const requestChangePasswordAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/requestChangePassword',
  async (_, { extra: { api } }) => {
    await api.post<JsonRpcResponse<null>>('', createJsonRpcRequest<null>('', null));
  },
);

// временное решение
export const changePasswordAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/changePassword',
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


export const fetchBookingsAction = createAsyncThunk<BookingResponseData[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/fethBookings',
  async (_, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<BookingResponseData[]>>(ApiRoutes.FetchBookings, createJsonRpcRequest<null>(
      ApiMethods.FetchBookings,
      null
    ));
    return data.result ?? [];
  },
);

export const bookCoworkingAction = createAsyncThunk<BookingResponseData | undefined, BookingData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/bookCoworking',
  async (bookingData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<BookingResponseData>>(ApiRoutes.BookCoworking, createJsonRpcRequest<BookRequestParams>(
      ApiMethods.BookCoworking,
      {
        reservation: bookingData
      }
    ));
    return data.result;
  },
);

// временное решение
export const cancelBookingAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/cancelBooking',
  async (coworkingId, { _, extra: { api } }) => {
    await api.post<JsonRpcResponse<null>>('', createJsonRpcRequest(
      '',
      {
        data: {
          coworkingId
        }
      }
    ));

    // обновить список брони?
  },
);

