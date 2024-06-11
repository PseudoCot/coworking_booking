import { DateTime } from 'luxon';
import stringifyInteger from './stringify-integer';

export default function getDateAndTimestamp(datetimeStart: string, datetimeEnd: string) {
  const start = DateTime.fromISO(datetimeStart);
  const end = DateTime.fromISO(datetimeEnd);

  const date = start.toLocaleString(undefined, { locale: 'en-gb' }).replaceAll('/', '.');
  const startHour = stringifyInteger(start.hour);
  const startMinute = stringifyInteger(start.minute);
  const endHour = stringifyInteger(end.hour);
  const endMinute = stringifyInteger(end.minute);

  return [date, `${startHour}:${startMinute} - ${endHour}:${endMinute}`];
}
