import { TelegramDto } from './telegram-response-dto';

export type UserDto = {
  id: string;
  email: string;
  last_name: string;
  first_name: string;
  patronymic?: string;
  is_student: boolean;
  avatar_filename?: string;
  telegram_info?: TelegramDto;
};
