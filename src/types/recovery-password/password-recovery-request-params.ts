export type PasswordRecoveryRequestParams = {
  data: {
    password: string;
    password_repeat: string;
    fingerprint: string;
    email: string;
    token: string;
  };
};
