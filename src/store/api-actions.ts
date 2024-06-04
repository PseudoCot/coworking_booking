/* eslint-disable camelcase */
import { EmptyObject, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { ApiMethods, ApiRoutes } from '../consts';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AppRoutes } from '../routes';
import { clearUserData } from './user-process/user-process';
import { JsonRpcResponce as JsonRpcResponse } from '../types/json-rpc/json-rpc-response';
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
import { CoworkingBySearchRequestParams } from '../types/coworking/coworking-by-search-request-params';
import { CoworkingRequestParams } from '../types/coworking/coworking-request-params';
import { UserDto } from '../types/user/user-dto';
import { UpdateUserRequestParams } from '../types/user/update-user-request-params';
import { BookedCoworkingDto } from '../types/booking/booked-coworking-dto';
import { BookingRequestParams } from '../types/booking/booking-request-params';
import { ChangePasswordRequestParams } from '../types/change-password/change-password-request-params';
import { ChangePasswordResponseData } from '../types/change-password/change-password-response-data';
import { ChangePasswordData } from '../types/change-password/change-password-data';
import { CoworkingShortDto } from '../types/coworking/coworking-short-dto';
import { UpdateUserData } from '../types/user/update-user-data';
import { BookingData } from '../types/booking/booking-data';
import { CancelBookingRequestParams } from '../types/booking/cancel-booking-request-params';
import { RequestPasswordRecoveryData } from '../types/recovery-password/request-password-recovery-data';
import { RequestRecoveryPasswordRequestParams } from '../types/recovery-password/request-password-recovery-request-params';
import { PasswordRecoveryData } from '../types/recovery-password/password-recovery-data';
import { PasswordRecoveryRequestParams } from '../types/recovery-password/password-recovery-request-params';
import { TimestampDto } from '../types/api-shared/timestamp-dto';
import { CoworkingsSearchDto } from '../types/api-shared/search-dto';
import { CreateCoworkingDto } from '../types/admin/create-coworking-dto';
import { CreateCoworkingRequestParams } from '../types/admin/create-coworking-request-params';
import { CreateCapabilityRequestParams } from '../types/admin/create-capability-request-params';
import { CreateCapabilityData } from '../types/admin/create-capability-data';
import { CoworkingCapabilityDto } from '../types/api-shared/coworking-capability-dto';
import { CreateEventData } from '../types/admin/create-event-data';
import { CreateEventRequestParams } from '../types/admin/create-event-request-params';
import { EventDto } from '../types/api-shared/event-dto';
import { CreateScheduleData } from '../types/admin/create-schedule-data';
import { CreateScheduleRequestParams } from '../types/admin/create-schedule-request-params';
import { ScheduleDto } from '../types/api-shared/schedule-dto';
import { SeatDto } from '../types/api-shared/seat-dto';
import { CreateSeatsData } from '../types/admin/create-seats-data';
import { CreateSeatsRequestParams } from '../types/admin/create-seats-request-params';


export const fetchUserAction = createAsyncThunk<UserDto, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/fetchUser',
  async (_, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<UserDto>>(ApiRoutes.FetchUser, createJsonRpcRequest<EmptyObject>(
      ApiMethods.FetchUser,
      {}
    ));

    return data.result;
  },
);

export const updateUserDataAction = createAsyncThunk<UserDto, UpdateUserData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/updateUser',
  async (updateUserData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<UserDto>>(ApiRoutes.UpdateUser, createJsonRpcRequest<UpdateUserRequestParams>(
      ApiMethods.UpdateUser,
      {
        values_set: {
          first_name: updateUserData.firstName,
          last_name: updateUserData.lastName,
          patronymic: updateUserData.patronymic,
        }
      }
    ));

    return data.result;
  },
);


export const registerAction = createAsyncThunk<void, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/register',
  async (registerData, { dispatch, extra: { api } }) => {
    await api.post<JsonRpcResponse<UserDto>>(ApiRoutes.Register, createJsonRpcRequest<RegisterRequestParams>(
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
    const fingerprintId = await fpService.getFingerprintId();

    const { data } = await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.Login, createJsonRpcRequest<LoginRequestParams>(
      ApiMethods.Login,
      {
        data: {
          ...loginData,
          fingerprint: fingerprintId,
        }
      }
    ), { withCredentials: true });

    saveToken(data.result.access_token);
    dispatch(fetchUserAction());
    dispatch(redirectToRoute(AppRoutes.Main.FullPath)); // определить, куда перенаправлять
  },
);

