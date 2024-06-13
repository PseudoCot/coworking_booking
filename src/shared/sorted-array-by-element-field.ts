/* eslint-disable @typescript-eslint/no-explicit-any */
export default function sortedArrayByElementField<R = object>(list: object[], field: string | number): R[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const result = list.reduce((res, elem) => (res[elem[field]] = elem), {});

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.values(result);
}
