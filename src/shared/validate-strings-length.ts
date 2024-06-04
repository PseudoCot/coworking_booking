export function validateStringsLength(strings: Array<string | undefined>, requiredMinLength = 1): boolean {
  for (const str of strings) {
    if (!str || str.length < requiredMinLength) {
      return false;
    }
  }
  return true;

  // return strings.reduce((res, str) => res && str.length >= requiredMinLength, true);
}
