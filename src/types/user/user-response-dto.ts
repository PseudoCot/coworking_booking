export type UserResponseDto = {
  id: string;
  email: string;
  last_name: string;
  first_name: string;
  patronymic?: string;
  is_student: boolean;
  avatar_filename?: string;
};
