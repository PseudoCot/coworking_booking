import { Weekdays } from '../consts';
import { ValueOf } from './value-of';

export type WeekdayNumber = keyof typeof Weekdays;
export type Weekdays = ValueOf<typeof Weekdays>;
