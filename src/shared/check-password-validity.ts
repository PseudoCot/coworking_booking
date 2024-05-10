export default function checkPasswordValidity(password: string) {
  return password.match(/^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)[0-9a-zA-Z!,#$%&()*+-.\/:;<=>?@^_]{8,}$/);
}
