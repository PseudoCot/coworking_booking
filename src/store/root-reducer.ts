import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaces } from '../consts';
import { userProcess } from './user-process/user-process';
import { errorProcess } from './error-process/error-process';
import { coworkingsProcess } from './coworkings-process/coworkings-process';
import { coworkingProcess } from './coworking-process/coworking-process';
import { bookingProcess } from './booking-process/booking-process';
import { bookedCoworkingsProcess } from './booked-coworkings-process/booked-coworkings-process';
import { adminProcess } from './admin-process/admin-process';

export const rootReducer = combineReducers({
  [NameSpaces.Coworkings]: coworkingsProcess.reducer,
  [NameSpaces.Coworking]: coworkingProcess.reducer,
  [NameSpaces.Booking]: bookingProcess.reducer,
  [NameSpaces.BookedCoworkings]: bookedCoworkingsProcess.reducer,
  [NameSpaces.User]: userProcess.reducer,
  [NameSpaces.Admin]: adminProcess.reducer,
  [NameSpaces.Error]: errorProcess.reducer,
});
