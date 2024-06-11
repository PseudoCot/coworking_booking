export default function stringifyInteger(int: number, stringLength = 2): string {
  if (int === 0) {
    return '0'.repeat(stringLength);
  }

  const diff = stringLength - Math.ceil(Math.log10(int + 1));
  return diff > 0
    ? `${'0'.repeat(stringLength - diff)}${int}`
    : int.toString();
}
