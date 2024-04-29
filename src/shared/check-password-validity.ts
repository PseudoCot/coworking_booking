export default function checkPasswordValidity(password: string) {
  return password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/);
  // return /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
}
