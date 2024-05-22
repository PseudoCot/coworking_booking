import stringifyInteger from './stringify-integer';

export default function generateTimeArray(start: number, end: number, step = 1) {
  const result: string[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(stringifyInteger(i, 2));
  }
  return result;
}
