import { Validator } from '../types/validator';

export const validatePassword: Validator<boolean, string> = (password: string) =>
  !!password.match(/^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[!,#$%&()*+-./:;<=>?@^_].*)[0-9a-zA-Z!,#$%&()*+-./:;<=>?@^_]{8,}$/);

export default validatePassword;
