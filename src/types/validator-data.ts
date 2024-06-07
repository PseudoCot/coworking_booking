import { Validator } from './validator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatorData<R extends boolean | RegExpMatchArray | null, V = any> = {
  validator: Validator<R, V>;
  tooltipText: string;
  errorText: string;
};
