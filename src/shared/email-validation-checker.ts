export default function emailValidationChecker(email: string) {
  return email.match(/^\S+@(urfu\.me)|(urfu\.ru)$/);
}
