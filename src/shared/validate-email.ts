import { Validator } from '../types/validator';

export const validateEmail: Validator<boolean> = (email: string) => !!email.match(/^\S+@(urfu\.me)|(urfu\.ru)$/);

export default validateEmail;
