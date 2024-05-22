export type ChangePasswordRequestParams = {
  data: {
    password: string;
    password_repeat: string;
    fingerprint: string;
  };
};
