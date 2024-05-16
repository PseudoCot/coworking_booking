import generateTimeArray from './shared/generate-time-array';

export const AVAILABLE_HOURS_START = 8;
export const AVAILABLE_HOURS_END = 20;
export const AVAILABLE_HOURS = generateTimeArray(AVAILABLE_HOURS_START, AVAILABLE_HOURS_END, 1);
export const AVAILABLE_MINUTES = generateTimeArray(0, 60, 5);
export const FIRST_AVAILABLE_HOUR = AVAILABLE_HOURS.at(0) as string;
export const FIRST_AVAILABLE_MINUTE = AVAILABLE_MINUTES.at(0) as string;

export const ApiMethods = {
  // Auth: 'auth',
  Register: 'register',
  Login: 'login',
  RefreshSession: 'refresh_session', // ... login-response-data
  Logout: 'logout', // refrech-session-request-params login-response-data

  // Coworking: 'coworking',
  FetchCoworkingsByTimestamp: 'available_coworking_by_timestamp', // coworking-by-timestamp-request-params coworking-dto[]
  FetchCoworkingsBySearch: 'get_coworking_by_search_params', // coworking-by-search-request-params coworking-dto[]
  FetchCoworking: 'get_coworking', // coworking-request-params coworking-response-dto

  // Avatar, // upload-avatar-request-params, обычнй post запрос, multipart/form-data

  // User: 'user',
  FetchUser: 'get-profile', // null, user-dto
  UpdateUser: 'update-user-data', // update-user-request-params update-user-response-data

  // Booking: 'reservation', //
  FetchBookings: 'get-user-reservations', // null booking-response-data[]
  BookCoworking: 'create_reservation', // book-request-params booking-response-data
} as const;

export const ApiRoutes = {
  // Auth: 'api/v1/auth',
  Register: 'api/v1/auth/register',
  Login: 'api/v1/auth/login',
  RefreshSession: 'api/v1/auth/refresh_session',
  Logout: 'api/v1/auth/logout',

  // Coworking: 'api/v1/coworking',
  FetchCoworkingsByTimestamp: 'api/v1/coworking/available_coworking_by_timestamp',
  FetchCoworkingsBySearch: 'api/v1/coworking/get_coworking_by_search_params',
  FetchCoworking: 'api/v1/coworking/get_coworking',

  UploadAvatar: 'api/v1/image',
  FetchImage: 'api/v1/image/',

  // User: 'api/v1/user',
  FetchUser: 'api/v1/user/get-profile',
  UpdateUser: 'api/v1/user/update_user_data',

  // Booking: 'api/v1/reservation',
  FetchBookings: 'api/v1/reservation/get_user_reservations',
  BookCoworking: 'api/v1/reservation/create_reservation',
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

export const PlaceTypes = { // значения соответствуют api
  MeetingRoom: 'meeting_room',
  Table: 'table',
} as const;

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
