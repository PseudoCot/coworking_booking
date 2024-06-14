export default function sortedArrayByElementField<R = object>(list: object[], field: string | number): R[] {
  const result = list.reduce((res, elem) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res[elem[field]] = elem;
    return res;
  }, {});

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.values(result);
}
