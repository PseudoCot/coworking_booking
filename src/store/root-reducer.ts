import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaces } from '../consts';
import { userProcess } from './user-process/user-process';
import { errorProcess } from './error-process/error-process';

export const rootReducer = combineReducers({
  [NameSpaces.Error]: errorProcess.reducer,
  [NameSpaces.User]: userProcess.reducer,
});
