export type UserDto = {
  id: string;
  email: string;
  last_name: string;
  first_name: string;
  patronymic?: string;
  is_student: boolean;
  avatar_filename: string;
  is_admin: boolean;
  is_telegram_logged_in: boolean;
};
