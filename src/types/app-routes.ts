import { AppRoutes } from '../routes';
import { ValueOf } from './value-of';

export type AppRoutes = ValueOf<ValueOf<typeof AppRoutes>>;
