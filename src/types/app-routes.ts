import { ROUTES } from '../routes';
import { ValueOf } from './value-of';

export type AppRoutes = ValueOf<ValueOf<typeof ROUTES>>;
