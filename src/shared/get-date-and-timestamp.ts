import { DateTime } from 'luxon';

export default function getDateAndTimestamp(datetimeStart: string, datetimeEnd: string) {
  const start = DateTime.fromISO(datetimeStart);
  const end = DateTime.fromISO(datetimeEnd);
  return [start.toLocaleString().replace('/', '.'), `${start.hour}:${start.minute} - ${end.hour}:${end.minute}`];
}
