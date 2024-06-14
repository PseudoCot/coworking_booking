import generateTimeArray from './shared/generate-time-array';
import validateFilesExtension from './shared/validate-files-extension';
import validateFilesMaxSize from './shared/validate-files-max-size';
import { SelectOption } from './types/select-option';
import { ValidatorData } from './types/validator-data';

export const AVAILABLE_HOURS_START = 8;
export const AVAILABLE_HOURS_END = 20;
export const AVAILABLE_HOURS = generateTimeArray(AVAILABLE_HOURS_START, AVAILABLE_HOURS_END, 1);
export const AVAILABLE_MINUTES = generateTimeArray(0, 60, 5);
export const FIRST_AVAILABLE_HOUR = AVAILABLE_HOURS.at(0) as string;
export const FIRST_AVAILABLE_MINUTE = AVAILABLE_MINUTES.at(0) as string;
export const COWORKING_DEFAULT_IMAGE = 'coworking-default-image.png';
export const TELEGRAM_BOT_NAME = '@test_coworking_booking_urfu_bot';
export const TECHNICAL_SUPPORT_EMAIL = 'V.eremenko@brusnika.ru';
export const MAX_IMAGES_COUNT = 6;
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const REQUIRED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg'];
export const IMAGE_INPUT_TOOLTIP_TEXT = 'Максимальный размер 10МБ; допустимые расширения: png, jpg и jpeg';

export const BACKEND_URL = import.meta.env.DEV && import.meta.env.VITE_DEV_REQUESTS_THROUGH_PROXY === 'true'
  ? import.meta.env.VITE_DEV_PROXY_URL
  : `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/${import.meta.env.VITE_API_PATH}`;

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

  // User: 'user',
  FetchUser: 'get_profile', // null, user-dto
  UpdateUser: 'update_user_data', // update-user-request-params user-dto

  // Booking: 'reservation', //
  FetchBookedCoworkings: 'get_user_reservations', // null booking-dto[]
  BookCoworking: 'create_reservation', // book-request-params booking-dto
  CancelBooking: 'cancel_reservation', // cancel-booking-request-params null

  // UserSettings: 'settings',
  RequestPasswordRecovery: 'request_reset_password_link',
  PasswordRecovery: 'reset_password',

  // AdminCoworking: 'admin/coworking',
  CreateCoworking: 'create_coworking',
  CreateCoworkingCapability: 'create_coworking_tech_capabilities',
  CreateCoworkingEvent: 'create_coworking_event',
  CreateCoworkingSchedule: 'register_coworking_working_schedule',
  CreateCoworkingSeats: 'register_coworking_seats',
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
  FetchBookedCoworkings: 'v1/reservation/get_user_reservations',
  BookCoworking: 'v1/reservation/create_reservation',
  CancelBooking: 'v1/reservation/cancel_reservation',

  // UserSettings: 'v1/user/settings',
  RequestPasswordRecovery: 'v1/user/settings/request_reset_password_link',
  PasswordRecovery: 'v1/user/settings/reset_password',

  // AdminCoworking: 'v1/admin/coworking',
  CreateCoworking: 'v1/admin/coworking/create_coworking',
  CreateCoworkingCapability: 'v1/admin/coworking/create_coworking_tech_capabilities',
  CreateCoworkingEvent: 'v1/admin/coworking/create_coworking_event',
  CreateCoworkingSchedule: 'v1/admin/coworking/register_coworking_working_schedule',
  CreateCoworkingSeats: 'v1/admin/coworking/register_coworking_seats',

  UploadCoworkingAvatar: 'v1/admin/coworking/avatar',
  UploadCoworkingImage: 'v1/admin/coworking/image',
} as const;

export const JsonRpcErrorCodes = {
  [-32700]: 'Parse Error',
  [-32600]: 'Invalid Request',
  [-32601]: 'Method not found',
  [-32602]: 'Invalid params',
  [-32603]: 'Internal error',
} as const;

export const FetchingStatuses = {
  None: 'None',
  Pending: 'Pending',
  Fulfilled: 'Fulfilled',
  Rejected: 'Rejected',
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

export const PlaceTypes = {
  Table: 'table',
  MeetingRoom: 'meeting_room',
} as const;

export const PlaceTypeOptions: SelectOption<string>[] = [ // value соответствуют api
  { title: 'Столы', value: 'table' },
  { title: 'Переговорные', value: 'meeting_room' },
];

export const WeekdayOptions: SelectOption<number>[] = [
  { title: 'Понедельник', value: 0 },
  { title: 'Вторник', value: 1 },
  { title: 'Среда', value: 2 },
  { title: 'Четверг', value: 3 },
  { title: 'Пятница', value: 4 },
  { title: 'Суббота', value: 5 },
  { title: 'Воскресенье', value: 6 },
];

export const Weekdays = {
  0: 'Понедельник',
  1: 'Вторник',
  2: 'Среда',
  3: 'Четверг',
  4: 'Пятница',
  5: 'Суббота',
  6: 'Воскресенье',
} as const;

export const NameSpaces = {
  Coworkings: 'Coworkings',
  Coworking: 'Coworking',
  Booking: 'Booking',
  BookedCoworkings: 'BookedCoworkings',
  User: 'User',
  Admin: 'Admin',
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

export const ImageValidatorsData: ValidatorData<boolean>[] = [
  {
    validate: (value: FileList) => validateFilesMaxSize(value, MAX_IMAGE_SIZE),
    errorText: 'Превышен максимально допустимый размер файла',
    showErrorTime: 5000,
  },
  {
    validate: (value: FileList) => validateFilesExtension(value, REQUIRED_IMAGE_EXTENSIONS),
    errorText: 'Загружен файл с недопустимым расширением',
    showErrorTime: 5000,
  },
];

