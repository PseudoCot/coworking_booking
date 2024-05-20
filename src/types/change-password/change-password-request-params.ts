export type ChangePasswordRequestParams = {
  data: {
    password: string;
    repeatedPassword: string;
    fingerprint: string;
  };
};
