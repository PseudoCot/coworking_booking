import { TokenDto } from '../auth/token-response-dto';

export type UpdateUserDto2 = {
  email?: string;
  last_name?: string;
  first_name?: string;
  patronymic?: string;
  token: TokenDto;
  id: string;
};
