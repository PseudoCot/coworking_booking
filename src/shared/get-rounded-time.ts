export default function getRoundedTime(str: string) {
  const time = str.includes('T') ? str.substring(11) : str;
  return time.substring(0, 5);
}
