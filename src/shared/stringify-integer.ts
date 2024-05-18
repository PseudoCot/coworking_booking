export default function stringifyInteger(int: number, stringLength = 2) {
  if (int === 0) {
    return '00';
  }

  const diff = stringLength - Math.ceil(Math.log10(int + 1));
  return diff > 0
    ? `${Array.from({ length: stringLength - diff }, () => '0').join('')}${int}`
    : int.toString();
}
