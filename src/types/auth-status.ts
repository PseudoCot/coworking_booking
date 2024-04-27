import { AuthStatuses } from '../consts';
import { ValueOf } from './value-of';

export type AuthStatus = ValueOf<typeof AuthStatuses>;
