export type ValidatorResult = boolean | RegExpMatchArray | null;

// must return true if value is correct, false if it's incorrect

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Validator<R extends ValidatorResult = ValidatorResult, V = any> {
  (value: V, ...args: any[]): R;
}
