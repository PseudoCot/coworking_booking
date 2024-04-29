export default function checkEmailValidity(email: string) {
  return email.match(/^\S+@(urfu\.me)|(urfu\.ru)$/);
}