export const refreshSessionAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/refreshSession',
  async (_, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    const { data } = await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.RefreshSession, createJsonRpcRequest<RefreshRequestParams>(
      ApiMethods.RefreshSession,
      {
        fingerprint: fingerprintId,
      }
    ), { withCredentials: true });

    saveToken(data.result.access_token);
    dispatch(fetchUserAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/logout',
  async (_, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.Logout, createJsonRpcRequest<RefreshRequestParams>(
      ApiMethods.Logout,
      {
        fingerprint: fingerprintId,
      }
    ), { withCredentials: true });

    dropToken();
    dispatch(clearUserData());

    // определить, нужно ли перенаправлять пользователя
  },
);

export const changePasswordAction = createAsyncThunk<void, ChangePasswordData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/changePassword',
  async (changePasswordData, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    const { data } = await api.post<JsonRpcResponse<ChangePasswordResponseData>>(ApiRoutes.ChangePassword,
      createJsonRpcRequest<ChangePasswordRequestParams>(
        ApiMethods.ChangePassword,
        {
          data: {
            password: changePasswordData.password,
            password_repeat: changePasswordData.repeatedPassword,
            fingerprint: fingerprintId,
          }
        }
      ), { withCredentials: true });

    if (data.result.login_required) {
      dropToken();
      dispatch(clearUserData());
      dispatch(redirectToRoute(AppRoutes.Login.FullPath));
    }
  },
);


export const fetchCoworkingsByTimestampAction = createAsyncThunk<CoworkingShortDto[], TimestampDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworkingsByTimestamp',
  async (timestampData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingShortDto[]>>(ApiRoutes.FetchCoworkingsByTimestamp,
      createJsonRpcRequest<CoworkingByTimestampRequestParams>(
        ApiMethods.FetchCoworkingsByTimestamp,
        {
          interval: {
            from: timestampData.from,
            to: timestampData.to,
          }
        }
      ));

    return data.result;
    // return coworkingShortDataMock;
  },
);

export const fetchCoworkingsBySearchAction = createAsyncThunk<CoworkingShortDto[], CoworkingsSearchDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworkingsBySearch',
  async (searchData, { dispatch, extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingShortDto[]>>(ApiRoutes.FetchCoworkingsBySearch,
      createJsonRpcRequest<CoworkingBySearchRequestParams>(
        ApiMethods.FetchCoworkingsBySearch,
        {
          search: {
            title: searchData.title,
            institute: searchData.institute
          },
        }
      ));

    dispatch(redirectToRoute(AppRoutes.Coworkings.FullPath));
    return data.result;
    // return coworkingShortDataMock;
  },
);

export const fetchCoworkingAction = createAsyncThunk<CoworkingDto, string, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworking',
  async (coworkingId, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingDto>>(ApiRoutes.FetchCoworking, createJsonRpcRequest<CoworkingRequestParams>(
      ApiMethods.FetchCoworking,
      {
        coworking_id: coworkingId
      }
    ));

    return data.result;
    // return await coworkingDataMock[coworkingId];
  },
);


export const uploadAvatarAction = createAsyncThunk<void, File, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'image/uploadAvatar',
  async (avatar, { extra: { api } }) => {
    const formData = new FormData();
    formData.append('image', avatar);
    await api.post(ApiRoutes.UploadAvatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
);


export const fetchBookedCoworkingsAction = createAsyncThunk<BookedCoworkingDto[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/fethBookedCoworkings',
  async (_, { dispatch, extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<BookedCoworkingDto[]>>(ApiRoutes.FetchBookedCoworkings, createJsonRpcRequest<EmptyObject>(
      ApiMethods.FetchBookedCoworkings,
      {}
    ));

    for (const bookedCoworkingDto of data.result) {
      await dispatch(fetchCoworkingAction(bookedCoworkingDto.seat.coworking_id)); // temp
    }

    return data.result;
  },
);

export const bookCoworkingAction = createAsyncThunk<BookedCoworkingDto | undefined, BookingData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/bookCoworking',
  async (bookData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<BookedCoworkingDto>>(ApiRoutes.BookCoworking, createJsonRpcRequest<BookingRequestParams>(
      ApiMethods.BookCoworking,
      {
        reservation: {
          coworking_id: bookData.coworkingId,
          place_type: bookData.placeType,
          session_start: bookData.from,
          session_end: bookData.to,
        }
      }
    ));

    return data.result;
  },
);

export const cancelBookingAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/cancelBooking',
  async (bookingId, { extra: { api } }) => {
    await api.post<JsonRpcResponse<null>>(ApiRoutes.CancelBooking, createJsonRpcRequest<CancelBookingRequestParams>(
      ApiMethods.CancelBooking,
      {
        reservation_id: bookingId,
      }
    ));

    // обновить список брони?
  },
);


