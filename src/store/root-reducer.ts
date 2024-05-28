import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaces } from '../consts';
import { userProcess } from './user-process/user-process';
import { errorProcess } from './error-process/error-process';
import { coworkingsProcess } from './coworkings-process/coworkings-process';
import { coworkingProcess } from './coworking-process/coworking-process';
import { bookingProcess } from './booking-process/booking-process';

export const rootReducer = combineReducers({
  [NameSpaces.Coworkings]: coworkingsProcess.reducer,
  [NameSpaces.Coworking]: coworkingProcess.reducer,
  [NameSpaces.Booking]: bookingProcess.reducer,
  [NameSpaces.User]: userProcess.reducer,
  [NameSpaces.Error]: errorProcess.reducer,
});
