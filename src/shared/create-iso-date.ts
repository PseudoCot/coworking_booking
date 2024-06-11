export default function createISODate(isoDate: string, hours: string, minutes: string, seconds = '00') {
  return `${isoDate}T${hours}:${minutes}:${seconds}`;
}