export const requestPasswordRecoveryAction = createAsyncThunk<void, RequestPasswordRecoveryData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'userSettings/requestResetPasswordLink',
  async (requestPasswordRecoveryData, { extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    await api.post<JsonRpcResponse<null>>(ApiRoutes.RequestPasswordRecovery,
      createJsonRpcRequest<RequestRecoveryPasswordRequestParams>(
        ApiMethods.RequestPasswordRecovery,
        {
          email: requestPasswordRecoveryData.email,
          fingerprint: fingerprintId,
        }
      ));
  },
);

export const recoverPasswordAction = createAsyncThunk<void, PasswordRecoveryData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'userSettings/requestResetPasswordLink',
  async (passwordResetData, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    await api.post<JsonRpcResponse<null>>(ApiRoutes.PasswordRecovery,
      createJsonRpcRequest<PasswordRecoveryRequestParams>(
        ApiMethods.PasswordRecovery,
        {
          data: {
            password: passwordResetData.password,
            password_repeat: passwordResetData.repeatedPassword,
            fingerprint: fingerprintId,
            token: passwordResetData.token,
            email: passwordResetData.email,
          }
        }
      ));

    dropToken();
    dispatch(clearUserData());
    dispatch(redirectToRoute(AppRoutes.Login.FullPath));
  },
);


export const createCoworkingAction = createAsyncThunk<CoworkingShortDto, CreateCoworkingDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/createCoworking',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingShortDto>>(ApiRoutes.CreateCoworking,
      createJsonRpcRequest<CreateCoworkingRequestParams>(
        ApiMethods.CreateCoworking,
        {
          coworking: createData
        }
      ));

    // dispatch(redirectToRoute(AppRoutes.Login.FullPath));
    return data.result;
  },
);

export const createCoworkingCapabilityAction = createAsyncThunk<CoworkingCapabilityDto[], CreateCapabilityData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/createCoworkingCapability',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingCapabilityDto[]>>(ApiRoutes.CreateCoworkingCapability,
      createJsonRpcRequest<CreateCapabilityRequestParams>(
        ApiMethods.CreateCoworkingCapability,
        {
          coworking_id: createData.coworkingId,
          capabilities: createData.capabilities
        }
      ));

    return data.result;
  },
);

export const createCoworkingEventAction = createAsyncThunk<EventDto, CreateEventData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/createCoworkingEvent',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<EventDto>>(ApiRoutes.CreateCoworkingEvent,
      createJsonRpcRequest<CreateEventRequestParams>(
        ApiMethods.CreateCoworkingEvent,
        {
          coworking_id: createData.coworkingId,
          event: createData.event
        }
      ));

    return data.result;
  },
);

export const createCoworkingScheduleAction = createAsyncThunk<ScheduleDto[], CreateScheduleData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/createCoworkingSchedule',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<ScheduleDto[]>>(ApiRoutes.CreateCoworkingSchedule,
      createJsonRpcRequest<CreateScheduleRequestParams>(
        ApiMethods.CreateCoworkingSchedule,
        {
          coworking_id: createData.coworkingId,
          schedules: createData.schedules
        }
      ));

    return data.result;
  },
);

export const createCoworkingSeatsAction = createAsyncThunk<SeatDto[], CreateSeatsData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/createCoworkingSeats',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<SeatDto[]>>(ApiRoutes.CreateCoworkingSeats,
      createJsonRpcRequest<CreateSeatsRequestParams>(
        ApiMethods.CreateCoworkingSeats,
        {
          coworking_id: createData.coworkingId,
          meeting_rooms: createData.meetingRooms,
          table_places: createData.tablePlaces
        }
      ));

    return data.result;
  },
);


export const uploadCoworkingAvatarAction = createAsyncThunk<void, File, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'image/uploadCoworkingAvatar',
  async (avatar, { extra: { api } }) => {
    const formData = new FormData();
    formData.append('image', avatar);
    await api.post(ApiRoutes.UploadCoworkingAvatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
);

export const uploadCoworkingImageAction = createAsyncThunk<void, File, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'image/uploadCoworkingImage',
  async (image, { extra: { api } }) => {
    const formData = new FormData();
    formData.append('image', image);
    await api.post(ApiRoutes.UploadCoworkingImage, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
);
