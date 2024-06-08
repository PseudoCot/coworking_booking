import { Validator, ValidatorResult } from './validator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatorData<R extends ValidatorResult = ValidatorResult, V = any> = {
  validate: Validator<R, V>;
  errorText: string;
  showErrorTime?: number;
  description?: string;
};
