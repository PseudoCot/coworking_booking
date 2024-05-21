import { createAction } from '@reduxjs/toolkit';
import { AppRoutes } from '../types/app-routes';

export const redirectToRoute = createAction<AppRoutes>('app/redirectToRoute');
