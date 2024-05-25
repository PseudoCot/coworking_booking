import generateTimeArray from './shared/generate-time-array';
import { SelectOption } from './types/select-option';

export const AVAILABLE_HOURS_START = 8;
export const AVAILABLE_HOURS_END = 20;
export const AVAILABLE_HOURS = generateTimeArray(AVAILABLE_HOURS_START, AVAILABLE_HOURS_END, 1);
export const AVAILABLE_MINUTES = generateTimeArray(0, 60, 5);
export const FIRST_AVAILABLE_HOUR = AVAILABLE_HOURS.at(0) as string;
export const FIRST_AVAILABLE_MINUTE = AVAILABLE_MINUTES.at(0) as string;

export const BACKEND_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5566' // proxy
  : 'http://130.193.50.180/api/'; // target

export const ApiMethods = {
  // Auth: 'auth',
  Register: 'register',
  Login: 'login',
  RefreshSession: 'refresh_session', // ... login-response-data
  Logout: 'logout', // refrech-session-request-params login-response-data
  ChangePassword: 'change_password',

  // Coworking: 'coworking',
  FetchCoworkingsByTimestamp: 'available_coworking_by_timestamp', // coworking-by-timestamp-request-params coworking-short-dto[]
  FetchCoworkingsBySearch: 'get_coworking_by_search_params', // coworking-by-search-request-params coworking-short-dto[]
  FetchCoworking: 'get_coworking', // coworking-request-params coworking-dto

  // Avatar, // upload-avatar-request-params, обычнй post запрос, multipart/form-data

  // User: 'user',
  FetchUser: 'get_profile', // null, user-dto
  UpdateUser: 'update_user_data', // update-user-request-params user-dto

  // Booking: 'reservation', //
  FetchBookings: 'get_user_reservations', // null booking-dto[]
  BookCoworking: 'create_reservation', // book-request-params booking-dto
  CancelBooking: 'cancel_reservation', // cancel-booking-request-params null

  // UserSettings: 'settings',
  RequestPasswordRecovery: 'request_reset_password_link',
  PasswordRecovery: 'reset_password',
} as const;

export const ApiRoutes = {
  // Auth: 'v1/auth',
  Register: 'v1/auth/register',
  Login: 'v1/auth/login',
  RefreshSession: 'v1/auth/refresh_session',
  Logout: 'v1/auth/logout',
  ChangePassword: 'v1/auth/change_password',

  // Coworking: 'v1/coworking',
  FetchCoworkingsByTimestamp: 'v1/coworking/available_coworking_by_timestamp',
  FetchCoworkingsBySearch: 'v1/coworking/get_coworking_by_search_params',
  FetchCoworking: 'v1/coworking/get_coworking',

  UploadAvatar: 'v1/image',
  FetchImage: 'v1/image/', // v1/image/{filename}

  // User: 'v1/user',
  FetchUser: 'v1/user/get_profile',
  UpdateUser: 'v1/user/update_user_data',

  // Booking: 'v1/reservation',
  FetchBookings: 'v1/reservation/get_user_reservations',
  BookCoworking: 'v1/reservation/create_reservation',
  CancelBooking: 'v1/reservation/cancel_reservation',

  // UserSettings: 'v1/user/settings',
  RequestPasswordRecovery: 'v1/user/settings/request_reset_password_link',
  PasswordRecovery: 'v1/user/settings/reset_password',
} as const;

export const JsonRpcErrorCodes = {
  [-32700]: 'Parse Error',
  [-32600]: 'Invalid Request',
  [-32601]: 'Method not found',
  [-32602]: 'Invalid params',
  [-32603]: 'Internal error',
} as const;

export const AuthStatuses = {
  Auth: 'Auth',
  NoAuth: 'NoAuth',
  Unknown: 'Unknown',
} as const;

export const BookingStatuses = { // значения соответствуют api
  New: 'new',
  AwaitConfirm: 'await_confirm',
  Confirmed: 'confirmed',
  Cancelled: 'cancelled',
  Passed: 'passed',
} as const;

export const PlaceTypeOptions: SelectOption[] = [ // value соответствуют api
  { title: 'Столы', value: 'table' },
  { title: 'Переговорные', value: 'meeting_room' },
] as const;

export const NameSpaces = {
  Coworkings: 'Coworkings',
  Coworking: 'Coworking',
  User: 'User',
  Error: 'Error',
} as const;

export const ErrorCodesDesc: { [key: number]: string } = {
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  408: 'Request Timeout',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
} as const;
