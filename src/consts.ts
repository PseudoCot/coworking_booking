export const ApiMethods = {
  Register: 'register',
  Login: 'login',
  RefreshSession: 'refresh_session',
  Logout: 'logout',

  // временные данные до выяснения структуры api
  FetchUser: 'temp',
  ChangeUserData: 'temp',
  RequestChangePassword: 'temp',
  CancelBooking: 'temp',
  ChangePassword: 'temp',
  FetchCoworkings: 'temp',
  FetchCoworking: 'temp',
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
