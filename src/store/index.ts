import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createAPI } from '../services/api';
import { redirectMiddleware } from './middlewares/redirect';
import FingerprintService from '../shared/fingerprint-service';

export const fpService = new FingerprintService();
export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          fpService,
          api,
        },
      },
    }).concat(redirectMiddleware),
});
