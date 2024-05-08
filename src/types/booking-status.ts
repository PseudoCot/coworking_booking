import { BookingStatuses } from '../consts';
import { ValueOf } from './value-of';

export type BookingStatus = ValueOf<typeof BookingStatuses>;
