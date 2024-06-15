import getRoundedTime from './get-rounded-time';

export function getTimestampTime(start: string, end: string) {
  return `${getRoundedTime(start)}:${getRoundedTime(end)}`;
}
