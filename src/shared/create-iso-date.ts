export default function createISODate(isoDate: string, hour: string, minute: string, second = '00') {
  return `${isoDate}T${hour}:${minute}:${second}.000Z`;
}
