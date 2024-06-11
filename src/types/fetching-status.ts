import { FetchingStatuses } from '../consts';
import { ValueOf } from './value-of';

export type FetchingStatus = ValueOf<typeof FetchingStatuses>;
