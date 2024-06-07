/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Validator<R extends boolean | RegExpMatchArray | null, V = any> {
  (value: V, ...args: any[]): R;
}
