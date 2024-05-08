export type RegisterRequestParams = {
  data: {
    last_name: string;
    first_name: string;
    patronymic?: string;
    email: string;
    password: string;
  };
};
